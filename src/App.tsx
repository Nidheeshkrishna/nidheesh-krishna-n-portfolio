import React, { useState, useEffect } from "react";
import { 
  Briefcase, Mail, Phone, Linkedin, MapPin, Sparkles, Code2, Cpu, 
  Terminal, ExternalLink, Compass, Star, ChevronRight, CheckCircle2, Award, ShoppingCart, Calendar, PlaySquare, Award as AwardIcon, Heart, ShieldAlert, Printer,
  MessageCircle, Send, FileDown, ChevronDown, Video, Laptop, CalendarRange, X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Sub-components
import ResumeTimeline from "./components/ResumeTimeline";
import GeminiBot from "./components/GeminiBot";

// Project Data source
import { PROJECTS_DATA } from "./projects";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 }
  }
};

export default function App() {
  const [activeFeature, setActiveFeature] = useState<"architecture" | "resume" | "copilot">("architecture");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("mobicom");
  const [whatsappMsg, setWhatsappMsg] = useState("Hi Nidheesh, I explored your creative Flutter portfolio and would love to connect for a professional collaboration!");
  const [isMeetMenuOpen, setIsMeetMenuOpen] = useState(false);

  // Email form states
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailSenderName, setEmailSenderName] = useState("");
  const [emailSenderAddress, setEmailSenderAddress] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isEmailSending, setIsEmailSending] = useState(false);

  // Auto print handler on page loading with print query parameter
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("print") === "true") {
        const timer = setTimeout(() => {
          window.print();
        }, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleDownloadCV = async () => {
    const now = new Date();
    const ts = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}${String(now.getSeconds()).padStart(2,'0')}`;
    const link = document.createElement("a");
    link.href = "/assets/Nidheesh_Krishna_CV.pdf";
    link.download = `Nidheesh_Krishna_CV_${ts}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSenderAddress || !emailMessage) return;

    setIsEmailSending(true);

    const formattedSubject = emailSubject ? emailSubject : `Collaboration Inquiry from ${emailSenderName || 'Visitor'}`;
    const formattedBody = `Contact Request details:\n\nName: ${emailSenderName || 'Not Specified'}\nEmail: ${emailSenderAddress}\n\nMessage:\n${emailMessage}\n\n---\nSent from Nidheesh's Cross-Platform Dev Portfolio`;
    
    const mailtoUrl = `mailto:nidheeshkrishnap@outlook.com?subject=${encodeURIComponent(formattedSubject)}&body=${encodeURIComponent(formattedBody)}`;
    
    // Open the local client
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setIsEmailSending(false);
      setIsEmailModalOpen(false);
      // Clean form
      setEmailSenderName("");
      setEmailSenderAddress("");
      setEmailSubject("");
      setEmailMessage("");
    }, 1000);
  };

  const currentProject = PROJECTS_DATA.find(p => p.id === selectedProjectId) || PROJECTS_DATA[0];

  const getCategoryIcon = (iconType: string) => {
    switch (iconType) {
      case "mobicom": return <Compass className="w-5 h-5 text-gold-400" />;
      case "fresh": return <ShoppingCart className="w-5 h-5 text-emerald-400" />;
      case "milk": return <Calendar className="w-5 h-5 text-cyan-400" />;
      case "quiz": return <AwardIcon className="w-5 h-5 text-orange-400" />;
      case "meditation": return <Heart className="w-5 h-5 text-violet-400 animate-pulse" />;
      case "fizzmo": return <Sparkles className="w-5 h-5 text-rose-400" />;
      case "equalplus": return <Printer className="w-5 h-5 text-amber-400" />;
      default: return <Code2 className="w-5 h-5 text-gold-400" />;
    }
  };


  return (
    <div className="min-h-screen bg-luxury-black text-gray-200 selection:bg-gold-500 selection:text-black relative overflow-hidden">
      
      <div className="no-print">
        {/* Immersive background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-gradient-to-b from-[#0b0c16] via-[#040509] to-[#020204]">
        {/* Glowing gradient mesh nodes */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gold-950/15 blur-[120px] animate-pulse" style={{ animationDuration: "12s" }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gold-950/15 blur-[150px] animate-pulse" style={{ animationDuration: "18s" }} />
        <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] rounded-full bg-amber-950/10 blur-[100px] animate-pulse" style={{ animationDuration: "15s" }} />
        
        {/* Delicate floating particle animation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          className="absolute inset-0"
        >
          {/* Subtle line grids */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </motion.div>
      </div>
      
      {/* Dynamic Gold-Mesh Border Accent on top */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#9c6e20] via-[#d9be6d] to-[#42260d] relative z-10" />

      {/* Main Luxury Header */}
      <header className="border-b border-luxury-border/30 bg-[#07080b]/90 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <div className="relative w-10.5 h-10.5 rounded-xl bg-gradient-to-tr from-[#9c6e20] to-[#d9be6d] p-[1.5px] overflow-hidden shadow-md shadow-gold-500/10 shrink-0">
              <img 
                src="/assets/nidheesh.jpeg" 
                alt="Nidheesh Krishna N" 
                className="w-full h-full object-cover rounded-[10px]" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-wider text-white uppercase font-mono">Nidheesh Krishna N</h1>
              <p className="text-[10px] text-gold-400 font-mono tracking-widest uppercase">Senior Flutter Architect &amp; Dev</p>
            </div>
          </div>

          {/* Social Contact Badges */}
          <div className="hidden md:flex items-center space-x-4 text-xs">
            <button 
              onClick={() => setIsEmailModalOpen(true)}
              className="flex items-center space-x-1.5 text-gray-400 hover:text-gold-300 transition-colors cursor-pointer bg-transparent border-0"
            >
              <Mail className="w-3.5 h-3.5 text-gold-400" />
              <span>nidheeshkrishnap@outlook.com</span>
            </button>
            
            <a 
              href="tel:+919946185174" 
              className="flex items-center space-x-1.5 text-gray-400 hover:text-gold-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span>+91 9946185174</span>
            </a>

            <a 
              href="https://linkedin.com/in/nidheesh-krishna-n-6a141315a" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-1.5 text-gray-400 hover:text-gold-300 transition-colors bg-[#111218] px-3.5 py-1.5 rounded-full border border-gray-900"
            >
              <Linkedin className="w-3.5 h-3.5 text-gold-400" />
              <span>LinkedIn Profile</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-55" />
            </a>

            <button 
              onClick={handleDownloadCV}
              className="flex items-center space-x-1.5 text-black hover:text-black transition-all bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 font-mono tracking-wider uppercase font-bold text-[11px] px-4 py-2.5 rounded-full hover:brightness-110 hover:shadow-lg hover:shadow-gold-500/20 cursor-pointer animate-pulse"
              title="Save CV as PDF"
            >
              <FileDown className="w-4 h-4 text-black" />
              <span>Download CV as PDF</span>
            </button>
          </div>

          {/* Mobile contact shortcut */}
          <div className="flex md:hidden items-center space-x-2">
            <button 
              onClick={handleDownloadCV}
              className="p-2.5 bg-gradient-to-r from-gold-400 to-gold-600 rounded-xl text-black hover:brightness-110"
              title="Download CV as PDF"
            >
              <FileDown className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsEmailModalOpen(true)}
              className="p-2.5 bg-[#0e0f14] border border-gold-500/10 rounded-xl text-gold-400 cursor-pointer"
              title="Email Nidheesh"
            >
              <Mail className="w-4 h-4" />
            </button>
            <a 
              href="https://linkedin.com/in/nidheesh-krishna-n-6a141315a" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 bg-[#0e0f14] border border-gold-500/10 rounded-xl text-gold-400"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

        </div>
      </header>

      {/* Main Container Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* HERO SECTION DECK */}
        <motion.div 
          className="mb-10 md:mb-16 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center bg-[#07080c]/60 border border-[#1b1c2b]/50 p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* Hero text & badges */}
            <div className="md:col-span-8 space-y-4 md:space-y-6 order-2 md:order-1">
              
              <motion.div 
                className="inline-flex items-center space-x-2.5 bg-gradient-to-r from-gold-900/40 to-[#12131c] border border-gold-500/25 px-4 py-2 rounded-full"
                variants={itemVariants}
              >
                <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
                <span className="text-[11px] font-mono tracking-wider gold-text-gradient uppercase font-bold">Signature Flutter Masterpiece Portfolio</span>
              </motion.div>

              <div className="space-y-3">
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wide font-medium leading-[1.12]"
                  variants={itemVariants}
                >
                  Crafting Premium <br />
                  <span className="gold-text-gradient">Mobile Masterpieces</span>
                </motion.h1>
                <motion.p 
                  className="text-sm md:text-base text-gray-400 font-sans max-w-2xl leading-relaxed"
                  variants={itemVariants}
                >
                  Expert Flutter Developer with 5+ years of mobile application engineering experience. Dedicated to architecting robust cross-platform applications featuring secure automated reciprocal workflows, high-precision performance optimizations, and native biometric security.
                </motion.p>
              </div>

              {/* Quick Experience Badges */}
              <motion.div 
                className="grid grid-cols-3 gap-2 sm:gap-3 pt-1 sm:pt-2 font-mono text-center"
                variants={itemVariants}
              >
                <motion.div 
                  className="bg-[#0e0f14] border border-gray-900 p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all"
                  whileHover={{ y: -4, scale: 1.02, borderColor: "#c9a244", boxShadow: "0 4px 25px rgba(181, 137, 43, 0.12)" }}
                >
                  <div className="text-[10px] sm:text-xs text-gray-400 uppercase">Experience</div>
                  <div className="text-[10px] sm:text-xs font-bold text-gold-400 mt-1">5+ Yrs Flutter</div>
                </motion.div>
                <motion.div 
                  className="bg-[#0e0f14] border border-gray-900 p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all"
                  whileHover={{ y: -4, scale: 1.02, borderColor: "#c9a244", boxShadow: "0 4px 25px rgba(181, 137, 43, 0.12)" }}
                >
                  <div className="text-[10px] sm:text-xs text-gray-400 uppercase">Live Stores</div>
                  <div className="text-[10px] sm:text-xs font-bold text-gold-400 mt-1">12+ Apps</div>
                </motion.div>
                <motion.div 
                  className="bg-[#0e0f14] border border-gray-900 p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all"
                  whileHover={{ y: -4, scale: 1.02, borderColor: "#c9a244", boxShadow: "0 4px 25px rgba(181, 137, 43, 0.12)" }}
                >
                  <div className="text-[10px] sm:text-xs text-gray-400 uppercase">Performance</div>
                  <div className="text-[10px] sm:text-xs font-bold text-gold-400 mt-1">120Hz Fluent</div>
                </motion.div>
              </motion.div>

              {/* Core Hero Quick Action Trigger Buttons */}
              <motion.div 
                className="relative flex flex-wrap gap-2 sm:gap-3 pt-4 sm:pt-6"
                variants={itemVariants}
              >
                <div className="relative inline-block text-left w-full sm:w-auto">
                  <button
                    onClick={() => setIsMeetMenuOpen(!isMeetMenuOpen)}
                    className="w-full sm:w-auto bg-gradient-to-r from-gold-300 to-gold-500 hover:from-gold-400 hover:to-gold-600 text-black font-bold font-mono text-[11px] px-5 py-3 rounded-xl transition-all shadow-md shadow-gold-500/10 cursor-pointer flex items-center justify-center sm:justify-start space-x-2 uppercase tracking-wider"
                  >
                    <Video className="w-4 h-4 text-black" />
                    <span>Schedule / Start Meet</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-black transition-transform duration-200 ${isMeetMenuOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isMeetMenuOpen && (
                      <>
                        {/* Outside click handler */}
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={() => setIsMeetMenuOpen(false)}
                        />
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 right-auto mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-sm rounded-2xl bg-[#0b0c11] border border-gold-500/25 shadow-2xl p-4 space-y-3 z-50 backdrop-blur-md sm:left-0"
                        >
                          <div className="border-b border-gray-900 pb-2">
                            <h4 className="text-[10px] font-mono text-gold-400 uppercase tracking-widest font-bold">Instant Dispatch Hub</h4>
                            <p className="text-[11px] text-gray-400 leading-normal font-sans">Initialize meet or schedule with Nidheesh's official profiles.</p>
                          </div>
                          
                          <div className="space-y-2 font-mono text-[11px]">

                            {/* Teams Option */}
                            <div className="p-2.5 rounded-xl bg-[#111218] border border-gray-900 hover:border-[#6264A7]/20 transition-all space-y-1.5 font-sans">
                              <span className="text-[9px] font-mono text-[#6264A7] font-bold uppercase tracking-wider flex items-center justify-between">
                                <span className="flex items-center">
                                  <span className="h-1.5 w-1.5 rounded-full bg-[#6264A7] mr-1.5" />
                                  Microsoft Teams
                                </span>
                                <span className="text-[8px] text-gray-500 lowercase">nidheeshkrishnap@outlook.com</span>
                              </span>
                              <div className="flex space-x-2 font-mono">
                                <a
                                  href="https://teams.microsoft.com/l/meeting/new?subject=Interview%20with%20Nidheesh%20Krishna%20N&attendees=nidheeshkrishnap@outlook.com"
                                  target="_top"
                                  rel="noopener noreferrer"
                                  className="flex-1 bg-[#151722] hover:bg-[#6264A7]/10 text-[#a3a5e7] py-1.5 rounded-lg text-center border border-[#6264A7]/10 hover:border-[#6264A7]/20 transition-all font-bold text-[10px]"
                                >
                                  Schedule
                                </a>
                                <a
                                  href="https://teams.microsoft.com/l/call/new?users=nidheeshkrishnap@outlook.com"
                                  target="_top"
                                  rel="noopener noreferrer"
                                  className="flex-1 bg-[#6264A7] hover:bg-[#4d4f8f] text-white py-1.5 rounded-lg text-center font-bold transition-all text-[10px]"
                                >
                                  Open Teams
                                </a>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* Direct Send Email Trigger Button */}
                <button
                  onClick={() => setIsEmailModalOpen(true)}
                  className="w-full sm:w-auto bg-[#0f1118]/80 hover:bg-[#151722] text-gold-300 hover:text-gold-200 border border-gold-500/20 hover:border-gold-500/40 font-bold font-mono text-[11px] px-5 py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center sm:justify-start space-x-2 uppercase tracking-wider"
                >
                  <Mail className="w-4 h-4 text-gold-400" />
                  <span>Send Email</span>
                </button>
              </motion.div>

            </div>

            {/* Profile Avatar Frame with animation */}
            <motion.div 
              className="md:col-span-4 order-1 md:order-2 flex justify-center"
              variants={itemVariants}
            >
              <motion.div 
                className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#9c6e20] via-luxury-border to-[#d9be6d] p-1 shadow-2xl shadow-gold-900/10 cursor-pointer"
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {/* Decorative pulsing gold aura */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#9c6e20]/25 to-[#d9be6d]/25 blur-xl animate-pulse pointer-events-none" />
                
                <div className="w-full h-full rounded-[20px] overflow-hidden relative bg-[#07080b]">
                  <img 
                    src="/assets/nidheesh.jpeg" 
                    alt="Nidheesh Krishna N" 
                    className="w-full h-full object-cover grayscale-[8%] hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Glassmorphic overlay badge inside the avatar frame */}
                  <div className="absolute bottom-3 left-3 right-3 bg-[#07080b]/80 backdrop-blur-md border border-white/5 py-1.5 px-3 rounded-xl flex items-center justify-between text-[9px] font-mono text-gray-300">
                    <span className="text-gold-400 font-bold tracking-wider">NIDHEESH</span>
                    <span className="text-emerald-400 flex items-center space-x-1 font-bold">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping inline-block mr-1" />
                      ACTIVE
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </motion.div>

        {/* SECTION BLOCK: PORTFOLIO MAIN WORKSPACE */}
        <div className="w-full relative z-10" id="portfolio-workspace">
          
          <div className="space-y-6 md:space-y-8 bg-[#07080b]/40 border border-[#1b1c2b]/30 p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-md">
              
              {/* Elegant Tab buttons selector */}
              <div className="flex border-b border-[#1b1c2b] space-x-6 text-xs font-mono uppercase pb-px shrink-0 overflow-x-auto relative">
                <button 
                  onClick={() => setActiveFeature("architecture")}
                  className={`relative pb-3 transition-all cursor-pointer whitespace-nowrap ${
                    activeFeature === "architecture" 
                      ? "text-gold-300 font-bold" 
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <span className="hidden sm:inline">1. 6 Mobile Masterpieces Explorer</span>
                  <span className="sm:hidden">1. Projects</span>
                  {activeFeature === "architecture" && (
                    <motion.div 
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                </button>
                
                <button 
                  onClick={() => setActiveFeature("resume")}
                  className={`relative pb-3 transition-all cursor-pointer whitespace-nowrap ${
                    activeFeature === "resume" 
                      ? "text-gold-300 font-bold" 
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <span className="hidden sm:inline">2. Full Career Experience Timeline</span>
                  <span className="sm:hidden">2. Resume</span>
                  {activeFeature === "resume" && (
                    <motion.div 
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                </button>

                <button 
                  onClick={() => setActiveFeature("copilot")}
                  className={`relative pb-3 transition-all cursor-pointer whitespace-nowrap ${
                    activeFeature === "copilot" 
                      ? "text-gold-300 font-bold" 
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <span className="hidden sm:inline">3. Interactive AI Chat</span>
                  <span className="sm:hidden">3. AI Chat</span>
                  {activeFeature === "copilot" && (
                    <motion.div 
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                </button>
              </div>

              {/* TAB RENDERING WITH FITTING TRANSLATIONAL MOTIONS */}
              <div className="min-h-[440px] relative">
                <AnimatePresence mode="wait">
                  {activeFeature === "architecture" && (
                    <motion.div 
                      key="architecture"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="w-full"
                    >
                      
                      {/* Left Column: Specifications Description & Selection */}
                      <div className="w-full space-y-6">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest block font-bold">Select any app below to explore specifications &amp; architecture:</span>
                          <h3 className="font-serif text-xl sm:text-2xl font-medium text-white tracking-wide">
                            {currentProject.title}: <span className="gold-text-gradient">{currentProject.subtitle}</span>
                          </h3>
                        </div>

                        {/* Horizontal / Grid of all 7 products */}
                        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                          {PROJECTS_DATA.map((proj) => {
                            const isSelected = proj.id === selectedProjectId;
                            return (
                              <motion.button
                                key={proj.id}
                                onClick={() => {
                                  setSelectedProjectId(proj.id);
                                }}
                                whileHover={{ y: -3, scale: 1.02, borderColor: "#d9be6d", boxShadow: "0 4px 20px rgba(181, 137, 43, 0.12)" }}
                                whileTap={{ scale: 0.98 }}
                                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                                  isSelected 
                                    ? "bg-gradient-to-b from-[#141622] to-[#0e0f15] border-gold-400/80 shadow-[0_0_25px_rgba(181, 137, 43, 0.12)] text-gold-300" 
                                    : "bg-[#0b0c11] border-gray-900 hover:border-gray-800 text-gray-400"
                                }`}
                              >
                                <div className="flex items-center space-x-2">
                                  <div className={`p-1.5 rounded-lg ${isSelected ? "bg-gold-500/10" : "bg-gray-950/40"}`}>
                                    {getCategoryIcon(proj.iconType)}
                                  </div>
                                  <div className="min-w-0">
                                    <h4 className="text-xs font-bold text-white truncate">{proj.title}</h4>
                                    <span className="text-[9px] text-gray-500 uppercase tracking-wide block">{proj.category}</span>
                                  </div>
                                </div>
                                <div className="mt-2.5 flex justify-between items-center text-[9px] font-mono text-gray-600">
                                  <span>★ {proj.rating.toFixed(1)}</span>
                                  <span className="bg-gray-950 px-1 rounded font-semibold text-gray-400">{proj.installs} DL</span>
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>

                        {/* Active Project Highlight detail card specs with transition */}
                        <AnimatePresence mode="wait">
                          <motion.div 
                            key={selectedProjectId}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="bg-[#0c0d12]/90 border border-gold-500/20 rounded-2xl p-5 space-y-4 relative overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 h-16 w-16 bg-gold-400/5 rounded-full blur-xl pointer-events-none" />

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                              <div className="flex items-center space-x-3">
                                <div className="p-2.5 bg-[#12131b] border border-gold-500/15 rounded-xl">
                                  {getCategoryIcon(currentProject.iconType)}
                                </div>
                                <div>
                                  <h4 className="text-base font-serif font-semibold text-white tracking-wide">{currentProject.title}</h4>
                                  <p className="text-xs text-gold-400 font-mono tracking-widest">{currentProject.subtitle}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3 text-xs font-mono text-gray-500">
                                <span className="bg-[#12131b] border border-gray-800 px-2.5 py-1 rounded-lg">★ {currentProject.rating} ({currentProject.installs} installs)</span>
                              </div>
                            </div>

                            <p className="text-xs text-gray-400 leading-relaxed pt-1.5 select-text">
                                {currentProject.description}
                            </p>

                            {/* Technical specifications chips */}
                            <div className="space-y-2.5 pt-1">
                              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">Engine stack utilized:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {currentProject.technologies.map((tech, idx) => (
                                  <motion.span 
                                    key={idx} 
                                    className="text-[10px] bg-[#121319] text-gold-300 border border-gold-400/10 px-2.5 py-1 rounded-lg font-mono inline-block"
                                    whileHover={{ scale: 1.05, borderColor: "#c9a244" }}
                                  >
                                    {tech}
                                  </motion.span>
                                ))}
                              </div>
                            </div>

                            {/* Modular feature list developed */}
                            <div className="space-y-2.5 pt-2">
                              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">Signature Performance Achievements:</span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                {currentProject.features.map((feat, idx) => (
                                  <motion.div 
                                    key={idx} 
                                    className="bg-[#0e0f14]/80 p-3 rounded-xl border border-gray-900 flex items-start space-x-2"
                                    whileHover={{ scale: 1.01, borderColor: "rgba(217, 190, 109, 0.25)" }}
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                                    <span className="text-gray-400 text-[11px] leading-snug">{feat}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}

                  {activeFeature === "resume" && (
                    <motion.div 
                      key="resume"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                    >
                      <ResumeTimeline />
                    </motion.div>
                  )}

                  {activeFeature === "copilot" && (
                    <motion.div 
                      key="copilot"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="space-y-6"
                    >
                      {/* Section intro header */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest block font-bold">Interactive Portfolio Copilot</span>
                        <h3 className="font-serif text-xl font-medium text-white">Interactive AI Chat</h3>
                        <p className="text-xs text-gray-400">
                          Ask my customized Gemini virtual assistant any direct questions regarding my Master of Computer Applications (MCA), Flutter state selectors, cross-platform performance practices, or mobile achievements.
                        </p>
                      </div>

                      {/* Gemini Assistant view */}
                      <div className="bg-[#0b0c11] border border-[#1b1c2b] rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-900 pb-3">
                          <div className="flex items-center space-x-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
                            <span className="text-[11px] font-mono uppercase tracking-wider text-gray-300 font-bold">Interactive Gemini AI Copilot</span>
                          </div>
                          <span className="text-[9px] font-mono text-gold-400 uppercase tracking-widest bg-gold-950/20 px-2 py-0.5 rounded border border-gold-400/10">Active Response Mode</span>
                        </div>
                        
                        <GeminiBot />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

        </div>

      </main>

      {/* Elegant Footer styled with Classic Gold Accents */}
      <footer className="border-t border-[#1b1c2b] bg-[#050608] mt-24 py-12 text-center text-xs text-gray-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <p className="uppercase tracking-[0.2em] text-gold-400/80">
            NIDHEESH KRISHNA N &bull; EXCLUSIVE PORTFOLIO WORKSPACE
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px]">
            <span className="after:content-['|'] after:text-gray-800 after:ml-4 after:hidden sm:after:inline">Phone: +91 9946185174</span>
            <span>Email: nidheeshkrishnap@outlook.com</span>
            <span className="hidden sm:inline">LinkedIn: linkedin.com/in/nidheesh-krishna-n-6a141315a</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 text-[11px] sm:hidden">
            <span>LinkedIn: linkedin.com/in/nidheesh-krishna-n-6a141315a</span>
          </div>
          <p className="text-[10px] text-gray-700 pt-2">
            Build completed using React &bull; Tailwind CSS &bull; motion &bull; Server-Side Gemini API
          </p>
        </div>
      </footer>

      {/* Floating Premium WhatsApp Contact Widget */}
      <motion.div 
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pointer-events-auto"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 15, delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.a
          href="https://wa.me/919946185174?text=Hi%20Nidheesh!%20I%20saw%20your%20awesome%20Flutter%20portfolio%20and%20wanted%20to%20connect."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-500 border border-emerald-400/20 text-white pl-3 pr-4 py-2.5 rounded-full shadow-2xl shadow-emerald-900/30 font-mono text-[11px] font-semibold tracking-wider hover:from-emerald-500 hover:to-emerald-400 transition-all cursor-pointer relative group"
        >
          {/* Pulsing glow ring around badge */}
          <span className="absolute -inset-1 bg-emerald-500/20 rounded-full blur animate-pulse" />
          
          <div className="relative flex items-center justify-center shrink-0">
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-300 animate-ping" />
            <MessageCircle className="w-4 h-4 text-white relative z-10" />
          </div>
          <span className="relative z-10 uppercase hidden sm:inline">Message Nidheesh</span>
        </motion.a>
      </motion.div>

      {/* Modern Interactive Email Composer Overlay Modal */}
      <AnimatePresence>
        {isEmailModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blurring filter */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEmailModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />
            
            {/* Modal Body Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="bg-[#0b0c11] border border-gold-500/30 w-full max-w-lg rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl relative z-10 overflow-hidden mx-2 sm:mx-0"
            >
              {/* Decorative top illumination */}
              <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
              
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest block font-bold">In-Site Mail Facility</span>
                  <h3 className="font-serif text-xl font-medium text-white flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-gold-400 shrink-0" />
                    <span>Send Message to Nidheesh</span>
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    Formulate your collaboration proposal, technical job details, or interview coordinate links directly.
                  </p>
                </div>
                
                <button 
                  onClick={() => setIsEmailModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-all cursor-pointer border border-transparent hover:border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSendEmailSubmit} className="space-y-4 font-mono text-xs">
                <div className="space-y-1.5">
                  <label className="text-gold-400/80 uppercase text-[10px] font-bold tracking-widest">Your Name / Organization</label>
                  <input 
                    type="text" 
                    value={emailSenderName}
                    onChange={(e) => setEmailSenderName(e.target.value)}
                    placeholder="e.g. John Doe / Tech Corp"
                    className="w-full bg-[#111218] border border-gray-900 focus:border-gold-500/40 rounded-xl px-4 py-3 text-white transition-all outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-gold-400/80 uppercase text-[10px] font-bold tracking-widest">Your Email Address *</label>
                    <input 
                      type="email" 
                      required
                      value={emailSenderAddress}
                      onChange={(e) => setEmailSenderAddress(e.target.value)}
                      placeholder="e.g. client@domain.com"
                      className="w-full bg-[#111218] border border-gray-900 focus:border-gold-500/40 rounded-xl px-4 py-3 text-white transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-gold-400/80 uppercase text-[10px] font-bold tracking-widest">Inquiry Subject</label>
                    <input 
                      type="text" 
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="e.g. Mobile Developer Role"
                      className="w-full bg-[#111218] border border-gray-900 focus:border-gold-500/40 rounded-xl px-4 py-3 text-white transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gold-400/80 uppercase text-[10px] font-bold tracking-widest">Proposals &amp; Message Body *</label>
                  <textarea 
                    required
                    rows={4}
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    placeholder="Provide details about the stack involved, terms, expectations, or contact timings..."
                    className="w-full bg-[#111218] border border-gray-900 focus:border-gold-500/40 rounded-xl p-4 text-white transition-all outline-none resize-none leading-normal font-sans text-xs"
                  />
                </div>

                {/* Submitting/Actions Box */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={isEmailSending}
                    className="flex-1 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-600 disabled:from-gold-650 disabled:to-gold-700 text-black py-3 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer text-xs uppercase tracking-wider"
                  >
                    <Send className="w-4 h-4 shrink-0" />
                    <span>{isEmailSending ? "Opening Mail client..." : "Launch Native Dispatch"}</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      const fullDraft = `From: ${emailSenderName || 'Guest'}\nSubject: ${emailSubject || 'Collaboration'}\n\n${emailMessage}\n\n---\nReply to: ${emailSenderAddress}`;
                      navigator.clipboard.writeText(fullDraft);
                      alert("Message draft copied to clipboard successfully! You can now paste this directly into any custom online/webmail client.");
                    }}
                    className="bg-[#111218] hover:bg-gold-500/10 border border-gold-500/15 text-gold-300 hover:text-gold-200 px-4 py-3 rounded-xl font-bold transition-all cursor-pointer text-xs uppercase tracking-wider whitespace-nowrap"
                  >
                    Copy draft
                  </button>
                </div>
                
                <p className="text-[10px] text-gray-500 text-center leading-normal font-sans pt-1">
                  * Opens standard local client (Outlook, Mail, etc.) pre-filled. Fall back to "Copy draft" if you use browser webmail.
                </p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      </div> {/* no-print closing */}

      {/* 
        ========================================================================
        PRISTINE HIGH-FIDELITY PRINT-ONLY RESUME CV FORMAT (PDF MODE)
        ========================================================================
      */}
      <div className="print-only bg-white text-black p-0 font-sans select-text">
        <div className="max-w-[800px] mx-auto">
          {/* Header section with Name & Core details */}
          <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-black font-serif">NIDHEESH KRISHNA N</h1>
              <p className="text-sm font-semibold tracking-wide text-gray-800 uppercase font-sans mt-1">Senior Flutter Architect &amp; Cross-Platform Engineer</p>
            </div>
            <div className="text-right text-[11px] space-y-0.5 text-gray-600 font-mono">
              <p>Email: nidheeshkrishnap@outlook.com</p>
              <p>Phone: +91 9946185174</p>
              <p>Location: Kerala, India</p>
              <p>LinkedIn: linkedin.com/in/nidheesh-krishna-n-6a141315a</p>
            </div>
          </div>

          {/* Professional Narrative / Summary */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-black uppercase font-serif tracking-wider border-b border-black pb-1 mb-2">Professional Summary</h2>
            <p className="text-[11.5px] leading-relaxed text-gray-800">
              Highly accomplished Senior Mobile Application Engineer with <strong>5+ years of production experience</strong> specializing in building elite cross-platform applications using the <strong>Flutter &amp; Dart ecosystem</strong>. Distinguished for engineering ultra-fluent 120Hz modular interfaces, configuring safe multi-tenant secure frameworks (biometrics, cryptography), and deploying more than 12 global application instances to the iOS App Store and Google Play Store. Deep academic backing holding a Master of Computer Applications (MCA) degree.
            </p>
          </div>

          {/* Core Competencies Matrix */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-black uppercase font-serif tracking-wider border-b border-black pb-1 mb-2">Core Technical Expertise</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[11.5px] text-gray-800">
              <div>
                <p><strong>Framework &amp; SDKs:</strong> Flutter SDK, Dart VM, Android Studio, Xcode, Java</p>
                <p><strong>State &amp; Flows:</strong> Bloc State Engines, custom selectors, Riverpod, GetX, Provider</p>
              </div>
              <div>
                <p><strong>Architecture Standards:</strong> MVVM, Clean Architecture, SOLID Principles, modular packages</p>
                <p><strong>Secure Features:</strong> Biometric Encryption, OAuth 2.0, Stripe checkout gateways, custom websockets</p>
              </div>
            </div>
          </div>

          {/* Professional History */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-black uppercase font-serif tracking-wider border-b border-black pb-1 mb-3">Professional Experience</h2>
            
            <div className="space-y-4">
              {/* Job 1 */}
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xs font-bold text-black uppercase font-sans">Flutter Developer</h3>
                    <p className="text-[11px] font-semibold text-gray-700">Aventus Informatics LLP</p>
                  </div>
                  <div className="text-right text-[11px] text-gray-600">
                    <p className="font-semibold">Feb 2026 – Present</p>
                    <p>Global Remote / Onsite</p>
                  </div>
                </div>
                <ul className="list-disc pl-4 mt-1.5 text-[11px] text-gray-800 space-y-1">
                  <li>Architect client-oriented production scale cross-platform mobile apps using Flutter and Dart.</li>
                  <li>Incorporate state-of-the-art declarative build schemes and SOLID principles to achieve a clean codebase.</li>
                  <li>Introduce meticulous stream auditing schedules, increasing sub-module decoupling and reducing tech-debt patterns.</li>
                </ul>
              </div>

              {/* Job 2 */}
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xs font-bold text-black uppercase font-sans">Mobile Application Developer</h3>
                    <p className="text-[11px] font-semibold text-gray-700">Eqsoft Business Solutions Pvt Ltd.</p>
                  </div>
                  <div className="text-right text-[11px] text-gray-600">
                    <p className="font-semibold">May 2024 – Jan 2025</p>
                    <p>Coimbatore, India</p>
                  </div>
                </div>
                <ul className="list-disc pl-4 mt-1.5 text-[11px] text-gray-800 space-y-1">
                  <li>Formulated state configurations with GetX, Riverpod, and Provider mechanisms to power diverse commercial requirements.</li>
                  <li>Converted complex UI design screens into pixel-perfect, fully responsive mobile elements.</li>
                  <li>Integrated payment modules (Stripe gateways) and real-time maps geolocation SDKs.</li>
                </ul>
              </div>

              {/* Job 3 */}
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xs font-bold text-black uppercase font-sans">Sr. Mobile Application Developer</h3>
                    <p className="text-[11px] font-semibold text-gray-700">Ociuz Infotech Pvt Ltd</p>
                  </div>
                  <div className="text-right text-[11px] text-gray-600">
                    <p className="font-semibold">Dec 2020 – May 2024</p>
                    <p>India Onsite</p>
                  </div>
                </div>
                <ul className="list-disc pl-4 mt-1.5 text-[11px] text-gray-800 space-y-1">
                  <li>Oversaw complete deployment lifecycle of 12+ live mobile applications onto the iOS App Store and Google Play Store.</li>
                  <li>Diagnosed and eliminated critical memory leaks to maximize app execution speed.</li>
                  <li>Collaborated with junior engineers to champion advanced Dart async loops and local biometric vaults.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Project Demonstrations */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-black uppercase font-serif tracking-wider border-b border-black pb-1 mb-2">Signature Project Architecture</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-bold text-black font-sans">mobicom (Exclusive Club Networking Platform)</p>
                <p className="text-[11px] leading-relaxed text-gray-800 mt-1">
                  Built a high-performance club ticketing platform featuring secure bio-local vaults, live chat sockets, and multi-region payment systems. Managed fully distributed modular packages to ensure maximum security performance and continuous integration.
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-black font-sans">WeAre Fresh (Organic Hyperlocal Delivery Marketplace)</p>
                <p className="text-[11px] leading-relaxed text-gray-800 mt-1">
                  Crafted custom geofencing trackers and synchronized state controllers, driving highly scalable multi-item order fulfillment pipelines.
                </p>
              </div>
            </div>
          </div>

          {/* Education Details */}
          <div>
            <h2 className="text-sm font-bold text-black uppercase font-serif tracking-wider border-b border-black pb-1 mb-2">Education Background</h2>
            <div className="flex justify-between text-[11px] text-gray-800 mb-1">
              <div>
                <strong>Master of Computer Applications (MCA)</strong> &bull; Bharathiar University
              </div>
              <div>
                Graduated: 2012 – 2015
              </div>
            </div>
            <div className="flex justify-between text-[11px] text-gray-800">
              <div>
                <strong>Bachelor of Computer Applications (BCA)</strong> &bull; Bharathiar University
              </div>
              <div>
                Graduated: 2009 – 2012
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
