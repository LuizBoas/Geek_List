type SpeciesTranslations = {
  [key: string]: string;
};

type GenderTranslations = {
  [key: string]: string;
};

type SpeciesColors = {
  [key: string]: string;
};

type TypeTranslations = {
  [key: string]: string;
};

type StatusTranslations = {
  [key: string]: string;
}

export const typeTranslations: TypeTranslations = {
  "Alien": "Alienígena",
  "Animal": "Animal",
  "Cronenberg": "Cronenberg (Mutante)",
  "Disease": "Doença",
  "Flora colossus": "Flora Colossus",
  "Gazorpian": "Gazorpiano",
  "Human": "Humano",
  "Humanoid": "Humanóide",
  "Mytholog": "Mitolog",
  "Parasite": "Parasita",
  "Poopybutthole": "Poopybutthole",
  "Robot": "Robô",
  "Unknown": "Desconhecido",
  "Vampire": "Vampiro",
  "Zigerion": "Zigerion",
  "Mythological Creature": "Criatura mitológica",
  "Fish-Person": "Pessoa Peixe",
  "": "Sem classificação"
};


export const speciesColors: SpeciesColors = {
  "Alien": "#FF5733",
  "Animal": "#F6E05E",
  "Cronenberg": "#6B46C1",
  "Disease": "#9CA3AF",
  "Human": "#3B82F6",
  "Humanoid": "#34D399",
  "Mytholog": "#FBBF24",
  "Poopybutthole": "#F87171",
  "Robot": "#4B5563",
  "Robot_Dog": "#669900",
  "Dinosaur": "#FF8800",
  "Parasite": "#CC0000",
  "Vampire": "#660033",
  "Unknown": "#D1D5DB",
};

export const speciesTranslations: SpeciesTranslations = {
  "Human": "Humano",
  "Alien": "Alienígena",
  "Robot": "Robô",
  "Cronenberg": "Cronenberg",
  "Mytholog": "Mitologia",
  "Animal": "Animal",
  "Humanoid": "Humanóide",
  "Disease": "Doença",
  "Poopybutthole": "Poopybutthole",
  "Robot_Dog": "Cachorro Robô",
  "Dinosaur": "Dinossauro",
  "Parasite": "Parasita",
  "Vampire": "Vampiro",
  "Unknown": "Desconhecido",
  "": "Sem classificação",
};

export const genderTranslations: GenderTranslations = {
  "Male": "Masculino",
  "Female": "Feminino",
  "Genderless": "Sem gênero",
  "unknown": "Desconhecido",
};

export const statusTranslations: StatusTranslations = {
  "Alive": "Vivo(a)",
  "Dead": "Morto(a)",
  "unknown": "Desconhecido(a)",
};

export {};
