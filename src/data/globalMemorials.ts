import { MemorialProfile } from '@/types/memorial';

export const GLOBAL_INITIAL_MEMORIALS: MemorialProfile[] = [
  // 1. ALBERT EINSTEIN
  {
    id: 'albert-einstein',
    slug: 'albert-einstein',
    fullName: 'Albert Einstein',
    birthDate: 'March 14, 1879',
    deathDate: 'April 18, 1955',
    birthPlace: 'Ulm, Kingdom of Wurttemberg, Germany',
    restingPlace: 'Ashes scattered at Delaware River & Mercer Sanctuary Woods, Princeton, NJ',
    profession: 'Theoretical Physicist, Philosopher of Science & 1921 Nobel Laureate',
    lifeQuote: 'Our death is not an end if we can live on in our children and the younger generation. For they are us; our bodies are only wilted leaves on the tree of life.',
    heroImage: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
    biography: `Albert Einstein (March 14, 1879 – April 18, 1955) was a German-born theoretical physicist universally recognized as one of the greatest and most influential minds in human history. He revolutionized our understanding of space, time, gravity, and the universe with the Special and General Theories of Relativity, earning the 1921 Nobel Prize in Physics for his discovery of the law of the photoelectric effect.

Beyond his scientific triumphs, Einstein was a profound humanist, passionate pacifist, and lover of music who found peace playing his violin, 'Lina'. Believing that "the most beautiful experience we can have is the mysterious," he viewed life as an interconnected cosmic harmony.

In accordance with his explicit final will for absolute simplicity and spiritual communion with the cosmos, he requested no tombstone or monument. His ashes were peacefully scattered into the flowing waters of the Delaware River and the timeless woodland paths of the Princeton Mercer Sanctuary—dissolving back into the infinite nature he so deeply revered.`,
    candleCount: 92450,
    visitedTodayCount: 1680,
    privacy: 'public',
    isVerifiedHistoric: true,
    adminEmail: 'einstein.archive@remembered.app',
    importantDates: [
      {
        id: 'ae-1',
        title: 'Birthday (Pi Day)',
        date: '03-14',
        type: 'birthday',
        formattedDate: 'March 14, 1879'
      },
      {
        id: 'ae-2',
        title: 'Commemoration of Eternal Passing',
        date: '04-18',
        type: 'anniversary',
        formattedDate: 'April 18, 1955'
      },
      {
        id: 'ae-3',
        title: 'Annus Mirabilis (Theory of Relativity)',
        date: '09-27',
        type: 'special',
        formattedDate: 'September 27, 1905'
      }
    ],
    todayActivity: [
      {
        id: 'ae-act1',
        actor: 'Princeton Institute for Advanced Study',
        action: 'lit an eternal tribute flame honoring cosmic curiosity.',
        timeAgo: '10 mins ago',
        type: 'candle'
      },
      {
        id: 'ae-act2',
        actor: 'Max Planck Physics Society',
        action: 'certified 500 memorial trees in the Cosmos Forest Sanctuary.',
        timeAgo: '1 hour ago',
        type: 'tree'
      },
      {
        id: 'ae-act3',
        actor: '418 Researchers Worldwide',
        action: 'inscribed handwritten letters on humanism and scientific discovery.',
        timeAgo: '3 hours ago',
        type: 'memory'
      }
    ],
    timelineEvents: [
      {
        id: 'ae-t1',
        year: 1879,
        date: 'March 14, 1879',
        title: 'Birth in Ulm, Germany',
        category: 'life',
        description: 'Born to Hermann Einstein and Pauline Koch in Ulm, showing early fascination with the invisible forces of a pocket compass.',
        location: 'Ulm, Germany'
      },
      {
        id: 'ae-t2',
        year: 1905,
        date: '1905',
        title: 'Annus Mirabilis (The Miracle Year)',
        category: 'milestone',
        description: 'Published four groundbreaking papers in Annalen der Physik, formulating the photoelectric effect, Brownian motion, special relativity, and E = mc².',
        location: 'Bern, Switzerland'
      },
      {
        id: 'ae-t3',
        year: 1915,
        date: 'November 1915',
        title: 'Completion of General Relativity',
        category: 'career',
        description: 'Completed the field equations of General Relativity, demonstrating that gravity arises from the curvature of spacetime.',
        location: 'Berlin, Germany'
      },
      {
        id: 'ae-t4',
        year: 1921,
        date: '1921',
        title: 'Awarded the Nobel Prize in Physics',
        category: 'milestone',
        description: 'Awarded the 1921 Nobel Prize in Physics for his discovery of the law of the photoelectric effect.',
        location: 'Stockholm, Sweden'
      },
      {
        id: 'ae-t5',
        year: 1933,
        date: 'October 1933',
        title: 'Institute for Advanced Study at Princeton',
        category: 'career',
        description: 'Emigrated to the United States and joined the Institute for Advanced Study in Princeton, continuing work on unified field theory.',
        location: 'Princeton, New Jersey'
      },
      {
        id: 'ae-t6',
        year: 1955,
        date: 'April 18, 1955',
        title: 'Return to the Cosmos & Nature Sanctuary',
        category: 'life',
        description: 'Passed peacefully at Princeton Hospital at age 76. His ashes were scattered into the Delaware River and Mercer Sanctuary woods.',
        location: 'Princeton, New Jersey'
      }
    ],
    gallery: [
      {
        id: 'ae-g1',
        url: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
        caption: 'Archival monochrome portrait of Albert Einstein in contemplative thought (1921).',
        year: '1921',
        location: 'Vienna & Princeton',
        isDocument: false
      },
      {
        id: 'ae-g2',
        url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1400&auto=format&fit=crop',
        caption: 'The Serene Mercer Woods Sanctuary & Delaware River Path — The Infinite Perspective of Nature where Einstein walked and his ashes were scattered into the cosmos.',
        year: 'Archival Sanctuary Record',
        location: 'Mercer County & Delaware River, NJ',
        isDocument: false
      },
      {
        id: 'ae-g3',
        url: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg',
        caption: 'Albert Einstein portrait photograph during his years at Princeton.',
        year: '1947',
        location: 'Institute for Advanced Study, Princeton',
        isDocument: false
      }
    ],
    audioRecordings: [
      {
        id: 'ae-a1',
        title: 'The Common Language of Science (Archival Address)',
        speakerRelation: 'Albert Einstein',
        year: '1941',
        duration: '06:12',
        audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Atat%C3%BCrk_10th_Year_Speech.ogg',
        description: 'Original radio broadcast on science as a universal bond that unites all humanity across frontiers.'
      }
    ],
    videos: [],
    memories: [
      {
        id: 'ae-m1',
        authorName: 'J. Robert Oppenheimer',
        relation: 'Director, Institute for Advanced Study',
        date: 'April 19, 1955',
        content: 'He was almost wholly without sophistication and wholly without worldliness. There was always with him a wonderful purity at once childish and profoundly stubborn. He was dedicated to one thing: understanding the universe.',
        isApproved: true,
        isHighlighted: true,
        pinned: true
      },
      {
        id: 'ae-m2',
        authorName: 'Bertrand Russell',
        relation: 'Philosopher & Mathematician',
        date: 'April 20, 1955',
        content: 'Einstein was not only a great scientist, he was a great man. He stood for peace in a world drifting toward war; he remained sane in a world of madness; and he never compromised with evil.',
        isApproved: true,
        isHighlighted: true,
        pinned: false
      }
    ],
    familyTree: [
      {
        id: 'ae-f1',
        name: 'Hermann Einstein',
        relationType: 'father',
        relationLabel: 'Father (Featherbed Salesman & Electrical Engineer)',
        years: '1847 — 1902'
      },
      {
        id: 'ae-f2',
        name: 'Pauline Koch',
        relationType: 'mother',
        relationLabel: 'Mother (Musician & Homemaker)',
        years: '1858 — 1920'
      },
      {
        id: 'ae-f3',
        name: 'Maja Einstein',
        relationType: 'sibling',
        relationLabel: 'Sister (Literary Scholar)',
        years: '1881 — 1951'
      },
      {
        id: 'ae-f4',
        name: 'Hans Albert Einstein',
        relationType: 'child',
        relationLabel: 'Son (Professor of Hydraulic Engineering, UC Berkeley)',
        years: '1904 — 1973'
      }
    ],
    treeDonations: [
      {
        id: 'ae-tr1',
        donorName: 'Global Fellowship of Physicists & Astronomers',
        treesCount: 2500,
        organization: 'World Heritage Forest Project',
        message: 'Planted along the Princeton Mercer Woodland Sanctuary in perpetual gratitude for illuminating the cosmos.',
        donatedAt: 'March 14, 2024',
        certificateCode: 'WHF-EINSTEIN-1879'
      }
    ]
  },

  // 2. MUSTAFA KEMAL ATATURK
  {
    id: 'ataturk',
    slug: 'mustafa-kemal-ataturk',
    fullName: 'Mustafa Kemal Atatürk',
    birthDate: 'May 19, 1881',
    deathDate: 'November 10, 1938',
    birthPlace: 'Thessaloniki (Selanik)',
    restingPlace: 'Anıtkabir Mausoleum, Ankara',
    profession: 'Founding Statesman, Field Marshal & Visionary Reformer',
    lifeQuote: 'To see me does not necessarily mean to see my face. To understand my thoughts is to have seen me.',
    heroImage: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/a/a8/Ataturk1930s.jpg',
    biography: `Gazi Mustafa Kemal Atatürk (1881 – November 10, 1938) was the founding father and first President of the Republic of Turkey, a military genius, and one of the most transformative visionary reformers of the 20th century.

From Gallipoli to the War of Independence, and through comprehensive secular, educational, legal, and linguistic revolutions, he built a modern, sovereign, and forward-looking constitutional republic from the ashes of an empire.

With his enduring philosophy of "Peace at home, peace in the world," he became an inspiration for self-determination and human progress worldwide. His steadfast faith in reason, science, universal arts, and youth keeps his legacy timeless across generations.`,
    candleCount: 84320,
    visitedTodayCount: 1420,
    privacy: 'public',
    isVerifiedHistoric: true,
    adminEmail: 'heritage@remembered.app',
    importantDates: [
      {
        id: 'at-1',
        title: 'National Awakening & Youth Day',
        date: '05-19',
        type: 'birthday',
        formattedDate: 'May 19, 1881'
      },
      {
        id: 'at-2',
        title: 'Commemoration of Eternal Passing',
        date: '11-10',
        type: 'anniversary',
        formattedDate: 'November 10, 1938'
      },
      {
        id: 'at-3',
        title: 'Proclamation of the Republic',
        date: '10-29',
        type: 'special',
        formattedDate: 'October 29, 1923'
      }
    ],
    todayActivity: [
      {
        id: 'at-act1',
        actor: 'International Youth Society',
        action: 'sealed an official memorial testament and homage letter.',
        timeAgo: '15 mins ago',
        type: 'memory'
      },
      {
        id: 'at-act2',
        actor: '342 Visitors',
        action: 'lit reverence candles aligned to Anıtkabir sanctuary.',
        timeAgo: '1 hour ago',
        type: 'candle'
      },
      {
        id: 'at-act3',
        actor: 'Global Forest Conservancy',
        action: 'certified 100 memorial trees for the Atatürk Centennial Forest.',
        timeAgo: '3 hours ago',
        type: 'tree'
      }
    ],
    timelineEvents: [
      {
        id: 'at-t1',
        year: 1881,
        date: '1881',
        title: 'Birth in Thessaloniki',
        category: 'life',
        description: 'Born to Ali Riza Efendi and Zubeyde Hanim in a historical Macedonian home.',
        location: 'Thessaloniki'
      },
      {
        id: 'at-t2',
        year: 1915,
        date: '1915',
        title: 'The Gallipoli Defense & Epic Leadership',
        category: 'career',
        description: 'Commanded the Anafartalar front with legendary fortitude, altering the course of world history.',
        location: 'Gallipoli'
      },
      {
        id: 'at-t3',
        year: 1919,
        date: 'May 19, 1919',
        title: 'Landing in Samsun & Independence Dawn',
        category: 'milestone',
        description: 'Stepped ashore from the Bandirma ferry to ignite the national liberation movement.',
        location: 'Samsun'
      },
      {
        id: 'at-t4',
        year: 1923,
        date: 'October 29, 1923',
        title: 'Proclamation of the Republic of Turkey',
        category: 'milestone',
        description: 'Elected as the First President of the Republic of Turkey.',
        location: 'Ankara'
      },
      {
        id: 'at-t5',
        year: 1938,
        date: 'November 10, 1938',
        title: 'Passing into Immortality',
        category: 'life',
        description: 'Passed away at Dolmabahçe Palace in Istanbul at 09:05 AM, leaving a timeless secular republic.',
        location: 'Istanbul'
      }
    ],
    gallery: [
      {
        id: 'at-g1',
        url: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/a/a8/Ataturk1930s.jpg',
        caption: 'Mustafa Kemal Atatürk — Official historic portrait (1930s).',
        year: '1930s',
        location: 'Ankara',
        isDocument: false
      },
      {
        id: 'at-g2',
        url: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/3/36/An%C4%B1tkabir_overview.jpg',
        caption: 'Anıtkabir Mausoleum — The monumental resting sanctuary of Mustafa Kemal Atatürk in Ankara.',
        year: '1953',
        location: 'Ankara',
        isDocument: false
      },
      {
        id: 'at-g3',
        url: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/1/1b/Mustafa_Kemal_Atat%C3%BCrk%2C_1923.jpg',
        caption: 'Mustafa Kemal Atatürk during the founding era of the Republic of Turkey (1923).',
        year: '1923',
        location: 'Ankara',
        isDocument: false
      }
    ],
    audioRecordings: [
      {
        id: 'at-a1',
        title: 'Tenth Year Republic Address (10. Yil Nutku)',
        speakerRelation: 'Mustafa Kemal Atatürk',
        year: '1933',
        duration: '12:45',
        audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Atat%C3%BCrk_10th_Year_Speech.ogg',
        description: 'Historic original speech delivered at the 10th anniversary of the Republic in Ankara.'
      }
    ],
    videos: [],
    memories: [
      {
        id: 'at-m1',
        authorName: 'Lord Patrick Kinross (Biographer)',
        relation: 'British Historian & Author',
        date: 'November 10, 2025',
        content: 'Atatürk was one of the greatest constructive statesmen of the modern world. He turned a devastated empire into a vibrant, forward-looking civil nation through sheer intellectual and moral strength.',
        isApproved: true,
        isHighlighted: true,
        pinned: true
      }
    ],
    familyTree: [
      {
        id: 'at-f1',
        name: 'Ali Riza Efendi',
        relationType: 'father',
        relationLabel: 'Father (Customs Officer & Merchant)',
        years: '1839 — 1888'
      },
      {
        id: 'at-f2',
        name: 'Zubeyde Hanim',
        relationType: 'mother',
        relationLabel: 'Mother',
        years: '1857 — 1923'
      },
      {
        id: 'at-f3',
        name: 'Makbule Atadan',
        relationType: 'sibling',
        relationLabel: 'Sister',
        years: '1885 — 1956'
      }
    ],
    treeDonations: [
      {
        id: 'at-tr1',
        donorName: 'Global Centennial Fellowship',
        treesCount: 1923,
        organization: 'World Heritage Forest Project',
        message: 'A living perpetual forest celebrating timeless human progress.',
        donatedAt: 'October 29, 2023',
        certificateCode: 'WHF-ATATURK-1923'
      }
    ]
  },

  // 3. NIKOLA TESLA
  {
    id: 'nikola-tesla',
    slug: 'nikola-tesla',
    fullName: 'Nikola Tesla',
    birthDate: 'July 10, 1856',
    deathDate: 'January 7, 1943',
    birthPlace: 'Smiljan, Austrian Empire (Croatia)',
    restingPlace: 'Nikola Tesla Museum (Urn), Belgrade',
    profession: 'Futurist, Electrical Engineer & Inventor',
    lifeQuote: 'The present is theirs; the future, for which I really worked, is mine.',
    heroImage: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/7/79/Tesla_circa_1890.jpeg',
    biography: `Nikola Tesla (1856 – 1943) was a Serbian-American engineer and physicist whose visionary patents formed the foundation of modern alternating current (AC) electricity, radio communication, and wireless technologies.

A man who lived decades ahead of his time, Tesla envisioned global wireless communication, clean energy transmission, and robotics long before the digital age. He dedicated his life purely to discovery, often prioritizing humanity's advancement over commercial gain.`,
    candleCount: 52190,
    visitedTodayCount: 890,
    privacy: 'public',
    isVerifiedHistoric: true,
    adminEmail: 'tesla.archive@remembered.app',
    importantDates: [
      {
        id: 'nt-1',
        title: 'Birthday (Midnight Lightning Storm)',
        date: '07-10',
        type: 'birthday',
        formattedDate: 'July 10, 1856'
      },
      {
        id: 'nt-2',
        title: 'Passing in New Yorker Hotel',
        date: '01-07',
        type: 'anniversary',
        formattedDate: 'January 7, 1943'
      }
    ],
    todayActivity: [
      {
        id: 'nt-act1',
        actor: 'MIT Electrical Engineering Society',
        action: 'lit a tribute flame in Boston.',
        timeAgo: '45 mins ago',
        type: 'candle'
      }
    ],
    timelineEvents: [
      {
        id: 'nt-t1',
        year: 1856,
        date: 'July 10, 1856',
        title: 'Birth in Smiljan',
        category: 'life',
        description: 'Born at midnight during a fierce electrical lightning storm.',
        location: 'Smiljan'
      },
      {
        id: 'nt-t2',
        year: 1888,
        date: 'May 1888',
        title: 'AC Induction Motor Patent',
        category: 'creation',
        description: 'Patented the polyphase alternating current system alongside George Westinghouse.',
        location: 'New York, USA'
      },
      {
        id: 'nt-t3',
        year: 1901,
        date: '1901',
        title: 'Wardenclyffe Tower & Global Wireless Dream',
        category: 'milestone',
        description: 'Constructed the historic tower aiming for worldwide wireless energy and broadcast.',
        location: 'Long Island, NY'
      }
    ],
    gallery: [
      {
        id: 'nt-g1',
        url: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/7/79/Tesla_circa_1890.jpeg',
        caption: 'Nikola Tesla — Studio portrait circa 1890.',
        year: '1890'
      },
      {
        id: 'nt-g2',
        url: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/d/d4/N.Tesla.JPG',
        caption: 'Tesla seated reading Roger Boscovich in front of the spiral coil of his high-frequency transformer.',
        year: '1899'
      }
    ],
    audioRecordings: [
      {
        id: 'nt-a1',
        title: '1937 — Radio Voice Broadcast Recording',
        year: '1937',
        duration: '03:15',
        description: 'Nikola Tesla speaks on his 81st birthday regarding the future of mankind.'
      }
    ],
    videos: [],
    memories: [
      {
        id: 'nt-m1',
        authorName: 'Dr. Robert Oppenheimer',
        relation: 'Physicist',
        date: '1943',
        content: 'Tesla was one of the most generous intellects to ever illuminate our world. He lived for the dawn of tomorrow.',
        isApproved: true,
        isHighlighted: true
      }
    ],
    familyTree: [
      {
        id: 'nt-f1',
        name: 'Milutin Tesla',
        relationType: 'father',
        relationLabel: 'Father (Eastern Orthodox Priest)',
        years: '1819 — 1879'
      },
      {
        id: 'nt-f2',
        name: 'Duka Mandic',
        relationType: 'mother',
        relationLabel: 'Mother (Home Crafts Inventor)',
        years: '1822 — 1892'
      }
    ]
  },

  // 4. MARIE CURIE
  {
    id: 'marie-curie',
    slug: 'marie-curie',
    fullName: 'Marie Sklodowska Curie',
    birthDate: 'November 7, 1867',
    deathDate: 'July 4, 1934',
    birthPlace: 'Warsaw, Poland',
    restingPlace: 'Pantheon, Paris, France',
    profession: 'Pioneering Physicist, Chemist & Double Nobel Laureate',
    lifeQuote: 'Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.',
    heroImage: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/c/c8/Marie_Curie_c._1920s.jpg',
    biography: `Marie Sklodowska Curie (1867 – 1934) was a Polish-French physicist and chemist who conducted pioneering research on radioactivity. 

She remains the first woman to win a Nobel Prize, the first person to win Nobel Prizes in two distinct scientific fields (Physics 1903, Chemistry 1911), and the first female professor at the University of Paris.

Her discovery of Polonium and Radium revolutionized physics, medicine, and cancer treatments, forever altering human scientific destiny with unparalleled courage.`,
    candleCount: 46210,
    visitedTodayCount: 680,
    privacy: 'public',
    isVerifiedHistoric: true,
    adminEmail: 'curie.heritage@remembered.app',
    importantDates: [
      {
        id: 'mc-1',
        title: 'Nobel Prize in Physics',
        date: '12-10',
        type: 'special',
        formattedDate: 'December 10, 1903'
      }
    ],
    todayActivity: [
      {
        id: 'mc-act1',
        actor: 'Sorbonne University Physics Lab',
        action: 'placed virtual white lilies on her Pantheon memorial registry.',
        timeAgo: '2 hours ago',
        type: 'flower'
      }
    ],
    timelineEvents: [
      {
        id: 'mc-t1',
        year: 1867,
        date: 'November 7, 1867',
        title: 'Birth in Warsaw',
        category: 'life',
        description: 'Born Maria Sklodowska in Warsaw, Poland during the partitioned era.',
        location: 'Warsaw'
      },
      {
        id: 'mc-t2',
        year: 1898,
        date: '1898',
        title: 'Discovery of Radium and Polonium',
        category: 'creation',
        description: 'Isolated two new radioactive elements alongside Pierre Curie in a modest laboratory workshop.',
        location: 'Paris'
      },
      {
        id: 'mc-t3',
        year: 1914,
        date: '1914',
        title: 'Petites Curies (WW1 Mobile X-Ray Units)',
        category: 'milestone',
        description: 'Equipped mobile radiological ambulances, aiding over a million wounded soldiers on the frontlines.',
        location: 'France'
      }
    ],
    gallery: [
      {
        id: 'mc-g1',
        url: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/c/c8/Marie_Curie_c._1920s.jpg',
        caption: 'Marie Curie — Nobel Laureate portrait.',
        year: '1920s'
      },
      {
        id: 'mc-g2',
        url: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/7/71/Marie_Curie_at_Sorbonne.jpg',
        caption: 'Marie Curie in her Laboratory at the University of Paris (Sorbonne).',
        year: '1912'
      }
    ],
    audioRecordings: [],
    videos: [],
    memories: [
      {
        id: 'mc-m1',
        authorName: 'Albert Einstein',
        relation: 'Colleague & Lifelong Friend',
        date: '1934',
        content: 'Marie Curie is, of all celebrated beings, the only one whom fame has not corrupted.',
        isApproved: true,
        isHighlighted: true
      }
    ],
    familyTree: [
      {
        id: 'mc-f1',
        name: 'Pierre Curie',
        relationType: 'spouse',
        relationLabel: 'Husband & Nobel Laureate',
        years: '1859 — 1906'
      },
      {
        id: 'mc-f2',
        name: 'Irene Joliot-Curie',
        relationType: 'child',
        relationLabel: 'Daughter & Nobel Laureate',
        years: '1897 — 1956'
      }
    ]
  },

  // 5. BARIS MANCO
  {
    id: 'baris-manco',
    slug: 'baris-manco',
    fullName: 'Barış Manço',
    birthDate: 'January 2, 1943',
    deathDate: 'February 1, 1999',
    birthPlace: 'Moda, Istanbul',
    restingPlace: 'Kanlica Cemetery, Istanbul',
    profession: 'Cultural Ambassador, Composer, Songwriter & Global Traveler',
    lifeQuote: 'The first language a human being must learn is the language of kindness and empathy.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Baris_Manco.jpg',
    biography: `Barış Manço (1943 – 1999) was one of the most beloved musical pioneers of Turkey, founder of Anatolian Rock, State Artist, and an ambassador of world harmony.

With immortal compositions such as 'Gulpembe', 'Donence', 'Arkadasim Esek', and 'Daglar Daglar', he touched millions of hearts. Through his legendary international broadcast program '7 to 77', he traveled to more than 150 nations, bringing the world together with warmth and humanity.`,
    candleCount: 29480,
    visitedTodayCount: 420,
    privacy: 'public',
    isVerifiedHistoric: true,
    adminEmail: 'manco.heritage@remembered.app',
    importantDates: [
      {
        id: 'bm-1',
        title: 'Birthday Commemoration',
        date: '01-02',
        type: 'birthday',
        formattedDate: 'January 2, 1943'
      },
      {
        id: 'bm-2',
        title: 'Passing to Eternity',
        date: '02-01',
        type: 'anniversary',
        formattedDate: 'February 1, 1999'
      }
    ],
    todayActivity: [
      {
        id: 'bm-act1',
        actor: 'Kadıköy & Moda Memorial Fellowship',
        action: 'lit a live remembrance candle at the Manço House Archive.',
        timeAgo: '1 hour ago',
        type: 'candle'
      }
    ],
    timelineEvents: [
      {
        id: 'bm-t1',
        year: 1943,
        date: 'January 2, 1943',
        title: 'Birth in Moda',
        category: 'life',
        description: 'Born in Istanbul to Rikkat Uyanık and İsmail Hakkı Manço.',
        location: 'Istanbul'
      },
      {
        id: 'bm-t2',
        year: 1970,
        date: '1970',
        title: 'Daglar Daglar & Golden Record',
        category: 'career',
        description: 'Released the landmark single uniting Anatolian folk modalities with progressive rock.',
        location: 'Istanbul'
      },
      {
        id: 'bm-t3',
        year: 1988,
        date: 'October 1988',
        title: 'Launch of 7 to 77 Television Series',
        category: 'milestone',
        description: 'Began the longest-running world travel, youth, and peace education documentary program.',
        location: 'Worldwide'
      }
    ],
    gallery: [
      {
        id: 'bm-g1',
        url: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Baris_Manco.jpg',
        caption: 'Barış Manço archival portrait in traditional rings, silver medallions and long hair (1985).',
        year: '1985',
        location: 'Istanbul'
      },
      {
        id: 'bm-g2',
        url: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Bar%C4%B1%C5%9F_Man%C3%A7o_cropped.JPG',
        caption: 'Barış Manço performing live on stage with Kurtalan Ekspres.',
        year: 'Concert Archive',
        location: 'Anatolian Tour'
      },
      {
        id: 'bm-g3',
        url: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1200&auto=format&fit=crop',
        caption: 'Moda House Piano & Composition Sanctuary.',
        year: 'Memorial Archive',
        location: 'Kadıköy, Istanbul'
      }
    ],
    audioRecordings: [
      {
        id: 'bm-a1',
        title: '1995 — Parables, Music & Wisdom for Children',
        year: '1995',
        duration: '04:20',
        description: 'Closing address and philosophical reflections from the 7 to 77 broadcast archives.'
      }
    ],
    videos: [],
    memories: [
      {
        id: 'bm-m1',
        authorName: 'Lale Manço',
        relation: 'Spouse',
        date: 'February 1, 2025',
        content: 'Baris was not merely an artist; he was a soul whose greatest wealth was genuine love for humanity. The warmth he left behind remains vibrant across generations.',
        isApproved: true,
        isHighlighted: true,
        pinned: true
      }
    ],
    familyTree: [
      {
        id: 'bm-f1',
        name: 'Rikkat Uyanık',
        relationType: 'mother',
        relationLabel: 'Mother (Classical Vocal Master)',
        years: '1921 — 1992'
      },
      {
        id: 'bm-f2',
        name: 'Lale Manço',
        relationType: 'spouse',
        relationLabel: 'Spouse & Heritage Guardian',
        years: '1954 — Present'
      }
    ]
  },

  // 6. LEONARDO DA VINCI
  {
    id: 'leonardo-da-vinci',
    slug: 'leonardo-da-vinci',
    fullName: 'Leonardo da Vinci',
    birthDate: 'April 15, 1452',
    deathDate: 'May 2, 1519',
    birthPlace: 'Vinci, Republic of Florence (Italy)',
    restingPlace: 'Chateau d Amboise, France',
    profession: 'Renaissance Polymath, Painter, Anatomist & Visionary Engineer',
    lifeQuote: 'Learning never exhausts the mind. As a well-spent day brings happy sleep, so a life well spent brings happy death.',
    heroImage: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/b/ba/Leonardo_self.jpg',
    biography: `Leonardo di ser Piero da Vinci (1452 – 1519) was the quintessential Renaissance genius whose unquenchable curiosity and inventive imagination remain unmatched in human history.

Master of painting (Mona Lisa, The Last Supper), pioneer of flight concepts, hydraulic engineering, cartography, and human anatomy; Leonardo unified art and science into a single pursuit of universal truth.`,
    candleCount: 71200,
    visitedTodayCount: 940,
    privacy: 'public',
    isVerifiedHistoric: true,
    adminEmail: 'davinci.archive@remembered.app',
    importantDates: [],
    todayActivity: [],
    timelineEvents: [
      {
        id: 'ldv-t1',
        year: 1452,
        date: 'April 15, 1452',
        title: 'Birth in Vinci',
        category: 'life',
        description: 'Born in Tuscan hills near Florence.',
        location: 'Vinci, Italy'
      },
      {
        id: 'ldv-t2',
        year: 1503,
        date: '1503',
        title: 'Mona Lisa Commenced',
        category: 'creation',
        description: 'Began painting the portrait of Lisa Gherardini with pioneering sfumato technique.',
        location: 'Florence'
      }
    ],
    gallery: [
      {
        id: 'ldv-g1',
        url: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/b/ba/Leonardo_self.jpg',
        caption: 'Leonardo da Vinci — Self-portrait (circa 1512).',
        year: '1512'
      }
    ],
    audioRecordings: [],
    videos: [],
    memories: [],
    familyTree: []
  },

  // 7. FRIDA KAHLO
  {
    id: 'frida-kahlo',
    slug: 'frida-kahlo',
    fullName: 'Frida Kahlo',
    birthDate: 'July 6, 1907',
    deathDate: 'July 13, 1954',
    birthPlace: 'Coyoacan, Mexico City',
    restingPlace: 'La Casa Azul (Urn), Mexico City',
    profession: 'Painter, Surrealist Icon & Feminist Cultural Beacon',
    lifeQuote: 'Feet, what do I need you for when I have wings to fly?',
    heroImage: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/0/06/Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg',
    biography: `Magdalena Carmen Frida Kahlo y Calderon (1907 – 1954) transformed deep physical pain, personal tragedy, and passionate love into unforgettable, raw artistic masterpieces.

Her vibrant self-portraits, celebrated globally at La Casa Azul, explore identity, resilience, Mexican folk culture, and the transcendent strength of the human soul.`,
    candleCount: 38940,
    visitedTodayCount: 510,
    privacy: 'public',
    isVerifiedHistoric: true,
    adminEmail: 'kahlo.heritage@remembered.app',
    importantDates: [],
    todayActivity: [],
    timelineEvents: [],
    gallery: [],
    audioRecordings: [],
    videos: [],
    memories: [],
    familyTree: []
  },

  // 8. ALAN TURING
  {
    id: 'alan-turing',
    slug: 'alan-turing',
    fullName: 'Alan Turing',
    birthDate: 'June 23, 1912',
    deathDate: 'June 7, 1954',
    birthPlace: 'London, United Kingdom',
    restingPlace: 'Woking Crematorium, Surrey, UK',
    profession: 'Father of Modern Computing, Cryptanalyst & Mathematician',
    lifeQuote: 'Sometimes it is the people no one imagines anything of who do the things that no one can imagine.',
    heroImage: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg',
    biography: `Alan Mathison Turing (1912 – 1954) was a British mathematician, logician, and codebreaker whose work at Bletchley Park cracking the Enigma cipher helped shorten World War II by years, saving millions of lives.

His theoretical formulation of the Turing Machine and the Turing Test established the foundational pillars of modern computer science and artificial intelligence.`,
    candleCount: 42100,
    visitedTodayCount: 620,
    privacy: 'public',
    isVerifiedHistoric: true,
    adminEmail: 'turing.archive@remembered.app',
    importantDates: [],
    todayActivity: [],
    timelineEvents: [],
    gallery: [],
    audioRecordings: [],
    videos: [],
    memories: [],
    familyTree: []
  },

  // 9. ASIK VEYSEL
  {
    id: 'asik-veysel',
    slug: 'asik-veysel-satiroglu',
    fullName: 'Âşık Veysel Şatıroğlu',
    birthDate: 'October 25, 1894',
    deathDate: 'March 21, 1973',
    birthPlace: 'Sivrialan, Şarkışla, Sivas',
    restingPlace: 'Sivrialan Village, Sivas',
    profession: 'Folk Bard, Master of the Saz & Poet of Universal Humanity',
    lifeQuote: 'I walk a long and narrow road, journeying day and night.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Asik_Veysel.jpg',
    biography: `Âşık Veysel Şatıroğlu (1894 – 1973) lost his eyesight to smallpox in early childhood, yet saw the universe through his inner spirit and the acoustic resonance of the saz.

His timeless poetic anthems — including 'My Faithful Lover is the Black Earth', 'Let Friends Remember Me', and 'I Walk a Long and Narrow Road' — stand as monumental pillars of human humility, ecological kinship, and spiritual grace.`,
    candleCount: 31200,
    visitedTodayCount: 390,
    privacy: 'public',
    isVerifiedHistoric: true,
    adminEmail: 'veysel.archive@remembered.app',
    importantDates: [],
    todayActivity: [],
    timelineEvents: [],
    gallery: [],
    audioRecordings: [],
    videos: [],
    memories: [],
    familyTree: []
  },

  // 10. NELSON MANDELA
  {
    id: 'nelson-mandela',
    slug: 'nelson-mandela',
    fullName: 'Nelson Rolihlahla Mandela',
    birthDate: 'July 18, 1918',
    deathDate: 'December 5, 2013',
    birthPlace: 'Mvezo, South Africa',
    restingPlace: 'Qunu, Eastern Cape, South Africa',
    profession: 'Anti-Apartheid Leader, Statesman & Nobel Peace Laureate',
    lifeQuote: 'It always seems impossible until it is done. Education is the most powerful weapon which you can use to change the world.',
    heroImage: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/0/02/Nelson_Mandela_1994.jpg',
    biography: `Nelson Mandela (1918 – 2013), affectionately known as Madiba, was a revolutionary who spent 27 years imprisoned on Robben Island for opposing racial segregation, only to emerge without bitterness to unite a fractured nation as South Africa's first democratically elected president.`,
    candleCount: 58900,
    visitedTodayCount: 780,
    privacy: 'public',
    isVerifiedHistoric: true,
    adminEmail: 'mandela.archive@remembered.app',
    importantDates: [],
    todayActivity: [],
    timelineEvents: [],
    gallery: [],
    audioRecordings: [],
    videos: [],
    memories: [],
    familyTree: []
  },

  // 11. ABRAHAM LINCOLN
  {
    id: 'abraham-lincoln',
    slug: 'abraham-lincoln',
    fullName: 'Abraham Lincoln',
    birthDate: 'February 12, 1809',
    deathDate: 'April 15, 1865',
    birthPlace: 'Hodgenville, Kentucky, USA',
    restingPlace: 'Lincoln Tomb, Oak Ridge Cemetery, Illinois, USA',
    profession: '16th President of the United States, Emancipator & Statesman',
    lifeQuote: 'In the end, it is not the years in your life that count. It is the life in your years.',
    heroImage: 'https://wsrv.nl/?url=upload.wikimedia.org/wikipedia/commons/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg',
    biography: `Abraham Lincoln (1809 – 1865) preserved the Union during the American Civil War and issued the historic Emancipation Proclamation, forever ending slavery in the United States with profound moral eloquence.`,
    candleCount: 41200,
    visitedTodayCount: 460,
    privacy: 'public',
    isVerifiedHistoric: true,
    adminEmail: 'lincoln.archive@remembered.app',
    importantDates: [],
    todayActivity: [],
    timelineEvents: [],
    gallery: [],
    audioRecordings: [],
    videos: [],
    memories: [],
    familyTree: []
  }
];
