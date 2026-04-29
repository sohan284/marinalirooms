export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  icon: string;
  url: string;
}

export interface FooterConfig {
  columns: FooterColumn[];
  socialLinks: FooterSocialLink[];
  copyright: string;
  bottomLinks: FooterLink[];
  mapUrl?: string;
  address?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  heroImage?: string | null;
  heroImageKey?: string | null;
  footerConfig?: Record<string, FooterConfig> | null;
}
