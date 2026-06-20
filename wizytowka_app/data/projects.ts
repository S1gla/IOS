export type Project = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  year: number;
};

export const initialProjects: Project[] = [
  {
    id: '1',
    name: 'Projekt 1',
    description: 'Aplikacja pokazująca podstawowe funkcje portfolio mobilnego.',
    longDescription:
      'Projekt prezentuje ekran wizytówki, nawigację, listę projektów oraz spójny ciemny interfejs w React Native.',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    technologies: ['React Native', 'Expo', 'TypeScript'],
    year: 2025,
  },
  {
    id: '2',
    name: 'Projekt 2',
    description: 'Moduł kontaktowy z formularzem i danymi kontaktowymi.',
    longDescription:
      'Projekt zawiera formularz kontaktowy, walidację danych oraz ekran szczegółów zgodny ze stylem całej aplikacji.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    technologies: ['React Native', 'Context API'],
    year: 2025,
  },
  {
    id: '3',
    name: 'Projekt 3',
    description: 'Przykładowy projekt używający zapisu danych lokalnych.',
    longDescription:
      'Projekt wykorzystuje AsyncStorage do zapisywania danych pomiędzy uruchomieniami aplikacji.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    technologies: ['AsyncStorage', 'Expo', 'JavaScript'],
    year: 2024,
  },
];
