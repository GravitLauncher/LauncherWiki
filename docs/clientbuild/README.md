# Настройка клиента

## Совместимость

Начиная с версии 5.6.0 лаунчер поддерживает запуск клиентов и серверов только с Java 17+

На текущий момент поддерживается запуск:

-   Любой Vanilla версии с 1.13 до 1.21.8(на момент написания документации), включая snapshot
-   Forge 1.7.10 с lwjgl3ify
-   Forge 1.12.2 с cleanroom
-   Forge 1.16.5
-   NeoForge/Forge 1.18+
-   Любой Fabric версии с 1.13 до 1.21.8(на момент написания документации), включая snapshot


Если у вас возникли проблемы с установкой или работой клиента, или вы хотите попытаться запустить неподдерживаемые клиенты, добро пожаловать в наш [Discord сервере](https://discord.gg/b9QG4ygY75)

## Рекомендации

- При создании проекта используйте самую новую версию Minecraft, доступную для ключевых модов в вашей сборке
- Используйте **Fabric** вместо Forge для проектов на Minecraft 1.16.5 и выше
- Используйте [Sodium](https://github.com/CaffeineMC/sodium-fabric) и [Iris](https://github.com/IrisShaders/Iris) вместо OptiFine для проектов на Minecraft 1.16.5 и выше
- Избегайте использования OptiFabric
- Избегайте использования модов из непроверенных источников. Скачивайте моды с [Curseforge](https://www.curseforge.com/minecraft/mc-mods?filter-sort=5)/[Modrinth](https://modrinth.com/) или напрямую с GitHub разработчика

## Работа модов 1.7.10

Начиная с версии 5.6.0 лаунчер работает только с клиентами, поддерживающими запуск на Java 17 и выше. Forge 1.7.10 и 1.12.2 были портированы на Java 17+ сторонними разработчиками, что привело к несовместимости с некоторыми грязными трюками, которые применяли мододелы в своих модах на эту версию. Вот что вам нужно сделать для портирования своей сборки на Java 17+:

- Установите мод [Hodgepodge](https://github.com/GTNewHorizons/Hodgepodge)
- Установите библиотеку [GTNHLib](https://github.com/GTNewHorizons/GTNHLib) и при желании [Angelica](https://github.com/GTNewHorizons/Angelica)
- Проверьте наличие актуальной исправленной версии ваших модов при помощи поиска в [репозитории GTNH](https://github.com/GTNewHorizons) и обновите их
- Если проблема остается актуальной обратитесь в наш Discord сервер в канал support

## Работа модов 1.12.2

Cleanroom имеет аналогичные проекты патчей модов для 1.12.2. Они значительно менее развиты чем для 1.7.10, однако позволяют запустить большинство популярных модов

- Установите мод [Fugue](https://github.com/CleanroomMC/Fugue)
- Установите мод [Scalar](https://github.com/CleanroomMC/Scalar)

## Установка клиента

- Установите модуль MirrorHelper если вы еще этого не сделали (выполните один раз)

```
modules load MirrorHelper_module
```

- Примените workspace (выполните один раз)

```
applyworkspace
```

- Скачайте установщик Forge/NeoForge (только для Forge/NeoForge 1.18+) (выполните один раз для необходимых вам версий Minecraft 1.18+ Forge/NeoForge)

```
downloadinstaller NEOFORGE 1.21.8
```

- Установите клиент

```
installclient MyGreatClient 1.21.8 NEOFORGE
```

## Поддержка устаревших клиентов на Java 8 с помощью режима BRIDGE

Мы не рекомендуем использовать устаревшие клиенты и сервера без поддержки Java 21+. Однако если вам по какой то причине это необходимо вы можете воспользоватся специальным режимом работы лаунчера.

- Если у вас уже есть клиент, работающий на Java 8 - перенесите его в лаунчер опираясь на ваш предыдущий профиль и актуальный формат
- Измените рекомендуемую, минимальную и максимальную версию Java в профиле
- Установите `classLoaderConfig` в значение `BRIDGE`
- Установите специальную версию authlib `https://mirror.gravitlauncher.com/5.7.x/authlib/LauncherAuthlib1-bridge.jar`
- Синхронизируйте изменения и проверьте работу. Для привязке сервера следуйте инструкции для BRIDGE
- Лаунчер не должен закрываться при работе клиентов в режиме BRIDGE. Актуальная версия рантайма покажет вам диалог с предупреждением если вы попытаетесь выйти из лаунчера не закрыв клиент

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
