# Привязка сервера Minecraft

## Совместимость

В настоящий момент поддерживаются:

-   Все оригинальные ядра: `Vanilla`, `Forge`, `Fabric`, `Bukkit`, `Sponge`
-   Их форки: `Spigot`, `Paper` и другие
-   Связки: `Bukkit+Forge`, `Bukkit+Fabric`, если их авторы не внесли дополнительных ошибок, мешающих работе запуска
-   Прокси-сервера: `BungeeCord`, `Waterfall` *(форк BungeeCord)*, `Velocity`

## Использование ServerWrapper

Для привязки ServerWrapper к вашему серверу выполните следующие действия:

-   Откройте лаунчсервер и введите команду ```token server HiTech```, где HiTech - название вашего сервера. Скопируйте получившийся токен
-   Перейдите в папку с вашим сервером, скопируйте туда ServerWrapper.jar из артефактов сборки и выполните команду ```java -jar ServerWrapper.jar setup```  
-   Укажите название jar файла вашего серверного ядра, название сервера, адрес лаунчсервера и токен, полученный на первом этапе

Дальнейшие действия зависят от вашего серверного ядра

<CodeGroup>
  <CodeGroupItem title="Forge/Sponge 1.12.2" active>

::: tip Информация:

Скопируйте [этот](https://mirror.gravit.pro/compat/launchwrapper-1.12-5.0.x-fixed.jar) файл в ```libraries/net/minecraft/launchwrapper/1.12/launchwrapper-1.12.jar``` с заменой

:::

  </CodeGroupItem>
  <CodeGroupItem title="1.16.4+" active>

::: tip Информация:

Скачайте [этот](https://mirror.gravit.pro/compat/authlib/2/LauncherAuthlib2-5.2.0.jar) файл и поместите его рядом с ServerWrapper.jar. Далее откройте ServerWrapper.jar любым архиватором и удалите из него всё содерджимое папки com/mojang. После чего откройте ваш скрипт запуска и перед ServerWrapper.jar допишите ```LauncherAuthlib.jar;```

:::
  </CodeGroupItem>
  <CodeGroupItem title="Waterfall/BungeeCord/Velocity" active>

::: tip Информация:

Прокси серверы напрямую обращаются к серверам Mojang, минуя authlib, поэтому вы должны пропатчить их

-   **Waterfall**  - Скачайте  [патч](https://mirror.gravit.pro/compat/patch/Waterfall.patch), переименуйте его в 0099-Waterfall.patch и скопируйте его в папку BungeeCord-Patches. Соберите waterfall командой ```./waterfall build```
-   **BungeeCord**  - Скачайте  [патч](https://mirror.gravit.pro/compat/patch/BungeeCord.patch), скопируйте его в папку с репозиторием, примените его командой ```git am BungeeCord.patch```. Соберите bungeecord командой ```mvn package -Dcheckstyle.skip```  
-   **Velocity**  (рекомендуется) - Скачайте  [патч](https://mirror.gravit.pro/compat/patch/Velocity.patch), скопируйте его в папку с репозиторием, примените его командой ```git am Velocity.patch```. Соберите velocity командой ```./gradlew assemble```

:::
  </CodeGroupItem>
</CodeGroup>

Конфигурация ServerWrapper:

```json
{
  "projectname": "MineCraft", // Название проекта
  "address": "ws://ADDRESS/api", // Адрес лаунчсервера
  "serverName": "Vanilla1.17.1", // Название сервера в профиле
  "autoloadLibraries": false, // Автозагрузка библиотек из папки libraries
  "classpath": [], // Дополнительный classpath
  "mainclass": "io.papermc.paperclip.Paperclip", // Main-Class вашего ядра сервера
  "args": ["nogui"], // Аргументы запуска
  "oauthExpireTime": 0,
  "extendedTokens": { // Токены доступа
    "checkServer": "TOKEN"
  },
  "env": "STD"
}
```
