<template>
  <q-page padding>
    <doc-header name="compatibility">Совместимость</doc-header>
    <p>В настоящий момент поддерживаются:</p>
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
      <q-tab name="waterfall" label="Waterfall" />
    </q-tabs>
    <q-tab-panels v-model="serverType">
      <q-tab-panel name="forge1.12">
        <p>Скопируйте <a href='https://mirror.gravit.pro/compat/launchwrapper-1.12-5.0.x-fixed.jar'>этот</a> файл в <q-badge>libraries/net/minecraft/launchwrapper/1.12/launchwrapper-1.12.jar</q-badge> с заменой</p>
      </q-tab-panel>
      <q-tab-panel name="authlib2">
        <p>Скачайте <a href='https://mirror.gravit.pro/compat/authlib/2/LauncherAuthlib2-5.2.0.jar'>этот</a> файл и поместите его рядом с ServerWrapper.jar. Далее откройте ServerWrapper.jar любым архиватором и удалите из него всё содерджимое папки com/mojang. После чего откройте ваш скрипт запуска и перед ServerWrapper.jar допишите <q-badge>LauncherAuthlib.jar:</q-badge></p>
      </q-tab-panel>
      <q-tab-panel name="waterfall">
        <p>Вам необходимо <b>собрать из исходников</b> Waterfall c <a href='https://mirror.gravit.pro/compat/patch/0060-Waterfall-UseAuthlib.patch'>этим</a> патчем</p>
      </q-tab-panel>
    </q-tab-panels>
    <p></p>
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
