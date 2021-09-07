/** Тип данных, приходящих с апи гугл букс. Интерфейс перечисляет только нужные мне поля */
export interface GoogleAPIBookVolumes {
  items: GoogleAPI_Volume[];
  totalItems: number;
}

interface GoogleAPI_Volume {
  id: string;
  volumeInfo: {
    authors: string[];
    categories: string[];
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    },
    title: string;
  }
}

interface GoogleAPI_VolumeFull {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    mainCategory?: string;
    categories?: string[];
    imageLinks: {
      large: string;
    },
    description?: string;
  };
}