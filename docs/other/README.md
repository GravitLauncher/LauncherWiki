# Другие настройки

## TextureProvider

TextureProvider нужен при отсутствии поддержки скинов со стороны AuthCoreProvider. Выберите один из вариантов TextureProvider:

- Поддерживаются следующие placeholder:  
  - **%username%**  имя пользователя
  - **%uuid%**  UUID пользователя
  - **%hash%**  UUID пользователя без разделителей

### Метод Request
::::: code-group
:::: code-group-item [ REMOTE ]
```json
      "textureProvider": {
        "skinURL": "http://example.com/skins/%username%.png",
        "cloakURL": "http://example.com/cloaks/%username%.png",
        "type": "request"
      },
```
::: tip Прямое получение скина
- Если скины храняться не на этой машине
- Выполняется дополнительный запрос в лаунчсервере на подсчёт хеш суммы и передаче её в AuthLib
:::
::::
:::: code-group-item [ LOCAL ]
```json
      "textureProvider": {
        "skinURL": "http://example.com/skins/%username%.png",
        "cloakURL": "http://example.com/cloaks/%username%.png",
        "skinLocalPath": "/var/www/site/skins/%username%.png",
        "cloakLocalPath": "/var/www/site/cloaks/%username%.png",
        "type": "request"
      },
```
::: tip Получение скина с локальным путём
- Быстрее обработка хеш суммы
- Лаунчсерверу не нужно выполнять дополнительный запрос, так как файл считывается локально
:::
::::
:::::

### Метод JSON
```json
      "textureProvider": {
        "url": "http://example.com/getskin.php?username=%username%",
        "type": "json"
      },
```
::: tip Запрос к сайту для получения URL'ов скина/плаща и их метаданных
- Может обрабатывать **slim** (тонкие) скины
:::
::: details Комьюнити реализации:
[\[PHP\] microwin7/GravitLauncher-TextureProvider](https://github.com/microwin7/GravitLauncher-TextureProvider)
:::

Пример ответа:
```json
{
  "SKIN": {
    "url": "http://example.com/skins/Gravita.png",
    "digest": "BASE64 ENCODED MD5 HASH",
    "metadata": {
      "model": "slim"
    }
  },
  "CAPE": {
    "url": "http://example.com/cloaks/Gravita.png",
    "digest": "BASE64 ENCODED MD5 HASH"
  }
}
```

### Метод Void
```json
      "textureProvider": {
        "type": "void"
      },
```
::: tip Скины и плащи не передаются
- Если у вас другое решение по передаче скинов, либо если вам скины и плащи не нужны
- Сервер может сам устанавливать скины, к примеру при использовании плагина [SkinsRestorer](https://www.spigotmc.org/resources/skinsrestorer.2124/)
:::