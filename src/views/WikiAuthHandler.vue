<template>
  <div class="wiki">
    <h2>Настройка AuthHandler</h2>
    <b-alert
        variant="danger"
        :show="version >= 50200"
        >Начиная с <b>5.2.0</b> AuthProvider/AuthHandler являются устаревшими</b-alert>
    <sploiler><template #header><span>Question #1</span></template>
      <p>Answer #1</p>
    </sploiler>
    <h3>
      Способ memory
      <gtag type="easy">Это просто</gtag>
    </h3>
    <p>
      UUID получается путем преобразования бинарного представления ника<br />
      Каждому нику будет соответствовать ровно один UUID
    </p>
    <pcode autodetect code='
    "auth": [
      "handler": {
        "type": "memory"
      }
    ]
    '/>
    <h3>
      Способ mysql
      <gtag type="easy">Это просто</gtag>
    </h3>
    <p>Для получения UUID лаунчсервер обращается к базе данных mysql</p>
    <pcode autodetect code='
    "auth": [
      "handler": {
        "type": "mysql",
        "mySQLHolder": {
          "address": "localhost",              // адрес mysql сервера
          "port": 3306,                        // порт mysql сервера
          "username": "launchserver",          // имя пользователя
          "password": "password",              // пароль пользователя
          "database": "db?serverTimezone=UTC", // база данных (до ?), после находится установка серверной таймзоны
          "timezone": "UTC",                   // установка клиентской таймзоны
          "useHikari": true                    // использовать ли HikariCP
        },
        "table": "users",                      // таблица
        "uuidColumn": "uuid",                  // название столбца с uuid
        "usernameColumn": "username",          // название столбца с именами пользователей
        "accessTokenColumn": "accessToken",    // название столбца с accessToken
        "serverIDColumn": "serverID"           // название столбца с serverID
      }
    ]
    '/>
    <p>
      Для автоматического создания нужных полей в таблице и созданию UUID можно
      воспользоватся следующими SQL запросами:
    </p>
    <pcode code='
    -- Добавляет недостающие поля в таблицу
    ALTER TABLE users
    ADD COLUMN uuid CHAR(36) UNIQUE DEFAULT NULL,
    ADD COLUMN accessToken CHAR(32) DEFAULT NULL,
    ADD COLUMN serverID VARCHAR(41) DEFAULT NULL;

    -- Создаёт триггер на генерацию UUID для новых пользователей
    DELIMITER //
    CREATE TRIGGER setUUID BEFORE INSERT ON users
    FOR EACH ROW BEGIN
    IF NEW.uuid IS NULL THEN
    SET NEW.uuid = UUID();
    END IF;
    END; //
    DELIMITER ;

    -- Генерирует UUID для уже существующих пользователей
    UPDATE users SET uuid=(SELECT UUID()) WHERE uuid IS NULL;
    '/>
    <h3>
      Способ postgresql
      <gtag type="medium">Средний уровень</gtag>
    </h3>
    <p>Для получения UUID лаунчсервер обращается к базе данных postgresql</p>
    <pcode autodetect code='
    "auth": [
      "handler": {
        "type": "postgresql",
        "postgreSQLHolder": {
          "address": "localhost",              // адрес postgresql сервера
          "port": 3306,                        // порт postgresql сервера
          "username": "launchserver",          // имя пользователя
          "password": "password",              // пароль пользователя
          "database": "db?serverTimezone=UTC", // база данных (до ?), после находится установка серверной таймзоны
          "timezone": "UTC",                   // установка клиентской таймзоны
          "useHikari": true                    // использовать ли HikariCP
        },
        "table": "users",                      // таблица
        "uuidColumn": "uuid",                  // название столбца с uuid
        "usernameColumn": "username",          // название столбца с именами пользователей
        "accessTokenColumn": "accessToken",    // название столбца с accessToken
        "serverIDColumn": "serverID",           // название столбца с serverID
        "queryByUUIDSQL": "SELECT uuid, username, NULLIF(\"accessToken\", &quot;&quot;) as \"accessToken\", NULLIF(\"serverID\", &quot;&quot;) as \"serverID\" FROM users WHERE uuid=? LIMIT 1",
        "queryByUsernameSQL": "SELECT uuid, username, NULLIF(\"accessToken\", &quot;&quot;) as \"accessToken\", NULLIF(\"serverID\", &quot;&quot;) as \"serverID\" FROM users WHERE username=? LIMIT 1",
        "updateAuthSQL": "UPDATE users SET username=?, \"accessToken\"=?, \"serverID\"=null WHERE uuid=?",
        "updateServerIDSQL": "UPDATE users SET \"serverID\"=? WHERE uuid=?"
      }
    ]
    '/>
    <h3>
      Способ json
      <gtag type="medium">Средний уровень</gtag>
    </h3>
    <!-- TODO -->
    <pcode autodetect code='
    "auth": [
      {
        "handler": {
          "type": "json",
          "getUrl": "http://gravit.pro/auth/get",   // получение username:uuid:accessToken:serverID по username или uuid (user) | (username or uuid + apiKey) -> (username + uuid + accessToken + serverId)
          "updateAuthUrl": "http://gravit.pro/auth/updateAuth",           // обновление accessToken | (username + uuid + accessToken + serverId) -> OK
          "updateServerIdUrl": "http://gravit.pro/auth/updateServerId",         // обновление serverId | (uuid + serverId) -> OK
          "apiKey": "yourKey" //Случайный ключ для обеспечения безопасности
        }
      }
    ]
    '/>
    <h3>
      Способ request
      <gtag type="medium">Средний уровень</gtag>
      <gtag type="deprecated">Устаревшее</gtag>
    </h3>
    <p>
      Для получения и обновления uuid, accessToken, serverID лаунчсервер
      обращается к сайту по протоколу HTTP/HTTPS<br />
      В скобках указаны параметры запроса
    </p>
    <pcode autodetect code='
    "auth": [
      {
        "handler": {
          "type": "request",
          "usernameFetch": "http://gravit.pro/usernameFetch.php",   // получение uuid:accessToken:serverID по имени пользователя (user)
          "uuidFetch": "http://gravit.pro/uuidFetch.php",           // получение username:accessToken:serverID по uuid (uuid)
          "updateAuth": "http://gravit.pro/updateAuth.php",         // скрипт обновления accessToken и uuid по имени пользователя (user, uuid, token)
          "updateServerID": "http://gravit.pro/updateserverID.php", // скрипт обновления serverID по uuid (serverid, uuid)
          "splitSymbol": ":",     // символ разделения в uuidFetch и usernameFetch (например: "username:accessToken:serverID")
          "goodResponse": "OK"    // ответ updateAuth и updateServerID, когда все прошло успешно
        }
      }
    ]
    '/>
  </div>
</template>
<script>
import coremethods from '@/components/core-methods.js'
export default {
  mixins: [coremethods],
  created: function () {}
}
</script>
