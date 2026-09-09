import { MemorialProfile } from '@/types/memorial';
import { GLOBAL_INITIAL_MEMORIALS } from './globalMemorials';
import { ANIMAL_HERO_MEMORIALS } from './animalMemorials';

export const INITIAL_MEMORIALS: MemorialProfile[] = [
  ...GLOBAL_INITIAL_MEMORIALS,
  ...ANIMAL_HERO_MEMORIALS,
  {
    id: 'ahmet-yilmaz',
    slug: 'ahmet-yilmaz',
    fullName: 'Ahmet Yilmaz',
    category: 'civilian',
    birthDate: 'March 18, 1948',
    deathDate: 'November 18, 2025',
    birthPlace: 'Trabzon, Turkey',
    restingPlace: 'Zincirlikuyu Sanctuary, Istanbul',
    profession: 'Master Architect & Urban Preservationist',
    lifeQuote: 'He chose to instill hope in people and leave enduring, elegant footprints on the cities he touched.',
    heroImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    biography: `Ahmet Yilmaz was born on March 18, 1948, on the Black Sea coast of Trabzon. From his early youth, he was fascinated by the craftsmanship of aged stone, timber architecture, and peaceful urban sanctuaries where communities gathered in harmony.

After graduating from Istanbul Technical University Faculty of Architecture in 1968, he dedicated his career to cultural preservation and civic architecture. In 1974, he married the love of his life, Zeliha.

Throughout his lifetime, he designed civic libraries, children's botanic sanctuaries, and public squares. He frequently shared this guidance with younger architects: "Draw a building not merely for visual splendor, but for the serenity of the souls who will live and reflect within it."`,
    candleCount: 142,
    visitedTodayCount: 18,
    privacy: 'public',
    adminEmail: 'zeynep.yilmaz@family.archive',
    importantDates: [
      {
        id: 'date-1',
        title: 'Birthday Celebration',
        date: '03-18',
        type: 'birthday',
        formattedDate: 'March 18'
      },
      {
        id: 'date-2',
        title: 'Memorial Remembrance Day',
        date: '11-18',
        type: 'anniversary',
        formattedDate: 'November 18'
      }
    ],
    todayActivity: [
      {
        id: 'act-1',
        actor: 'Mehmet Yilmaz (Son)',
        action: 'added a remembrance letter: "Father\'s first drafting desk and compass..."',
        timeAgo: '2 hours ago',
        type: 'memory'
      }
    ],
    timelineEvents: [
      {
        id: 't-1',
        year: 1948,
        date: 'March 18, 1948',
        title: 'Birth in Trabzon',
        category: 'life',
        description: 'Born in an old seaside mansion in Ortahisar, Trabzon.',
        location: 'Trabzon'
      },
      {
        id: 't-2',
        year: 1968,
        date: 'June 1968',
        title: 'Graduation with Honors',
        category: 'career',
        description: 'Graduated from Istanbul Technical University Faculty of Architecture.',
        location: 'Istanbul'
      },
      {
        id: 't-3',
        year: 1974,
        date: 'September 14, 1974',
        title: 'Marriage to Zeliha',
        category: 'milestone',
        description: 'Celebrated marriage in Istanbul, founding a lifetime of mutual devotion and art.',
        location: 'Istanbul'
      }
    ],
    gallery: [
      {
        id: 'ay-g1',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
        caption: 'Ahmet Yilmaz — Studio Portrait at the Drawing Table.',
        year: '1985',
        location: 'Istanbul Studio'
      }
    ],
    audioRecordings: [],
    videos: [],
    memories: [
      {
        id: 'm-1',
        authorName: 'Zeynep Yilmaz',
        relation: 'Daughter',
        date: 'November 18, 2025',
        content: 'Dear father, your quiet kindness, deep integrity, and unwavering love remain my greatest guiding light.',
        isApproved: true,
        isHighlighted: true,
        pinned: true
      }
    ],
    familyTree: [
      {
        id: 'ay-f1',
        name: 'Zeliha Yilmaz',
        relationType: 'spouse',
        relationLabel: 'Spouse',
        years: '1952 — Present'
      },
      {
        id: 'ay-f2',
        name: 'Zeynep Yilmaz',
        relationType: 'child',
        relationLabel: 'Daughter',
        years: '1980 — Present'
      },
      {
        id: 'ay-f3',
        name: 'Mehmet Yilmaz',
        relationType: 'child',
        relationLabel: 'Son',
        years: '1984 — Present'
      }
    ]
  }
];
