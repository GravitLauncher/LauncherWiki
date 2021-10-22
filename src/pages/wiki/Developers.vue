<template>
  <q-page padding>
    <doc-header name="maven">Подключение зависимостей Gradle</doc-header>
    <p>
      Для написания модулей для лаунчсервера вам нужно подключить следующие
      библиотеки:
    </p>
    <doc-code
      code='
    implementation "pro.gravit.launcher:launcher-core:5.2.3"
    implementation "pro.gravit.launcher:launcher-ws-api:5.2.3"
    implementation "pro.gravit.launcher:launchserver-api:5.2.3"'
    />
    <p>
      Для написания модулей для лаунчера вам нужно подключить следующие
      библиотеки:
    </p>
    <doc-code
      code='
    implementation "pro.gravit.launcher:launcher-core:5.2.3"
    implementation "pro.gravit.launcher:launcher-ws-api:5.2.3"
    implementation "pro.gravit.launcher:launcher-client-api:5.2.3"'
    />
    <doc-header name="modules">Написание модуля</doc-header>
    <p>
      Загрузка модулей происходит из папки modules. Менеджер модулей открывает
      по очереди все jar и смотрит на параметр Module-Main-Class в манифесте JAR
      файла.
    </p>
    <p>
      Главный класс модуля - это класс, наследуемый от
      <b>pro.gravit.launcher.modules.LauncherModule</b> и реализующий метод
      init(LauncherInitContext initContext)
    </p>
    <p>
      Метод init вызывается при инициализации модуля на ранних этапах запуска
      лаунчера или лаунчсервера. Поэтому реализовывать логику внутри метода init
      <b>запрещенно</b>. Внутри метода init разрешается обращаться только к
      методам modulesManager и initContext, при этом при статической загрузке
      модуля initContext = null, а при динамической загрузке модуля через
      команду loadModule он будет содержать инстанс контекста, из которого можно
      получить доступ к LaunchServer
    </p>
    <h4>События(евенты)</h4>
    <p>
      Всё что можно сделать из init - загружать другие модули, получать их
      инстансы и, самое важное, <b>подписаться на события</b>. Это единственный
      правильный способ реализовывать логику. При наступлении события менеджер
      модулей последовательно проходится по всем модулям в порядке приоритета и
      вызывает соответствующие обработчики
    </p>
    <p>Встроеные события находятся в pro.gravit.launcher.modules.event</p>
    <p>
      События лаунчсервера находятся в pro.gravit.launchserver.modules.events.
      Вы должны использовать при работе с лаунчсервером, так как внутри них
      содержится инстанс LaunchServer - главный объект лаунчсервера
    </p>
    <p>
      События лаунчера находятся в pro.gravit.launcher.client.events. Они
      отвечают за основные события, происходящие в клиентской части лаунчера
    </p>
    <p>
      Для подписки на событие вы должны создать метод в вашем классе,
      принимающий 1 аргумент соответствующий типу события, которое вы хотите
      обрабатывать, после чего в методе init вы должны вызвать метод
      registerEvent, первый аргумент которого - ваш метод-обработчик, второй
      аргумент - класс интересующего вас события
    </p>
    <p>
      Обратите внимание при загрузке модуля через loadModule события, которые
      уже прошли не вызываются, вместо этого вам передается initContext
    </p>
    <doc-header name="external">Внешние API</doc-header>
    <p>
      Вы можете использовать некоторые API лаунчера извне в вашем моде
      Minecraft. Вот список пакетов, к которым можно обращатся извне:
    </p>
    <ul>
      <li><b>pro.gravit.utils</b> - утилитные классы и хелперы</li>
      <li>
        <b>pro.gravit.launcher.events</b> - ответы на запросы к лаунчсерверу и
        отдельные события
      </li>
      <li><b>pro.gravit.launcher.request</b> - запросы к лаунчсерверу</li>
      <li>
        <b>pro.gravit.launcher.api</b> - Информация о текущем пользователе и
        профиле
      </li>
    </ul>
    <doc-header name="auth">Написание AuthCoreProvider</doc-header>
    <p>
      Для интеграции собственных CMS и сайтов с лаунчером рекомендуется написать свой AuthCoreProvider. Для этого
      Создайте класс наследник AuthCoreProvider и реализуйте обязательные методы <router-link to="/developers#oauth">oauth</router-link> после чего
      реализуйте необходимые вам расширения:
    </p>
    <p>
      Расширения класса AuthCoreProvider
    </p>
    <ul>
      <li><b>AuthSupportExit</b> - вы поддерживаете методы завершения сессии пользователя</li>
      <li><b>AuthSupportGetAllUsers</b> - вы поддерживаете метод получения всех пользователей</li>
      <li><b>AuthSupportGetSessionsFromUser</b> - вы поддерживаете получение списка сессий пользователя</li>
      <li><b>AuthSupportHardware</b> - вы поддерживаете работу с HWID <q-badge>важно</q-badge></li>
      <li><b>AuthSupportRegistration</b> - вы поддерживаете регистрацию пользователей</li>
      <li><b>AuthSupportUserBan</b> - вы поддерживаете методы ban и unban</li>
    </ul>
    <p>
      Расширения класса User
    </p>
    <ul>
      <li><b>UserSupportTextures</b> - ваш объект User хранит и предоставляет информацию о скинах и плащах.
      Вы должны вернуть соответствующие текстуры с метаданными при их наличии. При использовании этих методов TextureProvider больше не требуется</li>
      <li><b>UserSupportHardware</b> - ваш объект User хранит информацию о железе пользователя</li>
      <li><b>UserSupportBanInfo</b> - ваш объект User хранит информацию о банах пользователя</li>
      <li><b>UserSupportAdditionalData</b> - ваш объект User поддерживает кастомные параметры(такие как email, монеты и т.д.)</li>
    </ul>
    <doc-header name="oauth">Реализация OAuth</doc-header>
    <p>
      OAuth в лаунчере позволяет использовать временные токены доступа(access) вместо устаревшей системы сессий. Этот метод отлично подойдет для
      интеграции собственных CMS с лаунчером
    </p>
    <p>
      Для работы с OAuth вам необходимо реализовать соответствующие методы
      <codes>getUserSessionByOAuthAccessToken</codes>,
      <codes>refreshAccessToken</codes>, а в методе
      <codes>createOAuthSession</codes> вернуть результат с данными OAuth
    </p>
    <h4>Порядок авторизации с OAuth</h4>
    <ul>
      <li>
        Первым шагом идет получение объекта User с помощью метода
        <codes>getUserByLogin</codes>, который по умолчанию вызывает метод
        <codes>getUserByUsername</codes>
      </li>
      <li>
        Вторым шагом вызывается <codes>verifyAuth</codes>. В этом методе вы
        должны проверить допустима ли авторизация для этого соеденения и бросить
        исключение <codes>AuthException</codes> если это не так
      </li>
      <li>
        Третьим шагом выполняется проверка пароля с помощью метода
        <codes>verifyPassword</codes>. Вы <b>не должны</b> кидать исключения в
        этом методе
      </li>
      <li>
        Четвертым шагом выполняется создание сессии и получение accessToken
        майнкрафта с помощью метода <codes>createOAuthSession</codes>. Если
        пользователь забанен, не активирован или с ним еще какие то проблемы вам
        нужно кинуть исключение <codes>AuthException</codes> с текстом ошибки.
        Вы должны отдать minecraftAccessToken только если параметр
        <codes>minecraftAccess</codes> true. В противном случае вы должны отдать
        null.
      </li>
      <li>Авторизация завершена</li>
    </ul>
    <p>
      При необходимости пользователю обновить свой истекший accessToken будет
      вызван метод <codes>refreshAccessToken</codes>. В нем вы должны обновить
      accessToken <b>и refreshToken(если это возможно)</b> и вернуть их
      пользователю. Выставление параметра <codes>expire</codes> в 0 делает токен
      вечным
    </p>
    <p>
      При повторной авторизации вызывается метод
      <codes>getUserSessionByOAuthAccessToken</codes>, который должен вернуть
      объект UserSession с находящимся внутри объектом User. Метод
      <codes>getId</codes> должен возвращать ID сессии если это возможно. Если в
      вашей системе сессий нет ID - то он должен генерироватся при создании
      объекта UserSession.
    </p>
    <h4>Особые случаи</h4>
    <ul>
      <li>
        Иногда невозможно определить логин пользователя на стадии авторизации.
        Например так будет при авторизации через WebView(сайт). В этом случае
        порядок авторизации немного изменится
        <ul>
          <li>
            Метод <codes>getUserByLogin</codes> не будет вызван. Первый шаг
            пропускается
          </li>
          <li>
            Третьим шагом будет вызван метод <codes>verifyPassword</codes> с
            параметром user равным null. В ответ вы должны вернуть объект
            собственного класса, наследующегося от PasswordVerifyReport, куда
            сохранить необходимые данные
          </li>
          <li>
            Четвертым шагом будет вызван метод
            <codes>createOAuthSession</codes> с параметром user равным null и
            объектом report, полученным на предыдущем этапе. В ответ вы
            <b>обязаны</b> вернуть сессию с заполненным полем user, иначе
            получите ошибку
          </li>
        </ul>
      </li>
    </ul>
  </q-page>
</template>

<script>
import DocCode from "src/components/DocCode.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { DocCode },
  name: "PageDefault",
  data: function () {
    return {};
  },
});
</script>
