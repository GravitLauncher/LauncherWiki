<template>
    <div class="wiki">
        <h2>Миграция с 5.1.X на 5.2.0</h2>
        <p>Изменения в структуре папок:</p>
        <ul>
            <li>Папка <codes>build</codes> больше не используется. Вместо неё лаунчсервер создает папку в temp dir ОС</li>
            <li>Ключи теперь находятся в папке <codes>.keys</codes>. Ключи в папке лаунчсервера игнорируются</li>
        </ul>
        <p>Порядок обновления:</p>
        <ul>
            <li>Обновите лаунчсервер до последней версии, включая библиотеки и модули</li>
            <li>Выполните команду помощи в миграции: <codes>config launchserver migrate</codes></li>
            <li>Добавьте недостающие поля в ваши профили: <codes>saveprofiles ИМЯ_ФАЙЛА_ПРОФИЛЯ</codes></li>
            <li>Проверьте возможность перейти на <router-link to="/auth#">AuthCoreProvider</router-link></li>
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
