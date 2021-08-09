<template>
    <div class="wiki">
        <b-alert
        variant="danger"
        :show="version < 50200"
        >Доступно только с <b>5.2.0</b></b-alert>
        <h2>Работа с OAuth в AuthCoreProvider</h2>
        <p>Для работы с OAuth вам необходимо реализовать соответствующие методы <codes>getUserSessionByOAuthAccessToken</codes>, <codes>refreshAccessToken</codes>, а в методе <codes>createOAuthSession</codes> вернуть результат с данными OAuth</p>
        <p>Если вы не хотите использовать OAuth, то методы <codes>getUserSessionByOAuthAccessToken</codes>, <codes>refreshAccessToken</codes> должны возвращать <b>null</b>, а метод <codes>createOAuthSession</codes> должен возвращать только minecraftAccessToken</p>
        <h3>Порядок авторизации с OAuth</h3>
        <ul>
            <li>Первым шагом идет получение объекта User с помощью метода <codes>getUserByLogin</codes>, который по умолчанию вызывает метод <codes>getUserByUsername</codes></li>
            <li>Вторым шагом вызывается <codes>verifyAuth</codes>. В этом методе вы должны проверить допустима ли авторизация для этого соеденения и бросить исключение <codes>AuthException</codes> если это не так</li>
            <li>Третьим шагом выполняется проверка пароля с помощью метода <codes>verifyPassword</codes>. Вы <b>не должны</b> кидать исключения в этом методе</li>
            <li>Четвертым шагом выполняется создание сессии и получение accessToken майнкрафта с помощью метода <codes>createOAuthSession</codes>. Если пользователь забанен, не активирован или с ним еще какие то проблемы вам нужно кинуть исключение <codes>AuthException</codes> с текстом ошибки. Вы должны отдать minecraftAccessToken только если параметр <codes>minecraftAccess</codes> true. В противном случае вы должны отдать null. Если вы не передаете accessToken/refreshToken, то вы не используете OAuth</li>
            <li>Авторизация завершена</li>
        </ul>
        <p>При необходимости пользователю обновить свой истекший accessToken будет вызван метод <codes>refreshAccessToken</codes>. В нем вы должны обновить accessToken <b>и refreshToken(если это возможно)</b> и вернуть их пользователю. Выставление параметра <codes>expire</codes> в 0 делает токен вечным</p>
        <p>При повторной авторизации вызывается метод <codes>getUserSessionByOAuthAccessToken</codes>, который должен вернуть объект UserSession с находящимся внутри объектом User. Метод <codes>getId</codes> должен возвращать ID сессии если это возможно. Если в вашей системе сессий нет ID - то он должен генерироватся при создании объекта UserSession.</p>
        <h3>Особые случаи</h3>
        <ul>
            <li>Иногда невозможно определить логин пользователя на стадии авторизации. Например так будет при авторизации через WebView(сайт). В этом случае порядок авторизации немного изменится
                <ul>
                    <li>Метод <codes>getUserByLogin</codes> не будет вызван. Первый шаг пропускается</li>
                    <li>Третьим шагом будет вызван метод <codes>verifyPassword</codes> с параметром user равным null. В ответ вы должны вернуть объект собственного класса, наследующегося от PasswordVerifyReport, куда сохранить необходимые данные</li>
                    <li>Четвертым шагом будет вызван метод <codes>createOAuthSession</codes> с параметром user равным null и объектом report, полученным на предыдущем этапе. В ответ вы <b>обязаны</b> вернуть сессию с заполненным полем user, иначе получите ошибку</li>
                </ul>
            </li>
        </ul>
        <h3>Реализация OAuth на JsonCoreProvider</h3>
        <p>Список endpoint'ов</p>
        <ul>
            <li>getUserByUsernameUrl - [обязателен]</li>
            <li>getUserByLoginUrl - [опционально] при отсутствии используется getUserByUsernameUrl</li>
            <li>getUserByUUIDUrl - [обязателен]</li>
            <li>getUserSessionByOAuthAccessTokenUrl - [обязателен для OAuth]</li>
            <li>getAuthDetailsUrl - [опционально] при использовании 2FA/MFA и других способов кроме пароля</li>
            <li>refreshAccessTokenUrl - [опционально] при использовании OAuth с лимитированым accessToken</li>
            <li>verifyPasswordUrl - [опционально] при отсутствии passwordVerifer является обязательным</li>
            <li>createOAuthSessionUrl - [обязателен]</li>
            <li>updateServerIdUrl - [обязателен при отсутствии joinServerUrl и checkServerUrl]</li>
            <li>joinServerUrl - [обязателен при отсутствии updateServerIdUrl]</li>
            <li>checkServerUrl - [обязателен при отсутствии updateServerIdUrl]</li>
        </ul>
        <p><b>Проверка что запрос пришел от лаунчсервера</b>. Лаунчсервер использует Bearer авторизацию для отправки запросов. Токен указывается в поле <codes>bearerToken</codes>. Вы должны проверить его, преджде чем обрабатывать запрос.</p>
        <p>Если вам нужно вернуть <b>null</b> вы должны отдать пустоту в теле ответа</p>
        <p>При нормальной работе скрипта он должен возвращать только 2XX коды. Любой другой код будет считатся ошибкой на стороне скрипта</p>
        <p><b>Блок пользователя</b>(класс <codes>JsonUser</codes>). В дальнейшем будет обозначатся как <codes>[[JsonUser]]</codes></p>
        <pcode autodetect code='
{
  "username": "USERNAME",
  "uuid": "UUID",
  "serverId": "SERVER ID",
  "accessToken": "MINECRAFT ACCESS TOKEN",
  "permissions": {
      "permissions": 0,
      "flags": 0
  },
  "password": "PASSWORD HASH"
}
    '/>
    <p>Поле <codes>password</codes> является необходимым только если вы хотите использовать passwordVerifer вместо отправки запроса на verifyPasswordUrl</p>
    <p>Поле <codes>accessToken</codes>(minecraftAccessToken) является обязательным для запроса getUserSessionByOAuthAccessTokenUrl</p>
    <p><b>Блок сессии</b>(класс <codes>JsonUserSession</codes>). В дальнейшем будет обозначатся как <codes>[[JsonUserSession]]</codes></p>
    <pcode autodetect code='
{
  "id": "ANY STRING",
  "user": [[JsonUser]]
}
    '/>
    <p><b>Блок AuthReport</b>(класс <codes>JsonAuthReportResponse</codes>). В дальнейшем будет обозначатся как <codes>[[JsonAuthReportResponse]]</codes></p>
    <pcode autodetect code='
{
  "minecraftAccessToken": "MINECRAFT ACCESS TOKEN",
  "oauthAccessToken": "ACCESS TOKEN",
  "oauthRefreshToken": "REFRESH TOKEN",
  "oauthExpire": 0,
  "session": [[JsonUserSession]]
}
    '/>
    <p>Подробное описание запросов</p>
    <ul>
        <li><b>getUserByUsernameUrl</b>
            <p>Запрос:</p>
            <pcode autodetect code='
{
  "username": "USERNAME"
}
    '/>
            <p>Ответ: <i>[[JsonUser]]</i></p>
        </li>
        <li><b>getUserByLoginUrl</b>
            <p>Запрос:</p>
            <pcode autodetect code='
{
  "username": "USERNAME"
}
    '/>
            <p>Ответ: <i>[[JsonUser]]</i></p>
        </li>
        <li><b>getUserByUUIDUrl</b>
            <p>Запрос:</p>
            <pcode autodetect code='
{
  "uuid": "UUID"
}
    '/>
            <p>Ответ: <i>[[JsonUser]]</i></p>
        </li>
        <li><b>getUserSessionByOAuthAccessTokenUrl</b>
            <p>Запрос:</p>
            <pcode autodetect code='
{
  "accessToken": "ACCESS TOKEN"
}
    '/>
            <p>Ответ:</p>
            <pcode autodetect code='
{
  "expired": false,
  "session": [[JsonUserSession]]
}
    '/>
        </li>
        <li><b>getAuthDetailsUrl</b>
            <p>Запрос:</p>
            <pcode autodetect code='
{
}
    '/>
            <p>Ответ:</p>
            <pcode autodetect code='
{
  "details": [
    {
        "type": "password"
    },
    {
        "type": "totp"
    }
  ]
}
    '/>
        </li>
        <li><b>refreshAccessTokenUrl</b>
            <p>Запрос:</p>
            <pcode autodetect code='
{
  "refreshToken": "REFRESH TOKEN",
  "ip": "127.0.0.1"
}
    '/>
            <p>Ответ: <i>[[JsonAuthReportResponse]]</i></p>
        </li>
                <li><b>verifyPasswordUrl</b>
            <p>Запрос:</p>
            <pcode autodetect code='
{
  "username": "USERNAME",
  "uuid": "UUID",
  "password": {
      "password": "qwerty",
      "type": "plain"
  }
}
    '/>
            <p>Успех:</p>
            <pcode autodetect code='
{
  "success": true
}
    '/>
            <p>Пароль неверный:</p>
            <pcode autodetect code='
{
  "success": false
}
    '/>
            <p>Нужен 2FA:</p>
            <pcode autodetect code='
{
  "success": false,
  "needMoreFactors": true,
  "factors": [-1]
}
    '/>
            <p>Нужен MFA:</p>
            <pcode autodetect code='
{
  "success": false,
  "needMoreFactors": true,
  "factors": [1,2,3,4]
}
    '/>
        </li>
        <li><b>createOAuthSessionUrl</b>
            <p>Запрос:</p>
            <pcode autodetect code='
{
  "username": "USERNAME",
  "uuid": "UUID",
  "minecraftAccess": true
}
    '/>
            <p>Ответ: <i>[[JsonAuthReportResponse]]</i></p>
            <p>Ошибка:</p>
            <pcode autodetect code='
{
  "error": "User banned"
}
    '/>
        </li>
        <li><b>updateServerIdUrl</b>
            <p>Запрос:</p>
            <pcode autodetect code='
{
  "username": "USERNAME",
  "uuid": "UUID",
  "serverId": "SERVER ID"
}
    '/>
            <p>Ответ:</p>
            <pcode autodetect code='
{
  "success": true
}
    '/>
        </li>
        <li><b>checkServerUrl</b>
            <p>Запрос:</p>
            <pcode autodetect code='
{
  "username": "USERNAME",
  "serverId": "SERVER ID"
}
    '/>
            <p>Ответ: [[JsonUser]]</p>
        </li>
        <li><b>joinServerUrl</b>
            <p>Запрос:</p>
            <pcode autodetect code='
{
  "username": "USERNAME",
  "accessToken": "MINECRAFT ACCESS TOKEN",
  "serverId": "SERVER ID"
}
    '/>
            <p>Ответ:</p>
            <pcode autodetect code='
{
  "success": true
}
    '/>
        </li>
    </ul>
    </div>
</template>
<script>
import coremethods from '@/components/core-methods.js'
import codes from '../../components/codes.vue'
export default {
  components: { codes },
  mixins: [coremethods],
  created: function () {}
}
</script>
