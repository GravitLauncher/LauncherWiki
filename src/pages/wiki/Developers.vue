<template>
  <q-page padding>
    <doc-header name="maven">Подключение зависимостей Gradle</doc-header>
    <p>
      Для написания модулей для лаунчсервера вам нужно подключить следующие
      библиотеки:
    </p>
    <doc-code
      code='
    implementation "pro.gravit.launcher:launcher-core:5.2.3"
    implementation "pro.gravit.launcher:launcher-ws-api:5.2.3"
    implementation "pro.gravit.launcher:launchserver-api:5.2.3"'
    />
    <p>
      Для написания модулей для лаунчера вам нужно подключить следующие
      библиотеки:
    </p>
    <doc-code
      code='
    implementation "pro.gravit.launcher:launcher-core:5.2.3"
    implementation "pro.gravit.launcher:launcher-ws-api:5.2.3"
    implementation "pro.gravit.launcher:launcher-client-api:5.2.3"'
    />
    <doc-header name="modules">Написание модуля</doc-header>
    <p>
      Загрузка модулей происходит из папки modules. Менеджер модулей открывает
      по очереди все jar и смотрит на параметр Module-Main-Class в манифесте JAR
      файла.
    </p>
    <p>
      Главный класс модуля - это класс, наследуемый от
      <b>pro.gravit.launcher.modules.LauncherModule</b> и реализующий метод
      init(LauncherInitContext initContext)
    </p>
    <p>
      Метод init вызывается при инициализации модуля на ранних этапах запуска
      лаунчера или лаунчсервера. Поэтому реализовывать логику внутри метода init
      <b>запрещенно</b>. Внутри метода init разрешается обращаться только к
      методам modulesManager и initContext, при этом при статической загрузке
      модуля initContext = null, а при динамической загрузке модуля через
      команду loadModule он будет содержать инстанс контекста, из которого можно
      получить доступ к LaunchServer
    </p>
    <h4>События(евенты)</h4>
    <p>
      Всё что можно сделать из init - загружать другие модули, получать их
      инстансы и, самое важное, <b>подписаться на события</b>. Это единственный
      правильный способ реализовывать логику. При наступлении события менеджер
      модулей последовательно проходится по всем модулям в порядке приоритета и
      вызывает соответствующие обработчики
    </p>
    <p>Встроеные события находятся в pro.gravit.launcher.modules.event</p>
    <p>
      События лаунчсервера находятся в pro.gravit.launchserver.modules.events.
      Вы должны использовать при работе с лаунчсервером, так как внутри них
      содержится инстанс LaunchServer - главный объект лаунчсервера
    </p>
    <p>
      События лаунчера находятся в pro.gravit.launcher.client.events. Они
      отвечают за основные события, происходящие в клиентской части лаунчера
    </p>
    <p>
      Для подписки на событие вы должны создать метод в вашем классе,
      принимающий 1 аргумент соответствующий типу события, которое вы хотите
      обрабатывать, после чего в методе init вы должны вызвать метод
      registerEvent, первый аргумент которого - ваш метод-обработчик, второй
      аргумент - класс интересующего вас события
    </p>
    <p>
      Обратите внимание при загрузке модуля через loadModule события, которые
      уже прошли не вызываются, вместо этого вам передается initContext
    </p>
    <doc-header name="external">Внешние API</doc-header>
    <p>
      Вы можете использовать некоторые API лаунчера извне в вашем моде
      Minecraft. Вот список пакетов, к которым можно обращатся извне:
    </p>
    <ul>
      <li><b>pro.gravit.utils</b> - утилитные классы и хелперы</li>
      <li>
        <b>pro.gravit.launcher.events</b> - ответы на запросы к лаунчсерверу и
        отдельные события
      </li>
      <li><b>pro.gravit.launcher.request</b> - запросы к лаунчсерверу</li>
      <li>
        <b>pro.gravit.launcher.api</b> - Информация о текущем пользователе и
        профиле
      </li>
    </ul>
    <doc-header name="auth">Написание AuthCoreProvider</doc-header>
    <p>
      Для интеграции собственных CMS и сайтов с лаунчером рекомендуется написать свой AuthCoreProvider. Для этого
      Создайте класс наследник AuthCoreProvider и реализуйте обязательные методы <router-link to="/developers#oauth">oauth</router-link> после чего
      реализуйте необходимые вам расширения:
    </p>
    <p>
      Расширения класса AuthCoreProvider
    </p>
    <ul>
      <li><b>AuthSupportExit</b> - вы поддерживаете методы завершения сессии пользователя</li>
      <li><b>AuthSupportGetAllUsers</b> - вы поддерживаете метод получения всех пользователей</li>
      <li><b>AuthSupportGetSessionsFromUser</b> - вы поддерживаете получение списка сессий пользователя</li>
      <li><b>AuthSupportHardware</b> - вы поддерживаете работу с HWID <q-badge>важно</q-badge></li>
      <li><b>AuthSupportRegistration</b> - вы поддерживаете регистрацию пользователей</li>
      <li><b>AuthSupportUserBan</b> - вы поддерживаете методы ban и unban</li>
    </ul>
    <p>
      Расширения класса User
    </p>
    <ul>
      <li><b>UserSupportTextures</b> - ваш объект User хранит и предоставляет информацию о скинах и плащах.
      Вы должны вернуть соответствующие текстуры с метаданными при их наличии. При использовании этих методов TextureProvider больше не требуется</li>
      <li><b>UserSupportHardware</b> - ваш объект User хранит информацию о железе пользователя</li>
      <li><b>UserSupportBanInfo</b> - ваш объект User хранит информацию о банах пользователя</li>
      <li><b>UserSupportAdditionalData</b> - ваш объект User поддерживает кастомные параметры(такие как email, монеты и т.д.)</li>
    </ul>
    <doc-header name="oauth">Реализация OAuth</doc-header>
    <p>
      OAuth в лаунчере позволяет использовать временные токены доступа(access) вместо устаревшей системы сессий. Этот метод отлично подойдет для
      интеграции собственных CMS с лаунчером
    </p>
    <p>
      Для работы с OAuth вам необходимо реализовать соответствующие методы
      <codes>getUserSessionByOAuthAccessToken</codes>,
      <codes>refreshAccessToken</codes>, а в методе
      <codes>authorize</codes> вернуть результат с данными OAuth
    </p>
    <h4>Порядок авторизации с OAuth</h4>
    <ul>
      <li>
        Первым шагом вызывается <codes>verifyAuth</codes>. В этом методе вы
        должны проверить допустима ли авторизация для этого соеденения и бросить
        исключение <codes>AuthException</codes> если это не так. 
      </li>
      <li>
        Вторым шагом выполняется авторизация с помощью метода
        <codes>authorize</codes>. Вы должны:<ul>
          <li>Проверить, аргументы login и password на null и тип</li>
          <li>Если context равен null то это означает, что вам не требуется проверять пароль(если это возможно).
            Это позволяет администратору с помощью команды 'sendAuth' авторизировать пользователя без пароля. Вы вправе не поддерживать данный режим работы и всегда требовать пароль</li>
          <li>Создайте объект UserSession, содержащий информацию о пользователе, а так же токены accessToken и refreshToken при необходимости</li>
        </ul>
      </li>
      <li>Авторизация завершена</li>
    </ul>
    <p>
      При необходимости пользователю обновить свой истекший accessToken будет
      вызван метод <codes>refreshAccessToken</codes>. В нем вы должны обновить
      accessToken <b>и refreshToken(если это возможно)</b> и вернуть их
      пользователю. Выставление параметра <codes>expire</codes> в 0 делает токен
      вечным
    </p>
    <p>
      При повторной авторизации вызывается метод
      <codes>getUserSessionByOAuthAccessToken</codes>, который должен вернуть
      объект UserSession с находящимся внутри объектом User. Метод
      <codes>getId</codes> должен возвращать ID сессии если это возможно. Если в
      вашей системе сессий нет ID - то он должен генерироватся при создании
      объекта UserSession.
    </p>
    <h4>Написание скрипта авторизации</h4>
    <p>
      Настройте тип авторизации 'http'. Примеры:
    </p>
    <ul>
      <li>
        OAuth без checkServer/joinServer:
        <doc-code code='
          {
            "getUserByUsernameUrl": "https://example.com/user/name/%username%",
            "getUserByUUIDUrl": "https://example.com/user/uuid/%uuid%",
            "getUserByTokenUrl": "https://example.com/auth/current",
            "refreshTokenUrl": "https://example.com/auth/refresh",
            "authorizeUrl": "https://example.com/auth/authorize",
            "updateServerIdUrl": "https://example.com/auth/updateServerId",
            "bearerToken": "TOKEN",
            "type": "http"
          }' />
      </li>
      <li>
        OAuth c checkServer/joinServer:
        <doc-code code='
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
          }' />
      </li>
      <li>
        OAuth c checkServer/joinServer, login и details:
        <doc-code code='
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
          }' />
      </li>
    </ul>
    <p>
      Запросы  getUserByUsernameUrl,getUserByLoginUrl,getUserByUUIDUrl,getUserByTokenUrl,getAuthDetailsUrl используют метод GET, все остальные - POST.
      При успешном выполнении вы должны вернуть код 200 и ответ в виде JSON. При отсутствии пользователя вы должны вернуть код 404
    </p>
    <p>Ответы:</p>
    <ul>
    <li>Методы getUserByUsernameUrl,getUserByLoginUrl,getUserByUUIDUrl,checkServerUrl ожидают ответ типа HttpUser:
      <doc-code code='
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
      }' />
    </li>
    <li>Метод getUserByTokenUrl ожидает ответ типа HttpUserSession: <doc-code code='
    {
      "id": "RANDOM ID",
      "user": (( HttpUser )),
      "expireIn": 0
    }' /></li>
    <li>Методы authorizeUrl,refreshTokenUrl ожидают ответ типа AuthReport: <doc-code code='
    {
      "minecraftAccessToken": "MINECRAFT ACCESS TOKEN",
      "oauthAccessToken": "ACCESS TOKEN",
      "oauthRefreshToken": "REFRESH TOKEN",
      "oauthExpire": 0,
      "session": (( HttpUserSession ))
    }' /></li>
    <li>
      Метод getAuthDetailsUrl ожидает ответ: <doc-code code='
      {
        "details": [
        {
          "type": "password"
        },
        {
          "type": "totp"
        }
        ]
      }' />
    </li>
    <li>Методы joinServerUrl,updateServerIdUrl ожидают ответ 200 в случае успеха</li>
    </ul>
    <p>Запросы:</p>
    <ul>
      <li>authorizeUrl: <doc-code code='
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
      }' /></li>
      <li>refreshTokenUrl: <doc-code code='
      {
        "refreshToken": "REFRESH TOKEN",
        "context": {
          "ip": "127.0.0.1"
        }
      }' /></li>
      <li>joinServerUrl: <doc-code code='
      {
        "username": "Gravita",
        "accessToken": "MINECRAFT ACCESS TOKEN",
        "serverId": "SERVER ID",
      }' /></li>
      <li>checkServerUrl: <doc-code code='
      {
        "username": "Gravita",
        "serverId": "SERVER ID",
      }' /></li>
      <li>updateServerIdUrl: <doc-code code='
      {
        "username": "Gravita",
        "serverId": "SERVER ID",
      }' /></li>
    </ul>
  </q-page>
</template>

<script>
import DocCode from "src/components/DocCode.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { DocCode },
  name: "PageDefault",
  data: function () {
    return {};
  },
});
</script>
