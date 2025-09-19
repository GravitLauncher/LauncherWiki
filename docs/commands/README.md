# Команды лаунчсервера

Команды лаунчсервера вводятся в терминал лаунчсервера

## Основные команды

### build

Команда build собирает лаунчер из подготовленных файлов.  

Пересборка лаунчера необходима в следующих случаях:

- Первый запуск (лаунчер еще не был собран)
- Изменение параметра конфигурации лаунчсервера `netty.address` и любых параметров в секции `launcher` 
- Добавление или удаление модулей для лаунчера
- Изменение конфигурации модулей для лаунчера
- Изменение файлов дизайна лаунчера(папка `runtime`)
- Изменение секции `sign` лаунчсервера
- Приминение модулей работающих с лаунчером, например `Prestarter` или `OSSLSignModule`

### config profilesprovider sync

Это команда ручной синхронизации директории `updates` и профилей в папке `profiles` в конфигурации по умолчанию.

Синхронизация необходима:

- При любом ручном изменении, добавлении и удалении файлов в папке `updates`/`profiles`

### modules

Это основная команда работы с модулями

```
modules load [module name] - включить и загрузить модуль для лаунчсервера
modules launcher-load [module name] - включить и загрузить модуль для лаунчера
modules list - просмотреть список уже загруженных модулей
modules available - просмотреть список доступных модулей
modules launcher-reload - обновить конфигурацию модулей для лаунчера(выполнять перед build при изменении конфигурации)
```

### stop

Команда завершающая работу лаунчсервера. Если лаунчсервер запущен в среде docker - он будет перезапущен автоматически если контейнер настроен на автоматический рестарт

### applyworkspace <Badge type="important" text="Требуется MirrorHelper_module" />

Это команда применяет workspace (набор инструкций по сборке клиентов) скачивая его с зеркала или используя указанный файл

```
applyworkspace - применить workspace с зеркала по умолчанию
applyworkspace https://mirror.gravitlauncher.com/5.7.x/workspace.json - применить workspace с указанного url
applyworkspace /path/to/file/workspace.json  - применить workspace с указанного файла
```

### installclient <Badge type="important" text="Требуется MirrorHelper_module" />

Эта команда устанавливает клиент согласно примененному workspace.

Поддерживаемые версии клиентов:

- 1.7.10 Forge (с lwjgl3ify)
- 1.12.2.Forge (с cleanroom)
- 1.16.5 Forge
- 1.18+ Forge/NeoForge - требуется скачивание установщика, см `downloadinstaller`
- 1.18+ Fabric

- Некоторые снапшоты (такие как `25w14craftmine`)

Неподдерживаемые версии клиентов:
- Все версии до 1.7.10
- Все ванильные версии до 1.13 (с lwjgl 2)

Версии клиентов которые здесь не упомянуты не тестируются и могут работать, а могут и нет

Примеры использования команды:

```
installclient MyBestClient 1.7.10 FORGE - установить Minecraft 1.7.10 Forge в профиль MyBestClient
installclient MyBestClient2 1.12.2 FORGE - установить Minecraft 1.12.2 Forge в профиль MyBestClient2
installclient MyBestClient3 1.21.8 FABRIC - установить Minecraft 1.21.8 Fabric в профиль MyBestClient3
installclient MyBestClient4 1.21.8 NEOFORGE - установить Minecraft 1.21.8 NeoForge в профиль MyBestClient4 (не забудьте предварительно скачать установщик командой `downloadinstaller`)
installclient CraftMine "{\"name\": \"25w14craftmine\", \"data\": [1,21,5]}" FABRIC - Установить снапшот 25w14craftmine используя в качестве опорной версии 1.21.5
```

### downloadinstaller <Badge type="important" text="Требуется MirrorHelper_module" />

Эта команда скачивает установщик Forge/NeoForge последней или указанной версии для указанной версии Minecraft

```
downloadinstaller NEOFORGE 1.21.8 - скачать последнюю версию NeoForge для 1.21.8
downloadinstaller NEOFORGE 1.21.8 21.8.40 - скачать версию 21.8.40 NeoForge для 1.21.8
downloadinstaller FORGE 1.20.1 - скачать последнюю версию Forge для 1.20.1
downloadinstaller FORGE 1.20.1 47.4.8 - скачать версию 47.4.8 Forge для 1.20.1
```

### help

Выводит список всех команд

```
help - вывести список всех команд
help config - вывести список подкоманд команды config
help profiles - вывести список подкоманд команды profiles
```

### debug

Включает логгирование сообщений передаваемых по сети(а так же прочих служебных сообщений) для отладки. Эта отладка работает только на сообщения и логи поступаемые из лаунчсервера

```
debug true - включить отладку
debug false - выключить отладку
```

### version

Показывает версию лаунчсервера и прочую информацию

### token

Предназначена для управления токенами

```
token server MyBestClient std false - получение checkServer токена для привызки сервера
```

- MyBestClient - название вашего клиента(секция `title` профиля)
- std - внутреннее имя способа авторизации к которому вы (по умолчанию std)
- false - токен не является публичным(ему доступна приватная информация о HWID и сессии пользователя)

### profile

Работа с профилями

```
profile create 1.7.10-forge MyBestClient - скачать клиент 1.7.10-forge с зеркала без MirrorHelper(если на зеркале он доступен)
profile clone MyBestClient NewMyBestClient - Сделать копию клиента MyBestClient и дать ему название NewMyBestClient
profile list - просмотреть список профилей
profile delete MyBestClient - удалить профиль MyBestClient включая все его файлы навсегда
```

## Вспомогательные и отладочные команды

Эти команды могут быть плохо документированы и/или протестированы. Пользуйтесь ими с осторожностью

### clients

Просматривает список подключенных клиентов

### serverstatus

Показывает uptime и текущее состояние занятости Java Heap памяти

### config launchserver reload

Перезагрузка конфигурации лаунчсервера без перезапуска

### config launchserver save

Сохранение конфигурации лаунчсервера (для добавления в конфиг новых полей без сброса конфига)

### config auth.std.core sudo

Вход под другим пользователем без знания пароля  
Для этого узнайте connectUUID через команду `getconnectuuid` на стороне клиента, после чего введите

```
config auth.std.core sudo YOUR_CONNECT_UUID YourUsername true CLIENT
```

### config auth.std.core newSession

Создание сессии под другим пользователем без знания пароля  

```
config auth.std.core newSession YOUR_CONNECT_UUID YourUsername true CLIENT
```

