# Привязка сервера Minecraft

## Совместимость

В настоящий момент поддерживаются:

-   Все оригинальные ядра: `Vanilla`, `Forge`, `Fabric`, `Bukkit`, `Sponge`
-   Их форки: `Spigot`, `Paper` и другие
-   Связки: `Bukkit+Forge`, `Bukkit+Fabric`, если их авторы не внесли дополнительных ошибок, мешающих работе запуска
-   Прокси-сервера: `BungeeCord`, `Waterfall` *(форк BungeeCord)*, `Velocity`

## Рекомендации

- При создании проекта используйте самую новую версию Minecraft, доступную для ключевых модов в вашей сборке
- Используйте **Fabric** вместо Forge для проектов на minecraft 1.16.5 и выше
- Избегайте использования модов и плагинов из непроверенных источников
- Используйте [Velocity](https://velocitypowered.com) вместо BungeeCord и Waterfall
- Убедитесь что в вашем ядре установлена защита от уязвимости Log4J
- Если ваш сервер находится за прокси(напр. velocity) его всё равно необходимо привязать к ServerWrapper с заменой authlib, так как в противном случае могут быть проблемы с скинами и плащами

## Рекомендуемые ядра

:::: code-group
::: code-group-item [ 1.7.10 ]
::: tip Список:
- [Crucible](https://github.com/CrucibleMC/Crucible)
:::
:::
::: code-group-item [ 1.12.2]
::: tip Список:
- [CatServer](https://github.com/Luohuayu/CatServer/blob/1.12.2/docs/README_RU.md)
- [SpongeForge](https://www.spongepowered.org/downloads/spongeforge?minecraft=1.12.2)
:::
:::
::: code-group-item [ 1.16.5 ]
::: tip Список:
- [Fabric](https://fabricmc.net/) 
- [CatServer](https://github.com/Luohuayu/CatServer/blob/1.16.5/docs/README_EN.md)
- [SpongeForge](https://www.spongepowered.org/downloads/spongeforge?minecraft=1.16.5)
:::
:::
::: code-group-item [ 1.17.X ]
::: tip Список:
- [Fabric](https://fabricmc.net/)
:::
:::
::: code-group-item [ 1.18.2 ]
::: tip Список:
- [Fabric](https://fabricmc.net/)
- [CatServer](https://github.com/Luohuayu/CatServer/blob/1.18.2/docs/README.md)
:::
:::
::::

## Использование ServerWrapper

Для привязки ServerWrapper к вашему серверу выполните следующие действия:

-   Откройте лаунчсервер и введите команду ```token server HiTech```, где HiTech - название вашего сервера. Скопируйте получившийся токен.
-   Перейдите в папку с вашим сервером, скопируйте туда ServerWrapper.jar из артефактов сборки и выполните команду ```java -jar ServerWrapper.jar setup```  
-   Укажите название jar файла вашего серверного ядра, название сервера, адрес лаунчсервера и токен, полученный на первом этапе

-   Обязательно включите ```online-mode=true``` в вашем ```server.properties```

Дальнейшие действия зависят от вашего серверного ядра

::: tip Примечания:

- Для привязки сервера с fabric-loader 0.14.X и выше не забудьте пропатчить или взять с клиента библиотеку fabric-loader
- Правильно указывайте имя сервера при установке ServerWrapper. Имя сервера это название сервера в поле `servers` вашего полфиля. По умолчанию название первого сервера совпадает с `title` профиля
- Привязка нескольких серверов по одному токену возможна только если эти сервера относятся к одному профилю
- При смене ключей лаунчсервера(например при настройке заново на новом хостинге) или `authId` вам необходимо **обязательно** пересоздать токен сервера
- Для запуска сервера 1.19.1 и выше нужно установить параметр `enforce-secure-profile` в `false` в файле `server.properties`

:::

## Привязка прокси

Прокси серверы напрямую обращаются к серверам Mojang, минуя authlib, поэтому вы должны пропатчить их

-   **Waterfall**  - Скачайте [патч](https://mirror.gravitlauncher.com/5.2.x/compat/patch/Waterfall.patch), переименуйте его в 0099-Waterfall.patch и скопируйте его в папку BungeeCord-Patches. Соберите waterfall командой ```./waterfall build```
-   **BungeeCord**  - Скачайте [патч](https://mirror.gravitlauncher.com/5.2.x/compat/patch/BungeeCord.patch), скопируйте его в папку с репозиторием, примените его командой ```git am BungeeCord.patch```. Соберите bungeecord командой ```mvn package -Dcheckstyle.skip```  
-   **Velocity**  (рекомендуется) - Скачайте [патч](https://mirror.gravitlauncher.com/5.3.x/compat/patch/Velocity.patch), скопируйте его в папку с репозиторием, примените его командой ```git am Velocity.patch```. Соберите velocity командой ```./gradlew assemble```


## Привязка дополнительных средств

-   **CloudNet** - Скачайте [патч](https://mirror.gravitlauncher.com/5.3.x/compat/patch/CloudNet.patch), скопируйте его в папку с репозиторием, примените его командой ```git apply CloudNet.patch```. Соберите CloudNet командой ```./gradlew assemble```. Для привязки сервера выполните:
    -  Скопируйте ServerWrapper.jar в папку с сервером/прокси
    -  Привяжите с помощью ServerWrapper как обычно
    -  Удалите mainclass из конфигурации ServerWrapper


## Использование installAuthlib

Для привязки всех остальных ядер(в том числе находящихся за прокси) необходимо заменить authlib. Начиная с версии 5.2.13 вы можете привязать authlib к серверу одной командой:

:::: code-group
::: code-group-item [ Локально ]
::: tip Информация:

Скопируйте authlib с клиента в любое удобное для вас место и пропишите команду `java -jar ServerWrapper.jar installAuthlib ПутьКAuthlib`

:::
:::
::: code-group-item [ По ссылке ]
::: tip Информация:

Скопируйте ссылку на LauncherAuthlib для вашей версии Minecraft и выполните команду `java -jar ServerWrapper.jar installAuthlib СсылкаНаLauncherAuthlib`  
  
Например для установки на сервер Minecraft 1.19: `java -jar ServerWrapper.jar installAuthlib https://mirror.gravitlauncher.com/5.2.x/compat/authlib/3/LauncherAuthlib3-1.19.jar`

:::
:::
::::

::: tip Примечание:

Рекомендуется перед привязкой запустить сервер хотя бы 1 раз

:::

:::: tip Для 1.12.2 forge/sponge дополнительно замените launchwrapper
Скопируйте [этот](https://mirror.gravitlauncher.com/5.2.x/compat/launchwrapper-1.12-5.0.x-fixed.jar) файл в ```libraries/net/minecraft/launchwrapper/1.12/launchwrapper-1.12.jar``` с заменой
::: details Установка командой Wget
```sh
wget --show-progress -q -O ./libraries/net/minecraft/launchwrapper/1.12/launchwrapper-1.12.jar https://mirror.gravitlauncher.com/5.2.x/compat/launchwrapper-1.12-5.0.x-fixed.jar
```
:::
::::

## Ручная установка AuthLib

Для привязки всех остальных ядер(в том числе находящихся за прокси) необходимо заменить authlib. Каждое ядро реализует процесс своего старта по своему, поэтому если одна инструкция не подходит, попробуйте другую.

:::: code-group
::: code-group-item [ Classpath ]
::: tip Информация:
Скопируйте authlib в папку с ServerWrapper'ом и измените ваш setup.sh: ```-cp ServerWrapper.jar:server.jar pro.gravit.launcher.server.ServerWrapper``` замените на ```-cp authlib-XXXX.jar:ServerWrapper.jar:server.jar pro.gravit.launcher.server.ServerWrapper```

**Примеры ядер:** Forge 1.7.10, Vanilla до 1.18
:::
:::
::: code-group-item [ Jar ]
::: tip Информация:
Распакуйте содержимое authlib клиента в временную папку. Откройте ```jar``` файл вашего ядра или сервера minecraft(если разделены) архиватором и скопируйте с заменой файлы, распакованные на предыдущем этапе

**Примеры ядер:** Forge/Sponge до 1.16.5, Fabric/Vanilla до 1.18
:::
:::
::: code-group-item [ Library ]
::: tip Информация:
Скопируйте файл вашего authlib по пути ```libraries/com/mojang/ВЕРСИЯ/authlib-ВЕРСИЯ.jar``` с заменой
:::
:::
::: code-group-item [ MinecraftExtra ]
::: tip Информация:
Распакуйте содержимое authlib клиента в временную папку. Откройте файл ```libraries/net/minecraft/server/ВЕРСИЯ/server-ВЕРСИЯ-extra.jar``` архиватором и скопируйте с заменой файлы, распакованные на предыдущем этапе

**Примеры ядер:** Forge 1.16.5
:::
:::
::: code-group-item [ Pack ]
::: tip Информация:
Откройте файл вашего сервера и скопируйте ```authlib-ВЕРСИЯ.jar``` **целиком** в ```META-INF/libraries/com/mojang/authlib/ВЕРСИЯ``` с заменой

**Примеры ядер:** Vanilla 1.18+
:::
:::
::::

:::: tip Для 1.12.2 forge/sponge дополнительно замените launchwrapper
Скопируйте [этот](https://mirror.gravitlauncher.com/5.2.x/compat/launchwrapper-1.12-5.0.x-fixed.jar) файл в ```libraries/net/minecraft/launchwrapper/1.12/launchwrapper-1.12.jar``` с заменой
::: details Установка командой Wget
```sh
wget --show-progress -q -O ./libraries/net/minecraft/launchwrapper/1.12/launchwrapper-1.12.jar https://mirror.gravitlauncher.com/5.2.x/compat/launchwrapper-1.12-5.0.x-fixed.jar
```
:::
::::

## Конфигурация ServerWrapper

```json
{
  "projectname": "MineCraft", // Название проекта
  "address": "ws://ADDRESS/api", // Адрес лаунчсервера
  "serverName": "Vanilla1.19.2", // Название сервера в профиле
  "autoloadLibraries": false, // Автозагрузка библиотек из папки libraries
  "classpath": [], // Дополнительный classpath (1.18+)
  "classLoaderConfig": "SYSTEM_ARGS", // Системные аргументы запуска
  "mainclass": "io.papermc.paperclip.Paperclip", // Main-Class вашего ядра сервера
  "args": ["nogui"], // Аргументы запуска
  "oauthExpireTime": 0,
  "extendedTokens": { // Токены доступа
    "checkServer": "TOKEN"
  },
  "env": "STD"
}
```
