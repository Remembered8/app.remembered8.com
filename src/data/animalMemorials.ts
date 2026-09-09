import { MemorialProfile } from '@/types/memorial';

export const ANIMAL_HERO_MEMORIALS: MemorialProfile[] = [
  // 1. PROTEO
  {
    id: 'proteo-k9',
    slug: 'proteo-k9',
    fullName: 'Proteo (Heroic Search & Rescue K-9)',
    birthDate: '2013',
    deathDate: 'February 10, 2023',
    birthPlace: 'Mexico',
    restingPlace: 'SEDENA Military Honor Gardens (Mexico City) & Memorial Statue in Adıyaman',
    profession: 'Military Search & Rescue Specialist & Fallen Earthquake Hero',
    lifeQuote: 'You completed your mission with honor, dear friend; until your final breath, you never gave up on lives buried beneath the rubble.',
    heroImage: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=800',
    biography: `During the catastrophic 2023 Kahramanmaraş and Adıyaman earthquakes, German Shepherd Proteo deployed to Turkey with the Mexican Secretariat of National Defense (SEDENA) Urban Search and Rescue detachment. Amid sub-zero temperatures and unstable ruins, Proteo successfully located and helped save three trapped civilians and one rescue personnel.

On February 10, 2023, while scouring a collapsed multi-story structure in Adıyaman, he was mortally injured when heavy structural debris gave way. His handler, Corporal Carlos Viveros Márquez, along with international emergency crews, stood in tearful salute. Proteo’s remains were repatriated to Mexico aboard a military aircraft with full military honors. Parks, veterinary facilities, and bronze monuments now stand in Mexico and Turkey to immortalize his noble sacrifice.`,
    candleCount: 88400,
    visitedTodayCount: 1420,
    privacy: 'public',
    isVerifiedHistoric: true,
    category: 'animal_companion',
    species: 'Search & Rescue Canine (K-9)',
    breed: 'German Shepherd',
    honorTitle: 'Fallen Earthquake Hero & SEDENA Medal of Honor',
    adminEmail: 'proteo.archive@remembered.app',
    importantDates: [
      {
        id: 'pr-d1',
        title: 'Deployment to Turkey Earthquake Ground Zero',
        date: '02-08',
        type: 'special',
        formattedDate: 'February 8, 2023'
      },
      {
        id: 'pr-d2',
        title: 'Sacrifice in Adıyaman & Transition to Eternity',
        date: '02-10',
        type: 'anniversary',
        formattedDate: 'February 10, 2023'
      }
    ],
    todayActivity: [
      {
        id: 'pr-act1',
        actor: 'International Search & Rescue League',
        action: 'illuminated a memorial vigil torch saluting Proteo’s devotion.',
        timeAgo: '15 minutes ago',
        type: 'candle'
      }
    ],
    timelineEvents: [
      {
        id: 'pr-t1',
        year: 2013,
        date: '2013',
        title: 'Birth & Induction into SEDENA K-9 Division',
        category: 'life',
        description: 'Completed rigorous urban disaster search certification with distinction under the Mexican Military Command.',
        location: 'Mexico City, Mexico'
      },
      {
        id: 'pr-t2',
        year: 2023,
        date: 'February 2023',
        title: 'Mission in Turkey & Ultimate Sacrifice',
        category: 'milestone',
        description: 'Successfully located 3 trapped survivors before sustaining mortal injuries during search operations in Adıyaman.',
        location: 'Adıyaman, Turkey'
      }
    ],
    gallery: [
      {
        id: 'pr-g1',
        url: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=800',
        caption: 'Proteo — On duty as a heroic international search and rescue K-9.',
        year: '2023'
      }
    ],
    audioRecordings: [],
    videos: [],
    memories: [
      {
        id: 'pr-m1',
        authorName: 'Corporal Carlos Viveros Márquez',
        relation: 'K-9 Handler & Lifelong Partner',
        date: 'February 10, 2023',
        content: 'You never surrendered, Proteo. You fulfilled your duty as a soldier and saved precious human lives. You will never be forgotten.',
        isApproved: true
      },
      {
        id: 'pr-m2',
        authorName: 'Earthquake Survivor Family from Adıyaman',
        relation: 'Grateful Citizens',
        date: 'February 15, 2023',
        content: 'You gave your life so our loved ones could breathe again. The people of this land will forever honor your noble paws.',
        isApproved: true
      }
    ],
    familyTree: []
  },

  // 2. HACHIKO
  {
    id: 'hachiko',
    slug: 'hachiko',
    fullName: 'Hachikō (The Faithful Akita of Shibuya)',
    birthDate: 'November 10, 1923',
    deathDate: 'March 8, 1935',
    birthPlace: 'Ōdate, Akita Prefecture, Japan',
    restingPlace: 'Aoyama Cemetery (beside Prof. Ueno) & Bronze Memorial at Shibuya Station, Tokyo',
    profession: 'Universal Symbol of Loyalty & Eternal Devotion',
    lifeQuote: 'True devotion defies time, death, and absence. Waiting is love in its purest, most sacred form.',
    heroImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800',
    biography: `Hachikō was the cherished Akita companion of Hidesaburō Ueno, a professor of agriculture at Tokyo Imperial University. Every morning, Hachikō accompanied the professor to Shibuya Station, returning every afternoon to greet his master at the ticket gate.

In May 1925, Professor Ueno suffered a fatal cerebral hemorrhage during a lecture and never returned. For the next nine years, nine months, and fifteen days, Hachikō returned to Shibuya Station every single day precisely when the train was due, waiting patiently through snow, rain, and heat. Hachikō’s steadfast vigil captivated Japan and the world, becoming the enduring universal benchmark of unbroken fidelity.`,
    candleCount: 96200,
    visitedTodayCount: 1850,
    privacy: 'public',
    isVerifiedHistoric: true,
    category: 'animal_companion',
    species: 'Canine Companion',
    breed: 'Akita Inu (Golden/White)',
    honorTitle: 'The Faithful Dog of Shibuya • National Treasure of Japan',
    adminEmail: 'hachiko.archive@remembered.app',
    importantDates: [
      {
        id: 'h-d1',
        title: 'Beginning of the 10-Year Vigil at Shibuya',
        date: '05-21',
        type: 'special',
        formattedDate: 'May 21, 1925'
      },
      {
        id: 'h-d2',
        title: 'Passing into Eternal Reunion',
        date: '03-08',
        type: 'anniversary',
        formattedDate: 'March 8, 1935'
      }
    ],
    todayActivity: [
      {
        id: 'h-act1',
        actor: 'Tokyo Civic Commemoration Society',
        action: 'placed memorial cherry blossoms at Shibuya Station statue.',
        timeAgo: '1 hour ago',
        type: 'candle'
      }
    ],
    timelineEvents: [
      {
        id: 'h-t1',
        year: 1923,
        date: 'Nov 1923',
        title: 'Birth on a Farm in Ōdate',
        category: 'life',
        description: 'Adopted by Professor Hidesaburō Ueno and brought to Shibuya, Tokyo.',
        location: 'Akita, Japan'
      },
      {
        id: 'h-t2',
        year: 1925,
        date: 'May 1925',
        title: 'The Great Vigil Commences',
        category: 'milestone',
        description: 'Following Professor Ueno’s sudden passing, Hachikō began his daily vigil at the train exit.',
        location: 'Shibuya Station, Tokyo'
      },
      {
        id: 'h-t3',
        year: 1934,
        date: 'April 1934',
        title: 'Erection of the Bronze Statue',
        category: 'milestone',
        description: 'A bronze statue was unveiled in his presence outside Shibuya Station, attended by thousands.',
        location: 'Tokyo, Japan'
      }
    ],
    gallery: [
      {
        id: 'h-g1',
        url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800',
        caption: 'Hachikō sitting peacefully near Shibuya Station, circa 1930s.',
        year: '1934'
      }
    ],
    audioRecordings: [],
    videos: [],
    memories: [
      {
        id: 'h-m1',
        authorName: 'Hirokichi Saito',
        relation: 'President of Nihon Ken Hozonkai',
        date: 'October 4, 1932',
        content: 'This faithful dog reminds humanity of the purest bond: selfless, unwavering loyalty that outlasts life itself.',
        isApproved: true
      }
    ],
    familyTree: []
  },

  // 3. LAIKA
  {
    id: 'laika-space',
    slug: 'laika-space',
    fullName: 'Laika (Pioneer of the Cosmos)',
    birthDate: '1954',
    deathDate: 'November 3, 1957',
    birthPlace: 'Moscow, Soviet Union',
    restingPlace: 'Orbit of Planet Earth (Sputnik 2) & Star City Cosmonaut Monument, Moscow',
    profession: 'First Living Creature to Orbit Planet Earth & Cosmic Pioneer',
    lifeQuote: 'The stars belong to the silent pioneers who paved humanity’s way with innocence and grace.',
    heroImage: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800',
    biography: `A calm and resilient stray rescued from the freezing winter streets of Moscow, Laika was selected for humanity's historic Sputnik 2 mission. On November 3, 1957, she became the very first living earthling to venture into the vacuum of space and enter Earth orbit.

Her vital biomedical telemetry proved that living organisms could survive the launch stress and microgravity environment of spaceflight. Although 1950s technology lacked the capability for a safe atmospheric reentry, Laika’s brave and tragic voyage ignited global contemplation on ethics, gratitude, and the moral responsibilities humanity owes to all non-human companions. Today, a bronze monument depicting Laika standing atop a rocket rocket nozzle stands near the Military Medical Institute in Moscow.`,
    candleCount: 94100,
    visitedTodayCount: 1610,
    privacy: 'public',
    isVerifiedHistoric: true,
    category: 'animal_companion',
    species: 'Cosmic Pioneer Canine',
    breed: 'Siberian Husky & Terrier Mix',
    honorTitle: 'Pioneer of the Cosmos • Hero of Space Exploration',
    adminEmail: 'laika.archive@remembered.app',
    importantDates: [
      {
        id: 'l-d1',
        title: 'Launch of Sputnik 2 into Earth Orbit',
        date: '11-03',
        type: 'anniversary',
        formattedDate: 'November 3, 1957'
      }
    ],
    todayActivity: [
      {
        id: 'l-act1',
        actor: 'Astronomical Heritage Registry',
        action: 'lit an eternal constellation candle in tribute to Laika.',
        timeAgo: '42 minutes ago',
        type: 'candle'
      }
    ],
    timelineEvents: [
      {
        id: 'l-t1',
        year: 1957,
        date: 'November 3, 1957',
        title: 'First Living Creature in Earth Orbit',
        category: 'milestone',
        description: 'Launched aboard Sputnik 2, proving that higher organisms can endure spaceflight telemetry.',
        location: 'Baikonur / Low Earth Orbit'
      }
    ],
    gallery: [
      {
        id: 'l-g1',
        url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800',
        caption: 'Laika during training preparations for the Sputnik 2 orbital mission.',
        year: '1957'
      }
    ],
    audioRecordings: [],
    videos: [],
    memories: [
      {
        id: 'l-m1',
        authorName: 'Dr. Vladimir Yazdovsky',
        relation: 'Lead Flight Surgeon & Scientist',
        date: 'November 1957',
        content: 'Laika was quiet and charming. Before taking her to the launch site, I took her home to play with my children. I wanted to do something nice for her.',
        isApproved: true
      }
    ],
    familyTree: []
  },

  // 4. BALTO
  {
    id: 'balto-alaska',
    slug: 'balto-alaska',
    fullName: 'Balto (Lead Dog of the Serum Run)',
    birthDate: '1919',
    deathDate: 'March 14, 1933',
    birthPlace: 'Nome, Alaska, USA',
    restingPlace: 'Central Park Bronze Memorial (New York City) & Cleveland Museum of Natural History',
    profession: 'Arctic Sled Lead Dog & 1925 Great Race of Mercy Hero',
    lifeQuote: 'Dedicated to the indomitable spirit of the sled dogs that relayed antitoxin through rough ice across treacherous waters.',
    heroImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800',
    biography: `In January 1925, a deadly diphtheria epidemic broke out among the children of isolated Nome, Alaska. With blizzards grounding all aircraft and freezing the Bering Sea, the only hope for survival was a 674-mile dog sled relay through blizzard winds reaching -60°F (-51°C).

Balto led Gunnar Kaasen’s team on the harrowing final 53-mile leg through whiteout blizzard conditions along the Topkok River and into Nome. Guided entirely by scent and instinct when Kaasen was blinded by the blizzard, Balto delivered the life-saving antitoxin at 5:30 AM on February 2, 1925, halting the epidemic and saving hundreds of children. In December 1925, a bronze statue was unveiled in New York's Central Park bearing the inscription: "Endurance • Fidelity • Intelligence."`,
    candleCount: 71200,
    visitedTodayCount: 980,
    privacy: 'public',
    isVerifiedHistoric: true,
    category: 'animal_companion',
    species: 'Sled Dog',
    breed: 'Siberian Husky',
    honorTitle: 'Savior of Nome • Central Park Hero',
    adminEmail: 'balto.archive@remembered.app',
    importantDates: [
      {
        id: 'b-d1',
        title: 'Arrival of Antitoxin Serum into Nome, Alaska',
        date: '02-02',
        type: 'special',
        formattedDate: 'February 2, 1925'
      }
    ],
    todayActivity: [],
    timelineEvents: [
      {
        id: 'b-t1',
        year: 1925,
        date: 'Feb 1925',
        title: 'Final Leg of the 1925 Great Race of Mercy',
        category: 'milestone',
        description: 'Successfully navigated blinded whiteouts to deliver diphtheria antitoxin to Dr. Curtis Welch.',
        location: 'Nome, Alaska'
      }
    ],
    gallery: [
      {
        id: 'b-g1',
        url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Balto_1925.jpg',
        caption: 'Balto photographed in Alaska immediately after completing the serum delivery.',
        year: '1925'
      }
    ],
    audioRecordings: [],
    videos: [],
    memories: [],
    familyTree: []
  },

  // 5. TOGO
  {
    id: 'togo-sled-hero',
    slug: 'togo-sled-hero',
    fullName: 'Togo (Champion Lead Dog & Arctic Legend)',
    birthDate: 'October 17, 1913',
    deathDate: 'December 5, 1929',
    birthPlace: 'Nome, Alaska, USA',
    restingPlace: 'Iditarod Trail Sled Dog Museum (Wasilla, Alaska) & Seward Park Statue, NYC',
    profession: 'Master Arctic Lead Dog & Endurance Record Bearer',
    lifeQuote: 'He ran not for glory or acclaim, but because he loved the trail and trusted his musher through breaking sea ice.',
    heroImage: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&q=80&w=800',
    biography: `Togo was the indomitable lead sled dog of legendary musher Leonhard Seppala. During the 1925 Nome Serum Run, while other teams covered an average of 31 miles, Togo and Seppala tackled the most perilous section of the entire route: 260 treacherous miles across the shifting, fractured sea ice of Norton Sound in 85 mph gale winds and -85°F windchill.

At 12 years old, Togo saved his entire team when an ice floe broke loose, leaping across open ocean water to pull the towline ashore. Historians and mushing experts revere Togo as the true endurance champion of the Great Race of Mercy. In 2011, Time Magazine officially named Togo the most heroic animal in human history.`,
    candleCount: 84300,
    visitedTodayCount: 1120,
    privacy: 'public',
    isVerifiedHistoric: true,
    category: 'animal_companion',
    species: 'Sled Dog',
    breed: 'Seppala Siberian Sleddog',
    honorTitle: 'True Master of the 1925 Serum Run • Time Most Heroic Animal',
    adminEmail: 'togo.archive@remembered.app',
    importantDates: [
      {
        id: 'tg-d1',
        title: 'Crossing of the Fractured Norton Sound Ice',
        date: '01-31',
        type: 'special',
        formattedDate: 'January 31, 1925'
      }
    ],
    todayActivity: [],
    timelineEvents: [
      {
        id: 'tg-t1',
        year: 1925,
        date: 'January 1925',
        title: 'The 260-Mile Norton Sound Expedition',
        category: 'milestone',
        description: 'Led Seppala’s team across the longest and most hazardous leg of the Serum Run.',
        location: 'Norton Sound, Alaska'
      }
    ],
    gallery: [
      {
        id: 'tg-g1',
        url: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&q=80&w=800',
        caption: 'Togo resting alongside Leonhard Seppala after the historic Arctic trek.',
        year: '1925'
      }
    ],
    audioRecordings: [],
    videos: [],
    memories: [
      {
        id: 'tg-m1',
        authorName: 'Leonhard Seppala',
        relation: 'Master Musher & Lifelong Companion',
        date: '1929',
        content: 'I never had a better dog than Togo. His stamina, loyalty, and intelligence could not be equaled. Togo was the best dog that ever walked the Alaskan trail.',
        isApproved: true
      }
    ],
    familyTree: []
  },

  // 6. CHER AMI
  {
    id: 'cher-ami',
    slug: 'cher-ami',
    fullName: 'Cher Ami (Heroic WWI Carrier Pigeon)',
    birthDate: '1918',
    deathDate: 'June 13, 1919',
    birthPlace: 'United Kingdom / France',
    restingPlace: 'Smithsonian National Museum of American History, Washington, D.C.',
    profession: 'World War I Signal Corps Homing Pigeon & Decorated Lifesaver',
    lifeQuote: 'Through shrapnel and gunfire, one tiny heartbeat carried the salvation of 194 besieged soldiers.',
    heroImage: 'https://images.unsplash.com/photo-1522858547137-f1dcec554f55?auto=format&fit=crop&q=80&w=800',
    biography: `During the Meuse-Argonne Offensive in October 1918, 550 men of the U.S. 77th Infantry Division (the "Lost Battalion") became trapped behind German lines with no food, water, or ammunition, and came under friendly artillery fire by mistake.

Major Charles Whittlesey dispatched Cher Ami with a desperate message strapped to her leg: "We are along the road paralell 276.4. Our artillery is dropping a barrage directly on us. For heavens sake stop it." As she took flight, German troops opened fire. Blasted out of the sky, blinded in one eye, and shot through the breast with her right leg dangling by a single tendon, Cher Ami took flight again and flew 25 miles in 25 minutes. She delivered the message, the barrage ceased, and 194 surviving soldiers were saved. She was awarded the French Croix de Guerre with Palm.`,
    candleCount: 65100,
    visitedTodayCount: 890,
    privacy: 'public',
    isVerifiedHistoric: true,
    category: 'animal_companion',
    species: 'Carrier Homing Pigeon',
    breed: 'Racing Homer',
    honorTitle: 'Croix de Guerre with Palm • Hero of the Lost Battalion',
    adminEmail: 'cherami.archive@remembered.app',
    importantDates: [
      {
        id: 'ca-d1',
        title: 'Historic Flight in the Argonne Forest',
        date: '10-04',
        type: 'anniversary',
        formattedDate: 'October 4, 1918'
      }
    ],
    todayActivity: [],
    timelineEvents: [
      {
        id: 'ca-t1',
        year: 1918,
        date: 'Oct 4, 1918',
        title: 'Saving the Lost Battalion',
        category: 'milestone',
        description: 'Flew 25 miles under intense fire despite severe wounds, stopping friendly artillery fire and rescuing 194 soldiers.',
        location: 'Meuse-Argonne, France'
      }
    ],
    gallery: [
      {
        id: 'ca-g1',
        url: 'https://images.unsplash.com/photo-1522858547137-f1dcec554f55?auto=format&fit=crop&q=80&w=800',
        caption: 'Cher Ami preserved and honored at the Smithsonian Institution.',
        year: '1919'
      }
    ],
    audioRecordings: [],
    videos: [],
    memories: [],
    familyTree: []
  },

  // 7. CORPORAL WOJTEK
  {
    id: 'wojtek-bear',
    slug: 'wojtek-bear',
    fullName: 'Corporal Wojtek (The Soldier Bear)',
    birthDate: '1942',
    deathDate: 'December 2, 1963',
    birthPlace: 'Hamadan, Iran',
    restingPlace: 'Princes Street Gardens Bronze Memorial (Edinburgh, Scotland) & Imperial War Museum',
    profession: 'Enlisted Soldier of the Polish II Corps & Monte Cassino Veteran',
    lifeQuote: 'A gentle giant who shared the soldiers’ rations, raised their morale, and carried artillery shells into battle.',
    heroImage: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=800',
    biography: `Wojtek was an orphaned Syrian brown bear cub adopted in Iran in 1942 by soldiers of the Polish II Corps. To allow him onto British transport ships, he was officially enlisted as a private in the 22nd Artillery Supply Company, complete with military rank, serial number, and paybook.

During the bloody Battle of Monte Cassino in Italy in 1944, Wojtek stepped forward under heavy bombardment, mimicking human soldiers by carrying 100-pound crates of 25-pounder artillery shells to the firing batteries without ever dropping a single one. In honor of his bravery, the Polish high command made an emblem of a bear carrying an artillery shell the official official insignia of the 22nd Artillery Company. Wojtek retired with the rank of Corporal to Edinburgh Zoo, visited frequently by his fellow veterans.`,
    candleCount: 78900,
    visitedTodayCount: 1250,
    privacy: 'public',
    isVerifiedHistoric: true,
    category: 'animal_companion',
    species: 'Military War Mascot & Soldier',
    breed: 'Syrian Brown Bear',
    honorTitle: 'Corporal of the Polish II Corps • Monte Cassino Artillery Veteran',
    adminEmail: 'wojtek.archive@remembered.app',
    importantDates: [
      {
        id: 'wj-d1',
        title: 'Heroic Supply Action at Battle of Monte Cassino',
        date: '05-18',
        type: 'special',
        formattedDate: 'May 18, 1944'
      }
    ],
    todayActivity: [],
    timelineEvents: [
      {
        id: 'wj-t1',
        year: 1944,
        date: 'May 1944',
        title: 'Artillery Operations at Monte Cassino',
        category: 'milestone',
        description: 'Transported heavy ammunition crates to frontline artillery batteries under artillery fire.',
        location: 'Monte Cassino, Italy'
      }
    ],
    gallery: [
      {
        id: 'wj-g1',
        url: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=800',
        caption: 'Corporal Wojtek pictured during his wartime military service in Italy.',
        year: '1944'
      }
    ],
    audioRecordings: [],
    videos: [],
    memories: [],
    familyTree: []
  },

  // 8. TOMBILI
  {
    id: 'tombili-kadikoy',
    slug: 'tombili-kadikoy',
    fullName: 'Tombili (The Philosophic Street Cat of Kadikoy)',
    birthDate: '2006',
    deathDate: 'August 1, 2016',
    birthPlace: 'Ziverbey, Kadıköy, Istanbul, Turkey',
    restingPlace: 'Güleç Street Bronze Statue, Kadıköy, Istanbul',
    profession: 'Beloved Mascot of Istanbul & Emblem of Urban Serenity',
    lifeQuote: 'You will live forever in our hearts, great master of street contemplation and quiet neighborhood harmony.',
    heroImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800',
    biography: `Tombili was a chubby, friendly community cat who lived in the Ziverbey neighborhood of Kadıköy, Istanbul. She won the hearts of local residents and international millions when a photograph of her leaning casually against the sidewalk curb—resting her front paw like a contemplative neighborhood elder—went viral worldwide.

When Tombili passed away on August 1, 2016, a change.org petition gathered 17,000 signatures. Kadıköy Mayor Aykurt Nuhoğlu commissioned sculptor Seval Şahin to cast a life-sized bronze sculpture of Tombili resting in her exact iconic pose on the very sidewalk stone where she used to greet passersby. Today, visitors from across the world leave cat food, flowers, and gentle pats at her monument in Kadıköy.`,
    candleCount: 92400,
    visitedTodayCount: 1540,
    privacy: 'public',
    isVerifiedHistoric: true,
    category: 'animal_companion',
    species: 'Feline Companion',
    breed: 'Anatolian Tabby Cat',
    honorTitle: 'Iconic Cat of Kadıköy • Symbol of Istanbul Street Fellowship',
    adminEmail: 'tombili.archive@remembered.app',
    importantDates: [
      {
        id: 'tb-d1',
        title: 'Unveiling of the Bronze Monument on World Animal Day',
        date: '10-04',
        type: 'special',
        formattedDate: 'October 4, 2016'
      }
    ],
    todayActivity: [],
    timelineEvents: [
      {
        id: 'tb-t1',
        year: 2016,
        date: 'Oct 4, 2016',
        title: 'Inauguration of Bronze Sculpture in Ziverbey',
        category: 'milestone',
        description: 'Erected on Güleç Street to preserve the gentle spirit of stray animals in Istanbul.',
        location: 'Kadıköy, Istanbul'
      }
    ],
    gallery: [
      {
        id: 'tb-g1',
        url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800',
        caption: 'Tombili captured in her iconic contemplative pose in Kadıköy.',
        year: '2015'
      }
    ],
    audioRecordings: [],
    videos: [],
    memories: [],
    familyTree: []
  },

  // 9. GLI
  {
    id: 'gli-hagiasophia',
    slug: 'gli-hagiasophia',
    fullName: 'Gli (The Guardian Cat of Hagia Sophia)',
    birthDate: '2004',
    deathDate: 'November 7, 2020',
    birthPlace: 'Hagia Sophia, Istanbul, Turkey',
    restingPlace: 'Courtyard Garden of Hagia Sophia, Istanbul',
    profession: 'Resident Mascot & 16-Year Beloved Guardian of Hagia Sophia',
    lifeQuote: 'Under the domes of sixteen centuries, you welcomed kings, presidents, and wandering travelers with quiet purrs and emerald eyes.',
    heroImage: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=800',
    biography: `Gli was born in 2004 beneath the ancient imperial arches of Hagia Sophia and spent all sixteen years of her life roaming its marble halls and sunlit mosaics. With her cross-eyed green gaze, warm personality, and regal composure, she became one of the most famous and photographed felines in the world.

In 2009, when U.S. President Barack Obama and Turkish leaders toured Hagia Sophia, Gli stepped out onto the imperial marble to be gently stroked, smiling for world headlines. When Gli passed away in November 2020 at the age of 16, she was officially laid to rest with deep respect in the peaceful courtyard gardens of Hagia Sophia itself.`,
    candleCount: 89300,
    visitedTodayCount: 1380,
    privacy: 'public',
    isVerifiedHistoric: true,
    category: 'animal_companion',
    species: 'Feline Companion',
    breed: 'European Shorthair (Green-Eyed Tabby)',
    honorTitle: 'Eternal Resident of Hagia Sophia',
    adminEmail: 'gli.archive@remembered.app',
    importantDates: [
      {
        id: 'gl-d1',
        title: 'Peaceful Burial in Hagia Sophia Courtyard',
        date: '11-08',
        type: 'anniversary',
        formattedDate: 'November 8, 2020'
      }
    ],
    todayActivity: [],
    timelineEvents: [
      {
        id: 'gl-t1',
        year: 2009,
        date: 'April 2009',
        title: 'Global Greeting at Hagia Sophia',
        category: 'milestone',
        description: 'Welcomed world leaders and visitors under the grand domes of Istanbul.',
        location: 'Istanbul, Turkey'
      }
    ],
    gallery: [
      {
        id: 'gl-g1',
        url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=800',
        caption: 'Gli sitting gracefully inside the grand hall of Hagia Sophia.',
        year: '2019'
      }
    ],
    audioRecordings: [],
    videos: [],
    memories: [],
    familyTree: []
  },

  // 10. BARRY DER MENSCHENRETTER
  {
    id: 'barry-stbernard',
    slug: 'barry-stbernard',
    fullName: 'Barry der Menschenretter (The Great Lifesaver of the Alps)',
    birthDate: '1800',
    deathDate: '1814',
    birthPlace: 'Great St Bernard Hospice, Valais, Switzerland',
    restingPlace: 'Natural History Museum of Bern & Monument at Cimetière des Chiens, Paris',
    profession: 'Alpine Avalanche Search & Rescue Dog (40+ Rescues)',
    lifeQuote: 'He saved forty men from the snow; may humanity honor the silent guardian who knew no fear in the face of the mountain.',
    heroImage: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&q=80&w=800',
    biography: `Barry was a legendary rescue dog working with the Augustinian monks at the Great St Bernard Hospice, situated 8,100 feet up in the perilous Swiss-Italian Alps. During his fourteen years on duty through blizzard passes and avalanches, Barry personally saved the lives of more than 40 lost travelers.

His most celebrated rescue occurred when he discovered a small child frozen unconscious in an avalanche cavern. Barry licked the child until warmth returned, then gently carried the boy on his back across the mountain drifts to the safety of the monastery. A monument honoring him at the Cimetière des Chiens in Paris bears the inscription: "Il sauva la vie à 40 personnes. Il fut tué par le 41ème" (He saved the lives of 40 people).`,
    candleCount: 67800,
    visitedTodayCount: 760,
    privacy: 'public',
    isVerifiedHistoric: true,
    category: 'animal_companion',
    species: 'Alpine Rescue Dog',
    breed: 'St. Bernard (Alpine Mastiff)',
    honorTitle: 'The Lifesaver of the Great St. Bernard Pass',
    adminEmail: 'barry.archive@remembered.app',
    importantDates: [
      {
        id: 'br-d1',
        title: 'Child Rescue from Alpine Avalanche',
        date: '03-12',
        type: 'special',
        formattedDate: 'March 12, 1805'
      }
    ],
    todayActivity: [],
    timelineEvents: [
      {
        id: 'br-t1',
        year: 1805,
        date: 'Winter 1805',
        title: 'Historic Avalanche Rescue',
        category: 'milestone',
        description: 'Located and revived a child buried under mountain drifts, carrying him to the Hospice monks.',
        location: 'Great St. Bernard Pass, Switzerland'
      }
    ],
    gallery: [
      {
        id: 'br-g1',
        url: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&q=80&w=800',
        caption: 'Barry der Menschenretter preserved at the Natural History Museum of Bern.',
        year: '1814'
      }
    ],
    audioRecordings: [],
    videos: [],
    memories: [],
    familyTree: []
  },

  // 11. FIDO
  {
    id: 'fido-italy',
    slug: 'fido-italy',
    fullName: 'Fido (Italy’s 14-Year Symbol of Eternal Fidelity)',
    birthDate: '1941',
    deathDate: 'June 9, 1958',
    birthPlace: 'Luco di Mugello, Florence, Italy',
    restingPlace: 'Borgo San Lorenzo Cemetery (beside Carlo Soriani) & Bronze Monument, Florence',
    profession: 'Italian Symbol of Loyalty & Devotion (5,000-Day Bus Stop Vigil)',
    lifeQuote: 'To wait without doubt or despair; love remains pure even when war and time steal everything away.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Statua_del_cane_Fido.jpg',
    biography: `In 1941, brick kiln worker Carlo Soriani found an injured puppy on a roadside ditch in Borgo San Lorenzo, Tuscany, took him home, nursed him to health, and named him Fido ("Faithful"). Every afternoon, Fido would walk to the central village square to wait for Carlo's bus returning from the kiln.

On December 30, 1943, Allied bombs struck the factory in Borgo San Lorenzo, killing Carlo. Fido waited at the bus stop that evening, but his master never stepped off. For the next 14 years—more than 5,000 consecutive days—Fido walked to the bus stop every afternoon, watching each passenger disembark before heading home alone. In 1957, the Mayor of Borgo San Lorenzo awarded Fido a gold medal and unveiled a bronze monument in the public square while Fido was still alive.`,
    candleCount: 74200,
    visitedTodayCount: 940,
    privacy: 'public',
    isVerifiedHistoric: true,
    category: 'animal_companion',
    species: 'Canine Companion',
    breed: 'White & Brown Italian Mixed Breed',
    honorTitle: 'Gold Medal of Fidelity • National Symbol of Italy',
    adminEmail: 'fido.archive@remembered.app',
    importantDates: [
      {
        id: 'fd-d1',
        title: 'Conferral of the Gold Medal of Civic Fidelity',
        date: '11-09',
        type: 'special',
        formattedDate: 'November 9, 1957'
      }
    ],
    todayActivity: [],
    timelineEvents: [
      {
        id: 'fd-t1',
        year: 1943,
        date: 'Dec 30, 1943',
        title: 'Commencement of the 14-Year Vigil',
        category: 'milestone',
        description: 'Began his daily vigil at the bus stop following the wartime bombing of Borgo San Lorenzo.',
        location: 'Luco di Mugello, Italy'
      }
    ],
    gallery: [
      {
        id: 'fd-g1',
        url: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Statua_del_cane_Fido.jpg',
        caption: 'The bronze monument of Fido overlooking the square in Borgo San Lorenzo.',
        year: '1957'
      }
    ],
    audioRecordings: [],
    videos: [],
    memories: [],
    familyTree: []
  },

  // 12. SERGEANT STUBBY
  {
    id: 'sergeant-stubby',
    slug: 'sergeant-stubby',
    fullName: 'Sergeant Stubby (The Decorated War Dog of World War I)',
    birthDate: '1916',
    deathDate: 'March 16, 1926',
    birthPlace: 'New Haven, Connecticut, USA',
    restingPlace: 'Smithsonian National Museum of American History, Washington, D.C.',
    profession: 'Only Dog Promoted to Sergeant through Combat • 102nd Infantry Regiment Veteran',
    lifeQuote: 'A stray from the Yale campus who captured spies, warned of poison gas, and comforted wounded soldiers on seventeen battlefields.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Sergeant_Stubby.jpg',
    biography: `A stray Boston Terrier mix wandering around the Yale University grounds in 1917, Stubby was adopted by Corporal Robert Conroy of the 102nd Infantry, 26th (Yankee) Division, and smuggled aboard a troopship to France.

Stubby served in 17 battles across four major offensives on the Western Front. With his keen senses, he warned his unit of incoming mustard gas attacks and quiet nighttime artillery bombardments before humans could hear them, located wounded soldiers in No Man's Land, and single-handedly captured a German spy by biting the seat of his pants until soldiers arrived. For his battlefield heroics, Stubby was promoted to the rank of Sergeant—the first canine to achieve combat rank in U.S. history. He was presented with a gold medal by General John J. Pershing and met three sitting U.S. Presidents.`,
    candleCount: 82500,
    visitedTodayCount: 1110,
    privacy: 'public',
    isVerifiedHistoric: true,
    category: 'animal_companion',
    species: 'Military Combat Dog',
    breed: 'Boston Terrier Mix',
    honorTitle: 'Sergeant of the 102nd Infantry • Most Decorated War Dog',
    adminEmail: 'stubby.archive@remembered.app',
    importantDates: [
      {
        id: 'st-d1',
        title: 'Promotion to Sergeant for Battlefield Valor',
        date: '04-20',
        type: 'special',
        formattedDate: 'April 20, 1918'
      }
    ],
    todayActivity: [],
    timelineEvents: [
      {
        id: 'st-t1',
        year: 1918,
        date: '1918',
        title: 'Service Across 17 Battles in France',
        category: 'milestone',
        description: 'Warned doughboys of gas attacks, comforted the wounded, and secured combat promotion.',
        location: 'Western Front, France'
      }
    ],
    gallery: [
      {
        id: 'st-g1',
        url: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Sergeant_Stubby.jpg',
        caption: 'Sergeant Stubby wearing his custom uniform with battle medals and insignia.',
        year: '1919'
      }
    ],
    audioRecordings: [],
    videos: [],
    memories: [],
    familyTree: []
  },

  // 13. BOB THE STREET CAT
  {
    id: 'street-cat-bob',
    slug: 'street-cat-bob',
    fullName: 'Bob the Cat (A Street Cat Named Bob)',
    birthDate: '2006',
    deathDate: 'June 15, 2020',
    birthPlace: 'London, England, United Kingdom',
    restingPlace: 'Islington Green Bronze Statue, London, United Kingdom',
    profession: 'Inspirational Companion & International Symbol of Hope and Redemption',
    lifeQuote: 'He gave me a reason to get up every morning and look forward to the day. He saved my life, plain and simple.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/A_Street_Cat_Named_Bob_London_film_premiere_%28cropped%29.jpg',
    biography: `In 2007, James Bowen was an injured, homeless recovering addict busking on the streets of Covent Garden in London. When he found an abandoned, wounded ginger cat in the hallway of his supported housing, Bowen spent his last money on antibiotics to nurse the cat back to health and named him Bob.

When Bob refused to leave his side—riding on James's shoulders and sitting quietly on his guitar case as he busked—the inseparable duo captured the heart of London. Bowen wrote the bestselling memoir "A Street Cat Named Bob," which was adapted into an award-winning feature film. Bob inspired millions of people around the world recovering from addiction, grief, and homelessness. In July 2021, a bronze memorial bench sculpture of Bob was unveiled at Islington Green in London.`,
    candleCount: 88700,
    visitedTodayCount: 1470,
    privacy: 'public',
    isVerifiedHistoric: true,
    category: 'animal_companion',
    species: 'Feline Companion',
    breed: 'Ginger Tabby Cat',
    honorTitle: 'Savior and Muse • Islington Green Bronze Memorial',
    adminEmail: 'bob.archive@remembered.app',
    importantDates: [
      {
        id: 'bb-d1',
        title: 'Unveiling of Islington Green Memorial Bench',
        date: '07-15',
        type: 'special',
        formattedDate: 'July 15, 2021'
      }
    ],
    todayActivity: [],
    timelineEvents: [
      {
        id: 'bb-t1',
        year: 2007,
        date: 'March 2007',
        title: 'Fateful Encounter in London',
        category: 'life',
        description: 'James Bowen and Bob formed an unbreakable bond on the streets of Covent Garden.',
        location: 'London, UK'
      }
    ],
    gallery: [
      {
        id: 'bb-g1',
        url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/A_Street_Cat_Named_Bob_London_film_premiere_%28cropped%29.jpg',
        caption: 'Bob the Cat attending his film premiere in London.',
        year: '2016'
      }
    ],
    audioRecordings: [],
    videos: [],
    memories: [
      {
        id: 'bb-m1',
        authorName: 'James Bowen',
        relation: 'Partner & Author',
        date: 'June 2020',
        content: 'Bob saved my life. It’s as simple as that. He gave me so much more than companionship. With him at my side, I found a direction and that purpose that I’d been missing.',
        isApproved: true
      }
    ],
    familyTree: []
  },

  // 14. DIESEL
  {
    id: 'diesel-raid',
    slug: 'diesel-raid',
    fullName: 'Diesel (French RAID Tactical Assault K-9 Hero)',
    birthDate: '2008',
    deathDate: 'November 18, 2015',
    birthPlace: 'France',
    restingPlace: 'RAID National Police Headquarters Memorial, Bièvres, France',
    profession: 'Elite Tactical Police K-9 & Dickin Medal Recipient',
    lifeQuote: 'Shielding fellow officers by stepping into the breach; valor knows no distinction of species.',
    heroImage: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=1200&auto=format&fit=crop',
    biography: `Diesel was a 7-year-old Belgian Malinois serving with RAID (Recherche, Assistance, Intervention, Dissuasion), the elite anti-terrorist tactical unit of the French National Police. She was an assault and explosives detection specialist with five years of frontline operational experience.

On November 18, 2015, during the Saint-Denis counter-terrorism raid following the Paris attacks, RAID officers were pinned down by gunfire in a barricaded apartment. Diesel was sent ahead to assess booby traps and armed suspects, drawing fire and shielding her handler and team from hidden explosives and ambush. She was mortally wounded during the assault. For her supreme gallantry in the line of duty, the UK's PDSA awarded Diesel the Dickin Medal, the highest military honor for animal valor in the world.`,
    candleCount: 71600,
    visitedTodayCount: 920,
    privacy: 'public',
    isVerifiedHistoric: true,
    category: 'animal_companion',
    species: 'Tactical Assault K-9',
    breed: 'Belgian Malinois',
    honorTitle: 'PDSA Dickin Medal of Gallantry • French Police Medal of Honor',
    adminEmail: 'diesel.archive@remembered.app',
    importantDates: [
      {
        id: 'ds-d1',
        title: 'Heroic Action during Saint-Denis Raid',
        date: '11-18',
        type: 'anniversary',
        formattedDate: 'November 18, 2015'
      }
    ],
    todayActivity: [],
    timelineEvents: [
      {
        id: 'ds-t1',
        year: 2015,
        date: 'Nov 18, 2015',
        title: 'Counter-Terrorism Operation in Saint-Denis',
        category: 'milestone',
        description: 'Shielded tactical assault officers and exposed ambush emplacements before falling in action.',
        location: 'Paris, France'
      }
    ],
    gallery: [
      {
        id: 'ds-g1',
        url: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=1200&auto=format&fit=crop',
        caption: 'Belgian Malinois K-9 — Representative of Diesel’s tactical discipline and courage.',
        year: '2015'
      }
    ],
    audioRecordings: [],
    videos: [],
    memories: [],
    familyTree: []
  },

  // 15. GREYFRIARS BOBBY
  {
    id: 'greyfriars-bobby',
    slug: 'greyfriars-bobby',
    fullName: 'Greyfriars Bobby (Scotland’s 14-Year Kirkyard Guardian)',
    birthDate: 'May 4, 1855',
    deathDate: 'January 14, 1872',
    birthPlace: 'Midlothian, Scotland, United Kingdom',
    restingPlace: 'Greyfriars Kirkyard (near John Gray’s grave) & Candlemaker Row Bronze Fountain, Edinburgh',
    profession: 'Legendary Scottish Symbol of Devotion & City Ward of Edinburgh',
    lifeQuote: 'Let his loyalty and devotion be a lesson to us all.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Greyfriars_Bobby_statue_Edinburgh.jpg',
    biography: `Greyfriars Bobby was a Skye Terrier in 19th-century Edinburgh who belonged to John Gray, a night watchman for the Edinburgh City Police. When John Gray died of tuberculosis in 1858 and was buried in Greyfriars Kirkyard, Bobby refused to abandon the site.

For fourteen years until his own death in 1872, Bobby kept constant watch over his master's grave through Scottish winter freezes and rains, leaving only once a day for a meal at John Traill’s coffee house when the One O'Clock Gun fired from Edinburgh Castle. When dog licensing laws threatened Bobby's safety in 1867, the Lord Provost of Edinburgh, Sir William Chambers, personally paid for his dog license and presented Bobby with an engraved brass collar making him an official ward of the city. A bronze fountain statue at Candlemaker Row preserves Bobby's beloved legacy.`,
    candleCount: 86400,
    visitedTodayCount: 1190,
    privacy: 'public',
    isVerifiedHistoric: true,
    category: 'animal_companion',
    species: 'Canine Companion',
    breed: 'Skye Terrier',
    honorTitle: 'Ward of the City of Edinburgh • Symbol of Scottish Fidelity',
    adminEmail: 'bobby.archive@remembered.app',
    importantDates: [
      {
        id: 'gb-d1',
        title: 'Lord Provost Bestowal of Freedom of the City',
        date: '06-15',
        type: 'special',
        formattedDate: 'June 15, 1867'
      }
    ],
    todayActivity: [],
    timelineEvents: [
      {
        id: 'gb-t1',
        year: 1858,
        date: '1858',
        title: 'Vigil Begins at Greyfriars Kirkyard',
        category: 'milestone',
        description: 'Remained beside John Gray’s grave for 14 continuous years.',
        location: 'Edinburgh, Scotland'
      }
    ],
    gallery: [
      {
        id: 'gb-g1',
        url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Greyfriars_Bobby_statue_Edinburgh.jpg',
        caption: 'The historic bronze statue of Greyfriars Bobby at the head of Candlemaker Row.',
        year: '1873'
      }
    ],
    audioRecordings: [],
    videos: [],
    memories: [],
    familyTree: []
  }
];
