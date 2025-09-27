import 'dart:async';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:google_generative_ai/google_generative_ai.dart' as genai;
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'login.dart';

class Chatbot extends StatefulWidget {
  const Chatbot({super.key});

  @override
  State<Chatbot> createState() => _ChatbotState();
}

class _ChatbotState extends State<Chatbot> with AutomaticKeepAliveClientMixin<Chatbot> {
  final FlutterTts _tts = FlutterTts();
  final TextEditingController _textController = TextEditingController();
  final List<_Message> _messages = <_Message>[];
  String? _activeUserId;
  StreamSubscription<List<ConnectivityResult>>? _connSub;
  StreamSubscription<QuerySnapshot<Map<String, dynamic>>>? _msgSub;
  bool _hasNetwork = true;
  bool _isListening = false; // STT disabled for now
  bool _isSpeaking = false;
  bool _isLoading = false;

  @override
  bool get wantKeepAlive => true;

  @override
  void initState() {
    super.initState();
    _initLocal();
    _initTts();
    _watchConnectivity();
    _attachToCurrentUser();
  }

  Future<void> _attachToCurrentUser() async {
    try {
      final user = FirebaseAuth.instance.currentUser;
      if (user == null) {
        // Not logged in: clear active user and stop listening
        _msgSub?.cancel();
        setState(() {
          _activeUserId = null;
          _messages.clear();
        });
        return;
      }
      setState(() => _activeUserId = user.uid);
      _listenUserMessages(user.uid);
    } catch (e) {
      print('Error attaching to user: $e');
    }
  }

  Future<void> _updateSessionUid() async {}

  // Sign-in functionality moved to login.dart
  
  Future<void> _signOut() async {
    try {
      await FirebaseAuth.instance.signOut();
      try {
        // Also revoke Google selection so next login prompts account picker
        // We can't import GoogleSignIn here to avoid coupling; login.dart handles chooser at sign-in.
      } catch (_) {}
      final box = Hive.box('guide_cache');
      // Clear all cached messages locally on logout
      await box.delete('cached_messages');
      setState(() {
        _activeUserId = null;
        _messages.clear();
      });
      _msgSub?.cancel();
      
      // Clear login state in shared preferences
      final prefs = await SharedPreferences.getInstance();
      await prefs.setBool('isLoggedIn', false);
      await prefs.remove('userId');
      
      // Navigate to login screen
      if (mounted) {
        Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (context) => const LoginScreen()),
          (route) => false,
        );
      }
    } catch (e) {
      print('Error during sign out: $e');
    }
  }

  void _listenUserMessages(String uid) {
    _msgSub?.cancel();
    _msgSub = FirebaseFirestore.instance
        .collection('users')
        .doc(uid)
        .collection('messages')
        .orderBy('createdAt')
        .snapshots()
        .listen((snapshot) {
      final List<_Message> loaded = <_Message>[];
      for (final doc in snapshot.docs) {
        final data = doc.data();
        final role = (data['role'] ?? '').toString();
        final text = (data['text'] ?? '').toString();
        if (role.isEmpty || text.isEmpty) continue;
        loaded.add(_Message(role: role, text: text));
      }
      if (mounted) {
        setState(() {
          _messages
            ..clear()
            ..addAll(loaded);
        });
      }
      // Cache messages locally for quick restore
      try {
        if (loaded.isNotEmpty) {
          final box = Hive.box('guide_cache');
          final compact = loaded.map((m) => {'role': m.role, 'text': m.text}).toList(growable: false);
          box.put('cached_messages', compact);
          print('Cached ${loaded.length} messages locally');
        }
      } catch (e) {
        print('Error caching messages: $e');
      }
    });
  }

  Future<void> _initLocal() async {
    try {
      // Hive is already initialized in main.dart, just access the box
      final box = Hive.box('guide_cache');
      // Hydrate from cached messages
      final List cached = box.get('cached_messages', defaultValue: <dynamic>[]) as List;
      if (cached.isNotEmpty) {
        final restored = cached
            .map((e) => _Message(role: (e['role'] ?? '').toString(), text: (e['text'] ?? '').toString()))
            .where((m) => m.role.isNotEmpty && m.text.isNotEmpty)
            .toList();
        if (restored.isNotEmpty && mounted) {
          setState(() {
            _messages
              ..clear()
              ..addAll(restored);
          });
        }
      }
    } catch (e) {
      print('Error loading cached messages: $e');
    }
  }

  Future<void> _initTts() async {
    await _tts.setLanguage('en-IN');
    await _tts.setVoice({'name': 'en-in-x-end-local', 'locale': 'en-IN'});
    await _tts.setSpeechRate(0.55);
    await _tts.setVolume(1.0);
    await _tts.setPitch(1.0);
    _tts.setCompletionHandler(() {
      if (mounted) setState(() => _isSpeaking = false);
    });
  }

  void _watchConnectivity() async {
    final status = await Connectivity().checkConnectivity();
    _hasNetwork = status != ConnectivityResult.none;
    _connSub = Connectivity().onConnectivityChanged.listen((list) {
      final anyConnected = list.any((s) => s != ConnectivityResult.none);
      setState(() => _hasNetwork = anyConnected);
    });
  }

  @override
  void dispose() {
    _connSub?.cancel();
    _msgSub?.cancel();
    // STT disabled
    _tts.stop();
    _textController.dispose();
    super.dispose();
  }

  Future<void> _startListening({String locale = 'en_IN'}) async {}

  Future<void> _stopListening() async {}

  Future<void> _speak(String text, {String lang = 'en-IN'}) async {
    setState(() => _isSpeaking = true);
    await _tts.setLanguage(lang);
    if (lang.startsWith('hi')) {
      await _tts.setVoice({'name': 'hi-in-x-hia-local', 'locale': 'hi-IN'});
    }
    await _tts.setSpeechRate(0.55);
    await _tts.speak(text);
  }

  Future<String> _offlineAnswer(String prompt, String locale) async {
    final box = Hive.box('guide_cache');
    final key = 'faq';
    final Map faq = box.get(key, defaultValue: {}) as Map;
    final lower = prompt.toLowerCase();
    for (final e in faq.entries) {
      if (lower.contains(e.key.toString().toLowerCase())) {
        return e.value.toString();
      }
    }
    return locale.startsWith('hi')
        ? 'क्षमा करें, अभी इंटरनेट नहीं है। मैं बाद में विस्तृत जानकारी दूँगी।'
        : 'Sorry, no internet. I will share detailed guidance when online.';
  }

  Future<void> _askGuide(String locale) async {
    final input = _textController.text.trim();
    if (input.isEmpty) return;
    setState(() {
      _messages.add(_Message(role: 'user', text: input));
      _isLoading = true;
    });
    // Persist user message to both Firestore and local storage
    await _persistMessage(role: 'user', text: input);

    final String prompt = _buildPrompt(input, locale);
    String reply;
    try {
      if (_hasNetwork) {
        final apiKey = const String.fromEnvironment(
          'GEMINI_API_KEY',
          defaultValue: 'AIzaSyCMdybWPrh8J3cAu62vIyfFbB6GO3jtaRo',
        );
        final model = genai.GenerativeModel(model: 'gemini-1.5-flash', apiKey: apiKey);

        // Retry with exponential backoff for transient 5xx/unavailable
        String? respText;
        int attempt = 0;
        int delayMs = 600;
        while (attempt < 3 && (respText == null || respText.isEmpty)) {
          attempt++;
          try {
            final resp = await model.generateContent([genai.Content.text(prompt)]);
            respText = (resp.text ?? '').trim();
            if (respText.isNotEmpty) break;
          } catch (e) {
            final s = e.toString();
            final transient = s.contains('503') || s.contains('UNAVAILABLE') || s.contains('timeout');
            if (!transient) rethrow;
          }
          await Future.delayed(Duration(milliseconds: delayMs));
          delayMs *= 2;
        }

        if ((respText ?? '').isEmpty) {
          reply = await _offlineAnswer(input, locale);
        } else {
          reply = respText!;
        }
        final box = Hive.box('guide_cache');
        final Map faq = box.get('faq', defaultValue: {}) as Map;
        faq[input] = reply;
        await box.put('faq', faq);
      } else {
        reply = await _offlineAnswer(input, locale);
      }
    } catch (e) {
      final err = e.toString();
      reply = locale.startsWith('hi')
          ? 'त्रुटि: $err'
          : 'Error: $err';
    }

    if (!mounted) return;
    setState(() {
      _messages.add(_Message(role: 'assistant', text: reply));
      _isLoading = false;
      _textController.clear();
    });
    // Persist assistant message to both Firestore and local storage
    await _persistMessage(role: 'assistant', text: reply);
    await _speak(reply, lang: locale.replaceAll('_', '-'));
  }

  Future<void> _persistMessage({required String role, required String text}) async {
    // Add message to local UI state
    if (!mounted) return;
    
    // Also save to local storage immediately to ensure persistence
    try {
      final box = Hive.box('guide_cache');
      final List cached = box.get('cached_messages', defaultValue: <dynamic>[]) as List;
      final List<Map<String, dynamic>> updatedCache = List<Map<String, dynamic>>.from(cached);
      updatedCache.add({'role': role, 'text': text});
      await box.put('cached_messages', updatedCache);
    } catch (e) {
      print('Error saving message to local cache: $e');
    }
    
    // Then save to Firestore if we have a logged in user
    if (_activeUserId == null) return;
    try {
      final uid = _activeUserId!;
      await FirebaseFirestore.instance
          .collection('users')
          .doc(uid)
          .collection('messages')
          .add({
            'uid': uid,
            'role': role,
            'text': text,
            'createdAt': FieldValue.serverTimestamp(),
          });
    } catch (e) {
      print('Error saving message to Firestore: $e');
    }
  }

  String _buildPrompt(String userInput, String locale) {
    final system = locale.startsWith('hi')
        ? 'आप "सिक्की" हैं, सिक्किम, भारत के लिए एक मित्रवत, उत्साही और विशेषज्ञ AI यात्रा गाइड। आपका मुख्य लक्ष्य उपयोगकर्ताओं को इस खूबसूरत हिमालयी राज्य की यात्रा की योजना बनाने में मदद करना है।'
        : 'You are "Sikky", a friendly, enthusiastic, and expert AI travel guide for Sikkim, India. Your primary goal is to help users plan a personalized and unforgettable trip to this beautiful Himalayan state.';
    
    final context = locale.startsWith('hi')
        ? 'आपके मुख्य निर्देश:\n\n1. प्रारंभिक अभिवादन और व्यक्तित्व: पहली बारचीत में हमेशा खुद को पेश करें और मार्गदर्शक सवाल पूछें।\n\n2. यात्रा योजना विशेषज्ञ: यात्रा की अवधि और रुचियों के आधार पर दिन-प्रतिदिन का कार्यक्रम बनाएं।\n\n3. ज्ञान आधार: सिक्किम के मठों, पर्यटन स्थलों, स्थानीय व्यंजनों और संस्कृति के बारे में गहरी जानकारी।\n\n4. स्वर और शैली: मित्रवत, धैर्यवान और प्रोत्साहित करने वाला। स्पष्ट और संरचित उत्तर दें।\n\n5. भाषा लचीलापन: अगर उपयोगकर्ता हिंदी में बात करने को कहता है, तो पूरी बातचीत को हिंदी में स्विच करें।\n\nकेवल सिक्किम यात्रा और पर्यटन से संबंधित विषयों पर चर्चा करें।'
        : 'Your Core Directives:\n\n1. Initial Greeting & Persona:\n   - First Turn Only: You MUST begin the very first interaction of a new conversation with this introduction: "Hi! I\'m Sikky, your personal guide to the wonders of Sikkim! To help you plan the perfect trip, could you tell me how many days you\'re thinking of spending and what your main interests are? Are you drawn to serene monasteries, adventurous trekking, or breathtaking natural landscapes?"\n   - Ongoing Conversation: For all subsequent messages, do NOT repeat the introduction. Directly and helpfully answer the user\'s query based on your other directives.\n\n2. Trip Planning Expert:\n   - When a user wants to plan a trip, ask for the duration (number of days) and their key interests (e.g., monasteries, trekking, nature, culture, food).\n   - Based on their input, generate a concise, day-by-day itinerary. Use bullet points for each day\'s activities.\n   - Suggest logical routes. For example, group attractions in East Sikkim (Gangtok, Tsomgo Lake) together, and those in West Sikkim (Pelling, Yuksom) together.\n   - Be aware of travel times and permit requirements (e.g., for North Sikkim). Mention when permits are needed.\n\n3. Knowledge Base:\n   - You have deep knowledge of Sikkim\'s monasteries, including but not limited to: Rumtek, Pemayangtse, Tashiding, Enchey, Ralang, and Dubdi. Provide historical context, what makes each one unique, and visitor information like opening times if possible.\n   - You are also an expert on other key tourist spots like Gangtok (MG Marg), Tsomgo Lake, Nathula Pass, Pelling, Yuksom, Lachung, Yumthang Valley, and Gurudongmar Lake.\n   - Provide practical advice on the best time to visit, local cuisine to try, transportation options (shared jeeps vs. private taxis), and cultural etiquette.\n\n4. Tone and Style:\n   - Always be friendly, patient, and encouraging.\n   - Keep your responses clear, well-structured, and easy to read. Use lists to highlight key information.\n   - End your responses with an open-ended question to encourage further conversation. For example: "Does this itinerary look like a good starting point? We can always adjust it!" or "Is there a specific monastery you\'d like to know more about?"\n\n5. Language Flexibility:\n   - If the user asks you to communicate in Hindi (e.g., "Hindi mein baat karo"), you MUST switch the entire conversation to conversational Hindi.\n   - Maintain your friendly "Sikky" persona in Hindi.\n   - Continue in Hindi until the user requests to switch back to English.\n\nConstraint:\n   - Strictly stick to topics related to travel and tourism in Sikkim. If the user asks about something else, politely steer the conversation back to Sikkim travel. Example: "I\'m an expert on all things Sikkim! I\'d be happy to help you with any questions you have about planning your trip there."';
    
    return '$system\n\n$context\n\nUser: $userInput\nAssistant:';
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        systemOverlayStyle: const SystemUiOverlayStyle(
          statusBarIconBrightness: Brightness.light,
        ),
        title: const Text('Audio Guide', style: TextStyle(color: Colors.white)),
        actions: [
          Builder(builder: (context) {
            final user = FirebaseAuth.instance.currentUser;
            final photo = user?.photoURL;
            return Row(
              children: user == null || user.isAnonymous
                ? [
                    // Sign-in button removed - functionality moved to login.dart
                  ]
                : [
                    if (photo != null)
                      Padding(
                        padding: const EdgeInsets.only(right: 8.0),
                        child: CircleAvatar(radius: 14, backgroundImage: NetworkImage(photo)),
                      ),
                    TextButton.icon(
                      onPressed: _signOut,
                      icon: const Icon(Icons.logout, color: Colors.white),
                      label: const Text('Sign out', style: TextStyle(color: Colors.white)),
                    ),
                  ],

            );
          }),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final m = _messages[index];
                final isUser = m.role == 'user';
                return Align(
                  alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.symmetric(vertical: 6),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: isUser ? Colors.blueAccent : Colors.white12,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      m.text,
                      style: TextStyle(color: isUser ? Colors.white : Colors.white),
                    ),
                  ),
                );
              },
            ),
          ),
          if (_isLoading)
            const Padding(
              padding: EdgeInsets.all(12.0),
              child: CircularProgressIndicator(),
            ),
          const Divider(height: 1, color: Colors.white24),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _textController,
                      style: const TextStyle(color: Colors.white),
                      decoration: InputDecoration(
                        hintText: 'Ask about a monastery…',
                        hintStyle: const TextStyle(color: Colors.white54),
                        filled: true,
                        fillColor: Colors.white12,
                        border: OutlineInputBorder(
                          borderSide: BorderSide.none,
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  _MicButton(
                    active: _isListening,
                    onPressed: () async {
                      if (_isListening) {
                        await _stopListening();
                      } else {
                        await _startListening(locale: 'en_IN');
                      }
                      setState(() {});
                    },
                  ),
                  const SizedBox(width: 8),
                  _LangToggle(onLangSelected: (code) async {
                    if (code == 'hi') {
                      await _startListening(locale: 'hi_IN');
                    } else {
                      await _startListening(locale: 'en_IN');
                    }
                  }),
                  const SizedBox(width: 8),
                  IconButton(
                    onPressed: _isLoading
                        ? null
                        : () => _askGuide(_textController.text.contains(RegExp('[\u0900-\u097F]')) ? 'hi-IN' : 'en-IN'),
                    icon: const Icon(Icons.send, color: Colors.white),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _MicButton extends StatelessWidget {
  final bool active;
  final VoidCallback onPressed;
  const _MicButton({required this.active, required this.onPressed});
  @override
  Widget build(BuildContext context) {
    return IconButton(
      onPressed: onPressed,
      icon: Icon(active ? Icons.mic : Icons.mic_none, color: Colors.white),
    );
  }
}

class _LangToggle extends StatefulWidget {
  final ValueChanged<String> onLangSelected;
  const _LangToggle({required this.onLangSelected});
  @override
  State<_LangToggle> createState() => _LangToggleState();
}

class _LangToggleState extends State<_LangToggle> {
  String _lang = 'en';
  @override
  Widget build(BuildContext context) {
    return DropdownButton<String>(
      dropdownColor: Colors.black,
      value: _lang,
      items: const [
        DropdownMenuItem(value: 'en', child: Text('EN', style: TextStyle(color: Colors.white))),
        DropdownMenuItem(value: 'hi', child: Text('HI', style: TextStyle(color: Colors.white))),
      ],
      onChanged: (v) {
        if (v == null) return;
        setState(() => _lang = v);
        widget.onLangSelected(v);
      },
    );
  }
}

class _Message {
  final String role;
  final String text;
  _Message({required this.role, required this.text});
}

