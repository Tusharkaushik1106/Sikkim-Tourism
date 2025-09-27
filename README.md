
# 🏔️ Monastery360: A Digital Heritage Platform for Sikkim’s Monasteries

> **Smart India Hackathon 2025 Problem Statement Solution**

Monastery360 is a cross-platform tourism and heritage preservation platform designed in direct response to the Smart India Hackathon (SIH) 2025 challenge:

> **Problem Statement:**
> Sikkim is home to over 200 monasteries, many of which date back to the 17th and 18th centuries. These monasteries are rich in history, architecture, and spiritual significance. While some efforts have been made to preserve murals and digitize rare documents, there is no unified digital platform that offers tourists and researchers immersive access to these cultural treasures.

Monastery360 aims to digitally preserve and promote **Sikkim’s 200+ monasteries**, offering immersive experiences for tourists, researchers, and cultural enthusiasts through a unified digital platform.
---


---

## 📖 Background

Sikkim’s monasteries are treasure troves of:
- Ancient murals and manuscripts
- Unique architectural styles
- Living traditions and spiritual practices

Despite some digitization efforts, **no unified digital platform** currently provides immersive and interactive access to these cultural gems for tourists, researchers, or the global community.

---


## 💡 Proposed Solution

**Monastery360** is a comprehensive digital heritage platform that integrates mobile, web, and AI technologies to:

- 🌐 Offer immersive virtual monastery experiences
- 📜 Preserve endangered cultural assets through digitization
- 🎧 Guide tourists with smart, multilingual audio tours
- 🗺️ Promote tourism with maps, routes, and event calendars
- 🤝 Empower local communities through participatory archiving

---


## ✨ Key Features

### 🏯 Virtual Tours & Experiences
- 360° panoramic virtual tours of monastery interiors and surroundings
- Narrated walkthroughs in multiple languages

### 🗺️ Travel & Exploration
- Interactive map: geo-tagged monastery locations, travel routes, and nearby attractions
- Smart Audio Guide App: location-based audio guides using Bluetooth beacons or GPS
- Offline mode for remote areas

### 📚 Cultural Heritage & Archives
- Digital archives: scanned manuscripts, murals, and historical documents
- AI-powered search and categorization

### 🎉 Events & Community
- Cultural calendar: events, festivals, and rituals schedule
- Booking and participation options for tourists
- Integration with local transport and tourism services
---

## 🌍 Impact

- Boosts tourism by making monasteries more accessible
- Preserves endangered cultural assets digitally
- Empowers local communities through participatory archiving
- Supports educational and spiritual exploration globally

---


## 🏗️ Project Structure

SIH 2025/
Sikkim-Tourism/
	App/         # Flutter mobile app
	ml/          # Python ML backend
	web/         # Next.js web frontend


---

## ⚙️ Tech Stack  

- **Mobile App:** Flutter (Dart)  
- **Backend:** Python (FastAPI/Flask, FAISS, MongoDB)  
- **Web:** Next.js, React, TypeScript, Tailwind CSS  
- **Cloud:** Firebase (Authentication, Cloud)  

---


## 🚀 Getting Started

### 1. Flutter App

```bash
cd SIH 2025/Sikkim-Tourism/App
flutter pub get
flutter run
```

- Configure Firebase by placing your `google-services.json` (Android) and `GoogleService-Info.plist` (iOS) in the appropriate directories.

### 2. ML Backend

```bash
cd SIH 2025/Sikkim-Tourism/ml
python -m venv venv
venv\Scripts\activate  # (Windows)
pip install -r requirements.txt
python app.py
```

- Configure environment variables as per `example.env`.
- Ensure MongoDB is running if required.

### 3. Web Frontend

```bash
cd SIH 2025/Sikkim-Tourism/web/demo
npm install
npm run dev
```


---