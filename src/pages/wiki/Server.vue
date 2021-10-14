<template>
  <q-page padding>
    <doc-header name="compatibility">Совместимость</doc-header>
    <p>В настоящий момент поддерживаются:</p>
    <ul>
      <li>Все оригинальные ядра — Vanilla, Forge, Fabric, Bukkit</li>
      <li>Их форки: Sponge, Spigot, Paper и другие</li>
      <li>Связки Bukkit+Forge, Bukkit+Fabric, если их авторы не внесли дополнительных ошибок, мешающих работе запуска</li>
      <li>Прокси—серверы: BungeeCord, Waterfall (форк BungeeCord), Velocity</li>
    </ul>
    <doc-header name="serverwrapper">Использование ServerWrapper</doc-header>
    <p>Для привязки ServerWrapper к вашему серверу выполните следующие действия:</p>
    <ul>
      <li>Откройте лаунчсервер и введите команду <q-badge>token server HiTech</q-badge>, где HiTech - название вашего сервера. Скопируйте получившийся токен</li>
      <li>Перейдите в папку с вашим сервером, скопируйте туда ServerWrapper.jar из артефактов сборки и выполните команду <q-badge>java -jar ServerWrapper.jar  setup</q-badge></li>
      <li>Укажите название jar файла вашего серверного ядра, название сервера, адрес лаунчсервера и токен, полученный на первом этапе</li>
    </ul>
    <p>Дальнейшие действия зависят от вашего серверного ядра</p>
    <q-tabs v-model="serverType">
      <q-tab name="forge1.12" label="Forge/Sponge 1.12.2" />
      <q-tab name="authlib2" label="1.16.4+" />
      <q-tab name="proxy" label="Waterfall/BungeeCord/Velocity" />
    </q-tabs>
    <q-tab-panels v-model="serverType">
      <q-tab-panel name="forge1.12">
        <p>Скопируйте <a href='https://mirror.gravit.pro/compat/launchwrapper-1.12-5.0.x-fixed.jar'>этот</a> файл в <q-badge>libraries/net/minecraft/launchwrapper/1.12/launchwrapper-1.12.jar</q-badge> с заменой</p>
      </q-tab-panel>
      <q-tab-panel name="authlib2">
        <p>Скачайте <a href='https://mirror.gravit.pro/compat/authlib/2/LauncherAuthlib2-5.2.0.jar'>этот</a> файл и поместите его рядом с ServerWrapper.jar. Далее откройте ServerWrapper.jar любым архиватором и удалите из него всё содерджимое папки com/mojang. После чего откройте ваш скрипт запуска и перед ServerWrapper.jar допишите <q-badge>LauncherAuthlib.jar:</q-badge></p>
      </q-tab-panel>
      <q-tab-panel name="proxy">
        <p>Прокси серверы напрямую обращаются к серверам Mojang, минуя authlib, поэтому вы должны пропатчить их</p>
        <ul>
          <li><b>Waterfall</b> - Скачайте <a href='https://mirror.gravit.pro/compat/patch/Waterfall.patch'>патч</a>, переименуйте его в 0099-Waterfall.patch и скопируйте его в папку BungeeCord-Patches. Соберите waterfall командой <q-badge>./waterfall build</q-badge></li>
          <li><b>BungeeCord</b> - Скачайте <a href='https://mirror.gravit.pro/compat/patch/BungeeCord.patch'>патч</a>, скопируйте его в папку с репозиторием, примените его командой <q-badge>git am BungeeCord.patch</q-badge>. Соберите bungeecord командой <q-badge>mvn package -Dcheckstyle.skip</q-badge></li>
          <li><b>Velocity</b> (рекомендуется) - Скачайте <a href='https://mirror.gravit.pro/compat/patch/Velocity.patch'>патч</a>, скопируйте его в папку с репозиторием, примените его командой <q-badge>git am Velocity.patch</q-badge>. Соберите velocity командой <q-badge>./gradlew assemble</q-badge></li>
        </ul>
      </q-tab-panel>
    </q-tab-panels>
    <p>Конфигурация ServerWrapper:</p>
    <doc-code language='json' code='
{
  "projectname": "MineCraft", // Название проекта
  "address": "ws://ADDRESS/api", // Адрес лаунчсервера
  "serverName": "Vanilla1.17.1", // Название сервера в профиле
  "autoloadLibraries": false, // Автозагрузка библиотек из папки libraries
  "classpath": [], // Дополнительный classpath
  "mainclass": "io.papermc.paperclip.Paperclip", // Main-Class вашего ядра сервера
  "args": ["nogui"], // Аргументы запуска
  "oauthExpireTime": 0,
  "extendedTokens": { // Токены доступа
    "checkServer": "TOKEN"
  },
  "env": "STD"
}
' />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "PageDefault",
  data: function () {
    return {
      serverType: "forge1.12"
    };
  },
});
</script>
