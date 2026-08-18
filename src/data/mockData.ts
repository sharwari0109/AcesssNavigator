import type {
  AccessibilityNeed,
  AccessibilityPreference,
  Location,
  RouteOption,
  NavigationInstruction,
  AccessibilityFeature,
} from '@/types';

export const accessibilityNeeds: AccessibilityNeed[] = [
  { id: 'wheelchair', label: 'Wheelchair user', category: 'mobility', icon: 'Accessibility' },
  { id: 'limited-mobility', label: 'Limited mobility', category: 'mobility', icon: 'Move' },
  { id: 'walking-difficulty', label: 'Walking difficulty', category: 'mobility', icon: 'Footprints' },
  { id: 'blind', label: 'Blind', category: 'visual', icon: 'EyeOff' },
  { id: 'low-vision', label: 'Low vision', category: 'visual', icon: 'Eye' },
  { id: 'deaf', label: 'Deaf', category: 'hearing', icon: 'EarOff' },
  { id: 'hard-of-hearing', label: 'Hard of hearing', category: 'hearing', icon: 'Ear' },
  { id: 'autism-friendly', label: 'Autism-friendly', category: 'cognitive', icon: 'Brain' },
  { id: 'cognitive', label: 'Cognitive accessibility', category: 'cognitive', icon: 'Lightbulb' },
  { id: 'low-sensory', label: 'Low sensory environment', category: 'cognitive', icon: 'Waves' },
  { id: 'elderly', label: 'Elderly assistance', category: 'other', icon: 'Heart' },
  { id: 'temporary-injury', label: 'Temporary injury', category: 'other', icon: 'Bandage' },
  { id: 'custom', label: 'Custom accessibility needs', category: 'other', icon: 'Settings' },
];

export const mobilityPreferences: AccessibilityPreference[] = [
  { id: 'avoid-stairs', label: 'Avoid stairs', description: 'Routes with no stairways' },
  { id: 'require-ramps', label: 'Require ramps', description: 'Ramp access at entrances' },
  { id: 'require-elevators', label: 'Require elevators', description: 'Elevator access for multi-level' },
  { id: 'accessible-entrances', label: 'Accessible entrances only', description: 'Step-free entry points' },
  { id: 'smooth-sidewalks', label: 'Prefer smooth sidewalks', description: 'Even, paved surfaces' },
  { id: 'avoid-steep-slopes', label: 'Avoid steep slopes', description: 'Grade under 5%' },
  { id: 'avoid-construction', label: 'Avoid construction zones', description: 'Detour active work sites' },
];

export const visualPreferences: AccessibilityPreference[] = [
  { id: 'audio-navigation', label: 'Audio navigation', description: 'Spoken turn-by-turn directions' },
  { id: 'high-contrast-pref', label: 'High contrast', description: 'Maximum color contrast UI' },
  { id: 'large-text-pref', label: 'Large text', description: 'Increased font sizes throughout' },
  { id: 'voice-instructions', label: 'Voice instructions', description: 'Detailed voice guidance' },
];

export const hearingPreferences: AccessibilityPreference[] = [
  { id: 'visual-alerts', label: 'Visual alerts', description: 'On-screen notifications for alerts' },
  { id: 'vibration-alerts', label: 'Vibration alerts', description: 'Haptic feedback for alerts' },
];

export const locations: Location[] = [
  {
    id: 'mumbai-central',
    name: 'Mumbai Central Railway Station',
    address: 'Mumbai Central, Mumbai, MH 400008',
    distance: '2.4 km',
    distanceKm: 2.4,
    rating: 4.6,
    accessibilityScore: 88,
    accessibilityLabel: 'Highly Accessible',
    features: ['Ramps', 'Elevators', 'Accessible Entrance'],
    category: 'Transit',
    coordinates: { x: 35, y: 42 },
  },
  {
    id: 'apollo-hospital',
    name: 'Apollo Hospital',
    address: 'Belapur, Navi Mumbai, MH 400614',
    distance: '5.1 km',
    distanceKm: 5.1,
    rating: 4.8,
    accessibilityScore: 95,
    accessibilityLabel: 'Highly Accessible',
    features: ['Ramps', 'Elevators', 'Accessible Restrooms', 'Accessible Entrance'],
    category: 'Hospital',
    coordinates: { x: 68, y: 28 },
  },
  {
    id: 'phoenix-mall',
    name: 'Phoenix Mall',
    address: 'Lower Parel, Mumbai, MH 400013',
    distance: '3.2 km',
    distanceKm: 3.2,
    rating: 4.4,
    accessibilityScore: 82,
    accessibilityLabel: 'Highly Accessible',
    features: ['Elevators', 'Ramps', 'Accessible Restrooms'],
    category: 'Shopping',
    coordinates: { x: 52, y: 58 },
  },
  {
    id: 'bkc',
    name: 'Bandra Kurla Complex',
    address: 'Bandra Kurla Complex, Bandra East, Mumbai',
    distance: '4.7 km',
    distanceKm: 4.7,
    rating: 4.2,
    accessibilityScore: 76,
    accessibilityLabel: 'Partially Accessible',
    features: ['Elevators', 'Ramps'],
    category: 'Business',
    coordinates: { x: 24, y: 65 },
  },
  {
    id: 'mumbai-airport',
    name: 'Mumbai Airport (BOM)',
    address: 'Chhatrapati Shivaji Intl Airport, Mumbai',
    distance: '12.3 km',
    distanceKm: 12.3,
    rating: 4.7,
    accessibilityScore: 91,
    accessibilityLabel: 'Highly Accessible',
    features: ['Ramps', 'Elevators', 'Accessible Restrooms', 'Assistance Desk'],
    category: 'Transit',
    coordinates: { x: 78, y: 72 },
  },
  {
    id: 'college-campus',
    name: 'College Campus',
    address: 'Vidya Vihar, Mumbai, MH 400077',
    distance: '1.8 km',
    distanceKm: 1.8,
    rating: 4.0,
    accessibilityScore: 71,
    accessibilityLabel: 'Partially Accessible',
    features: ['Ramps', 'Accessible Entrance'],
    category: 'Education',
    coordinates: { x: 44, y: 30 },
  },
];

export const quickDestinations = [
  { id: 'home', label: 'Home', address: 'Home Address', icon: 'Home' },
  { id: 'work', label: 'Work', address: 'Work Address', icon: 'Briefcase' },
  { id: 'hospital', label: 'Hospital', address: 'Apollo Hospital', icon: 'HeartPulse' },
  { id: 'station', label: 'Railway Station', address: 'Mumbai Central', icon: 'TrainFront' },
];

export const routeOptions: RouteOption[] = [
  {
    id: 'route-1',
    title: 'Most Accessible',
    duration: '12 min',
    durationMin: 12,
    distance: '2.1 km',
    distanceKm: 2.1,
    accessibilityRating: 5,
    accessibilityStars: 5,
    type: 'accessible',
    isRecommended: true,
    features: [
      { label: 'No stairs', type: 'good' },
      { label: 'Ramps available', type: 'good' },
      { label: 'Accessible entrance', type: 'good' },
      { label: 'Smooth sidewalks', type: 'good' },
    ],
  },
  {
    id: 'route-2',
    title: 'Fastest',
    duration: '9 min',
    durationMin: 9,
    distance: '1.8 km',
    distanceKm: 1.8,
    accessibilityRating: 3,
    accessibilityStars: 3,
    type: 'fastest',
    features: [
      { label: 'Stairs at midpoint', type: 'warning' },
      { label: 'Uneven sidewalk', type: 'warning' },
    ],
  },
  {
    id: 'route-3',
    title: 'Low Sensory',
    duration: '15 min',
    durationMin: 15,
    distance: '2.5 km',
    distanceKm: 2.5,
    accessibilityRating: 4,
    accessibilityStars: 4,
    type: 'low-sensory',
    features: [
      { label: 'Less crowded', type: 'good' },
      { label: 'Fewer crossings', type: 'good' },
      { label: 'Quiet streets', type: 'good' },
    ],
  },
];

export const routeFilters = [
  { id: 'most-accessible', label: 'Most accessible', icon: 'Accessibility' },
  { id: 'fastest', label: 'Fastest', icon: 'Zap' },
  { id: 'avoid-stairs', label: 'Avoid stairs', icon: 'ArrowUp' },
  { id: 'wheelchair-friendly', label: 'Wheelchair-friendly', icon: 'Wheelchair' },
  { id: 'low-sensory', label: 'Low sensory', icon: 'Waves' },
  { id: 'avoid-construction', label: 'Avoid construction', icon: 'Construction' },
];

export const navigationInstructions: NavigationInstruction[] = [
  { id: 'n1', text: 'Turn left in 80 m', detail: 'Use the ramp on your right', distance: '80 m', icon: 'CornerDownLeft' },
  { id: 'n2', text: 'Continue straight for 200 m', detail: 'Smooth sidewalk ahead', distance: '200 m', icon: 'ArrowUp' },
  { id: 'n3', text: 'Elevator 30 m ahead', detail: 'Accessible entrance on the left', distance: '30 m', icon: 'ArrowUp' },
  { id: 'n4', text: 'Arrive at destination', detail: 'Accessible entrance ahead', distance: '0 m', icon: 'MapPin' },
];

export const accessibilityDetails: AccessibilityFeature[] = [
  { id: 'entrance', label: 'Entrance', status: 'available', detail: 'Step-free entrance' },
  { id: 'ramps', label: 'Ramps', status: 'available', detail: 'Ramp available' },
  { id: 'elevators', label: 'Elevators', status: 'available', detail: 'Elevator available' },
  { id: 'sidewalk', label: 'Sidewalk', status: 'warning', detail: 'Narrow sidewalk for 100 m' },
  { id: 'stairs', label: 'Stairs', status: 'available', detail: 'No stairs on selected route' },
  { id: 'construction', label: 'Construction', status: 'warning', detail: 'Construction reported 200 m ahead' },
  { id: 'restrooms', label: 'Restrooms', status: 'available', detail: 'Accessible restroom available' },
];

export const reportIssueTypes = [
  { id: 'missing-ramp', label: 'Missing ramp', icon: 'Accessibility' },
  { id: 'broken-elevator', label: 'Broken elevator', icon: 'ArrowUp' },
  { id: 'blocked-sidewalk', label: 'Blocked sidewalk', icon: 'Ban' },
  { id: 'stairs', label: 'Stairs', icon: 'ArrowUp' },
  { id: 'construction', label: 'Construction', icon: 'Construction' },
  { id: 'entrance-unavailable', label: 'Accessible entrance unavailable', icon: 'DoorClosed' },
  { id: 'poor-sidewalk', label: 'Poor sidewalk condition', icon: 'Footprints' },
  { id: 'other', label: 'Other', icon: 'MoreHorizontal' },
];

export const severityLevels = [
  { id: 'low', label: 'Low', color: 'success' },
  { id: 'medium', label: 'Medium', color: 'warning' },
  { id: 'high', label: 'High', color: 'danger' },
  { id: 'emergency', label: 'Emergency', color: 'danger' },
] as const;

export const recentSearches = [
  'Mumbai Central Railway Station',
  'Apollo Hospital',
  'Phoenix Mall',
  'College Campus',
];

export const savedPlaces = [
  { id: 's1', name: 'Home', address: 'Bandra West, Mumbai', icon: 'Home' },
  { id: 's2', name: 'Work', address: 'Bandra Kurla Complex', icon: 'Briefcase' },
  { id: 's3', name: "Mom's House", address: 'Andheri East, Mumbai', icon: 'Heart' },
];

export const alerts = [
  {
    id: 'a1',
    title: 'Elevator outage at Phoenix Mall',
    detail: 'Elevator 2 reported out of service. Use Elevator 1.',
    time: '2h ago',
    severity: 'warning' as const,
  },
  {
    id: 'a2',
    title: 'New ramp installed at Mumbai Central',
    detail: 'Platform 3 now has ramp access.',
    time: '5h ago',
    severity: 'success' as const,
  },
  {
    id: 'a3',
    title: 'Construction on Linking Road',
    detail: 'Sidewalk closed between 10am–4pm.',
    time: '1d ago',
    severity: 'warning' as const,
  },
];
