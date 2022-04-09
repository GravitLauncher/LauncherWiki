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

<CodeGroup>
  <CodeGroupItem title="1.7.10" active>

::: tip Информация: <!--Don't add Mohist!-->

- [Crucible](https://github.com/CrucibleMC/Crucible)

:::

  </CodeGroupItem>
  <CodeGroupItem title="1.10.2" active>

::: tip Информация:

- [Svarka](https://github.com/juanmuscaria/Svarka)

:::

  </CodeGroupItem>
  <CodeGroupItem title="1.12.2" active>

::: tip Информация: <!--Don't add Mohist!-->

- [CatServer](https://github.com/Luohuayu/CatServer/blob/1.12.2/README_RU.md)
- [SpongeForge](https://www.spongepowered.org/downloads/spongeforge?minecraft=1.12.2)

:::

  </CodeGroupItem>
  <CodeGroupItem title="1.14.4" active>

::: tip Информация:

- [Fabric](https://fabricmc.net/) 
- [ArcLight](https://github.com/IzzelAliz/Arclight)

:::

  </CodeGroupItem>
  <CodeGroupItem title="1.15.2" active>

::: tip Информация:

- [Fabric](https://fabricmc.net/) 
- [ArcLight](https://github.com/IzzelAliz/Arclight)

:::

  </CodeGroupItem>
  <CodeGroupItem title="1.16.5" active>

::: tip Информация: <!--Don't add Mohist!-->

- [Fabric](https://fabricmc.net/) 
- [LoliServer](https://github.com/Loli-Server/LoliServer)
- [SpongeForge](https://www.spongepowered.org/downloads/spongeforge?minecraft=1.16.5)

:::

  </CodeGroupItem>
  <CodeGroupItem title="1.17.X" active>

::: tip Информация:

- [Fabric](https://fabricmc.net/)

:::

  </CodeGroupItem>
  
  <CodeGroupItem title="1.18.2" active>

::: tip Информация: <!--Don't add Mohist!-->

- [Fabric](https://fabricmc.net/)
- [FoxServer](https://github.com/Luohuayu/FoxServer/)

:::

  </CodeGroupItem>

</CodeGroup>

::: warning Внимание!
Не используйте ядро [Mohist](https://mohistmc.com) - это самое отвратительное по производительности ядро, по сравнению с вышеприведенными ядрами!
:::

## Использование ServerWrapper

Для привязки ServerWrapper к вашему серверу выполните следующие действия:

-   Откройте лаунчсервер и введите команду ```token server HiTech```, где HiTech - название вашего сервера. Скопируйте получившийся токен. <Badge type="warning" text="ВАЖНО" vertical="middle" /> При обновлении лаунчсервера, без копирования ключей ```.keys```, перевыдайте token для вашего сервера
-   Перейдите в папку с вашим сервером, скопируйте туда ServerWrapper.jar из артефактов сборки и выполните команду ```java -jar ServerWrapper.jar setup```  
-   Укажите название jar файла вашего серверного ядра, название сервера, адрес лаунчсервера и токен, полученный на первом этапе

-   Обязательно включите ```online-mode=true``` в вашем ```server.properties```

Дальнейшие действия зависят от вашего серверного ядра

::: tip Примечание:

До 5.1.9-dev ServerWrapper.jar содержит в себе authlib первой версии. Удалите папку ```com/mojang``` из ```ServerWrapper.jar``` что бы следовать инструкциям ниже

:::

## Привязка прокси

Прокси серверы напрямую обращаются к серверам Mojang, минуя authlib, поэтому вы должны пропатчить их

-   **Waterfall**  - Скачайте [патч](https://mirror.gravit.pro/compat/patch/Waterfall.patch), переименуйте его в 0099-Waterfall.patch и скопируйте его в папку BungeeCord-Patches. Соберите waterfall командой ```./waterfall build```
-   **BungeeCord**  - Скачайте [патч](https://mirror.gravit.pro/compat/patch/BungeeCord.patch), скопируйте его в папку с репозиторием, примените его командой ```git am BungeeCord.patch```. Соберите bungeecord командой ```mvn package -Dcheckstyle.skip```  
-   **Velocity**  (рекомендуется) - Скачайте [патч](https://mirror.gravit.pro/compat/patch/Velocity.patch), скопируйте его в папку с репозиторием, примените его командой ```git am Velocity.patch```. Соберите velocity командой ```./gradlew assemble```

## Замена authlib

Для привязки всех остальных ядер(в том числе находящихся за прокси) необходимо заменить authlib. Каждое ядро реализует процесс своего старта по своему, поэтому если одна инструкция не подходит, попробуйте другую.

<CodeGroup>
  <CodeGroupItem title="Classpath" active>

::: tip Информация:

Скопируйте authlib в папку с ServerWrapper'ом и измените ваш setup.sh: ```-cp ServerWrapper.jar:server.jar pro.gravit.launcher.server.ServerWrapper``` замените на ```-cp authlib-XXXX.jar:ServerWrapper.jar:server.jar pro.gravit.launcher.server.ServerWrapper```

**Примеры ядер:** Forge 1.7.10, Vanilla до 1.18

:::

  </CodeGroupItem>
  <CodeGroupItem title="Jar" active>

::: tip Информация:

Распакуйте содержимое authlib клиента в временную папку. Откройте ```jar``` файл вашего ядра или сервера minecraft(если разделены) архиватором и скопируйте с заменой файлы, распакованные на предыдущем этапе

**Примеры ядер:** Forge/Sponge до 1.16.5, Fabric/Vanilla до 1.18

:::

  </CodeGroupItem>
  <CodeGroupItem title="Library" active>

::: tip Информация:

Скопируйте файл вашего authlib по пути ```libraries/com/mojang/ВЕРСИЯ/authlib-ВЕРСИЯ.jar``` с заменой

:::

  </CodeGroupItem>
  <CodeGroupItem title="MinecraftExtra" active>

::: tip Информация:

Распакуйте содержимое authlib клиента в временную папку. Откройте файл ```libraries/net/minecraft/server/ВЕРСИЯ/server-ВЕРСИЯ-extra.jar``` архиватором и скопируйте с заменой файлы, распакованные на предыдущем этапе

**Примеры ядер:** Forge 1.16.5

:::

  </CodeGroupItem>
  <CodeGroupItem title="Pack" active>

::: tip Информация:

Откройте файл вашего сервера и скопируйте ```authlib-ВЕРСИЯ.jar``` **целиком** в ```META-INF/libraries/com/mojang/authlib/ВЕРСИЯ``` с заменой

**Примеры ядер:** Vanilla 1.18+

:::

  </CodeGroupItem>



</CodeGroup>

::: tip Для 1.12.2 forge/sponge дополнительно замените launchwrapper

Скопируйте [этот](https://mirror.gravit.pro/compat/launchwrapper-1.12-5.0.x-fixed.jar) файл в ```libraries/net/minecraft/launchwrapper/1.12/launchwrapper-1.12.jar``` с заменой
::: details Установка командой Wget
```sh
wget --show-progress -q -O ./libraries/net/minecraft/launchwrapper/1.12/launchwrapper-1.12.jar https://mirror.gravit.pro/compat/launchwrapper-1.12-5.0.x-fixed.jar
```
:::

## Конфигурация ServerWrapper

```json
{
  "projectname": "MineCraft", // Название проекта
  "address": "ws://ADDRESS/api", // Адрес лаунчсервера
  "serverName": "Vanilla1.17.1", // Название сервера в профиле
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
