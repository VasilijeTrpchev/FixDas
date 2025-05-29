export interface ChatInterface {
  loggedUserId: string;
  id: string;
  userToChatWith: string;
  role: string;
  specialty: string;
  photoUrl: string;
  timestamp: string;
  messages: Message[];
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export interface TopRatedHandyman {
  specialtyColorBadge: string;
  id: string;
  user: string;
  specialty: string;
  city: string;
  rating: number;
  img: string;
}

export interface NewlyJoinedHandyman {
  id: string;
  name: string;
  specialty: string;
  img: string;
}

export interface TestimonialsType {
  id: string;
  img: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  repairImages: string[];
}

export type KundeFeedback = {
  id: number;
  kundeName: string;
  kundeCity: string;
  kundeRating: number;
  kundeComment: string;
  kundeImg: string;
};
export interface AvailableHandyman {
  id: number;
  user: string;
  specialty: string[];
  city: string;
  zipCode: string;
  rating: number;
  img: string;
  coordinates: { lat: number; lng: number };
  description: string;
  finishedJobsImgs: string[];
  kundeFeedback: KundeFeedback[];
  availableToBook: AvailableTime[];
}
export type AvailableTime = {
  date: string;
  timeSlots: string[];
};
export type HandymanReviews = {
  id: number;
  reviewer: string;
  rating: number;
  comment: string;
};

export interface ClientPosts {
  id: number;
  loggedUserId: string;
  category: string;
  description: string;
  city: string;
  createdAt: string;
  status: string;
  img: string;
  clientImgs: string[];
}

export interface LoggedUser {
  id: string;
  loggedUserId: string;
  currUserName: string;
  currUserEmail: string;
  currUserPhone: string;
  currUserPhotoUrl: string;
  currUserCity: string;
}

export interface PostUserInfo {
  currUserName: string;
  currUserPhotoUrl: string;
  currUserCity: string;
}

export interface UserInfo {
  loggedUserId: string;
  currUserName: string;
  currUserEmail: string;
  currUserPhone: string;
  currUserPhotoUrl: string;
  currUserCity: string;
  id: string;
}

export interface bookedClients {
  handymanId: number;
  handymanName: string;
  handymanImg: string;
  loggedUserId: string;
  date: string;
  time: string;
  description: string;
  city: string;
  id: number;
  status: string;
  specialty: string[];
  coordinates: { lat: number; lng: number };
}
