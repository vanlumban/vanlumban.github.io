'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { ContactModal } from '@/components/ContactModal'
import { PhoneMockup } from '@/components/PhoneMockup'
import {
  Github,
  Linkedin,
  MapPin,
  ArrowRight,
} from 'lucide-react'
import { portfolioConfig } from '@/config/portfolio'

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

export default function Portfolio() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  useScrollReveal()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center px-6 lg:px-16 py-12">
        <div className="mx-auto max-w-7xl w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Intro */}
            <div className="max-w-xl">
              {/* Status Badge */}
              <div className="reveal d1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {portfolioConfig.personal.status}
                </span>
              </div>

              {/* Heading */}
              <h1 className="reveal d2 text-5xl md:text-6xl lg:text-7xl font-normal leading-[0.95] tracking-tight mb-8">
                {portfolioConfig.personal.title.split(' ')[0]}
                <br />
                <span className="text-muted-foreground">{portfolioConfig.personal.title.split(' ')[1]}</span>
                <br />
                {portfolioConfig.personal.title.split(' ')[2]}.
              </h1>

              {/* Intro */}
              <p className="reveal d3 text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
                {portfolioConfig.personal.tagline}
              </p>

              {/* Facts */}
              <div className="reveal d4 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {portfolioConfig.personal.location}
              </div>
            </div>

            {/* Right Side - Phone Mockup */}
            <div className="hidden lg:flex justify-end">
              <PhoneMockup />
            </div>
          </div>

          {/* Mobile Phone Mockup - Below intro */}
          <div className="lg:hidden mt-12">
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="px-6 lg:px-16 py-24 border-t border-border">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-16">
            <span className="text-xs font-medium tracking-widest text-muted-foreground mb-4 block">
              WHAT I OFFER
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight">
              Services
            </h2>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {portfolioConfig.services.map((service) => (
              <div
                key={service.num}
                className="reveal p-8 rounded-2xl border border-border bg-card hover:border-muted-foreground/50 transition-colors"
              >
                <h3 className="text-2xl font-normal mb-4">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.stack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Experience Section */}
      <section
        id="experience"
        className="px-6 lg:px-16 py-24 border-t border-border"
      >
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-16">
            <span className="text-xs font-medium tracking-widest text-muted-foreground mb-4 block">
              WHERE I'VE WORKED
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight">
              Experience
            </h2>
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {portfolioConfig.companies.map((company, index) => (
              <div
                key={index}
                className="reveal aspect-[3/2] relative bg-white rounded-xl overflow-hidden border border-border p-4 flex items-center justify-center hover:border-muted-foreground/50 transition-colors"
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack Section */}
      <section id="stack" className="px-6 lg:px-16 py-24 border-t border-border">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-16">
            <span className="text-xs font-medium tracking-widest text-muted-foreground mb-4 block">
              THINGS I USE
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight">
              Stack
            </h2>
          </div>

          {/* Stack Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(portfolioConfig.stack).map(([category, items]) => (
              <div key={category} className="reveal">
                <h3 className="text-xs font-medium tracking-widest text-muted-foreground mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="px-4 py-2 rounded-full border border-border text-sm hover:bg-foreground hover:text-background transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section
        id="contact"
        className="px-6 lg:px-16 py-32 border-t border-border"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="reveal text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight mb-8">
              {portfolioConfig.personal.contactCta.heading}
            </h2>
            <p className="reveal d1 text-muted-foreground text-lg mb-8">
              {portfolioConfig.personal.contactCta.subheading}
            </p>
            <div className="reveal d2 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 text-sm px-6 py-3 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                {portfolioConfig.personal.contactCta.buttonText}
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href={portfolioConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-sm px-6 py-3 rounded-lg border border-border hover:bg-secondary transition-colors"
              >
                <Github className="h-4 w-4" />
                View GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Footer */}
      <footer className="px-6 lg:px-16 py-12 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>&copy; 2026 {portfolioConfig.personal.name}.</span>
              <span>All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={portfolioConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href={portfolioConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
