'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ContactModal } from '@/components/ContactModal'
import { PhoneMockup, usePhoneDemo } from '@/components/PhoneMockup'
import { Github, Linkedin, Mail, ArrowRight, Star, ExternalLink } from 'lucide-react'
import { portfolioConfig } from '@/config/portfolio'

type App = (typeof portfolioConfig.apps)[number]
type Website = (typeof portfolioConfig.websites)[number]

const [flagshipService, ...otherServices] = portfolioConfig.services

function useScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observerRef.current?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.06, rootMargin: '0px 0px -24px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => {
      observerRef.current?.observe(el)
    })

    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight) {
          el.classList.add('in')
        }
      })
    }, 100)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])
}

function ProjectRow({
  app,
  index,
  active,
  onSelect,
}: {
  app: App
  index: number
  active: boolean
  onSelect: (app: App) => void
}) {
  const isDarkTile = app.color.toLowerCase() === '#000000'
  return (
    <button
      type="button"
      onClick={() => onSelect(app)}
      aria-current={active ? 'true' : undefined}
      data-active={active}
      className={`reveal d${
        (index % 4) + 1
      } group flex w-full items-start gap-4 rounded-xl border border-border bg-card/40 px-4 py-4 text-left transition-colors hover:border-accent/40 data-[active=true]:border-accent/60 data-[active=true]:bg-card`}
    >
      <span
        aria-hidden
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-sm"
        style={{ backgroundColor: isDarkTile ? '#27272a' : app.color }}
      >
        {app.icon}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <h3 className="text-base font-medium tracking-tight">{app.fullTitle}</h3>
          <span className="rounded-sm border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {app.credit === 'developed' ? 'Developed' : 'Contributed'}
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            {app.rating}
            <span aria-hidden className="text-border">
              |
            </span>
            {app.downloads} downloads
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="font-mono text-[10px] uppercase tracking-wider">
            {app.industry}
          </span>
          <span className="text-muted-foreground">{app.role}</span>
        </div>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {app.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}

function WebsiteCard({ site }: { site: Website }) {
  return (
    <article className="reveal group grid items-center gap-6 rounded-xl border border-border bg-card/40 p-4 transition-colors hover:border-accent/40 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-8 md:p-5">
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border">
        <Image
          src={site.cover}
          alt={`${site.title} website preview`}
          fill
          sizes="(max-width: 640px) 100vw, 40vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <h4 className="text-xl font-medium tracking-tight md:text-2xl">
            {site.title}
          </h4>
          <span className="rounded-sm border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {site.industry}
          </span>
        </div>

        <p className="mt-2.5 max-w-[65ch] text-sm leading-relaxed text-muted-foreground">
          {site.description}
        </p>

        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {site.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href={site.site}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-foreground px-4 py-2 text-xs font-medium text-background transition hover:opacity-90 active:scale-[0.98]"
          >
            Visit site
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          {site.demo && (
            <a
              href={site.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Live demo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Portfolio() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  useScrollReveal()
  const phone = usePhoneDemo()
  const phoneRef = useRef<HTMLDivElement>(null)

  const [titleFirst, titleMiddle, titleLast] =
    portfolioConfig.personal.title.split(' ')

  const workApps: App[] = [
    ...portfolioConfig.apps.filter((a) => a.title === 'Banking'),
    ...portfolioConfig.apps.filter((a) => a.title !== 'Banking'),
  ]

  const handleSelectApp = (app: App) => {
    phone.selectApp(app)
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      phoneRef.current?.scrollIntoView({
        behavior: phone.reduce ? 'auto' : 'smooth',
        block: 'center',
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="flex min-h-[calc(100dvh-4rem)] items-center px-6 py-12 lg:px-16 lg:py-16">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            {/* Availability + location meta */}
            <div className="reveal d1 mb-8 inline-flex flex-wrap items-center gap-2 rounded-full border border-border px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {portfolioConfig.personal.status}
              </span>
              <span className="text-border" aria-hidden>
                |
              </span>
              <span className="text-xs text-muted-foreground">
                {portfolioConfig.personal.location}
              </span>
            </div>

            <h1 className="reveal d2 mb-6 text-balance text-5xl font-medium leading-[1.0] tracking-tight md:text-6xl lg:text-7xl">
              {titleFirst}{' '}
              <span className="text-muted-foreground">{titleMiddle}</span>{' '}
              {titleLast}.
            </h1>

            <p className="reveal d3 mb-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {portfolioConfig.personal.tagline}
            </p>

            <div className="reveal d4 flex flex-wrap gap-3">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90 active:scale-[0.98]"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-border px-6 py-3 text-sm font-medium transition hover:bg-secondary active:scale-[0.98]"
              >
                See my work
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Selected work: project list drives the phone preview */}
      <section
        id="portfolio"
        className="scroll-mt-16 border-t border-border px-6 py-24 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
              Selected work
            </h2>
            <p className="mt-4 max-w-[65ch] leading-relaxed text-muted-foreground">
              Apps I have shipped and contributed to across banking, gaming,
              travel, and retail. Select one to preview it on the device.
            </p>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Phone: first on mobile, sticky right column on desktop */}
            <div
              ref={phoneRef}
              className="order-1 lg:order-2 lg:sticky lg:top-24"
            >
              <PhoneMockup demo={phone} />
            </div>

            {/* Project list */}
            <div className="order-2 flex flex-col gap-3 lg:order-1">
              {workApps.map((app, index) => (
                <ProjectRow
                  key={app.id}
                  app={app}
                  index={index}
                  active={phone.activeProject?.id === app.id}
                  onSelect={handleSelectApp}
                />
              ))}
            </div>
          </div>

          {/* Websites: live web products, link-out (not part of the phone demo) */}
          {portfolioConfig.websites.length > 0 && (
            <div className="mt-20 border-t border-border pt-12">
              <h3 className="mb-8 text-2xl font-medium tracking-tight md:text-3xl">
                Websites
              </h3>
              <div className="flex flex-col gap-5">
                {portfolioConfig.websites.map((site) => (
                  <WebsiteCard key={site.id} site={site} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="scroll-mt-16 border-t border-border px-6 py-24 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
              Services
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {/* Flagship: full-width, elevated, accent-tinted */}
            <article className="reveal relative overflow-hidden rounded-xl border border-border bg-card p-6 md:p-8 lg:col-span-2">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
              />
              <div className="relative max-w-3xl">
                <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
                  {flagshipService.title}
                </h3>
                <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-muted-foreground md:text-base">
                  {flagshipService.description}
                </p>
                <p className="mt-5 font-mono text-xs text-muted-foreground">
                  {flagshipService.stack.join(', ')}
                </p>
              </div>
            </article>

            {/* Supporting pair */}
            {otherServices.map((service, index) => (
              <article
                key={service.title}
                className={`reveal d${
                  index + 1
                } rounded-xl border border-border p-6 transition-colors hover:border-accent/40 md:p-8`}
              >
                <h3 className="text-xl font-medium tracking-tight md:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <p className="mt-5 font-mono text-xs text-muted-foreground">
                  {service.stack.join(', ')}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className="scroll-mt-16 border-t border-border px-6 py-24 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
              Experience
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {portfolioConfig.companies.map((company, index) => (
              <div
                key={company.name}
                className={`reveal d${
                  (index % 4) + 1
                } group relative flex aspect-[3/2] items-center justify-center overflow-hidden rounded-xl border border-border bg-white p-4 transition-colors hover:border-accent/60`}
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-contain p-4 opacity-60 transition-opacity group-hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section
        id="stack"
        className="scroll-mt-16 border-t border-border px-6 py-24 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
              Stack
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(portfolioConfig.stack).map(
              ([category, items], index) => (
                <div key={category} className={`reveal d${(index % 4) + 1}`}>
                  <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="cursor-default rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-foreground hover:text-background"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section
        id="contact"
        className="scroll-mt-16 border-t border-border px-6 py-32 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="reveal mb-6 text-balance text-5xl font-medium leading-[1.0] tracking-tight md:text-6xl lg:text-7xl">
              {portfolioConfig.personal.contactCta.heading}
            </h2>
            <p className="reveal d1 mb-8 max-w-[65ch] text-lg text-muted-foreground">
              {portfolioConfig.personal.contactCta.subheading}
            </p>
            <div className="reveal d2 flex flex-wrap gap-3">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90 active:scale-[0.98]"
              >
                {portfolioConfig.personal.contactCta.buttonText}
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href={portfolioConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-border px-6 py-3 text-sm font-medium transition hover:bg-secondary active:scale-[0.98]"
              >
                <Github className="h-4 w-4" />
                View GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-border px-6 py-12 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 {portfolioConfig.personal.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${portfolioConfig.social.email}`}
              aria-label="Email"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href={portfolioConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={portfolioConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
