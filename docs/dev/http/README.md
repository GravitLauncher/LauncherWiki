# HTTP Auth Module API

Документация по HTTP модулю авторизации для GravitLauncher. Этот модуль позволяет реализовать собственную систему авторизации через HTTP API.

## Обзор

HTTP модуль (`MyHttpAuthCoreProvider`) является мостом между LaunchServer и вашим собственным HTTP API для авторизации. Модуль поддерживает:

- Авторизацию по логину и паролю
- Двухфакторную аутентификацию (2FA/TOTP)
- Управление сессиями (access/refresh токены)
- Работу с HWID (Hardware ID)
- Интеграцию с серверами Minecraft (joinServer/checkServer)

## Настройка

### Установка модуля

1. Скомпилируйте модуль `MyHttp_module`
2. Установите его в директорию `modules` LaunchServer
3. Настройте конфигурацию авторизации в `LaunchServer.json`:

```json
{
  "auth": {
    "http": {
      "isDefault": false,
      "core": {
        "type": "myhttp",
        "userByUsername": "https://example.com/getbyusername.php?username=%username%",
        "userByUuid": "https://example.com/getbyuuid.php?uuid=%uuid%",
        "userByToken": "https://example.com/getbytoken.php",
        "refreshAccessToken": "https://example.com/refreshtoken.php",
        "authorize": "https://example.com/authorize.php",
        "checkServer": "https://example.com/checkserver.php",
        "joinServer": "https://example.com/joinserver.php",
        "bearerToken": "YOUR_BEARER_TOKEN",
        "getHardwareInfoByPublicKeyUrl": "https://example.com/hardware/getbypublickey.php",
        "getHardwareInfoByDataUrl": "https://example.com/hardware/getbydata.php",
        "getHardwareInfoByIdUrl": "https://example.com/hardware/getbyid.php",
        "createHardwareInfoUrl": "https://example.com/hardware/create.php",
        "connectUserAndHardwareUrl": "https://example.com/hardware/connect.php",
        "addPublicKeyToHardwareInfoUrl": "https://example.com/hardware/addpublickey.php",
        "getUsersByHardwareInfoUrl": "https://example.com/hardware/getusers.php",
        "banHardwareUrl": "https://example.com/hardware/ban.php",
        "unbanHardwareUrl": "https://example.com/hardware/unban.php"
      },
      "displayName": "Http Method",
      "visible": true
    }
  }
}
```

### Безопасность

::: warning ВАЖНО
- Всегда проверяйте `bearerToken` в каждом запросе
- Используйте HTTPS для всех эндпоинтов
- Храните `bearerToken` в безопасном месте
- Доступ к API должен иметь только LaunchServer
:::

## Структуры данных

### User

Структура пользователя:

```json
{
  "username": "Gravita",
  "uuid": "bdbfaf45-a921-4721-a370-e9eb7576f60e",
  "permissions": ["launcher.*", "launchserver.*"],
  "roles": ["ADMIN"],
  "assets": {
    "SKIN": {
      "url": "http://example.com/skin.png",
      "digest": "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
      "metadata": {
        "model": "slim"
      }
    },
    "CAPE": {
      "url": "http://example.com/cape.png",
      "digest": "d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35",
      "metadata": {}
    }
  },
  "banned": false
}
```

**Поля:**
- `username` (string) - имя пользователя
- `uuid` (string) - UUID пользователя в формате с дефисами
- `permissions` (array[string]) - список разрешений
- `roles` (array[string]) - список ролей
- `assets` (object) - текстуры и ассеты пользователя
- `banned` (boolean) - заблокирован ли пользователь

### UserSession

Структура сессии пользователя:

```json
{
  "id": "1",
  "accessToken": "ACCESS_TOKEN_STRING",
  "refreshToken": "REFRESH_TOKEN_STRING",
  "expire": 3600,
  "user": {
    "username": "Gravita",
    "uuid": "bdbfaf45-a921-4721-a370-e9eb7576f60e",
    "permissions": [],
    "roles": [],
    "assets": {},
    "banned": false
  },
  "hardwareId": "hardware_id_string",
  "userHardware": {
    "id": "hardware_id_string",
    "publicKey": "base64_encoded_public_key",
    "hardwareInfo": {
      "hwDiskId": "disk_id",
      "baseboardSerialNumber": "board_serial",
      "displayId": ["display_id_1"],
      "bitness": 64,
      "totalMemory": 16384,
      "logicalProcessors": 8,
      "physicalProcessors": 4,
      "processorMaxFreq": 3600,
      "battery": false,
      "oemId": "oem_id"
    },
    "banned": false
  }
}
```

**Поля:**
- `id` (string) - идентификатор сессии
- `accessToken` (string) - токен доступа для Minecraft
- `refreshToken` (string) - токен для обновления сессии
- `expire` (integer) - время жизни токена в секундах
- `user` (User) - объект пользователя
- `hardwareId` (string, optional) - идентификатор железа
- `userHardware` (UserHardware, optional) - информация о железе

### UserHardware

Структура информации о железе:

```json
{
  "id": "unique_hardware_id",
  "publicKey": "base64_encoded_public_key",
  "hardwareInfo": {
    "hwDiskId": "disk_serial_number",
    "baseboardSerialNumber": "motherboard_serial",
    "displayId": ["display_id_1", "display_id_2"],
    "bitness": 64,
    "totalMemory": 16384,
    "logicalProcessors": 8,
    "physicalProcessors": 4,
    "processorMaxFreq": 3600,
    "battery": false,
    "oemId": "manufacturer_id"
  },
  "banned": false
}
```

**Поля:**
- `id` (string) - уникальный идентификатор железа
- `publicKey` (string) - публичный ключ в base64
- `hardwareInfo` (HardwareInfo) - детальная информация о железе
- `banned` (boolean) - заблокировано ли железо

### Error

Структура ошибки:

```json
{
  "error": "Error message",
  "code": 1000
}
```

**Поля:**
- `error` (string) - текст ошибки
- `code` (integer, optional) - код ошибки

**Специальные коды ошибок:**
- `1001` - токен истёк (`auth.tokenexpired`)
- `1002` - неверный refresh токен (`auth.invalidtoken`)

## API Endpoints

### Авторизация

#### POST /authorize.php

Первичная авторизация по логину и паролю.

**Заголовки:**
```
Authorization: Bearer YOUR_BEARER_TOKEN
Content-Type: application/json
```

**Запрос:**
```json
{
  "login": "Gravita",
  "password": "user_password",
  "totpCode": "123456"
}
```

**Поля запроса:**
- `login` (string, required) - логин пользователя
- `password` (string, required) - пароль пользователя
- `totpCode` (string, optional) - код двухфакторной аутентификации (отправляется только если требуется 2FA)

**Успешный ответ (200):**
```json
{
  "id": "1",
  "accessToken": "generated_access_token",
  "refreshToken": "generated_refresh_token",
  "expire": 3600,
  "user": {
    "username": "Gravita",
    "uuid": "bdbfaf45-a921-4721-a370-e9eb7576f60e",
    "permissions": [],
    "roles": [],
    "assets": {},
    "banned": false
  }
}
```

**Ошибки:**
- `auth.usernotfound` - пользователь не найден
- `auth.wrongpassword` - неверный пароль
- `auth.require2fa` - требуется код 2FA (клиент должен запросить код у пользователя)
- `auth.wrongtotp` - неверный код 2FA

::: tip Примечание
Если пользователь включил 2FA, сначала верните ошибку `auth.require2fa`. Клиент запросит код у пользователя и отправит повторный запрос с полем `totpCode`.
:::

---

#### POST /getbytoken.php

Восстановление сессии по access токену.

**Заголовки:**
```
Authorization: Bearer YOUR_BEARER_TOKEN
Content-Type: application/json
```

**Запрос:**
```json
{
  "accessToken": "existing_access_token"
}
```

**Поля запроса:**
- `accessToken` (string, required) - существующий токен доступа

**Успешный ответ (200):**
```json
{
  "id": "1",
  "accessToken": "existing_access_token",
  "refreshToken": "existing_refresh_token",
  "expire": 1800,
  "user": {
    "username": "Gravita",
    "uuid": "bdbfaf45-a921-4721-a370-e9eb7576f60e",
    "permissions": [],
    "roles": [],
    "assets": {},
    "banned": false
  }
}
```

**Ошибки:**
- `code: 1001` - токен истёк
- Любая другая ошибка с описанием

---

#### POST /refreshtoken.php

Обновление истёкшего access токена.

**Заголовки:**
```
Authorization: Bearer YOUR_BEARER_TOKEN
Content-Type: application/json
```

**Запрос:**
```json
{
  "refreshToken": "existing_refresh_token"
}
```

**Поля запроса:**
- `refreshToken` (string, required) - refresh токен

**Успешный ответ (200):**
```json
{
  "id": "1",
  "accessToken": "new_access_token",
  "refreshToken": "new_refresh_token",
  "expire": 3600
}
```

::: tip Рекомендация
Рекомендуется генерировать новый refresh токен при каждом обновлении для повышения безопасности, но это необязательно.
:::

**Ошибки:**
- `code: 1002` - неверный refresh токен

---

### Получение пользователей

#### GET /getbyusername.php

Получение пользователя по имени.

**Заголовки:**
```
Authorization: Bearer YOUR_BEARER_TOKEN
```

**Параметры URL:**
- `username` (string, required) - имя пользователя

**Пример:**
```
GET /getbyusername.php?username=Gravita
```

**Успешный ответ (200):**
```json
{
  "username": "Gravita",
  "uuid": "bdbfaf45-a921-4721-a370-e9eb7576f60e",
  "permissions": [],
  "roles": [],
  "assets": {},
  "banned": false
}
```

**Ошибки:**
- `404` - пользователь не найден

---

#### GET /getbyuuid.php

Получение пользователя по UUID.

**Заголовки:**
```
Authorization: Bearer YOUR_BEARER_TOKEN
```

**Параметры URL:**
- `uuid` (string, required) - UUID пользователя

**Пример:**
```
GET /getbyuuid.php?uuid=bdbfaf45-a921-4721-a370-e9eb7576f60e
```

**Успешный ответ (200):**
```json
{
  "username": "Gravita",
  "uuid": "bdbfaf45-a921-4721-a370-e9eb7576f60e",
  "permissions": [],
  "roles": [],
  "assets": {},
  "banned": false
}
```

**Ошибки:**
- `404` - пользователь не найден

---

### Minecraft Server Integration

#### POST /joinserver.php

Вход на сервер (вызывается клиентом).

**Заголовки:**
```
Authorization: Bearer YOUR_BEARER_TOKEN
Content-Type: application/json
```

**Запрос:**
```json
{
  "username": "Gravita",
  "uuid": "bdbfaf45-a921-4721-a370-e9eb7576f60e",
  "accessToken": "user_access_token",
  "serverId": "server_generated_id"
}
```

**Поля запроса:**
- `username` (string, required) - имя пользователя
- `uuid` (string, required) - UUID пользователя
- `accessToken` (string, required) - токен доступа пользователя
- `serverId` (string, required) - ID сервера, сгенерированный сервером Minecraft

**Успешный ответ (200):**
```json
{}
```

::: warning ВАЖНО
При получении этого запроса необходимо:
1. Проверить валидность accessToken
2. Убедиться, что username и uuid соответствуют токену
3. Сохранить serverId в базу данных для этой сессии
:::

**Ошибки:**
- `session not found` - сессия не найдена
- `accessToken incorrect` - неверный токен
- `username incorrect` - имя не соответствует токену
- `uuid incorrect` - UUID не соответствует токену

---

#### POST /checkserver.php

Проверка входа (вызывается сервером Minecraft).

**Заголовки:**
```
Authorization: Bearer YOUR_BEARER_TOKEN
Content-Type: application/json
```

**Запрос:**
```json
{
  "username": "Gravita",
  "serverId": "server_generated_id"
}
```

**Поля запроса:**
- `username` (string, required) - имя пользователя
- `serverId` (string, required) - ID сервера

**Успешный ответ (200):**
```json
{
  "username": "Gravita",
  "uuid": "bdbfaf45-a921-4721-a370-e9eb7576f60e",
  "permissions": [],
  "roles": [],
  "assets": {},
  "banned": false
}
```

::: warning ВАЖНО
При получении этого запроса необходимо:
1. Найти сессию с указанным serverId
2. Убедиться, что username соответствует сессии
3. Вернуть данные пользователя
:::

**Ошибки:**
- `session not found` - сессия с таким serverId не найдена
- `serverId incorrect` - serverId не соответствует сессии

---

### Hardware (HWID) Management

#### POST /hardware/getbypublickey.php

Получение информации о железе по публичному ключу.

**Заголовки:**
```
Authorization: Bearer YOUR_BEARER_TOKEN
Content-Type: application/json
```

**Запрос:**
```json
{
  "publicKey": "base64_encoded_public_key"
}
```

**Поля запроса:**
- `publicKey` (string, required) - публичный ключ в base64

**Успешный ответ (200):**
```json
{
  "id": "hardware_id",
  "publicKey": "base64_encoded_public_key",
  "hardwareInfo": {
    "hwDiskId": "disk_id",
    "baseboardSerialNumber": "board_serial",
    "displayId": ["display_1"],
    "bitness": 64,
    "totalMemory": 16384,
    "logicalProcessors": 8,
    "physicalProcessors": 4,
    "processorMaxFreq": 3600,
    "battery": false,
    "oemId": "oem_id"
  },
  "banned": false
}
```

**Ответ при отсутствии (204):**
```
No Content
```

---

#### POST /hardware/getbydata.php

Получение информации о железе по характеристикам.

**Заголовки:**
```
Authorization: Bearer YOUR_BEARER_TOKEN
Content-Type: application/json
```

**Запрос:**
```json
{
  "info": {
    "hwDiskId": "disk_id",
    "baseboardSerialNumber": "board_serial",
    "displayId": ["display_1"],
    "bitness": 64,
    "totalMemory": 16384,
    "logicalProcessors": 8,
    "physicalProcessors": 4,
    "processorMaxFreq": 3600,
    "battery": false,
    "oemId": "oem_id"
  }
}
```

**Поля запроса:**
- `info` (HardwareInfo, required) - информация о железе

**Успешный ответ (200):**
```json
{
  "id": "hardware_id",
  "publicKey": "base64_encoded_public_key",
  "hardwareInfo": {
    "hwDiskId": "disk_id",
    "baseboardSerialNumber": "board_serial",
    "displayId": ["display_1"],
    "bitness": 64,
    "totalMemory": 16384,
    "logicalProcessors": 8,
    "physicalProcessors": 4,
    "processorMaxFreq": 3600,
    "battery": false,
    "oemId": "oem_id"
  },
  "banned": false
}
```

**Ответ при отсутствии (204):**
```
No Content
```

---

#### POST /hardware/getbyid.php

Получение информации о железе по ID.

**Заголовки:**
```
Authorization: Bearer YOUR_BEARER_TOKEN
Content-Type: application/json
```

**Запрос:**
```json
{
  "id": "hardware_id"
}
```

**Поля запроса:**
- `id` (string, required) - идентификатор железа

**Успешный ответ (200):**
```json
{
  "id": "hardware_id",
  "publicKey": "base64_encoded_public_key",
  "hardwareInfo": {
    "hwDiskId": "disk_id",
    "baseboardSerialNumber": "board_serial",
    "displayId": ["display_1"],
    "bitness": 64,
    "totalMemory": 16384,
    "logicalProcessors": 8,
    "physicalProcessors": 4,
    "processorMaxFreq": 3600,
    "battery": false,
    "oemId": "oem_id"
  },
  "banned": false
}
```

**Ответ при отсутствии (204):**
```
No Content
```

---

#### POST /hardware/create.php

Создание новой записи о железе.

**Заголовки:**
```
Authorization: Bearer YOUR_BEARER_TOKEN
Content-Type: application/json
```

**Запрос:**
```json
{
  "info": {
    "hwDiskId": "disk_id",
    "baseboardSerialNumber": "board_serial",
    "displayId": ["display_1"],
    "bitness": 64,
    "totalMemory": 16384,
    "logicalProcessors": 8,
    "physicalProcessors": 4,
    "processorMaxFreq": 3600,
    "battery": false,
    "oemId": "oem_id"
  },
  "publicKey": "base64_encoded_public_key"
}
```

**Поля запроса:**
- `info` (HardwareInfo, required) - информация о железе
- `publicKey` (string, required) - публичный ключ в base64

**Успешный ответ (200):**
```json
{
  "id": "generated_hardware_id",
  "publicKey": "base64_encoded_public_key",
  "hardwareInfo": {
    "hwDiskId": "disk_id",
    "baseboardSerialNumber": "board_serial",
    "displayId": ["display_1"],
    "bitness": 64,
    "totalMemory": 16384,
    "logicalProcessors": 8,
    "physicalProcessors": 4,
    "processorMaxFreq": 3600,
    "battery": false,
    "oemId": "oem_id"
  },
  "banned": false
}
```

---

#### POST /hardware/connect.php

Связывание пользователя с железом.

**Заголовки:**
```
Authorization: Bearer YOUR_BEARER_TOKEN
Content-Type: application/json
```

**Запрос:**
```json
{
  "hardware": {
    "id": "hardware_id",
    "publicKey": "base64_encoded_public_key",
    "hardwareInfo": {},
    "banned": false
  },
  "sessionID": "user_session_id"
}
```

**Поля запроса:**
- `hardware` (UserHardware, required) - объект железа
- `sessionID` (string, required) - ID сессии пользователя

**Успешный ответ (200):**
```json
{
  "message": "success"
}
```

---

#### POST /hardware/addpublickey.php

Добавление публичного ключа к записи о железе.

**Заголовки:**
```
Authorization: Bearer YOUR_BEARER_TOKEN
Content-Type: application/json
```

**Запрос:**
```json
{
  "hardware": {
    "id": "hardware_id",
    "publicKey": null,
    "hardwareInfo": {},
    "banned": false
  },
  "publicKey": "base64_encoded_new_public_key"
}
```

**Поля запроса:**
- `hardware` (UserHardware, required) - объект железа
- `publicKey` (string, required) - новый публичный ключ в base64

**Успешный ответ (200):**
```json
{
  "message": "success"
}
```

---

#### POST /hardware/getusers.php

Получение списка пользователей, связанных с железом.

**Заголовки:**
```
Authorization: Bearer YOUR_BEARER_TOKEN
Content-Type: application/json
```

**Запрос:**
```json
{
  "hardware": {
    "id": "hardware_id",
    "publicKey": "base64_encoded_public_key",
    "hardwareInfo": {},
    "banned": false
  }
}
```

**Поля запроса:**
- `hardware` (UserHardware, required) - объект железа

**Успешный ответ (200):**
```json
[
  {
    "username": "User1",
    "uuid": "uuid-1",
    "permissions": [],
    "roles": [],
    "assets": {},
    "banned": false
  },
  {
    "username": "User2",
    "uuid": "uuid-2",
    "permissions": [],
    "roles": [],
    "assets": {},
    "banned": false
  }
]
```

---

#### POST /hardware/ban.php

Блокировка железа.

**Заголовки:**
```
Authorization: Bearer YOUR_BEARER_TOKEN
Content-Type: application/json
```

**Запрос:**
```json
{
  "hardware": {
    "id": "hardware_id",
    "publicKey": "base64_encoded_public_key",
    "hardwareInfo": {},
    "banned": false
  }
}
```

**Поля запроса:**
- `hardware` (UserHardware, required) - объект железа для блокировки

**Успешный ответ (200):**
```json
{
  "message": "success"
}
```

---

#### POST /hardware/unban.php

Разблокировка железа.

**Заголовки:**
```
Authorization: Bearer YOUR_BEARER_TOKEN
Content-Type: application/json
```

**Запрос:**
```json
{
  "hardware": {
    "id": "hardware_id",
    "publicKey": "base64_encoded_public_key",
    "hardwareInfo": {},
    "banned": true
  }
}
```

**Поля запроса:**
- `hardware` (UserHardware, required) - объект железа для разблокировки

**Успешный ответ (200):**
```json
{
  "message": "success"
}
```

---

## Важные примечания

### Безопасность

1. **Bearer Token**: Всегда проверяйте `bearerToken` в заголовке `Authorization`. Доступ к API должен иметь только LaunchServer.

2. **HTTPS**: Используйте только HTTPS для всех эндпоинтов в продакшене.

3. **Валидация данных**: Всегда валидируйте входящие данные перед обработкой.

### Сессии

1. **Server ID**: При `joinServer` сохраняйте `serverId` в базу данных для сессии. При `checkServer` проверяйте соответствие username и serverId.

2. **Токены**: 
   - `accessToken` используется для доступа к Minecraft
   - `refreshToken` используется для обновления истёкшего accessToken
   - Рекомендуется генерировать новый refreshToken при каждом обновлении

3. **Время жизни**: Поле `expire` должно содержать количество секунд до истечения токена.

### Hardware (HWID)

1. **Идентификация**: Железо может быть идентифицировано по:
   - Публичному ключу
   - Характеристикам (HardwareInfo)
   - Уникальному ID

2. **Связывание**: Один пользователь может быть связан с несколькими железами, и одно железо может быть связано с несколькими пользователями.

3. **Блокировка**: При блокировке железа все пользователи, связанные с ним, не смогут авторизоваться с этого железа.

### Двухфакторная аутентификация

1. Если у пользователя включена 2FA, верните ошибку `auth.require2fa` при первом запросе авторизации
2. Клиент запросит код у пользователя и отправит повторный запрос с полем `totpCode`
3. Проверьте код TOTP и завершите авторизацию

### Смена пароля и 2FA

При смене пароля или настроек 2FA рекомендуется удалять все активные сессии пользователя для безопасности.

## Пример реализации

Пример PHP реализации доступен в репозитории [HttpMethodExample](https://github.com/GravitLauncher/HttpMethodExample).

Структура примера:
- `MyHttp_module/` - Java модуль для LaunchServer
- `src/` - PHP классы (User, UserSession, Database, etc.)
- `public/` - PHP эндпоинты API
- `config/` - конфигурация подключения к БД

## Ограничения примера

::: warning
Пример реализации является базовым и не включает:
- Регистрацию пользователей
- Смену пароля
- Полную реализацию 2FA
- Управление текстурами (texture loader)
- Выход из аккаунта (logout)
- Полную реализацию HWID в PHP части

Используйте пример как основу для создания собственной реализации.
:::

## Дополнительные ресурсы

- [Основная документация по авторизации](/auth/)
- [Репозиторий HttpMethodExample](https://github.com/GravitLauncher/HttpMethodExample)
- [Репозиторий Launcher](https://github.com/GravitLauncher/Launcher)
