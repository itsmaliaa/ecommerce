export type ViewMode = 
  | 'marketplace' 
  | 'buyer_profile' 
  | 'admin_portal';

export type MarketplaceTab = 
  | 'home' 
  | 'shop' 
  | 'artists' 
  | 'artist_profile' 
  | 'gallery' 
  | 'hearts';

export interface ArtistDirectoryItem {
  id: string;
  name: string;
  artType: 'Painting' | 'Sculpture' | 'Architecture' | 'Photography' | 'Digital Art' | 'Mixed Media';
  dept: string;
  location: string;
  bio: string;
  followers: number;
  artworksCount: number;
  salesCount: number;
  rating: number;
  avatar: string;
  banner?: string;
  specialties: string[];
  sampleImages: string[];
  achievements?: {
    title: string;
    description: string;
  }[];
  memberSince?: string;
  isFollowed?: boolean;
}

export type BuyerTab = 
  | 'orders' 
  | 'addresses' 
  | 'messages' 
  | 'security' 
  | 'password'
  | 'payments';

export type AdminTab = 
  | 'dashboard' 
  | 'sales' 
  | 'art_verification' 
  | 'users_admins' 
  | 'users_students' 
  | 'users_customers' 
  | 'strikes_bans' 
  | 'student_verification_pending' 
  | 'student_verification_verified' 
  | 'audit_logs';

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  artistDept?: string;
  artistSchool?: string;
  schoolNumber?: string;
  course?: string;
  image: string;
  price: number; // in PHP ₱
  size: string;
  genre?: string;
  status: 'pending' | 'approved' | 'rejected';
  badge?: 'Trending' | 'Best Seller' | 'Popular' | 'For Sale' | 'Collector Pick' | 'New' | 'Featured' | 'Limited print';
  rating?: number;
  colors?: string[];
  description?: string;
  features?: string;
  mediumsUsed?: string;
  postedDate?: string;
  category: 'painting' | 'sculpture' | 'architecture' | 'digital' | 'photography' | 'print' | 'mixed_media';
  style?: string;
  isFavorited?: boolean;
  heartsCount?: number;
}

export interface RankedArtist {
  id: string;
  rank: number;
  name: string;
  dept: string;
  soldCount: number;
  rating: number;
  avatar: string;
  isFollowed: boolean;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  title: string;
  artist: string;
  medium: string;
  status: 'In transit' | 'Return eligible' | 'Completed';
  dateInfo: string;
  price: number;
  image: string;
}

export interface ChatMessage {
  id: string;
  sender: 'buyer' | 'seller' | 'support';
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  name: string;
  email: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  avatarBg: string;
  avatarInitials: string;
  subject: string;
  messages: ChatMessage[];
}

export interface AdminUser {
  id: string;
  name: string;
  handle: string;
  role: 'Admin' | 'Super Admin';
  status: 'Active' | 'Inactive';
}

export interface StudentUser {
  id: string;
  name: string;
  studentNumber: string;
  course: string;
  yearLevel: string;
  email: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  documentName: string;
}

export interface CustomerUser {
  id: string;
  name: string;
  handle: string;
  email: string;
  role: 'Customer';
}

export interface StrikeUser {
  id: string;
  role: 'Seller' | 'Buyer';
  account: string;
  email: string;
  strikes: number; // max 3
  status: 'Active' | 'Banned';
}

export interface AuditLogItem {
  id: string;
  datetime: string;
  action: 'Login' | 'Logout' | 'Information' | 'Verification' | 'Strike';
  actor: string;
  role: string;
  status: 'Success' | 'Warning' | 'Error';
  information: string;
}

export interface CartItem {
  artwork: Artwork;
  quantity: number;
}
