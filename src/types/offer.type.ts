export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Location;
};

export type Offer = {
  id: string;
  title: string;
  type: 'apartment' | 'room' | 'house' | 'hotel';
  price: number;
  rating: number;
  isPremium: boolean;
  isFavorite: boolean;
  previewImage: string;
  images: string[];
  city: City;
  location: Location;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  description: string;
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
};
