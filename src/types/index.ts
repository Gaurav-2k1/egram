/**
 * Shared TypeScript types and interfaces for the e-GramSeva application
 */

export type PageType = "landing" | "registration" | "panchayat-demo" | "dashboard" | "success";

export type Language = "en" | "hi" | "regional";

export interface NavigationItem {
  label: string;
  href: string;
}

export interface Post {
  id: string;
  panchayatId?: string;
  author: string;
  authorRole: string;
  timestamp: string;
  content: string;
  media?: PostMedia[];
  likes: number;
  comments: number;
  shares: number;
}

export interface PostMedia {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  file?: File;
}

export interface Scheme {
  id: string;
  panchayatId?: string;
  name: string;
  category: string;
  budget: string;
  beneficiaries: number;
  progress: number;
  status: "Active" | "Completed" | "Pending";
}

export interface PanchayatMember {
  id: string;
  panchayatId?: string;
  name: string;
  role: string;
  ward: string;
  phone: string;
  email?: string;
  image?: string;
  designation?: string;
}

export interface Announcement {
  id: string;
  panchayatId?: string;
  title: string;
  date: string;
  description?: string;
  status?: "Published" | "Draft";
  views?: number;
}

export interface GalleryItem {
  id: string;
  panchayatId?: string;
  title: string;
  image: string;
  description?: string;
  category?: string;
  date?: string;
}

export interface Project {
  id: string;
  panchayatId?: string;
  title: string;
  description: string;
  budget: string;
  timeline: string;
  status: "In Progress" | "Completed" | "Pending" | "Planned";
  progress: number;
  wards: string;
  startDate?: string;
  endDate?: string;
  images?: string[];
}

export interface PanchayatDetails {
  id: string;
  name: string;
  district: string;
  state: string;
  block: string;
  population: number;
  area: string;
  wards: number;
  subdomain: string;
  established: number;
  description?: string;
  heroImage?: string;
  contactInfo?: {
    address: string;
    phone: string;
    email: string;
    officeHours: string;
  };
  features?: string[];
}

export interface RegistrationFormData {
  // Personal Details
  sachivName: string;
  email: string;
  phone: string;
  designation: string;
  // Panchayat Details
  panchayatName: string;
  district: string;
  state: string;
  block: string;
  population: string;
  area: string;
  wards: string;
  subdomain: string;
  // Documents
  idProof: File | null;
  appointmentLetter: File | null;
  panchayatCertificate: File | null;
  // Terms
  acceptTerms: boolean;
}

export interface StatCard {
  label: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface ActivePanchayat {
  name: string;
  district: string;
  schemes: number;
  population: number;
}

