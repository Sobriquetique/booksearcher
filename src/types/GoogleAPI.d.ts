/** Тип данных, приходящих с апи гугл букс. Интерфейс перечисляет только нужные мне поля */
export interface GoogleAPIBookVolumes {
  items: Volume[];
  totalItems: number;
}

interface Volume {
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