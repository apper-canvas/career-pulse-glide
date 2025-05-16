import { 
  Search, MapPin, Briefcase, SlidersHorizontal, X, Upload, 
  Building2, DollarSign, Calendar, Check, Star, Smile,
  TrendingUp, Clock, Bell, Home, User, Settings, FileBadge,
  GraduationCap, Building, Mail, Phone, Globe, Trash2, FileText, Linkedin, Github
} from 'lucide-react';

// Create a mapping of icon names to their components
const icons = {
  search: Search, 
  mappin: MapPin, 
  briefcase: Briefcase, 
  slidershorizontal: SlidersHorizontal,
  x: X, 
  upload: Upload, 
  building2: Building2, 
  dollarsign: DollarSign, 
  calendar: Calendar,
  check: Check, 
  star: Star, 
  smile: Smile, 
  trendingup: TrendingUp, 
  clock: Clock, 
  bell: Bell, 
  home: Home,
  user: User, 
  settings: Settings, 
  filebadge: FileBadge, 
  graduationcap: GraduationCap, 
  building: Building, 
  mail: Mail, 
  phone: Phone, 
  globe: Globe, 
  trash2: Trash2, 
  filetext: FileText, 
  linkedin: Linkedin, 
  github: Github,
  // Add custom SVG icons here
  lock: ({ className, ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
    </svg>
  ),
  userplus: ({ className, ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  )
};

// Function to get an icon by name
export const getIcon = (iconName) => {
  const normalizedName = iconName?.toLowerCase() || '';
  return icons[normalizedName] || Smile;
};