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
```json:no-line-numbers
      "textureProvider": {
        "skinURL": "http://example.com/skins/%username%.png",
        "cloakURL": "http://example.com/cloaks/%username%.png",
        "type": "request"
      },
```
::: tip Прямое получение скина
- Если скины хранятся не на этой машине
- Выполняется дополнительный запрос в ЛаунчСервере на подсчёт хеш суммы и передаче её в AuthLib
:::
::::
:::: code-group-item [ LOCAL ]
```json:no-line-numbers
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
- ЛаунчСерверу не нужно выполнять дополнительный запрос, так как файл считывается локально
:::
::::
:::::

### Метод JSON
```json:no-line-numbers
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
[\[PHP\] GravitLauncher/TextureLoader](https://github.com/GravitLauncher/TextureLoader)
:::

Пример ответа:
```json:no-line-numbers
{
  "SKIN": {
    "url": "http://example.com/skins/Gravita.png",
    "digest": "SHA256 HASH (HEX)",
    "metadata": {
      "model": "slim"
    }
  },
  "CAPE": {
    "url": "http://example.com/cloaks/Gravita.png",
    "digest": "SHA256 HASH (HEX)"
  }
}
```

### Метод Void
```json:no-line-numbers
      "textureProvider": {
        "type": "void"
      },
```
::: tip Скины и плащи не передаются
- Если у вас другое решение по передаче скинов, либо если вам скины и плащи не нужны
- Сервер может сам устанавливать скины, к примеру при использовании плагина [SkinsRestorer](https://www.spigotmc.org/resources/skinsrestorer.2124/)
:::


## Подпись Лаунчера

Лаунчер (как JAR, так и EXE) может быть подписан. JAR версия Лаунчера подписана всегда и отключить это нельзя. По умолчанию сертификат генерируется при `build` из текущей даты, ключей ЛаунчСервера и названия проекта.

### Генерация с помощью XCA

- Скачайте последнюю версию [XCA (Windows)](https://hohnstaedt.de/xca/index.php/download) с официального сайта, установите и запустите. Если у вас Linux - то установите пакет `xca` с помощью вашего менеджера пакетов
- Создайте новую базу данных с помощью `File -> New DataBase` и защитите её паролем.
- Создадим корневой СА. Перейдите в раздел `Certificates` и нажмите `New Certificate`. В разделе `Subject` заполните поле `Common Name`(например `BeautifulCraft Root CA`), остальные поля по желанию. Нажмите `Generate a new key` и выберите тип `RSA` размером 2048 или 4096.
- В разделе `Extensions` укажите `Type` -  `Certification Authority`. Укажите срок действия сертификата по вашему усмотрению. Не рекомендуется устанавливать срок действия меньше 1 года и больше 50 лет. Для применения срока нужно нажать кнопку `Apply`
- В разделе `Key Usage` установите `Certificate Sign` и `CRL Sign`.
- По желанию вы можете создать промежуточные СА. Действия аналогичны созданию корневого СА, но в разделе `Source` нужно выбрать родительский(предыдущий) СА.
- Создадим конечный CodeSign сертификат. В разделе `Source` мы должны выбрать родительский(предыдущий) СА. Настройка раздела `Subject` полностью аналогична. В разделе `Extensions` укажите `Type` - `End Entity`. Укажите срок действия по усмотрению. В разделе `Key Usage` установите `Digital Signature` а в соседнем списке `Code Signing` и `Microsoft Individual Code Signing`.
- Экспортируем CodeSign сертификат. Для этого нужно выбрать конечный CodeSign сертификат и нажать кнопку `Export`. Выбираем тип экспорта `PKCS#12 chain`. Задаем пароль и сохраняем в удобное место.
- Экспортируем корневой сертификат. Для этого нужно выбрать корневой и нажать кнопку `Export`. Выбираем тип экспорта `PEM`. Сохраняем в удобное место.
- Мы получили два файла. Файл типа `.pfx`/`.p12` нужно указать в секции `sign` ЛаунчСервера вместе со всеми данными. Файл типа `.crt` нужно скопировать в папку `truststore` ЛаунчСервера.

### Получение алиаса из файла .p12/.pfx

Для получения алиаса (поле `keyAlias`) нам понадобится утилита `keytool` из состава JDK. Выполните эту команду:
```bash:no-line-numbers
keytool -storepass PASSWORD -keystore PATH_TO_PFX_OR_P12 -list
```

Вы получите следующий вывод:


```
Your keystore contains 1 entry

beautiful codesign, Jan 16, 2023, PrivateKeyEntry, 
```

Строка `beautiful codesign` будет искомым алиасом

### Настройка секции sign для .p12/.pfx

Пример настройки:

```json:no-line-numbers
  "sign": {
    "enabled": true,
    "keyStore": "PATH_TO_PFX_OR_P12",
    "keyStoreType": "PKCS12",
    "keyStorePass": "PASSWORD",
    "keyAlias": "KEY ALIAS",
    "keyPass": "PASSWORD",
    "metaInfKeyName": "SIGNUMO.RSA",
    "metaInfSfName": "SIGNUMO.SF",
    "signAlgo": "SHA256WITHRSA"
  },
```

::: tip Обратите внимание
Пароли `keyStorePass` и `keyPass` должны совпадать
:::

## MixProvider

MixProvider - это метод расширения AuthCoreProvider дополнительной функциональностью

### Расширение uploadAsset

Работоспособная реализация: [PHP](https://github.com/GravitLauncher/TextureLoader)

Это расширение для загрузки скинов и плащей прямо в лаунчере без использования сайта

```json:no-line-numbers
"mixes": {
  "textureLoader": {
    "urls": {
      "SKIN": "http://example.com/assetloader/upload.php?type=SKIN",
      "CAPE": "http://example.com/assetloader/upload.php?type=CAPE"
    },
    "slimSupportConf": "USER",
    "type": "uploadAsset"
  }
}
```

На указанный url придет POST запрос с содержимым `form/multipart`
- `file` (`Content-Type`: `image/png`) - предоставляет PNG скин который пользователь хочет загрузить
- `options` (`Content-Type`: `application/json`) - предоставляет настройки, выбранные пользователем для загрузки
```json:no-line-numbers
{
  "modelSlim": true
}
```
- Так же будет передан заголовок `Authorization: Bearer USER_ACCESS_TOKEN` который вы должны проверить

Вы можете указать поддерживает ли ваш метод загрузку `slim` скинов, и если да - то как
- `USER` - `slim` поддерживается, пользователь сам ставит галочку `slim` скин или нет
- `SERVER` - `slim` поддерживается, тип скина определяет скрипт
- `UNSPOORTED` - `slim` не поддерживается

При успешной загрузке скина вы должны отправить следующий ответ с кодом 200:

```json:no-line-numbers
{
  "url": "ASSET URL",
  "digest": "SHA256 HEX HASH",
  "metadata": {
    "model": "skim"
  }
}
```

При ошибке вы должны вернуть код >=400 и следующий ответ:

```json:no-line-numbers
{
  "error": "Access denied"
}
```