// ZeroCode Ventures — Branch & service data for MCP tools

export const COMPANY = {
  name: "ZeroCode Ventures",
  tagline: "AI-medewerkers voor het MKB",
  website: "https://zerocodeventures.nl",
  contact: {
    whatsapp: "https://wa.me/31653204361",
    phone: "+31 6 53204361",
    email: "info@zerocodeventures.nl",
    aiScan: "https://zerocodeventures.nl/bestellen",
  },
  location: "Nederland",
  description:
    "ZeroCode Ventures bouwt AI-medewerkers en maatwerksoftware voor het Nederlandse MKB. Van WhatsApp-chatbots die klanten te woord staan tot complete automatiseringsoplossingen. Geen standaardpakket — alles wordt op maat gemaakt voor jouw branche en bedrijf.",
};

export const SERVICES = [
  {
    id: "ai-employee",
    name: "AI-Medewerker",
    description:
      "Een slimme WhatsApp-assistent die jullie klanten 24/7 te woord staat. Beantwoordt vragen, plant afspraken in, volgt leads op en escaleert naar een mens wanneer nodig.",
    startingPrice: "vanaf €297/maand",
    deliveryTime: "Live binnen 5 werkdagen",
    features: [
      "24/7 beschikbaar via WhatsApp",
      "Automatisch afspraken inplannen",
      "Lead opvolging en kwalificatie",
      "Koppeling met jullie systemen (CRM, agenda, etc.)",
      "Escalatie naar mens wanneer nodig",
      "Meertalig (NL, EN, DE, FR, ES)",
    ],
  },
  {
    id: "custom-software",
    name: "Maatwerk Software",
    description:
      "Software die doet wat jouw bedrijf nodig heeft. Dashboards, koppelingen, interne tools, automatiseringen. Geen standaardpakket, geen maanden wachten.",
    startingPrice: "vanaf €2.500 (eenmalig)",
    deliveryTime: "Eerste versie in 2-4 weken",
    features: [
      "Dashboards & klantportalen",
      "API-koppelingen & integraties",
      "Interne tools op maat",
      "Automatisering van repetitief werk",
      "WhatsApp & chat integraties",
      "Data & rapportages",
    ],
  },
  {
    id: "websites",
    name: "Websites",
    description:
      "Professionele websites gebouwd met Next.js. Snel, SEO-geoptimaliseerd en meertalig. Inclusief hosting op Vercel.",
    startingPrice: "vanaf €1.500",
    deliveryTime: "Live binnen 2 weken",
    features: [
      "Next.js & Tailwind CSS",
      "SEO-geoptimaliseerd",
      "Meertalig (NL, EN, DE, FR, ES)",
      "Responsive design",
      "Vercel hosting",
      "CMS-integratie mogelijk",
    ],
  },
];

export const BRANCHES = {
  makelaars: {
    name: "Makelaars & Vastgoed",
    timeSaved: "15 uur/week",
    useCases: [
      "Leads automatisch opvolgen via WhatsApp",
      "Bezichtigingen inplannen",
      "Woningbeschrijvingen genereren",
      "Vragen over woningen 24/7 beantwoorden",
    ],
    price: "vanaf €297/maand",
  },
  accountants: {
    name: "Accountants & Administratie",
    timeSaved: "18 uur/week",
    useCases: [
      "Klantvragen beantwoorden over deadlines en documenten",
      "Afspraken inplannen",
      "Document-intake automatiseren",
      "Herinneringen sturen voor belastingaangiftes",
    ],
    price: "vanaf €297/maand",
  },
  webshops: {
    name: "Webshops & E-commerce",
    timeSaved: "20 uur/week",
    useCases: [
      "Orderstatus updates via WhatsApp",
      "Productadvies en aanbevelingen",
      "Retourverwerking automatiseren",
      "Klantenservice 24/7",
    ],
    price: "vanaf €297/maand",
  },
  horeca: {
    name: "Horeca & Restaurants",
    timeSaved: "12 uur/week",
    useCases: [
      "Reserveringen aannemen via WhatsApp",
      "Menu-informatie en allergenen",
      "Groepsboekingen afhandelen",
      "Bestellingen opnemen",
    ],
    price: "vanaf €297/maand",
  },
  bouw: {
    name: "Bouw & Aannemers",
    timeSaved: "10 uur/week",
    useCases: [
      "Offerteaanvragen automatisch verwerken",
      "Planning en afspraken beheren",
      "Klanten updaten over projectstatus",
      "Materiaalprijzen opvragen",
    ],
    price: "vanaf €297/maand",
  },
  juridisch: {
    name: "Juridische Kantoren",
    timeSaved: "14 uur/week",
    useCases: [
      "Intake van nieuwe zaken automatiseren",
      "Afspraken inplannen met cliënten",
      "Veelgestelde juridische vragen beantwoorden",
      "Document-intake en kwalificatie",
    ],
    price: "vanaf €297/maand",
  },
  installateurs: {
    name: "Installateurs & Klusbedrijven",
    timeSaved: "8 uur/week",
    useCases: [
      "Storingen aannemen en prioriteren",
      "Onderhoudsafspraken inplannen",
      "Offerteaanvragen verwerken",
      "Klanten updaten over planning",
    ],
    price: "vanaf €297/maand",
  },
  kapsalons: {
    name: "Kapsalons & Beauty",
    timeSaved: "6 uur/week",
    useCases: [
      "Online afspraken boeken via WhatsApp",
      "Herinneringen sturen",
      "Productadvies geven",
      "Wachtlijstbeheer",
    ],
    price: "vanaf €297/maand",
  },
  schoonmaak: {
    name: "Schoonmaakbedrijven",
    timeSaved: "8 uur/week",
    useCases: [
      "Offerteaanvragen automatisch verwerken",
      "Planning en roosters beheren",
      "Klachten en feedback afhandelen",
      "Eenmalige boekingen aannemen",
    ],
    price: "vanaf €297/maand",
  },
  autobedrijven: {
    name: "Autobedrijven & Garages",
    timeSaved: "10 uur/week",
    useCases: [
      "APK-herinneringen sturen",
      "Werkplaatsafspraken inplannen",
      "Voorraadvragen beantwoorden",
      "Offerte voor reparaties",
    ],
    price: "vanaf €297/maand",
  },
  warmtepompen: {
    name: "Warmtepomp Installateurs",
    timeSaved: "10 uur/week",
    useCases: [
      "Adviesgesprekken inplannen",
      "Subsidie-informatie delen",
      "Offerteaanvragen verwerken",
      "Technische vragen beantwoorden",
    ],
    price: "vanaf €297/maand",
  },
  airco: {
    name: "Airco Installateurs",
    timeSaved: "10 uur/week",
    useCases: [
      "Seizoensgebonden piekvragen afvangen",
      "Installatie-afspraken inplannen",
      "Onderhoudscontracten beheren",
      "Technisch advies geven",
    ],
    price: "vanaf €297/maand",
  },
  glaszetters: {
    name: "Glaszetters & Glashandels",
    timeSaved: "8 uur/week",
    useCases: [
      "Noodglas-aanvragen 24/7 aannemen",
      "Offertes voor dubbelglas",
      "Afspraken inplannen",
      "Voorraad en levertijden communiceren",
    ],
    price: "vanaf €297/maand",
  },
  kozijnen: {
    name: "Kozijnen & Ramen",
    timeSaved: "9 uur/week",
    useCases: [
      "Inmeetafspraken inplannen",
      "Materiaal en kleuropties adviseren",
      "Offerteaanvragen verwerken",
      "Levertijd communiceren",
    ],
    price: "vanaf €297/maand",
  },
  trapliften: {
    name: "Trapliftbedrijven",
    timeSaved: "8 uur/week",
    useCases: [
      "Adviesgesprekken aan huis inplannen",
      "Subsidie-informatie delen",
      "Offerteaanvragen verwerken",
      "Technische vragen beantwoorden",
    ],
    price: "vanaf €297/maand",
  },
  rietdekkers: {
    name: "Rietdekkers",
    timeSaved: "8 uur/week",
    useCases: [
      "Inspectie-afspraken inplannen",
      "Offerteaanvragen verwerken",
      "Seizoensplanning beheren",
      "Onderhoudstips delen",
    ],
    price: "vanaf €297/maand",
  },
  zonwering: {
    name: "Zonwering & Raamdecoratie",
    timeSaved: "7 uur/week",
    useCases: [
      "Inmeetafspraken inplannen",
      "Productadvies geven",
      "Offerteaanvragen verwerken",
      "Seizoensacties communiceren",
    ],
    price: "vanaf €297/maand",
  },
  gevelreiniging: {
    name: "Gevelreiniging",
    timeSaved: "7 uur/week",
    useCases: [
      "Inspectie-afspraken inplannen",
      "Offerteaanvragen verwerken",
      "Voor/na foto's delen met klanten",
      "Seizoensplanning beheren",
    ],
    price: "vanaf €297/maand",
  },
  hekwerk: {
    name: "Hekwerk & Schuttingen",
    timeSaved: "7 uur/week",
    useCases: [
      "Inmeetafspraken inplannen",
      "Materiaalkeuze adviseren",
      "Offerteaanvragen verwerken",
      "Planning communiceren",
    ],
    price: "vanaf €297/maand",
  },
  bestrating: {
    name: "Bestrating & Straatwerk",
    timeSaved: "7 uur/week",
    useCases: [
      "Projectafspraken inplannen",
      "Materiaalkeuze adviseren",
      "Offerteaanvragen verwerken",
      "Weersafhankelijke planning",
    ],
    price: "vanaf €297/maand",
  },
  boomverzorging: {
    name: "Boomverzorging",
    timeSaved: "7 uur/week",
    useCases: [
      "Inspectie-afspraken inplannen",
      "Noodkap-aanvragen verwerken",
      "Offertes voor snoeiwerk",
      "Seizoensadvies geven",
    ],
    price: "vanaf €297/maand",
  },
  hondenuitlaat: {
    name: "Hondenuitlaatservices",
    timeSaved: "5 uur/week",
    useCases: [
      "Boekingen en roosters beheren",
      "Updates naar eigenaren sturen",
      "Nieuwe klanten intake",
      "Vakantieplanning beheren",
    ],
    price: "vanaf €297/maand",
  },
  vloerverwarming: {
    name: "Vloerverwarming",
    timeSaved: "8 uur/week",
    useCases: [
      "Adviesgesprekken inplannen",
      "Technische vragen beantwoorden",
      "Offerteaanvragen verwerken",
      "Installatieplanning beheren",
    ],
    price: "vanaf €297/maand",
  },
  bruidsfotografen: {
    name: "Bruidsfotografen",
    timeSaved: "6 uur/week",
    useCases: [
      "Beschikbaarheid checken en boekingen",
      "Pakketten en prijzen communiceren",
      "Kennismakingsgesprekken inplannen",
      "Foto-selectie en levering coördineren",
    ],
    price: "vanaf €297/maand",
  },
  standbouw: {
    name: "Standbouwers",
    timeSaved: "8 uur/week",
    useCases: [
      "Offerteaanvragen voor beurzen verwerken",
      "Planning en logistiek coördineren",
      "Designwensen inventariseren",
      "Beurskalender delen",
    ],
    price: "vanaf €297/maand",
  },
  veranda: {
    name: "Veranda & Overkappingen",
    timeSaved: "7 uur/week",
    useCases: [
      "Showroomafspraken inplannen",
      "Materiaalkeuze adviseren",
      "Offerteaanvragen verwerken",
      "Bouwvergunning-info delen",
    ],
    price: "vanaf €297/maand",
  },
  schoorsteenvegers: {
    name: "Schoorsteenvegers",
    timeSaved: "6 uur/week",
    useCases: [
      "Veeg-afspraken inplannen",
      "Seizoensherinneringen sturen",
      "Inspectierapporten delen",
      "Noodgevallen afhandelen",
    ],
    price: "vanaf €297/maand",
  },
  poetsbureaus: {
    name: "Poetsbureaus & Huishoudelijke Hulp",
    timeSaved: "6 uur/week",
    useCases: [
      "Nieuwe klanten matchen met hulpen",
      "Roosterwijzigingen verwerken",
      "Vervanging regelen bij ziekte",
      "Feedback verzamelen",
    ],
    price: "vanaf €297/maand",
  },
};

export const PRICING = {
  aiEmployee: {
    name: "AI-Medewerker",
    plans: [
      {
        name: "Starter",
        price: "€297/maand",
        features: [
          "1 WhatsApp-nummer",
          "Basisvragen beantwoorden",
          "Afspraken inplannen",
          "Maandelijks opzegbaar",
        ],
      },
      {
        name: "Groei",
        price: "€497/maand",
        features: [
          "Alles van Starter",
          "CRM-koppeling",
          "Lead kwalificatie",
          "Meertalig",
          "Geavanceerde flows",
        ],
      },
      {
        name: "Enterprise",
        price: "Op maat",
        features: [
          "Alles van Groei",
          "Meerdere kanalen",
          "Custom integraties",
          "Dedicated support",
          "SLA",
        ],
      },
    ],
  },
  customSoftware: {
    note: "Vaste prijs per project, vooraf afgesproken. Geen uurje-factuurtje.",
    ranges: [
      { type: "Simpele koppeling/tool", price: "€2.500 - €5.000" },
      { type: "Dashboard of portaal", price: "€5.000 - €15.000" },
      { type: "Compleet platform", price: "€15.000 - €50.000" },
    ],
  },
};
