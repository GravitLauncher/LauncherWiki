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
::: details Сведения, при написании своего скрипта:
- **digest** - должен содержать **бинарный** md5 хеш файла, преобразованный в base64
  - реализация в PHP: strtr(base64_encode(md5($string, true)), '+/', '-_')
:::

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


## Подпись лаунчера

Лаунчер(как JAR, так и EXE) может быть подписан. JAR версия лаунчера подписана всегда и отключить это нельзя. По умолчанию сертификат генерируется при `build` из текущей даты, ключей лаунчсервера и названия проекта.

### Генерация с помощью XCA

- Скачайте последнюю версию [XCA (Windows)](https://hohnstaedt.de/xca/index.php/download) с официального сайта, установите и запустите. Если у вас Linux - то установите пакет `xca` с помощью вашего менеджера пакетов
- Создайте новую базу данных с помощью `File -> New DataBase` и защитите её паролем.
- Создадим корневой СА. Перейдите в раздел `Certificates` и нажмите `New Certificate`. В разделе `Subject` заполните поле `Common Name`(например `BeautifulCraft Root CA`), остальные поля по желанию. Нажмите `Generate a new key` и выберите тип `RSA` размером 2048 или 4096.
- В разделе `Extensions` укажите `Type` -  `Certification Authority`. Укажите срок действия сертификата по вашему усмотрению. Не рекомендуется устанавливать срок действия меньше 1 года и больше 50 лет. Для приминения срока нужно нажать кнопку `Apply`
- В раздлеле `Key Usage` установите `Certificate Sign` и `CRL Sign`.
- По желанию вы можете создать промежуточные СА. Действия аналогичны созданию корневого СА, но в разделе `Source` нужно выбрать родительский(предыдущий) СА.
- Создадим конечный CodeSign сертификат. В разделе `Source` мы должны выбрать родительский(предыдущий) СА. Настройка раздела `Subject` полностью аналогична. В разделе `Extensions` укажите `Type` - `End Entity`. Укажите срок действия по усмотрению. В разделе `Key Usage` установите `Digital Signature` а в соседнем списке `Code Signing` и `Microsoft Individual Code Signing`.
- Экспортируем CodeSign сертификат. Для этого нужно выбрать конечный CodeSign сертификат и нажать кнопку `Export`. Выбираем тип экспорта `PKCS#12 chain`. Задаем пароль и сохраняем в удобное место.
- Экспортируем корневой сертификат. Для этого нужно выбрать корневой и нажать кнопку `Export`. Выбираем тип экспорта `PEM`. Сохраняем в удобное место.
- Мы получили два файла. Файл типа `.pfx`/`.p12` нужно указать в секции `sign` лаунчсервера вместе со всеми данными. Файл типа `.crt` нужно скопировать в папку `truststore` лаунчсервера.

### Получение алиаса из файла .p12/.pfx

Для получения алиаса(поле `keyAlias`) нам понадобится утилита `keytool` из состава JDK. Выполните эту команду:
```bash
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

```json
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