'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Smartphone, Github, Menu, X } from 'lucide-react'
import { ContactModal } from '@/components/ContactModal'

const navLinks = [
  { href: '#portfolio', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#experience', label: 'Experience' },
  { href: '#stack', label: 'Stack' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="#" className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              <span className="font-medium">Van Lumban</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="https://github.com/vanlumban"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors"
              >
                <Github className="h-4 w-4" />
                View GitHub
              </Link>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                Get in Touch
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm text-muted-foreground hover:text-foreground hover:bg-secondary px-4 py-2 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                  <Link
                    href="https://github.com/vanlumban"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    View GitHub
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false)
                      setIsContactModalOpen(true)
                    }}
                    className="inline-flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity"
                  >
                    Get in Touch
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  )
}
