# Настройка авторизации

## Введение

**AuthCoreProvider** является заменой тройке AuthProvider, AuthHandler, HWIDHandler, выполняя все их функции в едином, связанном интерфейсе

Преимущества AuthCoreProvider:

- Возможность использовать OAuth
- Отсутствует дублирование подключения к БД
- Единый интерфейс проверки пароля
- Возможность модулям реализовывать поддержку дополнительных функций и получать дополнительные поля
- Возможность модулям реализовывать авторизацию/регистрацию через соц.сети
- Множество команд для управления

Для использования команд AuthCoreProvider используйте config auth.ВАШAUTHID.core КОМАНДА АРГУМЕНТЫ<br> Список команд вы можете посмотреть, нажав на TAB

AUTH ID это название блока авторизации, например std

В таком случае команды будут выглядеть так: config auth.std.core КОМАНДА АРГУМЕНТЫ

## Привилегии

Лаунчер предоставляет систему привилегий для определения того, какие действия может совершить пользователь. Примеры permissions

- ```*``` - все привилегии
- ```launchserver.*``` - все привилегии, проверяемые на стороне ЛаунчСервера
- ```launcher.*``` - все привилегии, проверяемые на стороне Лаунчера
- ```launchserver.profile.hitech.*``` - разрешает показ в Лаунчере и вход в профиль hitech (в нижнем регистре)
- ```launcher.runtime.optionals.hitech.*``` - разрешает управлять всеми опциональными модами в профиле hitech

Для работы permissions требуется создать таблицу ```user_permissions```
```sql:no-line-numbers
CREATE TABLE user_permissions (
    uuid varchar(100) NOT NULL,
    name varchar(100) NOT NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4;
CREATE INDEX user_permissions_uuid_IDX USING BTREE ON user_permissions (uuid);
```
После создания таблицы, добавьте в конфигурацию AuthCoreProvider следующие строки:
```json:no-line-numbers
            "permissionsTable": "user_permissions",
            "permissionsPermissionColumn": "name",
       	    "permissionsUUIDColumn": "uuid"
```

::: tip ПРИМЕР ВЫДАЧИ ПРАВ
```sql:no-line-numbers
INSERT INTO user_permissions (uuid, name)
SELECT uuid, 'launchserver.profile.hitech.*'
FROM users WHERE name = '<ник>';
```
:::
::: details Примечания:

- Все профили по умолчанию доступны всем, вне зависимости от permissions. Установите в профиле поле ```limited``` в true, чтобы ограничить доступ к профилю по permissions
- Все опциональные моды по умолчанию доступны всем, вне зависимости от permissions. Установите в опциональном моде поле ```limited``` в true, чтобы ограничить доступ к профилю по permissions
- ```profileWhitelist``` не относится к привилегиям, но для его работы, требуется установить в профиле поле ```limited``` в true
- Профиль может записываться с помощью title в нижнем регистре (hitech) или с помощью его UUID (f210e1f0-c24e-41b6-9214-cee9a9139823). Второй вариант записи предпочтительней, так как не зависит от языка и не содержит спец. символов

:::

## Метод Memory

Не требует пароль для входа. Подходит для тестирования и серверов в локальной сети.

```json{6-8}:no-line-numbers
    "std": {
      "core": {
        "type": "memory"
      },
      "textureProvider": {
        "skinURL": "http://example.com/skins/%username%.png",
        "cloakURL": "http://example.com/cloaks/%username%.png",
        "type": "request"
      },
      "isDefault": true,
      "displayName": "Default"
    }
```

::: warning Важно:
Этот метод никак не проверяет accessToken и serverId пользователя, а так же не гарантирует сохранения UUID после рестарта. Это означает, что на сервер можно войти с любого Лаунчера под любым логином, а трафик minecraft может быть подвержен MITM атаке. Если вам необходимо контролировать вход на сервер и при этом у вас нет базы данных - используйте [FileAuthSystem](../auth/#метод-fileauthsystem)
:::

## Метод MySQL

Этот способ подходит, если:

- У вас есть сайт или сервис с БД MySQL/MariaDB, через который пользователи могут зарегистрироваться
- У ЛаунчСервера есть прямой доступ к БД
- В БД пароли хранятся в одном столбце, в таблице пользователей

Выполните следующие SQL запросы для создания таблицы с HWID и необходимых полей:
**ВНИМАНИЕ, измените users на название своей таблицы с пользователями**
:::: code-group
::: code-group-item [ ПРИМЕР ]
```sql{2,3,10,19,41,42}:no-line-numbers
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
```
:::
::: code-group-item [ DLE ]
```sql{2,3,10,19,41,42}:no-line-numbers
-- Добавляет недостающие поля в таблицу
ALTER TABLE dle_users
ADD COLUMN uuid CHAR(36) UNIQUE DEFAULT NULL,
ADD COLUMN accessToken CHAR(32) DEFAULT NULL,
ADD COLUMN serverID VARCHAR(41) DEFAULT NULL,
ADD COLUMN hwidId BIGINT DEFAULT NULL;

-- Создаёт триггер на генерацию UUID для новых пользователей
DELIMITER //
CREATE TRIGGER setUUID BEFORE INSERT ON dle_users
FOR EACH ROW BEGIN
IF NEW.uuid IS NULL THEN
SET NEW.uuid = UUID();
END IF;
END; //
DELIMITER ;

-- Генерирует UUID для уже существующих пользователей
UPDATE dle_users SET uuid=(SELECT UUID()) WHERE uuid IS NULL;

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
ALTER TABLE `dle_users`
ADD CONSTRAINT `dle_users_hwidfk` FOREIGN KEY (`hwidId`) REFERENCES `hwids` (`id`);
```
:::
::: code-group-item [ XenForo ]
```sql{2,3,10,19,41,42}:no-line-numbers
-- Добавляет недостающие поля в таблицу
ALTER TABLE xf_user
ADD COLUMN uuid CHAR(36) UNIQUE DEFAULT NULL,
ADD COLUMN accessToken CHAR(32) DEFAULT NULL,
ADD COLUMN serverID VARCHAR(41) DEFAULT NULL,
ADD COLUMN hwidId BIGINT DEFAULT NULL;

-- Создаёт триггер на генерацию UUID для новых пользователей
DELIMITER //
CREATE TRIGGER setUUID BEFORE INSERT ON xf_user
FOR EACH ROW BEGIN
IF NEW.uuid IS NULL THEN
SET NEW.uuid = UUID();
END IF;
END; //
DELIMITER ;

-- Генерирует UUID для уже существующих пользователей
UPDATE xf_user SET uuid=(SELECT UUID()) WHERE uuid IS NULL;

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
ALTER TABLE `xf_user`
ADD CONSTRAINT `xf_user_hwidfk` FOREIGN KEY (`hwidId`) REFERENCES `hwids` (`id`);
```
:::
::::
Поместите в раздел **"auth": {}** в LaunchServer.json
:::: code-group
::: code-group-item [ Для вставки ]
```json{5,7-9,14-15,18,20-22,28-30}:no-line-numbers
    "std": {
      "core": {
        "type": "mysql",
        "mySQLHolder": {
          "address": "localhost",
          "port": 3306,
          "username": "launchserver",
          "password": "password",
          "database": "db",
          "timezone": "UTC",
          "useHikari": true
        },
        "passwordVerifier": {
          "algo": "SHA256",
          "type": "digest"
        },
        "expireSeconds": 3600,
        "table": "users",
        "tableHwid": "hwids",
        "uuidColumn": "uuid",
        "usernameColumn": "username",
        "passwordColumn": "password",
        "accessTokenColumn": "accessToken",
        "hardwareIdColumn": "hwidId",
        "serverIDColumn": "serverID"
      },
      "textureProvider": {
        "skinURL": "http://example.com/skins/%username%.png",
        "cloakURL": "http://example.com/cloaks/%username%.png",
        "type": "request"
      },
      "isDefault": true,
      "displayName": "Default"
    }
```
:::
::: code-group-item [ Описание ]
```json{5,7-9,14-15,18,20-22,28-30}:no-line-numbers
    "std": { // AUTH ID. При настройке нескольких авторизаций одновременно, имя должно отличаться
      "core": { // Раздел конфигурации AuthCoreProvider
        "type": "mysql", // Метод авторизации AuthCoreProvider'а
        "mySQLHolder": {
          "address": "example.com", // Адрес mysql сервера
          "port": 3306, // Порт mysql сервера
          "username": "launchserver", // Имя пользователя
          "password": "password123", // Пароль пользователя
          "database": "db?serverTimezone=UTC", // База данных (до ?), после — параметры базы данных, в этом примере — установка серверного часового пояса
          "timezone": "UTC", // установка клиентского часового пояса
          "useHikari": true // Использовать HikariCP ?
        },
        "passwordVerifier": { // Раздел конфигурации PasswordVerifier. Метод сверки пароля пользователя
          "algo": "SHA256",
          "type": "digest"
        },
        "expireSeconds": 3600, // Время действия accessToken в секундах
        "table": "users", // Таблица с пользователями
        "tableHwid": "hwids", // Таблица для хранения данных HWID
        "uuidColumn": "uuid", // Название столбца с UUID в таблице пользователей
        "usernameColumn": "username", // Название столбца с именами пользователей
        "passwordColumn": "password", // Название столбца с хешированными паролями пользователей
        "accessTokenColumn": "accessToken", // Название столбца с accessToken
        "hardwareIdColumn": "hwidId", // Название столбца с ID записи в таблице hwids
        "serverIDColumn": "serverID" // Название столбца с serverID
      },
      "textureProvider": { // Раздел конфигурации TextureProvider'а
        "skinURL": "http://example.com/skins/%username%.png",
        "cloakURL": "http://example.com/cloaks/%username%.png",
        "type": "request"
      },
      "isDefault": true, // Использование способа авторизации по умолчанию. При наличии нескольких, у остальных должно быть false
      "displayName": "Default" // Название метода авторизации в Лаунчере
    }
```
:::
::: code-group-item [ XenForo ]
```json{5,7-9,29-31}:no-line-numbers
    "std": {
      "core": {
        "type": "mysql",
        "mySQLHolder": {
          "address": "localhost",
          "port": 3306,
          "username": "launchserver",
          "password": "password",
          "database": "db",
          "timezone": "UTC",
          "useHikari": true
        },
        "passwordVerifier": {
          "type": "bcrypt"
        },
        "expireSeconds": 3600,
        "table": "xf_user",
        "tableHwid": "hwids",
        "uuidColumn": "uuid",
        "usernameColumn": "username",
        "passwordColumn": "password",
        "accessTokenColumn": "accessToken",
        "hardwareIdColumn": "hwidId",
        "serverIDColumn": "serverID",
        "customQueryByUsernameSQL": "SELECT `uuid`, `username`, `accessToken`, `serverID`, SUBSTRING(XF_USERS_AUTH.data, 23, 60) AS `password`, `hwidId` FROM `xf_user` AS XF_USERS RIGHT JOIN `xf_user_authenticate` AS XF_USERS_AUTH ON XF_USERS.user_id = XF_USERS_AUTH.user_id WHERE `username` = ?",
        "customQueryByUUIDSQL": "SELECT `uuid`, `username`, `accessToken`, `serverID`, SUBSTRING(XF_USERS_AUTH.data, 23, 60) AS `password`, `hwidId` FROM `xf_user` AS XF_USERS RIGHT JOIN `xf_user_authenticate` AS XF_USERS_AUTH ON XF_USERS.user_id = XF_USERS_AUTH.user_id WHERE `uuid` = ?"
      },
      "textureProvider": {
        "skinURL": "http://example.com/skins/%username%.png",
        "cloakURL": "http://example.com/cloaks/%username%.png",
        "type": "request"
      },
      "isDefault": true,
      "displayName": "Default"
    }
```
:::
::::
::: tip Настройте следующие конфигурации:
- [\[ PasswordVerifier \]](#конфигурация-passwordverifier)
- [\[ TextureProvider \]](../other/#textureprovider)
:::
Для работы HWID включите опцию ```enableHardwareFeature``` в ```protectHandler``` и измените его ```type``` на ```advanced```
::: tip Важно
Начиная с 5.2.9 метод MySQL генерирует access и refresh токены. Refresh токен генерируется на основе имени пользователя, хеша пароля и секретной соли (legacySalt). После смены пароля access токен продолжит действовать в течении определенного в конфигурации времени и только после потребуется повторный вход. Если вы потеряете файлы в папке ```.keys``` ЛаунчСервера игроки будут вынуждены перелогиниться.
:::

## Метод PostgreSQL

Метод postgresql не работает с HWID на момент 5.2.7

Выполните следующий SQL код для добавления новых полей и триггера:

```sql{2,23,28}:no-line-numbers
-- Добавляет недостающие поля в таблицу
ALTER TABLE users
ADD COLUMN uuid CHAR(36) UNIQUE DEFAULT NULL,
ADD COLUMN accessToken CHAR(32) DEFAULT NULL,
ADD COLUMN serverID VARCHAR(41) DEFAULT NULL;

-- Добавляет расширение для генерации UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Добавляет триггер для генерации UUID
CREATE OR REPLACE FUNCTION public.users_uuid_trigger_func()
    RETURNS TRIGGER
AS
$function$
    BEGIN
        IF (new.uuid IS NULL) THEN
		new.uuid = (SELECT uuid_generate_v4());
	END IF;
        return new;
    END;
$function$ LANGUAGE plpgsql;

CREATE TRIGGER users_uuid_trigger
    BEFORE INSERT ON users
    FOR EACH ROW
EXECUTE PROCEDURE public.users_uuid_trigger_func();

-- Генерирует UUID для уже существующих пользователей
UPDATE users SET uuid=(SELECT uuid_generate_v4()) WHERE uuid IS NULL;
```

Пример конфигурации:

```json{5,7-9,14-15,18,20-22,27-29}:no-line-numbers
    "std": {
      "core": {
        "type": "postgresql",
        "postgresSQLHolder": {
          "addresses": ["localhost"],
          "ports": [5432],
          "username": "user",
          "password": "pass",
          "database": "db",
          "timezone": "UTC",
          "useHikari": true
        },
        "passwordVerifier": {
          "algo": "SHA256",
          "type": "digest"
        },
        "expireSeconds": 3600,
        "table": "users",
        "tableHwid": "hwids",
        "uuidColumn": "uuid",
        "usernameColumn": "username",
        "passwordColumn": "password",
        "accessTokenColumn": "accessToken",
        "serverIDColumn": "serverID"
      },
      "textureProvider": {
        "skinURL": "http://example.com/skins/%username%.png",
        "cloakURL": "http://example.com/cloaks/%username%.png",
        "type": "request"
      },
      "isDefault": true,
      "displayName": "Default"
    }
```
::: tip Важно
Начиная с 5.2.9 метод PostgreSQL генерирует access и refresh токены. Refresh токен генерируется на основе имени пользователя, хеша пароля и секретной соли (legacySalt). После смены пароля access токен продолжит действовать в течении определенного в конфигурации времени и только после потребуется повторный вход. Если вы потеряете файлы в папке ```.keys``` ЛаунчСервера игроки будут вынуждены перелогиниться.
:::

## Метод http

Следуйте инструкции к вашему скрипту или обратитесь к [этой](../dev/#реализация-oauth)  инструкции для создания собственного скрипта

## Метод FileAuthSystem

Установите модуль [FileAuthSystem](https://github.com/GravitLauncher/LauncherModules/tree/master/FileAuthSystem_module)<br>
Он позволит вам создать файловую систему хранения логинов и паролей без СУБД

## Объединение разных способов авторизации
Если ваш сервер должен быть доступен с лицензионных клиентов и с вашей базой данных вам нужно настроить `merge` способ авторизации. Вы должны настроить минимум 2 способа авторизации, прежде чем настраивать этот

```json:no-line-numbers
"merged": {
    "core": {
      "list": ["std", "microsoft"]
      "type": "merge"
    },
    "visible": false,
    "isDefault": false,
    "displayName": "Merged"
}
```

- Вы не можете авторизоваться через этот способ. Вы должны его указать ТОЛЬКО при генерации токена для сервера.
- Приоритет способов определяется их порядком в списке
- Если у разных способов авторизации есть пользователи с одинаковыми никнеймами - они могут вызывать баги в реализации сервера и/или плагинов
- Если хотя бы один способ авторизации требует наличия `textureProvider` вы обязаны его настроить и в merged способе

## Конфигурация PasswordVerifier

Для настройки большинства способов авторизации через БД вам необходимо указать passwordVerifier, соответствующий вашей CMS на сайте. (секцию passwordVerifier можно встретить при конфигурировании метода [mysql](#метод-mysql) либо [postgresql](#метод-postgresql))

:::::: code-group
::::: code-group-item [ DOUBLE DIGESET ]
```json:no-line-numbers
"passwordVerifier": {
   "algo": "SHA256",
   "toHexMode": true,
   "type": "doubleDigest"
}
```
::: tip Примечания:
-  Алгоритм doubleDigest **дважды** хеширует пароль одним алгоритмом без соли. Опция toHexMode определяет будут ли хешироваться бинарные данные (false) или HEX строка (true)
-  Список доступных алгоритмов аналогичен способу digest
-  Применяется в старых версиях DLE (алгоритм MD5) и в некоторых других CMS
:::
:::::
::::: code-group-item [ DIGEST ]
```json:no-line-numbers
"passwordVerifier": {
   "algo": "SHA256",
   "type": "digest"
}
```
::: tip Примечания:
-  Алгоритм digest **один раз** хеширует пароль одним алгоритмом без соли
-  Метод поддерживает любые алгоритмы хеширования, реализованные в вашей JDK или библиотеки BouncyCastle. Самые распространенные из них: MD5, SHA1, SHA256, SHA512
:::
:::::
::::: code-group-item [ PHP BCRYPT ]
```json:no-line-numbers
"passwordVerifier": {
   "type": "bcrypt"
}
```
::: tip Примечания:
-  Проверяет пароль аналогично функции ```password_verify``` в языке PHP
-  Большинство современных CMS использует именно этот тип хеширования пароля
:::
:::::
::::: code-group-item [ WORDPRESS PHPASS ]
```json:no-line-numbers
"passwordVerifier": {
   "type": "phpass"
}
```
:::: warning Обязательная установка модуля
Несколько вариантов, где можно взять модуль:
::: tip Из релиза:
- [GitHub Release](https://github.com/GravitLauncher/Launcher/releases)
- В архиве [LaunchServerModules.zip](https://github.com/GravitLauncher/Launcher/releases/latest/download/LaunchServerModules.zip)
:::
::: tip Из своих исходников, после установки скриптом:
Местонахождение: **`./src/modules/AdditionalHash_module/build/libs/AdditionalHash_module.jar`**
Скопировать командой:
```bash
cd modules
ln -s ../src/modules/AdditionalHash_module/build/libs/AdditionalHash_module.jar
```
:::
 **Исходники [AddionalHash](https://github.com/GravitLauncher/LauncherModules/tree/master/AdditionalHash_module)**

::::
::: tip Примечания:
-  Проверяет пароль аналогично библиотеки ```PHPHASH``` в WordPress
-  Используется в WordPress
:::
:::::
::::::
::: details Комьюнити реализации, метод JSON:
[\[PHP\] microwin7/GravitLauncher-PasswordVerifier](https://github.com/microwin7/GravitLauncher-PasswordVerifier)
- Bcrypt
- PHPass
- PBKDF2
:::

## Несколько методов авторизации

Методы авторизации для core вы можете увидеть выше<br>
TextureProvider обязателен если вам нужны скины, подробнее о настройке прочитайте [тут](../other/#textureprovider)

Закрываем метод std и **обязательно** ставим запятую<br>
Далее выполняем настройку столько раз, сколько типов авторизаций необходимо

Пример нескольких методов авторизаций:
```json
"auth": {
  "std": {
    "core": {},
  	"textureProvider": {
	    "type": "void"
	  },
    "isDefault": true, // Будет ли данный способ авторизации выбран по умолчанию
    "displayName": "Default" // Название метода авторизации в Лаунчере
  },
  "Microsoft": {
    "core": {},
    "isDefault": false, // Возможен только один блок с положением true
    "displayName": "Microsoft" // Название метода авторизации в Лаунчере
  }
}
```
**При копировании данного примера не забудьте убрать все комментарии!**
