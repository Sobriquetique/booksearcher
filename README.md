## Тестовое задание booksearcher

Использованные технологии и фреймворки:
- React
- Redux Toolkit (best practice по использованию redux, рекомендуемый самими разработчиками)
- Typescript
- SASS
- Docker (production build)
- Nginx (чтобы не обнажать ключ апи Google Books)
- Create-react-app
- Fontello (иконки)

### Как поднять production билд у себя

- Клоним репозиторий и заходим в созданную директорию
```
git clone https://github.com/Sobriquetique/booksearcher.git booksearcher
cd booksearcher
```

- Открываем `./nginx.conf`, ищем на 4-й строчке подобное и меняем ключ на свой (если хотим)
```
set $key AIzzSyAGf2CYSuVZJKguW5B_sEKBK3XGkDjqqNs;
```

- Собираем docker image
```
docker build -t your-image-name .
```

- Запускаем контейнер
```
docker run --name your-container-name -d -p 10124:10123 your-image-name
```

- Открываем в браузере localhost:10124

Пара нюансов:
- Оказывается, обращаться к апи можно без API ключа. Но это приложение все равно шлет запросы с ключом.
- На некоторые книги (не превью, а по эндпоинту `volumes/${id}`) гугл апи выдает 503 Service unavailable, это нормально. Проверял curl'ом с ключом или без ключа, и они действительно недоступны. Просто жмем под шапкой back и пробуем другие книги.
- В качестве изображений для полного просмотра конкретной книги выбрал thumbnail'ы вместо больших изображений, потому что в 90% случаев там мусор или плейсхолдеры, а thumbnail'ы есть всегда.

### Если порты заняты

#### Занят первый порт (10124 в примере)

Открываем `./src/config.json` и меняем порты на нужные
```json
{
  "BASE_BOOK_URL": "http://localhost:${ВАШ_ПОРТ}/api/books/",
  "BASE_PREVIEWS_URL": "http://localhost:${ВАШ_ПОРТ}/api/previews/"
}
```

#### Занят второй порт (10123 в примере)

Открываем `./nginx.conf`, ищем там на 6-й строчке директиву `listen` и меняем порт на нужный
```
listen ${ВАШ_ПОРТ};
```

Потом открываем Dockerfile и на предпоследней строчке тоже меняем порт (он должен совпадать с портом nginx)
```
EXPOSE ${ВАШ_ПОРТ}
```

#### **Не забываем заново сбилдить docker image**
```
docker build -t your-image-name .
```

**И контейнер запускаем на новых портах**
```
docker run --name your-container-name -d -p ${ порт, прописанный в ./src/config.json }:${ порт в nginx и докерфайле } your-image-name
```