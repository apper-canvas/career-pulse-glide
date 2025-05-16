import { 
  Search, MapPin, Briefcase, SlidersHorizontal, X, Upload, 
  Building2, DollarSign, Calendar, Check, Star, Smile,
  TrendingUp, Clock, Bell, Home
} from 'lucide-react';

const icons = {
  search: Search, mappin: MapPin, briefcase: Briefcase, slidershorizontal: SlidersHorizontal,
  x: X, upload: Upload, building2: Building2, dollarsign: DollarSign, calendar: Calendar,
  check: Check, star: Star, smile: Smile, trendingup: TrendingUp, clock: Clock, bell: Bell, home: Home
};

export const getIcon = (iconName) => {
  const normalizedName = iconName?.toLowerCase() || '';
  return icons[normalizedName] || Smile;
};