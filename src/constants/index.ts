/**
 * Application constants
 */

export const APP_NAME = "e-GramSeva";
export const APP_DESCRIPTION = "Digital Platform for Gram Panchayats";

export const COLORS = {
  PRIMARY: "#FF9933",
  SECONDARY: "#138808",
  WHITE: "#FFFFFF",
} as const;

export const ROUTES = {
  LANDING: "landing",
  REGISTRATION: "registration",
  PANCHAYAT_DEMO: "panchayat-demo",
  DASHBOARD: "dashboard",
  SUCCESS: "success",
} as const;

export const REGISTRATION_STEPS = [
  { number: 1, title: "Personal Details" },
  { number: 2, title: "Panchayat Details" },
  { number: 3, title: "Document Upload" },
  { number: 4, title: "Review & Submit" },
] as const;

export const INDIAN_STATES = [
  "Uttar Pradesh",
  "Maharashtra",
  "Rajasthan",
  "Gujarat",
  "Bihar",
  "West Bengal",
  "Madhya Pradesh",
  "Tamil Nadu",
  "Karnataka",
  "Andhra Pradesh",
] as const;

export const DESIGNATIONS = [
  "Panchayat Sachiv",
  "Sarpanch",
  "Up-Sarpanch",
  "Ward Member",
] as const;

export const FILE_UPLOAD_LIMITS = {
  IMAGE_MAX_SIZE: 2 * 1024 * 1024, // 2MB
  PDF_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_IMAGE_TYPES: [".pdf", ".jpg", ".jpeg", ".png"],
  ACCEPTED_PDF_TYPES: [".pdf"],
} as const;

