<template>
  <div class="wiki">
    <h2>Методы WebSocket API</h2>
    <div v-if="false"><h3>Метод <code>auth</code> <linki link="auth2"></linki></h3>
    <p>Этот метод предлязначен для </p>
    <p>Пример запроса:</p>
    <pre v-highlightjs><code class="json">

    </code></pre>
    <p>Пример ответа:</p>
    <pre v-highlightjs><code class="json">

    </code></pre></div>
    <div><h3>Метод <code>getAvailabilityAuth</code> <linki link="getAvailabilityAuth"></linki></h3>
    <p>Этот метод предлязначен для получения информации о доступных способах авторизации</p>
    <p>Пример запроса:</p>
    <pre v-highlightjs><code class="json">
{
  "type": "getAvailabilityAuth"
}
    </code></pre>
    <p>Пример ответа:</p>
    <pre v-highlightjs><code class="json">
{
  "list": [
    {
      "name": "std",
      "displayName": "Default",
      "details": [
        {
          "type": "password"
        }
      ]
    }
  ],
  "features": 1,
  "type": "getAvailabilityAuth"
}
    </code></pre></div>
    <div><h3>Метод <code>auth</code> <linki link="auth"></linki></h3>
    <p>Этот метод предлязначен для авторизации и получения сессии</p>
    <p>Пример запроса:</p>
    <pre v-highlightjs><code class="json">
{
  "login": "Gravita",
  "password": {
    "password": "m0PlEAXQpLIfPxtNt5Sz1A==",
    "type": "rsa"
  },
  "auth_id": "std",
  "getSession": true,
  "authType": "API",
  "type": "auth"
}
    </code></pre>
<ol>
  <li><codes>rsa</codes> - устаревший способ передачи пароля с шифром <b>AES</b></li>
  <li><codes>aes</codes> - актуальный способ передачи пароля с шифром <b>AES</b></li>
  <li><codes>rsa2</codes> - передача пароля с шифрованием <b>RSA</b>
  <pre v-highlightjs><code class="json">
"password": {
  "password": "RU5DUllQVEVEIFdJVEggUlNBIFBBU1NXT1JEIDopIA==",
  "type": "rsa2"
},
    </code></pre></li>
  <li><codes>plain</codes> - передача пароля <b>в открытом виде</b>
  <pre v-highlightjs><code class="json">
"password": {
  "password": "12345",
  "type": "plain"
},
    </code></pre></li>
    <li><codes>2fa</codes> - передача двух видов пароля вместо одного
  <pre v-highlightjs><code class="json">
"password": {
  "firstPassword": {
    "password": "m0PlEAXQpLIfPxtNt5Sz1A==",
    "type": "rsa"
  },
  "secondPassword": {
    "totp": "769812",
    "type": "totp"
  },
  "type": "2fa"
},
    </code></pre></li>

</ol>
<p>Передача пароля открытым текстом:</p>

    <p>Пример ответа:</p>
    <pre v-highlightjs><code class="json">
{
  "permissions": {
    "permissions": 1,
    "flags": 0
  },
  "playerProfile": {
    "uuid": "f82eae2a-57cb-4a38-ba30-db4244c5c5b7",
    "username": "Gravita",
    "skin": {
      "url": "http://example.com/skins/Gravita.png",
      "digest": "_LolcAI9j0aD72vDOsoympt9MHNNP5GCVfZaMwKg55I="
    }
  },
  "oauth": {
    "accessToken": "ACCESS_TOKEN",
    "refreshToken": "REFRESH_TOKEN",
    "expire": 0
  },
  "accessToken": "ea40b19dfc65269492b3527e20e76493",
  "session": "06abb5de-b8f7-43f3-b344-2738f0bcf635",
  "type": "auth"
}
    </code></pre></div>
    <p>Поля <codes>oauth</codes> и <codes>session</codes> не могут быть заполнены одновременно</p>
    <div><h3>Метод <code>profiles</code> <linki link="profiles"></linki></h3>
    <p>Этот метод предлязначен для получения списка профилей</p>
    <p>Пример запроса:</p>
    <pre v-highlightjs><code class="json">
{
  "type": "profiles"
}
    </code></pre>
    <p>Пример ответа:</p>
    <pre v-highlightjs><code class="json">
{
  "profiles": [

  ],
  "type": "profiles"
}
    </code></pre></div>
    <div><h3>Метод <code>pingServer</code> <linki link="pingServer"></linki></h3>
    <p>Этот метод предлязначен для просмотра онлайна серверов, использующих плагин интеграции для паередачи информации об онлайне</p>
    <p>Пример запроса:</p>
    <pre v-highlightjs><code class="json">
{
  "serverNames": [],
  "type": "pingServer"
}
    </code></pre>
    <p>Пример ответа:</p>
    <pre v-highlightjs><code class="json">
{
  "serverMap": {
    "HiTech": {
      "name": "HiTech",
      "maxPlayers": 100,
      "playersOnline": 1,
      "tps": 20,
      "users": [
        {
          "username": "Gravita"
        }
      ]
    }
  },
  "type": "pingServer"
}
    </code></pre></div>
    <div><h3>Метод <code>exit</code> <linki link="exit"></linki></h3>
    <p>Этот метод предлязначен для завершения сессии пользователя</p>
    <p>Пример запроса:</p>
    <pre v-highlightjs><code class="json">
{
  "exitAll": true,
  "username": "Gravita",
  "type": "exit"
}
    </code></pre>
    <ol>
      <li>Если exitAll false и username не указан - <b>будет произведен выход из текущей сессии</b></li>
      <li>Если exitAll true и username не указан - <b>будет произведен выход из всех сессий текущего пользователя</b></li>
      <li>Если username указан - <b>пользователь под ником username будет кикнут со всех сессий (требуются права админа)</b></li>
    </ol>
    <p>Пример ответа:</p>
    <pre v-highlightjs><code class="json">
{
  "reason": "CLIENT",
  "type": "exit"
}
    </code></pre>
    <ul>
      <li><codes>CLIENT</codes> - выход был произведен по инициативе запросившего</li>
      <li><codes>SERVER</codes> - выход был произведен по инициативе сервера или администратора</li>
      <li><codes>NO_EXIT</codes> - выход не требуется</li>
    </ul></div>
    <div><h3>Метод <code>currentUser</code> <linki link="currentUser"></linki></h3>
    <p>Этот метод предлязначен для получения информации о текущем пользователе</p>
    <p>Пример запроса:</p>
    <pre v-highlightjs><code class="json">
{
  "type": "currentUser"
}
    </code></pre>
    <p>Пример ответа:</p>
    <pre v-highlightjs><code class="json">
{
  "userInfo": {
    "permissions": {
      "permissions": 0,
      "flags": 0
    },
    "accessToken": "ea40b19dfc65269492b3527e20e76493",
    "playerProfile": {
      "uuid": "f82eae2a-57cb-4a38-ba30-db4244c5c5b7",
      "username": "Gravita",
      "skin": {
        "url": "http://example.com/skins/Gravita.png",
        "digest": "_LolcAI9j0aD72vDOsoympt9MHNNP5GCVfZaMwKg55I="
      }
    }
  },
  "type": "currentUser"
}
    </code></pre></div>
    <div><h3>Метод <code>restoreSession</code> <linki link="restoreSession"></linki></h3>
    <p>Этот метод предлязначен для восстановления простой сессии</p>
    <p>Пример запроса:</p>
    <pre v-highlightjs><code class="json">
{
  "needUserInfo": true,
  "session": "06abb5de-b8f7-43f3-b344-2738f0bcf635",
  "type": "restoreSession"
}
    </code></pre>
    <p>Пример ответа:</p>
    <pre v-highlightjs><code class="json">
{
  "userInfo": {
    "permissions": {
      "permissions": 0,
      "flags": 0
    },
    "accessToken": "ea40b19dfc65269492b3527e20e76493",
    "playerProfile": {
      "uuid": "f82eae2a-57cb-4a38-ba30-db4244c5c5b7",
      "username": "Gravita",
      "skin": {
        "url": "http://example.com/skins/Gravita.png",
        "digest": "_LolcAI9j0aD72vDOsoympt9MHNNP5GCVfZaMwKg55I="
      }
    }
  },
  "type": "restoreSession"
}
    </code></pre></div>
    <div v-if="version >= 50200"><h3>Метод <code>restore</code> <linki link="restore"></linki></h3>
    <p>Этот метод предлязначен для восстановления OAuth сессии</p>
    <p>Пример запроса:</p>
    <pre v-highlightjs><code class="json">
{
  "accessToken": "ACCESS_TOKEN",
  "authId": "AUTH_ID"
  "needUserInfo": true,
  "extended": {
    "TOKEN_NAME": "EXTENDED_TOKEN"
  },
  "type": "restore"
}
    </code></pre>
    <p>Поле <codes>extended</codes> предлязначено для дополнительных токенов, "расширяющих" ваши права. К таким токенам относится, например: токен лаунчера, токен результата проверки HWID и т.д. При их отсутствии можно оставить поле пустым</p>
    <p>Пример ответа:</p>
    <pre v-highlightjs><code class="json">
{
  "userInfo": {
    "userInfo": {
    "permissions": {
      "permissions": 0,
      "flags": 0
    },
    "accessToken": "ea40b19dfc65269492b3527e20e76493",
    "playerProfile": {
      "uuid": "f82eae2a-57cb-4a38-ba30-db4244c5c5b7",
      "username": "Gravita",
      "skin": {
        "url": "http://example.com/skins/Gravita.png",
        "digest": "_LolcAI9j0aD72vDOsoympt9MHNNP5GCVfZaMwKg55I="
      }
    }
  },
  "invalidTokens": ["TOKEN_NAME"]
  },
  "type": "restore"
}
    </code></pre>
    <p>Поле <codes>invalidTokens</codes> содержит отмененные(невалидные, истекшие) extended токены. Если это возможно рекомендуется повторить запрос, предоставив валидные токены. Поле <codes>accessToken</codes> можно оставить пустым если оно вам не нужно</p></div>
    <div v-if="version >= 50200"><h3>Метод <code>refreshToken</code> <linki link="refreshToken"></linki></h3>
    <p>Этот метод предлязначен для обновления истекшего accessToken при использовании OAuth</p>
    <p>Пример запроса:</p>
    <pre v-highlightjs><code class="json">
{
  "refreshToken": "TOKEN",
  "authId": "AUTH_ID",
  "type": "refreshToken"
}
    </code></pre>
    <p>Пример ответа:</p>
    <pre v-highlightjs><code class="json">
{
  "oauth": {
    "accessToken": "ACCESS_TOKEN",
    "refreshToken": "REFRESH_TOKEN",
    "expire": 0
  },
  "type": "refreshToken"
}
    </code></pre></div>
  </div>
</template>
<script>
import coremethods from '@/components/core-methods.js'
import codes from '../../components/codes.vue'
export default {
  components: { codes },
  mixins: [coremethods],
  created: function () {}
}
</script>
