<template>
    <div class="wiki">
        <h2>Миграция с 5.1.X на 5.2.0</h2>

        <b-alert
          variant="danger"
          show
          >Версия <b>5.2.0</b> сейчас находится в стадии бета тестирования</b-alert>
        <p>Изменения в структуре папок:</p>
        <ul>
            <li>Папка <codes>build</codes> больше не используется. Вместо неё лаунчсервер создает папку в temp dir ОС</li>
            <li>Ключи теперь находятся в папке <codes>.keys</codes>. Ключи в папке лаунчсервера игнорируются</li>
            <li>Файл <codes>.updates-cache</codes> хранит кеш updates</li>
        </ul>
        <p>Ключевые изменения при работе с лаунчсервером:</p>
        <ul>
          <li>Вы не сможете включить отладку старыми способами(через команду <codes>debug</codes>, аргументы JVM или указание <codes>env</codes></li>
          <li>Логи лаунчсервера хранятся в папке <codes>logs</codes></li>
          <li>Профили генерируются автоматически</li>
        </ul>
        <p>Порядок обновления:</p>
        <ul>
            <li>Обновите лаунчсервер до последней версии, включая библиотеки и модули</li>
            <li>Создайте компонент ProGuard: <codes>component load proguard proguard</codes></li>
            <li>Добавьте недостающие поля в ваши профили: <codes>saveprofiles ИМЯ_ФАЙЛА_ПРОФИЛЯ</codes> ИЛИ пересоздайте профиль командой <codes>makeprofile</codes></li>
            <li>Обновите authlib в своих клиентах</li>
            <li>Проверьте возможность перейти на <router-link to="/auth">AuthCoreProvider</router-link>. Вы можете сбросить конфигурацию AuthProvider/AuthHandler с помощью <codes>config launchserver resetauth std</codes></li>
            <li>Проверьте свои модули <a href="https://github.com/GravitLauncher/LauncherModules">тут</a> и при необходимости удалите устаревшие</li>
            <li>Сохраните изменения в конфиге <codes>config launchserver save</codes></li>
        </ul>
        <p>AuthProvider/AuthHandler/DAO <b>будут поддерживаться некоторое время после релиза 5.2.0</b> прежде чем будут удалены</p>
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
