<template>
  <div class="wiki">
    <h2>Поддерживаемые ядра серверов</h2>
    <p>
      Протестированные ядра: Fabric, Sponge, Thermos, KCaldron, UltraMine,
      Waterfall/BungeeCord, Spigot/Bukkit, Mohist. Некоторые можно скачать тут:
      <a class="link-animated" href="https://mirror.gravit.pro/servers/"
        >mirror.gravit.pro</a
      ><br />
    </p>
    <p>Непротестированы: Atom и другие</p>
    <h2>Особенности сборки некоторых ядер</h2>
    <p>Для любых ядер <b>требуется</b> установка ServerWrapper</p>
    <sploiler link="authlib2"><template #header>Сборка AuthLib 2 для 1.16.4+ <gtag type="important">Важно</gtag></template>
      <p>
        Для работы online-mode на 1.16.4 и выше вам понадобится специальные authlib-clean и LauncherAuthlib<br>
authlib-clean это <a href="https://libraries.minecraft.net/com/mojang/authlib/2.0.27/authlib-2.0.27.jar">официальный authlib</a>, откуда вы должны будете удалить все те классы что есть в LauncherAuthlib.<br>
Ссылка на новый LauncherAuthlib - <a href="https://mirror.gravit.pro/compat/authlib/2/LauncherAuthlib.jar">LauncherAuthlib 2</a> (только 1.16.4+)<br>
При настройке сервера из jar файла ServerWrapper удалите старый authlib и последовательно закиньте сначало все содержимое authlib-clean, а потом все содержимое LauncherAuthlib
      </p>
    </sploiler>
    <sploiler><template #header>Сборка Forge/Sponge 1.12.2</template>
      <p>
        Замените launchwrapper на
        <a
          href="https://mirror.gravit.pro/compat/launchwrapper-1.12-5.0.x-fixed.jar"
          >этот</a
        >. Обратите внимание - нужно именно заменить - новый лаунчвраппер должен
        находится по тому же пути и с тем же именем что и стандартный
      </p>
    </sploiler>
    <sploiler><template #header>Сборка Fabric 1.13+</template>
      <p>
        Перед запуском ядра удалите authlib из стандартного minecraft.jar(а если
        запустили - очистите кеш фабрика в папке .fabric)
      </p>
      <p>
        После этого докиньте файлы библиотеки apache lang3 в classpath или
        ServerWrapper.jar
      </p>
    </sploiler>
    <sploiler><template #header>Сборка Mohist 1.13+</template>
      <p>
        Для запуска Mohist необходимо использовать Java 11. При этом укажите <codes v-if="version < 50200">-javaagent:НАЗВАНИЕ_ФАЙЛА_ЯДРА.jar</codes> <codes v-if="version >= 50200">-javaagent:ServerWrapper.jar -Dserverwrapper.agentproxy=com.mohistmc.util.JarLoader</codes> в start.sh/start.bat
      </p>
      <p>
        После этого докиньте файлы библиотеки apache lang3 в classpath или
        ServerWrapper.jar
      </p>
    </sploiler>
    <sploiler><template #header>Сборка Spigot/Paper</template>
      <p>
        Докиньте файлы библиотеки apache lang3 в classpath или
        ServerWrapper.jar, удалив перед этим стандартную authlib из
        minecraft.jar
      </p>
      <p><i>Если возникает ошибка NoSuchMethodError при установке Paper 1.16.3 и ниже <a href="https://mirror.gravit.pro/compat/authlib/1/LauncherAuthlib.jar">скачайте</a> и замените в ServerWrapper.jar authlib версии 1</i></p>
    </sploiler>
    <sploiler><template #header>Сборка устаревших версий Waterfall/BungeeCord</template>
      <p>
        Вам необходимо пропатчить исходники при сборке патчем из архива Захара
        <a
          href="https://cdn.discordapp.com/attachments/478133900045189122/631184267975589908/srv-patches.7z"
          >закрепленное сообщение от Захара в канале #offtop нашего дискорд
          сервера</a
        >
        (3 файла, начинающиеся с bungee)
      </p>
    </sploiler>
    <sploiler><template #header>Сборка актуальной версии Waterfall</template>
      <p>
        Вам необходимо пропатчить исходники при сборке новым патчем
        <a
          href="https://cdn.discordapp.com/attachments/636581601048002582/799353410398060634/0060-UseAuthlib.patch"
          >закрепленное сообщение от Гравиты в нашем Discord канале</a
        >
      </p>
    </sploiler>
    <h2>
      Скрипт развертывания ServerWrapper
      <gtag type="easy">Это просто</gtag>
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
    <p v-if="version <= 50108">
      <b>Profile title</b> - имя профиля клиента, его можно посмотреть открыв в
      лаунчсервере папку profiles, открыв файл своего профиля и посмотрев на
      поле title. title в конфигурации ServerWrapper и title в профиле должны
      совпадать на 100%
    </p>
    <p v-if="version >= 50109">
      <b>ServerName</b> - имя профиля сервера, его можно посмотреть открыв в
      лаунчсервере папку profiles, открыв файл своего профиля и в секции servers посмотрев на
      поле name. serverName в конфигурации ServerWrapper и name в профиле должны совпадать для работы
      интеграционных плагинов к серверу
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
<script>
import coremethods from '@/components/core-methods.js'
export default {
  mixins: [coremethods],
  created: function () {}
}
</script>
