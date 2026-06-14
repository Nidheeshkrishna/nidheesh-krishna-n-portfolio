import React, { useState, useEffect, useRef } from "react";
import { 
  Shield, CreditCard, MapPin, Wifi, RefreshCw, Send, CheckCircle, 
  Clock, Compass, Calendar, Users, Radio, ShoppingCart, Award, 
  Play, Pause, Heart, Sparkles, Star, ChevronRight, Activity, Smile, BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types
import { Club, Booking } from "../types";

interface PhoneSimulatorProps {
  selectedProjectId: string;
  onProjectChanged?: (id: string) => void;
}

// Mock fresh meats for "WeAre Fresh"
const FRESH_PRODUCTS = [
  { id: "p1", name: "Prime Black Angus Ribeye", category: "Red Meat", price: 24.50, rating: 4.8, image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=300&q=80", weight: "500g" },
  { id: "p2", name: "Atlantic Salmon Fillet", category: "Fish/Seafood", price: 18.20, rating: 4.9, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=300&q=80", weight: "400g" },
  { id: "p3", name: "Organic Chicken Breasts", category: "Poultry", price: 12.00, rating: 4.7, image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=300&q=80", weight: "1kg" }
];

// Mock dairy subscriptions for "Elanadu Daily"
const MILK_PRODUCTS = [
  { id: "m1", name: "Organic Pure Cow Milk", pricePerHour: 2.20, unit: "Litre", interval: "Daily", rating: 4.9, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80" },
  { id: "m2", name: "A2 Jersey Country Ghee", pricePerHour: 14.50, unit: "500ml Jar", interval: "Once", rating: 5.0, image: "https://images.unsplash.com/photo-1528750809311-667df924b11f?auto=format&fit=crop&w=300&q=80" }
];

// Mock safety quiz database for "HSE Champ"
const SAFETY_QUESTIONS = [
  {
    id: "q1",
    question: "What is the very first step in containing a localized chemical container spill?",
    options: [
      "Pour massive amounts of clean water over the spill area.",
      "Contain with inert sand or specialized absorbents, then notify the environmental lead.",
      "Wait for the safety shift change to log the incident."
    ],
    correctAnswer: 1,
    tip: "Water might stimulate secondary reactions or carry chemicals into local drainage systems."
  },
  {
    id: "q2",
    question: "Under ISO 45001 standards, which control method holds the absolute highest priority?",
    options: [
      "Providing high-grade personal protective equipment (PPE).",
      "Placing caution signs around hazard margins.",
      "Complete hazard elimination at the system level."
    ],
    correctAnswer: 2,
    tip: "Eliminating the hazard is the most effective engineering defense."
  }
];

// Mock meditation audios for "Miracle Meditation"
const MEDITATION_TRACKS = [
  { id: "t1", title: "Serenity Rainstorm Loops", duration: "12 min", category: "Mindfulness" },
  { id: "t2", title: "Profound Awakening breath", duration: "8 min", category: "Breathing" },
  { id: "t3", title: "Alpha Wave Deep Rest", duration: "20 min", category: "Sleeplessness" }
];

// Clubs list for "Mobicom"
const MOCK_CLUBS: Club[] = [
  { id: "1", name: "Monaco Yacht & Social Club", type: "Yacht", location: "Monte Carlo", country: "Monaco", image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=600&q=80", rating: 4.9, membersCount: 320 },
  { id: "2", name: "St. Andrews Old Links Club", type: "Golf", location: "Fife, Scotland", country: "United Kingdom", image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=600&q=80", rating: 5.0, membersCount: 145 },
  { id: "3", name: "The Capital Guild Club", type: "City", location: "Mayfair, London", country: "United Kingdom", image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=600&q=80", rating: 4.8, membersCount: 500 }
];

export default function PhoneSimulator({ selectedProjectId, onProjectChanged }: PhoneSimulatorProps) {
  // Lock simulator states
  const [isLocked, setIsLocked] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "success" | "failed">("idle");
  
  // Project-specific UI states
  const [activeTab, setActiveTab] = useState("home");
  
  // Fresh/Milk States: Cart counters
  const [cartCount, setCartCount] = useState<Record<string, number>>({});
  const [checkoutStep, setCheckoutStep] = useState<"idle" | "razorpay" | "processing" | "success">("idle");
  
  // Elanadu Subscription State
  const [scheduledFrequency, setScheduledFrequency] = useState("alternate");
  const [activeSubscriptions, setActiveSubscriptions] = useState<string[]>(["m1"]);
  const [walletBalance, setWalletBalance] = useState(48.50);

  // HSE Champ Quiz states
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnsIdx, setSelectedAnsIdx] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  // Miracle Meditation states
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<"Inhale" | "Hold" | "Exhale">("Inhale");
  const [breathTimer, setBreathTimer] = useState(4);
  const [activeMediaTrack, setActiveMediaTrack] = useState("t1");

  // FIZZMO states
  const [activeEmotionCheck, setActiveEmotionCheck] = useState<string | null>(null);
  const [fizzmoScoreCard, setFizzmoScoreCard] = useState({ empathy: 82, focus: 75, resilience: 90 });

  // Mobicom States
  const [selectedClub, setSelectedClub] = useState<Club>(MOCK_CLUBS[0]);
  const [bookingStep, setBookingStep] = useState<"form" | "stripe" | "confirming" | "success">("form");
  const [bookingDate, setBookingDate] = useState("2026-06-25");
  const [bookingGuests, setBookingGuests] = useState(2);
  const [isCreditCardValid, setIsCreditCardValid] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  // WSS mock details
  const [wsMessages, setWsMessages] = useState<Array<{ sender: "user" | "concierge", text: string, time: string }>>([]);
  const [inputMsg, setInputMsg] = useState("");
  const [wsStatus, setWsStatus] = useState<"connected" | "connecting">("connected");
  const [wsLatency, setWsLatency] = useState(28);

  // Auto unlock logic when project changes
  useEffect(() => {
    setIsLocked(true);
    setScanStatus("idle");
    setActiveTab("home");
    setCheckoutStep("idle");
    setBookingStep("form");
    
    // Reset specific states
    setCardNumber("");
    setIsCreditCardValid(false);
    setSelectedAnsIdx(null);
    setQuizComplete(false);
    setCurrentQuestionIdx(0);
    setQuizScore(0);
    setIsBreathingActive(false);

    // Initial message sync
    if (selectedProjectId === "mobicom") {
      setWsMessages([
        { sender: "concierge", text: "Welcome to mobicom Private Support. How may I assist your transit today?", time: "21:28" }
      ]);
    } else {
      setWsMessages([
        { sender: "concierge", text: "How can I help you today regarding this application?", time: "21:28" }
      ]);
    }

    const timer = setTimeout(() => {
      setIsScanning(true);
      setScanStatus("scanning");
      setTimeout(() => {
        setScanStatus("success");
        setTimeout(() => {
          setIsLocked(false);
          setIsScanning(false);
        }, 600);
      }, 1000);
    }, 400);

    return () => clearTimeout(timer);
  }, [selectedProjectId]);

  // Breathing simulation loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBreathingActive) {
      interval = setInterval(() => {
        setBreathTimer((prev) => {
          if (prev <= 1) {
            // Shift phase
            setBreathingPhase((current) => {
              if (current === "Inhale") return "Hold";
              if (current === "Hold") return "Exhale";
              return "Inhale";
            });
            return 4; // Reset timer count
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathingActive]);

  // Handle biometrics click triggers
  const handleManualBiometricTrigger = () => {
    setIsScanning(true);
    setScanStatus("scanning");
    setTimeout(() => {
      setScanStatus("success");
      setTimeout(() => {
        setIsLocked(false);
        setIsScanning(false);
      }, 600);
    }, 1200);
  };

  // Switch Theme attributes depending on active applet
  const getThemeConfigs = () => {
    switch (selectedProjectId) {
      case "mobicom":
        return {
          title: "Mobicom",
          accentColor: "text-gold-300",
          accentBg: "bg-gold-500",
          buttonStyle: "bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 text-black",
          badgeBg: "bg-gold-500/10 text-gold-300 border-gold-400/20",
          borderColor: "rgba(217, 190, 109, 0.15)",
          splashLabel: "Exclusive Club Networking & Booking Platform",
          iconColor: "text-gold-400"
        };
      case "fresh":
        return {
          title: "WeAre Fresh",
          accentColor: "text-emerald-400",
          accentBg: "bg-emerald-500",
          buttonStyle: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-semibold",
          badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
          borderColor: "rgba(16, 185, 129, 0.15)",
          splashLabel: "Fresh Meat & Fish Delivery",
          iconColor: "text-emerald-400"
        };
      case "milk":
        return {
          title: "Elanadu Daily",
          accentColor: "text-cyan-400",
          accentBg: "bg-cyan-500",
          buttonStyle: "bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-semibold",
          badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
          borderColor: "rgba(6, 182, 212, 0.15)",
          splashLabel: "Subscription Milk Logistics",
          iconColor: "text-cyan-400"
        };
      case "quiz":
        return {
          title: "HSE Champ",
          accentColor: "text-orange-400",
          accentBg: "bg-orange-500",
          buttonStyle: "bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold",
          badgeBg: "bg-orange-500/10 text-orange-300 border-orange-500/20",
          borderColor: "rgba(249, 115, 22, 0.15)",
          splashLabel: "HSE Training & Quizzes",
          iconColor: "text-orange-400"
        };
      case "meditation":
        return {
          title: "Miracle serenity",
          accentColor: "text-violet-400",
          accentBg: "bg-violet-600",
          buttonStyle: "bg-gradient-to-r from-violet-600 to-violet-700 text-white",
          badgeBg: "bg-violet-500/10 text-violet-300 border-violet-500/20",
          borderColor: "rgba(139, 92, 246, 0.15)",
          splashLabel: "Guided Meditation serenity",
          iconColor: "text-violet-400"
        };
      case "fizzmo":
        return {
          title: "FIZZMO EQ",
          accentColor: "text-rose-400",
          accentBg: "bg-rose-500",
          buttonStyle: "bg-gradient-to-r from-rose-500 to-rose-600 text-white",
          badgeBg: "bg-rose-500/10 text-rose-300 border-rose-500/20",
          borderColor: "rgba(244, 63, 94, 0.15)",
          splashLabel: "KIDS EQ Learning Hub",
          iconColor: "text-rose-400"
        };
      default:
        return {
          title: "Mobicom",
          accentColor: "text-gold-300",
          accentBg: "bg-gold-500",
          buttonStyle: "bg-gold-500 text-black",
          badgeBg: "bg-gold-500/10 text-gold-300",
          borderColor: "rgba(217, 190, 109, 0.15)",
          splashLabel: "Exclusive Club Networking & Booking Platform",
          iconColor: "text-gold-400"
        };
    }
  };

  const currentTheme = getThemeConfigs();

  // Fresh product item counters
  const incrementProduct = (id: string) => {
    setCartCount(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrementProduct = (id: string) => {
    if (cartCount[id] > 0) {
      setCartCount(prev => ({ ...prev, [id]: prev[id] - 1 }));
    }
  };

  const getSubtotal = () => {
    return Object.keys(cartCount).reduce((tot: number, id: string) => {
      const count = cartCount[id] || 0;
      const prod = FRESH_PRODUCTS.find(p => p.id === id);
      return tot + (prod ? prod.price * count : 0);
    }, 0);
  };

  const triggerRazorpayPayment = () => {
    setCheckoutStep("razorpay");
  };

  const handleRazorpayVerify = () => {
    setCheckoutStep("processing");
    setTimeout(() => {
      setCheckoutStep("success");
      setCartCount({});
    }, 2500);
  };

  // Quiz submission
  const handleSelectQuizOption = (optIdx: number) => {
    if (selectedAnsIdx !== null) return;
    setSelectedAnsIdx(optIdx);
    const correct = SAFETY_QUESTIONS[currentQuestionIdx].correctAnswer;
    if (optIdx === correct) {
      setQuizScore(prev => prev + 50);
    }
  };

  const handleNextQuiz = () => {
    setSelectedAnsIdx(null);
    if (currentQuestionIdx < SAFETY_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnsIdx(null);
    setQuizScore(0);
    setQuizComplete(false);
  };

  // Mobicom stripe handle
  const handleMobicomPayStep = () => {
    setBookingStep("confirming");
    setTimeout(() => {
      setBookingStep("success");
    }, 2800);
  };

  // Simulate remote bot response
  const handleChatTrigger = () => {
    if (!inputMsg.trim()) return;
    const text = inputMsg;
    setWsMessages(prev => [...prev, { sender: "user", text, time: "21:29" }]);
    setInputMsg("");

    setTimeout(() => {
      let resp = "Of course. Let me query our secure service architecture repositories.";
      
      // Smart prompt filters matching the active project state
      if (selectedProjectId === "fresh") {
        resp = "WeAre Fresh Razorpay tokenization verified. The local SQLite records are synchronizing.";
      } else if (selectedProjectId === "milk") {
        resp = "Jersey A2 Milk shipment configured on an alternate schedule. Balance updated in SQLite!";
      } else if (selectedProjectId === "quiz") {
        resp = "Firebase Realtime DB synced. Your current score has been uploaded to the regional safety leaderboard!";
      } else if (selectedProjectId === "meditation") {
        resp = "Mindfulness timer alerts registered successfully under FCM credentials.";
      } else if (selectedProjectId === "fizzmo") {
        resp = "IAP confirmation received. Parent dashboard analytical logs unlocked.";
      } else if (selectedProjectId === "mobicom") {
        if (text.toLowerCase().includes("book") || text.toLowerCase().includes("reserve")) {
          resp = `Booking at ${selectedClub.name} will require a valid reciprocal pass. Enqueueing Stripe webhook context...`;
        }
      }

      setWsMessages(prev => [...prev, { sender: "concierge", text: resp, time: "21:29" }]);
    }, 1200);
  };

  return (
    <div id="phone-simulator-frame" className="relative mx-auto w-full max-w-[380px] h-[720px] max-h-[90vh] rounded-[30px] sm:rounded-[50px] border-[8px] sm:border-[12px] border-[#1e2029] bg-[#090a0e] shadow-2xl overflow-hidden ring-2 sm:ring-4 ring-offset-1 sm:ring-offset-2 ring-offset-black ring-gold-500/10">
      
      {/* Device Status Bar / Notch */}
      <div className="absolute top-0 inset-x-0 h-7 bg-black z-30 flex items-center justify-between px-6 text-[11px] font-medium text-gray-400">
        <span className="font-semibold text-white">9:41</span>
        <div className="w-[110px] h-[18px] bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-1 flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-[#121216] rounded-full border border-gray-900 mr-2"></div>
          <div className="w-1.5 h-1.5 bg-[#20202a] rounded-full"></div>
        </div>
        <div className="flex items-center space-x-1">
          <Wifi className="w-3.5 h-3.5 text-white" />
          <Radio className="w-3 h-3 text-gold-400 animate-pulse" />
          <div className="w-5 h-2.5 bg-gray-600 rounded-sm relative p-[1px] flex items-center">
            <div className="h-full w-[85%] bg-white rounded-[1px]" />
          </div>
        </div>
      </div>

      {/* Interactive Quick App Swiper at the Top of Simulator */}
      <div className="absolute top-7 inset-x-0 h-10 bg-[#0e1017] border-b border-gray-900 z-20 px-3.5 flex items-center justify-between text-xs">
        <span className="text-[10px] font-mono text-gray-500 uppercase">Load Demo:</span>
        <select
          value={selectedProjectId}
          onChange={(e) => onProjectChanged && onProjectChanged(e.target.value)}
          className="bg-[#181a25] border border-gray-800 text-[11px] text-gold-300 font-bold px-2 py-1 rounded outline-none cursor-pointer max-w-[200px]"
        >
          <option value="mobicom">1. mobicom Exclusive</option>
          <option value="fresh">2. WeAre Fresh Apps</option>
          <option value="milk">3. Elanadu Dairy Sub</option>
          <option value="quiz">4. HSE Safety Quiz</option>
          <option value="meditation">5. Miracle Serene</option>
          <option value="fizzmo">6. FIZZMO Children EQ</option>
        </select>
      </div>

      {/* Main Screen Content Frame */}
      <div className="w-full h-full pt-17 pb-12 flex flex-col justify-between select-none font-sans text-sm relative">
        
        {/* INTERACTIVE LOCK SCREEN OVERLAY WITH SPECIFIC DEVICE SPLASH THEME */}
        <AnimatePresence>
          {isLocked && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 pt-17 bg-[#07080b]/98 z-50 flex flex-col justify-between items-center py-16 px-6"
            >
              <div className="text-center space-y-2 mt-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-mono">Simulated Sandbox</span>
                <h1 className="text-xl font-serif text-white tracking-wider font-bold">{currentTheme.title.toUpperCase()}</h1>
                <p className="text-[11px] text-gray-500 px-3 leading-relaxed">{currentTheme.splashLabel}</p>
              </div>

              {/* Biometrics face scan trigger animation */}
              <div className="flex flex-col items-center space-y-6">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-gold-500/20"
                  />
                  {isScanning ? (
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                      className="absolute inset-2 rounded-full bg-gold-500/10 border border-gold-500/40 flex items-center justify-center"
                    >
                      <Shield className="w-8 h-8 text-gold-400 animate-pulse" />
                    </motion.div>
                  ) : (
                    <button 
                      onClick={handleManualBiometricTrigger}
                      className="w-16 h-16 bg-[#161720] border border-gold-500/30 rounded-full flex items-center justify-center text-gold-400 hover:text-white transition-all cursor-pointer"
                    >
                      <Shield className="w-6 h-6" />
                    </button>
                  )}
                </div>

                <div className="text-center space-y-1">
                  <p className="text-[11px] font-semibold text-white">
                    {scanStatus === "scanning" ? "Initializing Biometrics..." : "Secured with Flutter Local-Auth"}
                  </p>
                  <button 
                    onClick={handleManualBiometricTrigger}
                    className="text-[10px] text-gold-400 underline font-mono tracking-wide"
                  >
                    Simulate Fingerprint Unlock
                  </button>
                </div>
              </div>

              <div className="text-center text-[10px] text-gray-600">
                MVVM with Provider, BLoC components & offline databases.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTAINER FOR ACTIVE DEMO VIEW PANELS */}
        <div className="flex-1 overflow-y-auto bg-[#07080c] relative">
          
          {/* ======================= APP 1: MOBICOM ======================= */}
          {selectedProjectId === "mobicom" && (
            <div className="p-3.5 space-y-4">
              
              {/* Internal header */}
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[9px] font-mono font-bold text-gold-400 uppercase tracking-widest block">Reciprocal Portal</span>
                  <h3 className="text-sm font-serif font-semibold text-white">mobicom Reserve</h3>
                </div>
                <Radio className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
              </div>

              {/* Navigation Options inside app */}
              <div className="flex bg-[#121319] p-1 rounded-xl gap-1 text-[11px] font-mono">
                <button 
                  onClick={() => setActiveTab("home")} 
                  className={`flex-1 py-1.5 rounded-lg text-center ${activeTab === "home" ? "bg-gold-500 text-black font-semibold" : "text-gray-400"}`}
                >
                  Clubs
                </button>
                <button 
                  onClick={() => setActiveTab("booking")} 
                  className={`flex-1 py-1.5 rounded-lg text-center ${activeTab === "booking" ? "bg-gold-500 text-black font-semibold" : "text-gray-400"}`}
                >
                  Reserve
                </button>
                <button 
                  onClick={() => setActiveTab("chat")} 
                  className={`flex-1 py-1.5 rounded-lg text-center ${activeTab === "chat" ? "bg-gold-500 text-black font-semibold" : "text-gray-400"}`}
                >
                  WSS Chat
                </button>
              </div>

              {/* MOBICOM VIEW 1: HOME CLUBS */}
              {activeTab === "home" && (
                <div className="space-y-3">
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Select Reciprocal Target:</div>
                  <div className="space-y-3">
                    {MOCK_CLUBS.map(club => (
                      <div 
                        key={club.id}
                        onClick={() => {
                          setSelectedClub(club);
                          setActiveTab("booking");
                          setBookingStep("form");
                        }}
                        className="bg-[#0f1016] border border-[#1b1c28] rounded-xl overflow-hidden hover:border-gold-400/40 transition-colors cursor-pointer"
                      >
                        <div className="h-20 w-full overflow-hidden relative">
                          <img src={club.image} alt={club.name} className="w-full h-full object-cover" />
                          <span className="absolute top-2 right-2 text-[8px] bg-gold-400 text-black px-1.5 py-0.5 rounded font-mono font-bold uppercase">{club.type}</span>
                        </div>
                        <div className="p-2.5 flex justify-between items-center bg-[#0d0e14]">
                          <div>
                            <h4 className="text-xs font-bold text-white leading-tight">{club.name}</h4>
                            <p className="text-[10px] text-gray-500">{club.location}</p>
                          </div>
                          <span className="text-[10px] text-gold-300 font-mono">★ {club.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MOBICOM VIEW 2: STRIPE ACCREDITED PAYMENTS */}
              {activeTab === "booking" && (
                <div className="space-y-3">
                  <div className="bg-[#12131b] p-3 rounded-xl border border-gold-400/15 flex space-x-2 items-center">
                    <img src={selectedClub.image} alt="Dest" className="w-10 h-10 object-cover rounded-lg" />
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{selectedClub.name}</h4>
                      <p className="text-[9px] text-gold-400 font-mono">VIP Allocation Check: OK</p>
                    </div>
                  </div>

                  {bookingStep === "form" && (
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[9px] text-gray-500 uppercase font-mono">Reservation Date</label>
                        <input 
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full bg-[#111219] border border-gray-900 rounded-lg p-2 text-xs text-white outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] text-gray-500 uppercase font-mono">Guests Allowed</label>
                        <select
                          value={bookingGuests}
                          onChange={(e) => setBookingGuests(Number(e.target.value))}
                          className="w-full bg-[#111219] border border-gray-900 rounded-lg p-2 text-xs text-white outline-none"
                        >
                          <option value="1">1 Person (Private Pass)</option>
                          <option value="2">2 People (Member + 1)</option>
                          <option value="4">4 People (Business dinner)</option>
                        </select>
                      </div>

                      <button 
                        onClick={() => setBookingStep("stripe")}
                        className="w-full py-2.5 rounded-xl bg-gold-500 text-black font-bold text-xs cursor-pointer text-center mt-2"
                      >
                        Proceed to Stripe Gate
                      </button>
                    </div>
                  )}

                  {bookingStep === "stripe" && (
                    <div className="space-y-3">
                      <div className="bg-indigo-950/20 px-2 py-1.5 rounded border border-indigo-500/20 text-indigo-400 text-[9px] font-mono flex justify-between">
                        <span>STRIPE INTEGRATION</span>
                        <span className="animate-pulse">● SECURED</span>
                      </div>

                      <div className="bg-[#161720] border border-[#252835] rounded-xl p-3 space-y-2.5">
                        <div className="space-y-1">
                          <label className="text-[8px] text-gray-500 uppercase font-mono">Visa Card Number</label>
                          <input 
                            type="text"
                            placeholder="4242 4242 •••• 4242"
                            value={cardNumber}
                            onChange={(e) => {
                              setCardNumber(e.target.value);
                              setIsCreditCardValid(e.target.value.length > 5);
                            }}
                            className="bg-transparent border-b border-gray-700 text-xs font-mono text-white outline-none w-full pb-1"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input 
                            type="text" 
                            placeholder="12/30" 
                            className="bg-transparent border-b border-gray-700 text-xs font-mono text-white outline-none w-full pb-1"
                          />
                          <input 
                            type="password" 
                            placeholder="CVC" 
                            className="bg-transparent border-b border-gray-700 text-xs font-mono text-white outline-none w-full pb-1"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <button 
                          onClick={() => {
                            setCardNumber("4242 4242 4242 4242");
                            setIsCreditCardValid(true);
                          }}
                          className="bg-gold-500/10 border border-gold-500/20 text-gold-300 py-1.5 rounded-lg"
                        >
                          Autofill Card
                        </button>
                        <button 
                          onClick={() => setBookingStep("form")}
                          className="bg-gray-800 text-gray-400 py-1.5 rounded-lg"
                        >
                          Back
                        </button>
                      </div>

                      <button 
                        disabled={!isCreditCardValid}
                        onClick={handleMobicomPayStep}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs cursor-pointer ${isCreditCardValid ? "bg-emerald-500 text-black" : "bg-gray-800 text-gray-500"}`}
                      >
                        Authorize Stripe Checkout
                      </button>
                    </div>
                  )}

                  {bookingStep === "confirming" && (
                    <div className="text-center py-6 space-y-3 animate-pulse">
                      <RefreshCw className="w-8 h-8 text-gold-400 animate-spin mx-auto" />
                      <p className="text-xs text-gray-400">Verifying and processing payment states under Provider ChangeNotifier hooks...</p>
                    </div>
                  )}

                  {bookingStep === "success" && (
                    <div className="text-center py-4 space-y-3">
                      <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <h4 className="text-xs font-bold text-white">Stripe Payment Approved!</h4>
                      <p className="text-[11px] text-gray-500 px-3">Your private pass has been generated. Simulated FCM notification sent.</p>
                      <button 
                        onClick={() => setBookingStep("form")} 
                        className="text-[10px] text-gold-400 underline font-mono"
                      >
                        Reset Booking Mode
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* MOBICOM VIEW 3: WEBSOCKET MESSAGING */}
              {activeTab === "chat" && (
                <div className="flex flex-col h-72 bg-[#0a0a0f] border border-[#1b1c2b] rounded-xl overflow-hidden text-xs">
                  <div className="bg-[#111219] p-2 flex justify-between border-b border-[#20212f] text-[9px] font-mono">
                    <span className="text-emerald-400">WSS ONLINE</span>
                    <span className="text-gray-500">RTT: {wsLatency}ms</span>
                  </div>
                  <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                    {wsMessages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`p-2 rounded-xl max-w-[85%] leading-tight ${msg.sender === "user" ? "bg-gold-500 text-black font-semibold" : "bg-[#161720] text-gray-300 border border-gray-800"}`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-1.5 bg-[#0e0f14] border-t border-[#1e202d] flex space-x-1">
                    <input 
                      type="text" 
                      value={inputMsg}
                      onChange={(e) => setInputMsg(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleChatTrigger()}
                      placeholder="Ask virtual secretary..."
                      className="bg-[#181a25] border border-gray-900 rounded-lg p-1.5 text-white flex-1 outline-none text-[11px]"
                    />
                    <button 
                      onClick={handleChatTrigger}
                      className="bg-gold-500 hover:bg-gold-400 text-black p-1.5 rounded-lg"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================= APP 2: WEARE FRESH ======================= */}
          {selectedProjectId === "fresh" && (
            <div className="p-3.5 space-y-4 animate-fadeIn">
              
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">Butcher &amp; Seafood Marketplace</span>
                  <h3 className="text-sm font-serif font-semibold text-white">WeAre Fresh</h3>
                </div>
                <ShoppingCart className="w-4 h-4 text-emerald-400" />
              </div>

              {/* Navigation Options */}
              <div className="flex bg-[#0f1511] p-1 rounded-xl gap-1 text-[11px] font-mono border border-emerald-500/10">
                <button 
                  onClick={() => setActiveTab("home")} 
                  className={`flex-1 py-1.5 rounded-lg text-center ${activeTab === "home" ? "bg-emerald-500 text-black font-semibold" : "text-gray-400"}`}
                >
                  Meats
                </button>
                <button 
                  onClick={() => setActiveTab("cart")} 
                  className={`flex-1 py-1.5 rounded-lg text-center relative ${activeTab === "cart" ? "bg-emerald-500 text-black font-semibold" : "text-gray-400"}`}
                >
                  Cart
                  {getSubtotal() > 0 && (
                    <span className="absolute -top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full" />
                  )}
                </button>
                <button 
                  onClick={() => setActiveTab("chat")} 
                  className={`flex-1 py-1.5 rounded-lg text-center ${activeTab === "chat" ? "bg-emerald-500 text-black font-semibold" : "text-gray-400"}`}
                >
                  BLoC Chat
                </button>
              </div>

              {/* WEARE FRESH VIEW 1: CATALOGUE */}
              {activeTab === "home" && (
                <div className="space-y-3">
                  <div className="text-[10px] font-mono text-gray-500 uppercase">Premium Protein Cuts:</div>
                  <div className="space-y-2.5">
                    {FRESH_PRODUCTS.map(prod => (
                      <div key={prod.id} className="bg-[#0c120e] p-2.5 rounded-xl border border-emerald-500/10 flex space-x-3 items-center">
                        <img src={prod.image} alt={prod.name} className="w-12 h-12 object-cover rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-white truncate">{prod.name}</h4>
                          <p className="text-[10px] text-gray-500">{prod.category} &bull; {prod.weight}</p>
                          <p className="text-xs text-emerald-400 font-semibold font-mono mt-0.5">${prod.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2 bg-[#121a15] rounded-lg p-1 border border-emerald-500/20">
                          <button onClick={() => decrementProduct(prod.id)} className="text-emerald-400 font-bold px-1.5 text-xs select-none">-</button>
                          <span className="text-xs text-white font-mono font-bold w-3 text-center">{cartCount[prod.id] || 0}</span>
                          <button onClick={() => incrementProduct(prod.id)} className="text-emerald-400 font-bold px-1.5 text-xs select-none">+</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#0f1411] p-3 rounded-xl border border-dashed border-emerald-500/20 text-[10px] text-gray-400 leading-relaxed">
                    <strong>Local SQLite Cache Engine:</strong> This inventory pricing and weight coordinates state scales from a locally serialized SQLite representation, allowing swift offline load speeds on Android/iOS.
                  </div>
                </div>
              )}

              {/* WEARE FRESH VIEW 2: CART & RAZORPAY SECURITY */}
              {activeTab === "cart" && (
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-white">Cart Allocation Checkout</h4>
                  
                  {getSubtotal() === 0 ? (
                    <div className="text-center py-10 text-gray-500 text-xs">
                      Shopping cart is empty. Please select premium cuts in the category catalog.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-[#0a0f0c] p-3 rounded-xl border border-emerald-500/10 space-y-1 text-xs">
                        {Object.keys(cartCount).map((id) => {
                          const count = cartCount[id] || 0;
                          if (count === 0) return null;
                          const prod = FRESH_PRODUCTS.find(p => p.id === id);
                          if (!prod) return null;
                          return (
                            <div key={id} className="flex justify-between text-[11px]">
                              <span className="text-gray-400">{prod.name} (x{count})</span>
                              <span className="text-white font-mono font-bold">${(prod.price * count).toFixed(2)}</span>
                            </div>
                          );
                        })}
                        <div className="border-t border-gray-900 pt-1.5 mt-2 flex justify-between text-xs font-bold text-white font-mono">
                          <span>Subtotal:</span>
                          <span className="text-emerald-400">${getSubtotal().toFixed(2)}</span>
                        </div>
                      </div>

                      {checkoutStep === "idle" && (
                        <button 
                          onClick={triggerRazorpayPayment}
                          className="w-full py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs"
                        >
                          Checkout with Razorpay Gate
                        </button>
                      )}

                      {checkoutStep === "razorpay" && (
                        <div className="bg-[#121915] rounded-xl border border-[#233527] p-3 space-y-2.5">
                          <div className="bg-emerald-950/40 p-2 rounded border border-emerald-500/20 text-emerald-400 text-[10px] font-mono flex justify-between">
                            <span>RAZORPAY DIGITAL CHECKOUT</span>
                            <span>SECURE</span>
                          </div>
                          <p className="text-[11px] text-gray-400">Merchant Code: <strong>WeAreFresh Corp</strong></p>
                          <div className="bg-[#0b100d] p-2 rounded text-center text-xs font-mono font-bold text-white">
                            Total: ${getSubtotal().toFixed(2)}
                          </div>
                          <button 
                            onClick={handleRazorpayVerify}
                            className="w-full py-2 bg-emerald-400 text-black rounded-lg font-bold text-xs"
                          >
                            Authorize Razorpay Tokenization
                          </button>
                        </div>
                      )}

                      {checkoutStep === "processing" && (
                        <div className="text-center py-6 space-y-3 animate-pulse">
                          <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
                          <p className="text-xs text-gray-400">Tokenizing callback streams under BLoC event triggers...</p>
                        </div>
                      )}

                      {checkoutStep === "success" && (
                        <div className="text-center py-4 space-y-2">
                          <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                            <CheckCircle className="w-6 h-6" />
                          </div>
                          <h4 className="text-xs font-bold text-white">Razorpay Order Placed!</h4>
                          <p className="text-[10px] text-gray-500">Callback verification returned successfully. Push notification processed.</p>
                          <button 
                            onClick={() => setCheckoutStep("idle")} 
                            className="text-[10px] text-emerald-400 underline font-mono"
                          >
                            Go to Shopping Catalogue
                          </button>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              )}

              {/* CHAT TAB REPLICATING LOCAL BLOC FEED */}
              {activeTab === "chat" && (
                <div className="flex flex-col h-72 bg-[#080c09] border border-emerald-500/10 rounded-xl overflow-hidden text-xs">
                  <div className="bg-[#0e1610] p-2 flex justify-between border-b border-emerald-500/10 text-[9px] font-mono">
                    <span className="text-emerald-400">BLOC STREAM SECURED</span>
                    <span className="text-gray-500">STATE: IDLE</span>
                  </div>
                  <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                    {wsMessages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`p-2 rounded-xl max-w-[85%] leading-tight ${msg.sender === "user" ? "bg-emerald-500 text-black font-semibold" : "bg-[#111c14] text-gray-300 border border-emerald-950"}`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-1.5 bg-[#0a100c] border-t border-emerald-950 flex space-x-1">
                    <input 
                      type="text" 
                      value={inputMsg}
                      onChange={(e) => setInputMsg(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleChatTrigger()}
                      placeholder="Ask BLoC support chat..."
                      className="bg-[#121a15] border border-emerald-950 rounded-lg p-1.5 text-white flex-1 outline-none text-[11px]"
                    />
                    <button 
                      onClick={handleChatTrigger}
                      className="bg-emerald-500 hover:bg-emerald-400 text-black p-1.5 rounded-lg"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================= APP 3: ELANADU DAILY ======================= */}
          {selectedProjectId === "milk" && (
            <div className="p-3.5 space-y-4 animate-fadeIn">
              
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">Dairy &amp; Milk Subscriptions</span>
                  <h3 className="text-sm font-serif font-semibold text-white">Elanadu Daily</h3>
                </div>
                <Calendar className="w-4 h-4 text-cyan-400" />
              </div>

              {/* Navigation Options */}
              <div className="flex bg-[#070e14] p-1 rounded-xl gap-1 text-[11px] font-mono border border-cyan-500/10">
                <button 
                  onClick={() => setActiveTab("home")} 
                  className={`flex-1 py-1.5 rounded-lg text-center ${activeTab === "home" ? "bg-cyan-500 text-black font-semibold" : "text-gray-400"}`}
                >
                  Subscription
                </button>
                <button 
                  onClick={() => setActiveTab("calendar")} 
                  className={`flex-1 py-1.5 rounded-lg text-center ${activeTab === "calendar" ? "bg-cyan-500 text-black font-semibold" : "text-gray-400"}`}
                >
                  Calendar
                </button>
                <button 
                  onClick={() => setActiveTab("wallet")} 
                  className={`flex-1 py-1.5 rounded-lg text-center ${activeTab === "wallet" ? "bg-cyan-500 text-black font-semibold" : "text-gray-400"}`}
                >
                  Wallet (Razor)
                </button>
              </div>

              {/* ELANADU DAILY VIEW 1: SUBSCRIPTION LIST */}
              {activeTab === "home" && (
                <div className="space-y-3">
                  <div className="text-[10px] font-mono text-gray-500 uppercase">Subscription Products:</div>
                  <div className="space-y-2.5">
                    {MILK_PRODUCTS.map(prod => (
                      <div key={prod.id} className="bg-[#0b131a] p-2.5 rounded-xl border border-cyan-500/10 flex space-x-3 items-center">
                        <img src={prod.image} alt={prod.name} className="w-12 h-12 object-cover rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-white truncate">{prod.name}</h4>
                          <p className="text-[9px] text-gray-500">${prod.pricePerHour.toFixed(2)} per {prod.unit}</p>
                          <span className="text-[8px] bg-cyan-950 text-cyan-300 font-mono border border-cyan-800 rounded px-1.5 py-0.5 mt-1 inline-block">
                            {activeSubscriptions.includes(prod.id) ? "● Active Daily Sub" : "○ Sub Cancelled"}
                          </span>
                        </div>
                        <button 
                          onClick={() => {
                            if (activeSubscriptions.includes(prod.id)) {
                              setActiveSubscriptions(prev => prev.filter(x => x !== prod.id));
                            } else {
                              setActiveSubscriptions(prev => [...prev, prod.id]);
                            }
                          }}
                          className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg cursor-pointer ${
                            activeSubscriptions.includes(prod.id) ? "bg-red-950 text-red-400 border border-red-900/40" : "bg-cyan-500 text-black"
                          }`}
                        >
                          {activeSubscriptions.includes(prod.id) ? "Cancel" : "Subscribe"}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#0c131a] p-3 rounded-xl border border-dashed border-cyan-500/15 text-[10px] text-gray-400 leading-relaxed space-y-1">
                    <span className="font-semibold text-white block">Recurring BLoC Calendars</span>
                    <p>Designed in Flutter, each alternate-day or custom-schedule subscription triggers async BLoC cycles that compute correct billing payloads dynamically on Android/iOS.</p>
                  </div>
                </div>
              )}

              {/* ELANADU DAILY VIEW 2: SCHEDULER CALENDAR */}
              {activeTab === "calendar" && (
                <div className="p-1 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">Delivery Days Outlook</span>
                    <span className="text-[10px] font-mono text-cyan-400 font-semibold">[June 2026]</span>
                  </div>

                  {/* Frequency Toggle */}
                  <div className="grid grid-cols-3 gap-1 bg-[#090e14] p-1 rounded-lg border border-cyan-900/30 text-[10px] font-mono text-center">
                    {["daily", "alternate", "weekend"].map((freq) => (
                      <button 
                        key={freq}
                        onClick={() => setScheduledFrequency(freq)}
                        className={`py-1 rounded capitalize ${scheduledFrequency === freq ? "bg-cyan-500 text-black font-semibold" : "text-gray-500"}`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>

                  {/* Simulated Calendars Grid */}
                  <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px]">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, idx) => (
                      <span key={idx} className="text-gray-600 font-bold">{d}</span>
                    ))}
                    {Array.from({ length: 28 }).map((_, idx) => {
                      const dayNum = idx + 1;
                      let isScheduled = false;
                      if (scheduledFrequency === "daily") isScheduled = true;
                      else if (scheduledFrequency === "alternate") isScheduled = dayNum % 2 === 0;
                      else if (scheduledFrequency === "weekend") isScheduled = dayNum % 7 === 6 || dayNum % 7 === 0;

                      return (
                        <div 
                          key={idx} 
                          className={`p-1.5 rounded-md font-semibold transition-colors ${
                            isScheduled 
                              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold" 
                              : "bg-[#0c0d12] text-gray-700"
                          }`}
                        >
                          {dayNum}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ELANADU DAILY VIEW 3: WALLET RECHARGE WITH RAZORPAY */}
              {activeTab === "wallet" && (
                <div className="space-y-3">
                  <div className="bg-[#0b131a] p-3 rounded-xl border border-cyan-500/10 space-y-1 text-center">
                    <span className="text-[10px] text-gray-500 font-mono block">Prepaid Balance Wallet</span>
                    <span className="text-2xl font-bold font-mono text-cyan-400">${walletBalance.toFixed(2)}</span>
                    <p className="text-[10px] text-gray-500">Auto-deductions are calculated at 5:00 AM on scheduled days.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] text-gray-500 uppercase font-mono">Select Top-up Allocation:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[10, 25, 50].map(amt => (
                        <button 
                          key={amt}
                          onClick={() => {
                            setWalletBalance(prev => prev + amt);
                            alert(`Simulated Razorpay webhook trigger: Top-up of $${amt} successful!`);
                          }}
                          className="bg-[#121c27] text-cyan-300 border border-cyan-500/20 py-2.5 rounded-lg text-xs font-mono font-semibold"
                        >
                          +${amt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================= APP 4: HSE CHAMP ======================= */}
          {selectedProjectId === "quiz" && (
            <div className="p-3.5 space-y-4 animate-fadeIn">
              
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[9px] font-mono font-bold text-orange-400 uppercase tracking-widest block">Health &amp; Security EdTech</span>
                  <h3 className="text-sm font-serif font-semibold text-white">HSE Champ Quiz</h3>
                </div>
                <Award className="w-5 h-5 text-orange-400" />
              </div>

              {/* Navigation Options */}
              <div className="flex bg-[#140e08] p-1 rounded-xl gap-1 text-[11px] font-mono border border-orange-500/10">
                <button 
                  onClick={() => setActiveTab("home")} 
                  className={`flex-1 py-1.5 rounded-lg text-center ${activeTab === "home" ? "bg-orange-500 text-white font-semibold animate-pulse" : "text-gray-400"}`}
                >
                  Duel Quiz
                </button>
                <button 
                  onClick={() => setActiveTab("leaderboard")} 
                  className={`flex-1 py-1.5 rounded-lg text-center ${activeTab === "leaderboard" ? "bg-orange-500 text-white font-semibold" : "text-gray-400"}`}
                >
                  Top Leaders
                </button>
                <button 
                  onClick={() => setActiveTab("profile")} 
                  className={`flex-1 py-1.5 rounded-lg text-center ${activeTab === "profile" ? "bg-orange-500 text-white font-semibold" : "text-gray-400"}`}
                >
                  Engine Info
                </button>
              </div>

              {/* HSE CHAMP VIEW 1: QUIZ GAMEPLAY */}
              {activeTab === "home" && (
                <div className="space-y-4">
                  {quizComplete ? (
                    <div className="text-center py-6 space-y-4 animate-scaleUp">
                      <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/30 rounded-full flex items-center justify-center text-orange-400 mx-auto">
                        <Award className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white">Quiz Duel Complete!</h4>
                        <p className="text-xs text-gray-400">Total Score: <span className="font-mono text-orange-400 font-bold text-sm">{quizScore} pts</span></p>
                      </div>
                      <div className="bg-[#121010]/60 p-2.5 rounded-lg border border-dashed border-orange-500/10 text-[9px] font-mono text-orange-300">
                        [FIREBASE] Realtime DB sync triggered: SUCCESS
                      </div>
                      <button 
                        onClick={resetQuiz}
                        className="bg-orange-500 text-white font-bold p-2 text-xs rounded-xl w-full"
                      >
                        Compete Again
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                        <span>Question {currentQuestionIdx + 1} of {SAFETY_QUESTIONS.length}</span>
                        <span>Streak Score: <strong className="text-orange-400">{quizScore} pts</strong></span>
                      </div>

                      {/* Question card */}
                      <div className="bg-[#100e0b] border border-orange-500/15 p-4 rounded-xl text-xs text-white leading-relaxed font-semibold">
                        {SAFETY_QUESTIONS[currentQuestionIdx].question}
                      </div>

                      {/* Options stack */}
                      <div className="space-y-2">
                        {SAFETY_QUESTIONS[currentQuestionIdx].options.map((opt, optIdx) => {
                          const isSelected = selectedAnsIdx === optIdx;
                          const correctAns = SAFETY_QUESTIONS[currentQuestionIdx].correctAnswer;
                          const isCorrect = optIdx === correctAns;

                          let optionStyle = "bg-[#0b0c10] border-gray-900 text-gray-300";
                          if (selectedAnsIdx !== null) {
                            if (isCorrect) optionStyle = "bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-bold";
                            else if (isSelected) optionStyle = "bg-rose-950/40 border-rose-500/50 text-rose-300";
                          }

                          return (
                            <button 
                              key={optIdx}
                              disabled={selectedAnsIdx !== null}
                              onClick={() => handleSelectQuizOption(optIdx)}
                              className={`w-full p-2.5 rounded-xl border text-left text-xs transition-colors cursor-pointer ${optionStyle}`}
                            >
                              <div className="flex items-center space-x-2.5">
                                <span className="font-mono text-[10px] bg-gray-900 border text-gray-500 w-4 h-4 rounded flex items-center justify-center font-bold">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span className="flex-1 leading-tight">{opt}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {selectedAnsIdx !== null && (
                        <div className="bg-emerald-950/10 border border-emerald-500/10 p-3 rounded-lg text-[10px] text-emerald-400/90 leading-relaxed">
                          <strong>Explanatory Tip:</strong> {SAFETY_QUESTIONS[currentQuestionIdx].tip}
                        </div>
                      )}

                      {selectedAnsIdx !== null && (
                        <button 
                          onClick={handleNextQuiz}
                          className="w-full bg-[#18120b] hover:bg-[#251b11] text-orange-400 border border-orange-500/20 font-mono py-2 rounded-xl text-xs"
                        >
                          Next Challenge Card &rarr;
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* HSE CHAMP VIEW 2: LEADERBOARD FEEDS */}
              {activeTab === "leaderboard" && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="text-[10px] font-mono text-gray-500 uppercase">Live Regional Safety Champions:</div>
                  <div className="space-y-2">
                    {[
                      { name: "Siddharth N", score: 2450, rank: 1, flag: "🥇" },
                      { name: "Priya Krishna (You)", score: 1800, rank: 2, flag: "🥈" },
                      { name: "Aventis Engineer 04", score: 1200, rank: 3, flag: "🥉" }
                    ].map((leader, i) => (
                      <div key={i} className="bg-[#0a0a0d] p-2.5 rounded-xl border border-gray-900 flex justify-between items-center">
                        <div className="flex items-center space-x-2 text-xs">
                          <span className="text-sm">{leader.flag}</span>
                          <span className="font-semibold text-white">{leader.name}</span>
                        </div>
                        <span className="font-mono text-xs text-orange-400 font-bold">{leader.score} pts</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* HSE CHAMP VIEW 3: SYSTEM PERFORMANCES */}
              {activeTab === "profile" && (
                <div className="p-1 space-y-3">
                  <h4 className="text-xs font-semibold text-white">Isar + Firebase Architecture</h4>
                  <div className="bg-[#0b100d] p-3 rounded-xl border border-dashed border-orange-500/15 text-[10px] text-gray-400 leading-relaxed space-y-1.5">
                    <p>
                      <strong>Firebase Realtime Session Synch:</strong> Drives multiplayer lobbies and immediately logs user performance telemetry.
                    </p>
                    <p>
                      <strong>Isar Local DB Caching:</strong> Locally indexes up to 5,000 corporate hazard trivia questions on device, guaranteeing zero network freeze states during audits.
                    </p>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================= APP 5: MIRACLE MEDITATION ======================= */}
          {selectedProjectId === "meditation" && (
            <div className="p-3.5 space-y-4 animate-fadeIn">
              
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[9px] font-mono font-bold text-violet-400 uppercase tracking-widest block">Wellness &amp; Meditative Serb</span>
                  <h3 className="text-sm font-serif font-semibold text-white">Miracle Meditation</h3>
                </div>
                <Compass className="w-5 h-5 text-violet-400 animate-spin-slow" />
              </div>

              {/* Navigation Options */}
              <div className="flex bg-[#0f0a14] p-1 rounded-xl gap-1 text-[11px] font-mono border border-violet-500/10">
                <button 
                  onClick={() => setActiveTab("home")} 
                  className={`flex-1 py-1.5 rounded-lg text-center ${activeTab === "home" ? "bg-violet-600 text-white font-semibold" : "text-gray-400"}`}
                >
                  Breathe
                </button>
                <button 
                  onClick={() => setActiveTab("tracks")} 
                  className={`flex-1 py-1.5 rounded-lg text-center ${activeTab === "tracks" ? "bg-violet-600 text-white font-semibold" : "text-gray-400"}`}
                >
                  Tracks
                </button>
                <button 
                  onClick={() => setActiveTab("profile")} 
                  className={`flex-1 py-1.5 rounded-lg text-center ${activeTab === "profile" ? "bg-violet-600 text-white font-semibold" : "text-gray-400"}`}
                >
                  Alarms
                </button>
              </div>

              {/* MIRACLE MEDITATION VIEW 1: BREATHING SIMULATOR */}
              {activeTab === "home" && (
                <div className="flex flex-col items-center justify-center py-6 space-y-6">
                  
                  {/* Concentric Breathing bubble layout */}
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    
                    {/* Ring 1 - Outer Pulsation */}
                    <motion.div 
                      animate={{
                        scale: isBreathingActive 
                          ? (breathingPhase === "Inhale" ? 1.4 : breathingPhase === "Hold" ? 1.4 : 0.8)
                          : 1
                      }}
                      transition={{ duration: 4, ease: "easeInOut" }}
                      className="absolute inset-0 bg-violet-500/10 rounded-full border border-violet-500/20"
                    />

                    {/* Ring 2 - Inner circle */}
                    <motion.div 
                      animate={{
                        scale: isBreathingActive 
                          ? (breathingPhase === "Inhale" ? 1.2 : breathingPhase === "Hold" ? 1.2 : 0.9)
                          : 1,
                        backgroundColor: breathingPhase === "Hold" ? "rgba(139, 92, 246, 0.2)" : "rgba(139, 92, 246, 0.08)"
                      }}
                      transition={{ duration: 4, ease: "easeInOut" }}
                      className="absolute inset-4 rounded-full border border-violet-500/30 flex flex-col items-center justify-center space-y-1"
                    >
                      <span className="text-[10px] font-mono uppercase text-violet-400 tracking-wider">
                        {isBreathingActive ? breathingPhase : "Stream"}
                      </span>
                      <span className="text-xl font-bold font-mono text-white">
                        {isBreathingActive ? `${breathTimer}s` : "0:00"}
                      </span>
                    </motion.div>

                  </div>

                  <div className="text-center space-y-1 max-w-[240px]">
                    <h4 className="text-xs font-semibold text-white">Diaphragmatic Serene Loop</h4>
                    <p className="text-[10px] text-gray-500">
                      Supports lung volume expansion using standard 4-4-4 holding rules. Perfect for anxiety relief.
                    </p>
                  </div>

                  <button 
                    onClick={() => {
                      setIsBreathingActive(!isBreathingActive);
                      setBookingStep("form");
                    }}
                    className={`w-full py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                      isBreathingActive ? "bg-red-950 text-red-400 border border-red-900/40" : "bg-violet-600 text-white"
                    }`}
                  >
                    {isBreathingActive ? "Stop serenade" : "Start Serenity Breathing"}
                  </button>

                </div>
              )}

              {/* MIRACLE MEDITATION VIEW 2: SOUND LISTS */}
              {activeTab === "tracks" && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="text-[10px] font-mono text-gray-500 uppercase">Peaceful Ambient soundscapes:</div>
                  <div className="space-y-2">
                    {MEDITATION_TRACKS.map(track => (
                      <div 
                        key={track.id}
                        onClick={() => setActiveMediaTrack(track.id)}
                        className={`p-2.5 rounded-xl border transition-colors cursor-pointer flex justify-between items-center ${
                          activeMediaTrack === track.id 
                            ? "bg-violet-950/20 border-violet-500/40 text-violet-300" 
                            : "bg-[#0b0c10] border-gray-900 text-gray-400"
                        }`}
                      >
                        <div>
                          <h4 className="text-xs font-semibold text-white">{track.title}</h4>
                          <span className="text-[10px] text-gray-500">{track.category} &bull; {track.duration}</span>
                        </div>
                        {activeMediaTrack === track.id ? (
                          <Radio className="w-4 h-4 text-violet-400 animate-pulse" />
                        ) : (
                          <Play className="w-3.5 h-3.5 text-gray-600" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MIRACLE MEDITATION VIEW 3: DAILY REMINDERS */}
              {activeTab === "profile" && (
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-white">FCM Morning Alarm prompts</h4>
                  <div className="bg-[#0b100d] p-3 rounded-xl border border-dashed border-violet-500/15 text-[10px] text-gray-400 leading-relaxed space-y-1.5">
                    <p>
                      <strong>Local Alarm Registrars:</strong> Alarms are securely registered under native iOS/Android schedules, triggering responsive FCM wake-up channels.
                    </p>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================= APP 6: FIZZMO ======================= */}
          {selectedProjectId === "fizzmo" && (
            <div className="p-3.5 space-y-4 animate-fadeIn">
              
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[9px] font-mono font-bold text-rose-400 uppercase tracking-widest block">EdTech Emotional Intelligence</span>
                  <h3 className="text-sm font-serif font-semibold text-white">FIZZMO Kids EQ</h3>
                </div>
                <Smile className="w-5 h-5 text-rose-400 animate-bounce" />
              </div>

              {/* Navigation Options */}
              <div className="flex bg-[#140a0f] p-1 rounded-xl gap-1 text-[11px] font-mono border border-rose-500/10">
                <button 
                  onClick={() => setActiveTab("home")} 
                  className={`flex-1 py-1.5 rounded-lg text-center ${activeTab === "home" ? "bg-rose-500 text-white font-semibold" : "text-gray-400"}`}
                >
                  Emoji Play
                </button>
                <button 
                  onClick={() => setActiveTab("parent")} 
                  className={`flex-1 py-1.5 rounded-lg text-center ${activeTab === "parent" ? "bg-rose-500 text-white font-semibold" : "text-gray-400"}`}
                >
                  Parent Portal
                </button>
              </div>

              {/* FIZZMO VIEW 1: EMOJI KIDS CHECKIN */}
              {activeTab === "home" && (
                <div className="space-y-3 text-center py-2">
                  <h4 className="text-xs text-rose-300 font-semibold">How do you feel today, Champion?</h4>
                  
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {[
                      { icon: "😊", label: "Happy", color: "bg-amber-400" },
                      { icon: "😢", label: "Melancholic", color: "bg-blue-400" },
                      { icon: "😠", label: "Frustrated", color: "bg-rose-400" }
                    ].map((em, idx) => (
                      <button 
                        key={idx}
                        onClick={() => {
                          setActiveEmotionCheck(em.label);
                          setFizzmoScoreCard(prev => ({ ...prev, empathy: prev.empathy + 5 }));
                        }}
                        className={`p-3 rounded-2xl flex flex-col items-center justify-center space-y-1.5 border transition-all cursor-pointer hover:scale-105 ${
                          activeEmotionCheck === em.label 
                            ? "bg-rose-500/20 border-rose-400/40" 
                            : "bg-[#0b0c10] border-gray-900"
                        }`}
                      >
                        <span className="text-2xl">{em.icon}</span>
                        <span className="text-[10px] font-medium text-gray-300">{em.label}</span>
                      </button>
                    ))}
                  </div>

                  {activeEmotionCheck && (
                    <div className="p-2.5 bg-rose-950/15 border border-rose-400/10 rounded-xl text-[10px] text-rose-300 leading-relaxed animate-scaleUp">
                      Awesome! Connecting is key. Parent notification dispatched securely &bull; Empathy score increased.
                    </div>
                  )}
                </div>
              )}

              {/* FIZZMO VIEW 2: PARENT TELEMETRY ANALYTICS */}
              {activeTab === "parent" && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">Parent Progress Monitors</span>
                    <span className="text-[9px] font-mono text-rose-400">[Active Tracker]</span>
                  </div>

                  {/* Progress lines */}
                  <div className="space-y-2 pb-2">
                    {[
                      { label: "Empathy / Care", value: fizzmoScoreCard.empathy, color: "bg-rose-500" },
                      { label: "Focus / Attention", value: fizzmoScoreCard.focus, color: "bg-amber-500" },
                      { label: "Mind Resilience", value: fizzmoScoreCard.resilience, color: "bg-emerald-500" }
                    ].map((met, i) => (
                      <div key={i} className="space-y-1 text-xs">
                        <div className="flex justify-between text-[11px] text-gray-400">
                          <span>{met.label}</span>
                          <span className="font-bold text-white">{met.value}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                          <div className={`h-full ${met.color}`} style={{ width: `${met.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#0b100d] p-3 rounded-xl border border-dashed border-rose-500/15 text-[10px] text-gray-400 leading-relaxed space-y-1.5">
                    <span className="text-white font-semibold block">StoreKit Subscription Hooks</span>
                    <p>Designed with Provider integration to unlock advanced children testing paths. Managed under safe local transaction verifiers.</p>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* BOTTOM SIMULATED PHONE NAV BAR (REPLICATES SYSTEM RE-TRIGGERS) */}
        <div className="h-14 bg-[#0a0b10] border-t border-[#1d1f29] px-4 flex items-center justify-around z-10 shrink-0 select-none">
          <button 
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center justify-center space-y-1.5 transition-colors cursor-pointer ${activeTab === "home" ? currentTheme.accentColor : "text-gray-500 hover:text-gray-400"}`}
          >
            <Compass className="w-4 h-4" />
            <span className="text-[9px] font-medium font-mono">Demos</span>
          </button>

          <button 
            onClick={() => setActiveTab("chat")}
            disabled={selectedProjectId !== "mobicom" && selectedProjectId !== "fresh"}
            className={`flex flex-col items-center justify-center space-y-1.5 transition-colors cursor-pointer ${
              selectedProjectId !== "mobicom" && selectedProjectId !== "fresh"
                ? "opacity-25 cursor-not-allowed"
                : activeTab === "chat" ? currentTheme.accentColor : "text-gray-500 hover:text-gray-400"
            }`}
          >
            <Send className="w-4 h-4" />
            <span className="text-[9px] font-medium font-mono">Realtime</span>
          </button>

          <button 
            onClick={() => setActiveTab("profile")}
            className={`flex flex-col items-center justify-center space-y-1.5 transition-colors cursor-pointer ${activeTab === "profile" ? currentTheme.accentColor : "text-gray-500"}`}
          >
            <Shield className="w-4 h-4" />
            <span className="text-[9px] font-medium font-mono">Secured</span>
          </button>
        </div>

        {/* Home Sweep Indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-700 rounded-full z-20"></div>

      </div>
    </div>
  );
}
