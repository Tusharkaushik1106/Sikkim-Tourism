"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'
import { FaGithub, FaLandmark, FaMapMarkedAlt, FaVrCardboard } from 'react-icons/fa'
import { IoEarthSharp } from 'react-icons/io5'
import { MdOutlineArchitecture, MdAccessTime } from 'react-icons/md'
import Link from 'next/link'

interface GitHubProfile {
  avatar_url: string;
  bio: string;
  name: string;
}

const teamMembers = [
  {
    name: "Purav Bhatt",
    github: "puravbhatt0504",
    role: "Team Lead & AR developer"
  },
  {
    name: "Tushar Kaushik",
    github: "TusharKaushik1106",
    role: "Full Stack Developer"
  },
  {
    name: "Shreya Jha",
    github: "whoshrey",
    role: "ML Engineer & Frontend Developer"
  },
  {
    name: "Raghav Aggarwal",
    github: "Raghavaggarwal2",
    role: "Backend Developer & ML Engineer"
  },
  
  {
    name: "Piyush Thakur",
    github: "Piyush-Fr",
    role: "Flutter Developer"
  },
  {
    name: "Simran Rawat",
    github: "SiRa111",
    role: "ML Engineer & Data Scientist"
  }
];

export default function AboutPage() {
  const [profiles, setProfiles] = useState<Record<string, GitHubProfile>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubProfiles = async () => {
      const profileData: Record<string, GitHubProfile> = {};
      
      for (const member of teamMembers) {
        try {
          console.log(`Fetching profile for ${member.github}...`);
          
          // Build headers conditionally
          const headers: HeadersInit = {
            'Accept': 'application/vnd.github.v3+json'
          };
          
          // Only add Authorization if token exists
          if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
            headers.Authorization = `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;
          }
          
          const response = await fetch(`https://api.github.com/users/${member.github}`, {
            headers,
          });
          
          if (!response.ok) {
            console.error(`GitHub API error for ${member.github}:`, response.status, response.statusText);
            // Continue to next member instead of throwing
            continue;
          }
          
          const data = await response.json();
          console.log(`Successfully fetched profile for ${member.github}`);
          profileData[member.github] = data;
        } catch (error) {
          console.error(`Error fetching profile for ${member.github}:`, error);
          // Continue to next member
        }
      }
      
      setProfiles(profileData);
      setLoading(false);
    };

    fetchGitHubProfiles();
  }, []);

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white">
              About Monastery360°
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Discover Sikkim's spiritual heritage through immersive virtual tours and interactive maps. 
              Our platform brings ancient monasteries to life with 360° views and detailed cultural insights.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10+", label: "Monasteries", icon: FaLandmark },
              { number: "360°", label: "Virtual Tours", icon: FaVrCardboard },
              { number: "100%", label: "Coverage", icon: IoEarthSharp },
              { number: "24/7", label: "Accessibility", icon: MdAccessTime },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100 dark:bg-gray-800">
                  <stat.icon className="w-6 h-6 text-orange-500 dark:text-orange-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              We aim to preserve and promote Sikkim's rich cultural heritage by making its sacred monasteries 
              accessible to people worldwide through digital innovation. Our platform combines cutting-edge 
              technology with respectful cultural representation to create an immersive educational experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: MdOutlineArchitecture,
                title: "Digital Preservation",
                description: "Documenting and preserving Sikkim's architectural heritage through detailed 360° captures."
              },
              {
                icon: FaMapMarkedAlt,
                title: "Interactive Mapping",
                description: "Creating detailed interactive maps for easy monastery location and navigation."
              },
              {
                icon: FaVrCardboard,
                title: "Virtual Experience",
                description: "Providing immersive virtual tours that bring monasteries to life digitally."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-orange-500 dark:text-orange-400" />
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Highlights */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Project Highlights</h2>
            <div className="space-y-8">
              {[
                {
                  year: "2025",
                  title: "Smart India Hackathon",
                  description: "Developed as part of Smart India Hackathon 2025, focusing on cultural heritage preservation through technology."
                },
                {
                  year: "360°",
                  title: "Immersive Experience",
                  description: "Complete virtual tour coverage of major monasteries in Sikkim with high-quality panoramic imagery."
                },
                {
                  year: "Tech",
                  title: "Modern Stack",
                  description: "Built using Next.js, TailwindCSS, and advanced mapping technologies for optimal performance."
                }
              ].map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-orange-100 dark:bg-gray-800 flex items-center justify-center text-orange-500 dark:text-orange-400 font-bold">
                    {highlight.year}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{highlight.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{highlight.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Meet Our Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              A passionate team of developers and designers working together to preserve and share Sikkim's cultural heritage.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.github}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-center">
                  {loading || !profiles[member.github] ? (
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold animate-pulse">
                      {member.name.charAt(0)}
                    </div>
                  ) : (
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700">
                      <Image
                        src={profiles[member.github].avatar_url}
                        alt={`${member.name}'s GitHub avatar`}
                        width={80}
                        height={80}
                        className="object-cover transition-transform hover:scale-110"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{member.role}</p>
                  <Link 
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-accent-primary dark:hover:text-accent-primary border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-105"
                  >
                    <FaGithub className="w-5 h-5" />
                    <span className="font-medium">{member.github}</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}