# Настройка клиента

## Совместимость

На текущий момент поддерживается запуск:

-   Любой Vanilla версии с 1.7.10 до 1.20.1
-   Любой Forge версии с 1.7.10 до 1.16.5
-   Любой Fabric версии с 1.13 до 1.20.1

В экспериментальном режиме так же имеется поддержка

- Quilt 1.19.4 (сборка осуществляется через модуль MirrorHelper)
- Forge 1.18.2/1.19.4 (сборка осуществляется по гайду в нашем Discord сервере)
- Промежуточные и snapshot версии ванильного и Fabric клиента (сборка осуществляется через модуль MirrorHelper)

## Рекомендации

- При создании проекта используйте самую новую версию Minecraft, доступную для ключевых модов в вашей сборке
- Используйте **Fabric** вместо Forge для проектов на minecraft 1.16.5 и выше
- Используйте [Sodium](https://github.com/CaffeineMC/sodium-fabric) и [Iris](https://github.com/IrisShaders/Iris) вместо Optifine начиная с Minecraft 1.16.5  
Избегайте использования Optifabric - он создает в корне клиента скрытую папку с .jar внутри, которая не будет проверяться лаунчером
- Избегайте использования модов из непроверенных источников. Скачивайте моды с [Curseforge](https://www.curseforge.com/minecraft/mc-mods?filter-sort=5)/[Modrinth](https://modrinth.com/) или напрямую с GitHub разработчика

## Скачивание ассетов

Есть два варианта расположения ассетов в папке updates:

- Классический (по одной папке на версию)
- Общие ассеты (все ассеты хранятся в папке `assets`)

Для скачивания ассетов в общую папку выполните команду ```downloadasset ВЕРСИЯ assets```<br>ПРИМЕР: ```downloadasset 1.19.2 assets```  

При скачивании нескольких версий ассетов в одну папку будут скачаны только недостающие

## Скачивание клиента с зеркала

Список клиентов, доступных на нашем зеркале можно посмотреть тут: [Клиенты](https://mirror.gravitlauncher.com/5.4.x/clients/)

Выполните команду ```downloadclient ВЕРСИЯ НАЗВАНИЕ``` для скачки клиента<br>ПРИМЕР: `downloadclient 1.7.10-forge 1.7.10-forge`

::: tip Примечания:
-   Для скачивания версии c Forge/Fabric допишите в конец версии `-forge`/`-fabric`, например `1.16.5-fabric`
-   Для скачки клиента с стороннего зеркала вместе с профилем вам нужно использовать такую команду: ```downloadclient ВЕРСИЯ НАЗВАНИЕ mirror```   
-   Название папки ассетов как правило записывается в виде ```assetВЕРСИЯ```, например:  **asset1.7.10**,  **asset1.17.1**
-   По умолчанию все клиенты содержат в себе пропатченую **AuthLib**
:::

## Сборка клиента модулем MirrorHelper

- ~~Информация нужнается в дополнении~~

Все клиента, которых нет на [Зеркале](https://mirror.gravitlauncher.com/5.4.x/clients/) можно собрать через [Этот модуль](https://github.com/GravitLauncher/LauncherModules/tree/master/MirrorHelper_module)

::: tip Установка модуля на LaunchServer
- Установка symlink (Если LaunchServer установлен скриптом с исходниками)
  ```bash
  cd modules
  ln -s ../src/modules/MirrorHelper_module/build/libs/MirrorHelper_module.jar
  ```
- Скачивание с релизов:
  - Скачать файл [LaunchServerModules.zip](https://github.com/GravitLauncher/Launcher/releases/latest/download/LaunchServerModules.zip) (Ссылка ведёт всегда на последний релиз)
  - Поместить файл **MirrorHelper_module.jar** в папку **modules/**
:::

## Сборка AuthLib

Для сборки **AuthLib** следуйте инструкции:
::::: code-group
:::: code-group-item [ 1.7.10 - 1.16.3 ]

::: tip Информация:
-  Скачайте файл [LauncherAuthlib1.jar](https://mirror.gravitlauncher.com/5.4.x/compat/authlib/LauncherAuthlib1.jar)
-  Откройте его архиватором и распакуйте папку com в отдельную папку
-  Откройте ваш **AuthLib** файл архиватором по пути ```libraries/com/mojang/authlib/1.x.xx/authlib-1.x.xx.jar``` и вставьте все файлы с заменой, распакованные на предыдущем этапе
:::

::: details Примечания:
-  В файле [LauncherAuthlib1.jar](https://mirror.gravitlauncher.com/5.4.x/compat/authlib/LauncherAuthlib1.jar) содержаться изменённые классы оригинальной **AuthLib** 1.x.xx, которые предоставляют обработку AuthCoreProvider для GravitLauncher
-  При замене файлов `.class`, остальные файлы не трогайте. Файлы должны быть перезаписаны и некоторые будут добавлены
:::

::::
:::: code-group-item [ 1.16.4 - 1.17.x ]

::: tip Информация:
-  Скачайте файл [LauncherAuthlib2.jar](https://mirror.gravitlauncher.com/5.4.x/compat/authlib/LauncherAuthlib2.jar)
-  Откройте его архиватором и распакуйте папку com в отдельную папку
-  Откройте ваш **AuthLib** файл архиватором по пути ```libraries/com/mojang/authlib/2.x.xx/authlib-2.x.xx.jar``` и вставьте все файлы с заменой, распакованные на предыдущем этапе
:::

::: details Примечания:
-  В файле [LauncherAuthlib2.jar](https://mirror.gravitlauncher.com/5.4.x/compat/authlib/LauncherAuthlib2.jar) содержаться изменённые классы оригинальной **AuthLib** 2.x.xx, которые предоставляют обработку AuthCoreProvider для GravitLauncher
-  При замене файлов `.class`, остальные файлы не трогайте. Файлы должны быть перезаписаны и некоторые будут добавлены
:::

::::
:::: code-group-item [ 1.18.x ]

::: tip Информация:
-  Скачайте файл [LauncherAuthlib3.jar](https://mirror.gravitlauncher.com/5.4.x/compat/authlib/LauncherAuthlib3.jar)
-  Откройте его архиватором и распакуйте папку com в отдельную папку
-  Откройте ваш **AuthLib** файл архиватором по пути ```libraries/com/mojang/authlib/3.x.xx/authlib-3.x.xx.jar``` и вставьте все файлы с заменой, распакованные на предыдущем этапе
:::

::: details Примечания:
-  В файле [LauncherAuthlib3.jar](https://mirror.gravitlauncher.com/5.4.x/compat/authlib/LauncherAuthlib3.jar) содержаться изменённые классы оригинальной **AuthLib** 3.x.xx, которые предоставляют обработку AuthCoreProvider для GravitLauncher
-  При замене файлов `.class`, остальные файлы не трогайте. Файлы должны быть перезаписаны и некоторые будут добавлены
:::

::::
:::: code-group-item [ 1.19 ]

::: tip Информация:
-  Скачайте файл [LauncherAuthlib3-1.19.jar](https://mirror.gravitlauncher.com/5.4.x/compat/authlib/LauncherAuthlib3-1.19.jar)
-  Откройте его архиватором и распакуйте папку com в отдельную папку
-  Откройте ваш **AuthLib** файл архиватором по пути ```libraries/com/mojang/authlib/3.5.41/authlib-3.5.41.jar``` и вставьте все файлы с заменой, распакованные на предыдущем этапе
:::

::: details Примечания:
-  В файле [LauncherAuthlib3-1.19.jar](https://mirror.gravitlauncher.com/5.4.x/compat/authlib/LauncherAuthlib3-1.19.jar) содержаться изменённые классы оригинальной **AuthLib** 3.x.xx, которые предоставляют обработку AuthCoreProvider для GravitLauncher
-  При замене файлов `.class`, остальные файлы не трогайте. Файлы должны быть перезаписаны и некоторые будут добавлены
:::

::::
:::: code-group-item [ 1.19.1 - 1.19.4 ]

::: tip Информация:
-  Скачайте файл [LauncherAuthlib3-1.19.1.jar](https://mirror.gravitlauncher.com/5.4.x/compat/authlib/LauncherAuthlib3-1.19.1.jar)
-  Откройте его архиватором и распакуйте папку com в отдельную папку
-  Откройте ваш **AuthLib** файл архиватором по пути ```libraries/com/mojang/authlib/3.x.xx/authlib-3.x.xx.jar``` и вставьте все файлы с заменой, распакованные на предыдущем этапе
:::

::: details Примечания:
-  В файле [LauncherAuthlib3-1.19.1.jar](https://mirror.gravitlauncher.com/5.4.x/compat/authlib/LauncherAuthlib3-1.19.1.jar) содержаться изменённые классы оригинальной **AuthLib** 3.x.xx, которые предоставляют обработку AuthCoreProvider для GravitLauncher
-  При замене файлов `.class`, остальные файлы не трогайте. Файлы должны быть перезаписаны и некоторые будут добавлены
:::

::::
:::: code-group-item [ 1.20.x ]

::: tip Информация:
-  Скачайте файл [LauncherAuthlib4.jar](https://mirror.gravitlauncher.com/5.4.x/compat/authlib/LauncherAuthlib4.jar)
-  Откройте его архиватором и распакуйте папку com в отдельную папку
-  Откройте ваш **AuthLib** файл архиватором по пути ```libraries/com/mojang/authlib/4.x.xx/authlib-4.x.xx.jar``` и вставьте все файлы с заменой, распакованные на предыдущем этапе
:::

::: details Примечания:
-  В файле [LauncherAuthlib4.jar](https://mirror.gravitlauncher.com/5.4.x/compat/authlib/LauncherAuthlib4.jar) содержаться изменённые классы оригинальной **AuthLib** 4.x.xx, которые предоставляют обработку AuthCoreProvider для GravitLauncher
-  При замене файлов `.class`, остальные файлы не трогайте. Файлы должны быть перезаписаны и некоторые будут добавлены
:::

::::
:::::

## Применение патчей Fabric-Loader

Для клиентов Fabric с версией fabric-loader 0.14.X и выше необходимо применить следующий [патч](https://mirror.gravitlauncher.com/5.2.x/compat/FabricLoader.patch)  
Клиенты зеркала **уже содержат в себе патченый fabric-loader**

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
            "mods/SuperStrangeMod0.jar": "mods/SuperStrangeMod.jar", //Добавление файла с перемещением. на стороне лаунчсервера файл находится по пути "mods/SuperStrangeMod0.jar", а в клиент он попадет сюда "mods/SuperStrangeMod.jar"
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
       "name": "NotEnoughItems" //Имя
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

:::: code-group
::: code-group-item [ Тип OS ]
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
:::
::: code-group-item [ Тип Java ]
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
:::
::: code-group-item [ Тип Arch ]
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
:::
::::