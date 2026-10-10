'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Wifi,
  Battery,
  Signal,
  Github,
  Star,
  Search,
  Mic,
  Phone as PhoneIcon,
  MessageSquare,
  Camera,
  Globe,
} from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { portfolioConfig } from '@/config/portfolio'

const projects = portfolioConfig.apps
type App = (typeof projects)[number]

const EASE = [0.25, 0.1, 0.25, 1] as const

/* Icon center (x, y) + screen size (sw, sh) relative to the phone screen,
 * captured when an app icon is tapped so the splash can grow from it. */
export type IconOrigin = { x: number; y: number; sw: number; sh: number }

/* ---------------------------------------------------------------------------
 * Phone demo state - lifted so the page's project list can drive the phone.
 * ------------------------------------------------------------------------- */
export function usePhoneDemo() {
  const reduce = useReducedMotion() ?? false
  const [booted, setBooted] = useState(false)
  const [selectedProject, setSelectedProject] = useState<App | null>(null)
  const [showSplash, setShowSplash] = useState(false)
  const [pendingProject, setPendingProject] = useState<App | null>(null)
  const [pendingOrigin, setPendingOrigin] = useState<IconOrigin | null>(null)

  useEffect(() => {
    if (reduce) {
      setBooted(true)
      return
    }
    const timer = setTimeout(() => setBooted(true), 650)
    return () => clearTimeout(timer)
  }, [reduce])

  const selectApp = useCallback(
    (project: App, origin?: IconOrigin) => {
      if (reduce) {
        setSelectedProject(project)
        return
      }
      setPendingOrigin(origin ?? null)
      setPendingProject(project)
      setShowSplash(true)
    },
    [reduce]
  )

  const splashComplete = useCallback(() => {
    setShowSplash(false)
    setPendingOrigin(null)
    if (pendingProject) {
      setSelectedProject(pendingProject)
      setPendingProject(null)
    }
  }, [pendingProject])

  const back = useCallback(() => setSelectedProject(null), [])

  const goHome = useCallback(() => {
    setShowSplash(false)
    setPendingOrigin(null)
    setPendingProject(null)
    setSelectedProject(null)
  }, [])

  const activeProject = showSplash && pendingProject ? pendingProject : selectedProject

  return {
    reduce,
    booted,
    selectedProject,
    pendingProject,
    pendingOrigin,
    showSplash,
    activeProject,
    selectApp,
    splashComplete,
    back,
    goHome,
  }
}

export type PhoneDemo = ReturnType<typeof usePhoneDemo>

/* ---------------------------------------------------------------------------
 * Status bar
 * ------------------------------------------------------------------------- */
function StatusBar({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
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

  const color = variant === 'light' ? 'text-white' : 'text-zinc-900'

  return (
    <div
      className={`pointer-events-none absolute left-0 right-0 top-0 z-30 flex h-8 items-center justify-between px-5 ${color}`}
      aria-hidden
    >
      <span className="text-[11px] font-medium">{currentTime}</span>
      <div className="flex items-center gap-1">
        <Signal className="h-3.5 w-3.5" />
        <Wifi className="h-3.5 w-3.5" />
        <Battery className="h-3.5 w-3.5" />
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------------------
 * Boot screen (z-40: covers everything while the phone "starts up")
 * ------------------------------------------------------------------------- */
function BootScreen({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.25 }}
      className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-zinc-950"
    >
      <StatusBar variant="light" />
      <span className="text-3xl font-semibold tracking-tight text-white">
        {portfolioConfig.personal.name
          .split(' ')
          .map((w) => w[0])
          .join('')}
      </span>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3 h-0.5 w-10 origin-left bg-accent"
      />
    </motion.div>
  )
}

/* ---------------------------------------------------------------------------
 * Home screen - light Pixel-launcher style
 * ------------------------------------------------------------------------- */
const WALLPAPER: React.CSSProperties = {
  backgroundImage: [
    'radial-gradient(120% 85% at 10% -5%, hsl(var(--accent)/0.20), transparent 55%)',
    'radial-gradient(90% 60% at 105% 35%, hsl(var(--accent)/0.10), transparent 60%)',
    'linear-gradient(180deg, #fafafa 0%, #f4f4f5 100%)',
  ].join(', '),
}

const DOCK_APPS = [
  { Icon: PhoneIcon, label: 'Phone' },
  { Icon: MessageSquare, label: 'Messages' },
  { Icon: Camera, label: 'Camera' },
  { Icon: Globe, label: 'Browser' },
]

function HomeScreen({
  onSelectApp,
  reduce,
}: {
  onSelectApp: (project: App, origin?: IconOrigin) => void
  reduce: boolean
}) {
  const [currentTime, setCurrentTime] = useState('')
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes().toString().padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}`)
      setCurrentDate(
        now.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const item = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 12 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: EASE },
        },
      }

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, x: -40, scale: 0.98 }}
      transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
      className="absolute inset-0 z-10 flex flex-col overflow-hidden"
    >
      {/* Wallpaper: light base with layered accent wash, no image dependency */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={WALLPAPER} />
      <StatusBar />

      <motion.div
        className="relative flex min-h-0 flex-1 flex-col"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: reduce ? 0 : 0.04,
              delayChildren: reduce ? 0 : 0.1,
            },
          },
        }}
      >
        {/* Clock widget, top-left (Pixel style) */}
        <motion.div variants={item} className="px-5 pt-11">
          <span className="block text-[44px] font-light leading-none tracking-tight text-zinc-900">
            {currentTime}
          </span>
          <span className="mt-2 block text-[13px] text-zinc-600">{currentDate}</span>
        </motion.div>

        {/* App grid: 5 portfolio apps + GitHub */}
        <div className="mt-6 px-5">
          <div className="grid grid-cols-3 gap-x-2 gap-y-4">
            {projects.map((project) => (
              <motion.button
                key={project.id}
                type="button"
                variants={item}
                onClick={(e) => {
                  const screen = e.currentTarget.closest(
                    '[data-phone-screen]'
                  ) as HTMLElement | null
                  if (screen) {
                    const s = screen.getBoundingClientRect()
                    const i = e.currentTarget.getBoundingClientRect()
                    onSelectApp(project, {
                      x: i.left + i.width / 2 - s.left,
                      y: i.top + i.height / 2 - s.top,
                      sw: s.width,
                      sh: s.height,
                    })
                  } else {
                    onSelectApp(project)
                  }
                }}
                whileHover={reduce ? undefined : { scale: 1.08 }}
                whileTap={reduce ? undefined : { scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                className="flex flex-col items-center gap-1.5"
                aria-label={`Open the ${project.fullTitle}`}
              >
                <span
                  className="flex items-center justify-center rounded-2xl text-xl font-bold text-white shadow-md"
                  style={{
                    backgroundColor:
                      project.color.toLowerCase() === '#000000'
                        ? '#18181b'
                        : project.color,
                    width: 52,
                    height: 52,
                  }}
                >
                  {project.icon}
                </span>
                <span className="w-full text-center text-[10px] font-medium text-zinc-900">
                  {project.title}
                </span>
              </motion.button>
            ))}
            <motion.a
              variants={item}
              href={portfolioConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduce ? undefined : { scale: 1.08 }}
              whileTap={reduce ? undefined : { scale: 0.92 }}
              className="flex flex-col items-center gap-1.5"
              aria-label="Open GitHub profile"
            >
              <span
                className="flex items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-md"
                style={{ width: 52, height: 52 }}
              >
                <Github className="h-6 w-6" />
              </span>
              <span className="w-full text-center text-[10px] font-medium text-zinc-900">
                GitHub
              </span>
            </motion.a>
          </div>
        </div>

        {/* Flexible gap pushes the launcher furniture to the bottom */}
        <div className="flex-1" />

        {/* Page dots */}
        <motion.div
          variants={item}
          aria-hidden
          className="flex justify-center gap-1.5 pb-3"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
        </motion.div>

        {/* Search pill */}
        <motion.div variants={item} aria-hidden className="px-4 pb-2.5">
          <div className="flex h-10 select-none items-center gap-2.5 rounded-full border border-zinc-200/80 bg-white/80 px-4 shadow-sm backdrop-blur-sm">
            <Search className="h-4 w-4 text-zinc-400" />
            <span className="flex-1 text-[13px] text-zinc-400">Search</span>
            <Mic className="h-4 w-4 text-zinc-400" />
          </div>
        </motion.div>

        {/* Dock with decorative system apps */}
        <motion.div variants={item} aria-hidden className="px-4 pb-1">
          <div className="flex items-center justify-around rounded-3xl border border-zinc-200/70 bg-white/70 px-2 py-1.5 shadow-sm backdrop-blur-sm">
            {DOCK_APPS.map(({ Icon, label }) => (
              <span
                key={label}
                className="flex h-11 w-11 items-center justify-center rounded-2xl"
              >
                <Icon className="h-5 w-5 text-zinc-700" />
              </span>
            ))}
          </div>
        </motion.div>

        {/* Home indicator */}
        <motion.div variants={item} className="flex justify-center pb-3 pt-3">
          <div className="h-1 w-28 rounded-full bg-zinc-300" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ---------------------------------------------------------------------------
 * Star rating (used by the app detail screen)
 * ------------------------------------------------------------------------- */
function StarRating({ rating }: { rating: number }) {
  const rounded = Math.round(rating)
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={
            i <= rounded
              ? 'h-3.5 w-3.5 fill-accent text-accent'
              : 'h-3.5 w-3.5 fill-zinc-200 text-zinc-200'
          }
        />
      ))}
    </span>
  )
}

/* ---------------------------------------------------------------------------
 * Splash screen (z-30: covers home while the "app" launches)
 * ------------------------------------------------------------------------- */
const SPLASH_HOLD_MS = 900

function SplashScreen({
  project,
  origin,
  onComplete,
  reduce,
}: {
  project: App
  origin?: IconOrigin | null
  onComplete: () => void
  reduce: boolean
}) {
  const completeRef = useRef(onComplete)

  useEffect(() => {
    completeRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    const timer = setTimeout(() => completeRef.current(), SPLASH_HOLD_MS)
    return () => clearTimeout(timer)
  }, [])

  /* Container transform: the splash starts as an icon-sized tile at the
   * tapped icon's position and expands to fill the screen. Row taps from
   * the page list have no origin, so they keep the center grow. */
  const fromIcon = Boolean(origin) && !reduce
  const initial = origin && fromIcon
    ? {
        opacity: 1,
        x: origin.x - origin.sw / 2,
        y: origin.y - origin.sh / 2,
        scaleX: 52 / origin.sw,
        scaleY: 52 / origin.sh,
        borderRadius: 16,
      }
    : reduce
      ? { opacity: 0 }
      : { opacity: 0, scale: 1.04 }
  const animate = fromIcon
    ? { opacity: 1, x: 0, y: 0, scaleX: 1, scaleY: 1, borderRadius: 0 }
    : { opacity: 1, scale: 1 }
  const innerDelay = reduce ? 0 : fromIcon ? 0.35 : 0.1
  const titleDelay = reduce ? 0 : fromIcon ? 0.45 : 0.25

  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
      transition={{ duration: reduce ? 0 : fromIcon ? 0.32 : 0.25, ease: EASE }}
      className="absolute inset-0 z-30 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: project.splashImage
          ? `url(${project.splashImage}) center/cover no-repeat`
          : `linear-gradient(135deg, ${project.color} 0%, ${project.color}cc 50%, ${project.color}99 100%)`,
      }}
    >
      {/* Scrim keeps the status bar readable over any splash art */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/45 to-transparent"
      />
      <StatusBar variant="light" />
      {!project.splashImage && (
        <>
          <motion.div
            initial={reduce ? false : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.4, delay: innerDelay }}
            className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 text-3xl font-bold text-white shadow-2xl ring-1 ring-white/25"
          >
            {project.icon}
          </motion.div>
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, delay: titleDelay }}
            className="mt-6 text-xl font-semibold text-white"
          >
            {project.fullTitle}
          </motion.span>
        </>
      )}
    </motion.div>
  )
}

/* ---------------------------------------------------------------------------
 * App detail screen (z-20: enters from the right, exits to the right on back)
 * ------------------------------------------------------------------------- */
function AppDetailScreen({
  project,
  onBack,
  reduce,
}: {
  project: App
  onBack: () => void
  reduce: boolean
}) {
  const isDarkTile = project.color.toLowerCase() === '#000000'
  const [expanded, setExpanded] = useState(false)
  const [scrolledPastBanner, setScrolledPastBanner] = useState(false)
  const [canScroll, setCanScroll] = useState({ left: false, right: false })
  const stripRef = useRef<HTMLDivElement | null>(null)

  const measureStrip = useCallback(() => {
    const strip = stripRef.current
    if (!strip) return
    setCanScroll({
      left: strip.scrollLeft > 2,
      right: strip.scrollLeft < strip.scrollWidth - strip.clientWidth - 2,
    })
  }, [])

  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return
    measureStrip()
    strip.addEventListener('scroll', measureStrip, { passive: true })
    window.addEventListener('resize', measureStrip)
    return () => {
      strip.removeEventListener('scroll', measureStrip)
      window.removeEventListener('resize', measureStrip)
    }
  }, [measureStrip])

  const scrollStrip = useCallback(
    (dir: number) => {
      const strip = stripRef.current
      if (!strip) return
      const card = strip.firstElementChild as HTMLElement | null
      const step = (card?.offsetWidth ?? 90) + 8
      strip.scrollBy({ left: dir * step, behavior: reduce ? 'auto' : 'smooth' })
    },
    [reduce]
  )

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, x: 40 }}
      transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
      className="absolute inset-0 z-20 flex flex-col bg-white"
    >
      {/* Scrolling content: the banner scrolls away like the Play Store
          web listing; status bar + back stay pinned as overlays. */}
      <div
        onScroll={(e) => setScrolledPastBanner(e.currentTarget.scrollTop > 112)}
        className="scrollbar-hide min-h-0 flex-1 overflow-y-auto overscroll-y-contain"
      >
        {/* Banner: h-32 matches the 2.36:1 source ratio so baked-in titles stay uncropped */}
        <div className="relative h-32">
          <Image
            src={project.image}
            alt={`${project.fullTitle} screen preview`}
            fill
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/50 to-transparent"
          />
        </div>

        <div className="px-4 pb-4 pt-3">
        <div className="flex items-end gap-3">
          <span
            aria-hidden
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-lg"
            style={{ backgroundColor: isDarkTile ? '#27272a' : project.color }}
          >
            {project.icon}
          </span>
          <div className="min-w-0 pb-1">
            <h3 className="truncate text-lg font-semibold leading-tight text-zinc-900">
              {project.fullTitle}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                {project.industry}
              </span>
              <span className="rounded-sm border border-zinc-200 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                {project.credit === 'developed' ? 'Developed' : 'Contributed'}
              </span>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-3 flex items-center gap-3">
          <StarRating rating={project.rating} />
          <span className="text-xs text-zinc-600">
            {project.rating} · {project.downloads} downloads
          </span>
        </div>

        {/* Play Store screenshot strip */}
        {project.screenshots.length > 0 && (
          <div className="group/carousel relative -mx-4 mt-3">
            <div
              ref={stripRef}
              className="scrollbar-hide flex scroll-pl-4 scroll-pr-4 snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1"
            >
              {project.screenshots.map((src, i) => (
                <div
                  key={src}
                  className="shrink-0 snap-start overflow-hidden rounded-lg border border-zinc-200"
                >
                  <Image
                    src={src}
                    alt={`${project.fullTitle} screenshot ${i + 1}`}
                    width={480}
                    height={1000}
                    className="h-44 w-auto"
                    onLoad={measureStrip}
                  />
                </div>
              ))}
            </div>
            {canScroll.left && (
              <button
                type="button"
                aria-label="Scroll screenshots left"
                onClick={() => scrollStrip(-1)}
                className="absolute left-1 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/70 focus-visible:opacity-100 group-hover/carousel:opacity-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
            {canScroll.right && (
              <button
                type="button"
                aria-label="Scroll screenshots right"
                onClick={() => scrollStrip(1)}
                className="absolute right-1 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/70 focus-visible:opacity-100 group-hover/carousel:opacity-100"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        {/* Role placeholder */}
        <p
          title="Placeholder: set your real role in config/portfolio.ts"
          className="mt-3 w-fit border-b border-dashed border-zinc-300 text-[11px] text-zinc-500"
        >
          {project.role}
        </p>

        {/* About this app, expandable */}
        <div className="mt-3">
          <h4 className="text-xs font-semibold text-zinc-900">About this app</h4>
          <p
            className={`mt-1.5 text-xs leading-relaxed text-zinc-600 ${
              expanded ? '' : 'line-clamp-2'
            }`}
          >
            {project.description}
          </p>
          {project.description.length > 90 && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-zinc-900"
            >
              {expanded ? 'Show less' : 'Read more'}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${
                  expanded ? 'rotate-180' : ''
                }`}
              />
            </button>
          )}
        </div>

        {/* Tech stack */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-700"
            >
              {tech}
            </Badge>
          ))}
        </div>
        </div>
      </div>

      {/* Pinned overlays: status bar flips to dark once the banner has
          scrolled past, back button stays reachable over white content */}
      <StatusBar variant={scrolledPastBanner ? 'dark' : 'light'} />
      <button
        type="button"
        onClick={onBack}
        aria-label="Back"
        className="absolute left-3 top-7 z-30 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
      </button>

      {/* Fixed CTA */}
      <div className="shrink-0 border-t border-zinc-100 bg-white px-4 py-3">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-zinc-900 text-xs font-medium text-white transition hover:bg-zinc-800 active:scale-[0.98]"
        >
          View listing
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.div>
  )
}

/* ---------------------------------------------------------------------------
 * Phone shell
 *
 * All screens are absolute overlays and AnimatePresence runs in sync mode,
 * so an outgoing screen always covers the container while the next one fades
 * or slides in underneath/over it - no black frames between transitions.
 *
 * Layer order: boot (40) > splash (30) > detail (20) > home (10).
 * ------------------------------------------------------------------------- */
export function PhoneMockup({ demo }: { demo: PhoneDemo }) {
  const {
    reduce,
    booted,
    selectedProject,
    pendingProject,
    pendingOrigin,
    showSplash,
    selectApp,
    splashComplete,
    back,
    goHome,
  } = demo

  return (
    <div className="mx-auto w-full max-w-[320px] lg:ml-auto lg:mr-0">
      <div className="relative">
        {/* Ambient accent glow: subtle tinted light, not a neon outer glow */}
        <div
          aria-hidden
          className="absolute -inset-6 rounded-[4rem] bg-accent/10 blur-2xl"
        />

        {/* Phone body */}
        <div className="relative rounded-[2.5rem] bg-zinc-900 p-2 shadow-2xl shadow-black/50 ring-1 ring-white/10">
          {/* Punch-hole camera */}
          <div
            aria-hidden
            className="absolute left-1/2 top-3 z-40 h-3 w-3 -translate-x-1/2 rounded-full bg-zinc-900"
          >
            <div className="absolute inset-[3px] rounded-full bg-zinc-700/90" />
          </div>

          {/* Screen (z-10 creates a stacking context so screen layers never
              paint over the punch-hole camera or phone chrome) */}
          <div
            data-phone-screen
            className="relative z-10 h-[560px] overflow-hidden rounded-[2rem] bg-zinc-950"
          >
            <AnimatePresence>
              {!booted ? (
                <BootScreen key="boot" reduce={reduce} />
              ) : showSplash && pendingProject ? (
                <SplashScreen
                  key={`splash-${pendingProject.id}`}
                  project={pendingProject}
                  origin={pendingOrigin}
                  onComplete={splashComplete}
                  reduce={reduce}
                />
              ) : selectedProject ? (
                <AppDetailScreen
                  key={`detail-${selectedProject.id}`}
                  project={selectedProject}
                  onBack={back}
                  reduce={reduce}
                />
              ) : (
                <HomeScreen key="home" onSelectApp={selectApp} reduce={reduce} />
              )}
            </AnimatePresence>
          </div>

          {/* Hardware buttons: volume rocker (left) + power (right) */}
          <div aria-hidden>
            <span className="absolute -left-[3px] top-24 h-12 w-[3px] rounded-l-sm bg-zinc-700" />
            <span className="absolute -left-[3px] top-44 h-12 w-[3px] rounded-l-sm bg-zinc-700" />
            <span className="absolute -right-[3px] top-32 h-16 w-[3px] rounded-r-sm bg-zinc-700" />
          </div>

          {/* Gesture bar: tap to go home from anywhere.
              z-20 keeps it above the screen (z-10), so the bottom strip
              behaves like a real system gesture area. */}
          <button
            type="button"
            onClick={goHome}
            aria-label="Go home"
            className="group absolute bottom-0 left-1/2 z-20 flex h-5 w-32 -translate-x-1/2 items-end justify-center pb-1 focus-visible:outline-none"
          >
            <span className="h-1 w-20 rounded-full bg-zinc-600 transition-colors group-hover:bg-zinc-500" />
          </button>
        </div>

        {/* Stand */}
        <div className="mx-auto mt-1 h-2 w-16 rounded-b-lg bg-gradient-to-b from-zinc-700/60 to-transparent" />
      </div>
    </div>
  )
}
