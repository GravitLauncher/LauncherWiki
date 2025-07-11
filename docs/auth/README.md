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
    uuid varchar(36) NOT NULL,
    name varchar(100) NOT NULL
);
CREATE UNIQUE INDEX uk_user_permissions_uuid_name ON user_permissions (uuid, name);
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

## Метод SQL

Метод SQL является универсальным методам для большинства баз данных, включая PostgreSQL, MariaDB, MySQL, H2 и другие. Этот метод подходит если:

- Ваш сайт не предоставляет каких либо интеграций с нашим лаунчером
- Пароль хранится в таблице пользователей, рядом с именем пользователя в Minecraft
- Пароль хеширован одним из поддерживаемых типов хеша

Выполните следующий код для подготовки вашей таблицы пользователей к работе.  
**Внимание: Обязательно замените название таблицы и уже существующих полей на свои**

::: tabs
@tab [ PostgreSQL ]
```sql:no-line-numbers
-- Добавляет недостающие поля в таблицу
ALTER TABLE users
ADD COLUMN uuid CHAR(36) UNIQUE DEFAULT NULL,
ADD COLUMN accessToken CHAR(32) DEFAULT NULL,
ADD COLUMN serverID VARCHAR(41) DEFAULT NULL
ADD COLUMN hwidid BIGINT DEFAULT NULL;

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

-- Добавляет поле hwidid для поддержки HWID

-- Добавляет таблицу hwids
CREATE TABLE public.hwids (
	id serial8 NOT NULL,
	publickey bytea NULL,
	hwdiskid varchar NULL,
	baseboardserialnumber varchar NULL,
	graphiccard varchar NULL,
	displayid bytea NULL,
	bitness int NULL,
	totalmemory bigint NULL,
	logicalprocessors int NULL,
	physicalprocessors int NULL,
	processormaxfreq bigint NULL,
	battery boolean NULL,
	banned boolean NULL
);

-- Создает индексы для быстрого доступа к данным
ALTER TABLE public.hwids ADD CONSTRAINT hwids_pk PRIMARY KEY (id);
CREATE UNIQUE INDEX hwids_publickey_idx ON public.hwids (publickey);

-- Создает связь между таблицами
ALTER TABLE public.users ADD CONSTRAINT users_hwids_fk FOREIGN KEY (hwidid) REFERENCES public.hwids(id);
```
@tab [ MySQL/MariaDB ]

```sql:no-line-numbers
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

Поместите в раздел **"auth": {}** в LaunchServer.json

::: tabs
@tab [ PostgreSQL ]
```json:no-line-numbers
    "std": {
      "isDefault": true,
      "core": {
        "holder": {
          "driverClass": "org.postgresql.Driver",
          "jdbcUrl": "jdbc:postgresql://localhost:5432/database",
          "username": "username",
          "password": "password",
          "hikariMaxLifetime": 1800000,
          "initializeAtStart": false
        },
        "expireSeconds": 3600,
        "uuidColumn": "uuid",
        "usernameColumn": "username",
        "accessTokenColumn": "accesstoken",
        "passwordColumn": "password",
        "serverIDColumn": "serverid",
        "hardwareIdColumn": "hwidId",
        "tableHWID": "hwids",
        "tableHWIDLog": "hwidLog",
        "table": "users",
        "passwordVerifier": {
          "cost": 10,
          "type": "bcrypt"
        },
        "type": "sql"
      },
      "textureProvider": {
        "skinURL": "http://example.com/skins/%username%.png",
        "cloakURL": "http://example.com/cloaks/%username%.png",
        "type": "request"
      },
      "displayName": "Default",
      "visible": true
    },
```
@tab [ MariaDB ]
```json:no-line-numbers
    "std": {
      "isDefault": true,
      "core": {
        "holder": {
          "driverClass": "org.mariadb.jdbc.Driver",
          "jdbcUrl": "jdbc:mariadb://localhost:3306/database",
          "username": "username",
          "password": "password",
          "hikariMaxLifetime": 1800000,
          "initializeAtStart": false
        },
        "expireSeconds": 3600,
        "uuidColumn": "uuid",
        "usernameColumn": "username",
        "accessTokenColumn": "accesstoken",
        "passwordColumn": "password",
        "serverIDColumn": "serverid",
        "hardwareIdColumn": "hwidId",
        "tableHWID": "hwids",
        "tableHWIDLog": "hwidLog",
        "table": "users",
        "passwordVerifier": {
          "cost": 10,
          "type": "bcrypt"
        },
        "type": "sql"
      },
      "textureProvider": {
        "skinURL": "http://example.com/skins/%username%.png",
        "cloakURL": "http://example.com/cloaks/%username%.png",
        "type": "request"
      },
      "displayName": "Default",
      "visible": true
    },
```
@tab [ MySQL ]
```json:no-line-numbers
    "std": {
      "isDefault": true,
      "core": {
        "holder": {
          "driverClass": "com.mysql.cj.jdbc.Driver",
          "jdbcUrl": "jdbc:mysql://localhost:3306/database",
          "username": "username",
          "password": "password",
          "hikariMaxLifetime": 1800000,
          "initializeAtStart": false
        },
        "expireSeconds": 3600,
        "uuidColumn": "uuid",
        "usernameColumn": "username",
        "accessTokenColumn": "accesstoken",
        "passwordColumn": "password",
        "serverIDColumn": "serverid",
        "hardwareIdColumn": "hwidId",
        "tableHWID": "hwids",
        "tableHWIDLog": "hwidLog",
        "table": "users",
        "passwordVerifier": {
          "cost": 10,
          "type": "bcrypt"
        },
        "type": "sql"
      },
      "textureProvider": {
        "skinURL": "http://example.com/skins/%username%.png",
        "cloakURL": "http://example.com/cloaks/%username%.png",
        "type": "request"
      },
      "displayName": "Default",
      "visible": true
    },
```
:::

::: tip Настройте следующие конфигурации:
- [\[ PasswordVerifier \]](#конфигурация-passwordverifier)
- [\[ TextureProvider \]](../other/#textureprovider)
:::
Для работы HWID включите опцию ```enableHardwareFeature``` в ```protectHandler``` и измените его ```type``` на ```advanced```
::: tip Важно
Начиная с 5.2.9 метод SQL генерирует access и refresh токены. Refresh токен генерируется на основе имени пользователя, хеша пароля и секретной соли (legacySalt). После смены пароля access токен продолжит действовать в течении определенного в конфигурации времени и только после потребуется повторный вход. Если вы потеряете файлы в папке ```.keys``` ЛаунчСервера игроки будут вынуждены перелогиниться.
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

::::: tabs
@tab [ DOUBLE DIGESET ]
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
@tab [ DIGEST ]
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
@tab [ PHP BCRYPT ]
```json:no-line-numbers
"passwordVerifier": {
   "type": "bcrypt"
}
```
::: tip Примечания:
-  Проверяет пароль аналогично функции ```password_verify``` в языке PHP
-  Большинство современных CMS использует именно этот тип хеширования пароля
:::
@tab [ WORDPRESS PHPASS ]
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
