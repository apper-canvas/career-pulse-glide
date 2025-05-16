import * as Icons from 'lucide-react';

  Search, MapPin, Briefcase, SlidersHorizontal, X, Upload, Building2, DollarSign, Calendar, Check, Star
  return (Icons[iconName] && typeof Icons[iconName] === 'function') 
    ? Icons[iconName] 
    : Icons.Smile;
};
    case 'Star':
      return Star;