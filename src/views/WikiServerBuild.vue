<template>
  <div class="wiki">
    <h2>Поддерживаемые ядра серверов</h2>
    <p>
      Протестированные ядра: Fabric, Sponge, Thermos, KCaldron, UltraMine,
      Waterfall/BungeeCoed, Spigot/Bukkit. Некоторые можно скачать тут:
      <a class="link-animated" href="https://mirror.gravit.pro/servers/"
        >mirror.gravit.pro</a
      ><br />
    </p>
    <p>Непротестированы: Atom и другие</p>
    <p>Неработоспособны на текущий момент: Forge 1.13+</p>
    <h2>Особенности сборки некоторых ядер</h2>
    <p>Для любых ядер <b>требуется</b> установка ServerWrapper</p>
    <details>
      <summary tabindex="2">Сборка Forge/Sponge 1.12.2</summary>
      <p>
        Замените launchwrapper на
        <a
          href="https://mirror.gravit.pro/compat/launchwrapper-1.12-5.0.x-fixed.jar"
          >этот</a
        >. Обратите внимание - нужно именно заменить - новый лаунчвраппер должен
        находится по тому же пути и с тем же именем что и стандартный
      </p>
    </details>
    <details>
      <summary tabindex="2">Сборка Fabric 1.13+</summary>
      <p>
        Перед запуском ядра удалите authlib из стандартного minecraft.jar(а если
        запустили - очистите кеш фабрика в папке .fabric)
      </p>
      <p>
        После этого докиньте файлы библиотеки apache lang3 в classpath или
        ServerWrapper.jar
      </p>
    </details>
    <details>
      <summary tabindex="2">Сборка Spigot</summary>
      <p>
        Докиньте файлы библиотеки apache lang3 в classpath или
        ServerWrapper.jar, удалив перед этим стандартную authlib из
        minecraft.jar
      </p>
    </details>
    <details>
      <summary tabindex="2">Сборка PaperSpigot</summary>
      <p>
        Вам необходимо пропатчить исходники при сборке патчем из архива Захара
        (<a
          href="https://cdn.discordapp.com/attachments/478133900045189122/631184267975589908/srv-patches.7z"
          >закрепленное сообщение от Захара в канале #offtop нашего дискорд
          сервера</a
        >
        (файл paper.diff)<br />
        При необходимости докиньте файлы библиотеки apache lang3 в classpath или
        ServerWrapper.jar
      </p>
    </details>
    <details>
      <summary tabindex="2">Сборка Waterfall/BungeeCord</summary>
      <p>
        Вам необходимо пропатчить исходники при сборке патчем из архива Захара
        (<a
          href="https://cdn.discordapp.com/attachments/478133900045189122/631184267975589908/srv-patches.7z"
          >закрепленное сообщение от Захара в канале #offtop нашего дискорд
          сервера</a
        >
        (3 файла, начинающиеся с bungee)
      </p>
    </details>
    <h2>
      Скрипт развертывания ServerWrapper
      <div class="gtag gtag-easy">Это просто</div>
    </h2>
    <p>
      В 5.0.0 введен новый способ установки ServerWrapper'а - с помощью скрипта
      установки. Для его запуска выполните:
    </p>
    <pre v-highlightjs><code class="json">
    java -jar ServerWrapper.jar setup
</code></pre>
    <p>И следуйте инструкции по установке</p>
    <h2>Основы привязки лаунчера к серверу</h2>
    <p>
      <b>Main-Class</b> - точка входа, то с чего начинается выполнение. Его
      можно найти открыв jar файл ядра и посмотрев содержимое манифеста, либо
      скопировать из старого скрипта запуска
    </p>
    <p>
      <b>Class-Path</b> - путь, где JVM будет искать классы. Его можно найти
      открыв jar файл ядра и посмотрев содержимое манифеста, либо скопировать из
      старого скрипта запуска
    </p>
    <p>
      <b>Profile title</b> - имя профиля клиента, его можно посмотреть открыв в
      лаунчсервере папку profiles, открыв файл своего профиля и посмотрев на
      поле title. title в конфигурации ServerWrapper и title в профиле должны
      совпадать на 100%
    </p>
    <p>
      <b>Аккаунт сервера</b> - полноценный аккаунт с логином и паролем, который
      будет использоватья для авторизации сервера
    </p>
    <h3>Указание Main-Class в строке запуска</h3>
    <pre v-highlightjs><code class="json">
java -cp ServerWrapper.jar:{ClassPath вашего сервера} pro.gravit.launcher.server.ServerWrapper {ваш MainClass}
</code></pre>
    <h3>Указание Main-Class в конфигурации</h3>
    <p>
      Можно указать Main-Class в ServerWrapperConfig.json , тогда строка запуска
      будет выглядеть так:
    </p>
    <pre v-highlightjs><code class="json">
java -cp ServerWrapper.jar:{ClassPath вашего сервера} pro.gravit.launcher.server.ServerWrapper
</code></pre>
    <h2>Конфигурация ServerWrapperConfig.json</h2>
    <p>
      Необходимо скопировать public.key из директории лаунчсервера в директорию
      ServerWrapper
    </p>
    <p>
      Для успешной авторизации сервера необходимо наличие в базе данных
      специального аккаунта, от имени которого будет совершен вход
    </p>
    <p>
      Для 5.0.10 и ниже аккаунт сервера обязан обладать правом canServer, см
      ниже как прописать права
    </p>
    <pre v-highlightjs><code class="json">
{
  "title": "Action1.12", //Заголовок профиля, к которому привязывается сервер
  "projectname": "MineCraft", //Название вашего проекта
  "address": "localhost", //Адрес лаунчсервера(LEGACY)
  "port": 7240, // Порт лаунчсервера(LEGACY)
  "reconnectCount": 10, //максимальное число переподключений(LEGACY)
  "reconnectSleep": 1000, //Время ожидания перед новым подключением(LEGACY)
  "customClassPath": false, //Указание кастомного classPath в конфигурации
  "autoloadLibraries": false, //Автозагрузка библиотек из папки librariesDir
  "stopOnError": true, //Останавливать запуск при возникновении исключения
  "syncAuth": true, //Синхронность авторизации
  "mainclass": "org.bukkit.craftbukkit.Main", //Ваш Main-Class
  "login": "ServerBot", //Логин аккаунта, от имени котого будет совершен вход
  "password": "1111", //Пароль от аккаунта
  "auth_id": "std", //Тип авторизации
  "websocket":
  {
    "enabled": true,
    "address": "ws://localhost:9274/api" //Адрес лаунчсервера
  },
  "env": "STD" //Окружение
}
</code></pre>
  </div>
</template>
