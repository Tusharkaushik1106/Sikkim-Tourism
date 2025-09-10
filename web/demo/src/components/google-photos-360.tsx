"use client";
import { useState } from "react";
import { FiCamera, FiExternalLink, FiMapPin, FiX, FiMaximize2, FiNavigation } from "react-icons/fi";

type Photo360Item = {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  photographer?: string;
  location?: string;
};

type Props = {
  location?: string;
  lat?: number;
  lng?: number;
  title?: string;
  buttonText?: string;
  buttonStyle?: "primary" | "secondary" | "outline";
  className?: string;
};

export default function GooglePhotos360({
  location,
  lat,
  lng,
  title = "Google Photos 360°",
  buttonText = "View 360° Photos",
  buttonStyle = "primary",
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  // Default 360° photos for monasteries using Google Maps 360° photo embeds
  const defaultPhotos: Photo360Item[] = location?.toLowerCase().includes('rumtek') ? [
    {
      id: 'rumtek-360-1',
      title: 'Rumtek Monastery Main Entrance',
      description: 'The grand entrance to Rumtek Monastery with traditional Tibetan architecture',
      url: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.906928295704!2d88.56139015184537!3d27.290384029445423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a2d4c1b8d7f9%3A0x9d0e8b5ab1f5f1b7!2sRumtek%20Monastery!5e0!3m2!1sen!2sin!4v${Date.now()}`,
      thumbnail: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=150&h=150&fit=crop&crop=center',
      photographer: 'Monastery360 Team',
      location: 'Rumtek Monastery'
    },
    {
      id: 'rumtek-360-2',
      title: 'Dharma Chakra Centre Interior',
      description: 'The main prayer hall with beautiful Buddhist artwork and architecture',
      url: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.906928295704!2d88.56139015184537!3d27.290384029445423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a2d4c1b8d7f9%3A0x9d0e8b5ab1f5f1b7!2sRumtek%20Monastery!5e0!3m2!1sen!2sin!4v${Date.now()}`,
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop&crop=center',
      photographer: 'Monastery360 Team',
      location: 'Rumtek Monastery'
    },
    {
      id: 'rumtek-360-3',
      title: 'Monastery Courtyard',
      description: 'Peaceful monastery grounds with prayer flags and mountain views',
      url: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.906928295704!2d88.56139015184537!3d27.290384029445423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a2d4c1b8d7f9%3A0x9d0e8b5ab1f5f1b7!2sRumtek%20Monastery!5e0!3m2!1sen!2sin!4v${Date.now()}`,
      thumbnail: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=150&h=150&fit=crop&crop=center',
      photographer: 'Monastery360 Team',
      location: 'Rumtek Monastery'
    }
  ] : location?.toLowerCase().includes('ranka') ? [
    {
      id: 'ranka-360-1',
      title: 'Ranka Monastery Main Entrance',
      description: 'Modern entrance to Ranka Monastery with contemporary design',
      url: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.906928295704!2d88.6700!3d27.3202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a2d4c1b8d7f9%3A0x9d0e8b5ab1f5f1b7!2sRanka%20Monastery!5e0!3m2!1sen!2sin!4v${Date.now()}`,
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop&crop=center',
      photographer: 'Monastery360 Team',
      location: 'Ranka Monastery'
    },
    {
      id: 'ranka-360-2',
      title: 'Modern Architecture Hall',
      description: 'Contemporary design elements blending with traditional Tibetan architecture',
      url: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.906928295704!2d88.6700!3d27.3202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a2d4c1b8d7f9%3A0x9d0e8b5ab1f5f1b7!2sRanka%20Monastery!5e0!3m2!1sen!2sin!4v${Date.now()}`,
      thumbnail: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=150&h=150&fit=crop&crop=center',
      photographer: 'Monastery360 Team',
      location: 'Ranka Monastery'
    },
    {
      id: 'ranka-360-3',
      title: 'Mountain Views from Monastery',
      description: 'Stunning views of the Himalayan mountains from the monastery',
      url: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.906928295704!2d88.6700!3d27.3202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a2d4c1b8d7f9%3A0x9d0e8b5ab1f5f1b7!2sRanka%20Monastery!5e0!3m2!1sen!2sin!4v${Date.now()}`,
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop&crop=center',
      photographer: 'Monastery360 Team',
      location: 'Ranka Monastery'
    }
  ] : [];

  const getButtonClasses = () => {
    const baseClasses = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2";
    
    switch (buttonStyle) {
      case "primary":
        return `${baseClasses} bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl`;
      case "secondary":
        return `${baseClasses} bg-secondary text-white hover:bg-secondary-dark shadow-lg hover:shadow-xl`;
      case "outline":
        return `${baseClasses} border-2 border-primary text-primary hover:bg-primary hover:text-white`;
      default:
        return `${baseClasses} bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl`;
    }
  };

  if (defaultPhotos.length === 0) return null;

  return (
    <div className={className}>
      <button
        onClick={() => setOpen(true)}
        className={getButtonClasses()}
      >
        <FiCamera className="h-5 w-5" />
        {buttonText}
        <FiMaximize2 className="h-4 w-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-0 bg-black">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-700 px-6 py-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <FiCamera className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {defaultPhotos[currentPhoto].title} • {currentPhoto + 1} of {defaultPhotos.length}
                  </p>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPhoto(Math.max(0, currentPhoto - 1))}
                  disabled={currentPhoto === 0}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FiNavigation className="h-4 w-4 rotate-180" />
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400 px-2">
                  {currentPhoto + 1}/{defaultPhotos.length}
                </span>
                <button
                  onClick={() => setCurrentPhoto(Math.min(defaultPhotos.length - 1, currentPhoto + 1))}
                  disabled={currentPhoto === defaultPhotos.length - 1}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FiNavigation className="h-4 w-4" />
                </button>
              </div>
              
              <button 
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2" 
                onClick={() => setOpen(false)}
              >
                <FiX className="h-4 w-4" />
                Close
              </button>
            </div>
            
            {/* 360° Photo Container */}
            <div className="relative" style={{ height: "calc(100vh - 73px)" }}>
              <iframe
                key={defaultPhotos[currentPhoto].id}
                src={defaultPhotos[currentPhoto].url}
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              
              {/* Photo Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {defaultPhotos[currentPhoto].title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {defaultPhotos[currentPhoto].description}
                  </p>
                  {defaultPhotos[currentPhoto].photographer && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Photo by {defaultPhotos[currentPhoto].photographer}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Photo Thumbnails */}
              <div className="absolute top-4 left-4 right-4">
                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2 overflow-x-auto">
                    {defaultPhotos.map((photo, index) => (
                      <button
                        key={photo.id}
                        onClick={() => setCurrentPhoto(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                          index === currentPhoto
                            ? 'border-primary'
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                        }`}
                      >
                        <img
                          src={photo.thumbnail}
                          alt={photo.title}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

