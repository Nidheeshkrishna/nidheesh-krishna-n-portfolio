import React, { useState } from "react";
import { 
  Building2, Calendar, Award, GraduationCap, ChevronDown, CheckCircle2, Star, Briefcase, FileDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Job {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  metrics: { label: string; value: string }[];
  techUsed: string[];
}

const JOBS_DATA: Job[] = [
  {
    id: "aventus",
    role: "Flutter Developer",
    company: "Aventus Informatics LLP",
    period: "Feb 17, 2026 – Present",
    location: "Global Remote / onsite",
    bullets: [
      "Architect and develop major cross-platform mobile applications for Android and iOS using the Flutter framework.",
      "Write pristine, clean, maintainable, and highly efficient code adhering strictly to SOLID standards and industry best practices.",
      "Collaborate directly with cross-functional stakeholders to translate complex requirements into robust and functional mobile solutions.",
      "Introduced declarative build schemes and rigorous code auditing schedules to minimize tech-debt cycles in modular subpackages."
    ],
    metrics: [
      { label: "Code Quality Index", value: "98.5%" },
      { label: "Sub-module Decoupling", value: "Excellent" },
      { label: "Deployment Cycle Speed", value: "+28% YoY" }
    ],
    techUsed: ["Flutter SDK", "Dart", "MVVM Structure", "Bloc State Engine", "CI/CD integration"]
  },
  {
    id: "eqsoft",
    role: "Mobile Application Developer",
    company: "Eqsoft Business Solutions Pvt Ltd.",
    period: "May 2024 – Jan 2025",
    location: "Coimbatore, India",
    bullets: [
      "Designed and formulated responsive cross-platform mobile products for iOS and Android.",
      "Successfully converted intricate UI/UX high-fidelity wireframes and design mockups into pixel-perfect responsive Flutter interfaces.",
      "Configured GetX, Riverpod, Bloc, and Provider ecosystems to suit diverse client modular state-management specifications.",
      "Integrated key third-party SDKs, payment bridges, and geolocation maps coordinates to expand application functionality."
    ],
    metrics: [
      { label: "Pixel-perfect Fidelity", value: "100%" },
      { label: "Mockup-to-Launch time", value: "-15 days" },
      { label: "Satisfactory Score", value: "4.9 / 5" }
    ],
    techUsed: ["Flutter", "Riverpod", "GetX State Layer", "REST API Serialization", "Stripe Checkout"]
  },
  {
    id: "ociuz",
    role: "Sr. Mobile Application Developer",
    company: "Ociuz Infotech Pvt Ltd",
    period: "Dec 2020 – May 2024",
    location: "India Onsite",
    bullets: [
      "Authored and led full deployment files of high-quality mobile applications utilising the Flutter ecosystem.",
      "Managed the full release cycle from provisioning profiles to direct signed deployments on Apple App Store Connect and Google Play Store Console.",
      "Diagnosed and resolved critical memory leaks and async thread choking to optimize application load velocities.",
      "Collaborated proactively with other junior engineers and cross-functional teams to resolve complex blocking issues."
    ],
    metrics: [
      { label: "Stores Deployed Apps", value: "12+" },
      { label: "Application Performance Gain", value: "+34%" },
      { label: "Crashing Index", value: "< 0.1%" }
    ],
    techUsed: ["Flutter SDK", "Java / Android Shell", "Biometric Local Auth", "App Store Connect", "Play Store Console"]
  }
];

export default function ResumeTimeline() {
  const [expandedJob, setExpandedJob] = useState<string>("aventus");

  const toggleJob = (id: string) => {
    setExpandedJob(expandedJob === id ? "" : id);
  };

  return (
    <div className="space-y-6">
      
      {/* Competencies Grid */}
      <div className="bg-[#0b0c11] border border-[#1d1f2b] rounded-3xl p-6 space-y-4">
        <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-gold-400 font-bold">Skills Ecosystem</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          
          <motion.div 
            className="bg-[#10121d] border border-gray-900 p-3.5 rounded-2xl flex flex-col justify-between space-y-2 transition-all cursor-default"
            whileHover={{ y: -4, borderColor: "#c9a244", boxShadow: "0 4px 20px rgba(181, 137, 43, 0.08)" }}
          >
            <span className="text-[10px] text-gray-500 font-mono uppercase">Frameworks</span>
            <div className="font-semibold text-white">Flutter Specialist (4+ yrs)</div>
            <p className="text-[10px] text-gray-400">Android SDK, Native iOS wrappers, Dart VM internals.</p>
          </motion.div>

          <motion.div 
            className="bg-[#10121d] border border-gray-900 p-3.5 rounded-2xl flex flex-col justify-between space-y-2 transition-all cursor-default"
            whileHover={{ y: -4, borderColor: "#c9a244", boxShadow: "0 4px 20px rgba(181, 137, 43, 0.08)" }}
          >
            <span className="text-[10px] text-gray-500 font-mono uppercase">Languages</span>
            <div className="font-semibold text-white">Dart &amp; Java</div>
            <p className="text-[10px] text-gray-400">Object-oriented programming, async event loops, serialization.</p>
          </motion.div>

          <motion.div 
            className="bg-[#10121d] border border-gray-900 p-3.5 rounded-2xl flex flex-col justify-between space-y-2 col-span-2 md:col-span-1 transition-all cursor-default"
            whileHover={{ y: -4, borderColor: "#c9a244", boxShadow: "0 4px 20px rgba(181, 137, 43, 0.08)" }}
          >
            <span className="text-[10px] text-gray-500 font-mono uppercase">State Management</span>
            <div className="font-semibold text-gold-300">Provider, Riverpod, Bloc</div>
            <p className="text-[10px] text-gray-400">Custom selectors, stream controllers, actions, and store hooks.</p>
          </motion.div>

        </div>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-4">
        <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-gold-400 font-bold px-1">Professional Experience</h4>
        
        <div className="space-y-3">
          {JOBS_DATA.map((job) => {
            const isExpanded = expandedJob === job.id;
            return (
              <motion.div 
                key={job.id} 
                className={`bg-[#0c0d12] border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isExpanded ? "border-gold-400 bg-gradient-to-b from-[#0d0e15] to-[#0c0d12]" : "border-luxury-border hover:border-gray-800"
                }`}
                whileHover={!isExpanded ? { y: -2, borderColor: "#b5892b/30" } : {}}
              >
                {/* Accordion Trigger Header */}
                <button 
                  onClick={() => toggleJob(job.id)}
                  className="w-full p-5 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-[#161722] border border-gold-400/15 rounded-xl flex items-center justify-center text-gold-400 shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white font-serif tracking-wide">{job.role}</div>
                      <div className="flex flex-wrap items-center gap-x-2 text-xs text-gray-400 mt-1">
                        <span className="text-gold-300 font-medium">{job.company}</span>
                        <span className="text-gray-600">•</span>
                        <span className="flex items-center text-[11px] text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {job.period}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isExpanded ? "rotate-180 text-gold-400" : ""}`} />
                </button>

                {/* Expanding Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-6 pt-1 border-t border-luxury-border/30 space-y-5">
                        
                        {/* Achievements Bullets */}
                        <div className="space-y-2.5">
                          <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Core Contributions</div>
                          <ul className="space-y-2 text-xs text-gray-300">
                            {job.bullets.map((bullet, idx) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle2 className="w-4 h-4 text-gold-400 mr-2 shrink-0 mt-0.5" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-3 gap-2.5 bg-[#08090e] p-3.5 rounded-xl border border-gray-900 font-mono text-center">
                          {job.metrics.map((m, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="text-[9px] text-gray-600 uppercase tracking-normal">{m.label}</div>
                              <div className="text-xs font-bold text-white">{m.value}</div>
                            </div>
                          ))}
                        </div>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {job.techUsed.map((tech, idx) => (
                            <motion.span 
                              key={idx} 
                              className="text-[10px] bg-[#141622] text-gold-300 border border-gold-400/10 px-2.5 py-1 rounded-md inline-block"
                              whileHover={{ scale: 1.05, borderColor: "#c9a244" }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Education & Bio cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <motion.div 
          className="bg-[#0b0c11] border border-[#1d1f2b] rounded-2xl p-5 space-y-3"
          whileHover={{ y: -3, borderColor: "rgba(217, 190, 109, 0.3)" }}
        >
          <div className="flex items-center space-x-2 text-gold-400">
            <GraduationCap className="w-5 h-5" />
            <h5 className="font-serif font-semibold text-sm text-white">Education Milestones</h5>
          </div>
          <div className="space-y-3 text-xs">
            <div className="border-l border-gold-500/30 pl-3.5 relative space-y-0.5">
              <span className="absolute -left-[4.5px] top-1 w-2 h-2 rounded-full bg-gold-400" />
              <div className="font-semibold text-white">Master of Computer Applications (MCA)</div>
              <p className="text-gray-400">Bharathiar University, Coimbatore</p>
              <div className="text-[10px] font-mono text-gold-300">Graduated: 2012 – 2015</div>
            </div>
            
            <div className="border-l border-gold-500/30 pl-3.5 relative space-y-0.5">
              <span className="absolute -left-[4.5px] top-1 w-2 h-2 rounded-full bg-gold-400" />
              <div className="font-semibold text-white">Bachelor of Computer Applications (BCA)</div>
              <p className="text-gray-400">Bharathiar University, Coimbatore</p>
              <div className="text-[10px] font-mono text-gold-300">Graduated: 2009 – 2012</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-[#0b0c11] border border-[#1d1f2b] rounded-2xl p-5 space-y-3 flex flex-col justify-between"
          whileHover={{ y: -3, borderColor: "rgba(217, 190, 109, 0.3)" }}
        >
          <div>
            <div className="flex items-center space-x-2 text-gold-400 mb-2">
              <Award className="w-5 h-5" />
              <h5 className="font-serif font-semibold text-sm text-white">Professional Pitch</h5>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              "Over the past 5 years, I've dedicated my craft to writing clean, reliable dart repositories that scale cleanly from individual single-view clients to multi-tenant ecosystems. Crafting high-fidelity mockups of premium elite clubs is my signature."
            </p>
          </div>
          <div className="text-[10px] text-gray-500 font-mono text-right mt-2">
            Available for Senior / Lead Flutter roles worldwide.
          </div>
        </motion.div>

      </div>

    </div>
  );
}
