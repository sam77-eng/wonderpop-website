export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  color: string;
  accentColor: string;
  category: string;
  modelType: 
    | 'techSolutions' 
    | 'webDesign' 
    | 'webDev' 
    | 'appDev' 
    | 'fullStack' 
    | 'uiux' 
    | 'graphicDesign' 
    | 'socialMedia' 
    | 'metaAds' 
    | 'googleAds' 
    | 'seo'
    | 'branding' 
    | 'videoEditing' 
    | 'photography' 
    | 'contentCreation';
  tags: string[];
}

export interface Founder {
  name: string;
  role: string;
  phone: string;
  phoneClean: string;
  whatsappUrl: string;
  email: string;
  bio: string;
  accentColor: string;
  shirtColor: string;
  hairColor: string;
  skills: string[];
}

export interface StatItem {
  value: string;
  numericValue: number;
  suffix?: string;
  label: string;
  subtext: string;
}
