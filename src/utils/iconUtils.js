import { 
  Search, MapPin, Briefcase, SlidersHorizontal, X, Upload, 
  Building2, DollarSign, Calendar, Check, Star, Smile,
  TrendingUp, Clock, Bell, Home, User, Settings, FileBadge,
  GraduationCap, Building, Mail, Phone, Globe, Trash2, FileText, Linkedin, Github
} from 'lucide-react';

const icons = {
  search: Search, mappin: MapPin, briefcase: Briefcase, slidershorizontal: SlidersHorizontal,
  x: X, upload: Upload, building2: Building2, dollarsign: DollarSign, calendar: Calendar,
  check: Check, star: Star, smile: Smile, trendingup: TrendingUp, clock: Clock, bell: Bell, home: Home,
  user: User, settings: Settings, filebadge: FileBadge, graduationcap: GraduationCap, building: Building, mail: Mail, phone: Phone, globe: Globe, trash2: Trash2, filetext: FileText, linkedin: Linkedin, github: Github
};

export const getIcon = (iconName) => {
  const normalizedName = iconName?.toLowerCase() || '';
  return icons[normalizedName] || Smile;
};