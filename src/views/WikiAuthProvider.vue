<template>
  <div class="wiki">
    <h2>Настройка AuthProvider</h2>
    <h3>
      Способ accept
      <gtag type="easy">Только для ознакомления</gtag>
    </h3>
    <p>Принимает любые пары логин-пароль</p>
    <pre v-highlightjs><code class="json">
    "auth": [
      {
        "provider": {
          "type": "accept"
        }
      }
    ]
    </code></pre>
    <h3>
      Способ reject
      <gtag type="easy">Это просто</gtag>
    </h3>
    <p>Отклоняет любые пары логин-пароль</p>
    <pre v-highlightjs><code class="json">
    "auth": [
      {
        "provider": {
          "type": "reject",
          "message": "Ведутся технические работы, приходите позже" // cообщение при авторизации
        }
      }
    ]
    </code></pre>
    <h3>
      Способ mysql
      <gtag type="easy">Это просто</gtag>
    </h3>
    <p>
      Для проверки логина и пароля лаунчсервер обращается к базе данных mysql<br />
      <b
        >Этот способ НЕ подходит для сайтов с нестандартными алгоритмами
        хеширования</b
      >
    </p>
    <p>
      <b
        >В базе данных создайте поле permissions типа TINYINT(значение по
        умолчанию 0)</b
      >
    </p>
    <pre v-highlightjs><code class="json">
    "auth": [
      {
        "provider": {
          "type": "mysql",
          "mySQLHolder": {
            "address": "localhost",               // адрес mysql сервера
            "port": 3306,                         // порт mysql сервера
            "username": "launchserver",           // имя пользователя
            "password": "password",               // пароль пользователя
            "database": "db",                     // база данных, при проблемах с timezone используйте "database": "db?serverTimezone=UTC"
            "timezone": "UTC",                    // установка клиентской таймзоны
            "useHikari": true                     // использовать ли HikariCP
          },
          "query": "SELECT login, permissions FROM users WHERE login=? AND password=MD5(?) LIMIT 1", // sql запрос
          "queryParams": [ "%login%", "%password%" ],                                               // параметры sql запроса
          "usePermission": true,
          "flagsEnabled": false,
          "message": "Пароль неверный!"                                                             // сообщение при неверном пароле
        }
      }
    ]
    </code></pre>
    <h3>
      Способ postgresql
      <gtag type="medium">Средний уровень</gtag>
    </h3>
    <p>
      Для проверки логина и пароля лаунчсервер обращается к базе данных
      postgresql<br />
      <b
        >Этот способ НЕ подходит для сайтов с нестандартными алгоритмами
        хеширования</b
      >
    </p>
    <p>
      <b
        >В базе данных создайте поле permissions типа TINYINT(значение по
        умолчанию 0)</b
      >
    </p>
    <pre v-highlightjs><code class="json">
    "auth": [
      {
        "provider": {
          "type": "postgresql",
          "postgreSQLHolder": {
            "address": "localhost",               // адрес postgresql сервера
            "port": 3306,                         // порт postgresql сервера
            "username": "launchserver",           // имя пользователя
            "password": "password",               // пароль пользователя
            "database": "db",                     // база данных, при проблемах с timezone используйте "database": "db?serverTimezone=UTC"
            "timezone": "UTC",                    // установка клиентской таймзоны
            "useHikari": true                     // использовать ли HikariCP
          },
          "query": "SELECT login, permissions FROM users WHERE login=? AND password=MD5(?) LIMIT 1", // sql запрос
          "queryParams": [ "%login%", "%password%" ],                                               // параметры sql запроса
          "usePermission": true,
          "flagsEnabled": false,
          "message": "Пароль неверный!"                                                             // сообщение при неверном пароле
        }
      }
    ]
    </code></pre>
    <h3>
      Способ request
      <gtag type="easy">Это просто</gtag>
    </h3>
    <p>
      Для проверки логина и пароля лаунчсервер обращается к сайту по протоколу
      HTTP/HTTPS
    </p>
    <p>
      Ответ сервера должен выглядеть так: OK:Gravit:0, где Gravit - ваш никнейм,
      0 - маска permissions
    </p>
    <pre v-highlightjs><code class="json">
    "auth": [
      {
        "provider": {
          "type": "request",
          "usePermission": true, //Если ваш скрипт передает permission
          "flagsEnabled": false, //Если ваш скрипт не передает flags
          "url": "http://gravit.pro/auth.php?username=%login%&password=%password%&ip=%ip%",
          "response": "OK:(?&lt;username&gt;.+):(?&lt;permissions&gt;.+)"
        }
      }
    ]
    </code></pre>
    <p v-if="version > 50109">
      Некоторые скрипты авторизации не поддерживают передачу permissions и их
      ответ выглядит как OK:Gravit, где Gravit - ваш никнейм<br />
      Вы можете использовать конфигурацию ниже на версиях до 5.1.0, однако
      <b
        >рекомендуется найти/написать/подправить скрипт, что бы он передавал
        permissions</b
      >
      <br/>
    <pre v-highlightjs><code class="json">
    "auth": [
      {
        "provider": {
          "type": "request",
          "url": "http://gravit.pro/auth.php?username=%login%&password=%password%&ip=%ip%", // ссылка до скрипта проверки логина-пароля
          "usePermission": false, //Если ваш скрипт не передает permission
          "flagsEnabled": false, //Если ваш скрипт не передает flag
          "response": "OK:(?&lt;username&gt;.+)" // маска ответа, если не соответствует, будет выведено сообщение с возвращенным текстом
        }
      }
    ]
    </code></pre>
    </p>
    <h3>
      Способ json
      <gtag type="medium">Средний уровень</gtag>
    </h3>
    <p>
      Для проверки логина и пароля лаунчсервер обращается к сайту по протоколу
      HTTP/HTTPS, но в отличии от request делает POST запрос с json данными
      внутри
    </p>
    <pre v-highlightjs><code class="json">
    "auth": [
      {
        "provider": {
          "type": "json",
          "url": "http://gravit.pro/auth.php", // ссылка до скрипта проверки логина-пароля
          "apiKey": "none"                     // секретный ключ, который может проверятся в скрипте, для безопасности
        }
      }
    ]
    </code></pre>
    <p>Запрос:</p>
    <pre v-highlightjs><code class="json">
    {
      "username": "admin",
      "password": "password",
      "ip": "127.0.0.1",
      "apiKey": "none"
    }
    </code></pre>
    <p>Ответ:</p>
    <pre v-highlightjs><code class="json">
    {
      "username": "admin",
      "permissions": 0
    }
    </code></pre>
    <p>Ошибка:</p>
    <pre v-highlightjs><code class="json">
    {
      "error": "Неверный логин или пароль"
    }
    </code></pre>
    <h2>
      Permissions и Flags. Маска
      <gtag type="medium">Средний уровень</gtag>
    </h2>
    <p>
      Маска permissions представляет собой обычное 64-битное число(long в
      Java/BIGINT в mySQL), каждый бит которого отвечает за определенную
      привилегию.<br />
      Что бы получить право ADMIN+SERVER вы должны сложить(выполнить побитовое
      ИЛИ если точнее, в простых случаях эквивалентно сложению) числа,
      соответствующие правам ADMIN и SERVER
    </p>
    <ul>
      <li>Ничего - 0</li>
      <li>ADMIN - 2<sup>0</sup></li>
      <li>MANAGEMENT - 2<sup>1</sup></li>
      <li>С 2<sup>2</sup> по 2<sup>32</sup> - зарезервировано</li>
      <li>С 2<sup>33</sup> по 2<sup>51</sup> - пользовательские permissions</li>
      <li>С 2<sup>52</sup> по 2<sup>63</sup> - зарезервировано</li>
    </ul>
    <p>Флаги - способ сообщить особенности аккаунта пользователя, которые могут учитыватся модулями для своих целей</p>
    <ul>
      <li>Ничего - 0</li>
      <li>SYSTEM - 2<sup>0</sup></li>
      <li>BANNED - 2<sup>1</sup></li>
      <li>UNTRUSTED - 2<sup>2</sup></li>
      <li>HIDDEN - 2<sup>3</sup></li>
      <li>С 2<sup>4</sup> по 2<sup>32</sup> - зарезервировано</li>
      <li>С 2<sup>33</sup> по 2<sup>51</sup> - пользовательские flags</li>
      <li>С 2<sup>52</sup> по 2<sup>63</sup> - зарезервировано</li>
    </ul>
    <p>
      Проверка в лаунчере выполняется путем выполнения побитового И, например
      если для опционального мода требуется право 3(ADMIN+MANAGEMENT) то
      подойдут 3, 7, 11, 15 и тд
    </p>
  </div>
</template>
<script>
import coremethods from '@/components/core-methods.js'
export default {
  mixins: [coremethods],
  created: function () {}
}
</script>
