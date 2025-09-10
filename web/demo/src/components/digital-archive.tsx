'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, Calendar, MapPin, Eye, Heart, Clock, User, Tag, X } from 'lucide-react';
import Header from './header';

interface ArchiveItem {
  id: string;
  title: string;
  description: string;
  category: 'photograph' | 'document' | 'video' | 'audio' | 'artifact';
  year: number;
  location: string;
  thumbnail: string;
  tags: string[];
  views: number;
  likes: number;
  contributor: string;
  dateAdded: string;
  fileSize?: string;
  duration?: string;
}

const archiveData: ArchiveItem[] = [
  {
    id: '1',
    title: 'Traditional Lepcha Dance Performance - Cultural Tourism',
    description: 'A mesmerizing performance of the traditional Lepcha dance during Tendong Lho Rum Faat festival, showcasing the rich cultural heritage that attracts cultural tourists to Sikkim.',
    category: 'photograph',
    year: 1985,
    location: 'Gangtok Cultural Center, East Sikkim',
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center',
    tags: ['culture', 'dance', 'lepcha', 'festival', 'traditional', 'cultural-tourism', 'gangtok'],
    views: 2847,
    likes: 156,
    contributor: 'Sikkim Cultural Heritage & Tourism Board',
    dateAdded: '2023-08-15'
  },
  {
    id: '2',
    title: 'Rumtek Monastery - Spiritual Tourism Destination',
    description: 'Rare Buddhist manuscripts and artifacts from Rumtek Monastery, one of Sikkim\'s most visited spiritual tourism destinations, attracting thousands of pilgrims yearly.',
    category: 'document',
    year: 1578,
    location: 'Rumtek Monastery, East Sikkim',
    thumbnail: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop&crop=center',
    tags: ['buddhism', 'manuscripts', 'monastery', 'ancient', 'texts', 'spiritual-tourism', 'rumtek'],
    views: 1923,
    likes: 89,
    contributor: 'Rumtek Monastery Tourism Archives',
    dateAdded: '2023-07-22'
  },
  {
    id: '3',
    title: 'Kanchenjunga Sunrise - Premier Tourism Experience',
    description: 'A breathtaking timelapse video capturing the golden sunrise over Mount Kanchenjunga from Tiger Hill, one of Sikkim\'s most popular tourism attractions.',
    category: 'video',
    year: 2019,
    location: 'Tiger Hill, Darjeeling-Sikkim Border',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
    tags: ['kanchenjunga', 'sunrise', 'mountains', 'nature', 'timelapse', 'tiger-hill', 'mountain-tourism'],
    views: 5621,
    likes: 342,
    contributor: 'Himalayan Tourism Photography Collective',
    dateAdded: '2023-09-03',
    duration: '4:23'
  },
  {
    id: '4',
    title: 'North Sikkim Folk Music - Cultural Tourism Audio',
    description: 'Traditional folk songs from Lachung and Lachen villages, preserved as part of cultural tourism initiatives showcasing authentic mountain community traditions.',
    category: 'audio',
    year: 1992,
    location: 'Lachung & Lachen Villages, North Sikkim',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center',
    tags: ['folk', 'songs', 'traditional', 'village', 'oral-history', 'north-sikkim', 'cultural-tourism'],
    views: 1456,
    likes: 78,
    contributor: 'North Sikkim Cultural Tourism Project',
    dateAdded: '2023-06-18',
    duration: '12:45'
  },
  {
    id: '5',
    title: 'Handwoven Textiles - Tourism Craft Souvenirs',
    description: 'Exquisite handwoven Lepcha textiles showcased in tourism craft centers, featuring traditional patterns that make popular souvenirs for visitors.',
    category: 'artifact',
    year: 1920,
    location: 'Gangtok Craft Emporium & Kalimpong Markets',
    thumbnail: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=300&fit=crop&crop=center',
    tags: ['textiles', 'lepcha', 'handwoven', 'traditional', 'crafts', 'souvenirs', 'tourism-shopping'],
    views: 987,
    likes: 45,
    contributor: 'Sikkim Handicrafts & Tourism Development',
    dateAdded: '2023-05-30'
  },
  {
    id: '6',
    title: 'Historical Treaties - Heritage Tourism Documents',
    description: 'Original documents from the Treaty of Titalia (1817), displayed in heritage tourism sites showcasing Sikkim\'s colonial history and political evolution.',
    category: 'document',
    year: 1817,
    location: 'Heritage Museum, Darjeeling-Sikkim Border',
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center',
    tags: ['history', 'treaty', 'british', 'colonial', 'documents', 'heritage-tourism', 'museums'],
    views: 2134,
    likes: 92,
    contributor: 'Heritage Tourism Documentation Center',
    dateAdded: '2023-08-07'
  },
  {
    id: '7',
    title: 'Cham Dance Festival - Religious Tourism Spectacle',
    description: 'Sacred Cham dance at Pemayangtse Monastery, a major religious tourism attraction featuring elaborate masks and drawing international visitors.',
    category: 'video',
    year: 2018,
    location: 'Pemayangtse Monastery, West Sikkim',
    thumbnail: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop&crop=center',
    tags: ['cham-dance', 'monastery', 'masks', 'ceremony', 'spiritual', 'religious-tourism', 'festivals'],
    views: 3892,
    likes: 198,
    contributor: 'West Sikkim Monastery Tourism Circuit',
    dateAdded: '2023-07-14',
    duration: '8:17'
  },
  {
    id: '8',
    title: 'Royal Palace Architecture - Heritage Tourism Site',
    description: 'Former Royal Palace of Sikkim, now a major heritage tourism attraction in Gangtok showcasing traditional Sikkimese royal architecture.',
    category: 'photograph',
    year: 1975,
    location: 'Gangtok Royal Palace Complex, East Sikkim',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Tsuklakhang.jpg',
    tags: ['architecture', 'palace', 'royal', 'traditional', 'heritage', 'gangtok-tourism', 'royal-heritage'],
    views: 2756,
    likes: 134,
    contributor: 'Gangtok Heritage Tourism Board',
    dateAdded: '2023-09-12'
  },
  {
    id: '9',
    title: 'Yumthang Valley Flowers - Nature Tourism Paradise',
    description: 'Valley of Flowers in North Sikkim, featuring rare Himalayan flora and serving as a premier nature tourism destination for eco-tourists.',
    category: 'photograph',
    year: 2020,
    location: 'Yumthang Valley (Valley of Flowers), North Sikkim',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop&crop=center',
    tags: ['flora', 'himalayan', 'botanical', 'medicinal', 'endemic', 'yumthang', 'nature-tourism', 'eco-tourism'],
    views: 4789,
    likes: 326,
    contributor: 'North Sikkim Nature Tourism Division',
    dateAdded: '2023-09-20'
  },
  {
    id: '10',
    title: 'Prayer Wheels Circuit - Spiritual Tourism Trail',
    description: 'Ancient Tibetan prayer wheels along Gangtok\'s spiritual tourism circuit, popular with pilgrims and cultural tourists seeking authentic experiences.',
    category: 'artifact',
    year: 1650,
    location: 'Enchey Monastery & Spiritual Circuit, Gangtok',
    thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop&crop=center',
    tags: ['tibetan', 'prayer-wheels', 'monastery', 'spiritual', 'artifacts', 'spiritual-tourism', 'pilgrimage'],
    views: 3234,
    likes: 287,
    contributor: 'Gangtok Spiritual Tourism Development',
    dateAdded: '2023-08-28'
  },
  {
    id: '11',
    title: 'Traditional Wedding Tourism - Cultural Experiences',
    description: 'Authentic Sikkimese wedding ceremony in Pelling, now offered as cultural tourism experiences for visitors wanting traditional celebrations.',
    category: 'video',
    year: 2017,
    location: 'Pelling Cultural Tourism Center, West Sikkim',
    thumbnail: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop&crop=center',
    tags: ['wedding', 'ceremony', 'traditional', 'customs', 'cultural', 'pelling', 'experiential-tourism'],
    views: 4567,
    likes: 298,
    contributor: 'West Sikkim Cultural Tourism Initiative',
    dateAdded: '2023-07-08',
    duration: '15:32'
  },
  {
    id: '12',
    title: 'Yuksom Historical Inscriptions - First Capital Tourism',
    description: 'Ancient stone inscriptions at Yuksom, Sikkim\'s first capital, now a UNESCO heritage tourism site attracting history enthusiasts.',
    category: 'document',
    year: 1200,
    location: 'Yuksom Historical Heritage Site, West Sikkim',
    thumbnail: 'https://media.assettype.com/outlookindia/import/uploadimage/library/16_9/16_9_5/IMAGE_1651817268.webp?w=801&auto=format%2Ccompress&fit=max&format=webp&dpr=1.0',
    tags: ['stone', 'inscriptions', 'ancient', 'historical', 'scripts', 'yuksom', 'heritage-tourism', 'unesco'],
    views: 2654,
    likes: 172,
    contributor: 'Yuksom Heritage Tourism Project',
    dateAdded: '2023-06-25'
  },
  {
    id: '13',
    title: 'Mountain Music Tourism - Adventure Soundtrack',
    description: 'Traditional Sikkimese music performed during trekking expeditions, enhancing the adventure tourism experience in North Sikkim mountains.',
    category: 'audio',
    year: 1988,
    location: 'Trekking Routes & Base Camps, North Sikkim',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop&crop=center',
    tags: ['music', 'traditional', 'instruments', 'damphu', 'tungna', 'adventure-tourism', 'trekking'],
    views: 3089,
    likes: 256,
    contributor: 'Sikkim Adventure Tourism & Music Academy',
    dateAdded: '2023-08-14',
    duration: '18:45'
  },
  {
    id: '14',
    title: 'Tashiding Sacred Art - Pilgrimage Tourism',
    description: 'Ancient wall paintings at Tashiding Monastery, a sacred pilgrimage tourism destination known for its spiritual significance and artistic heritage.',
    category: 'photograph',
    year: 1716,
    location: 'Tashiding Sacred Monastery, West Sikkim',
    thumbnail: 'https://tripxl.com/blog/wp-content/uploads/2024/08/Sanga-Choeling-Monastery.jpg',
    tags: ['monastery', 'paintings', 'buddhist', 'mythology', 'spiritual', 'tashiding', 'pilgrimage-tourism'],
    views: 4456,
    likes: 345,
    contributor: 'Tashiding Pilgrimage Tourism Board',
    dateAdded: '2023-09-05'
  },
  {
    id: '15',
    title: 'Organic Farming Tourism - Agro Tourism Initiative',
    description: 'Traditional terraced farming in Ravangla, showcasing Sikkim\'s 100% organic farming practices as part of sustainable agro-tourism.',
    category: 'video',
    year: 2021,
    location: 'Ravangla Organic Farms, South Sikkim',
    thumbnail: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop&crop=center',
    tags: ['farming', 'agriculture', 'terracing', 'organic', 'sustainable', 'agro-tourism', 'ravangla'],
    views: 3890,
    likes: 278,
    contributor: 'South Sikkim Agro Tourism Development',
    dateAdded: '2023-09-18',
    duration: '12:28'
  },
  {
    id: '16',
    title: 'Monastery Ritual Vessels - Cultural Tourism Artifacts',
    description: 'Ancient copper vessels displayed in monastery museums along the cultural tourism circuit, showcasing traditional Buddhist craftsmanship.',
    category: 'artifact',
    year: 1780,
    location: 'Monastery Museums Circuit, Sikkim',
    thumbnail: 'https://www.wondersoftibet.com/wp-content/uploads/2020/02/Chapel-in-Shalu-Monastery-1024x731.jpg',
    tags: ['copper', 'vessels', 'ritual', 'metalwork', 'craftsmanship', 'monastery-museums', 'cultural-tourism'],
    views: 2432,
    likes: 189,
    contributor: 'Sikkim Monastery Tourism Network',
    dateAdded: '2023-07-30'
  },
  {
    id: '17',
    title: 'Rhododendron Festival - Eco Tourism Celebration',
    description: 'Annual Rhododendron Festival in Barsey, a major eco-tourism event celebrating Sikkim\'s state flower and attracting nature lovers globally.',
    category: 'photograph',
    year: 2019,
    location: 'Barsey Rhododendron Sanctuary, West Sikkim',
    thumbnail: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop&crop=center',
    tags: ['rhododendron', 'festival', 'biodiversity', 'state-flower', 'celebration', 'eco-tourism', 'barsey'],
    views: 6234,
    likes: 532,
    contributor: 'Sikkim Eco Tourism & Forest Department',
    dateAdded: '2023-09-25'
  },
  {
    id: '18',
    title: 'Lepcha Heritage Villages - Community Tourism',
    description: 'Oral histories from Dzongu Lepcha Reserve, showcasing indigenous culture through community-based tourism initiatives.',
    category: 'audio',
    year: 2020,
    location: 'Dzongu Lepcha Reserve, North Sikkim',
    thumbnail: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop&crop=center',
    tags: ['oral-history', 'elders', 'stories', 'legends', 'interviews', 'lepcha-heritage', 'community-tourism'],
    views: 2876,
    likes: 195,
    contributor: 'Dzongu Community Tourism Project',
    dateAdded: '2023-06-12',
    duration: '25:17'
  },
  {
    id: '19',
    title: 'Colonial Hill Stations - Heritage Tourism',
    description: 'British colonial era photographs showing the development of hill station tourism in the Darjeeling-Sikkim region.',
    category: 'photograph',
    year: 1890,
    location: 'Colonial Hill Stations, Darjeeling-Sikkim',
    thumbnail: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/b3/95/f0.jpg',
    tags: ['colonial', 'historical', 'british', 'hill-stations', 'heritage-tourism', 'darjeeling', 'vintage'],
    views: 4892,
    likes: 334,
    contributor: 'Colonial Heritage Tourism Archives',
    dateAdded: '2023-08-02'
  },
  {
    id: '20',
    title: 'Sacred Palm Manuscripts - Pilgrimage Tourism',
    description: 'Ancient Buddhist texts at Dubdi Monastery, Sikkim\'s oldest monastery and important pilgrimage tourism destination.',
    category: 'document',
    year: 1456,
    location: 'Dubdi Monastery (Oldest in Sikkim), West Sikkim',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center',
    tags: ['sacred-texts', 'buddhist', 'palm-leaves', 'mantras', 'philosophy', 'dubdi', 'pilgrimage-tourism'],
    views: 3567,
    likes: 267,
    contributor: 'Dubdi Monastery Pilgrimage Tourism',
    dateAdded: '2023-07-19'
  },
  {
    id: '21',
    title: 'Traditional Architecture Tourism - Heritage Documentary',
    description: 'Comprehensive documentary showcasing Sikkimese architecture featured in heritage tourism trails across the state.',
    category: 'video',
    year: 2022,
    location: 'Heritage Architecture Trail, Statewide Sikkim',
    thumbnail: 'https://www.artchitectours.com/wp-content/uploads/2018/11/shanghai-tradition-modernity-02-1.jpg',
    tags: ['architecture', 'documentary', 'traditional', 'buildings', 'design', 'heritage-tourism', 'trails'],
    views: 5321,
    likes: 387,
    contributor: 'Sikkim Heritage Architecture Tourism',
    dateAdded: '2023-09-10',
    duration: '22:14'
  },
  {
    id: '22',
    title: 'Traditional Jewelry Tourism - Craft Shopping',
    description: 'Handcrafted Sikkimese jewelry popular among tourists, featuring silver, coral, and turquoise in traditional designs.',
    category: 'artifact',
    year: 1850,
    location: 'Tourism Craft Markets, West Sikkim',
    thumbnail: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop&crop=center',
    tags: ['jewelry', 'traditional', 'silver', 'coral', 'turquoise', 'crafts', 'tourism-shopping'],
    views: 3345,
    likes: 298,
    contributor: 'West Sikkim Tourism Crafts Board',
    dateAdded: '2023-08-21'
  },
  {
    id: '23',
    title: 'Dawn Prayer Chants - Spiritual Tourism Experience',
    description: 'Sacred Buddhist chants recorded during dawn prayers, offering tourists authentic spiritual experiences across Sikkim\'s monasteries.',
    category: 'audio',
    year: 2023,
    location: 'Monastery Spiritual Tourism Circuit, Sikkim',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGXxX5O2MxrnluwoZOL_qFQo8-LTTuByfCg&s',
    tags: ['chants', 'buddhist', 'prayers', 'monastery', 'sacred', 'spiritual-tourism', 'meditation'],
    views: 4456,
    likes: 376,
    contributor: 'Sikkim Spiritual Tourism Development',
    dateAdded: '2023-09-28',
    duration: '31:42'
  },
  {
    id: '24',
    title: 'Historic Trade Route Maps - Trekking Tourism',
    description: 'Ancient trade route maps now used for developing adventure tourism and trekking trails connecting Tibet, Sikkim, and Bhutan.',
    category: 'document',
    year: 1835,
    location: 'Trans-Himalayan Trade Routes',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/1881_Map_of_Sikkim_by_Sir_Richard_Temple.jpg',
    tags: ['maps', 'historical', 'trade-routes', 'tibet', 'bhutan', 'adventure-tourism', 'trekking'],
    views: 2987,
    likes: 212,
    contributor: 'Sikkim Adventure Tourism Development',
    dateAdded: '2023-07-03'
  },
  {
    id: '25',
    title: 'Tsomgo Sacred Lake - High Altitude Tourism',
    description: 'Sacred rituals at Tsomgo Lake, a high-altitude glacial lake and major tourism destination offering spiritual and adventure experiences.',
    category: 'video',
    year: 2021,
    location: 'Tsomgo (Changu) Lake, East Sikkim',
    thumbnail: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=400&h=300&fit=crop&crop=center',
    tags: ['tsomgo', 'changu-lake', 'sacred', 'rituals', 'high-altitude', 'glacial', 'spiritual-tourism'],
    views: 5678,
    likes: 445,
    contributor: 'East Sikkim High Altitude Tourism',
    dateAdded: '2023-08-16',
    duration: '9:33'
  },
  {
    id: '26',
    title: 'MG Marg Shopping - Urban Tourism Experience',
    description: 'Vibrant pedestrian mall in Gangtok featuring handicrafts and souvenirs, central to Sikkim\'s urban tourism experience.',
    category: 'photograph',
    year: 2022,
    location: 'MG Marg Pedestrian Plaza, Gangtok',
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center',
    tags: ['handicrafts', 'markets', 'shopping', 'mg-marg', 'souvenirs', 'urban-tourism', 'gangtok'],
    views: 4234,
    likes: 312,
    contributor: 'Gangtok Urban Tourism Development',
    dateAdded: '2023-09-22'
  },
  {
    id: '27',
    title: 'Mountain Rescue Tourism Safety - Adventure Tourism',
    description: 'Mountain rescue operations documentation highlighting safety measures for adventure tourism in Sikkim\'s high-altitude regions.',
    category: 'document',
    year: 1995,
    location: 'High Altitude Adventure Tourism Zones, Sikkim',
    thumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop&crop=center',
    tags: ['rescue', 'operations', 'mountain-safety', 'adventure-tourism', 'high-altitude', 'trekking-safety'],
    views: 2145,
    likes: 98,
    contributor: 'Sikkim Adventure Tourism Safety Board',
    dateAdded: '2023-06-08'
  },
  {
    id: '28',
    title: 'Culinary Tourism - Traditional Sikkimese Cuisine',
    description: 'Traditional cooking methods showcased in culinary tourism experiences, featuring authentic momos, thukpa, and local delicacies.',
    category: 'video',
    year: 2020,
    location: 'Culinary Tourism Centers, Rural Sikkim',
    thumbnail: 'https://www.cordonbleu.edu/Files/MediaFile/42956.jpg',
    tags: ['cooking', 'traditional', 'cuisine', 'culinary-tourism', 'momos', 'thukpa', 'local-food'],
    views: 3567,
    likes: 289,
    contributor: 'Sikkim Culinary Tourism Board',
    dateAdded: '2023-07-25',
    duration: '16:45'
  },
  {
    id: '29',
    title: 'Festival Mask Tourism - Cultural Artifacts',
    description: 'Elaborate festival masks displayed in cultural tourism centers, representing various Buddhist deities and local folklore.',
    category: 'artifact',
    year: 1700,
    location: 'Cultural Tourism Museums, Sikkim',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGFnDEo0DHgHke99VDNjA3j5L1veu3e7Lnw&s',
    tags: ['masks', 'festivals', 'ceremonies', 'cultural-artifacts', 'museums', 'buddhist-art', 'folklore'],
    views: 2876,
    likes: 234,
    contributor: 'Sikkim Cultural Tourism Museums',
    dateAdded: '2023-08-11'
  },
  {
    id: '30',
    title: 'Village Homestays - Community Tourism Experience',
    description: 'Authentic homestay experiences in Sikkimese villages, showcasing sustainable community-based tourism initiatives.',
    category: 'photograph',
    year: 2023,
    location: 'Community Homestays, All Districts Sikkim',
    thumbnail: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400&h=300&fit=crop&crop=center',
    tags: ['homestay', 'community-tourism', 'village-life', 'sustainable', 'authentic-experience', 'rural-tourism'],
    views: 4123,
    likes: 356,
    contributor: 'Sikkim Community Tourism Network',
    dateAdded: '2023-09-30'
  }
];

const categories = [
  { key: 'all', label: 'All Tourism Archives', icon: '🏛️', color: 'bg-orange-500 dark:bg-orange-600' },
  { key: 'photograph', label: 'Tourism Photos', icon: '📸', color: 'bg-green-500 dark:bg-green-600' },
  { key: 'document', label: 'Tourism Documents', icon: '📜', color: 'bg-yellow-500 dark:bg-yellow-600' },
  { key: 'video', label: 'Tourism Videos', icon: '🎬', color: 'bg-red-500 dark:bg-red-600' },
  { key: 'audio', label: 'Tourism Audio', icon: '🎵', color: 'bg-purple-500 dark:bg-purple-600' },
  { key: 'artifact', label: 'Tourism Artifacts', icon: '🏺', color: 'bg-pink-500 dark:bg-pink-600' }
];

export default function DigitalArchive() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [filteredItems, setFilteredItems] = useState(archiveData);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(null);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Initialize with all items
  useEffect(() => {
    setFilteredItems(archiveData);
  }, []);

  // Filter items based on search and category
  useEffect(() => {
    let filtered = [...archiveData]; // Create a copy to avoid mutating original

    // Apply category filter first
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Apply year filter
    if (selectedYear !== 'all') {
      const yearRange = selectedYear.split('-');
      filtered = filtered.filter(item => {
        if (yearRange.length === 2) {
          return item.year >= parseInt(yearRange[0]) && item.year <= parseInt(yearRange[1]);
        }
        return item.year >= parseInt(selectedYear);
      });
    }

    // Apply search filter last
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        item.location.toLowerCase().includes(searchLower) ||
        item.contributor.toLowerCase().includes(searchLower)
      );
    }

    setFilteredItems(filtered);
  }, [searchTerm, selectedCategory, selectedYear]);

  const handleLike = (itemId: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const yearRanges = [
    { value: 'all', label: 'All Years' },
    { value: '2020-2024', label: '2020-2024' },
    { value: '2010-2019', label: '2010-2019' },
    { value: '2000-2009', label: '2000-2009' },
    { value: '1990-1999', label: '1990-1999' },
    { value: '1980-1989', label: '1980-1989' },
    { value: '1900-1979', label: 'Before 1980' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 dark:from-slate-900 dark:via-emerald-900 dark:to-blue-900 transition-colors duration-500">
      {/* Navigation Header */}
      <Header />
      
      {/* Tourism Hero Section */}
      <div ref={heroRef} className="mt-12 relative overflow-hidden bg-gradient-to-br from-blue-600 via-emerald-600 to-teal-600 dark:from-blue-800 dark:via-emerald-800 dark:to-teal-800 transition-colors duration-500">
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
        
        {/* Tourism Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 left-20 text-6xl animate-bounce">✈️</div>
          <div className="absolute top-32 right-24 text-4xl animate-float">🏔️</div>
          <div className="absolute bottom-32 left-16 text-5xl animate-float delay-1000">🎒</div>
          <div className="absolute bottom-20 right-20 text-4xl animate-bounce delay-2000">📸</div>
          <div className="absolute top-1/2 left-1/4 text-3xl animate-float delay-500">🧭</div>
          <div className="absolute top-1/3 right-1/3 text-5xl animate-float delay-1500">🏕️</div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center scroll-animate opacity-0 transform translate-y-8 transition-all duration-1000 ease-out">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-lg rounded-full text-white text-base font-bold mb-8 border border-white/40 shadow-xl">
              <span className="animate-spin-slow mr-3 text-xl">🎯</span>
              Sikkim Tourism Digital Collection
              <span className="ml-3 animate-pulse text-xl">🌟</span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-none tracking-tight">
              Explore
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 dark:from-yellow-400 dark:via-orange-400 dark:to-pink-400 bg-clip-text text-transparent block">
                Sikkim
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-blue-100 dark:text-blue-200 max-w-5xl mx-auto mb-10 leading-relaxed font-semibold">
              🗺️ Discover Hidden Treasures • 🎭 Cultural Experiences • 🏔️ Mountain Adventures • 🏛️ Heritage Sites
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => {
                  console.log('Start Exploring clicked'); // Debug log
                  // Reset filters to show all items
                  setSelectedCategory('all');
                  setSelectedYear('all');
                  setSearchTerm('');
                  // Small delay to ensure state updates, then scroll
                  setTimeout(() => {
                    itemsRef.current?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }, 150);
                }}
                className="group px-12 py-6 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-black text-xl rounded-3xl hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-3xl border-4 border-white/30 hover:border-white/50"
              >
                <span className="flex items-center">
                  🎫 Start Exploring
                  <span className="ml-4 group-hover:translate-x-3 transition-transform text-2xl">🚀</span>
                </span>
              </button>
              <button 
                onClick={() => {
                  console.log('Tourism Videos clicked'); // Debug log
                  // Force filter to video category
                  setSelectedCategory('video');
                  setSelectedYear('all');
                  setSearchTerm('');
                  // Ensure state updates before scrolling
                  setTimeout(() => {
                    itemsRef.current?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }, 200);
                }}
                className="px-12 py-6 bg-white/25 backdrop-blur-lg text-white font-black text-xl rounded-3xl border-4 border-white/50 hover:bg-white/35 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <span className="flex items-center">
                  📹 Tourism Videos
                  <span className="ml-3 text-xl">🎬</span>
                </span>
              </button>
            </div>
            
            {/* Tourism Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-xl">
                <div className="text-4xl mb-2">🏔️</div>
                <div className="text-3xl font-bold text-white">28 Peaks</div>
                <div className="text-blue-200">Above 7000m</div>
              </div>
              <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-xl">
                <div className="text-4xl mb-2">🏛️</div>
                <div className="text-3xl font-bold text-white">200+ Monasteries</div>
                <div className="text-blue-200">Spiritual Sites</div>
              </div>
              <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-xl">
                <div className="text-4xl mb-2">🌺</div>
                <div className="text-3xl font-bold text-white">5000+ Species</div>
                <div className="text-blue-200">Flora & Fauna</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tourism Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-8 -right-8 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-orange-600/20 dark:from-yellow-600/15 dark:to-orange-800/15 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-12 -left-12 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-cyan-600/20 dark:from-blue-600/15 dark:to-cyan-800/15 rounded-full animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Tourism Stats Section */}
      <div ref={statsRef} className="py-20 bg-gradient-to-r from-emerald-100 via-cyan-100 to-blue-100 dark:from-emerald-900 dark:via-cyan-900 dark:to-blue-900 border-y border-blue-200/50 dark:border-emerald-700/50 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 dark:text-gray-100 mb-4">
              🌟 Tourism Archives
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Preserving Sikkim's incredible journey through time
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '30,000+', label: 'Tourism Experiences', icon: '🎒', color: 'from-emerald-500 to-teal-500' },
              { number: '300+', label: 'Years of Heritage', icon: '🏛️', color: 'from-blue-500 to-cyan-500' },
              { number: '2,500+', label: 'Digital Stories', icon: '📖', color: 'from-purple-500 to-pink-500' },
              { number: '100%', label: 'Adventure Access', icon: '⚡', color: 'from-orange-500 to-red-500' }
            ].map((stat, index) => (
              <div key={index} className="text-center scroll-animate opacity-0 transform translate-y-4 transition-all duration-700 ease-out" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${stat.color} shadow-lg mb-4`}>
                  <div className="text-3xl text-white">{stat.icon}</div>
                </div>
                <div className="text-4xl md:text-5xl font-black text-gray-800 dark:text-gray-100 mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-400 font-semibold text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tourism Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-white/95 to-blue-50/95 dark:from-gray-800/95 dark:to-gray-700/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-blue-200/50 dark:border-gray-600/50 scroll-animate opacity-0 transform translate-y-4 transition-all duration-700 ease-out">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-black text-gray-800 dark:text-gray-100 mb-3">
              🎯 Explore Tourism Categories
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Find your perfect Sikkim adventure experience
            </p>
          </div>
          
          {/* Search Bar and View Toggle - Single Line */}
          <div className="flex items-center gap-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-blue-500 dark:text-blue-400 w-6 h-6" />
              <input
                type="text"
                placeholder="🔍 Search destinations, experiences, adventures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-5 border-3 border-blue-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 focus:border-blue-400 dark:focus:border-blue-400 bg-white/95 dark:bg-gray-700/95 text-gray-900 dark:text-gray-100 placeholder-blue-500 dark:placeholder-blue-300 text-lg font-medium transition-all duration-300"
              />
            </div>

            {/* View Toggle */}
            <div className="flex bg-blue-100 dark:bg-gray-700 rounded-2xl p-2 transition-colors duration-500">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-lg text-blue-600 dark:text-blue-400' : 'text-blue-400 dark:text-blue-300'}`}
                title="Grid View"
              >
                <div className="w-5 h-5 grid grid-cols-2 gap-1">
                  <div className="bg-current rounded"></div>
                  <div className="bg-current rounded"></div>
                  <div className="bg-current rounded"></div>
                  <div className="bg-current rounded"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-lg text-blue-600 dark:text-blue-400' : 'text-blue-400 dark:text-blue-300'}`}
                title="List View"
              >
                <div className="w-5 h-5 flex flex-col gap-1">
                  <div className="h-1 bg-current rounded"></div>
                  <div className="h-1 bg-current rounded"></div>
                  <div className="h-1 bg-current rounded"></div>
                </div>
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-8 text-center text-blue-600 dark:text-blue-400 text-lg font-semibold">
            🎉 Showing <span className="font-black text-blue-800 dark:text-blue-300">{filteredItems.length}</span> amazing tourism experiences
          </div>
        </div>
      </div>

      {/* Archive Items */}
      <div ref={itemsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div 
          key={`${selectedCategory}-${selectedYear}-${searchTerm}`}
          className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`group scroll-animate opacity-0 transform translate-y-4 transition-all duration-700 ease-out ${
                viewMode === 'grid' ? 'archive-card' : 'archive-list-item'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {viewMode === 'grid' ? (
                // Tourism Grid Card
                <div className="bg-gradient-to-br from-white/95 to-blue-50/95 dark:from-gray-800/95 dark:to-gray-700/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border-2 border-blue-200/50 dark:border-gray-600/50 hover:shadow-3xl hover:scale-105 transition-all duration-500 cursor-pointer h-auto min-h-[500px]"
                     onClick={() => setSelectedItem(item)}>
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Tourism Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold text-white ${
                        categories.find(cat => cat.key === item.category)?.color || 'bg-blue-500'
                      } shadow-lg`}>
                        {categories.find(cat => cat.key === item.category)?.icon} {item.category}
                      </span>
                      <span className="px-3 py-1 bg-yellow-500/90 backdrop-blur-sm rounded-full text-sm font-bold text-white shadow-lg">
                        {item.year}
                      </span>
                    </div>
                    
                    {/* Tourism Rating */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-green-500/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                        <span className="text-white text-sm font-bold">⭐ 4.8</span>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-black text-xl mb-2 line-clamp-2">{item.title}</h3>
                      <p className="text-blue-100 text-sm flex items-center font-medium">
                        <MapPin className="w-4 h-4 mr-2" />
                        {item.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-8 flex-1">
                    <p className="text-gray-700 dark:text-gray-300 text-base mb-6 line-clamp-3 leading-relaxed">{item.description}</p>
                    
                    {/* Tourism Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-gray-700 dark:to-gray-600 text-blue-700 dark:text-blue-300 text-sm rounded-full font-semibold border border-blue-200 dark:border-gray-600">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Tourism Stats */}
                    <div className="flex items-center justify-between text-base text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-6">
                        <span className="flex items-center font-semibold">
                          <Eye className="w-5 h-5 mr-2 text-blue-500" />
                          {item.views.toLocaleString()}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(item.id);
                          }}
                          className="flex items-center hover:text-red-500 transition-colors font-semibold"
                        >
                          <Heart className={`w-5 h-5 mr-2 ${likedItems.has(item.id) ? 'fill-red-500 text-red-500' : 'text-blue-500'}`} />
                          {(item.likes + (likedItems.has(item.id) ? 1 : 0)).toLocaleString()}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Tourism List Item
                <div className="bg-gradient-to-r from-white/95 to-blue-50/95 dark:from-gray-800/95 dark:to-gray-700/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-blue-200/50 dark:border-gray-600/50 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                     onClick={() => setSelectedItem(item)}>
                  <div className="flex gap-8">
                    <div className="w-48 h-36 flex-shrink-0 rounded-xl overflow-hidden shadow-lg">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-black text-2xl text-gray-900 dark:text-gray-100 line-clamp-2 leading-tight">{item.title}</h3>
                        <span className="text-base text-white bg-yellow-500 px-3 py-2 rounded-full font-bold ml-4">{item.year}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-base mb-4 line-clamp-3 leading-relaxed">{item.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.slice(0, 5).map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-gray-700 dark:to-gray-600 text-blue-700 dark:text-blue-300 text-sm rounded-full font-semibold border border-blue-200 dark:border-gray-600">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8 text-base text-gray-600 dark:text-gray-400">
                          <span className="flex items-center font-semibold">
                            <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                            {item.location}
                          </span>
                          <span className="flex items-center font-semibold">
                            <Eye className="w-5 h-5 mr-2 text-blue-500" />
                            {item.views.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex gap-3">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLike(item.id);
                            }}
                            className="p-3 hover:bg-blue-100 dark:hover:bg-gray-600 rounded-full transition-colors"
                          >
                            <Heart className={`w-6 h-6 ${likedItems.has(item.id) ? 'fill-red-500 text-red-500' : 'text-blue-500'}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🎒</div>
            <h3 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-4">No adventures found</h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Try exploring different categories to discover amazing Sikkim experiences</p>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300 transition-colors">
            <div className="relative">
              <img 
                src={selectedItem.thumbnail} 
                alt={selectedItem.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                  categories.find(cat => cat.key === selectedItem.category)?.color || 'bg-gray-500'
                }`}>
                  {categories.find(cat => cat.key === selectedItem.category)?.icon} {selectedItem.category}
                </span>
                <span className="px-3 py-1 bg-orange-100 dark:bg-gray-700 text-orange-800 dark:text-orange-300 rounded-full text-sm font-medium">
                  {selectedItem.year}
                </span>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{selectedItem.title}</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedItem.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mr-2" />
                      {selectedItem.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      {selectedItem.year}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <User className="w-4 h-4 mr-2" />
                      {selectedItem.contributor}
                    </div>
                    {selectedItem.duration && (
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-2" />
                        {selectedItem.duration}
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Statistics</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Views</span>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">{selectedItem.views}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Likes</span>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">{selectedItem.likes + (likedItems.has(selectedItem.id) ? 1 : 0)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Added</span>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">{new Date(selectedItem.dateAdded).toLocaleDateString()}</div>
                      </div>
                      {selectedItem.fileSize && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Size</span>
                          <div className="font-semibold text-gray-900 dark:text-gray-100">{selectedItem.fileSize}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-orange-100 dark:bg-gray-700 text-orange-800 dark:text-orange-300 text-xs rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <button 
                  onClick={() => handleLike(selectedItem.id)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                    likedItems.has(selectedItem.id)
                      ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/70'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 mr-2 ${likedItems.has(selectedItem.id) ? 'fill-current' : ''}`} />
                  {likedItems.has(selectedItem.id) ? 'Liked' : 'Like'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for tourism animations */}
      <style jsx>{`
        .scroll-animate {
          opacity: 0;
          transform: translateY(2rem);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .scroll-animate.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .archive-card:hover {
          transform: translateY(-0.5rem) scale(1.02);
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(2rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .border-3 {
          border-width: 3px;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}