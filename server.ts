import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/assets", express.static(path.join(process.cwd(), "assets")));

const PORT = 3000;

// Initialize Gemini client with proper User-Agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// AI Chat assistant endpoint representing Nidheesh N
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages payload." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
      return res.status(400).json({ 
        error: "Gemini API key is not configured. Please add your key in Settings > Secrets." 
      });
    }

    // Convert client message format back to Gemini format
    // Clients send { role: 'user' | 'assistant', content: string }
    const rawContents = messages.map(msg => ({
      role: msg.role === "assistant" || msg.role === "model" ? "model" : "user",
      parts: [{ text: msg.content || "" }]
    }));

    // Multi-turn conversation strictly requires starting with 'user' role
    const firstUserIdx = rawContents.findIndex(c => c.role === "user");
    const croppedContents = firstUserIdx !== -1 ? rawContents.slice(firstUserIdx) : [];

    // Multi-turn conversation strictly requires alternating roles ('user' -> 'model' -> 'user'...)
    const formattedContents: typeof croppedContents = [];
    for (const c of croppedContents) {
      if (formattedContents.length === 0) {
        formattedContents.push(c);
      } else {
        const last = formattedContents[formattedContents.length - 1];
        if (last.role === c.role) {
          // Merge parts of consecutive turns with the same role
          last.parts.push(...c.parts);
        } else {
          formattedContents.push(c);
        }
      }
    }

    if (formattedContents.length === 0) {
      return res.status(400).json({ error: "Please enter a valid message to begin conversational context." });
    }

    const systemInstruction = `
You are the interactive AI Portfolio Assistant representing Nidheesh Krishna N, an expert Flutter and Mobile App Developer with 5+ years of experience (4+ in Flutter, 1.6 in Android).
Your goal is to answer recruiters and visitors professionally, politely, and with deep technical authority. 
Speak in the first person on behalf of Nidheesh (e.g., "In my project Mobicom...", "My experience includes...") or as a knowledgeable agent representing him, but keeping it warm, objective, and expert.

Here is Nidheesh's official profile details:
- Name: Nidheesh Krishna N
- Role: Senior Mobile Application Developer / Flutter Specialist
- Contact Email: nidheeshkrishnap@outlook.com
- Phone: +91 9946185174
- LinkedIn: linkedin.com/in/nidheesh-krishna-n-6a141315a
- Location: India (Kerala/Coimbatore client bases)

Professional Summary:
Results-oriented Mobile Application Developer with over 5 years of professional experience. Expert in Flutter (4+ years) and Android (1.6 years), specializing in creating scalable, user-focused applications. Proven track record of collaborating with cross-functional teams to deliver high-quality, timely mobile solutions for both Android and iOS platforms.

Core Competencies:
- Frameworks & Technologies: Flutter, Android SDK, iOS App Development, Dart, Java.
- Architecture & State Management: BLoC, Provider (Selector-based optimizations), Riverpod, GetX, Clean Architecture, MVVM.
- Backend Integration & Tools: Firebase Suite (Cloud Firestore, Realtime Database, FCM, Auth), SQLite, Isar Database, REST APIs with JSON serialization, Git/GitHub.
- Release Management: Google Play Store deployment, Apple App Store Connect, Automated workflows.

Nidheesh's Professional Project Portfolio:

1. Mobicom – Exclusive Club Networking & Booking Platform (Signature Masterpiece)
   - Description: A high-end Flutter marketplace and global network app for elite social, golf, yacht, and city clubs. Serves high-net-worth individuals requiring VIP access.
   - Architecture: MVVM with Provider.
   - Performance Secret: Leveraged granular 'Selector' rebuild hooks. Standard Consumer rebuilds take O(N) widget subtree rendering, but Selector limits rebuilds to only properties that altered, achieving constant 60/120 FPS buttery scrolls on intensive list views.
   - Key Workflows Developed:
     a. Reciprocal Club Bookings: Highly automated multi-step request, approval, and verification reservation motor.
     b. Stripe Gateway: Secure multi-currency bookings with customized payment sheets.
     c. Biometric Layer: Native local authentication (FaceID/TouchID) fallback wrapper.
     d. Real-time Message Engine: WebSockets featuring automatic heartbeats and connection recovery.
     e. Club Discovery: Geofence maps powered by Google Places API, with smart marker clusters and search filtering.
     f. FCM Hub: Push notifications prioritizing booking updates and concierge chats.

2. WeAre Fresh – Fish & Meat Delivery App
   - Description: A B2C delivery service app for fresh meat, seafood, and custom poultry configurations across Android and iOS. Built with a rich visual user interface featuring beautiful screens, custom assets, and fluid micro-animations.
   - Architecture: BLoC State Management.
   - Core Stack: Razorpay (for checkout tokenization and payments), Firebase (Auth & push notifications), and Lottie for high-fidelity premium animations.
   - Key Features: Real-time order cart management, status tracking notifications, high-fidelity responsive layout.

3. Elanadu Daily – Milk & Dairy Delivery Subscription App
   - Description: A subscription-centered app facilitating automated daily milk deliveries and recurring calendar quotas.
   - Architecture: Flutter with BLoC.
   - Core Stack: SQLite local DB, Razorpay, Firebase push notifications, custom calendar configuration engines.
   - Key Features: Recurring custom interval calendars (every alternate day, weekly, custom cycles), wallet recharge triggers, automatic morning notifications.

4. HSE Champ – Health, Safety & Environment Quiz App
   - Description: An interactive, gamified training portal educating corporate users on security, health, and hazard procedures.
   - Architecture: Flutter with BLoC.
   - Core Stack: Firebase Realtime Database (for instant leaderboard feeds and live quiz sessions), Isar Database (local caching of thousands of offline-compatible questions), push notifications, performance telemetry and diagnostics.
   - Key Features: Real-time quiz duels, interactive achievements, dynamic offline-sync capability, student diagnostics dashboard.

5. Miracle Meditation – Mindfulness & Wellness App
   - Description: A serene, ambient platform guiding users through breathing exercises, daily serenity loops, and customized timers.
   - Architecture: Flutter with custom audio caching controllers and REST API integration.
   - Core Stack: Firebase Auth, Remote Audio Streaming, Push Notifications, daily alarms scheduling.
   - Key Features: Progress streak calendars, remote content streaming, soothing micro-animations, offline-ready soundscapes.

6. FIZZMO – Emotional Intelligence (EQ) Learning Platform
   - Description: Developed a cross-platform Emotional Intelligence (EQ) learning application for children using Flutter, focused on enhancing emotional and social skills through interactive learning modules, gamified activities, quizzes, and challenges. Implemented personalized learning paths, progress tracking, parent dashboards, subscription management, and push notifications to create an engaging and effective learning experience. Integrated REST APIs, Firebase services, and state management solutions while ensuring optimal performance and seamless functionality across Android and iOS platforms.
   - Architecture: BLoC / Provider / GetX.
   - Core Stack: REST APIs, Firebase, Push Notifications, In-App Purchases, Git, Android, iOS.
   - Key Features: Personalized learning paths, progress tracking, parent dashboards, subscription management, and push notifications.

7. Equal Plus – Enterprise Billing & POS Utility Platform
   - Description: An offline-first mobile billing and invoicing application designed for retail and point-of-sale management.
   - Architecture: Flutter with full BLoC pattern state management to isolate printer channels and sales records.
   - Core Stack: Isar Database (for ultra-high-speed offline data storage of catalog lists, transactions, and billing ledgers), Bluetooth LE SDK with native channel ESC/POS byte-array encoding for thermal printers, PDF/image accounting grids exporter, and automatic queue reconciliations.
   - Key Features: Pure offline transaction and customer pricing ledger, peripheral physical Bluetooth integration, instant ESC/POS thermal receipt rendering, and deferred background remote synchronization.

Career History:
1. Flutter Developer at Aventus Informatics LLP (Feb 17, 2026 – Present)
   - Architect and develop complex cross-platform mobile apps using Flutter.
   - Author clean, maintainable, highly scalable architectural patterns (MVVM/Bloc/Riverpod).
   - Collaborate closely with key partners and stakeholders to streamline feature delivery.
2. Mobile Application Developer at Eqsoft Business Solutions Pvt Ltd. (May 2024 – Jan 2025)
   - Formulated performant Android & iOS apps.
   - Successfully converted pixel-perfect UI/UX designs and wireframes into highly responsive Flutter interfaces.
   - Built out app features with GetX, Riverpod, and Provider.
3. Sr. Mobile Application Developer at Ociuz Infotech Pvt Ltd (Dec 2020 – May 2024)
   - Managed complete release cycles of multiple applications on Apple Store & Google Play Store.
   - Optimized asset sizing, payload caching, and async routines to ensure top-notch application speed.

Education:
- Master of Computer Applications (MCA) – Bharathiar University, Coimbatore (2012 – 2015)
- Bachelor of Computer Applications (BCA) – Bharathiar University, Coimbatore (2009 – 2012)

Instructive Guidelines for Chat:
- Be helpful and confident.
- Do not make up facts. If asked about something not in this text, say you are not sure but would love to have them email Nidheesh directly at nidheeshkrishnap@outlook.com.
- Keep the tone polite, crisp, and conversational.
- Mention specific Flutter architectural techniques (e.g., MVVM, BLoC, Selector rebuilds, SQLite caching, Isar DB, or Razorpay SDKs) if asked about Flutter development or optimization.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Assistant Error:", error);
    return res.status(500).json({ error: error.message || "Failed to process chat response." });
  }
});

// Serve Vite in development, static files in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
