# Настройка клиента

## Совместимость

На текущий момент поддерживается запуск:

-   Любой Vanilla версии с 1.7.10 до 1.19.2
-   Любой Forge версии с 1.7.10 до 1.16.5
-   Любой Fabric версии с 1.13 до 1.19.2

## Рекомендации

- При создании проекта используйте самую новую версию Minecraft, доступную для ключевых модов в вашей сборке
- Используйте **Fabric** вместо Forge для проектов на minecraft 1.16.5 и выше
- Используйте [Sodium](https://github.com/CaffeineMC/sodium-fabric) и [Iris](https://github.com/IrisShaders/Iris) вместо Optifine начиная с Minecraft 1.16.5  
Избегайте использования Optifabric - он создает в корне клиента скрытую папку с .jar внутри, которая не будет проверяться лаунчером
- Избегайте использования модов из непроверенных источников. Скачивайте моды с [Curseforge](https://www.curseforge.com/minecraft/mc-mods?filter-sort=5) или напрямую с GitHub разработчика

## Скачивание ассетов

Есть два варианта расположения ассетов в папке updates:

- Классический (по одной папке на версию)
- Общие ассеты (все ассеты хранятся в папке `assets`)

Для скачивания ассетов в общую папку выполните команду ```downloadasset ВЕРСИЯ assets```<br>ПРИМЕР: ```downloadasset 1.19.2 assets```  

При скачивании нескольких версий ассетов в одну папку будут скачаны только недостающие

## Скачивание клиента с зеркала

Список клиентов, доступных на нашем зеркале можно посмотреть тут: [Клиенты](https://mirror.gravitlauncher.com/5.3.x/clients/)

Выполните команду ```downloadclient ВЕРСИЯ НАЗВАНИЕ``` для скачки клиента<br>ПРИМЕР: `downloadclient 1.7.10-forge 1.7.10-forge`

::: tip Примечания:
-   Для скачивания версии c Forge/Fabric допишите в конец версии `-forge`/`-fabric`, например `1.16.5-fabric`
-   Для скачки клиента с стороннего зеркала вместе с профилем вам нужно использовать такую команду: ```downloadclient ВЕРСИЯ НАЗВАНИЕ mirror```   
-   Название папки ассетов как правило записывается в виде ```assetВЕРСИЯ```, например:  **asset1.7.10**,  **asset1.17.1**
-   По умолчанию все клиенты содержат в себе пропатченую **AuthLib**
:::

## Сборка AuthLib

Для сборки **AuthLib** следуйте инструкции:
:::::: code-group
::::: code-group-item [ MineCraft до 1.16.4 ]
:::: code-group
::: code-group-item [ Сборка ]
::: tip Информация:
-  Скачайте файл [LauncherAuthlib1.jar](https://mirror.gravitlauncher.com/5.3.x/compat/authlib/1/LauncherAuthlib1.jar)
-  Откройте его архиватором и распакуйте папку com в отдельную папку
-  Откройте ваш **AuthLib** файл архиватором по пути ```libraries/com/mojang/authlib/1.x.xx/authlib-1.x.xx.jar``` и вставьте все файлы с заменой, распакованные на предыдущем этапе
:::
:::
::: code-group-item [ Переименование ]
::: tip Информация:
-  Скачайте файл [LauncherAuthlib1.jar](https://mirror.gravitlauncher.com/5.3.x/compat/authlib/1/LauncherAuthlib1.jar)
-  Переименуйте его в "0-launcher-authlib.jar" и скопируйте его в папку ```libraries/com/mojang/authlib/1.x.xx/``` вашего клиента
:::
:::
::::
:::: details Примечания:
-  В файле [LauncherAuthlib1.jar](https://mirror.gravitlauncher.com/5.3.x/compat/authlib/1/LauncherAuthlib1.jar) содержаться изменённые классы оригинальной **AuthLib** 1.x.xx, которые предоставляют обработку AuthCoreProvider для GravitLauncher
-  Если вы воспользовались методом сборки, при замене файлов `.class`, остальные файлы не трогайте
::::
:::::
::::: code-group-item [ MineCraft с 1.16.5-1.17.x ]
:::: code-group
::: code-group-item [ Сборка ]
::: tip Информация:
-  Скачайте файл [LauncherAuthlib2.jar](https://mirror.gravitlauncher.com/5.3.x/compat/authlib/2/LauncherAuthlib2.jar)
-  Откройте его архиватором и распакуйте папку com в отдельную папку
-  Откройте ваш **AuthLib** файл архиватором по пути ```libraries/com/mojang/authlib/2.x.xx/authlib-2.x.xx.jar``` и вставьте все файлы с заменой, распакованные на предыдущем этапе
:::
:::
::: code-group-item [ Переименование ]
::: tip Информация:
-  Скачайте файл [LauncherAuthlib2.jar](https://mirror.gravitlauncher.com/5.3.x/compat/authlib/2/LauncherAuthlib2.jar)
-  Переименуйте его в "0-launcher-authlib.jar" и скопируйте его в папку ```libraries/com/mojang/authlib/2.x.xx/``` вашего клиента
:::
:::
::::
:::: details Примечания:
-  В файле [LauncherAuthlib2.jar](https://mirror.gravitlauncher.com/5.3.x/compat/authlib/2/LauncherAuthlib2.jar) содержаться изменённые классы оригинальной **AuthLib** 2.x.xx, которые предоставляют обработку AuthCoreProvider для GravitLauncher
-  Если вы воспользовались методом сборки, при замене файлов `.class`, остальные файлы не трогайте
::::
:::::
::::: code-group-item [ MineCraft 1.18.x ]
:::: code-group
::: code-group-item [ Сборка ]
::: tip Информация:
-  Скачайте файл [LauncherAuthlib3.jar](https://mirror.gravitlauncher.com/5.3.x/compat/authlib/3/LauncherAuthlib3.jar)
-  Откройте его архиватором и распакуйте папку com в отдельную папку
-  Откройте ваш **AuthLib** файл архиватором по пути ```libraries/com/mojang/authlib/3.x.xx/authlib-3.x.xx.jar``` и вставьте все файлы с заменой, распакованные на предыдущем этапе
:::
:::
::: code-group-item [ Переименование ]
::: tip Информация:
-  Скачайте файл [LauncherAuthlib3.jar](https://mirror.gravitlauncher.com/5.3.x/compat/authlib/3/LauncherAuthlib3.jar)
-  Переименуйте его в "0-launcher-authlib.jar" и скопируйте его в папку ```libraries/com/mojang/authlib/3.x.xx/``` вашего клиента
:::
:::
::::
:::: details Примечания:
-  В файле [LauncherAuthlib3.jar](https://mirror.gravitlauncher.com/5.3.x/compat/authlib/3/LauncherAuthlib3.jar) содержаться изменённые классы оригинальной **AuthLib** 3.x.xx, которые предоставляют обработку AuthCoreProvider для GravitLauncher
-  Если вы воспользовались методом сборки, при замене файлов `.class`, остальные файлы не трогайте
::::
:::::
::::: code-group-item [ MineCraft с 1.19 ]
:::: code-group
::: code-group-item [ Сборка ]
::: tip Информация:
-  Скачайте файл [LauncherAuthlib3.jar](https://mirror.gravitlauncher.com/5.3.x/compat/authlib/3/LauncherAuthlib3-1.19.jar)
-  Откройте его архиватором и распакуйте папку com в отдельную папку
-  Откройте ваш **AuthLib** файл архиватором по пути ```libraries/com/mojang/authlib/3.x.xx/authlib-3.x.xx.jar``` и вставьте все файлы с заменой, распакованные на предыдущем этапе
:::
:::
::: code-group-item [ Переименование ]
::: tip Информация:
-  Скачайте файл [LauncherAuthlib3.jar](https://mirror.gravitlauncher.com/5.3.x/compat/authlib/3/LauncherAuthlib3-1.19.jar)
-  Переименуйте его в "0-launcher-authlib.jar" и скопируйте его в папку ```libraries/com/mojang/authlib/3.x.xx/``` вашего клиента
:::
:::
::::
:::: details Примечания:
-  В файле [LauncherAuthlib3.jar](https://mirror.gravitlauncher.com/5.3.x/compat/authlib/3/LauncherAuthlib3.jar) содержаться изменённые классы оригинальной **AuthLib** 3.x.xx, которые предоставляют обработку AuthCoreProvider для GravitLauncher
-  Если вы воспользовались методом сборки, при замене файлов `.class`, остальные файлы не трогайте
::::
:::::
::::::

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
    "-XX:G1NewSizePercent\u003d20",
    "-XX:MaxGCPauseMillis\u003d50",
    "-XX:G1HeapRegionSize\u003d32M",
    "-Djava.library.path\u003dnatives",
    "-Dfml.ignorePatchDiscrepancies\u003dtrue",
    "-Dfml.ignoreInvalidMinecraftCertificates\u003dtrue"
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
      "socketPing": true // Прямой пинг для получения онлайна
    }
  ],
  "classLoaderConfig": "LAUNCHER", // Тип загрузчика классов (LAUNCHER, AGENT, SYSTEM_ARGS)
  "runtimeInClientConfig": "NONE", // Запуск GUI рантайма при старте клиента (NONE, BASIC, FULL)
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
::::

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