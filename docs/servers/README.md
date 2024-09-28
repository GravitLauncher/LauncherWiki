# Привязка сервера Minecraft

## Совместимость

В настоящий момент поддерживаются:

-   Все оригинальные ядра: `Vanilla`, `Forge`, `Fabric`, `Bukkit`, `Sponge`
-   Их форки: `Spigot`, `Paper` и другие
-   Связки: `Bukkit+Forge`, `Bukkit+Fabric`, если их авторы не внесли дополнительных ошибок, мешающих работе запуска
-   Прокси-сервера: `Velocity`

## Рекомендации

- При создании проекта используйте самую новую версию Minecraft, доступную для ключевых модов в вашей сборке
- Используйте **Fabric** вместо Forge для проектов на Minecraft 1.16.5 и выше
- Избегайте использования модов и плагинов из непроверенных источников
- Используйте [Velocity](https://papermc.io/software/velocity) вместо BungeeCord и Waterfall
- Убедитесь, что в вашем ядре установлена защита от уязвимости Log4J
- Если ваш сервер находится за прокси (например, Velocity), его всё равно необходимо привязать к ServerWrapper с заменой AuthLib, так как в противном случае могут быть проблемы с скинами и плащами

## Рекомендуемые ядра

:::: tabs
@tab [ 1.7.10 ]
::: tip Список:
- [Crucible](https://github.com/CrucibleMC/Crucible)
:::
@tab [ 1.12.2]
::: tip Список:
- [CatServer](https://github.com/Luohuayu/CatServer/blob/1.12.2/docs/README_RU.md)
- [SpongeForge](https://www.spongepowered.org/downloads/spongeforge?minecraft=1.12.2)
:::
@tab [ 1.16.5 ]
::: tip Список:
- [Fabric](https://fabricmc.net/) 
- [CatServer](https://github.com/Luohuayu/CatServer/blob/1.16.5/docs/README_RU.md)
- [SpongeForge](https://www.spongepowered.org/downloads/spongeforge?minecraft=1.16.5)
:::
@tab [ 1.17.X ]
::: tip Список:
- [Fabric](https://fabricmc.net/)
:::
@tab [ 1.18.2 ]
::: tip Список:
- [Fabric](https://fabricmc.net/)
- [CatServer](https://github.com/Luohuayu/CatServer/blob/1.18.2/docs/README.md)
:::
::::

## Использование ServerWrapper

Для привязки ServerWrapper к вашему серверу выполните следующие действия:

::: tip Создание токена для сервера
- Откройте ЛаунчСервер и введите команду `token server HiTech std true`, где HiTech - название вашего сервера. Скопируйте получившийся токен.
```java{1}:no-line-numbers
token server <profile-title> [auth-id] [public-only]
```
```java
Options:
      <profile-title> Title имя профиля клиента [default: null]
      [auth-id] Опциональное значение Auth ID [default: std (Первый AuthId)]
      [public-only] Сгенерировать публичный токен. Если вы не планируете выкладывать токен в интернет что бы ваши игроки могли создавать свои сервера на вашем лаунчере установите этот параметр в false. Иначе вы можете получить ошибку `Not connected to ServerProfile` [default: true]
```
:::
- Перейдите в папку с вашим сервером, скопируйте туда ServerWrapper.jar из артефактов сборки и выполните команду `java -jar ServerWrapper.jar setup`
- Укажите название jar файла вашего серверного ядра, название сервера, адрес ЛаунчСервера и токен, полученный на первом этапе
- Обязательно включите `online-mode=true` в вашем `server.properties`

Дальнейшие действия зависят от вашего серверного ядра

::: tip Примечания:

- Для привязки сервера с Fabric 0.14.X и выше не забудьте [пропатчить](../clientbuild/#применение-патчеи-fabric-loader) или взять с клиента библиотеку fabric-loader (место ее расположения - libraries/net/fabricmc/fabric-loader/%VERSION%/fabric-loader-%VERSION%.jar)
- Правильно указывайте имя сервера при установке ServerWrapper. Имя сервера — это название сервера в поле `servers` вашего профиля. По умолчанию название первого сервера совпадает с `title` профиля
- Привязка нескольких серверов по одному токену возможна, только если эти сервера относятся к одному профилю
- При смене ключей ЛаунчСервера (например, при настройке заново на новом хостинге) или `authId` вам необходимо **обязательно** пересоздать токен сервера
- Для запуска сервера 1.19.1 и выше нужно установить параметр `enforce-secure-profile` в `false` в файле `server.properties`

:::

## Привязка прокси

Прокси серверы напрямую обращаются к серверам Mojang, минуя AuthLib, поэтому вы должны пропатчить их

-   **Waterfall**  - Скачайте [патч](https://mirror.gravitlauncher.com/5.6.x/patches/BungeeCord.patch), переименуйте его в 0099-Waterfall.patch и скопируйте его в папку BungeeCord-Patches. Соберите Waterfall командой ```./waterfall build```
-   **BungeeCord**  - Скачайте [патч](https://mirror.gravitlauncher.com/5.6.x/patches/BungeeCord.patch), скопируйте его в папку с репозиторием, примените его командой ```git am BungeeCord.patch```. Соберите BungeeCord командой ```mvn package -Dcheckstyle.skip```  
-   **Velocity**  (рекомендуется) - Скачайте [патч](https://mirror.gravitlauncher.com/5.6.x/patches/Velocity.patch), скопируйте его в папку с репозиторием, примените его командой ```git am Velocity.patch```. Соберите Velocity командой ```./gradlew assemble```


## Привязка дополнительных средств

-   **CloudNet** - Скачайте [патч](https://mirror.gravitlauncher.com/5.3.x/compat/patch/CloudNet.patch), скопируйте его в папку с репозиторием, примените его командой ```git apply CloudNet.patch```. Соберите CloudNet командой ```./gradlew assemble```. Для привязки сервера выполните:
    -  Скопируйте ServerWrapper.jar в папку с сервером/прокси
    -  Привяжите с помощью ServerWrapper как обычно
    -  Удалите mainclass из конфигурации ServerWrapper


## Использование installAuthlib

Для привязки всех остальных ядер (в том числе находящихся за прокси) необходимо заменить AuthLib. Начиная с версии 5.2.13 вы можете привязать AuthLib к серверу одной командой:

::::: tabs
@tav [ 1.7.10 - 1.16.3 ]
::: tip Информация:
Скопируйте ссылку на LauncherAuthlib для вашей версии Minecraft и выполните команду
```bash{1}:no-line-numbers
java -jar ServerWrapper.jar installAuthlib https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib1.jar
```
:::
@tab [ 1.16.4 - 1.17.x ]
::: tip Информация:
Скопируйте ссылку на LauncherAuthlib для вашей версии Minecraft и выполните команду
```bash{1}:no-line-numbers
java -jar ServerWrapper.jar installAuthlib https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib2.jar
```
:::
@tab [ 1.18.x ]
::: tip Информация:
Скопируйте ссылку на LauncherAuthlib для вашей версии Minecraft и выполните команду
```bash{1}:no-line-numbers
java -jar ServerWrapper.jar installAuthlib https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib3.jar
```
:::
@tab [ 1.19 ]
::: tip Информация:
Скопируйте ссылку на LauncherAuthlib для вашей версии Minecraft и выполните команду
```bash{1}:no-line-numbers
java -jar ServerWrapper.jar installAuthlib https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib3-1.19.jar
```
:::
@tab [ 1.19.1 - 1.19.4 ]
::: tip Информация:
Скопируйте ссылку на LauncherAuthlib для вашей версии Minecraft и выполните команду
```bash{1}:no-line-numbers
java -jar ServerWrapper.jar installAuthlib https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib3-1.19.jar
```
:::
@tab [ 1.20 - 1.20.1 ]
::: tip Информация:
Скопируйте ссылку на LauncherAuthlib для вашей версии Minecraft и выполните команду
```bash{1}:no-line-numbers
java -jar ServerWrapper.jar installAuthlib https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib4.jar
```
:::
@tab [ 1.20.2 ]
::: tip Информация:
Скопируйте ссылку на LauncherAuthlib для вашей версии Minecraft и выполните команду
```bash{1}:no-line-numbers
java -jar ServerWrapper.jar installAuthlib https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib5.jar
```
:::
@tab [ 1.20.3+ ]
::: tip Информация:
Скопируйте ссылку на LauncherAuthlib для вашей версии Minecraft и выполните команду
```bash{1}:no-line-numbers
java -jar ServerWrapper.jar installAuthlib https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib6.jar
```
:::
@tab [ Локально ]
::: tip Информация:
Скопируйте AuthLib с клиента в любое удобное для вас место и пропишите команду
```bash{1}:no-line-numbers
java -jar ServerWrapper.jar installAuthlib ПутьКAuthlib
```
:::
:::::

::: warning Примечание:
Перед привязкой запустите сервер, подождите, пока он полностью запустится и остановите его
:::

:::: tip Для 1.12.2 forge/sponge дополнительно замените launchwrapper
Скопируйте [этот](https://mirror.gravitlauncher.com/5.5.x/libraries/launchwrapper-1.12-5.5.x.jar) файл в ```libraries/net/minecraft/launchwrapper/1.12/launchwrapper-1.12.jar``` с заменой
::: details Установка командой Wget
```bash{1}:no-line-numbers
wget --show-progress -q -O ./libraries/net/minecraft/launchwrapper/1.12/launchwrapper-1.12.jar https://mirror.gravitlauncher.com/5.5.x/libraries/launchwrapper-1.12-5.5.x.jar
```
::::

## Конфигурация ServerWrapper

```json
{
  "address": "ws://address:port/api", // Адрес ЛаунчСервера
  "serverName": "Vanilla", // Название сервера в профиле
  "autoloadLibraries": false, // Автозагрузка библиотек из папки libraries
  "classpath": [], // Дополнительный classpath (1.18+)
  "classLoaderConfig": "LAUNCHER", // Системные аргументы запуска
  "mainclass": "net.fabricmc.loader.impl.launch.server.FabricServerLauncher", // Main-Class вашего ядра сервера
  "nativesDir": "natives", 
  "args": ["nogui"], // Аргументы запуска
  "oauthExpireTime": 0,
  "extendedTokens": { // Токены доступа
    "checkServer": {
      "token": "TOKEN",
      "expire": 0
    }
  },
  "env": "STD",
  "moduleConf": {
    "modules": [],
    "modulePath": [],
    "exports": {},
    "opens": {},
    "reads": {}
  },
  "encodedServerRsaPublicKey": "KEY",
  "encodedServerEcPublicKey": "KEY",
  "enableHacks": false,
  "properties": {}
}
```
