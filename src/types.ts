export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Club {
  id: string;
  name: string;
  type: "Golf" | "Yacht" | "City" | "Social";
  location: string;
  image: string;
  country: string;
  rating: number;
  membersCount: number;
}

export interface Booking {
  clubId: string;
  memberName: string;
  date: string;
  timeSlot: string;
  guestCount: number;
  status: "Pending" | "Approved" | "Paid" | "Confirmed";
  bookingType: "Reciprocal" | "Full-VIP";
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  features: string[];
  category: "E-Commerce" | "Subscription" | "Quiz/EdTech" | "Mindfulness" | "Exclusive Club Networking & Booking Platform" | "Billing & Utility";
  iconType: "fresh" | "milk" | "quiz" | "meditation" | "fizzmo" | "mobicom" | "equalplus";
  rating: number;
  installs: string;
}

