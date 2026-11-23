/**
 * Adaptive Knowledge Quiz Question Banks by Learning Band
 * Tailored to the exact syllabus guidelines from Section 4 of the Guide:
 * - Foundation (Class 1–2)
 * - Early Primary (Class 3–4)
 * - Primary (Class 5–6)
 * - Middle (Class 7–8)
 * - Secondary (Class 9–10)
 * - Senior Secondary (Class 11–12)
 * - Extended/Adult (18–20)
 */

import { BANDS } from '../utils/learningBands.js';

export const SYLLABUS_BY_BAND = {
  [BANDS.FOUNDATION]: {
    Maths: 'Counting, number sense, shapes, simple addition and subtraction up to 20.',
    Science: 'Human body parts, animals & plants, five senses, weather and seasons.',
    English: 'Letter sounds, sight words, rhyming words, simple sentence meaning.',
    GK: 'Family, school, neighborhood places, good habits and everyday safety.',
    'Logical Reasoning': 'Visual picture patterns, color sequences, matching pairs.',
    History: 'Family trees, daily routines, concept of yesterday, today, and tomorrow.',
    Geography: 'Basic directions (left/right, up/down), land, water, sky recognition.',
    Computer: 'Identifying computers, tablets, mouse, keyboard, and safe usage basics.'
  },
  [BANDS.EARLY_PRIMARY]: {
    Maths: 'Multiplication, division basics, fractions intro, units of measurement.',
    Science: 'Plant life cycles, animal habitats, states of matter, light and sound.',
    English: 'Parts of speech (nouns, verbs), adjectives, punctuation, reading passages.',
    GK: 'National symbols of India, famous landmarks, currencies, world wonders.',
    'Logical Reasoning': 'Number and letter series, shape analogies, odd one out, sorting.',
    History: 'Ancient heritage, historical monuments, notable leaders of the past.',
    Geography: 'States of India, map cardinal directions, mountains, rivers, plains.',
    Computer: 'Computer hardware vs software, folder management, typing, internet safety.'
  },
  [BANDS.PRIMARY]: {
    Maths: 'Fractions, decimals, percentages, factors, perimeter, and area geometry.',
    Science: 'Ecosystems, food chains, human organ systems, force and simple machines.',
    English: 'Reading comprehension, tenses, subject-verb agreement, writing skills.',
    GK: 'World geography basics, international organizations, scientific inventions.',
    'Logical Reasoning': 'Multi-step sequences, Venn diagrams, directional puzzles, coding-decoding.',
    History: 'Indus Valley civilization, Vedic period, kingdoms of ancient India.',
    Geography: 'Continents, oceans, earth rotation, climate zones, natural resources.',
    Computer: 'Internet networks, productivity software, algorithm concepts, block coding.'
  },
  [BANDS.MIDDLE]: {
    Maths: 'Integers, linear equations, ratios, algebraic expressions, geometric angles.',
    Science: 'Cell structure, photosynthesis, acids & bases, electricity, force and motion.',
    English: 'Advanced grammar, active-passive voice, idioms, analytical reading.',
    GK: 'Indian Constitution, scientific discoveries, international capitals and treaties.',
    'Logical Reasoning': 'Syllogisms, blood relations, seating arrangements, matrix logic.',
    History: 'Medieval empires, Delhi Sultanate, Mughals, world renaissance.',
    Geography: 'Atmosphere layers, tectonic plates, soil types, human population and ecology.',
    Computer: 'Flowcharts, Python basics, digital citizenship, data structures, safe cyber habits.'
  },
  [BANDS.SECONDARY]: {
    Maths: 'Quadratic equations, coordinate geometry, trigonometry, statistics, probability.',
    Science: 'Chemical reactions, periodic table, optics, genetics, electromagnetism.',
    English: 'Literary devices, critical analysis, formal correspondence, essay synthesis.',
    GK: 'Global geopolitics, economic indicators, environment treaties, contemporary affairs.',
    'Logical Reasoning': 'Critical reasoning, statement-assumption, complex assertions, spatial logic.',
    History: 'Freedom struggle of India, World Wars, industrial revolution, modern democracy.',
    Geography: 'Physical geography of India, river basins, minerals, climate change trends.',
    Computer: 'Relational databases (SQL), network topologies, web architecture, cyber security.'
  },
  [BANDS.SENIOR_SECONDARY]: {
    Maths: 'Calculus, vectors, 3D geometry, matrices, probability distributions, functions.',
    Science: 'Thermodynamics, organic chemistry, wave optics, biotechnology, modern physics.',
    English: 'Academic argumentation, rhetoric, précis writing, advanced comprehension.',
    GK: 'Constitutional law, economics, macroeconomic policies, technological frontiers.',
    'Logical Reasoning': 'Aptitude tests, data interpretation, analytical puzzles, quantitative reasoning.',
    History: 'Colonialism, partition of India, cold war era, global historical developments.',
    Geography: 'Economic geography, trade corridors, demographic transitions, GIS foundations.',
    Computer: 'Python programming, DBMS, data structures, TCP/IP, cryptography & AI concepts.'
  },
  [BANDS.EXTENDED]: {
    Maths: 'Quantitative aptitude, competitive mental math, data sufficiency, applied statistics.',
    Science: 'Scientific literacy, contemporary medical discoveries, physics in modern technology.',
    English: 'Professional communication, executive comprehension, nuance and precision writing.',
    GK: 'Global economy, geopolitics, Nobel prizes, national governance and current affairs.',
    'Logical Reasoning': 'Executive problem solving, case logic, cognitive decision matrices, puzzle deductions.',
    History: 'World historical developments, constitutional evolution, societal revolutions.',
    Geography: 'Geo-economics, maritime shipping routes, climate initiatives, urbanization.',
    Computer: 'Modern IT tools, cloud computing, cybersecurity awareness, AI literacy & prompt systems.'
  }
};

/**
 * Question banks keyed by Subject and Learning Band
 */
export const ADAPTIVE_QUIZ_QUESTIONS = {
  // ==========================================
  // MATHS
  // ==========================================
  Maths: {
    [BANDS.FOUNDATION]: [
      {
        q: 'If you have 4 apples and get 3 more, how many apples do you have in total?',
        a: ['5', '6', '7', '8'],
        correct: 2,
        hint: 'Count on: 4... 5, 6, 7.',
        explanation: '4 + 3 = 7 apples in total.'
      },
      {
        q: 'Which number comes right after 19?',
        a: ['18', '20', '21', '29'],
        correct: 1,
        hint: 'Think of counting: 18, 19, ...',
        explanation: 'The number that comes immediately after 19 is 20.'
      },
      {
        q: 'Which geometric shape has exactly 3 straight sides?',
        a: ['Circle', 'Square', 'Triangle', 'Rectangle'],
        correct: 2,
        hint: 'A slice of pizza looks like this shape.',
        explanation: 'A triangle always has 3 straight sides and 3 corners.'
      },
      {
        q: 'What is 10 minus 4?',
        a: ['5', '6', '7', '8'],
        correct: 1,
        hint: 'Count backwards from 10 by 4 steps: 9, 8, 7, 6.',
        explanation: '10 - 4 = 6.'
      },
      {
        q: 'Which number is the largest: 12, 8, 15, or 9?',
        a: ['8', '12', '15', '9'],
        correct: 2,
        hint: 'Look for the number that has the highest quantity.',
        explanation: '15 is larger than 12, 9, and 8.'
      }
    ],

    [BANDS.EARLY_PRIMARY]: [
      {
        q: 'What is 7 × 6?',
        a: ['36', '42', '48', '54'],
        correct: 1,
        hint: 'Think of 7 × 5 = 35, then add one more 7.',
        explanation: '7 × 6 = 42.'
      },
      {
        q: 'Which fraction represents one half?',
        a: ['1/3', '1/4', '1/2', '2/3'],
        correct: 2,
        hint: 'One part out of two equal parts.',
        explanation: '1/2 represents one half of a whole.'
      },
      {
        q: 'If a rope is 2 meters long, how many centimeters is that?',
        a: ['20 cm', '200 cm', '2000 cm', '20000 cm'],
        correct: 1,
        hint: '1 meter equals 100 centimeters.',
        explanation: '2 meters × 100 cm/meter = 200 cm.'
      },
      {
        q: 'Divide 36 by 4. What is the quotient?',
        a: ['7', '8', '9', '10'],
        correct: 2,
        hint: 'What number multiplied by 4 equals 36?',
        explanation: '36 ÷ 4 = 9, because 9 × 4 = 36.'
      },
      {
        q: 'What is the perimeter of a square with side length 5 cm?',
        a: ['15 cm', '20 cm', '25 cm', '10 cm'],
        correct: 1,
        hint: 'A square has 4 equal sides. Add all 4 sides together.',
        explanation: 'Perimeter = 4 × 5 cm = 20 cm.'
      }
    ],

    [BANDS.PRIMARY]: [
      {
        q: 'What is 3/4 converted into a decimal?',
        a: ['0.25', '0.50', '0.75', '0.85'],
        correct: 2,
        hint: 'Think of three quarters in money (75 cents).',
        explanation: '3 ÷ 4 = 0.75.'
      },
      {
        q: 'What is the Least Common Multiple (LCM) of 6 and 8?',
        a: ['12', '16', '24', '48'],
        correct: 2,
        hint: 'List multiples of 8: 8, 16, 24...',
        explanation: '24 is the smallest number that is a multiple of both 6 (6×4) and 8 (8×3).'
      },
      {
        q: 'What is the area of a rectangle with length 9 cm and width 6 cm?',
        a: ['30 cm²', '54 cm²', '45 cm²', '63 cm²'],
        correct: 1,
        hint: 'Area = length × width.',
        explanation: 'Area = 9 × 6 = 54 cm².'
      },
      {
        q: 'If an angle measures 45°, what type of angle is it?',
        a: ['Obtuse', 'Right', 'Acute', 'Straight'],
        correct: 2,
        hint: 'It is less than 90 degrees.',
        explanation: 'Any angle less than 90° is an acute angle.'
      },
      {
        q: 'What is 20% of 150?',
        a: ['25', '30', '35', '40'],
        correct: 1,
        hint: '10% of 150 is 15. Double that for 20%.',
        explanation: '20% × 150 = 0.20 × 150 = 30.'
      }
    ],

    [BANDS.MIDDLE]: [
      {
        q: 'Solve for x: 3x + 7 = 28',
        a: ['5', '7', '8', '9'],
        correct: 1,
        hint: 'Subtract 7 from 28 first, then divide by 3.',
        explanation: '3x = 28 - 7 = 21 → x = 21 / 3 = 7.'
      },
      {
        q: 'What is the sum of interior angles of a pentagon (5 sides)?',
        a: ['360°', '540°', '720°', '900°'],
        correct: 1,
        hint: 'Use the formula (n - 2) × 180° where n = 5.',
        explanation: '(5 - 2) × 180° = 3 × 180° = 540°.'
      },
      {
        q: 'What is (-8) × (-6)?',
        a: ['-48', '48', '-14', '14'],
        correct: 1,
        hint: 'A negative number multiplied by a negative number gives a positive product.',
        explanation: 'Negative × Negative = Positive: (-8) × (-6) = +48.'
      },
      {
        q: 'The ratio of boys to girls in a class of 35 students is 3:2. How many boys are there?',
        a: ['14', '18', '21', '24'],
        correct: 2,
        hint: 'Total ratio parts = 3 + 2 = 5. Each part = 35 / 5 = 7.',
        explanation: 'Boys = 3 parts × 7 = 21 boys.'
      },
      {
        q: 'What is the square root of 289?',
        a: ['13', '15', '17', '19'],
        correct: 2,
        hint: '10² = 100, 20² = 400. The last digit is 9, so check 17 (7×7=49).',
        explanation: '17 × 17 = 289.'
      }
    ],

    [BANDS.SECONDARY]: [
      {
        q: 'If the roots of the quadratic equation x² - 5x + 6 = 0 are p and q, what are they?',
        a: ['1 and 6', '2 and 3', '-2 and -3', '-1 and -6'],
        correct: 1,
        hint: 'Find two numbers that multiply to 6 and add up to 5.',
        explanation: '(x - 2)(x - 3) = 0 gives roots x = 2 and x = 3.'
      },
      {
        q: 'In a right triangle, if opposite side = 3 and adjacent side = 4, what is tan(θ)?',
        a: ['3/5', '4/5', '3/4', '4/3'],
        correct: 2,
        hint: 'tan(θ) = Opposite / Adjacent.',
        explanation: 'tan(θ) = Opposite / Adjacent = 3/4.'
      },
      {
        q: 'A fair six-sided die is rolled. What is the probability of getting a prime number?',
        a: ['1/6', '1/3', '1/2', '2/3'],
        correct: 2,
        hint: 'Prime numbers on a die are 2, 3, and 5 (three outcomes out of six).',
        explanation: 'Primes = {2, 3, 5} → 3/6 = 1/2.'
      },
      {
        q: 'What is the distance between points (0, 0) and (6, 8) in a Cartesian plane?',
        a: ['8', '10', '12', '14'],
        correct: 1,
        hint: 'Use the Pythagorean formula: √(6² + 8²).',
        explanation: '√(36 + 64) = √100 = 10.'
      },
      {
        q: 'What is the sum of the first 20 natural numbers?',
        a: ['190', '200', '210', '220'],
        correct: 2,
        hint: 'Use n(n + 1) / 2 where n = 20.',
        explanation: '20 × 21 / 2 = 10 × 21 = 210.'
      }
    ],

    [BANDS.SENIOR_SECONDARY]: [
      {
        q: 'What is the derivative of f(x) = x³ - 4x² + 7x with respect to x?',
        a: ['3x² - 8x + 7', '3x² - 4x + 7', 'x² - 8x', '6x - 8'],
        correct: 0,
        hint: 'Apply the power rule d/dx(x^n) = n*x^(n-1).',
        explanation: 'd/dx(x³) = 3x², d/dx(-4x²) = -8x, d/dx(7x) = 7 → 3x² - 8x + 7.'
      },
      {
        q: 'What is the value of ∫(2x + 3) dx?',
        a: ['x² + 3x + C', '2x² + 3x + C', 'x² + C', '2 + C'],
        correct: 0,
        hint: 'Integrate term by term: ∫2x dx = x², ∫3 dx = 3x.',
        explanation: '∫(2x + 3) dx = x² + 3x + C.'
      },
      {
        q: 'What is the value of sin²(x) + cos²(x) for any real value of x?',
        a: ['0', '1', '2', 'tan(x)'],
        correct: 1,
        hint: 'This is the fundamental Pythagorean trigonometric identity.',
        explanation: 'sin²(x) + cos²(x) = 1 for all real numbers x.'
      },
      {
        q: 'If matrix A is 2×3 and matrix B is 3×4, what is the dimension of product AB?',
        a: ['2×3', '3×4', '2×4', '3×3'],
        correct: 2,
        hint: 'Matrix product (m×k) × (k×n) yields dimension m×n.',
        explanation: 'The outer dimensions give a 2×4 matrix.'
      },
      {
        q: 'What is the limit of (sin x) / x as x approaches 0?',
        a: ['0', '1', '∞', 'Undefined'],
        correct: 1,
        hint: 'Standard calculus limit derived via squeeze theorem or L\'Hopital\'s rule.',
        explanation: 'lim(x→0) (sin x / x) = 1.'
      }
    ],

    [BANDS.EXTENDED]: [
      {
        q: 'A train 150m long travels at 54 km/h. How many seconds does it take to cross a pole?',
        a: ['8 sec', '10 sec', '12 sec', '15 sec'],
        correct: 1,
        hint: 'Convert speed to m/s by multiplying by 5/18: 54 × 5/18 = 15 m/s.',
        explanation: 'Speed = 15 m/s. Time = Distance / Speed = 150 / 15 = 10 seconds.'
      },
      {
        q: 'If the simple interest on a principal for 3 years at 5% is $150, what was the principal?',
        a: ['$800', '$1,000', '$1,200', '$1,500'],
        correct: 1,
        hint: 'SI = (P × R × T) / 100 → 150 = (P × 5 × 3) / 100.',
        explanation: '150 = 0.15 × P → P = 150 / 0.15 = $1,000.'
      },
      {
        q: 'In how many different ways can the letters of the word "LEADER" be arranged?',
        a: ['120', '360', '720', '1440'],
        correct: 1,
        hint: 'LEADER has 6 letters with letter E repeated 2 times: 6! / 2!.',
        explanation: '6! / 2! = 720 / 2 = 360.'
      },
      {
        q: 'What is the compound interest on $10,000 for 2 years at 10% compounded annually?',
        a: ['$1,800', '$2,000', '$2,100', '$2,200'],
        correct: 2,
        hint: 'Amount = 10000 × (1.10)² = 10000 × 1.21 = $12,100.',
        explanation: 'Interest = $12,100 - $10,000 = $2,100.'
      },
      {
        q: 'Two pipes A and B can fill a tank in 20 and 30 minutes respectively. Working together, how long will they take?',
        a: ['10 min', '12 min', '15 min', '25 min'],
        correct: 1,
        hint: 'Combined rate = 1/20 + 1/30 = 5/60 = 1/12.',
        explanation: 'Combined time = 12 minutes.'
      }
    ]
  },

  // ==========================================
  // SCIENCE
  // ==========================================
  Science: {
    [BANDS.FOUNDATION]: [
      {
        q: 'Which sense organ helps us hear music and sounds?',
        a: ['Eyes', 'Ears', 'Nose', 'Tongue'],
        correct: 1,
        hint: 'You have two on the sides of your head.',
        explanation: 'Our ears detect vibrations in the air to hear sound.'
      },
      {
        q: 'What do green plants need from the sky to grow?',
        a: ['Moonlight', 'Sunlight', 'Starlight', 'Fireworks'],
        correct: 1,
        hint: 'It shines brightly during the daytime.',
        explanation: 'Plants use sunlight to make food through photosynthesis.'
      },
      {
        q: 'Which of these is a baby dog called?',
        a: ['Kitten', 'Cub', 'Puppy', 'Calf'],
        correct: 2,
        hint: 'A very cute, playful young canine.',
        explanation: 'A baby dog is called a puppy.'
      },
      {
        q: 'What falls from clouds when it storms?',
        a: ['Sand', 'Rain', 'Leaves', 'Juice'],
        correct: 1,
        hint: 'Liquid water drops falling from the sky.',
        explanation: 'Rain is condensed water droplets falling from clouds.'
      },
      {
        q: 'Which part of a plant grows downwards into the soil?',
        a: ['Flower', 'Leaf', 'Stem', 'Roots'],
        correct: 3,
        hint: 'They anchor the plant and drink water from earth.',
        explanation: 'Roots grow into the ground to absorb water and nutrients.'
      }
    ],

    [BANDS.EARLY_PRIMARY]: [
      {
        q: 'What is water called when it freezes into a solid state?',
        a: ['Steam', 'Ice', 'Vapor', 'Dew'],
        correct: 1,
        hint: 'You put this cold cube into drinks in summer.',
        explanation: 'Liquid water freezes at 0°C into solid ice.'
      },
      {
        q: 'Which animal is known as the "Ship of the Desert"?',
        a: ['Horse', 'Elephant', 'Camel', 'Lion'],
        correct: 2,
        hint: 'It can store fat in its hump and survive days without water.',
        explanation: 'Camels have specialized feet and water conservation traits suited for deserts.'
      },
      {
        q: 'Which gas do humans inhale to stay alive?',
        a: ['Carbon Dioxide', 'Oxygen', 'Helium', 'Nitrogen'],
        correct: 1,
        hint: 'Plants produce this vital gas during the day.',
        explanation: 'Our lungs absorb oxygen from inhaled air into our blood.'
      },
      {
        q: 'How many bones are there in an adult human skeleton?',
        a: ['106', '206', '306', '406'],
        correct: 1,
        hint: 'Just over two hundred.',
        explanation: 'An adult human body has 206 bones.'
      },
      {
        q: 'What type of energy does the Sun give directly to Earth?',
        a: ['Only Sound', 'Light and Heat', 'Electrical sparks', 'Nuclear radiation only'],
        correct: 1,
        hint: 'It illuminates our world and keeps the planet warm.',
        explanation: 'The sun emits solar energy in the form of light and thermal heat.'
      }
    ],

    [BANDS.PRIMARY]: [
      {
        q: 'What green pigment in plant leaves absorbs sunlight for photosynthesis?',
        a: ['Hemoglobin', 'Chlorophyll', 'Melanin', 'Carotene'],
        correct: 1,
        hint: 'Starts with "Chloro-".',
        explanation: 'Chlorophyll traps light energy to power glucose production.'
      },
      {
        q: 'What is the closest planet to the Sun in our Solar System?',
        a: ['Venus', 'Mercury', 'Mars', 'Earth'],
        correct: 1,
        hint: 'Small, rocky, and orbits the sun in just 88 Earth days.',
        explanation: 'Mercury is the innermost and smallest recognized planet.'
      },
      {
        q: 'Which system in the human body breaks down food into nutrients?',
        a: ['Nervous System', 'Digestive System', 'Circulatory System', 'Respiratory System'],
        correct: 1,
        hint: 'Includes the stomach, liver, and intestines.',
        explanation: 'The digestive system processes food into absorbable energy.'
      },
      {
        q: 'What is the chemical formula for water?',
        a: ['CO2', 'O2', 'H2O', 'NaCl'],
        correct: 2,
        hint: 'Two hydrogen atoms bonded with one oxygen.',
        explanation: 'H2O is the chemical abbreviation for water.'
      },
      {
        q: 'What force pulls objects toward the center of the Earth?',
        a: ['Friction', 'Magnetism', 'Gravity', 'Centrifugal'],
        correct: 2,
        hint: 'Causes dropped balls to fall downward.',
        explanation: 'Gravity is the universal attractive force exerted by Earth\'s mass.'
      }
    ],

    [BANDS.MIDDLE]: [
      {
        q: 'Which organelle is universally termed the "Powerhouse of the Cell"?',
        a: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi Apparatus'],
        correct: 1,
        hint: 'It generates ATP energy for cellular processes.',
        explanation: 'Mitochondria produce adenosine triphosphate (ATP) via cellular respiration.'
      },
      {
        q: 'On the pH scale, a solution with a pH of 3 is classified as:',
        a: ['Strong Base', 'Neutral', 'Acidic', 'Alkaline'],
        correct: 2,
        hint: 'pH values under 7 are acidic, while above 7 are basic.',
        explanation: 'pH 7 is neutral; pH < 7 indicates acidity.'
      },
      {
        q: 'What is the standard unit of electric current in the SI system?',
        a: ['Volt', 'Ampere', 'Ohm', 'Watt'],
        correct: 1,
        hint: 'Named after French physicist André-Marie Ampère.',
        explanation: 'The ampere (A) measures the rate of flow of electric charge.'
      },
      {
        q: 'What happens to the molecules of a gas when it is heated at constant pressure?',
        a: ['They slow down', 'They expand and move faster', 'They freeze', 'They disappear'],
        correct: 1,
        hint: 'Thermal energy increases molecular kinetic velocity.',
        explanation: 'Heating increases kinetic energy, causing faster movement and thermal expansion.'
      },
      {
        q: 'Which blood cells fight off infectious bacteria and viruses?',
        a: ['Red Blood Cells', 'Platelets', 'White Blood Cells', 'Plasma'],
        correct: 2,
        hint: 'Also known as leukocytes.',
        explanation: 'White blood cells are the frontline defenders of our immune system.'
      }
    ],

    [BANDS.SECONDARY]: [
      {
        q: 'What is the acceleration due to gravity (g) near Earth\'s surface approximately?',
        a: ['8.2 m/s²', '9.8 m/s²', '11.2 m/s²', '14.5 m/s²'],
        correct: 1,
        hint: 'Close to 10 m/s².',
        explanation: 'Standard gravitational acceleration is approximately 9.8 m/s².'
      },
      {
        q: 'According to Newton\'s Third Law of Motion, every action has:',
        a: ['A delayed response', 'An equal and opposite reaction', 'No consequence', 'Double force'],
        correct: 1,
        hint: 'Pushing against a wall exerts equal force right back on you.',
        explanation: 'Forces always occur in matched interaction pairs of equal magnitude and opposite direction.'
      },
      {
        q: 'Which element has the atomic number 6 in the Periodic Table?',
        a: ['Nitrogen', 'Oxygen', 'Carbon', 'Boron'],
        correct: 2,
        hint: 'The basis of all organic chemistry and life on Earth.',
        explanation: 'Carbon has 6 protons, giving it atomic number 6.'
      },
      {
        q: 'What phenomenon causes a pencil to look bent when dipped in water?',
        a: ['Refraction', 'Reflection', 'Diffraction', 'Polarization'],
        correct: 0,
        hint: 'Bending of light as it passes between different optical mediums.',
        explanation: 'Refraction occurs because light changes speed between air and water.'
      },
      {
        q: 'What molecule carries genetic instructions in living organisms?',
        a: ['ATP', 'DNA', 'Glucose', 'Hemoglobin'],
        correct: 1,
        hint: 'Deoxyribonucleic acid forming a double helix.',
        explanation: 'DNA encodes hereditary genetic blueprints.'
      }
    ],

    [BANDS.SENIOR_SECONDARY]: [
      {
        q: 'What is the speed of light in vacuum (c) approximately?',
        a: ['3 × 10⁶ m/s', '3 × 10⁸ m/s', '3 × 10¹⁰ m/s', '3 × 10⁴ m/s'],
        correct: 1,
        hint: 'Approximately 300,000 kilometers per second.',
        explanation: 'c = 299,792,458 m/s, conventionally rounded to 3 × 10⁸ m/s.'
      },
      {
        q: 'Which law states that energy can neither be created nor destroyed?',
        a: ['First Law of Thermodynamics', 'Second Law of Thermodynamics', 'Hooke\'s Law', 'Ohm\'s Law'],
        correct: 0,
        hint: 'The principle of Conservation of Energy.',
        explanation: 'The 1st Law of Thermodynamics states total energy in an isolated system remains constant.'
      },
      {
        q: 'What type of hybridization is present in a methane (CH4) carbon atom?',
        a: ['sp', 'sp²', 'sp³', 'sp³d'],
        correct: 2,
        hint: 'Four equivalent single sigma bonds arranged in a tetrahedron.',
        explanation: 'Carbon forms four sp³ hybrid orbitals with 109.5° bond angles.'
      },
      {
        q: 'What particle is exchanged in electromagnetic interactions according to QED?',
        a: ['Gluon', 'Photon', 'W Boson', 'Graviton'],
        correct: 1,
        hint: 'The quantum packet of light.',
        explanation: 'Photons are the gauge bosons that mediate the electromagnetic force.'
      },
      {
        q: 'In genetics, which enzyme unzips the double-stranded DNA helix during replication?',
        a: ['DNA Polymerase', 'Helicase', 'Ligase', 'Primase'],
        correct: 1,
        hint: 'Think of "unwinding" or "helix".',
        explanation: 'DNA Helicase breaks hydrogen bonds between nucleotide bases to separate strands.'
      }
    ],

    [BANDS.EXTENDED]: [
      {
        q: 'What revolutionary gene-editing technology was derived from bacterial immune systems?',
        a: ['CRISPR-Cas9', 'PCR amplification', 'Gel Electrophoresis', 'ELISA'],
        correct: 0,
        hint: 'Won the Nobel Prize in Chemistry in 2020.',
        explanation: 'CRISPR-Cas9 enables precise targeted modifications to genomic DNA sequences.'
      },
      {
        q: 'What cosmic phenomenon occurs when a massive star collapses under gravity at the end of its life?',
        a: ['White Dwarf', 'Supernova & Black Hole', 'Protostar', 'Asteroid Belt'],
        correct: 1,
        hint: 'A cataclysmic stellar explosion leaving a gravitational singularity.',
        explanation: 'Massive stars undergo core-collapse supernovae, often forming neutron stars or black holes.'
      },
      {
        q: 'What is the primary greenhouse gas emitted through fossil fuel combustion?',
        a: ['Methane', 'Carbon Dioxide (CO2)', 'Nitrous Oxide', 'Ozone'],
        correct: 1,
        hint: 'Emitted by cars, power plants, and industrial furnaces.',
        explanation: 'Carbon dioxide makes up the vast majority of human-induced greenhouse emissions.'
      },
      {
        q: 'Which branch of physics deals with heat, work, and the statistical behavior of atomic ensembles?',
        a: ['Optics', 'Thermodynamics & Statistical Mechanics', 'Fluid Statics', 'Acoustics'],
        correct: 1,
        hint: 'Encompasses entropy, temperature, and thermal work.',
        explanation: 'Thermodynamics explores heat exchange, entropy, and microscopic statistical probabilities.'
      },
      {
        q: 'What is the fundamental theoretical limit on simultaneous measurement of position and momentum?',
        a: ['Pauli Exclusion Principle', 'Heisenberg Uncertainty Principle', 'Schrödinger Equation', 'Fermi Paradox'],
        correct: 1,
        hint: 'Δx × Δp ≥ ℏ/2.',
        explanation: 'Heisenberg showed that conjugate quantum observables cannot both be known with arbitrary precision.'
      }
    ]
  },

  // ==========================================
  // ENGLISH
  // ==========================================
  English: {
    [BANDS.FOUNDATION]: [
      {
        q: 'Which letter of the alphabet comes right after "D"?',
        a: ['B', 'C', 'E', 'F'],
        correct: 2,
        hint: 'Sing the song: A, B, C, D, ...',
        explanation: 'E comes right after D in the English alphabet.'
      },
      {
        q: 'Which word rhymes with "CAT"?',
        a: ['Dog', 'Hat', 'Cup', 'Sun'],
        correct: 1,
        hint: 'It sounds the same at the end: -at.',
        explanation: 'Cat and Hat share the identical "-at" ending sound.'
      },
      {
        q: 'What is the opposite of "BIG"?',
        a: ['Tall', 'Small', 'Huge', 'Fast'],
        correct: 1,
        hint: 'A mouse is this compared to an elephant.',
        explanation: 'Small is the direct antonym of big.'
      },
      {
        q: 'Fill in the blank: "The bird flies in the ______."',
        a: ['water', 'sky', 'ground', 'carpet'],
        correct: 1,
        hint: 'Where do feathered birds soar with their wings?',
        explanation: 'Birds fly through the air in the sky.'
      },
      {
        q: 'Which word is a naming word (Noun)?',
        a: ['Run', 'Apple', 'Quickly', 'Blue'],
        correct: 1,
        hint: 'A delicious red fruit you can eat.',
        explanation: 'Apple is a noun representing a tangible physical object.'
      }
    ],

    [BANDS.EARLY_PRIMARY]: [
      {
        q: 'Which word is an Action Verb?',
        a: ['Happiness', 'Beautiful', 'Jump', 'Under'],
        correct: 2,
        hint: 'Something your legs can physically do.',
        explanation: 'Jump expresses a physical action.'
      },
      {
        q: 'What is the plural form of the word "CHILD"?',
        a: ['Childs', 'Children', 'Childrens', 'Childer'],
        correct: 1,
        hint: 'Irregular plural noun.',
        explanation: 'The irregular plural of child is children.'
      },
      {
        q: 'Choose the correct adjective in the sentence: "The red car drove swiftly."',
        a: ['Car', 'Red', 'Drove', 'Swiftly'],
        correct: 1,
        hint: 'It describes the color of the car.',
        explanation: '"Red" is an adjective describing the noun "car".'
      },
      {
        q: 'What is the synonym (same meaning) of the word "RAPID"?',
        a: ['Slow', 'Fast', 'Heavy', 'Quiet'],
        correct: 1,
        hint: 'Think of rapid rapids in a speeding river.',
        explanation: 'Rapid and fast both describe high speed.'
      },
      {
        q: 'Which punctuation mark belongs at the end of a question?',
        a: ['.', '!', '?', ','],
        correct: 2,
        hint: 'Used when asking an inquiry.',
        explanation: 'A question mark (?) ends interrogative sentences.'
      }
    ],

    [BANDS.PRIMARY]: [
      {
        q: 'Identify the conjunction in this sentence: "I wanted to go outside, but it began to rain."',
        a: ['Wanted', 'Outside', 'But', 'Rain'],
        correct: 2,
        hint: 'It joins two independent clauses together.',
        explanation: '"But" is a coordinating conjunction joining two sentences.'
      },
      {
        q: 'What does the idiom "A piece of cake" mean?',
        a: ['A birthday party', 'Something very easy to do', 'A bakery recipe', 'A difficult challenge'],
        correct: 1,
        hint: 'When a test was so simple, you say it was...',
        explanation: '"A piece of cake" is an idiom describing a straightforward, effortless task.'
      },
      {
        q: 'Choose the correct past tense of the verb "CATCH":',
        a: ['Catched', 'Caught', 'Cought', 'Catching'],
        correct: 1,
        hint: 'Irregular past tense.',
        explanation: 'The past tense of catch is caught.'
      },
      {
        q: 'Which word is spelled correctly?',
        a: ['Definately', 'Definitely', 'Definitly', 'Defenitely'],
        correct: 1,
        hint: 'Contains the root word "finite".',
        explanation: 'D-E-F-I-N-I-T-E-L-Y is the correct standard spelling.'
      },
      {
        q: 'What figure of speech compares two things using "as" or "like"?',
        a: ['Metaphor', 'Simile', 'Hyperbole', 'Personification'],
        correct: 1,
        hint: '"He was brave as a lion."',
        explanation: 'A simile makes an explicit comparison using "like" or "as".'
      }
    ],

    [BANDS.MIDDLE]: [
      {
        q: 'Identify the passive voice version of: "The chef cooked a marvelous meal."',
        a: ['A marvelous meal was cooked by the chef.', 'The chef had been cooking a meal.', 'A marvelous meal cooks the chef.', 'Cooking a marvelous meal was what the chef did.'],
        correct: 0,
        hint: 'The object (meal) moves to become the subject of the sentence.',
        explanation: 'Passive structure: Object + auxiliary "was" + past participle "cooked" + by agent.'
      },
      {
        q: 'What is the meaning of the word "BENEVOLENT"?',
        a: ['Cruel and hostile', 'Generous and well-meaning', 'Lazy and indifferent', 'Suspicious and timid'],
        correct: 1,
        hint: 'Prefix "bene-" means good or well in Latin.',
        explanation: 'Benevolent describes a person who is kind, charitable, and acts for the welfare of others.'
      },
      {
        q: 'Which sentence correctly uses a semicolon?',
        a: ['I like apples; and oranges.', 'My sister lives in Paris; she loves the city.', 'Because it rained; we stayed home.', 'He ran fast; but missed the bus.'],
        correct: 1,
        hint: 'A semicolon links two closely connected independent clauses without a conjunction.',
        explanation: 'Both sides are full independent thoughts joined logically.'
      },
      {
        q: 'What figure of speech gives human attributes to non-human objects?',
        a: ['Alliteration', 'Irony', 'Personification', 'Onomatopoeia'],
        correct: 2,
        hint: '"The angry wind howled through the trees."',
        explanation: 'Personification attributes human actions or traits to inanimate objects or nature.'
      },
      {
        q: 'What is the antonym of the word "OBSOLETE"?',
        a: ['Outdated', 'Ancient', 'Contemporary', 'Worn'],
        correct: 2,
        hint: 'Obsolete means no longer used or modern.',
        explanation: 'Contemporary means modern, current, and actively relevant today.'
      }
    ],

    [BANDS.SECONDARY]: [
      {
        q: 'Identify the rhetorical device in: "Ask not what your country can do for you — ask what you can do for your country."',
        a: ['Chiasmus', 'Oxymoron', 'Hyperbole', 'Euphemism'],
        correct: 0,
        hint: 'Reversal of grammatical structures in successive phrases (A-B, B-A).',
        explanation: 'Chiasmus inverts sentence patterns to create balanced rhetorical emphasis.'
      },
      {
        q: 'What does the term "AMBIGUOUS" describe in writing?',
        a: ['Extremely detailed', 'Open to more than one interpretation', 'Full of emotional passion', 'Grammatically flawless'],
        correct: 1,
        hint: 'Unclear because it could mean multiple things.',
        explanation: 'Ambiguous language can be understood in different conflicting ways.'
      },
      {
        q: 'Which word means "a person who dislikes or distrusts humankind"?',
        a: ['Philanthropist', 'Misanthrope', 'Optimist', 'Altruist'],
        correct: 1,
        hint: 'Greek root "misein" (to hate) + "anthropos" (human).',
        explanation: 'A misanthrope holds general cynicism or hostility toward humanity.'
      },
      {
        q: 'What is the mood of the verb in: "If I were you, I would study tonight."?',
        a: ['Indicative', 'Imperative', 'Subjunctive', 'Interrogative'],
        correct: 2,
        hint: 'Used for hypothetical, counter-to-fact, or imaginary conditions.',
        explanation: 'The subjunctive mood expresses hypothetical or conditional wishes (were instead of was).'
      },
      {
        q: 'Which sentence demonstrates correct parallel structure?',
        a: ['She enjoys swimming, to run, and riding bikes.', 'She enjoys swimming, running, and cycling.', 'She enjoys to swim, running, and bikes.', 'She enjoys swim, run, and cycle.'],
        correct: 1,
        hint: 'All listed items should use the consistent "-ing" gerund form.',
        explanation: 'Parallel syntax pairs identical grammatical forms: swimming, running, and cycling.'
      }
    ],

    [BANDS.SENIOR_SECONDARY]: [
      {
        q: 'What is an "OXYMORON"?',
        a: ['A mild word used in place of an offensive one', 'A figure of speech pairing contradictory terms', 'An exaggerated statement not meant literally', 'A recurring motif in literary fiction'],
        correct: 1,
        hint: 'Examples: "Deafening silence", "Cruel kindness".',
        explanation: 'An oxymoron juxtaposes mutually contradictory elements for artistic contrast.'
      },
      {
        q: 'What does the Latin phrase "STATUS QUO" refer to?',
        a: ['A sudden revolution', 'The existing state of affairs', 'A legal precedent', 'A supreme court judgment'],
        correct: 1,
        hint: 'Maintaining things exactly as they currently are.',
        explanation: 'Status quo denotes the current political or social situation.'
      },
      {
        q: 'Which critical term refers to the emotional release or cleansing felt by audiences in tragedy?',
        a: ['Hubris', 'Hamartia', 'Catharsis', 'Anagnorisis'],
        correct: 2,
        hint: 'Aristotle coined this term in his Poetics.',
        explanation: 'Catharsis is the purging of pity and fear experienced through dramatic art.'
      },
      {
        q: 'Identify the error type in: "Walking down the boulevard, the ancient cathedral stunned us."',
        a: ['Dangling Modifier', 'Split Infinitive', 'Comma Splice', 'Faulty Predication'],
        correct: 0,
        hint: 'Was the cathedral walking down the boulevard?',
        explanation: 'The participial phrase lacks an immediate logical subject, creating a dangling modifier.'
      },
      {
        q: 'What is the meaning of the word "EPHEMERAL"?',
        a: ['Lasting forever', 'Short-lived and transient', 'Extremely heavy', 'Sacred and divine'],
        correct: 1,
        hint: 'Like morning dew or a flash of lightning.',
        explanation: 'Ephemeral describes phenomena that endure for only a very brief duration.'
      }
    ],

    [BANDS.EXTENDED]: [
      {
        q: 'What does the term "SYCOPHANT" describe in professional environments?',
        a: ['An assertive leader', 'A servile flatterer who seeks advantage', 'A meticulous financial auditor', 'A creative copywriter'],
        correct: 1,
        hint: 'A "yes-man" who flatters superiors insincerely.',
        explanation: 'A sycophant praises or flatters people in power to gain personal favoritism.'
      },
      {
        q: 'Which sentence best exemplifies concise, jargon-free executive communication?',
        a: ['We need to synergize our bandwidth to optimize output.', 'We should meet tomorrow to agree on the project budget.', 'We will ideate paradigms touching key deliverable verticals.', 'Holistic optimization of timelines is mission-critical.'],
        correct: 1,
        hint: 'Clear, plain, direct English without buzzwords.',
        explanation: 'Plain language conveys clear commitments without obscure business jargon.'
      },
      {
        q: 'What is the precise meaning of the adjective "PRAGMATIC"?',
        a: ['Idealistic and romantic', 'Dealing with problems sensibly and realistically', 'Emotionally volatile', 'Dogmatically theoretical'],
        correct: 1,
        hint: 'Focusing on practical real-world outcomes over dogma.',
        explanation: 'Pragmatic individuals evaluate actions by practical consequences and workable solutions.'
      },
      {
        q: 'What does "NON SEQUITUR" mean in formal logic and discourse?',
        a: ['An irrefutable proof', 'A conclusion that does not logically follow from the premises', 'A circular argument', 'An emotional appeal'],
        correct: 1,
        hint: 'Latin for "it does not follow".',
        explanation: 'A non sequitur is an inference or assertion that lacks logical connection to its preceding argument.'
      },
      {
        q: 'Choose the word that best completes the sentence: "The executive\'s explanation was so ______ that even non-technical stakeholders understood it immediately."',
        a: ['Convoluted', 'Lucid', 'Turgid', 'Pedantic'],
        correct: 1,
        hint: 'Means crystal clear and easily comprehended.',
        explanation: 'Lucid speech is transparent, easy to follow, and intelligible.'
      }
    ]
  },

  // ==========================================
  // GK (General Knowledge)
  // ==========================================
  GK: {
    [BANDS.FOUNDATION]: [
      {
        q: 'Which animal is known as the King of the Jungle?',
        a: ['Tiger', 'Elephant', 'Lion', 'Bear'],
        correct: 2,
        hint: 'A majestic big cat with a grand mane.',
        explanation: 'The lion has traditionally been termed the King of the Jungle.'
      },
      {
        q: 'How many days are in a single standard week?',
        a: ['5', '6', '7', '8'],
        correct: 2,
        hint: 'Monday through Sunday.',
        explanation: 'A week has 7 days: Monday to Sunday.'
      },
      {
        q: 'What color on a traffic signal tells vehicles to STOP?',
        a: ['Green', 'Yellow', 'Red', 'Blue'],
        correct: 2,
        hint: 'The top light on a signal post.',
        explanation: 'Red universally signifies halt or stop in traffic rules.'
      },
      {
        q: 'In which country do we celebrate Republic Day on January 26th?',
        a: ['India', 'USA', 'UK', 'Australia'],
        correct: 0,
        hint: 'Our nation.',
        explanation: 'India adopted its Constitution on January 26, 1950.'
      },
      {
        q: 'How many fingers (including thumbs) do humans normally have on both hands together?',
        a: ['8', '10', '12', '14'],
        correct: 1,
        hint: '5 on each hand.',
        explanation: '5 fingers on left hand + 5 on right hand = 10 total.'
      }
    ],

    [BANDS.EARLY_PRIMARY]: [
      {
        q: 'What is the capital city of India?',
        a: ['Mumbai', 'Kolkata', 'New Delhi', 'Bengaluru'],
        correct: 2,
        hint: 'Home to the Parliament of India and the Red Fort.',
        explanation: 'New Delhi is the national capital of India.'
      },
      {
        q: 'Which is the largest ocean on planet Earth?',
        a: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
        correct: 2,
        hint: 'It covers more area than all Earth\'s landmass combined.',
        explanation: 'The Pacific Ocean is the world\'s largest and deepest ocean.'
      },
      {
        q: 'What is the national animal of India?',
        a: ['Asiatic Lion', 'Royal Bengal Tiger', 'Indian Elephant', 'Peacock'],
        correct: 1,
        hint: 'A striped feline known for its power and grace.',
        explanation: 'The Royal Bengal Tiger is India\'s national animal.'
      },
      {
        q: 'How many colors are there in a standard rainbow?',
        a: ['5', '6', '7', '8'],
        correct: 2,
        hint: 'Remember the acronym VIBGYOR.',
        explanation: 'VIBGYOR gives 7 spectral colors: Violet, Indigo, Blue, Green, Yellow, Orange, Red.'
      },
      {
        q: 'Which famous monument is located in Agra, India?',
        a: ['Qutub Minar', 'Taj Mahal', 'Gateway of India', 'Charminar'],
        correct: 1,
        hint: 'A white marble mausoleum built by Shah Jahan.',
        explanation: 'The Taj Mahal was constructed on the banks of the Yamuna River in Agra.'
      }
    ],

    [BANDS.PRIMARY]: [
      {
        q: 'How many continents are there on Earth?',
        a: ['5', '6', '7', '8'],
        correct: 2,
        hint: 'Asia, Africa, North America, South America, Antarctica, Europe, Australia.',
        explanation: 'There are 7 conventional continents on our planet.'
      },
      {
        q: 'Who was the first Prime Minister of independent India?',
        a: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'Sardar Patel', 'Dr. B.R. Ambedkar'],
        correct: 1,
        hint: 'Affectionately remembered by children on Children\'s Day.',
        explanation: 'Pandit Jawaharlal Nehru served as the first PM of free India from 1947 to 1964.'
      },
      {
        q: 'Which is the tallest mountain peak in the world?',
        a: ['K2', 'Mount Everest', 'Kangchenjunga', 'Kilimanjaro'],
        correct: 1,
        hint: 'Located in the Himalayas, standing 8,848.86 meters above sea level.',
        explanation: 'Mount Everest in Nepal/Tibet is Earth\'s highest peak.'
      },
      {
        q: 'Which organ of the United Nations is primarily responsible for international peace and security?',
        a: ['General Assembly', 'Security Council (UNSC)', 'UNESCO', 'WHO'],
        correct: 1,
        hint: 'Has 5 permanent veto-wielding members.',
        explanation: 'The UN Security Council maintains global peace and crisis intervention.'
      },
      {
        q: 'What is the currency of Japan?',
        a: ['Yuan', 'Yen', 'Won', 'Ringgit'],
        correct: 1,
        hint: 'Symbolized as ¥.',
        explanation: 'The Yen is the official legal currency of Japan.'
      }
    ],

    [BANDS.MIDDLE]: [
      {
        q: 'Who is recognized as the chief architect of the Constitution of India?',
        a: ['Mahatma Gandhi', 'Dr. B.R. Ambedkar', 'Dr. Rajendra Prasad', 'Jawaharlal Nehru'],
        correct: 1,
        hint: 'Chairman of the Drafting Committee.',
        explanation: 'Dr. Bhimrao Ramji Ambedkar served as the chairman of the Drafting Committee.'
      },
      {
        q: 'Which river is the longest in the world?',
        a: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
        correct: 1,
        hint: 'Flows north through northeastern Africa for over 6,650 km.',
        explanation: 'The Nile is officially recognized as the world\'s longest river system.'
      },
      {
        q: 'In which year did the historic Apollo 11 mission land the first humans on the Moon?',
        a: ['1965', '1969', '1972', '1975'],
        correct: 1,
        hint: 'Neil Armstrong stepped onto the lunar surface in July of this year.',
        explanation: 'Apollo 11 completed its historic lunar touchdown on July 20, 1969.'
      },
      {
        q: 'What is the headquarters location of the International Court of Justice (ICJ)?',
        a: ['Geneva, Switzerland', 'New York, USA', 'The Hague, Netherlands', 'Paris, France'],
        correct: 2,
        hint: 'Located at the Peace Palace in a major Dutch city.',
        explanation: 'The ICJ sits in The Hague, Netherlands.'
      },
      {
        q: 'Which is the largest desert on Earth (including polar regions)?',
        a: ['Sahara Desert', 'Antarctic Desert', 'Gobi Desert', 'Arabian Desert'],
        correct: 1,
        hint: 'A desert is classified by low precipitation; this polar continent receives minimal snow.',
        explanation: 'The Antarctic Desert covers 14 million km², making it Earth\'s largest cold desert.'
      }
    ],

    [BANDS.SECONDARY]: [
      {
        q: 'Which constitutional amendment in India introduced the Goods and Services Tax (GST)?',
        a: ['100th', '101st', '103rd', '105th'],
        correct: 1,
        hint: 'Enacted in 2016 and implemented on July 1, 2017.',
        explanation: 'The 101st Constitutional Amendment Act introduced GST in India.'
      },
      {
        q: 'The Bretton Woods Conference of 1944 established which two prominent global institutions?',
        a: ['UN and NATO', 'IMF and World Bank', 'WTO and OECD', 'UNESCO and UNICEF'],
        correct: 1,
        hint: 'Institutions for international monetary stability and post-war reconstruction.',
        explanation: 'The International Monetary Fund (IMF) and the World Bank were founded at Bretton Woods.'
      },
      {
        q: 'Which country recently became the 32nd member of NATO in 2024?',
        a: ['Finland', 'Sweden', 'Ukraine', 'Georgia'],
        correct: 1,
        hint: 'Its Nordic neighbor Finland joined as the 31st member in 2023.',
        explanation: 'Sweden officially acceded to NATO in March 2024 as its 32nd member.'
      },
      {
        q: 'What was the code name of India\'s first successful nuclear test at Pokhran in 1974?',
        a: ['Operation Shakti', 'Smiling Buddha', 'Operation Vijay', 'Operation Meghdoot'],
        correct: 1,
        hint: 'Conducted under Prime Minister Indira Gandhi on Buddha Purnima.',
        explanation: '"Smiling Buddha" (Pokhran-I) was conducted on May 18, 1974.'
      },
      {
        q: 'Which international treaty aims to curb global warming by capping temperature increases below 2°C?',
        a: ['Kyoto Protocol', 'Paris Agreement', 'Montreal Protocol', 'Geneva Convention'],
        correct: 1,
        hint: 'Signed by world leaders at COP21 in 2015.',
        explanation: 'The 2015 Paris Agreement binds nations to curb emissions and limit warming.'
      }
    ],

    [BANDS.SENIOR_SECONDARY]: [
      {
        q: 'Which article of the Indian Constitution grants the Supreme Court power of Judicial Review?',
        a: ['Article 13', 'Article 21', 'Article 32', 'Article 356'],
        correct: 0,
        hint: 'Declares any law inconsistent with Fundamental Rights to be null and void.',
        explanation: 'Article 13 empowers courts to invalidate statutes conflicting with Fundamental Rights.'
      },
      {
        q: 'What economic metric measures the degree of income inequality within a nation?',
        a: ['Phillips Curve', 'Gini Coefficient', 'Lorenz Margin', 'Engel Ratio'],
        correct: 1,
        hint: 'Scales from 0 (perfect equality) to 1 (maximal inequality).',
        explanation: 'The Gini coefficient quantifies dispersion of income derived from the Lorenz curve.'
      },
      {
        q: 'Which Indian space mission made India the first nation to soft-land near the lunar South Pole?',
        a: ['Chandrayaan-1', 'Chandrayaan-2', 'Chandrayaan-3', 'Aditya-L1'],
        correct: 2,
        hint: 'Landed the Vikram lander and Pragyan rover on August 23, 2023.',
        explanation: 'Chandrayaan-3 achieved history by touching down near the Moon\'s south pole in August 2023.'
      },
      {
        q: 'The "Keshvananda Bharati v. State of Kerala (1973)" verdict is historic because it established:',
        a: ['Right to Privacy', 'Basic Structure Doctrine', 'Collegium System', 'Right to Education'],
        correct: 1,
        hint: 'Parliament cannot alter the essential core identity of the Constitution.',
        explanation: 'The 13-judge bench formulated the seminal Basic Structure Doctrine.'
      },
      {
        q: 'Which landmark international treaty successfully phased out chlorofluorocarbons (CFCs) to protect the ozone layer?',
        a: ['Basel Convention', 'Montreal Protocol', 'Ramsar Convention', 'Stockholm Treaty'],
        correct: 1,
        hint: 'Agreed in 1987 in a Canadian city.',
        explanation: 'The 1987 Montreal Protocol is considered the most universally successful environmental treaty.'
      }
    ],

    [BANDS.EXTENDED]: [
      {
        q: 'What geopolitical and economic grouping expanded in 2024 to include Egypt, Ethiopia, Iran, and the UAE?',
        a: ['G7', 'BRICS', 'ASEAN', 'AUKUS'],
        correct: 1,
        hint: 'Originally founded by Brazil, Russia, India, China, and South Africa.',
        explanation: 'BRICS completed a major multilateral expansion welcoming new member states in 2024.'
      },
      {
        q: 'What does the financial term "Quantitative Easing" (QE) refer to in central banking?',
        a: ['Raising tax rates on corporations', 'Purchasing long-term government bonds to inject liquidity', 'Minting physical gold coins', 'Setting fixed interest caps'],
        correct: 1,
        hint: 'Used by the US Federal Reserve and central banks to stimulate sluggish economies.',
        explanation: 'QE expands money supply through direct asset and bond acquisitions by monetary authorities.'
      },
      {
        q: 'The semiconductor manufacturing giant TSMC (Taiwan Semiconductor Manufacturing Company) produces over 50% of the world\'s advanced microchips. In which territory is it headquartered?',
        a: ['South Korea', 'Taiwan', 'Japan', 'Singapore'],
        correct: 1,
        hint: 'Based in Hsinchu Science Park.',
        explanation: 'TSMC is the cornerstone of global silicon semiconductor fabrication, based in Taiwan.'
      },
      {
        q: 'Who was awarded the 2024 Nobel Prize in Chemistry for computational protein design and protein structure prediction?',
        a: ['David Baker, Demis Hassabis, and John Jumper', 'Jennifer Doudna and Emmanuelle Charpentier', 'Katalin Karikó and Drew Weissman', 'Geoffrey Hinton and John Hopfield'],
        correct: 0,
        hint: 'Creators of AlphaFold and pioneering computational biology.',
        explanation: 'The Nobel was awarded for groundbreaking AI/computational biology solving protein folding.'
      },
      {
        q: 'What is the principal strategic maritime chokepoint between the Persian Gulf and the Gulf of Oman?',
        a: ['Strait of Malacca', 'Strait of Hormuz', 'Bab-el-Mandeb', 'Suez Canal'],
        correct: 1,
        hint: 'Over 20% of global petroleum transit flows through this narrow waterway.',
        explanation: 'The Strait of Hormuz is the world\'s most critical crude oil shipping corridor.'
      }
    ]
  },

  // ==========================================
  // LOGICAL REASONING
  // ==========================================
  'Logical Reasoning': {
    [BANDS.FOUNDATION]: [
      {
        q: 'Find the pattern: Red, Blue, Red, Blue, Red, ____?',
        a: ['Yellow', 'Green', 'Blue', 'Black'],
        correct: 2,
        hint: 'The colors alternate back and forth.',
        explanation: 'Red is followed by Blue, so after Red comes Blue.'
      },
      {
        q: 'Which one does NOT belong with the others?',
        a: ['Dog', 'Cat', 'Bird', 'Chair'],
        correct: 3,
        hint: 'Three of these are living pets.',
        explanation: 'Chair is a piece of furniture; the rest are living animals.'
      },
      {
        q: 'What number comes next: 2, 4, 6, 8, ____?',
        a: ['9', '10', '11', '12'],
        correct: 1,
        hint: 'Add 2 each time (even numbers).',
        explanation: '8 + 2 = 10.'
      },
      {
        q: 'Day is to Sun as Night is to ______?',
        a: ['Stars', 'Moon', 'Clouds', 'Rain'],
        correct: 1,
        hint: 'What bright orb shines during clear night skies?',
        explanation: 'The Sun illuminates the day, and the Moon illuminates the night.'
      },
      {
        q: 'If yesterday was Friday, what day is today?',
        a: ['Thursday', 'Saturday', 'Sunday', 'Monday'],
        correct: 1,
        hint: 'The weekend begins with this day.',
        explanation: 'The day right after Friday is Saturday.'
      }
    ],

    [BANDS.EARLY_PRIMARY]: [
      {
        q: 'Complete the number series: 5, 10, 15, 20, ____?',
        a: ['22', '25', '30', '35'],
        correct: 1,
        hint: 'Skip counting by 5.',
        explanation: 'Each number increases by 5: 20 + 5 = 25.'
      },
      {
        q: 'Doctor is to Hospital as Teacher is to ______?',
        a: ['Office', 'School', 'Laboratory', 'Store'],
        correct: 1,
        hint: 'Where does a teacher conduct lessons daily?',
        explanation: 'A doctor works in a hospital; a teacher works in a school.'
      },
      {
        q: 'If ALL roses are flowers, and some flowers are red, can we conclude all roses are red?',
        a: ['Yes, definitely', 'No, not necessarily', 'Only in winter', 'Never'],
        correct: 1,
        hint: 'Roses can also be yellow, pink, or white.',
        explanation: 'Only some flowers are red; roses come in many distinct colors.'
      },
      {
        q: 'Which letter comes next in the sequence: A, C, E, G, ____?',
        a: ['H', 'I', 'J', 'K'],
        correct: 1,
        hint: 'Skip one letter each time (A, skip B, C, skip D, E, skip F, G, skip H...).',
        explanation: 'Skipping H yields the letter I.'
      },
      {
        q: 'Four friends line up: Sam is behind Leo, and Mia is in front of Leo. Who is first in line?',
        a: ['Sam', 'Leo', 'Mia', 'Cannot tell'],
        correct: 2,
        hint: 'Mia is ahead of Leo, who is ahead of Sam.',
        explanation: 'Order from front: Mia → Leo → Sam. Mia is first.'
      }
    ],

    [BANDS.PRIMARY]: [
      {
        q: 'Find the missing number in the sequence: 3, 6, 12, 24, ____?',
        a: ['30', '36', '48', '52'],
        correct: 2,
        hint: 'Each number is multiplied by 2 (doubled).',
        explanation: '24 × 2 = 48.'
      },
      {
        q: 'In a code, if "CAT" is written as "DBU", how is "DOG" written?',
        a: ['EPH', 'ENF', 'CPI', 'EOH'],
        correct: 0,
        hint: 'Each letter is shifted forward by 1 in the alphabet: C→D, A→B, T→U.',
        explanation: 'D + 1 = E, O + 1 = P, G + 1 = H → EPH.'
      },
      {
        q: 'Pointing to a photograph, Rohan said, "She is my mother\'s only daughter." Who is in the photo?',
        a: ['Rohan\'s Mother', 'Rohan\'s Sister', 'Rohan\'s Aunt', 'Rohan\'s Daughter'],
        correct: 1,
        hint: 'Your mother\'s daughter is your...',
        explanation: 'A mother\'s daughter is a sister.'
      },
      {
        q: 'If South-East becomes North, and North-East becomes West, what will West become?',
        a: ['North-West', 'South-East', 'South-West', 'North'],
        correct: 1,
        hint: 'The coordinate directions are rotated clockwise by 135°.',
        explanation: 'Rotating West by 135° clockwise turns it into South-East.'
      },
      {
        q: 'Which word is the odd one out: Square, Cube, Circle, Triangle?',
        a: ['Square', 'Cube', 'Circle', 'Triangle'],
        correct: 1,
        hint: 'Check the dimensions (2D vs 3D).',
        explanation: 'A cube is a 3-dimensional solid; the rest are 2-dimensional plane shapes.'
      }
    ],

    [BANDS.MIDDLE]: [
      {
        q: 'What is the next number in the series: 1, 4, 9, 16, 25, ____?',
        a: ['30', '36', '42', '49'],
        correct: 1,
        hint: 'These are consecutive squares: 1², 2², 3², 4², 5²...',
        explanation: '6² = 36.'
      },
      {
        q: 'Statements: All cats are mammals. All mammals are animals. Conclusion: Are all cats animals?',
        a: ['Yes, valid deduction', 'No, invalid deduction', 'Only wild cats', 'Cannot be verified'],
        correct: 0,
        hint: 'Syllogism transitive property: A ⊂ B and B ⊂ C implies A ⊂ C.',
        explanation: 'Because the subset of cats belongs to mammals and all mammals belong to animals, all cats are animals.'
      },
      {
        q: 'If in a clock, the time is 3:30, what is the angle between the hour hand and minute hand?',
        a: ['70°', '75°', '80°', '90°'],
        correct: 1,
        hint: 'At 3:30, the minute hand is at 6 (180°) and the hour hand is halfway between 3 and 4 (105°).',
        explanation: '180° - 105° = 75°.'
      },
      {
        q: 'Find the missing number in the matrix: [2, 4, 8], [3, 9, 27], [4, 16, ?]',
        a: ['32', '48', '64', '72'],
        correct: 2,
        hint: 'Each row shows: n, n², n³.',
        explanation: '4³ = 4 × 4 × 4 = 64.'
      },
      {
        q: 'A is older than B. C is older than A. D is older than C. Who is the youngest among them?',
        a: ['A', 'B', 'C', 'D'],
        correct: 1,
        hint: 'Arrange in descending order: D > C > A > B.',
        explanation: 'B is younger than A, who is younger than C and D. B is the youngest.'
      }
    ],

    [BANDS.SECONDARY]: [
      {
        q: 'Look at the series: 2, 6, 12, 20, 30, ____? What comes next?',
        a: ['40', '42', '44', '48'],
        correct: 1,
        hint: 'Differences between terms: +4, +6, +8, +10, so next difference is +12.',
        explanation: '30 + 12 = 42 (also n² + n: 6² + 6 = 42).'
      },
      {
        q: 'Statement: "Most engineers are analytical." Premise: Alex is an engineer. Conclusion: Alex is analytical.',
        a: ['Definitely true', 'Probably true but not certain', 'Definitely false', 'Irrelevant'],
        correct: 1,
        hint: '"Most" does not mean "all".',
        explanation: 'Because only a majority of engineers are analytical, it is probable but not guaranteed.'
      },
      {
        q: 'In a code, SYSTEM is written as METSYS, and MOTHER is written as REHTOM. How is SCHOOL written?',
        a: ['LOOHCS', 'LOOHSC', 'LHOOCS', 'OLOHCS'],
        correct: 0,
        hint: 'The entire string is reversed in place.',
        explanation: 'Reversing S-C-H-O-O-L gives L-O-O-H-C-S.'
      },
      {
        q: 'If A + B means A is the brother of B; A - B means A is the sister of B; A * B means A is the father of B. What does P * Q - R mean?',
        a: ['P is the uncle of R', 'P is the father of R', 'P is the brother of R', 'P is the son of R'],
        correct: 1,
        hint: 'P is father of Q, and Q is sister of R. Therefore P is father of R.',
        explanation: 'Since Q and R are siblings, their father is P.'
      },
      {
        q: 'Five persons A, B, C, D, E sit in a circle facing the center. B is to the immediate right of A. E is between C and A. Who is to the left of B?',
        a: ['A', 'C', 'D', 'E'],
        correct: 0,
        hint: 'Since B is to the immediate right of A, facing center, A is to the immediate left of B.',
        explanation: 'Mutual circular neighbor facing inward: A is directly to B\'s left.'
      }
    ],

    [BANDS.SENIOR_SECONDARY]: [
      {
        q: 'Find the next number in the Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13, 21, ____?',
        a: ['28', '31', '34', '37'],
        correct: 2,
        hint: 'Each term is the sum of the preceding two terms: 13 + 21.',
        explanation: '13 + 21 = 34.'
      },
      {
        q: 'Critical Reasoning: "All successful entrepreneurs are risk-tolerant. Some visionaries are successful entrepreneurs." Which deduction must be true?',
        a: ['All visionaries are risk-tolerant', 'Some visionaries are risk-tolerant', 'No visionaries take risks', 'All risk-tolerant people are entrepreneurs'],
        correct: 1,
        hint: 'The visionaries who are successful entrepreneurs must also possess the quality of risk-tolerance.',
        explanation: 'Intersection of sets guarantees that the subset of visionaries who are entrepreneurs are risk-tolerant.'
      },
      {
        q: 'In a tournament of 16 players, single elimination knockout format: how many total matches are required to determine the champion?',
        a: ['14', '15', '16', '31'],
        correct: 1,
        hint: 'In knockout tournaments with n players, exactly n - 1 players must be eliminated.',
        explanation: '16 - 1 = 15 matches.'
      },
      {
        q: 'What is the negation of the statement: "Every student in the class passed the examination"?',
        a: ['No student passed the examination', 'Every student failed the examination', 'At least one student did not pass the examination', 'All students took the test'],
        correct: 2,
        hint: 'The logical negation of universal quantifier (∀x P(x)) is existential (∃x ¬P(x)).',
        explanation: 'To disprove "all passed", only one single student needs to have not passed.'
      },
      {
        q: 'If code for DELHI is 73541 and CALCUTTA is 82589662, how will CALICUT be written?',
        a: ['8251896', '8254896', '8251886', '8251596'],
        correct: 0,
        hint: 'Direct letter substitution: C=8, A=2, L=5, I=1, C=8, U=9, T=6.',
        explanation: '8-2-5-1-8-9-6 matches CALICUT.'
      }
    ],

    [BANDS.EXTENDED]: [
      {
        q: 'Data Sufficiency: Is integer X even? Condition 1: 3X is even. Condition 2: X + 5 is odd.',
        a: ['Condition 1 alone is sufficient', 'Condition 2 alone is sufficient', 'Either condition alone is sufficient', 'Both together are insufficient'],
        correct: 2,
        hint: '3X is even → X must be even. X + 5 is odd → X must be even.',
        explanation: 'Each condition independently establishes that X is divisible by 2.'
      },
      {
        q: 'A lie detector test has 90% accuracy. 1% of the population are spies. If someone tests positive, what is the approximate probability they are actually a spy?',
        a: ['~8.3%', '~90%', '~50%', '~99%'],
        correct: 0,
        hint: 'Apply Bayes\' Theorem: False positives from 99% non-spies outnumber true positives from 1% spies.',
        explanation: 'P(Spy|Positive) = (0.90 × 0.01) / [(0.90 × 0.01) + (0.10 × 0.99)] = 0.009 / 0.108 ≈ 8.3%.'
      },
      {
        q: 'Three boxes are labeled Apples, Oranges, and Mixed. ALL three labels are known to be INCORRECT. You can pick only one fruit from one box. Which box should you pick from to fix all labels?',
        a: ['The box labeled Apples', 'The box labeled Oranges', 'The box labeled Mixed', 'Any box works'],
        correct: 2,
        hint: 'Since "Mixed" is definitely wrong, picking from it guarantees either 100% apples or 100% oranges, resolving the rest by deduction.',
        explanation: 'If you pick an Apple from "Mixed", it must be the Apple box. The Orange box must be Mixed, and the Apple box must be Oranges.'
      },
      {
        q: 'Identify the cognitive bias: Continuing to invest time or capital into a failing venture simply because of prior non-recoverable investments.',
        a: ['Confirmation Bias', 'Sunk Cost Fallacy', 'Availability Heuristic', 'Anchoring Bias'],
        correct: 1,
        hint: '"Throwing good money after bad."',
        explanation: 'The sunk cost fallacy describes irrational commitment to an endeavor driven by past irrecoverable expenses.'
      },
      {
        q: 'If the statement "Some innovative companies fail" is TRUE, which of the following is necessarily FALSE?',
        a: ['All innovative companies succeed', 'No innovative companies succeed', 'Some innovative companies succeed', 'Innovation guarantees failure'],
        correct: 0,
        hint: 'If some fail, it is impossible for all of them to succeed.',
        explanation: '"All succeed" directly contradicts the verified premise that "some fail".'
      }
    ]
  },

  // ==========================================
  // COMPUTER
  // ==========================================
  Computer: {
    [BANDS.FOUNDATION]: [
      {
        q: 'Which device is used to type letters and numbers into a computer?',
        a: ['Mouse', 'Keyboard', 'Speaker', 'Camera'],
        correct: 1,
        hint: 'It has many buttons with letters A to Z.',
        explanation: 'A keyboard is the primary input device for text.'
      },
      {
        q: 'What is the television-like screen of a computer called?',
        a: ['Monitor', 'Printer', 'Mouse', 'CPU'],
        correct: 0,
        hint: 'It displays pictures, games, and videos.',
        explanation: 'The monitor or display screen visually presents graphics and content.'
      },
      {
        q: 'What hand-held device is clicked to move the arrow on the screen?',
        a: ['Speaker', 'Mouse', 'Headphones', 'Battery'],
        correct: 1,
        hint: 'Named after a small squeaky animal.',
        explanation: 'A computer mouse points and clicks on interface elements.'
      },
      {
        q: 'Should you eat and drink liquids right over your computer keyboard?',
        a: ['Yes, always', 'No, never', 'Only sticky juice', 'Only during video games'],
        correct: 1,
        hint: 'Spilled water can damage the electrical circuits.',
        explanation: 'Food and drinks can spill and permanently ruin electronic hardware.'
      },
      {
        q: 'Which machine is portable and folds open like a notebook?',
        a: ['Desktop Tower', 'Laptop', 'Refrigerator', 'Television'],
        correct: 1,
        hint: 'You can carry it in a backpack.',
        explanation: 'A laptop is a compact, battery-powered portable personal computer.'
      }
    ],

    [BANDS.EARLY_PRIMARY]: [
      {
        q: 'What does "CPU" stand for in computing?',
        a: ['Central Processing Unit', 'Computer Personal Unit', 'Central Power Utility', 'Color Printing Unit'],
        correct: 0,
        hint: 'Often referred to as the "Brain of the Computer".',
        explanation: 'The Central Processing Unit carries out instructions of computer programs.'
      },
      {
        q: 'Which key on the keyboard creates a space between words?',
        a: ['Enter Key', 'Shift Key', 'Spacebar', 'Backspace'],
        correct: 2,
        hint: 'The longest horizontal key at the bottom.',
        explanation: 'The spacebar inserts blank spaces between characters.'
      },
      {
        q: 'What should you do if an unfamiliar stranger asks for your password online?',
        a: ['Tell them immediately', 'Never share your password and tell a parent/teacher', 'Post it publicly', 'Change it to 1234'],
        correct: 1,
        hint: 'Passwords must always stay strictly private and confidential.',
        explanation: 'Never disclose passwords; notify trusted adults to maintain safety.'
      },
      {
        q: 'Which of these is used to print digital pictures or text onto physical paper?',
        a: ['Scanner', 'Printer', 'Monitor', 'Projector'],
        correct: 1,
        hint: 'Uses ink or toner to produce paper documents.',
        explanation: 'A printer produces hard-copy physical printouts.'
      },
      {
        q: 'What does the abbreviation "WWW" stand for in website addresses?',
        a: ['World Wide Web', 'World With Wings', 'Wide World Wire', 'Web Wide World'],
        correct: 0,
        hint: 'The global information system invented by Tim Berners-Lee.',
        explanation: 'World Wide Web represents interconnected hypertext documents accessed via Internet.'
      }
    ],

    [BANDS.PRIMARY]: [
      {
        q: 'What is an "Algorithm" in computer science?',
        a: ['A broken computer cable', 'A step-by-step set of instructions to solve a problem', 'A type of computer screen', 'A video game score'],
        correct: 1,
        hint: 'Like a recipe in cooking, following ordered steps to produce an outcome.',
        explanation: 'An algorithm is a finite sequence of well-defined computer-implementable steps.'
      },
      {
        q: 'What does "RAM" stand for in hardware?',
        a: ['Random Access Memory', 'Read All Memory', 'Rapid Action Module', 'Run Application Machine'],
        correct: 0,
        hint: 'Volatile memory used to store active operational programs.',
        explanation: 'Random Access Memory provides fast read/write access for active running tasks.'
      },
      {
        q: 'Which file extension typically denotes a digital image/picture?',
        a: ['.mp3', '.jpg', '.exe', '.docx'],
        correct: 1,
        hint: 'Joint Photographic Experts Group format.',
        explanation: '.jpg (and .png) are standard compressed image formats.'
      },
      {
        q: 'Which programming language uses visual drag-and-drop colorful blocks for young learners?',
        a: ['C++', 'Assembly', 'Scratch', 'Fortran'],
        correct: 2,
        hint: 'Developed by MIT Media Lab with a cat mascot.',
        explanation: 'Scratch is a block-based visual programming environment designed for education.'
      },
      {
        q: 'What is a "Computer Virus"?',
        a: ['Biological bacteria inside the fan', 'A malicious software program designed to cause harm', 'Dust on the keyboard', 'An expired battery'],
        correct: 1,
        hint: 'Malware that replicates and corrupts files.',
        explanation: 'A computer virus is malicious code that replicates by copying itself to alter normal computer operations.'
      }
    ],

    [BANDS.MIDDLE]: [
      {
        q: 'In Python, what is the output of: print(5 + 3 * 2)?',
        a: ['16', '11', '13', '10'],
        correct: 1,
        hint: 'Follow standard operator precedence (multiplication happens before addition: 3*2 = 6, then +5).',
        explanation: 'PEMDAS/BODMAS rule: 3 × 2 = 6, and 5 + 6 = 11.'
      },
      {
        q: 'What does "HTML" stand for in web development?',
        a: ['Hypertext Markup Language', 'High Technology Modern Language', 'Hyperlink Text Machine Language', 'Home Tool Markup Language'],
        correct: 0,
        hint: 'The standard foundational code used to structure webpages.',
        explanation: 'HTML stands for HyperText Markup Language, the backbone of website structures.'
      },
      {
        q: 'Which protocol secures web communication with encryption (padlock icon in browser)?',
        a: ['HTTP', 'FTP', 'HTTPS', 'SMTP'],
        correct: 2,
        hint: 'HyperText Transfer Protocol Secure.',
        explanation: 'HTTPS encrypts transmitted web traffic via Transport Layer Security (TLS/SSL).'
      },
      {
        q: 'What is a "Bug" in computer programming?',
        a: ['An insect nesting in the keyboard', 'An error or flaw in code causing unintended behavior', 'A hardware upgrade', 'A fast internet connection'],
        correct: 1,
        hint: 'Grace Hopper famously documented an early instance involving a moth in a relay.',
        explanation: 'A software bug is an error or fault in source code producing unexpected results.'
      },
      {
        q: 'How many bits make up one single Byte?',
        a: ['4 bits', '8 bits', '16 bits', '32 bits'],
        correct: 1,
        hint: 'A nibble is 4 bits; a byte is double that.',
        explanation: '1 Byte = 8 bits.'
      }
    ],

    [BANDS.SECONDARY]: [
      {
        q: 'Which data structure follows the "Last-In, First-Out" (LIFO) principle?',
        a: ['Queue', 'Stack', 'Array', 'Linked List'],
        correct: 1,
        hint: 'Like a stack of plates: the last plate placed on top is the first one removed.',
        explanation: 'A Stack operates under LIFO principles (push on top, pop from top).'
      },
      {
        q: 'What does "SQL" stand for in database management?',
        a: ['Structured Query Language', 'Simple Question Logic', 'Server Quick Link', 'System Quality Language'],
        correct: 0,
        hint: 'Used to create, query, and manipulate relational databases.',
        explanation: 'Structured Query Language (SQL) is the domain-specific standard for relational databases.'
      },
      {
        q: 'What is the binary representation of the decimal number 13?',
        a: ['1011', '1101', '1110', '1001'],
        correct: 1,
        hint: '8 + 4 + 0 + 1.',
        explanation: '13 = 1×8 + 1×4 + 0×2 + 1×1 = 1101₂.'
      },
      {
        q: 'Which network device connects multiple networks and directs data packets along optimal paths?',
        a: ['Hub', 'Switch', 'Router', 'Repeater'],
        correct: 2,
        hint: 'Directs traffic between your local home Wi-Fi and the wider Internet.',
        explanation: 'Routers forward data packets across disparate computer networks using IP routing tables.'
      },
      {
        q: 'What is "Phishing" in cybersecurity?',
        a: ['Catching virtual fish in a game', 'Fraudulent attempts to steal sensitive credentials via deceptive emails', 'Accelerating CPU clock speeds', 'Backing up files to external drives'],
        correct: 1,
        hint: 'Deceptive social engineering attacks masquerading as reputable entities.',
        explanation: 'Phishing tricks individuals into revealing credentials or financial data.'
      }
    ],

    [BANDS.SENIOR_SECONDARY]: [
      {
        q: 'What is the worst-case time complexity of Binary Search on a sorted array of n elements?',
        a: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correct: 2,
        hint: 'The search interval is halved on every iteration.',
        explanation: 'Binary Search halves search space repeatedly, yielding logarithmic time O(log n).'
      },
      {
        q: 'In Object-Oriented Programming (OOP), what principle allows a derived class to override methods of its parent class?',
        a: ['Polymorphism', 'Encapsulation', 'Abstraction', 'Compilation'],
        correct: 0,
        hint: 'From Greek "many shapes": methods behave differently based on the calling object.',
        explanation: 'Polymorphism enables objects to be treated as instances of their parent class while executing overridden behaviors.'
      },
      {
        q: 'In relational database theory, what does ACID stand for regarding transactions?',
        a: ['Atomicity, Consistency, Isolation, Durability', 'Access, Control, Index, Data', 'Automatic, Continuous, Integrated, Distributed', 'Array, Cache, Interface, Driver'],
        correct: 0,
        hint: 'Core guarantees ensuring database transaction reliability.',
        explanation: 'ACID guarantees that database transactions are executed reliably even through crashes.'
      },
      {
        q: 'Which cryptographic approach uses a public key for encryption and a separate private key for decryption?',
        a: ['Symmetric Key Encryption', 'Asymmetric (Public-Key) Cryptography', 'Hashing Algorithms', 'Steganography'],
        correct: 1,
        hint: 'RSA and ECC are classic examples.',
        explanation: 'Asymmetric cryptography utilizes mathematical key pairs (public encryption, private decryption).'
      },
      {
        q: 'In the TCP/IP model, which layer is responsible for end-to-end process-to-process communication and flow control?',
        a: ['Network / Internet Layer', 'Transport Layer', 'Application Layer', 'Data Link Layer'],
        correct: 1,
        hint: 'TCP and UDP operate at this layer.',
        explanation: 'The Transport layer establishes host-to-host communication channels (ports, retransmissions, sequencing).'
      }
    ],

    [BANDS.EXTENDED]: [
      {
        q: 'What foundational deep learning architecture powers modern Large Language Models (e.g. GPT, Gemini)?',
        a: ['Convolutional Neural Network (CNN)', 'Recurrent Neural Network (RNN)', 'Transformer Architecture with Self-Attention', 'Support Vector Machine (SVM)'],
        correct: 2,
        hint: 'Introduced by Google researchers in the seminal 2017 paper "Attention Is All You Need".',
        explanation: 'The Transformer architecture uses multi-head self-attention mechanisms to process tokens in parallel.'
      },
      {
        q: 'What does "Zero Trust" security architecture fundamentally mandate?',
        a: ['Trust everyone inside the firewall', 'Never trust, always verify every request regardless of origin', 'Eliminate all passwords in favor of open access', 'Only allow traffic during daylight hours'],
        correct: 1,
        hint: 'Treat internal and external network traffic as equally untrusted.',
        explanation: 'Zero Trust requires continuous authentication, least privilege access, and strict verification.'
      },
      {
        q: 'What is the primary role of a "Kubernetes" cluster in modern cloud-native software architecture?',
        a: ['Compiling C++ games', 'Automated deployment, scaling, and orchestration of application containers', 'Formatting hard drives', 'Designing UI wireframes'],
        correct: 1,
        hint: 'Container orchestration engine originally designed by Google.',
        explanation: 'Kubernetes automates management, scaling, and failover of containerized applications in cloud clusters.'
      },
      {
        q: 'In API architecture, what does "REST" stand for?',
        a: ['Representational State Transfer', 'Remote Execution Standard Transfer', 'Rapid Encrypted Socket Transport', 'Relational Entity Storage Tool'],
        correct: 0,
        hint: 'Architectural style utilizing standard HTTP methods like GET, POST, PUT, DELETE.',
        explanation: 'REST is an architectural pattern for stateless distributed web service communication.'
      },
      {
        q: 'What consensus mechanism does Bitcoin utilize to secure its decentralized blockchain ledger?',
        a: ['Proof of Stake (PoS)', 'Proof of Work (PoW)', 'Delegated BFT', 'Round Robin Voting'],
        correct: 1,
        hint: 'Requires miners to solve computationally intensive SHA-256 cryptographic puzzles.',
        explanation: 'Proof of Work requires expenditure of computational hash power to validate transaction blocks.'
      }
    ]
  }
};

/**
 * Helper to fetch adaptive quiz questions for any subject and learning band
 * Returns 5 questions tailored to that specific band
 */
export function getAdaptiveQuestions(subject, band = BANDS.MIDDLE) {
  // Normalize subject lookup
  const cleanSubject = String(subject || 'Maths').trim();

  // Try direct subject match
  let subjectBank = ADAPTIVE_QUIZ_QUESTIONS[cleanSubject];

  // Try case-insensitive lookup
  if (!subjectBank) {
    const matchedKey = Object.keys(ADAPTIVE_QUIZ_QUESTIONS).find(
      k => k.toLowerCase() === cleanSubject.toLowerCase()
    );
    if (matchedKey) subjectBank = ADAPTIVE_QUIZ_QUESTIONS[matchedKey];
  }

  // Fallback to Maths if subject doesn't exist
  if (!subjectBank) {
    subjectBank = ADAPTIVE_QUIZ_QUESTIONS.Maths;
  }

  // Look up band questions
  const bandQuestions = subjectBank[band];
  if (bandQuestions && bandQuestions.length > 0) {
    return bandQuestions;
  }

  // Fallback to Middle band questions if specific band is missing
  return subjectBank[BANDS.MIDDLE] || Object.values(subjectBank)[0];
}

/**
 * Get the syllabus description for a subject and band
 */
export function getSyllabusDescription(subject, band = BANDS.MIDDLE) {
  const bandSyllabus = SYLLABUS_BY_BAND[band] || SYLLABUS_BY_BAND[BANDS.MIDDLE];
  return bandSyllabus[subject] || 'Curriculum-aligned cognitive drills and speed problem solving.';
}
