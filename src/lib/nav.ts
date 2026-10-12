// Sitewide nav — the inner-page header and the landing page both read these,
// so edit them here to change nav content/order everywhere.

export interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

export const mainNav: NavItem[] = [
  { href: '/blog',    label: 'KAWA BLOG' },
  { href: 'https://kawadesign.bigcartel.com', label: 'STORE', external: true },
  { href: '/contact', label: 'STAY IN TOUCH' },
];

export const extrasNav: NavItem[] = [
  { href: '/map',       label: 'MAP OVERVIEW' },
  { href: '/guestbook', label: 'GUESTBOOK' },
  { href: '/portfolio', label: 'PORTFOLIO' },
  { href: '/photo-inker', label: 'PHOTO INKER' },
  { href: '/glyphy', label: 'GLYPHY' },
];
