## Тестовое задание booksearcher

Использованные технологии и фреймворки:
- React
- Redux Toolkit (best practice по использованию redux, рекомендуемый самими разработчиками)
- Typescript
- SASS
- Docker (production build)
- Nginx (чтобы не обнажать ключ апи Google Books)
- create-react-app (стыдно, но удобно)
- Fontello (иконки)

### Как поднять production билд у себя

- Клоним репозиторий и заходим в созданную директорию
```
git clone https://github.com/Sobriquetique/booksearcher.git booksearcher
cd booksearcher
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

**Не забываем заново сбилдить docker image**
```
docker build -t your-image-name .
```

**И контейнер запускаем на новых портах**
```
docker run --name your-container-name -d -p ${ порт, прописанный в ./src/config.json }:${ порт в nginx и докерфайле } your-image-name
```