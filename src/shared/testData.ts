export interface DictionaryEntry {
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  definition: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
}

export const testDictionaryData: DictionaryEntry[] = [
  {
    word: "aberrant",
    pronunciation: "/ˈæbərənt/",
    partOfSpeech: "adjective", 
    definition: "departing from an accepted standard",
    example: "This aberrant behavior was noticed by several teachers.",
    synonyms: ["deviant", "abnormal", "atypical"],
    antonyms: ["normal", "typical", "standard"]
  },
  {
    word: "benevolent",
    pronunciation: "/bəˈnevələnt/",
    partOfSpeech: "adjective",
    definition: "well meaning and kindly",
    example: "He was known for his benevolent nature towards all creatures.",
    synonyms: ["kind", "compassionate", "charitable"],
    antonyms: ["malevolent", "cruel", "unkind"]
  },
  {
    word: "capitulate",
    pronunciation: "/kəˈpɪtʃəleɪt/",
    partOfSpeech: "verb",
    definition: "cease to resist an opponent or an unwelcome demand; surrender",
    example: "The enemy was forced to capitulate after the siege.",
    synonyms: ["surrender", "submit", "yield"],
    antonyms: ["resist", "fight", "oppose"]
  },
  {
    word: "diligent",
    pronunciation: "/ˈdɪlɪdʒənt/",
    partOfSpeech: "adjective",
    definition: "having or showing care and conscientiousness in one's work or duties",
    example: "She was a diligent student who always completed her assignments on time.",
    synonyms: ["hardworking", "conscientious", "careful"],
    antonyms: ["lazy", "careless", "negligent"]
  },
  {
    word: "eloquent",
    pronunciation: "/ˈeləkwənt/",
    partOfSpeech: "adjective",
    definition: "fluent or persuasive in speaking or writing",
    example: "The speaker gave an eloquent presentation that moved the audience.",
    synonyms: ["articulate", "persuasive", "fluent"],
    antonyms: ["inarticulate", "tongue-tied", "unclear"]
  },
  {
    word: "fastidious",
    pronunciation: "/fæˈstɪdiəs/",
    partOfSpeech: "adjective",
    definition: "very attentive to and concerned about accuracy and detail",
    example: "He was fastidious about keeping his workspace clean and organized.",
    synonyms: ["meticulous", "particular", "precise"],
    antonyms: ["careless", "sloppy", "negligent"]
  },
  {
    word: "gregarious",
    pronunciation: "/ɡrɪˈɡeriəs/",
    partOfSpeech: "adjective",
    definition: "fond of the company of others; sociable",
    example: "She was naturally gregarious and made friends easily.",
    synonyms: ["sociable", "outgoing", "friendly"],
    antonyms: ["antisocial", "reclusive", "solitary"]
  },
  {
    word: "haphazard",
    pronunciation: "/hæpˈhæzərd/",
    partOfSpeech: "adjective",
    definition: "lacking any obvious principle of organization",
    example: "The books were arranged in a haphazard manner on the shelf.",
    synonyms: ["random", "chaotic", "disorganized"],
    antonyms: ["organized", "systematic", "methodical"]
  }
];

export const searchFilters = [
  "All Parts of Speech",
  "Noun",
  "Verb", 
  "Adjective",
  "Adverb",
  "Preposition",
  "Conjunction",
  "Interjection"
];