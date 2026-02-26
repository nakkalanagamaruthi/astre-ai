
import React from 'react';
import { Destination } from './types';

export const DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Kyoto',
    country: 'Japan',
    description: 'Explore the ancient temples and serene bamboo groves of Japan\'s cultural capital.',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000',
    vrImageUrl: 'https://ucarecdn.com/a83f189d-777e-463d-82c5-3a059d6e499d/', // Sample equirectangular image
    safetyScore: 9.5,
    coordinates: [35.0116, 135.7681],
    scamAlerts: ['Tourist tax confusion', 'Fake monk donation requests']
  },
  {
    id: '2',
    name: 'Santorini',
    country: 'Greece',
    description: 'Experience the stunning caldera views and whitewashed villages of the Cyclades.',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1000',
    vrImageUrl: 'https://ucarecdn.com/f044030d-2b99-4674-8b63-22858853b022/',
    safetyScore: 8.8,
    coordinates: [36.3932, 25.4615],
    scamAlerts: ['Overpriced restaurant menus', 'Unlicensed taxi operators']
  },
  {
    id: '3',
    name: 'Marrakech',
    country: 'Morocco',
    description: 'Immerse yourself in the vibrant souks and rich history of the Red City.',
    imageUrl: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&q=80&w=1000',
    vrImageUrl: 'https://ucarecdn.com/9788d6c7-3132-474f-9e32-a50d40236a21/',
    safetyScore: 7.2,
    coordinates: [31.6295, -7.9811],
    scamAlerts: ['Aggressive henna artists', 'Fake tour guide redirection']
  }
];

export const ICONS = {
  Alert: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
  ),
  Vr: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12V4"/><path d="M18 10h-2l-2 2-2-2h-2"/><path d="M12 12v8"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
  ),
  Map: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>
  ),
  Chat: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
  )
};
