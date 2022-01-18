# Разработчикам

## Подключение зависимостей Gradle

Для написания модулей для лаунчсервера вам нужно подключить следующие библиотеки:

```
implementation "pro.gravit.launcher:launcher-core:5.2.3"
implementation "pro.gravit.launcher:launcher-ws-api:5.2.3"
implementation "pro.gravit.launcher:launchserver-api:5.2.3"
```

Для написания модулей для лаунчера вам нужно подключить следующие библиотеки:

```
implementation "pro.gravit.launcher:launcher-core:5.2.3"
implementation "pro.gravit.launcher:launcher-ws-api:5.2.3"
implementation "pro.gravit.launcher:launcher-client-api:5.2.3"
```

## Написание модуля

Загрузка модулей происходит из папки modules. Менеджер модулей открывает по очереди все jar и смотрит на параметр Module-Main-Class в манифесте JAR файла.

Главный класс модуля - это класс, наследуемый от  **pro.gravit.launcher.modules.LauncherModule**  и реализующий метод init(LauncherInitContext initContext)

Метод init вызывается при инициализации модуля на ранних этапах запуска лаунчера или лаунчсервера. Поэтому реализовывать логику внутри метода init  **запрещенно**. Внутри метода init разрешается обращаться только к методам modulesManager и initContext, при этом при статической загрузке модуля initContext = null, а при динамической загрузке модуля через команду loadModule он будет содержать инстанс контекста, из которого можно получить доступ к LaunchServer

## События(евенты)

Всё что можно сделать из init - загружать другие модули, получать их инстансы и, самое важное,  **подписаться на события**. Это единственный правильный способ реализовывать логику. При наступлении события менеджер модулей последовательно проходится по всем модулям в порядке приоритета и вызывает соответствующие обработчики

Встроеные события находятся в pro.gravit.launcher.modules.event

События лаунчсервера находятся в pro.gravit.launchserver.modules.events. Вы должны использовать при работе с лаунчсервером, так как внутри них содержится инстанс LaunchServer - главный объект лаунчсервера

События лаунчера находятся в pro.gravit.launcher.client.events. Они отвечают за основные события, происходящие в клиентской части лаунчера

Для подписки на событие вы должны создать метод в вашем классе, принимающий 1 аргумент соответствующий типу события, которое вы хотите обрабатывать, после чего в методе init вы должны вызвать метод registerEvent, первый аргумент которого - ваш метод-обработчик, второй аргумент - класс интересующего вас события

Обратите внимание при загрузке модуля через loadModule события, которые уже прошли не вызываются, вместо этого вам передается initContext

## Внешние API

Вы можете использовать некоторые API лаунчера извне в вашем моде Minecraft. Вот список пакетов, к которым можно обращатся извне:

-   **pro.gravit.utils**  - утилитные классы и хелперы
-   **pro.gravit.launcher.events**  - ответы на запросы к лаунчсерверу и отдельные события
-   **pro.gravit.launcher.request**  - запросы к лаунчсерверу
-   **pro.gravit.launcher.api**  - Информация о текущем пользователе и профиле

## Написание AuthCoreProvider

Для интеграции собственных CMS и сайтов с лаунчером рекомендуется написать свой AuthCoreProvider. Для этого Создайте класс наследник AuthCoreProvider и реализуйте обязательные методы  [oauth](../dev/#реализация-oauth)  после чего реализуйте необходимые вам расширения:

Расширения класса AuthCoreProvider

-   **AuthSupportExit**  - вы поддерживаете методы завершения сессии пользователя
-   **AuthSupportGetAllUsers**  - вы поддерживаете метод получения всех пользователей
-   **AuthSupportGetSessionsFromUser**  - вы поддерживаете получение списка сессий пользователя
-   **AuthSupportHardware**  - вы поддерживаете работу с HWID ```важно```

-   **AuthSupportRegistration**  - вы поддерживаете регистрацию пользователей
-   **AuthSupportUserBan**  - вы поддерживаете методы ban и unban

Расширения класса User

-   **UserSupportTextures**  - ваш объект User хранит и предоставляет информацию о скинах и плащах. Вы должны вернуть соответствующие текстуры с метаданными при их наличии. При использовании этих методов TextureProvider больше не требуется
-   **UserSupportHardware**  - ваш объект User хранит информацию о железе пользователя
-   **UserSupportBanInfo**  - ваш объект User хранит информацию о банах пользователя
-   **UserSupportAdditionalData**  - ваш объект User поддерживает кастомные параметры(такие как email, монеты и т.д.)

## Реализация OAuth

OAuth в лаунчере позволяет использовать временные токены доступа(access) вместо устаревшей системы сессий. Этот метод отлично подойдет для интеграции собственных CMS с лаунчером

Для работы с OAuth вам необходимо реализовать соответствующие методы  getUserSessionByOAuthAccessToken,  refreshAccessToken, а в методе  authorize  вернуть результат с данными OAuth

## Порядок авторизации с OAuth

-   Первым шагом вызывается  verifyAuth. В этом методе вы должны проверить допустима ли авторизация для этого соеденения и бросить исключение  AuthException  если это не так.
-   Вторым шагом выполняется авторизация с помощью метода  authorize. Вы должны:
    -   Проверить, аргументы login и password на null и тип
    -   Если context равен null то это означает, что вам не требуется проверять пароль(если это возможно). Это позволяет администратору с помощью команды 'sendAuth' авторизировать пользователя без пароля. Вы вправе не поддерживать данный режим работы и всегда требовать пароль
    -   Создайте объект UserSession, содержащий информацию о пользователе, а так же токены accessToken и refreshToken при необходимости
-   Авторизация завершена

При необходимости пользователю обновить свой истекший accessToken будет вызван метод  refreshAccessToken. В нем вы должны обновить accessToken  **и refreshToken(если это возможно)**  и вернуть их пользователю. Выставление параметра  expire  в 0 делает токен вечным

При повторной авторизации вызывается метод  getUserSessionByOAuthAccessToken, который должен вернуть объект UserSession с находящимся внутри объектом User. Метод  getId  должен возвращать ID сессии если это возможно. Если в вашей системе сессий нет ID - то он должен генерироватся при создании объекта UserSession.

## Написание скрипта авторизации

Настройте тип авторизации `http`

Примеры:

-   OAuth без checkServer/joinServer:

```json
          {
            "getUserByUsernameUrl": "https://example.com/user/name/%username%",
            "getUserByUUIDUrl": "https://example.com/user/uuid/%uuid%",
            "getUserByTokenUrl": "https://example.com/auth/current",
            "refreshTokenUrl": "https://example.com/auth/refresh",
            "authorizeUrl": "https://example.com/auth/authorize",
            "updateServerIdUrl": "https://example.com/auth/updateServerId",
            "bearerToken": "TOKEN",
            "type": "http"
          }
```

-  OAuth c checkServer/joinServer:

```json
          {
            "getUserByUsernameUrl": "https://example.com/user/name/%username%",
            "getUserByUUIDUrl": "https://example.com/user/uuid/%uuid%",
            "getUserByTokenUrl": "https://example.com/auth/current",
            "refreshTokenUrl": "https://example.com/auth/refresh",
            "authorizeUrl": "https://example.com/auth/authorize",
            "joinServerUrl": "https://example.com/auth/joinServer",
            "checkServerUrl": "https://example.com/auth/checkServer",
            "bearerToken": "TOKEN",
            "type": "http"
          }
```

-  OAuth c checkServer/joinServer, login и details:

```json
          {
            "getUserByUsernameUrl": "https://example.com/user/name/%username%",
            "getUserByLoginUrl": "https://example.com/user/login/%login%",
            "getUserByUUIDUrl": "https://example.com/user/uuid/%uuid%",
            "getUserByTokenUrl": "https://example.com/auth/current",
            "getAuthDetailsUrl": "https://example.com/auth/details",
            "refreshTokenUrl": "https://example.com/auth/refresh",
            "authorizeUrl": "https://example.com/auth/authorize",
            "joinServerUrl": "https://example.com/auth/joinServer",
            "checkServerUrl": "https://example.com/auth/checkServer",
            "bearerToken": "TOKEN",
            "type": "http"
          }
```

Запросы:

`getUserByUsernameUrl`, `getUserByLoginUrl`, `getUserByUUIDUrl`, `getUserByTokenUrl`,
`getAuthDetailsUrl` используют метод GET, все остальные - POST. При успешном выполнении вы должны вернуть код 200 и ответ в виде JSON.
При отсутствии пользователя вы должны вернуть код 404

Ответы:

-  Методы `getUserByUsernameUrl`, `getUserByLoginUrl`, `getUserByUUIDUrl`, `checkServerUrl` ожидают ответ типа HttpUser:

```json
      {
        "username": "Gravita",
        "uuid": "UUID",
        "permissions": {
          "perms": ["launchserver.*", "launcher.*"],
          "roles": ["ADMIN"]
        },
        "skin": {
          "url": "http://example.com/skins/Gravita.png",
          "digest": "",
          "metadata": {
            "model": "slim"
          }
        },
        "cloak": {
          "url": "http://example.com/cloaks/Gravita.png",
          "digest": ""
        }
      }
```

-  Метод getUserByTokenUrl ожидает ответ типа HttpUserSession:

```json
    {
      "id": "RANDOM ID",
      "user": (( HttpUser )),
      "expireIn": 0
    }
```

-  Методы authorizeUrl,refreshTokenUrl ожидают ответ типа AuthReport:

```json
    {
      "minecraftAccessToken": "MINECRAFT ACCESS TOKEN",
      "oauthAccessToken": "ACCESS TOKEN",
      "oauthRefreshToken": "REFRESH TOKEN",
      "oauthExpire": 0,
      "session": (( HttpUserSession ))
    }
```

-  Метод getAuthDetailsUrl ожидает ответ:

```json

      {
        "details": [
        {
          "type": "password"
        },
        {
          "type": "totp"
        }
        ]
      }
```

-  Методы joinServerUrl,updateServerIdUrl ожидают ответ 200 в случае успеха
Запросы:

-  authorizeUrl:

```json
      {
        "login": "Gravita",
        "context": {
          "ip": "127.0.0.1"
        },
        "password": {
          "password": "qwerty",
          "type": "plain"
        },
        "minecraftAccess": true
      }
```

-  refreshTokenUrl:

```json
      {
        "refreshToken": "REFRESH TOKEN",
        "context": {
          "ip": "127.0.0.1"
        }
      }
```
-  joinServerUrl:

```json
      {
        "username": "Gravita",
        "accessToken": "MINECRAFT ACCESS TOKEN",
        "serverId": "SERVER ID",
      }
```

-  checkServerUrl:

```json
      {
        "username": "Gravita",
        "serverId": "SERVER ID",
      }
```

-  updateServerIdUrl:

```json
      {
        "username": "Gravita",
        "serverId": "SERVER ID",
      }
```
