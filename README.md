# Portfolio Website

A customizable portfolio template built with Next.js, React, and Tailwind CSS.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Customization

All content is centralized in a single configuration file:

### `config/portfolio.ts`

This file contains all the customizable content for the website:

### Personal Information

```typescript
personal: {
  name: "Your Name",
  title: "Your Title",
  tagline: "Your tagline or bio",
  location: "Your location",
  status: "Available/Not Available",
  contactCta: {
    heading: "Have an app idea?",
    subheading: "Let's build something amazing.",
    buttonText: "Get in Touch",
  },
}
```

### Social Links

```typescript
social: {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  email: "your@email.com",
  phone: "+1234567890",
}
```

### Services Section

```typescript
services: [
  {
    num: "01",
    title: "Service Title",
    description: "Service description",
    stack: ["Tech1", "Tech2", "Tech3"],
  },
  // Add more services...
]
```

### Tech Stack

```typescript
stack: {
  Languages: ["Language1", "Language2"],
  Libraries: ["Library1", "Library2"],
  Tools: ["Tool1", "Tool2"],
  // Add more categories...
}
```

### Companies/Experience

```typescript
companies: [
  { name: "Company Name", logo: "images/company-logo.png" },
  // Add more companies...
]
```

### Phone Mockup Apps

```typescript
apps: [
  {
    id: 1,
    title: "App Name",
    fullTitle: "Full App Name",
    icon: "A", // Single character
    color: "#3b82f6", // Hex color
    industry: "Industry Name",
    description: "App description",
    technologies: ["Tech1", "Tech2"],
    link: "https://app-link.com",
    downloads: "1M+", // Optional
    rating: 4.5, // Optional (number)
    image: "images/app-banner.png",
    splashImage: "images/splash.png", // Optional (null for generated splash)
    lastUpdated: "June 2025",
  },
  // Add more apps...
]
```

### Contact Form (Google Forms)

```typescript
contact: {
  formUrl: "https://docs.google.com/forms/d/e/...",
  fieldIds: {
    name: "entry.123456789",
    email: "entry.123456789",
    // ... other field IDs
  },
}
```

## How to Customize

### 1. Edit Personal Info

Open `config/portfolio.ts` and update the `personal` section with your information.

### 2. Update Services

Modify the `services` array to reflect your offered services. Each service has:
- `num`: Section number (01, 02, etc.)
- `title`: Service title
- `description`: Brief description
- `stack`: Array of technologies used

### 3. Update Tech Stack

Edit the `stack` object to list your technical skills. Each key is a category, and the value is an array of technologies.

### 4. Add Company Logos

Place your company logo images in the `public/images/` folder, then update the `companies` array with the correct file paths.

### 5. Customize Phone Mockup Apps

The phone mockup displays your portfolio apps. Edit the `apps` array:
- Add or remove apps
- Update app details (title, description, link, etc.)
- Use custom splash images or set `splashImage: null` to generate a branded splash
- Update app icons (single character) and colors

### 6. Set Up Contact Form

To use the contact form with Google Forms:
1. Create a Google Form
2. Get the form submission URL
3. Get the field IDs from the form (check the form's HTML or use a tool)
4. Update the `contact` section in `config/portfolio.ts`

## Image Guidelines

- Place images in the `public/images/` folder
- Recommended sizes:
  - App banners: 1200x600px
  - Company logos: 400x300px (3:2 aspect ratio)
  - Splash screens: Match your app's splash design

## Running the Project

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run start
```

## Tech Stack

- **Framework**: Next.js 15
- **UI**: React, Tailwind CSS
- **Components**: Radix UI (shadcn/ui)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## License

MIT