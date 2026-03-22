'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ExternalLink, Wifi, Battery, Signal } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { portfolioConfig } from '@/config/portfolio'

const projects = portfolioConfig.apps

function StatusBar() {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes().toString().padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}`)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute top-0 left-0 right-0 h-8 px-5 flex items-center justify-between z-30">
      <span className="text-[11px] font-medium text-zinc-900">{currentTime}</span>
      <div className="flex items-center gap-1">
        <Signal className="h-3.5 w-3.5 text-zinc-900" />
        <Wifi className="h-3.5 w-3.5 text-zinc-900" />
        <Battery className="h-3.5 w-3.5 text-zinc-900" />
      </div>
    </div>
  )
}

function HomeScreen({ onSelectApp }: { onSelectApp: (project: (typeof projects)[0]) => void }) {
  const [currentTime, setCurrentTime] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes().toString().padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}`)

      const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }
      setCurrentDate(now.toLocaleDateString('en-US', options))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="h-full flex flex-col bg-white relative overflow-hidden"
    >
      <StatusBar />

      {/* Wallpaper Area - Center Time/Date */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <span className="text-5xl font-light text-zinc-900 tracking-tight">
          {currentTime}
        </span>
        <span className="text-sm text-zinc-600 mt-1">{currentDate}</span>
      </div>

      {/* App Dock - Bottom */}
      <div className="flex-shrink-0">
        {/* Dock Divider */}
        <div className="w-full h-px bg-zinc-200 mb-3" />

        {/* Scrollable App Row */}
        <div
          ref={scrollRef}
          className="w-full max-w-[260px] mx-auto flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide"
        >
          {projects.map((project) => (
            <motion.button
              key={project.id}
              onClick={() => onSelectApp(project)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 pt-2"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg"
                style={{ backgroundColor: project.color }}
              >
                {project.icon}
              </div>
              <span className="text-[10px] text-zinc-900 font-medium text-center w-14 truncate">
                {project.title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Home Indicator */}
      <div className="pb-3 flex justify-center">
        <div className="w-28 h-1 bg-zinc-300 rounded-full" />
      </div>
    </motion.div>
  )
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
          <path fill="url(#halfStar)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="w-3 h-3 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function SplashScreen({
  project,
  onComplete,
}: {
  project: (typeof projects)[0]
  onComplete: () => void
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 1500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      key={`splash-${project.id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col items-center justify-center relative"
      style={{
        background: project.splashImage
          ? `url(${project.splashImage}) center/cover no-repeat`
          : `linear-gradient(135deg, ${project.color} 0%, ${project.color}cc 50%, ${project.color}99 100%)`,
      }}
    >
      <StatusBar />
      {!project.splashImage && (
        <>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-white text-3xl font-bold shadow-2xl"
            style={{ backgroundColor: project.color }}
          >
            {project.icon}
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="text-white text-xl font-semibold mt-6"
          >
            {project.fullTitle}
          </motion.span>
        </>
      )}
    </motion.div>
  )
}

function AppDetailScreen({
  project,
  onBack,
}: {
  project: (typeof projects)[0]
  onBack: () => void
}) {
  return (
    <div className="h-full flex flex-col bg-white relative">
      <StatusBar />

      {/* Banner Image */}
      <div className="relative h-36 flex-shrink-0 mt-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
        <button
          onClick={onBack}
          className="absolute top-6 left-2 flex items-center gap-1.5 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium hover:bg-black/70 transition-colors z-20"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>
      </div>

      {/* Content Card */}
      <div className="flex-1 flex flex-col bg-white rounded-none mt-0 mx-0 mb-0 p-4 overflow-y-auto">
        {/* Title and Industry */}
        <div className="flex-shrink-0">
          <h3 className="text-xl font-semibold text-zinc-900">
            {project.fullTitle}
          </h3>
          <span className="inline-block px-2 py-0.5 bg-zinc-100 text-zinc-600 text-[10px] font-medium rounded-full mt-1">
            {project.industry}
          </span>
        </div>

        {/* Rating and Downloads */}
        {project.downloads && (
          <div className="flex items-center gap-3 mt-2 flex-shrink-0">
            <StarRating rating={project.rating} />
            <span className="text-xs text-zinc-600">{project.downloads} Downloads</span>
          </div>
        )}

        {/* Last Updated */}
        <p className="text-[10px] text-zinc-400 mt-1 flex-shrink-0">
          Last updated: {project.lastUpdated}
        </p>

        {/* Description */}
        <p className="text-xs text-zinc-600 leading-relaxed mt-3 flex-shrink-0">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mt-3 flex-shrink-0">
          {project.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-[10px] px-2 py-0.5 bg-zinc-100 text-zinc-700"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-auto pt-4">
          <Button
            size="sm"
            className="w-full bg-black hover:bg-zinc-800 text-white text-xs h-10 shadow-lg"
            asChild
          >
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View App
              <ExternalLink className="ml-1.5 h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export function PhoneMockup() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [showSplash, setShowSplash] = useState(false)
  const [pendingProject, setPendingProject] = useState<(typeof projects)[0] | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleSelectApp = (project: (typeof projects)[0]) => {
    setPendingProject(project)
    setShowSplash(true)
  }

  const handleSplashComplete = () => {
    setShowSplash(false)
    if (pendingProject) {
      setSelectedProject(pendingProject)
      setPendingProject(null)
    }
  }

  return (
    <div className="w-full max-w-[320px] mx-auto lg:mx-0 lg:ml-auto">
      {/* Modern Phone Frame */}
      <div className="relative">
        {/* Ambient Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-400/30 via-gray-300/30 to-gray-400/30 blur-3xl opacity-40" />
        {/* Contoured Glow */}
        <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-r from-gray-400/20 via-gray-300/20 to-gray-400/20 blur-xl opacity-50" />

        {/* Phone Body */}
        <div className="relative bg-zinc-900 rounded-[2.5rem] p-2 shadow-2xl shadow-black/40">
          {/* Punch-hole Camera */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-900 rounded-full z-30">
            <div className="absolute inset-[3px] bg-zinc-800 rounded-full" />
            <div className="absolute inset-[5px] bg-indigo-500/30 rounded-full animate-pulse" />
          </div>

          {/* Screen */}
          <div className="relative bg-zinc-900 rounded-[2rem] overflow-hidden h-[560px]">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full w-full relative"
                >
                  <Image
                    src="images/loading_android.png"
                    alt="Loading"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ) : showSplash && pendingProject ? (
                <SplashScreen
                  project={pendingProject}
                  onComplete={handleSplashComplete}
                />
              ) : selectedProject ? (
                <AppDetailScreen
                  key={selectedProject.id}
                  project={selectedProject}
                  onBack={() => setSelectedProject(null)}
                />
              ) : (
                <HomeScreen
                  key="home"
                  onSelectApp={handleSelectApp}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Navigation Bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-zinc-600 rounded-full" />
        </div>

        {/* Phone Stand */}
        <div className="w-16 h-2 bg-gradient-to-b from-zinc-700/60 to-transparent mx-auto rounded-b-lg mt-1" />
      </div>
    </div>
  )
}
