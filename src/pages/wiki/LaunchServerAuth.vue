<template>
  <q-page padding>
    <doc-header name="authcoreprovider">Настройка авторизации</doc-header>
    <p>
      <b>AuthCoreProvider</b> является заменой тройке
      <codes>AuthProvider</codes>, <codes>AuthHandler</codes>,
      <codes>HWIDHandler</codes>, выполняя все их функции в едином, связанном
      интерфейсе
    </p>
    <p>Преимущества AuthCoreProvider:</p>
    <ul>
      <li>Возможность использовать OAuth</li>
      <li>Отсутствует дублирование подключения к БД</li>
      <li>Единый интерфейс проверки пароля</li>
      <li>
        Возможность модулям реализовывать поддержку дополнительных функций и
        получать дополнительные поля
      </li>
      <li>
        Возможность модулям реализовывать авторизацию/регистрацию через соц.сети
      </li>
      <li>Множество комманд для управления</li>
    </ul>
    <p>
      Для использования команд AuthCoreProvider используйте
      <codes>config auth.ВАШAUTHID.core КОМАНДА АРГУМЕНТЫ</codes>. Список команд
      вы можете посмотреть, нажав на TAB
    </p>
    <doc-header name="passwordverifier"
      >Конфигурация PasswordVerifier</doc-header
    >
    <p>Для настройки большинства способов авторизации через БД вам необходимо указать passwordVerifier, соответствующий вашей CMS на сайте. </p>
    <q-tabs v-model="passwordVerifier">
      <q-tab name="doubledigest" label="DOUBLE DIGEST" />
      <q-tab name="digest" label="DIGEST" />
      <q-tab name="bcrypt" label="PHP BCrypt" />
      <q-tab name="phpass" label="WordPress PHPASS" />
    </q-tabs>
    <q-tab-panels v-model="passwordVerifier">
      <q-tab-panel name="doubledigest">
        <p>
          Алгоритм doubleDigest <b>дважды</b> хеширует пароль одним алгоритмом
          без соли. Опция toHexMode определяет будут ли хешироваться бинарные
          данные (false) или HEX строка (true)
        </p>
        <p>Список доступных алгоритмов аналогичен способу digest</p>
        <doc-code
          autodetect
          code='
    "passwordVerifier": {
      "algo": "SHA256",
      "toHexMode": true,
      "type": "doubleDigest"
    }
    '
        />
        <p>
          Применяется в старых версиях DLE (алгоритм MD5) и в некоторых других
          CMS
        </p>
      </q-tab-panel>
      <q-tab-panel name="digest">
        <p>
          Алгоритм digest <b>один раз</b> хеширует пароль одним алгоритмом без
          соли
        </p>
        <p>Метод поддерживает любые алгоритмы хеширования, реализованные в вашей JDK или библиотеки BouncyCastle. Самые распространенные из них: MD5, SHA1, SHA256, SHA512</p>
        <doc-code
          autodetect
          code='
    "passwordVerifier": {
      "algo": "SHA256",
      "type": "digest"
    }
    '
        />
      </q-tab-panel>
      <q-tab-panel name="bcrypt">
        <p>
          Проверяет пароль аналогично функции
          <q-badge>password_verify</q-badge> в языке PHP
        </p>
        <doc-code
          autodetect
          code='
    "passwordVerifier": {
      "type": "bcrypt"
    }
    '
        />
      <p>
        Большинство современных CMS использует именно этот тип хеширования
        пароля
      </p>
      <p><b>Требуется установка модуля <a href='https://github.com/GravitLauncher/LauncherModules/tree/master/AdditionalHash_module'>AddionalHash</a></b></p>
      </q-tab-panel>
      <q-tab-panel name="phpass">
        <p>
          Проверяет пароль аналогично библиотеки <q-badge>PHPHASH</q-badge> в
          WordPress
        </p>
        <doc-code
          autodetect
          code='
    "passwordVerifier": {
      "type": "phpass"
    }
    '
        />
      <p>Используется в WordPress</p>
      <p><b>Требуется установка модуля <a href='https://github.com/GravitLauncher/LauncherModules/tree/master/AdditionalHash_module'>AddionalHash</a></b></p>
      </q-tab-panel>
    </q-tab-panels>
    <doc-header name="permissions">Привилегии</doc-header>
    <p>
      Лаунчер предоставляет систему привилегий для определения того, какие действия может совершить пользователь. Примеры permissions (<b>К сожалению, в данный момент новая
        система permissions недоступна в способе MySQL</b>)
    </p>
    <ul>
      <li><q-badge>*</q-badge> - все привилегии</li>
      <li><q-badge>launchserver.*</q-badge> - все привилегии, проверяемые на стороне лаунчсервера</li>
      <li><q-badge>launcher.*</q-badge> - все привилегии, проверяемые на стороне лаунчера</li>
      <li><q-badge>launchserver.profiles.hitech.*</q-badge> - разрешает показ в лаунчере и вход в профиль hitech (в нижнем регистре)</li>
      <li><q-badge>launcher.runtime.optionals.hitech.*</q-badge> - разрешает управлять всеми опциональными модами в профиле hitech</li>
    </ul>
    <p>
      Примечания:
    </p>
    <ul>
      <li>Все профили по умолчанию доступны всем, вне зависимости от permissions. Установите в профиле поле <q-badge>limited</q-badge> в true, чтобы ограничить доступ к профилю по permissions</li>
      <li>Все опциональные моды по умолчанию доступны всем, вне зависимости от permissions. Установите в опциональном моде поле <q-badge>limited</q-badge> в true, чтобы ограничить доступ к профилю по permissions</li>
      <li><q-badge>profileWhitelist</q-badge> не относится к привелегиям, но для его работы, требуется установить в профиле поле <q-badge>limited</q-badge> в true</li>
      <li>Профиль может записываться с помощью title в нижнем регистре (hitech) или с помощью его UUID (f210e1f0-c24e-41b6-9214-cee9a9139823). Второй вариант записи предпочительней, так как не зависит от языка и не содержит спец. символов</li>
    </ul>
    <doc-header name="memory">Способ Memory</doc-header>
    <p>
      Не требует пароль для входа. Подходит для тестирования и серверов в локальной сети.
    </p>
    <p><b>Важно:</b> этот метод никак не проверяет serverId и accessToken пользователя, а так же не гарантирует сохранения UUID после рестарта. Это означает, что на сервер можно войти с любого лаунчера под любым логином, а трафик minecraft может быть подвержем MITM атаки.
    Если вам необходимо контролировать вход на сервер и при этом у вас нет базы данных - используйте FileAuthSystem</p>
    <doc-code code='
    "memory": {
      "core": {
        "type": "memory"
      }
    }' />
    <doc-header name="mysql">Способ MySQL</doc-header>
    <p>
      Этот способ подходит, если:
    </p>
    <ul>
      <li>У вас есть сайт или сервис с БД MySQL/MariaDB, через который пользователи могут зарегистрироваться</li>
      <li>У лаунчсервера есть прямой доступ к БД</li>
      <li>В БД пароли хранятся в одном столбце, в таблице пользователей</li>
    </ul>
    <p>
      Выполните следующие SQL запросы для создания таблицы с HWID и необходимых
      полей:
    </p>
    <doc-code
      code='
    -- Добавляет недостающие поля в таблицу
    ALTER TABLE users
    ADD COLUMN uuid CHAR(36) UNIQUE DEFAULT NULL,
    ADD COLUMN accessToken CHAR(32) DEFAULT NULL,
    ADD COLUMN serverID VARCHAR(41) DEFAULT NULL,
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
  `battery` tinyint(1) NOT NULL DEFAULT "0",
  `banned` tinyint(1) NOT NULL DEFAULT "0"
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `hwids`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `publickey` (`publickey`(255));
ALTER TABLE `hwids`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
ALTER TABLE `users`
  ADD CONSTRAINT `users_hwidfk` FOREIGN KEY (`hwidId`) REFERENCES `hwids` (`id`);
    '
    />
    <p>Настройте лаунчсервер</p>
    <doc-code
      autodetect
      code='
    "std": {
      "core": {
        "type": "mysql",
        "mySQLHolder": {
          "address": "localhost",              // адрес mysql сервера
          "port": 3306,                        // порт mysql сервера
          "username": "launchserver",          // имя пользователя
          "password": "password",              // пароль пользователя
          "database": "db?serverTimezone=UTC", // база данных (до ?), после — параметры базы данных, в этом примере — установка серверного часового пояса
          "timezone": "UTC",                   // установка клиентского часового пояса
          "useHikari": true                    // Использовать HikariCP
        },
        "passwordVerifier": {                  // Ваш PasswordVerifier
          "algo": "SHA256",
          "type": "digest"
        },
        "table": "users",                      // таблица
        "tableHwid": "hwids",
        "uuidColumn": "uuid",                  // название столбца с uuid
        "usernameColumn": "username",          // название столбца с именами пользователей
        "passwordColumn": "password",          // название столбца с паролем пользователя
        "accessTokenColumn": "accessToken",    // название столбца с accessToken
        "hardwareIdColumn": "hwidId",          // название столбца с ID записи в таблице hwids
        "serverIDColumn": "serverID"           // название столбца с serverID
      },
      "isDefault": true,
      "displayName": "Default"
    }
    '
    />
    <p>
      Для работы HWID включите опцию <codes>enableHardwareFeature</codes> в
      protectHandler
    </p>
    <h2>Метод http</h2>
    <p>
      Следуйте инструкции к вашему скрипту или обратитесь к
      <router-link to="/developers#oauth">этой</router-link> инструкции для
      создания собственного скрипта
    </p>
    <h2>Метод fileauthsystem</h2>
    <p>
      Установите модуль
      <a
        href="https://github.com/GravitLauncher/LauncherModules/tree/master/FileAuthSystem_module"
        >FileAuthSystem</a
      >
    </p>
  </q-page>
</template>

<script>
import DocCode from "src/components/DocCode.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { DocCode },
  name: "PageAuth",
  data: function () {
    return {
      passwordVerifier: "doubledigest",
    };
  },
});
</script>
