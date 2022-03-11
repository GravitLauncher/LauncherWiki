# Настройка авторизации

**AuthCoreProvider**  является заменой тройке  AuthProvider,  AuthHandler,  HWIDHandler, выполняя все их функции в едином, связанном интерфейсе

Преимущества AuthCoreProvider:

-   Возможность использовать OAuth
-   Отсутствует дублирование подключения к БД
-   Единый интерфейс проверки пароля
-   Возможность модулям реализовывать поддержку дополнительных функций и получать дополнительные поля
-   Возможность модулям реализовывать авторизацию/регистрацию через соц.сети
-   Множество комманд для управления

Для использования команд AuthCoreProvider используйте  config auth.ВАШAUTHID.core КОМАНДА АРГУМЕНТЫ. Список команд вы можете посмотреть, нажав на TAB

AUTHID это 
```json
"std": { //то что здесь написано в данном случае std
  "core": {  },
  "isDefault": true,
  "displayName": "Default"
}
```
В данном случае команды будут выклядеть так: config auth.std.core КОМАНДА АРГУМЕНТЫ

## Конфигурация PasswordVerifier

Для настройки большинства способов авторизации через БД вам необходимо указать passwordVerifier, соответствующий вашей CMS на сайте. (секцию passwordVerifier можно будет встретить при конфигурировании метода [mysql](#метод-mysql) либо [postgresql](#метод-postgresql))

<CodeGroup>
  <CodeGroupItem title="DOUBLE DIGESET" active>

```json
    "passwordVerifier": {
      "algo": "SHA256",
      "toHexMode": true,
      "type": "doubleDigest"
    }
```

  Алгоритм doubleDigest  **дважды**  хеширует пароль одним алгоритмом без соли. Опция toHexMode определяет будут ли хешироваться бинарные данные (false) или HEX строка (true)
  Список доступных алгоритмов аналогичен способу digest

  Применяется в старых версиях DLE (алгоритм MD5) и в некоторых других CMS

  </CodeGroupItem>

  <CodeGroupItem title="DIGEST" active>

```json
    "passwordVerifier": {
      "algo": "SHA256",
      "type": "digest"
    }
```

  Алгоритм digest  **один раз**  хеширует пароль одним алгоритмом без соли
  Метод поддерживает любые алгоритмы хеширования, реализованные в вашей JDK или библиотеки BouncyCastle. Самые распространенные из них: MD5, SHA1, SHA256, SHA512

  </CodeGroupItem>

  <CodeGroupItem title="PHP BCRYPT" active>

```json
    "passwordVerifier": {
      "type": "bcrypt"
    }
```

  Проверяет пароль аналогично функции ```password_verify``` в языке PHP

  Большинство современных CMS использует именно этот тип хеширования пароля
  **Требуется установка модуля  [AddionalHash](https://github.com/GravitLauncher/LauncherModules/tree/master/AdditionalHash_module)**

  </CodeGroupItem>

  <CodeGroupItem title="WORDPRESS PHPASS" active>

```json
    "passwordVerifier": {
      "type": "phpass"
    }
```

  Проверяет пароль аналогично библиотеки ```PHPHASH``` в WordPress

  Используется в WordPress
  **Требуется установка модуля  [AddionalHash](https://github.com/GravitLauncher/LauncherModules/tree/master/AdditionalHash_module)**

  </CodeGroupItem>


</CodeGroup>


## Привилегии

Лаунчер предоставляет систему привилегий для определения того, какие действия может совершить пользователь. Примеры permissions (**К сожалению, в данный момент новая система permissions недоступна в способе MySQL**)

-   ```*``` - все привилегии
-   ```launchserver.*``` - все привилегии, проверяемые на стороне лаунчсервера
-   ```launcher.*``` - все привилегии, проверяемые на стороне лаунчера
-   ```launchserver.profiles.hitech.*``` - разрешает показ в лаунчере и вход в профиль hitech (в нижнем регистре)
-   ```launcher.runtime.optionals.hitech.*``` - разрешает управлять всеми опциональными модами в профиле hitech

::: tip Примечания:

-   Все профили по умолчанию доступны всем, вне зависимости от permissions. Установите в профиле поле ```limited``` в true, чтобы ограничить доступ к профилю по permissions
-   Все опциональные моды по умолчанию доступны всем, вне зависимости от permissions. Установите в опциональном моде поле ```limited``` в true, чтобы ограничить доступ к профилю по permissions
-   ```profileWhitelist``` не относится к привилегиям, но для его работы, требуется установить в профиле поле ```limited``` в true
-   Профиль может записываться с помощью title в нижнем регистре (hitech) или с помощью его UUID (f210e1f0-c24e-41b6-9214-cee9a9139823). Второй вариант записи предпочтительней, так как не зависит от языка и не содержит спец. символов

:::

## Метод Memory

Не требует пароль для входа. Подходит для тестирования и серверов в локальной сети.

```json
    "memory": {
      "core": {
        "type": "memory"
      }
    }
```

::: warning Важно:
Этот метод никак не проверяет serverId и accessToken пользователя, а так же не гарантирует сохранения UUID после рестарта. Это означает, что на сервер можно войти с любого лаунчера под любым логином, а трафик minecraft может быть подвержен MITM атаке. Если вам необходимо контролировать вход на сервер и при этом у вас нет базы данных - используйте [FileAuthSystem](../auth/#метод-fileauthsystem)
:::

## Метод MySQL

Этот способ подходит, если:

-   У вас есть сайт или сервис с БД MySQL/MariaDB, через который пользователи могут зарегистрироваться
-   У лаунчсервера есть прямой доступ к БД
-   В БД пароли хранятся в одном столбце, в таблице пользователей

Выполните следующие SQL запросы для создания таблицы с HWID и необходимых полей:

```sql
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

Настройте лаунчсервер

```json
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
```

Для работы HWID включите опцию enableHardwareFeature в protectHandler

## Метод PostgreSQL

Метод postgresql не работает HWID на момент 5.2.7

Выполните следующий SQL код для добавления новых полей и триггера:

```sql
-- Добавляет недостающие поля в таблицу
ALTER TABLE users
ADD COLUMN uuid CHAR(36) UNIQUE DEFAULT NULL,
ADD COLUMN accessToken CHAR(32) DEFAULT NULL,
ADD COLUMN serverID VARCHAR(41) DEFAULT NULL;

-- Добавляет расширение для генерации UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Добавляет триггер для генерации UUID
CREATE OR REPLACE FUNCTION public.users_uuid_trigger_func()
    RETURNS trigger
    LANGUAGE plpgsql
AS $function$
    BEGIN
        new.uuid = (SELECT uuid_generate_v4());
        return new;
    END;
$function$
CREATE trigger users_uuid_trigger
    BEFORE INSERT ON users
    FOR EACH ROW
    EXECUTE PROCEDURE users_uuid_trigger_func();

-- Генерирует UUID для уже существующих пользователей
UPDATE users SET uuid=(SELECT uuid_generate_v4()) WHERE uuid IS NULL;
```

Пример конфигурации:

```json
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
    "table": "users",
    "tableHwid": "hwids",
    "uuidColumn": "uuid",
    "usernameColumn": "username",
    "passwordColumn": "password",
    "accessTokenColumn": "accessToken",
    "serverIDColumn": "serverID"
  },

```

## Метод http

Следуйте инструкции к вашему скрипту или обратитесь к  [этой](../dev/#реализация-oauth)  инструкции для создания собственного скрипта

## Метод fileauthsystem

Установите модуль  [FileAuthSystem](https://github.com/GravitLauncher/LauncherModules/tree/master/FileAuthSystem_module)

## Несколько авторизаций

**ВНИМАНИЕ, ЕСЛИ КОПИРУЕТЕ С МОЕГО ГАЙДА ТО УБЕРИТЕ ВСЕ КОММЕНТАРИИ** - Это ```//текст```
Чтобы сделать несколько типов авторизаций, например Site, Microsoft вы должны:
Сделать несколько версий authCoreProvider
**И делать по гайду.**
```json
"auth": {
  "std": {
    "core": {Ваш настроенный ОДИН из AuthCore},
    //Здесь можно написать TextureProvider - https://launcher.gravit.pro/other/#textureprovider если вы хотите использовать свою систему скинов и плащей
    "isDefault": true, // Основной ли это способ авторизации?
    "displayName": "Default" // Имя отображаемое в лаунчере
  }, // Не забудьте запятую
  "Microsoft" // Название вашего второго типа(Не отображается в лаунчере)
    "core": {Ваш второй AuthCore},
    "isDefault": false, // Должно быть ТОЛЬКО одно true
    "Microsoft" // Имя отображаемое в лаунчере
  }, // Если надо добавить еще варианты то пишем запятую и повторяем действия, если не то закрываем
}, // Это закрытие скобки "auth" 
```

