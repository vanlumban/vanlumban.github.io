"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, Send, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfJvl_aYKLqVVZngIDV31HfUyZYxFpLRVUvIJ9hL2vGUmbCMQ/formResponse"

   const FIELD_IDS = {
    name: "entry.168054364", 
    email: "entry.1096951385", 
    company: "entry.1853628948", 
    phone: "entry.514276364", 
    projectType: "entry.2018294421", 
    budget: "entry.1596272576", 
    timeline: "entry.197388172", 
    message: "entry.1945337757", 
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    const formData = new FormData(event.currentTarget)

    const googleFormData = new FormData()
    googleFormData.append(FIELD_IDS.name, formData.get("name") as string)
    googleFormData.append(FIELD_IDS.email, formData.get("email") as string)
    googleFormData.append(FIELD_IDS.company, formData.get("company") as string)
    googleFormData.append(FIELD_IDS.phone, formData.get("phone") as string)
    googleFormData.append(FIELD_IDS.projectType, formData.get("projectType") as string)
    googleFormData.append(FIELD_IDS.budget, formData.get("budget") as string)
    googleFormData.append(FIELD_IDS.timeline, formData.get("timeline") as string)
    googleFormData.append(FIELD_IDS.message, formData.get("message") as string)

    try {
      // Submit to Google Forms
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        body: googleFormData,
        mode: "no-cors", // Important: Google Forms requires no-cors mode
      })

      // Since we can't read the response in no-cors mode, we assume success
      setSubmitStatus({
        type: "success",
        message: "Thank you for your inquiry! I'll get back to you within 24 hours.",
      })

      // Reset form
      ;(event.target as HTMLFormElement).reset()
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus({
        type: "error",
        message: "Sorry, there was an error sending your message. Please try again or contact me directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-6 w-6" />
          Project Inquiry
        </CardTitle>
        <CardDescription>Fill out the form below and I'll get back to you within 24 hours.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="Your full name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company (Optional)</Label>
              <Input id="company" name="company" placeholder="Your company name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 123-4567" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-type">Project Type</Label>
            <Select name="projectType" required>
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New Android App Development">New Android App Development</SelectItem>
                <SelectItem value="Existing App Enhancement">Existing App Enhancement</SelectItem>
                <SelectItem value="Thesis/Research Support">Thesis/Research Support</SelectItem>
                <SelectItem value="Technical Consultation">Technical Consultation</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input id="budget" name="budget" placeholder="Budget" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline</Label>
              <Input id="timeline" name="timeline" placeholder="Timeline" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Project Details</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell me about your project, requirements, and any specific features you need..."
              className="min-h-[120px]"
              required
            />
          </div>

          {/* Status Messages */}
          {submitStatus.type && (
            <div
              className={`p-4 rounded-lg flex items-center gap-2 ${
                submitStatus.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {submitStatus.type === "success" ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <span className="text-sm">{submitStatus.message}</span>
            </div>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>

        <Separator />

        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">Prefer to reach out directly?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link href="mailto:lumban.vjm@gmail.com">
                <Mail className="mr-2 h-4 w-4" />
                lumban.vjm@gmail.com
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="tel:+639266870932">
                <Phone className="mr-2 h-4 w-4" />
                +(63) 926-687-0932
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
