import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Smartphone,
  Code,
  Database,
  Cloud,
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Star,
  MapPin,
  Library,
  Download,
  Users,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ContactForm } from "@/components/contact-form"

export default function Portfolio() {
  const languages = ["Kotlin", "Java"]

  const sdkLibraries = [
    "Volley",
    "Retrofit",
    "Okhttp",
    "Dagger",
    "Firebase",
    "Coil",
    "AppsFlyer",
    "LiveChat",
    "Live Person",
    "Facebook",
    "Google",
    "Biometric",
    "MappedIn",
    "Card.io",
    "Rootbeer",
    "Airship",
    "Adobe Analytics",
  ]

  const databases = ["Firebase Realtime DB", "Room"]

  const testing = ["Espresso", "JUnit", "Mockito"]

  const deployment = ["Fastlane", "Firebase", "Bitrise", "AppCenter", "Google Playstore"]

  const tools = [
    "Android Studio",
    "Gradle",
    "Git",
    "JIRA",
    "Zeplin",
    "Figma",
    "Postman",
    "Insomnia",
    "Swagger.io",
    "Optimizely",
  ]

  const projects = [
    {
      title: "Alaska Airlines App",
      description:
        "An Airlines App is a travel companion designed to streamline the flying experience for airlines passengers. Users can book flights, manage reservations, check in, access mobile boarding passes, track flight status, and receive real-time notifications — all from their mobile device.",
      technologies: ["Java", "Kotlin", "Jetpack Compose", "MVVM", "MVI"],
      image: "images/portfolio-1.jpg",
      link: "https://play.google.com/store/apps/details?id=com.alaskaairlines.android&hl=en",
      downloads: "5M+",
      rating: 4.7,
      reviews: "84K+",
      lastUpdated: "June 2025",
    },
    {
      title: "M88 Casino App",
      description:
        "M88 App is a mobile gaming and sports betting platform that offers live sports betting, casino games, slots, and virtual sports. It delivers a seamless and secure user experience with support for fast transactions and multiple languages, all optimized for mobile use.",
      technologies: ["Kotlin", "Jetpack Compose", "WebView", "MVVM"],
      image: "images/portfolio-2.png",
      link: "https://www.m88.com/mobile",
      downloads: null, // No public stats available
      rating: null,
      reviews: null,
      lastUpdated: null,
    },
    {
      title: "UnionBank Online Banking",
      description:
        "This app empowers users with secure and convenient banking, anytime and anywhere. The app offers a seamless way to manage accounts and cards, transfer funds, pay bills, buy mobile load, split expenses, request payments, and access a wide range of other essential financial services — all from the palm of your hand.",
      technologies: ["Java", "Kotlin", "MVVM", "Retrofit"],
      image: "images/portfolio-3.jpg",
      link: "https://play.google.com/store/apps/details?id=com.unionbankph.online&hl=en",
      downloads: "10M+",
      rating: 4.7,
      reviews: "271K+",
      lastUpdated: "June 2025",
    },
    {
      title: "TakeFive Outdoors App",
      description:
        "TakeFive Outdoors is a digital booking platform for outdoor adventures. Users can view trip schedules, check seat availability, and reserve slots with ease. The app supports local communities by promoting authentic, eco-friendly travel experiences to mountains, beaches, waterfalls, and more.",
      technologies: ["Kotlin", "MVVM", "Firebase"],
      image: "images/portfolio-4.png",
      link: "https://play.google.com/store/apps/details?id=com.darkcloak.android.takefive&hl=en",
      downloads: "10K+",
      rating: 4.6,
      reviews: "100+",
      lastUpdated: "June 2025",
    },
    {
      title: "Zing at Ayala Malls",
      description:
        "Zing is Ayala Malls' all-in-one digital companion, created to elevate every visit. Through the app or website, shoppers can enjoy seamless access to free WiFi, instantly book movie tickets, collect and redeem Zing points for exclusive vouchers, discover stores and restaurants with ease, and be the first to know about special deals and limited-time promos — all in one convenient platform.",
      technologies: ["Kotlin", "MVVM", "Firebase", "MappedIn"],
      image: "images/portfolio-5.jpg",
      link: "https://play.google.com/store/apps/details?id=com.ayalamalls.zing&hl=en&pli=1",
      downloads: "1M++",
      rating: 3.2,
      reviews: "1.6K+",
      lastUpdated: "June 2025",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full px-4 md:px-6 flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="#" className="mr-6 flex items-center space-x-2">
              <Smartphone className="h-6 w-6" />
              <span className="font-bold">Van Lumban</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="#about" className="transition-colors hover:text-foreground/80">
              About
            </Link>
            <Link href="#technologies" className="transition-colors hover:text-foreground/80">
              Technologies
            </Link>
            <Link href="#portfolio" className="transition-colors hover:text-foreground/80">
              Portfolio
            </Link>
            <Link href="#services" className="transition-colors hover:text-foreground/80">
              Services
            </Link>
            <Link href="#experience" className="transition-colors hover:text-foreground/80">
              Experience
            </Link>
            <Link href="#contact" className="transition-colors hover:text-foreground/80">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero/About Section */}
      <section id="about" className="py-24 md:py-32">
        <div className="w-full px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Senior Android Developer
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Passionate Android developer with 7+ years of experience creating innovative mobile applications.
                  Specialized in Kotlin, Jetpack Compose, and modern Android architecture patterns.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="#contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Get In Touch
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="https://github.com/vanlumban">
                    <Github className="mr-2 h-4 w-4" />
                    View GitHub
                  </Link>
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  Philippines
                </div>
                <div className="flex items-center">
                  <Briefcase className="mr-1 h-4 w-4" />
                  Available for hire
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/images/User.jpg"
                alt="Van Lumban"
                width={400}
                height={400}
                className="aspect-square overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-24 bg-muted/50">
        <div className="w-full px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Technologies & Tools</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                My technical expertise spans across various programming languages, development tools, and deployment
                platforms.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Programming Languages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <Badge key={lang} variant="secondary">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Library className="h-5 w-5" />
                    SDK Libraries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {sdkLibraries.map((lib) => (
                      <Badge key={lib} variant="secondary">
                        {lib}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Databases
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {databases.map((database) => (
                      <Badge key={database} variant="secondary">
                        {database}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Development Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tools.map((tool) => (
                      <Badge key={tool} variant="secondary">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Testing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {testing.map((test) => (
                      <Badge key={test} variant="secondary">
                        {test}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="h-5 w-5" />
                    Deployment & CI/CD
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {deployment.map((deploy) => (
                      <Badge key={deploy} variant="secondary">
                        {deploy}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24">
        <div className="w-full px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Portfolio</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Showcase of my recent Android applications and mobile development projects.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
            {projects.map((project, index) => {
              const hasStats = project.downloads || project.rating || project.reviews
              const hasAllStats = project.downloads && project.rating && project.reviews

              return (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={300}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* App Stats */}
                    {hasStats ? (
                      <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-4 text-sm flex-wrap">
                            <div className="flex items-center gap-1">
                              <Download className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{project.downloads || "N/A"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="font-medium">{project.rating || "N/A"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{project.reviews || "N/A"}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {project.lastUpdated
                            ? `Stats last updated: ${project.lastUpdated}`
                            : "Stats not publicly available"}
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4 p-3 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
                        <div className="text-center text-sm text-muted-foreground">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <Star className="h-4 w-4" />
                            <span className="font-medium">App Stats Not Available</span>
                          </div>
                          <p className="text-xs">
                            This app's statistics are not publicly accessible or the app is in private distribution.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          {project.link.includes("play.google.com") ? "View on Play Store" : "View App"}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-muted/50">
        <div className="w-full px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Services</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Professional services I offer to help bring your mobile app ideas to life.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-6 w-6" />
                  Android App Development
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Full-cycle Android application development from concept to deployment. I create native Android apps
                  using modern technologies and best practices.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Native Android development with Kotlin/Java
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Modern UI with Jetpack Compose
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Backend integration and API development
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Play Store deployment and optimization
                  </li>
                </ul>
                <Button className="w-full">
                   <Link href="#contact">
                   Get Quote
                   </Link>
                   </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6" />
                  Thesis & Research Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Academic support for computer science and mobile development thesis projects. I help students with
                  research, implementation, and documentation.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Mobile app development for research
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Technical writing and documentation
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Code review and optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Presentation and defense preparation
                  </li>
                </ul>
                <Button className="w-full">
                   <Link href="#contact">
                   Get Quote
                   </Link>
                   </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Experience Section */}
      <section id="experience" className="py-24">
        <div className="w-full px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Professional Experience</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Companies I've had the privilege to work with.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-5xl py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-center justify-items-center">
              <div className="flex items-center justify-center p-6 bg-background border rounded-lg hover:shadow-md transition-shadow w-full h-32">
                <Image
                  src="/images/cognizant.png"
                  alt="Cognizant"
                  width={160}
                  height={60}
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity max-w-full max-h-full"
                />
              </div>
              <div className="flex items-center justify-center p-6 bg-background border rounded-lg hover:shadow-md transition-shadow w-full h-32">
                <Image
                  src="/images/whitecloak.png"
                  alt="Whitecloak Technologies"
                  width={160}
                  height={60}
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity max-w-full max-h-full"
                />
              </div>
              <div className="flex items-center justify-center p-6 bg-background border rounded-lg hover:shadow-md transition-shadow w-full h-32">
                <Image
                  src="/images/corex-studio.jpg"
                  alt="Corex Studio"
                  width={160}
                  height={60}
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity max-w-full max-h-full"
                />
              </div>
              <div className="flex items-center justify-center p-6 bg-background border rounded-lg hover:shadow-md transition-shadow w-full h-32">
                <Image
                  src="/images/bigcat.jpg"
                  alt="Bigcat Software Solutions"
                  width={160}
                  height={60}
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity max-w-full max-h-full"
                />
              </div>
              <div className="flex items-center justify-center p-6 bg-background border rounded-lg hover:shadow-md transition-shadow w-full h-32">
                <Image
                  src="/images/takefive-outdoors.png"
                  alt="Takefive Outdoors"
                  width={160}
                  height={60}
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity max-w-full max-h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-muted/50">
        <div className="w-full px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get In Touch</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Ready to bring your mobile app idea to life? Let's discuss your project and how I can help you achieve
                your goals.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-2xl py-12">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/50">
        <div className="w-full px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-6 w-6" />
                <span className="font-bold">Van Lumban</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Android Developer passionate about creating innovative mobile solutions.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Contact</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  lumban.vjm@gmail.com
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +(63) 926-687-0932
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Social</h4>
              <div className="flex space-x-4">
                <Link href="https://github.com/vanlumban" className="text-muted-foreground hover:text-foreground">
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/lumban-vjm/"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="#about" className="block text-muted-foreground hover:text-foreground">
                  About
                </Link>
                <Link href="#portfolio" className="block text-muted-foreground hover:text-foreground">
                  Portfolio
                </Link>
                <Link href="#services" className="block text-muted-foreground hover:text-foreground">
                  Services
                </Link>
                <Link href="#contact" className="block text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">© 2024 Van Lumban. All rights reserved.</p>
            <p className="text-sm text-muted-foreground">Built with Next.js and shadcn/ui</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
