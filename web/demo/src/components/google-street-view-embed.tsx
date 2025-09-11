"use client";
import { useMemo, useState } from "react";
import { FiX, FiEye, FiMaximize2, FiMapPin, FiCamera, FiNavigation } from "react-icons/fi";

type Viewpoint = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  heading: number;
  pitch: number;
  fov: number;
  description?: string;
};

type Props = {
  lat: number;
  lng: number;
  heading?: number;
  pitch?: number;
  fov?: number; // 0-120
  title?: string;
  buttonText?: string;
  buttonStyle?: "primary" | "secondary" | "outline";
  className?: string;
  viewpoints?: Viewpoint[];
  showMultipleViews?: boolean;
};

export default function GoogleStreetViewEmbed({
  lat,
  lng,
  heading = 0,
  pitch = 0,
  fov = 80,
  title = "Google Street View",
  buttonText = "Open 360° View",
  buttonStyle = "primary",
  className = "",
  viewpoints = [],
  showMultipleViews = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [currentViewpoint, setCurrentViewpoint] = useState(0);
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  // Create default viewpoint if none provided
  const allViewpoints = viewpoints.length > 0 ? viewpoints : [{
    id: 'default',
    name: 'Main View',
    lat,
    lng,
    heading,
    pitch,
    fov,
    description: 'Main entrance view'
  }];
  
  const currentView = allViewpoints[currentViewpoint];
  
  const src = useMemo(() => {
    const base = "https://www.google.com/maps/embed/v1/streetview";
    const params = new URLSearchParams({
      key: String(key || ""),
      location: `${currentView.lat},${currentView.lng}`,
      heading: String(currentView.heading),
      pitch: String(currentView.pitch),
      fov: String(currentView.fov),
    });
    return `${base}?${params.toString()}`;
  }, [key, currentView]);

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

  return (
    <div className={className}>
      <button
        onClick={() => setOpen(true)}
        className={getButtonClasses()}
      >
        <FiEye className="h-5 w-5" />
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
            {/* Enhanced Header with Viewpoint Navigation */}
            <div className="flex items-center justify-between border-b border-gray-700 px-6 py-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <FiEye className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                  {showMultipleViews && allViewpoints.length > 1 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {currentView.name} • {currentViewpoint + 1} of {allViewpoints.length}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Viewpoint Navigation */}
              {showMultipleViews && allViewpoints.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentViewpoint(Math.max(0, currentViewpoint - 1))}
                    disabled={currentViewpoint === 0}
                    className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiNavigation className="h-4 w-4 rotate-180" />
                  </button>
                  <span className="text-sm text-gray-600 dark:text-gray-400 px-2">
                    {currentViewpoint + 1}/{allViewpoints.length}
                  </span>
                  <button
                    onClick={() => setCurrentViewpoint(Math.min(allViewpoints.length - 1, currentViewpoint + 1))}
                    disabled={currentViewpoint === allViewpoints.length - 1}
                    className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiNavigation className="h-4 w-4" />
                  </button>
                </div>
              )}
              
              <button 
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2" 
                onClick={() => setOpen(false)}
              >
                <FiX className="h-4 w-4" />
                Close
              </button>
            </div>
            
            {/* Street View Container */}
            <div className="relative" style={{ height: "calc(100vh - 73px)" }}>
              <iframe
                key={`${currentView.lat}-${currentView.lng}-${currentViewpoint}`}
                src={src}
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              
              {/* Viewpoint Thumbnails Overlay */}
              {showMultipleViews && allViewpoints.length > 1 && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2 overflow-x-auto">
                      {allViewpoints.map((viewpoint, index) => (
                        <button
                          key={viewpoint.id}
                          onClick={() => setCurrentViewpoint(index)}
                          className={`flex-shrink-0 p-2 rounded-lg border transition-all ${
                            index === currentViewpoint
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <FiMapPin className="h-3 w-3" />
                            <span className="text-xs font-medium">{viewpoint.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
