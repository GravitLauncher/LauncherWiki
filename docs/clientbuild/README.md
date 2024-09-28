# Настройка клиента

## Совместимость

Начиная с версии 5.6.0 лаунчер поддерживает запуск клиентов и серверов только с Java 17+

На текущий момент поддерживается запуск:

-   Любой Vanilla версии с 1.13 до 1.20.4, включая snapshot
-   Forge 1.7.10 с lwjgl3ify
-   Любой Fabric версии с 1.13 до 1.20.4, включая snapshot

Необходимы ручные действия для сборки:
-   Forge 1.12.2 с cleanroom
-   Forge 1.16.5 с аргументами для поддержки Java 17
-   Forge 1.18+ по гайду в нашем Discord сервере


Подробную информацию о том как собрать 1.7.10 с lwjgl3ify, 1.12.2 cleanroom и forge 1.18+ можно получить на нашем [Discord сервере](https://discord.gg/b9QG4ygY75) в канале guides

## Рекомендации

- При создании проекта используйте самую новую версию Minecraft, доступную для ключевых модов в вашей сборке
- Используйте **Fabric** вместо Forge для проектов на Minecraft 1.16.5 и выше
- Используйте [Sodium](https://github.com/CaffeineMC/sodium-fabric) и [Iris](https://github.com/IrisShaders/Iris) вместо OptiFine для проектов на Minecraft 1.16.5 и выше
- Избегайте использования OptiFabric - он создает в корне клиента скрытую папку с .jar внутри, которая не будет проверяться Лаунчером
- Избегайте использования модов из непроверенных источников. Скачивайте моды с [Curseforge](https://www.curseforge.com/minecraft/mc-mods?filter-sort=5)/[Modrinth](https://modrinth.com/) или напрямую с GitHub разработчика

## Работа модов 1.7.10 на Java 17+

Начиная с версии 5.6.0 лаунчер работает только с клиентами, поддерживающими запуск на Java 17 и выше. Forge 1.7.10 и 1.12.2 были портированы на Java 17+ сторонними разработчиками, что привело к несовместимости с некоторыми грязными трюками, которые применяли мододелы в своих модах на эту версию. Вот что вам нужно сделать для портирования своей сборки на Java 17+:
- Установите мод [Hodgepodge](https://github.com/GTNewHorizons/Hodgepodge)
- Установите библиотеку [GTNHLib](https://github.com/GTNewHorizons/GTNHLib) и при желании [Angelica](https://github.com/GTNewHorizons/Angelica)
- Проверьте наличие актуальной исправленной версии ваших модов при помощи поиска в [репозитории GTNH](https://github.com/GTNewHorizons) и обновите их
- Если проблема остается актуальной обратитесь в наш Discord сервер в канал support

## Скачивание ассетов

Для скачивания ассетов выполните команду:
- Пример: `downloadasset 1.20.0`
```java{1}:no-line-numbers
downloadasset <minecraft-version>
```
```java
Options:
      <minecraft-version> Версия Minecraft [default: null]
      [assets-folder] Deprecated папка назначения [default: "assets"]
```
- Загрузка происходит с серверов Mojang
- При скачивании нескольких версий ассетов в одну папку будут скачаны только недостающие

## Настройка MirrorHelper

В актуальных версиях лаунчера рекомендуемым способом установки является MirrorHelper. Это модуль для лаунчсервера, позволяющий скачивать клиенты напрямую с серверов Mojang, устанавливать Forge/Fabric, скачивать моды с Modrinth и CurseForge и т.д. 

К сожалению, некоторые файлы не могут быть скачаны автоматически (например установщик Forge и OptiFine) и вам придется скачать их вручную. 
Также Forge, в отличии от Fabric, не предоставляет возможности ставить клиент автоматически без участия пользователя. Поэтому для установки Forge вам понадобится иметь GUI на машине с лаунчсервером, либо применить X11 Forwarding.
- Установите модуль MirrorHelper
- Установите git на вашу машину, если его еще нет
- Пропишите команду `applyworkspace`

::: warning
Команда `applyworkspace` не поддерживается на Windows. Используйте для установки клиента WSL2, Linux или MacOS.
:::

- Установите клиент

:::: tabs
@tab [ Vanilla ]
::: tip Установка Vanilla клиента
```
installclient MyVanillaClient 1.20.2 VANILLA
```
- *MyVanillaClient* - название вашего клиента
- *1.20.2* - версия Minecraft
@tab [ Fabric ]
::: tip Установка Fabric клиента
```
installclient MyFabricClient 1.20.2 FABRIC
```
- *MyFabricClient* - название вашего клиента
- *1.20.2* - версия Minecraft
@tab [ Forge ]
::: tip Установка Forge клиента
- Скачайте forge-installer с сайта [Classic Forge](https://files.minecraftforge.net/net/minecraftforge/forge/)/[NeoForge](https://neoforged.net/)
- Поместите его в `LAUNCHSERVER_DIR/config/MirrorHelper/workspace/installers/` с именем `forge-VERSION-installer.jar`(для тех версий которые не поддерживают установку без gui) или `forge-VERSION-installer-nogui.jar`(для тех которые поддерживают), где VERSION - версия Minecraft
- Установку без gui не поддерживает Forge 1.7.10  (следуйте инструкциям для вашего SSH клиента ниже)
- Если по какой то причине у вас не получается использовать X11 Forwarding вы можете скачать и распаковать [forge_install_dir.zip](https://mirror.gravitlauncher.com/5.6.x/forge_install_dir.zip) и установить forge локально, а после загрузить получившуюся папку в `LAUNCHSERVER_DIR/config/MirrorHelper/workspace/clients/forge/VERISON`, где VERSION - версия Minecraft
```
installclient MyForgeClient 1.7.10 FORGE
```
- *MyForgeClient* - название вашего клиента
- *1.7.10* - версия Minecraft
- В консоли лаунчсервера вы увидите путь, который вам нужно будет выбрать в установщике Forge
- После успешной установки докачайте необходимые моды
::::

## Использование X11 Forwarding
Для установки некоторых Forge версий клиентов вам может понадобиться использование X11 Forwarding:
- Установите пакет `xauth` на ваш сервер
- Добавьте или измените параметр `X11Forwarding` на `yes` в `sshd_config` на вашем сервере
- Перезапустите sshd
- Следуйте инструкции для вашего SSH клиента:
:::: tabs
@tab [ WSL 2 ]
::: tip Использование WSL 2 (рекомендуется)
- Установите WSL 2 по этому [гайду](https://learn.microsoft.com/ru-ru/windows/wsl/install)
- Находясь в WSL, выполните команду `ssh -XYC yourusername@SERVER_IP`
- Находясь в этой SSH сессии, запустите лаунчсервер без использования screen, docker, tmux и других средств
- Теперь вы можете установить Forge клиент командой `installclient` (см. выше)
@tab [ Linux ]
::: tip Использование Linux (рекомендуется)
- Выполните команду `ssh -XYC yourusername@SERVER_IP`
- Находясь в этой SSH сессии, запустите лаунчсервер без использования screen, docker, tmux и других средств
- Теперь вы можете установить Forge клиент командой `installclient` (см. выше)
@tab [ Putty ]
::: tip Использование Putty
- Установите X Server на Windows: [vcxsrv](https://sourceforge.net/projects/vcxsrv/) и запустите его с настройками по умолчанию
- Включите X11 Forwarding в настройках соединения Putty и подключитесь к серверу
- Находясь в этой SSH сессии, запустите лаунчсервер без использования screen, docker, tmux и других средств
- Теперь вы можете установить Forge клиент командой `installclient` (см. выше)
@tab [ Windows SSH Client ]
::: tip Использование стандартного клиента SSH в Windows
- Установите X Server на Windows: [vcxsrv](https://sourceforge.net/projects/vcxsrv/) и запустите его с настройками по умолчанию
- Если у вас не работает команда `ssh` в терминале Windows, [установите компонент](https://learn.microsoft.com/ru-ru/windows/terminal/tutorials/ssh)
- Выполните команду для CMD `set DISPLAY=localhost:0` или для PowerShell `$env:DISPLAY = 'localhost:0'`
- Не закрывая терминал, выполните команду `ssh -XYC yourusername@SERVER_IP`
- Находясь в этой SSH сессии, запустите лаунчсервер без использования screen, docker, tmux и других средств
- Теперь вы можете установить Forge клиент командой `installclient` (см. выше)
::::

## Команды синхронизации

ЛаунчСервер хранит информацию о файлах и профилях в подготовленном виде.  
Первое автоматическое сохранение происходит при скачивании клиента и ассетов игры.  
Для поддержания информации в актуальном состоянии при изменении файлов в папке `updates` и профилях в папке `profiles`
их необходимо синхронизировать с кэш файлом ЛаунчСервера.

::: tip Синхронизация всех клиентов и профилей:
```java{1}:no-line-numbers
sync up
```
:::
::: tip Синхронизация всех профилей:
```java{1}:no-line-numbers
sync profiles
```
:::
::: tip Синхронизация клиентов игры:
```java{1}:no-line-numbers
sync updates [folder]
```
```java
Options:
      [folder] Выбрать папку для синхронизации [default: all]
```
:::

## Сборка AuthLib

Для сборки **AuthLib** следуйте инструкции:

:::: tabs
@tab [ 1.7.10 - 1.16.3 ]

::: tip Информация:
-  Скачайте файл [LauncherAuthlib1.jar](https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib1.jar)
-  Откройте его архиватором и распакуйте папку com в отдельную папку
-  Откройте ваш **AuthLib** файл архиватором по пути ```libraries/com/mojang/authlib/1.x.xx/authlib-1.x.xx.jar``` и вставьте все файлы с заменой, распакованные на предыдущем этапе
:::

::: details Примечания:
-  В файле [LauncherAuthlib1.jar](https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib1.jar) содержатся изменённые классы оригинальной **AuthLib** 1.x.xx, которые предоставляют обработку AuthCoreProvider для GravitLauncher
-  При замене файлов `.class`, остальные файлы не трогайте. Файлы должны быть перезаписаны и некоторые будут добавлены
:::

@tab [ 1.16.4 - 1.17.x ]

::: tip Информация:
-  Скачайте файл [LauncherAuthlib2.jar](https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib2.jar)
-  Откройте его архиватором и распакуйте папку com в отдельную папку
-  Откройте ваш **AuthLib** файл архиватором по пути ```libraries/com/mojang/authlib/2.x.xx/authlib-2.x.xx.jar``` и вставьте все файлы с заменой, распакованные на предыдущем этапе
:::

::: details Примечания:
-  В файле [LauncherAuthlib2.jar](https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib2.jar) содержатся изменённые классы оригинальной **AuthLib** 2.x.xx, которые предоставляют обработку AuthCoreProvider для GravitLauncher
-  При замене файлов `.class`, остальные файлы не трогайте. Файлы должны быть перезаписаны и некоторые будут добавлены
:::

@tab [ 1.18.x ]

::: tip Информация:
-  Скачайте файл [LauncherAuthlib3.jar](https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib3.jar)
-  Откройте его архиватором и распакуйте папку com в отдельную папку
-  Откройте ваш **AuthLib** файл архиватором по пути ```libraries/com/mojang/authlib/3.x.xx/authlib-3.x.xx.jar``` и вставьте все файлы с заменой, распакованные на предыдущем этапе
:::

::: details Примечания:
-  В файле [LauncherAuthlib3.jar](https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib3.jar) содержатся изменённые классы оригинальной **AuthLib** 3.x.xx, которые предоставляют обработку AuthCoreProvider для GravitLauncher
-  При замене файлов `.class`, остальные файлы не трогайте. Файлы должны быть перезаписаны и некоторые будут добавлены
:::

@tab [ 1.19 ]

::: tip Информация:
-  Скачайте файл [LauncherAuthlib3-1.19.jar](https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib3-1.19.jar)
-  Откройте его архиватором и распакуйте папку com в отдельную папку
-  Откройте ваш **AuthLib** файл архиватором по пути ```libraries/com/mojang/authlib/3.5.41/authlib-3.5.41.jar``` и вставьте все файлы с заменой, распакованные на предыдущем этапе
:::

::: details Примечания:
-  В файле [LauncherAuthlib3-1.19.jar](https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib3-1.19.jar) содержатся изменённые классы оригинальной **AuthLib** 3.x.xx, которые предоставляют обработку AuthCoreProvider для GravitLauncher
-  При замене файлов `.class`, остальные файлы не трогайте. Файлы должны быть перезаписаны и некоторые будут добавлены
:::

@tab [ 1.19.1 - 1.19.4 ]

::: tip Информация:
-  Скачайте файл [LauncherAuthlib3.jar](https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib3-1.19.jar)
-  Откройте его архиватором и распакуйте папку com в отдельную папку
-  Откройте ваш **AuthLib** файл архиватором по пути ```libraries/com/mojang/authlib/3.x.xx/authlib-3.x.xx.jar``` и вставьте все файлы с заменой, распакованные на предыдущем этапе
:::

::: details Примечания:
-  В файле [LauncherAuthlib3.jar](https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib3-1.19.jar) содержатся изменённые классы оригинальной **AuthLib** 3.x.xx, которые предоставляют обработку AuthCoreProvider для GravitLauncher
-  При замене файлов `.class`, остальные файлы не трогайте. Файлы должны быть перезаписаны и некоторые будут добавлены
:::

@tab [ 1.20 - 1.20.1 ]

::: tip Информация:
-  Скачайте файл [LauncherAuthlib4.jar](https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib4.jar)
-  Откройте его архиватором и распакуйте папку com в отдельную папку
-  Откройте ваш **AuthLib** файл архиватором по пути ```libraries/com/mojang/authlib/4.0.43/authlib-4.0.43.jar``` и вставьте все файлы с заменой, распакованные на предыдущем этапе
:::

::: details Примечания:
-  В файле [LauncherAuthlib4.jar](https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib4.jar) содержатся изменённые классы оригинальной **AuthLib** 4.0.43, которые предоставляют обработку AuthCoreProvider для GravitLauncher
-  При замене файлов `.class`, остальные файлы не трогайте. Файлы должны быть перезаписаны и некоторые будут добавлены
:::

@tab [ 1.20.2 ]

::: tip Информация:
-  Скачайте файл [LauncherAuthlib5.jar](https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib5.jar)
-  Откройте его архиватором и распакуйте папку com в отдельную папку
-  Откройте ваш **AuthLib** файл архиватором по пути ```libraries/com/mojang/authlib/5.0.47/authlib-5.0.47.jar``` и вставьте все файлы с заменой, распакованные на предыдущем этапе
:::

::: details Примечания:
-  В файле [LauncherAuthlib5.jar](https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib5.jar) содержатся изменённые классы оригинальной **AuthLib** 5.0.47, которые предоставляют обработку AuthCoreProvider для GravitLauncher
-  При замене файлов `.class`, остальные файлы не трогайте. Файлы должны быть перезаписаны и некоторые будут добавлены
:::

@tab [ 1.20.3+ ]

::: tip Информация:
-  Скачайте файл [LauncherAuthlib6.jar](https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib6.jar)
-  Откройте его архиватором и распакуйте папку com в отдельную папку
-  Откройте ваш **AuthLib** файл архиватором по пути ```libraries/com/mojang/authlib/6.0.xx/authlib-6.0.xx.jar``` и вставьте все файлы с заменой, распакованные на предыдущем этапе
:::

::: details Примечания:
-  В файле [LauncherAuthlib6.jar](https://mirror.gravitlauncher.com/5.6.x/authlib/LauncherAuthlib6.jar) содержатся изменённые классы оригинальной **AuthLib** 6.0.xx, которые предоставляют обработку AuthCoreProvider для GravitLauncher
-  При замене файлов `.class`, остальные файлы не трогайте. Файлы должны быть перезаписаны и некоторые будут добавлены
:::

::::

## Применение патчей Fabric-Loader

Для клиентов Fabric с версией fabric-loader 0.14.X и выше необходимо применить следующий [патч](https://mirror.gravitlauncher.com/5.6.x/patches/FabricLoader.patch) командой ```git apply -3 FabricLoader.patch```

## Настройка профиля

Список параметров профиля с пояснениями:
```json
{
  "title": "Vanilla1.17", // Заголовок профиля
  "uuid": "fa9c1a52-6fa9-4da6-a488-9fc80250095c", // UUID профиля (profileUUID)
  "version": "1.17", // Версия майнкрафта
  "info": "Информация о сервере", // Информация о сервере в окне выбора серверов
  "dir": "Vanilla1.17", // Папка клиента в updates
  "sortIndex": 0, // Порядковый номер в окне выбора серверов
  "assetIndex": "1.17", // Название используемого индекса в ассетах
  "assetDir": "asset1.17", // Папка с ассетами
  "update": [ // Список файлов и папок, которые будут перекачиваться при старте клиента
    "servers.dat"
  ],
  "updateExclusions": [], // Список файлов и папок, которые не надо проверять
  "updateVerify": [ // Список файлов и папок, которые будут перекачиваться при старте клиента и  во время работы
    "libraries",
    "natives",
    "minecraft.jar",
    "forge.jar",
    "liteloader.jar",
    "mods"
  ],
  "updateOptional": [], // Список опциональных модов и дополнительных аргументов
  "jvmArgs": [ // Аргументы JVM
    "-XX:+DisableAttachMechanism",
    "-XX:+UseG1GC",
    "-XX:+UnlockExperimentalVMOptions",
    "-XX:G1NewSizePercent=20",
    "-XX:MaxGCPauseMillis=50",
    "-XX:G1HeapRegionSize=32M",
    "-Djava.library.path=natives",
    "-Dfml.ignorePatchDiscrepancies=true",
    "-Dfml.ignoreInvalidMinecraftCertificates=true"
  ],
  "classPath": [ // Список файлов и библиотек, загружаемых при запуске выбранным загрузчиком классов
    "libraries",
    "minecraft.jar",
    "forge.jar",
    "liteloader.jar"
  ],
  "altClassPath": [], // Список файлов и библиотек, загружаемых при запуске системным загрузчиком классов
  "clientArgs": [], // Дополнительные аргументы клиента
  "compatClasses": [], // Список дополнительных MainClass, которые будут запущены перед основным
  "properties": {}, // Кастомная информация о профиле
  "servers": [ // Список серверов
    {
      "name": "Vanilla1.17", // Название (serverName)
      "serverAddress": "localhost", // Адрес сервера
      "serverPort": 25535, // Порт сервера
      "isDefault": true, // По умолчанию
      "protocol": -1, // Версия протокола сервера
      "socketPing": true // Прямой пинг для получения онлайна
    }
  ],
  "classLoaderConfig": "LAUNCHER", // Тип загрузчика классов (LAUNCHER, AGENT, SYSTEM_ARGS)
  "recommendJavaVersion": 16, // Рекомендуемая версия Java
  "minJavaVersion": 16, // Минимальная версия Java
  "maxJavaVersion": 999, // Максимальная версия Java
  "warnMissJavaVersion": true, // Предупреждение о несоответствии Java требованиям для запуска
  "settings": { // Настройки по умолчанию
    "ram": 0, // Количество ОЗУ (в мегабайтах), 0 - автоматически
    "autoEnter": false, //Авто—вход, может крашиться
    "fullScreen": false // Полноэкранный режим
  },
  "limited": false, // Ограничен permissions
  "mainClass": "net.minecraft.client.main.Main" // MainClass клиента
}
```

::: tip Примечание:
-   ```limited``` так-же должен быть ```true```, для работы ```profileWhitelist```
:::

## Опциональные моды

```json
"updateOptional": [
    {
       "actions": [ //Список действий опционального мода
        { //Первое действие
          "files": {
            "mods/1.7.10/NotEnoughItems-1.7.10-1.0.5.118-universal.jar": "", //Простое добавление файла без переименований
            "mods/SuperStrangeMod0.jar": "mods/SuperStrangeMod.jar", //Добавление файла с перемещением. на стороне ЛаунчСервера файл находится по пути "mods/SuperStrangeMod0.jar", а в клиент он попадет сюда "mods/SuperStrangeMod.jar"
            "mods2/LowStrangeMod.jar": "mods/LowStrangeMod.jar", //Между папками перемещение тоже работает
            "config2/ic2": "config/ic2" //Перемещение папок тоже работает
          },
          "type": "file" //Тип действия - обработка файлов
        }
      ],
       "info": "Мод, показывающий рецепты", //Описание
       "visible": true, //Видимость
       "mark": true, //Включен по умолчанию
       "limited": false, //Ограничен permissions
       "name": "NotEnoughItems", //Имя
       "category": "Интерфейс" //Категория мода. По умолчанию GLOBAL, если не указано
    },
    {
       "actions": [
        {
          "files": {
            "mods/Waila_1.5.10_1.7.10.jar": ""
          },
          "type": "file"
        }
      ],
       "info": "Мод, показывающий дополнительную информацию при наведении на блок",
       "name": "Walia",
       "visible": true,
       "dependenciesFile": [{"name":"NotEnoughItems"/* Имя зависимого мода */}],
       "conflictFile": [{"name":"ClientFixer"/* Имя конфликтующего мода */}],
       "subTreeLevel": 2  //Смещение относительно первого мода. Используется для создания визуального отображения дерева зависимостей
    },
    {
       "actions": [
         {
           "args": [
             "--add-modules",
             "jdk.unsupported"
           ],
           "type": "jvmArgs"
         }
       ],
       "triggers": [], //Триггеры, о них ниже
       "info": "Аргументы Java 9+",
       "visible": false,
       "permissions": 0,
       "name": "Java9Args"
    },
    {
       "actions": [
        {
          "files": {
            "mods/1.7.10/OptiFine_1.7.10_HD_U_E7.jar": ""
          },
          "type": "file"
        }
      ],
       "info": "Улучшение производительности",
       "visible": true,
       "name": "OptiFine HD"
    }
  ],
```
Триггеры - возможность включать опциональный мод при выполнении некоторых условий

:::: tabs
@tab [ Тип OS ]
```json
"triggersList": [
{
  "os": "MACOSX", // ОС: LINUX, MUSTDIE (Это Windows), MACOSX
  "required": false,
  "inverted": false,
  "type": "os"
}
],
```
@tab [ Тип Java ]
```json  
"triggersList": [
{
    "type": "java",
    "minVersion": 8, //Минимальная версия Java для срабатывания триггера
    "maxVersion": 11, //Максимальная версия Java для срабатывания триггера
    "required": true, //Показывает, что без этого триггера включение опционального мода не имеет смысла
    "inverted": false //Инвертировать триггер
  }
],
```
@tab [ Тип Arch ]
```json  
"triggersList": [
{
    "type": "arch",
    "arch": "X86_64", //Архитектура для срабатывания триггера
    "required": true,
    "inverted": false
  }
],
```
::::

## Полезные инструкции

### Добавление сервера в список серверов

1. Запустите клиент, добавьте необходимый сервер
2. Откройте папку клиента игры на вашем компьютере
   - Пример для Windows: `%appdata%/<Имя-Проекта>/updates/<Имя-Клиента>/`
3. Отправьте файл `servers.dat` в папку клиента на ЛаунчСервере
4. Выполните [\[синхронизацию\]](#команды-синхронизации) клиента игры

### Установка языка по умолчанию в раздаваемых клиентах игры

- Этот метод работает только при первом скачивании клиента
1. Создайте файл `options.txt` в папке клиента игры на ЛаунчСервере
2. Впишите одну строчку: `lang:ru_RU` (Либо любого другого языка)
3. Выполните [\[синхронизацию\]](#команды-синхронизации) клиента игры
