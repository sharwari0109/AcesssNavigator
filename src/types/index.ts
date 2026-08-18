export type Screen =
  | 'splash'
  | 'welcome'
  | 'signup'
  | 'onboarding'
  | 'home'
  | 'search'
  | 'routes'
  | 'navigation'
  | 'accessibility-details'
  | 'report'
  | 'profile'
  | 'sos';

export type AccessibilityCategory =
  | 'mobility'
  | 'visual'
  | 'hearing'
  | 'cognitive'
  | 'other';

export interface AccessibilityNeed {
  id: string;
  label: string;
  category: AccessibilityCategory;
  icon: string;
}

export interface AccessibilityPreference {
  id: string;
  label: string;
  description?: string;
}

export interface AccessibilityProfile {
  needs: string[];
  preferences: string[];
}

export type AccessibilityLevel = 'full' | 'partial' | 'barrier';

export interface AccessibilityFeature {
  id: string;
  label: string;
  status: 'available' | 'unavailable' | 'warning';
  detail?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  distance: string;
  distanceKm: number;
  rating: number;
  accessibilityScore: number;
  accessibilityLabel: string;
  features: string[];
  category: string;
  coordinates: { x: number; y: number };
}

export interface RouteOption {
  id: string;
  title: string;
  duration: string;
  durationMin: number;
  distance: string;
  distanceKm: number;
  accessibilityRating: number;
  accessibilityStars: number;
  type: 'accessible' | 'fastest' | 'low-sensory';
  features: { label: string; type: 'good' | 'warning' }[];
  isRecommended?: boolean;
}

export interface NavigationInstruction {
  id: string;
  text: string;
  detail?: string;
  distance: string;
  icon: string;
}

export interface ReportIssue {
  id: string;
  type: string;
  description: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'emergency';
  photo?: string;
  submittedAt: string;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

export interface AppSettings {
  largeText: boolean;
  highContrast: boolean;
  reduceAnimations: boolean;
  screenReaderMode: boolean;
  largeButtons: boolean;
  voiceNavigation: boolean;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export type NavTab = 'home' | 'navigate' | 'saved' | 'alerts' | 'profile';
