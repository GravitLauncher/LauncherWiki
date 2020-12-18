<template><div class="wiki">
  <h2>Настройка AuthHandler</h2>
  <details>
    <summary tabindex="1"><span>Question #1</span></summary>
    <p>Answer #1</p>
  </details>
  <h3>Способ memory <div class="gtag gtag-easy">Это просто</div>
  </h3>
  <p>UUID получается путем преобразования бинарного представления ника<br>
    Каждому нику будет соответствовать ровно один UUID</p>
  <pre v-highlightjs><code class="json">
    "auth": [
      "handler": {
        "type": "memory"
      }
    ]
    </code></pre>
  <h3>Способ mysql <div class="gtag gtag-easy">Это просто</div>
  </h3>
  <p>Для получения UUID лаунчсервер обращается к базе данных mysql</p>
  <pre v-highlightjs><code class="json">
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
    </code></pre>
  <p>Для автоматического создания нужных полей в таблице и созданию UUID можно воспользоватся следующими SQL запросами:
  </p>
  <pre v-highlightjs><code class="sql">
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
    </code></pre>
  <h3>Способ postgresql <div class="gtag gtag-medium">Средний уровень</div>
  </h3>
  <p>Для получения UUID лаунчсервер обращается к базе данных postgresql</p>
  <pre v-highlightjs><code class="json">
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
        "queryByUUIDSQL": "SELECT uuid, username, NULLIF(\"accessToken\", '') as \"accessToken\", NULLIF(\"serverID\", '') as \"serverID\" FROM users WHERE uuid=? LIMIT 1",
        "queryByUsernameSQL": "SELECT uuid, username, NULLIF(\"accessToken\", '') as \"accessToken\", NULLIF(\"serverID\", '') as \"serverID\" FROM users WHERE username=? LIMIT 1",
        "updateAuthSQL": "UPDATE users SET username=?, \"accessToken\"=?, \"serverID\"=null WHERE uuid=?",
        "updateServerIDSQL": "UPDATE users SET \"serverID\"=? WHERE uuid=?"
      }
    ]
    </code></pre>
  <h3>Способ request <div class="gtag gtag-medium">Средний уровень</div>
    <div class="gtag gtag-deprecated">Устаревшее</div>
  </h3>
  <p>Для получения и обновления uuid, accessToken, serverID лаунчсервер обращается к сайту по протоколу HTTP/HTTPS<br>
    В скобках указаны параметры запроса</p>
  <pre v-highlightjs><code class="json">
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
    </code></pre>
  <h3>Способ json <div class="gtag gtag-medium">Средний уровень</div>
  </h3>
  <!-- TODO -->
  <h3>Способ hibernate <div class="gtag gtag-medium">Средний уровень</div>
  </h3>
  <p>Hibernate — самая популярная реализация спецификации JPA, предназначенная для решения задач объектно-реляционного
    отображения (ORM)<br>
    Для проверки логина и пароля лаунчсервер обращается к любой базе данных<br>
    <b>Для подключения к базам данных, в libraries необходимо положить библиотеку для поддержки соответствующей базы
      данных</b><br>
    <a href="index.php?r=wiki/page&page=hibernate">Инструкция по настройке Hibernate</a></p>
  <pre v-highlightjs><code class="json">
    "auth": [
      {
        "handler": {
          "type": "hibernate"
        }
      }
    ]
    </code></pre>
</div></template>
