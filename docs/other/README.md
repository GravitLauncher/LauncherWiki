# Другие настройки

## TextureProvider

TextureProvider нужен при отсутствии поддержки скинов со стороны AuthCoreProvider. Выберите один из вариантов TextureProvider:

-   **request**  - прямое получение скина  
    ~~Поддерживаются следующие placeholder:  **%username%**  имя пользователя,  **%uuid%**  UUID пользователя,  **%hash%**  UUID пользователя без разделителей~~

```json
"textureProvider": {
  "skinURL": "http://example.com/skins/%username%.png",
  "cloakURL": "http://example.com/cloaks/%username%.png",
  "type": "request"
},
```

-  **request** - прямое получение скина по локальному пути

```json

      "textureProvider": {
        "skinURL": "http://example.com/skins/%username%.png",
        "cloakURL": "http://example.com/cloaks/%username%.png",
        "skinLocalPath": "/var/www/site/skins/%username%.png",
        "cloakLocalPath": "/var/www/site/cloaks/%username%.png",
        "type": "request"
      },
```

-  **json** - запрос к сайту для получения URL скина и метаданных

```json
"textureProvider": {
  "url": "http://example.com/getskin.php?username=%username%",
  "type": "json"
},
```

Пример ответа:

```json
{
  "skin": {
    "url": "http://example.com/skins/Gravita.png",
    "digest": "BASE64 ENCODED MD5 HASH",
    "metadata": {
      "model": "slim"
    }
  },
  "cloak": {
    "url": "http://example.com/cloaks/Gravita.png",
    "digest": "BASE64 ENCODED MD5 HASH"
  }
}
```

-  **void** - скины и плащи не поддерживаются

```json
"textureProvider": {
  "type": "void"
},
```
