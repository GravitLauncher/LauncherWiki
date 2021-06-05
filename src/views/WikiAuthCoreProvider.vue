<template>
    <div class="wiki">
        <h2>Настройка AuthCoreProvider</h2>
        <p><b>AuthCoreProvider</b> является заменой тройке <codes>AuthProvider</codes>, <codes>AuthHandler</codes>, <codes>HWIDHandler</codes>, выполняя все их функции в едином, связанном интерфейсе</p>
        <p>Преимущества AuthCoreProvider:</p>
        <ul>
            <li>Возможность использовать OAuth</li>
            <li>Отсутствует дублирование подключения к БД</li>
            <li>Единый интерфейс проверки пароля</li>
            <li>Возможность модулям реализовывать поддержку дополнительных функций и получать дополнительные поля</li>
            <li>Возможность модулям реализовывать авторизацию/регистрацию через соц.сети</li>
            <li>Множество комманд для управления</li>
        </ul>
        <p>Для использования команд AuthCoreProvider используйте <codes>config auth.ВАШAUTHID КОМАНДА АРГУМЕНТЫ</codes>. Список команд вы можете посмотреть нажав на TAB</p>
        <h3>Конфигурация PasswordVerifier</h3>
        <p>Эта часть является общей для всех способов авторизации</p>
        <p><codes>digest</codes> - хеширует пароль выбранным алгоритмом. Поддерживаются любые алгоритмы, реализованные в Java или BouncyCastle</p>
        <pre v-highlightjs><code class="json">
    "passwordVerifier": {
      "algo": "SHA256",
      "type": "digest"
    }
    </code></pre>
        <p><codes>doubledigest</codes> - хеширует пароль выбранным алгоритмом дважды. <codes>toHexMode</codes> перед вторым раундом хеширования переведет хеш в HEX формат. Поддерживаются любые алгоритмы, реализованные в Java или BouncyCastle</p>
        <pre v-highlightjs><code class="json">
    "passwordVerifier": {
      "algo": "SHA256",
      "toHexMode": true,
      "type": "digest"
    }
    </code></pre>
        <p><codes>bcrypt</codes>(Модуль <codes>AddionalHash</codes>) - проверяет пароль по алгоритму BCrypt(password_verify в PHP)</p>
        <pre v-highlightjs><code class="json">
    "passwordVerifier": {
      "type": "bcrypt"
    }
    </code></pre>
        <p><codes>phpass</codes>(Модуль <codes>AddionalHash</codes>) - проверяет пароль по алгоритму phpass(WordPress)</p>
        <pre v-highlightjs><code class="json">
    "passwordVerifier": {
      "type": "phpass"
    }
    </code></pre>
        <h3>Способ MySQL <gtag type="info">Рекомендуется</gtag></h3>
        <p>Выполните следующие SQL запросы для создания таблицы с HWID и необходимых полей:</p>
            <pre v-highlightjs><code class="sql">
    -- Добавляет недостающие поля в таблицу
    ALTER TABLE users
    ADD COLUMN uuid CHAR(36) UNIQUE DEFAULT NULL,
    ADD COLUMN accessToken CHAR(32) DEFAULT NULL,
    ADD COLUMN serverID VARCHAR(41) DEFAULT NULL;
    ADD COLUMN hwidId BIGINT DEFAULT NULL;

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

    CREATE TABLE `hwids` (
  `id` bigint(20) NOT NULL,
  `publickey` blob,
  `hwDiskId` varchar(255) DEFAULT NULL,
  `baseboardSerialNumber` varchar(255) DEFAULT NULL,
  `graphicCard` varchar(255) DEFAULT NULL,
  `displayId` blob,
  `bitness` int(11) DEFAULT NULL,
  `totalMemory` bigint(20) DEFAULT NULL,
  `logicalProcessors` int(11) DEFAULT NULL,
  `physicalProcessors` int(11) DEFAULT NULL,
  `processorMaxFreq` bigint(11) DEFAULT NULL,
  `battery` tinyint(1) NOT NULL DEFAULT '0',
  `banned` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `hwids`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `publickey` (`publickey`(255));
ALTER TABLE `hwids`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
ALTER TABLE `users`
  ADD CONSTRAINT `users_hwidfk` FOREIGN KEY (`hwidId`) REFERENCES `hwids` (`id`)
    </code></pre>
    <p>Настройте конфигурацию</p>
    <pre v-highlightjs><code class="json">
    "auth": [
      "core": {
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
        "tableHwid": "hwids",
        "uuidColumn": "uuid",                  // название столбца с uuid
        "usernameColumn": "username",          // название столбца с именами пользователей
        "passwordColumn": "password",          // название столбца с паролем пользователя
        "accessTokenColumn": "accessToken",    // название столбца с accessToken
        "hardwareIdColumn": "hwidId",          // название столбца с ID записи в таблице hwids
        "serverIDColumn": "serverID"           // название столбца с serverID
      }
    ]
    </code></pre>
    <p>Для работы HWID включите опцию <codes>enableHardwareFeature</codes> в protectHandler</p>
    <h2>Метод json</h2>
    <p>Следуйте инструкции к вашему скрипту или обратитесь к <router-link to="/developers/oauth">этой</router-link> инструкции для создания собственного скрипта</p>
    <h2>Метод fileauthsystem</h2>
    <p>Установите модуль <a href="https://github.com/GravitLauncher/LauncherModules/tree/master/FileAuthSystem_module">FileAuthSystem</a></p>
    </div>
</template>
<script>
import coremethods from '@/components/core-methods.js'
import codes from '../components/codes.vue'
export default {
  components: { codes },
  mixins: [coremethods],
  created: function () {}
}
</script>
