<template>
  <div class="wiki">
    <h2>Настройка ProtectHandler</h2>
    <p>
            ProtectHandler часть находится в состоянии активной разработки. В
            дальнейшем будут появлятся всё новые и новые возможности
          </p>
          <h3>Способ none</h3>
          <p>Полностью отсутствует защита</p>
          <pre v-highlightjs><code class="json">
"protectHandler": {
    "type": "none"
}
</code></pre>
          <div v-if="version > 50104">
            <h3>Способ std</h3>
            <p>Стандартный protectHandler</p>
            <ul>
              <li>
                Токен авторизации можно получить только если authType CLIENT и
                пройдена проверка хеша лаунчера
              </li>
              <li>
                Получить и сменить профиль можно только если пройдена проверка
                на белый список
              </li>
              <li>
                Получить можно только такие папки updates: assets выбранного
                клиента, папка выбранного клиента, все папки из allowUpdates
              </li>
            </ul>
            <pre v-highlightjs><code class="json">
"protectHandler": {
    "profileWhitelist": { "Ваш UUID профиля": ["Ник1", "Ник2"] }, //Использование вайтлиста
    "allowUpdates": [],
    "type": "std"
  }
</code></pre>
          </div>
          <div v-if="version >= 50107">
            <h3>Способ advanced</h3>
            <p>Включает в себя все функции std а так же:</p>
            <ul>
              <li>Включает механизмы TrustLevel и обмен ключами с клиентом</li>
              <li>Включает обработку SecurityReport от нативных защит</li>
              <li>Можно включить обработку HardwareInfo и баны по железу</li>
            </ul>
            <p>Стандартная конфигурация без hardwareFeature</p>
            <pre v-highlightjs><code class="json">
"protectHandler": {
    "profileWhitelist": { "Ваш UUID профиля": ["Ник1", "Ник2"] }, //Использование вайтлиста
    "allowUpdates": [],
    "type": "advanced"
  }
</code></pre>
          </div>
          <div v-if="version >= 50107">
            <h3>Настройка HWIDProvider</h3>
            <p>
              HWIDProvider является частью advanced protectHandler и позволяет
              выдавать баны по железу, собирать статистику железа пользователя и
              отслеживать мультиакки. Конфигурации:
            </p>
            <p>
              Настройка HWIDHandler для версий ниже 5.1 находится
              <a href="?r=wiki%2Fpage&page=hwidhandler">тут</a>
            </p>
            <h4>Способ memory</h4>
            <pre v-highlightjs><code class="json">
"protectHandler": {
    "profileWhitelist": {},
    "allowUpdates": [],
    "enableHardwareFeature": true,
    "provider": {
        "warningSpoofingLevel": 0.5, // предупреждение в консоль при уровне спуфигна hwid выше указанного значения. Отрицательные значения отключают эту фитчу
        "criticalCompareLevel": 1.0, // самый важный параметр - уровень совпадения HWID
        "type": "memory"
    },
    "type": "advanced"
  }
</code></pre>
            <p>
              Используя этот способ вы можете посмотреть собарнные HIWD командой
              <span class="codes">config protecthandler hardwarelist</span>.
              Забанить HWID -
              <span class="codes">config protecthandler hardwareban [ID]</span>,
              где ID вы берете из вывода первой команды
            </p>
            <h4>Способ mysql</h4>
            <pre v-highlightjs><code class="json">
"protectHandler": {
    "profileWhitelist": {},
    "allowUpdates": [],
    "enableHardwareFeature": true,
    "provider": {
        "warningSpoofingLevel": 0.5, // предупреждение в консоль при уровне спуфигна hwid выше указанного значения. Отрицательные значения отключают эту фитчу
        "criticalCompareLevel": 1.0, // самый важный параметр - уровень совпадения HWID
        "mySQLHolder": { //Все параметры аналогичны mySQLHolder из AUthProvider/AuthHandler
            "address": "localhost",
            "port": 3306,
            "username": "launchserver",
            "password": "xxxxx",
            "database": "launchserver?serverTimezone=UTC",
            "timezone": "UTC"
        },
        "type": "mysql"
    },
    "type": "advanced"
  }
</code></pre>
            <p>
              Выполните следующие SQL запросы что бы создать таблицы для работы
              mysql hwid provider
            </p>
            <p v-if="version >= 50200">
              Начиная с 5.2.0 в HWID входит информация о видеокарте
            </p>
            <pre v-if="version < 50200" v-highlightjs><code class="sql">
CREATE TABLE `hwidLog` (
  `id` bigint(20) NOT NULL,
  `hwidId` bigint(20) NOT NULL,
  `newPublicKey` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `hwids` (
  `id` bigint(20) NOT NULL,
  `publickey` blob,
  `hwDiskId` varchar(255) DEFAULT NULL,
  `baseboardSerialNumber` varchar(255) DEFAULT NULL,
  `displayId` blob,
  `bitness` int(11) DEFAULT NULL,
  `totalMemory` bigint(20) DEFAULT NULL,
  `logicalProcessors` int(11) DEFAULT NULL,
  `physicalProcessors` int(11) DEFAULT NULL,
  `processorMaxFreq` bigint(11) DEFAULT NULL,
  `battery` tinyint(1) NOT NULL DEFAULT '0',
  `banned` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `hwidLog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hwidId` (`hwidId`);
ALTER TABLE `hwids`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `publickey` (`publickey`(255));
ALTER TABLE `hwidLog`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
ALTER TABLE `hwids`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
ALTER TABLE `hwidLog`
  ADD CONSTRAINT `hwidLog_ibfk_1` FOREIGN KEY (`hwidId`) REFERENCES `hwids` (`id`);
</code></pre>
            <pre v-if="version >= 50200" v-highlightjs><code class="sql">
CREATE TABLE `hwidLog` (
  `id` bigint(20) NOT NULL,
  `hwidId` bigint(20) NOT NULL,
  `newPublicKey` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `hwids` (
  `id` bigint(20) NOT NULL,
  `publickey` blob,
  `hwDiskId` varchar(255) DEFAULT NULL,
  `graphicCard` varchar(255) DEFAULT NULL,
  `baseboardSerialNumber` varchar(255) DEFAULT NULL,
  `displayId` blob,
  `bitness` int(11) DEFAULT NULL,
  `totalMemory` bigint(20) DEFAULT NULL,
  `logicalProcessors` int(11) DEFAULT NULL,
  `physicalProcessors` int(11) DEFAULT NULL,
  `processorMaxFreq` bigint(11) DEFAULT NULL,
  `battery` tinyint(1) NOT NULL DEFAULT '0',
  `banned` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `hwidLog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hwidId` (`hwidId`);
ALTER TABLE `hwids`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `publickey` (`publickey`(255));
ALTER TABLE `hwidLog`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
ALTER TABLE `hwids`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
ALTER TABLE `hwidLog`
  ADD CONSTRAINT `hwidLog_ibfk_1` FOREIGN KEY (`hwidId`) REFERENCES `hwids` (`id`);
</code></pre>
          </div>
  </div>
</template>
<script>
import coremethods from '@/components/core-methods.js'
export default {
  mixins: [coremethods],
  created: function () {}
}
</script>
