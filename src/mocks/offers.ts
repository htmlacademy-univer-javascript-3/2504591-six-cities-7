import { Offer } from '@/types';

const amsterdamLocation = {
  latitude: 52.35514938496378,
  longitude: 4.673877537499948,
  zoom: 8,
};

const cologneLocation = {
  latitude: 50.938361,
  longitude: 6.959974,
  zoom: 8,
};

const brusselsLocation = {
  latitude: 50.846557,
  longitude: 4.351697,
  zoom: 8,
};

export const offers: Offer[] = [
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    rating: 4,
    isPremium: false,
    isFavorite: false,
    previewImage: 'https://url-to-image/image.png',
    images: [
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/apartment-small-03.jpg',
    ],
    city: { name: 'Amsterdam', location: amsterdamLocation },
    location: amsterdamLocation,
    bedrooms: 3,
    maxAdults: 4,
    goods: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Kitchen'],
    description:
      'A quiet cozy and picturesque apartment near the river in the heart of Amsterdam. The historic building is surrounded by the city’s best cafes and attractions.',
    host: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
  },
  {
    id: 'a1fb2f6b-9dce-4c5c-bb87-003ac09de341',
    title: 'Wood and stone place',
    type: 'room',
    price: 80,
    rating: 4.2,
    isPremium: false,
    isFavorite: true,
    previewImage: 'img/room-small.jpg',
    images: ['img/room.jpg', 'img/studio-01.jpg', 'img/apartment-02.jpg'],
    city: { name: 'Amsterdam', location: amsterdamLocation },
    location: {
      latitude: 52.367,
      longitude: 4.895,
      zoom: 8,
    },
    bedrooms: 1,
    maxAdults: 2,
    goods: ['Wi-Fi', 'Heating', 'Coffee machine'],
    description:
      'A warm and comfortable room with charming wooden details, located a short walk from Amsterdam’s canals.',
    host: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
  },
  {
    id: '9947d7f6-a8ae-4eb0-902c-fca0ca8cff6e',
    title: 'White castle',
    type: 'apartment',
    price: 180,
    rating: 5,
    isPremium: false,
    isFavorite: false,
    previewImage: 'img/apartment-small-04.jpg',
    images: ['img/apartment-01.jpg', 'img/apartment-03.jpg', 'img/room.jpg'],
    city: { name: 'Cologne', location: cologneLocation },
    location: {
      latitude: 50.938,
      longitude: 6.96,
      zoom: 8,
    },
    bedrooms: 2,
    maxAdults: 3,
    goods: ['Wi-Fi', 'Dishwasher', 'Towels', 'Fridge'],
    description:
      'A bright, spacious apartment in a quiet Cologne neighborhood, with easy access to the city center.',
    host: {
      name: 'Laura',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
  },
  {
    id: '357a4be1-395f-46b0-ae54-a3f87d991293',
    title: 'Modern apartment in the city center',
    type: 'apartment',
    price: 95,
    rating: 3.9,
    isPremium: true,
    isFavorite: false,
    previewImage: 'img/studio-01.jpg',
    images: ['img/studio-01.jpg', 'img/apartment-02.jpg', 'img/room.jpg'],
    city: { name: 'Brussels', location: brusselsLocation },
    location: {
      latitude: 50.847,
      longitude: 4.352,
      zoom: 8,
    },
    bedrooms: 1,
    maxAdults: 2,
    goods: ['Wi-Fi', 'Kitchen', 'Heating', 'Coffee machine'],
    description:
      'A thoughtfully designed studio close to Brussels’ museums, restaurants, and public transport.',
    host: {
      name: 'Daniel',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
  },
];
