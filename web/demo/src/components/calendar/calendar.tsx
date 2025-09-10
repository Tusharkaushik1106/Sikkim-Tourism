'use client'

import { useState, useMemo, useEffect } from 'react'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, MapPin, Calendar as CalendarIcon, Loader2 } from 'lucide-react'
import { CulturalEvent } from '@/lib/events'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const categoryFilters = ['All', 'Festival', 'Religious', 'Cultural', 'Harvest', 'Holiday'] as const;
type Category = typeof categoryFilters[number];

async function fetchEvents(category: Category, year?: number): Promise<CulturalEvent[]> {
  const response = await fetch(`/api/events?category=${category}&year=${year || new Date().getFullYear()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
}

export default function CulturalCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const [events, setEvents] = useState<CulturalEvent[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      setIsLoading(true);
      try {
        const fetchedEvents = await fetchEvents(selectedCategory, currentDate.getFullYear());
        setEvents(fetchedEvents);
      } catch (error) {
        console.error(error);
        // Handle error state in UI if needed
      } finally {
        setIsLoading(false);
      }
    };
    getEvents();
  }, [selectedCategory, currentDate]);

  const eventsByDate = useMemo(() => {
    return events.reduce((acc, event) => {
      const date = event.date
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(event)
      return acc
    }, {} as Record<string, CulturalEvent[]>)
  }, [events])

  const firstDayOfMonth = startOfMonth(currentDate)
  const lastDayOfMonth = endOfMonth(currentDate)
  const firstDayOfCalendar = startOfWeek(firstDayOfMonth)
  const lastDayOfCalendar = endOfWeek(lastDayOfMonth)
  const days = eachDayOfInterval({ start: firstDayOfCalendar, end: lastDayOfCalendar })

  const selectedDayEvents = selectedDay ? eventsByDate[format(selectedDay, 'yyyy-MM-dd')] || [] : []
  const isSundaySelected = selectedDay ? selectedDay.getDay() === 0 : false

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

// Add this function to generate booking links only for Sikkim events
const BookingButton = ({ event }: { event: any }) => {
  // Check if event is Sikkim-related
  const isSikkimEvent = event.location?.toLowerCase().includes('sikkim') || 
                        event.title?.toLowerCase().includes('sikkim') ||
                        event.description?.toLowerCase().includes('sikkim');
  
  if (!isSikkimEvent) return null;
  
  return (
    <Link 
      href={`/book-event?eventId=${event.id}`}
      className="inline-flex items-center px-3 py-1 mt-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
    >
      Book Now
    </Link>
  );
};  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50/50 dark:bg-gray-900/50 rounded-2xl shadow-lg backdrop-blur-xl border border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevMonth}
            className="p-2 rounded-full bg-gray-200/60 dark:bg-gray-700/60 hover:bg-gray-300/80 dark:hover:bg-gray-600/80 transition-colors shadow-sm"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </motion.button>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextMonth}
            className="p-2 rounded-full bg-gray-200/60 dark:bg-gray-700/60 hover:bg-gray-300/80 dark:hover:bg-gray-600/80 transition-colors shadow-sm"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </motion.button>
        </div>
        <div className="flex items-center gap-2 p-1 rounded-full bg-gray-200/60 dark:bg-gray-700/60 shadow-sm">
          {categoryFilters.map(category => {
            let categoryColor = "";
            switch(category) {
              case 'Festival':
                categoryColor = "bg-rose-500 text-white";
                break;
              case 'Religious':
                categoryColor = "bg-violet-500 text-white";
                break;
              case 'Cultural':
                categoryColor = "bg-sky-500 text-white";
                break;
              case 'Harvest':
                categoryColor = "bg-amber-500 text-white";
                break;
              case 'Holiday':
                categoryColor = "bg-purple-600 text-white";
                break;
              default:
                categoryColor = "bg-gray-600 text-white";
            }
            
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200",
                  selectedCategory === category
                    ? `${categoryColor} shadow-lg transform scale-105`
                    : "bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-700/70"
                )}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 flex items-center justify-center z-10 rounded-lg">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        )}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium text-gray-500 dark:text-gray-400 text-sm pb-2">
              {day}
            </div>
          ))}
          {days.map((day: Date) => {
            const dayEvents = eventsByDate[format(day, 'yyyy-MM-dd')] || []
            const primaryEvent = dayEvents[0]
            const hasEvents = dayEvents.length > 0
            const isSunday = day.getDay() === 0 // Sunday is 0
            
            // Determine background color based on event category or Sunday
            let dayBgColor = ""
            if (isSameMonth(day, currentDate)) {
              if (isSunday && !hasEvents) {
                // Sunday without events - mark as holiday
                dayBgColor = "bg-gradient-to-br from-purple-200/95 to-indigo-300/95 dark:from-purple-800/60 dark:to-indigo-900/60 border-2 border-purple-400/80 dark:border-purple-600/80 text-purple-900 dark:text-purple-100"
              } else if (hasEvents) {
                switch (primaryEvent.category) {
                  case 'Festival':
                    dayBgColor = "bg-gradient-to-br from-rose-200/95 to-pink-300/95 dark:from-rose-800/60 dark:to-pink-900/60 border-2 border-rose-400/80 dark:border-rose-600/80 text-rose-900 dark:text-rose-100"
                    break
                  case 'Religious':
                    dayBgColor = "bg-gradient-to-br from-violet-200/95 to-purple-300/95 dark:from-violet-800/60 dark:to-purple-900/60 border-2 border-violet-400/80 dark:border-violet-600/80 text-violet-900 dark:text-violet-100"
                    break
                  case 'Cultural':
                    dayBgColor = "bg-gradient-to-br from-sky-200/95 to-blue-300/95 dark:from-sky-800/60 dark:to-blue-900/60 border-2 border-sky-400/80 dark:border-sky-600/80 text-sky-900 dark:text-sky-100"
                    break
                  case 'Harvest':
                    dayBgColor = "bg-gradient-to-br from-amber-200/95 to-yellow-300/95 dark:from-amber-800/60 dark:to-yellow-900/60 border-2 border-amber-400/80 dark:border-amber-600/80 text-amber-900 dark:text-amber-100"
                    break
                  case 'Holiday':
                    dayBgColor = "bg-gradient-to-br from-purple-200/95 to-indigo-300/95 dark:from-purple-800/60 dark:to-indigo-900/60 border-2 border-purple-400/80 dark:border-purple-600/80 text-purple-900 dark:text-purple-100"
                    break
                  default:
                    dayBgColor = "bg-white/70 dark:bg-gray-800/70 border-gray-200 dark:border-gray-700/50"
                }
              } else {
                dayBgColor = "bg-white/70 dark:bg-gray-800/70 border-gray-200 dark:border-gray-700/50"
              }
            }
            
            return (
              <motion.div
                key={day.toString()}
                onClick={() => setSelectedDay(day)}
                className={cn(
                  "relative h-24 sm:h-32 rounded-lg p-2 transition-colors cursor-pointer border",
                  isSameMonth(day, currentDate)
                    ? (hasEvents || isSunday) 
                      ? `${dayBgColor} hover:shadow-md`
                      : "bg-white/70 dark:bg-gray-800/70 border-gray-200 dark:border-gray-700/50 hover:bg-blue-50 dark:hover:bg-gray-700"
                    : "bg-gray-100/70 dark:bg-gray-800/40 border-gray-100 dark:border-gray-800/20 text-gray-400 dark:text-gray-500",
                  isSameDay(day, new Date()) && "ring-2 ring-blue-500 ring-opacity-50"
                )}
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className={cn(
                  "font-medium text-sm",
                  isSameDay(day, new Date()) && "text-blue-600 dark:text-blue-400 font-bold"
                )}>{format(day, 'd')}</span>
                
                {/* Show event names or Sunday label directly on calendar */}
                <div className="mt-1 space-y-0.5 overflow-hidden flex-1">
                  {dayEvents.length > 0 ? (
                    <>
                      {dayEvents.slice(0, 1).map(event => (
                        <div key={event.id} className="text-xs font-bold truncate leading-tight">
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 1 && (
                        <div className="text-xs font-bold opacity-75 truncate">
                          +{dayEvents.length - 1} more
                        </div>
                      )}
                    </>
                  ) : isSunday && isSameMonth(day, currentDate) ? (
                    <div className="text-xs font-bold truncate leading-tight">
                      Sunday Holiday
                    </div>
                  ) : null}
                </div>
                
                {/* Color indicators at bottom */}
                <div className="absolute bottom-1 left-1 right-1 flex gap-1">
                  {dayEvents.length > 0 ? (
                    dayEvents.slice(0, 4).map((event, index) => {
                      let indicatorColor = "";
                      switch(event.category) {
                        case 'Festival':
                          indicatorColor = "bg-rose-600";
                          break;
                        case 'Religious':
                          indicatorColor = "bg-violet-600";
                          break;
                        case 'Cultural':
                          indicatorColor = "bg-sky-600";
                          break;
                        case 'Harvest':
                          indicatorColor = "bg-amber-600";
                          break;
                        case 'Holiday':
                          indicatorColor = "bg-purple-700";
                          break;
                        default:
                          indicatorColor = "bg-gray-600";
                      }
                      return (
                        <div key={event.id} className={cn("flex-1 h-1.5 rounded-full", indicatorColor)}></div>
                      )
                    })
                  ) : isSunday && isSameMonth(day, currentDate) ? (
                    <div className="w-full h-1.5 rounded-full bg-purple-700"></div>
                  ) : null}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Color Legend */}
      <div className="mt-8 p-4 bg-white/70 dark:bg-gray-800/70 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Event Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-rose-500"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Festival</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-violet-500"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Religious</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-sky-500"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Cultural</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-amber-500"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Harvest</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-600"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Holiday</span>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDay(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{format(selectedDay, 'MMMM d, yyyy')}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{format(selectedDay, 'eeee')}</p>
                </div>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setSelectedDay(null)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </motion.button>
              </div>
              <div className="p-6">
                {selectedDayEvents.length > 0 || isSundaySelected ? (
                  <ul className="space-y-6">
                    {/* Show Sunday Holiday if it's Sunday and no events */}
                    {isSundaySelected && selectedDayEvents.length === 0 && (
                      <motion.li
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col group"
                      >
                        <div className="w-full">
                          <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Sunday Holiday</h4>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="text-xs font-bold text-white px-2 py-1 rounded-full bg-purple-600">
                              Holiday
                            </div>
                            <span className="text-4xl">🌅</span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300">
                            Weekly day of rest and relaxation. Many businesses remain closed while families gather for leisure activities and rest.
                          </p>
                          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4" />
                              <span>Across Sikkim</span>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    )}
                    
                    {/* Show regular events */}
                    {selectedDayEvents.map(event => (
                      <motion.li
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col group"
                      >
                        <div className="w-full">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={cn("text-xs font-bold text-white px-2 py-1 rounded-full", event.color)}>
                              {event.category}
                            </div>
                          </div>
                          <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{event.title}</h4>
                          <p className="text-gray-600 dark:text-gray-300 mb-3">{event.description}</p>
                          <div className="flex items-center gap-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          {/* Add Booking button for each event */}
                          <BookingButton event={event} />
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-10">
                    <CalendarIcon className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600" />
                    <p className="mt-4 text-lg font-medium text-gray-500 dark:text-gray-400">No events scheduled for this day.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
