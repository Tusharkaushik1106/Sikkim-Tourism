export type CulturalEvent = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD format
  description: string;
  location: string;
  category: 'Festival' | 'Religious' | 'Cultural' | 'Harvest' | 'Holiday';
  color: string;
  image?: string;
  monthDay: string; // MM-DD format for recurring annual events
};

// Base events with month-day format for dynamic year calculation
export const baseSikkimEvents: Omit<CulturalEvent, 'date'>[] = [
  // NATIONAL HOLIDAYS
  {
    id: 'new-year',
    title: 'New Year\'s Day',
    monthDay: '01-01',
    description: 'National holiday marking the beginning of the Gregorian calendar year with celebrations and resolutions.',
    location: 'Across Sikkim',
    category: 'Holiday',
    color: 'bg-purple-600',
    image: '/images/events/new-year.jpg',
  },
  {
    id: 'republic-day',
    title: 'Republic Day',
    monthDay: '01-26',
    description: 'National holiday commemorating the adoption of the Constitution of India in 1950, celebrated with flag hoisting, parades, and cultural programs.',
    location: 'Government offices, schools across Sikkim',
    category: 'Holiday',
    color: 'bg-purple-600',
    image: '/images/events/republic-day.jpg',
  },
  {
    id: 'independence-day',
    title: 'Independence Day',
    monthDay: '08-15',
    description: 'National holiday celebrating India\'s independence from British rule in 1947, marked with flag hoisting ceremonies and patriotic programs.',
    location: 'Government offices, schools across Sikkim',
    category: 'Holiday',
    color: 'bg-purple-600',
    image: '/images/events/independence-day.jpg',
  },
  {
    id: 'gandhi-jayanti',
    title: 'Gandhi Jayanti',
    monthDay: '10-02',
    description: 'National holiday commemorating Mahatma Gandhi\'s birth anniversary, observed with prayers and remembrance programs.',
    location: 'Across Sikkim',
    category: 'Holiday',
    color: 'bg-purple-600',
    image: '/images/events/gandhi-jayanti.jpg',
  },

  // SIKKIM STATE SPECIFIC HOLIDAYS
  {
    id: 'statehood-day',
    title: 'Sikkim Statehood Day',
    monthDay: '05-16',
    description: 'Commemorates Sikkim becoming the 22nd state of India in 1975. Celebrated with official ceremonies, parades, and cultural programs.',
    location: 'Gangtok and district headquarters',
    category: 'Holiday',
    color: 'bg-indigo-600',
    image: '/images/events/statehood-day.jpg',
  },

  // BUDDHIST/TIBETAN FESTIVALS
  {
    id: 'losar',
    title: 'Losar (Tibetan New Year)',
    monthDay: '02-15',
    description: 'The most significant festival for Tibetan Buddhists, marking the beginning of the Tibetan New Year with three days of celebrations, prayers, feasts, and cultural performances.',
    location: 'Gangtok, Rumtek, Pemayangtse Monasteries',
    category: 'Festival',
    color: 'bg-rose-500',
    image: '/images/events/losar.jpg',
  },
  {
    id: 'saga-dawa',
    title: 'Saga Dawa',
    monthDay: '06-05',
    description: 'Triple blessed day commemorating Buddha\'s birth, enlightenment, and death (Parinirvana). Observed with prayers, processions, and merit-making activities.',
    location: 'Buddhist monasteries statewide',
    category: 'Religious',
    color: 'bg-emerald-500',
    image: '/images/events/saga-dawa.jpg',
  },
  {
    id: 'buddha-purnima',
    title: 'Buddha Purnima (Vesak)',
    monthDay: '05-12',
    description: 'Celebrating the birth anniversary of Gautama Buddha with prayers, meditation sessions, processions, and teachings in Buddhist monasteries.',
    location: 'Buddhist monasteries across Sikkim',
    category: 'Religious',
    color: 'bg-violet-500',
    image: '/images/events/buddha-purnima.jpg',
  },
  {
    id: 'drukpa-tsechi',
    title: 'Drukpa Tsechi',
    monthDay: '07-30',
    description: 'Commemorates Buddha\'s first sermon at Sarnath (Turning of the Wheel of Dharma). Observed with special prayers and teachings.',
    location: 'Buddhist monasteries, North Sikkim',
    category: 'Religious',
    color: 'bg-violet-500',
    image: '/images/events/drukpa-tsechi.jpg',
  },
  {
    id: 'bumchu',
    title: 'Bumchu Festival',
    monthDay: '01-25',
    description: 'Sacred water ceremony at Tashiding Monastery where the water level in a holy pot predicts Sikkim\'s fortune for the coming year.',
    location: 'Tashiding Monastery, West Sikkim',
    category: 'Religious',
    color: 'bg-violet-500',
    image: '/images/events/bumchu.jpg',
  },
  {
    id: 'kagyed-dance',
    title: 'Kagyed Dance Festival',
    monthDay: '12-28',
    description: 'Buddhist festival where masked monks perform sacred Chaam dances representing the destruction of evil forces and protection of dharma.',
    location: 'Rumtek & Phodong Monasteries',
    category: 'Cultural',
    color: 'bg-sky-500',
    image: '/images/events/kagyed.jpg',
  },

  // BHUTIA COMMUNITY FESTIVALS
  {
    id: 'pang-lhabsol',
    title: 'Pang Lhabsol',
    monthDay: '09-13',
    description: 'Unique festival worshipping Mount Khangchendzonga and guardian deities. Features spectacular Chaam dances, warrior processions, and rituals for protection.',
    location: 'Pemayangtse Monastery, West Sikkim',
    category: 'Cultural',
    color: 'bg-sky-500',
    image: '/images/events/pang-lhabsol.jpg',
  },
  {
    id: 'losoong',
    title: 'Losoong (Sikkimese New Year)',
    monthDay: '12-15',
    description: 'Harvest festival celebrated by Bhutia and Lepcha communities with traditional archery competitions, mask dances, folk songs, and local delicacies.',
    location: 'North & West Sikkim villages',
    category: 'Harvest',
    color: 'bg-amber-500',
    image: '/images/events/losoong.jpg',
  },

  // LEPCHA COMMUNITY FESTIVALS
  {
    id: 'tendong-lho-rum-faat',
    title: 'Tendong Lho Rum Faat',
    monthDay: '08-08',
    description: 'Sacred Lepcha festival worshipping Mount Tendong, believed to have saved the Lepcha people from deluge. Involves community trekking and rituals.',
    location: 'Tendong Hill, South Sikkim',
    category: 'Cultural',
    color: 'bg-teal-500',
    image: '/images/events/tendong.jpg',
  },
  {
    id: 'namsoong',
    title: 'Namsoong',
    monthDay: '09-10',
    description: 'Lepcha harvest festival celebrating the completion of rice harvest with traditional dances, songs, and community feasting.',
    location: 'Lepcha villages, North & West Sikkim',
    category: 'Harvest',
    color: 'bg-amber-500',
    image: '/images/events/namsoong.jpg',
  },

  // TAMANG COMMUNITY FESTIVALS
  {
    id: 'sonam-lhochhar',
    title: 'Sonam Lhochhar',
    monthDay: '01-29',
    description: 'Tamang New Year celebrated with traditional Selo and Damphu music, cultural dances, community feasts, and prayers for prosperity.',
    location: 'Tamang communities across Sikkim',
    category: 'Festival',
    color: 'bg-rose-500',
    image: '/images/events/lhochhar.jpg',
  },

  // LIMBU COMMUNITY FESTIVALS
  {
    id: 'limbu-new-year',
    title: 'Limbu New Year (Chasok Tangnam)',
    monthDay: '12-30',
    description: 'Limbu community New Year celebration with traditional Ke Lang dance, cultural programs, and community bonding.',
    location: 'Limbu communities, East Sikkim',
    category: 'Festival',
    color: 'bg-rose-500',
    image: '/images/events/limbu-new-year.jpg',
  },

  // RAI COMMUNITY FESTIVALS
  {
    id: 'sakela-ubhauli',
    title: 'Sakela Ubhauli',
    monthDay: '05-01',
    description: 'Rai/Kirat festival marking the migration of birds and animals to higher altitudes, celebrated with traditional Sakela dance.',
    location: 'Rai communities across Sikkim',
    category: 'Cultural',
    color: 'bg-sky-500',
    image: '/images/events/sakela.jpg',
  },
  {
    id: 'sakela-udhauli',
    title: 'Sakela Udhauli',
    monthDay: '11-15',
    description: 'Rai/Kirat festival marking the migration back to lower altitudes, celebrated with Sakela dance and thanksgiving rituals.',
    location: 'Rai communities across Sikkim',
    category: 'Cultural',
    color: 'bg-sky-500',
    image: '/images/events/sakela-udhauli.jpg',
  },

  // MANGAR COMMUNITY FESTIVALS
  {
    id: 'barahimizong',
    title: 'Barahimizong',
    monthDay: '04-13',
    description: 'Significant Mangar community festival involving ancestral worship, traditional Mundhum chants, cultural performances, and community bonding.',
    location: 'Mangar communities across Sikkim',
    category: 'Cultural',
    color: 'bg-sky-500',
    image: '/images/events/barahimizong.jpg',
  },

  // HINDU FESTIVALS (2025 CORRECT DATES)
  {
    id: 'makar-sankranti',
    title: 'Makar Sankranti',
    monthDay: '01-14',
    description: 'Hindu harvest festival marking the sun\'s transition into Capricorn, celebrated with kite flying, sesame sweets, and prayers for prosperity.',
    location: 'Hindu communities across Sikkim',
    category: 'Festival',
    color: 'bg-rose-500',
    image: '/images/events/makar-sankranti.jpg',
  },
  {
    id: 'maha-shivratri',
    title: 'Maha Shivratri',
    monthDay: '02-26',
    description: 'Great night of Lord Shiva celebrated with all-night vigils, fasting, prayers, and special offerings at Shiva temples.',
    location: 'Shiva temples across Sikkim',
    category: 'Religious',
    color: 'bg-violet-500',
    image: '/images/events/maha-shivratri.jpg',
  },
  {
    id: 'holi',
    title: 'Holi (Festival of Colors)',
    monthDay: '03-13',
    description: 'Vibrant Hindu festival celebrating the victory of good over evil, marked by throwing colored powders, dancing, and community celebrations.',
    location: 'Hindu communities across Sikkim',
    category: 'Festival',
    color: 'bg-rose-500',
    image: '/images/events/holi.jpg',
  },
  {
    id: 'ram-nawami',
    title: 'Ram Nawami (Chaite Dasain)',
    monthDay: '04-06',
    description: 'Hindu festival celebrating Lord Rama\'s birth with temple prayers, processions, readings from Ramayana, and community gatherings.',
    location: 'Hindu temples across Sikkim',
    category: 'Religious',
    color: 'bg-emerald-500',
    image: '/images/events/ram-nawami.jpg',
  },
  {
    id: 'hanuman-jayanti',
    title: 'Hanuman Jayanti',
    monthDay: '04-13',
    description: 'Birthday celebration of Lord Hanuman with special prayers, hymn recitations, and distribution of blessed food.',
    location: 'Hanuman temples across Sikkim',
    category: 'Religious',
    color: 'bg-violet-500',
    image: '/images/events/hanuman-jayanti.jpg',
  },
  {
    id: 'akshaya-tritiya',
    title: 'Akshaya Tritiya',
    monthDay: '05-02',
    description: 'Auspicious Hindu festival considered the most favorable day for new ventures, gold purchases, and charitable activities.',
    location: 'Hindu communities across Sikkim',
    category: 'Religious',
    color: 'bg-emerald-500',
    image: '/images/events/akshaya-tritiya.jpg',
  },
  {
    id: 'rath-yatra',
    title: 'Rath Yatra',
    monthDay: '06-29',
    description: 'Festival of chariots dedicated to Lord Jagannath with colorful processions and traditional celebrations.',
    location: 'Hindu temples, especially Gangtok',
    category: 'Festival',
    color: 'bg-rose-500',
    image: '/images/events/rath-yatra.jpg',
  },
  {
    id: 'guru-purnima',
    title: 'Guru Purnima',
    monthDay: '07-13',
    description: 'Festival honoring spiritual teachers and gurus with prayers, offerings, and gratitude ceremonies.',
    location: 'Temples and ashrams across Sikkim',
    category: 'Religious',
    color: 'bg-violet-500',
    image: '/images/events/guru-purnima.jpg',
  },
  {
    id: 'nag-panchami',
    title: 'Nag Panchami',
    monthDay: '08-09',
    description: 'Hindu festival dedicated to serpent deities with prayers for protection and offerings of milk and flowers.',
    location: 'Hindu temples across Sikkim',
    category: 'Religious',
    color: 'bg-violet-500',
    image: '/images/events/nag-panchami.jpg',
  },
  {
    id: 'raksha-bandhan',
    title: 'Raksha Bandhan',
    monthDay: '08-19',
    description: 'Festival celebrating the bond between brothers and sisters with the tying of protective threads (rakhi).',
    location: 'Hindu families across Sikkim',
    category: 'Festival',
    color: 'bg-rose-500',
    image: '/images/events/raksha-bandhan.jpg',
  },
  {
    id: 'janmashtami',
    title: 'Krishna Janmashtami',
    monthDay: '08-16',
    description: 'Hindu festival celebrating Lord Krishna\'s birth with devotional songs, dance performances, and midnight celebrations.',
    location: 'Krishna temples across Sikkim',
    category: 'Religious',
    color: 'bg-violet-500',
    image: '/images/events/janmashtami.jpg',
  },
  {
    id: 'ganesh-chaturthi',
    title: 'Ganesh Chaturthi',
    monthDay: '08-29',
    description: 'Festival celebrating Lord Ganesha with elaborate decorations, prayers, and immersion ceremonies lasting 10 days.',
    location: 'Hindu communities, especially Gangtok',
    category: 'Festival',
    color: 'bg-rose-500',
    image: '/images/events/ganesh-chaturthi.jpg',
  },
  {
    id: 'pitru-paksha',
    title: 'Pitru Paksha',
    monthDay: '09-14',
    description: 'Hindu period of ancestral worship with rituals and offerings to honor departed family members and ancestors.',
    location: 'Hindu families across Sikkim',
    category: 'Religious',
    color: 'bg-violet-500',
    image: '/images/events/pitru-paksha.jpg',
  },
  {
    id: 'navratri',
    title: 'Navratri',
    monthDay: '09-22',
    description: 'Nine-night festival worshipping Goddess Durga with fasting, prayers, traditional dances, and cultural programs.',
    location: 'Hindu temples and communities',
    category: 'Festival',
    color: 'bg-rose-500',
    image: '/images/events/navratri.jpg',
  },
  {
    id: 'dussehra',
    title: 'Dussehra (Vijayadashami)',
    monthDay: '10-02',
    description: 'Major Hindu festival celebrating the victory of Lord Rama over Ravana and good over evil, marked by burning of Ravana effigies and cultural programs.',
    location: 'Hindu communities across Sikkim',
    category: 'Festival',
    color: 'bg-rose-500',
    image: '/images/events/dussehra.jpg',
  },
  {
    id: 'durga-puja',
    title: 'Durga Puja',
    monthDay: '09-30',
    description: 'Major Hindu festival honoring Goddess Durga with elaborate decorations, cultural programs, and community celebrations lasting five days.',
    location: 'Hindu communities, especially Gangtok',
    category: 'Festival',
    color: 'bg-rose-500',
    image: '/images/events/durga-puja.jpg',
  },
  {
    id: 'dasain',
    title: 'Dasain (Dashain)',
    monthDay: '09-22',
    description: 'Longest Hindu festival celebrating victory of good over evil. Features Durga Puja, animal sacrifices, family reunions, and Tika blessings.',
    location: 'Nepali Hindu communities across Sikkim',
    category: 'Festival',
    color: 'bg-red-600',
    image: '/images/events/dasain.jpg',
  },
  {
    id: 'karva-chauth',
    title: 'Karva Chauth',
    monthDay: '10-20',
    description: 'Hindu festival where married women fast for their husbands\' longevity and well-being, breaking fast after moonrise.',
    location: 'Hindu families across Sikkim',
    category: 'Religious',
    color: 'bg-violet-500',
    image: '/images/events/karva-chauth.jpg',
  },
  {
    id: 'tihaar',
    title: 'Tihaar (Diwali)',
    monthDay: '10-31',
    description: 'Five-day festival of lights celebrated with oil lamps, colorful rangoli, fireworks, cultural programs, and prayers to Goddess Lakshmi.',
    location: 'Hindu communities across Sikkim',
    category: 'Festival',
    color: 'bg-orange-500',
    image: '/images/events/tihaar.jpg',
  },
  {
    id: 'govardhan-puja',
    title: 'Govardhan Puja',
    monthDay: '11-02',
    description: 'Hindu festival commemorating Lord Krishna lifting Govardhan hill, celebrated with food offerings and prayers.',
    location: 'Krishna temples across Sikkim',
    category: 'Religious',
    color: 'bg-violet-500',
    image: '/images/events/govardhan-puja.jpg',
  },
  {
    id: 'bhai-dooj',
    title: 'Bhai Dooj',
    monthDay: '11-03',
    description: 'Hindu festival celebrating the bond between brothers and sisters with prayers, tilaka ceremonies, and gift exchanges.',
    location: 'Hindu families across Sikkim',
    category: 'Festival',
    color: 'bg-rose-500',
    image: '/images/events/bhai-dooj.jpg',
  },
  {
    id: 'kali-puja',
    title: 'Kali Puja',
    monthDay: '10-31',
    description: 'Hindu festival dedicated to Goddess Kali, celebrated with elaborate decorations, prayers, and cultural performances during new moon night.',
    location: 'Kali temples across Sikkim',
    category: 'Religious',
    color: 'bg-violet-500',
    image: '/images/events/kali-puja.jpg',
  },
  {
    id: 'chhath-puja',
    title: 'Chhath Puja',
    monthDay: '11-07',
    description: 'Ancient Hindu festival dedicated to Sun God, celebrated with ritual fasting, standing in water, and offering prayers at sunrise and sunset.',
    location: 'Rivers and water bodies across Sikkim',
    category: 'Religious',
    color: 'bg-violet-500',
    image: '/images/events/chhath-puja.jpg',
  },
  {
    id: 'tulsi-vivah',
    title: 'Tulsi Vivah',
    monthDay: '11-13',
    description: 'Hindu festival celebrating the ceremonial marriage of Tulsi plant to Lord Vishnu with prayers and traditional rituals.',
    location: 'Hindu homes and temples',
    category: 'Religious',
    color: 'bg-violet-500',
    image: '/images/events/tulsi-vivah.jpg',
  },
  {
    id: 'kartik-purnima',
    title: 'Kartik Purnima',
    monthDay: '11-15',
    description: 'Auspicious Hindu festival with river baths, temple visits, and lighting of diyas, especially sacred for Lord Vishnu devotees.',
    location: 'Rivers and temples across Sikkim',
    category: 'Religious',
    color: 'bg-violet-500',
    image: '/images/events/kartik-purnima.jpg',
  },

  // CHRISTIAN FESTIVALS (2025 CORRECT DATES)
  {
    id: 'good-friday',
    title: 'Good Friday',
    monthDay: '04-18',
    description: 'Christian holy day commemorating the crucifixion of Jesus Christ, observed with prayers, church services, and solemn remembrance.',
    location: 'Christian churches across Sikkim',
    category: 'Religious',
    color: 'bg-violet-500',
    image: '/images/events/good-friday.jpg',
  },
  {
    id: 'easter',
    title: 'Easter Sunday',
    monthDay: '04-20',
    description: 'Christian festival celebrating the resurrection of Jesus Christ, observed with special church services, prayers, and community gatherings.',
    location: 'Christian churches across Sikkim',
    category: 'Religious',
    color: 'bg-violet-500',
    image: '/images/events/easter.jpg',
  },
  {
    id: 'christmas',
    title: 'Christmas',
    monthDay: '12-25',
    description: 'Christian festival celebrating the birth of Jesus Christ, observed with church services, carols, decorations, and community celebrations.',
    location: 'Christian communities across Sikkim',
    category: 'Religious',
    color: 'bg-violet-500',
    image: '/images/events/christmas.jpg',
  },

  // ISLAMIC FESTIVALS (2025 CORRECT DATES)
  {
    id: 'eid-ul-fitr',
    title: 'Eid-ul-Fitr',
    monthDay: '03-31',
    description: 'Islamic festival marking the end of Ramadan fasting month, celebrated with prayers, feasting, and charity giving.',
    location: 'Muslim communities across Sikkim',
    category: 'Religious',
    color: 'bg-violet-500',
    image: '/images/events/eid-ul-fitr.jpg',
  },
  {
    id: 'eid-ul-adha',
    title: 'Eid-ul-Adha',
    monthDay: '06-07',
    description: 'Islamic festival of sacrifice commemorating Abraham\'s willingness to sacrifice his son, celebrated with prayers and community feasting.',
    location: 'Muslim communities across Sikkim',
    category: 'Religious',
    color: 'bg-violet-500',
    image: '/images/events/eid-ul-adha.jpg',
  },

  // MODERN/CULTURAL EVENTS
  {
    id: 'international-mountain-day',
    title: 'International Mountain Day',
    monthDay: '12-11',
    description: 'Global observance highlighting the importance of mountains, celebrated in Sikkim with environmental awareness programs and cultural events.',
    location: 'Across Sikkim',
    category: 'Cultural',
    color: 'bg-sky-500',
    image: '/images/events/mountain-day.jpg',
  },
  {
    id: 'world-tourism-day',
    title: 'World Tourism Day',
    monthDay: '09-27',
    description: 'International day promoting tourism awareness, celebrated in Sikkim with cultural showcases and tourism promotional activities.',
    location: 'Tourist destinations across Sikkim',
    category: 'Cultural',
    color: 'bg-sky-500',
    image: '/images/events/tourism-day.jpg',
  }
];

// Function to generate events for a specific year
export function generateEventsForYear(year: number): CulturalEvent[] {
  return baseSikkimEvents.map(event => ({
    ...event,
    date: `${year}-${event.monthDay}`,
    id: `${event.id}-${year}`
  }));
}

// Function to generate events for multiple years (useful for long-term planning)
export function generateEventsForYearRange(startYear: number, endYear: number): CulturalEvent[] {
  const allEvents: CulturalEvent[] = [];
  for (let year = startYear; year <= endYear; year++) {
    allEvents.push(...generateEventsForYear(year));
  }
  return allEvents;
}

// Default events for current year
export const sikkimEvents: CulturalEvent[] = generateEventsForYear(new Date().getFullYear());

// Add more September festivals while retaining existing ones
// This will be added to the generateEventsForYear function

// Additional September festivals for Sikkim cultural calendar:
// - Teej Festival (Sep 2)
// - Karma Puja (Sep 5) 
// - Indra Jatra Festival (Sep 8)
// - Himalayan Heritage Festival (Sep 12)
// - Dussehra Celebrations (Sep 15)
// - Sikkimese Cuisine Festival (Sep 18)
// - Monastery Art Exhibition (Sep 21)
// - Lepcha Heritage Day (Sep 24)
// - Autumn Harvest Festival (Sep 27)
// - Traditional Mask Dance Festival (Sep 30)
