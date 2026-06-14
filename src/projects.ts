import { Project } from "./types";

export const PROJECTS_DATA: Project[] = [
  {
    id: "fresh",
    title: "WeAre Fresh",
    subtitle: "Premium Fish & Meat Delivery App",
    description: "Developed a cross-platform fish and meat delivery application using Flutter for Android and iOS. Designed with an ultra-premium visual aesthetic featuring fluid lightweight Lottie animations, custom-themed custom micro-interactions, responsive asset layouts, and an exquisite aesthetic hierarchy. Implemented BLoC state management for a scalable representation, Firebase for secure user authentication, and Razorpay SDK integration for rapid checkout flows.",
    category: "E-Commerce",
    iconType: "fresh",
    rating: 4.8,
    installs: "25k+",
    technologies: [
      "Flutter", "Dart", "BLoC State Management", "Firebase Auth", "Razorpay SDK", 
      "Lottie Animations", "Premium Visual Shaders", "FCM Push Notifications", "Git", "Android", "iOS"
    ],
    features: [
      "BLoC-based modular streaming architecture ensuring complete partition of logic",
      "Rich UI with animated micro-interactions, custom asset designs, and a premium look",
      "Seamless Razorpay transaction handler with callback state reconciliation",
      "Silky-smooth user onboarding utilizing high-fidelity Lottie illustrations",
      "FCM triggers for delivery dispatcher tracking states"
    ]
  },
  {
    id: "milk",
    title: "Elanadu Daily",
    subtitle: "Subscription-Based Milk Delivery Platform",
    description: "Built a customized subscription milk and dairy product delivery application that empowers recurring users to schedule and configure daily quotas. Designed with a flexible order calendar scheduler utilizing Flutter and BLoC. Backed by a high-efficiency local SQLite layer for local delivery logging, Firebase cloud notifications, and Razorpay online recharge wallets.",
    category: "E-Commerce",
    iconType: "milk",
    rating: 4.7,
    installs: "15k+",
    technologies: [
      "Flutter", "Dart", "BLoC state engine", "Firebase", "SQLite Caching", 
      "Razorpay", "Push Notifications", "Custom Calendar Engine", "Git", "Android", "iOS"
    ],
    features: [
      "Advanced Calendar schedule manager for daily, weekly, or custom interval delivery cycles",
      "Real-time wallet balances syncing with micro-transaction logging histories",
      "Direct digital wallet loading with modular Razorpay configurations",
      "High-priority early morning delivery notification alerts powered by Firebase"
    ]
  },
  {
    id: "quiz",
    title: "HSE Champ",
    subtitle: "Health, Safety & Environment Quiz & Gamified App",
    description: "Developed an intuitive interactive gamified learning program focused on HSE awareness. Configured Firebase Realtime Database to drive rapid-fire synchronous live matches and immediate leaderboard updates, while employing the ultra-fast Isar Database on device for offline persistence, history logging, and student performance statistics.",
    category: "Quiz/EdTech",
    iconType: "quiz",
    rating: 4.9,
    installs: "10k+",
    technologies: [
      "Flutter", "Dart", "BLoC Management", "Firebase Realtime DB", 
      "Isar Database", "Push Notifications", "Analytics SDK", "Git", "Android", "iOS"
    ],
    features: [
      "Synchronous live match streams powered by Firebase Realtime DB pipelines",
      "Ultra-low latency queries on Isar Database for thousands of safety questions",
      "Staggered animation leaderboards and performance diagnostic charts",
      "Personalized learning paths utilizing localized performance telemetry"
    ]
  },
  {
    id: "equalplus",
    title: "Equal Plus",
    subtitle: "Offline-First Billing & Thermal Printing Platform",
    description: "Designed and developed Equal Plus, an enterprise billing and point-of-sale utility application utilizing Flutter. Configured with a full BLoC pattern state architecture to isolate print stream buffers and local sales registers. Features zero latency offline database support using the high-performance Isar collection schemas to save and manage daily invoice details, user pricing ledgers, and accounts ledger indices. Built custom platform channels to handle instant ESC/POS printer data streams to connect and map with physical Bluetooth thermal printers seamlessly.",
    category: "Billing & Utility",
    iconType: "equalplus",
    rating: 4.9,
    installs: "12k+",
    technologies: [
      "Flutter", "Dart", "BLoC State Management", "Isar Database", "Bluetooth LE Thermal SDK", 
      "Platform Channels", "ESC/POS Byte Encoding", "Offline Synchronization", "Local Storage", 
      "PDF Generation", "Git", "Android", "iOS"
    ],
    features: [
      "BLoC-managed state isolation separating visual catalog loads from physical print buffers",
      "Low latency query engine on Isar Database managing instant local transaction entries",
      "Custom binary ESC/POS formatting layer for layout-accurate physical bill printing",
      "Deferred back-end syncer auto-posting local receipts database when connection recovers",
      "High fidelity print preview canvas with instantaneous PDF export workflows"
    ]
  },
  {
    id: "mobicom",
    title: "mobicom",
    subtitle: "Exclusive Club Networking & Booking Platform",
    description: "Developed a premium Flutter application connecting members of exclusive social, golf, yacht, and city clubs worldwide. Implemented a scalable MVVM architecture with Provider state management, automated reciprocal club booking workflows, secure Stripe payment integration, biometric authentication (FaceID/TouchID), real-time WebSocket-based messaging, location-based club discovery using Google Places API, and Firebase Cloud Messaging (FCM) for instant notifications. Optimized application performance using Selector-based state updates to deliver a smooth and responsive cross-platform experience on Android and iOS.",
    category: "Exclusive Club Networking & Booking Platform",
    iconType: "mobicom",
    rating: 4.9,
    installs: "5k+",
    technologies: [
      "Flutter", "Dart", "MVVM Architecture", "Provider", "Firebase", 
      "Stripe Payment Gateway", "WebSockets", "Google Places API", 
      "Biometric Authentication", "FCM", "REST APIs", "Git", "Android", "iOS"
    ],
    features: [
      "Selector-based state optimization achieving solid 120 FPS high scroll-rates",
      "Dynamic cross-club reservations validation engine",
      "Secure Stripe elements multi-currency payment integration",
      "Native device face/fingerprint biometric fallback layer",
      "Automatic reconnection & heartbeat-enabled WebSocket channels"
    ]
  },
  {
    id: "meditation",
    title: "Miracle Meditation",
    subtitle: "Mindfulness, Breathing & Wellness Platform",
    description: "Developed a cross-platform meditation and holistic health application in Flutter. Focuses on mental serenity through guided audio breathing routines, personalized health routines, and mindfulness tracking metrics. Integrated robust Google Firebase tools, specialized audio cache players, and custom background alarms.",
    category: "Mindfulness",
    iconType: "meditation",
    rating: 4.8,
    installs: "30k+",
    technologies: [
      "Flutter", "Dart", "Firebase Suite", "REST APIs", "Audio cache streaming", 
      "Push Notifications", "Daily reminders", "Git", "Android", "iOS"
    ],
    features: [
      "Background-safe audio ambient streaming wrapper",
      "Responsive progress calendar mapping user streak achievements",
      "Local alarm scheduling hooks for peaceful morning meditation prompts",
      "RESTful integration with remote mindfulness audio content servers"
    ]
  },
  {
    id: "fizzmo",
    title: "FIZZMO",
    subtitle: "Emotional Intelligence (EQ) Learning Platform",
    description: "Developed a cross-platform Emotional Intelligence (EQ) learning application for children using Flutter, focused on enhancing emotional and social skills through interactive learning modules, gamified activities, quizzes, and challenges. Implemented personalized learning paths, progress tracking, parent dashboards, subscription management, and push notifications to create an engaging and effective learning experience. Integrated REST APIs, Firebase services, and state management solutions while ensuring optimal performance and seamless functionality across Android and iOS platforms.",
    category: "Quiz/EdTech",
    iconType: "fizzmo",
    rating: 4.9,
    installs: "8k+",
    technologies: [
      "Flutter", "Dart", "Firebase", "REST APIs", "BLoC/Provider/GetX", 
      "Push Notifications", "In-App Purchases", "Git", "Android", "iOS"
    ],
    features: [
      "Personalized dynamic child emotional assessment algorithms",
      "Interactive parent reporting screens highlighting emotional progression logs",
      "Store Kit / Play Billing sub-packages for premium module access",
      "Colorful gamified check-ins designed for younger audiences"
    ]
  }
];
