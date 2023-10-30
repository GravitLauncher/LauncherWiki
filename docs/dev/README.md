# Разработчикам

## Подключение зависимостей

Для написания модулей для ЛаунчСервера вам нужно подключить следующие библиотеки:

<CodeGroup>
  <CodeGroupItem title="Gradle (Short)" active>

```properties:no-line-numbers
implementation "pro.gravit.launcher:launcher-core:5.5.0"
implementation "pro.gravit.launcher:launcher-modern-core:5.5.0"
implementation "pro.gravit.launcher:launcher-ws-api:5.5.0"
implementation "pro.gravit.launcher:launchserver-api:5.5.0"
```

  </CodeGroupItem>
  <CodeGroupItem title="Maven" active>

```xml:no-line-numbers
<dependency>
    <groupId>pro.gravit.launcher</groupId>
    <artifactId>launcher-core</artifactId>
    <version>5.5.0</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
<dependency>
    <groupId>pro.gravit.launcher</groupId>
    <artifactId>launcher-modern-core</artifactId>
    <version>5.5.0</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
<dependency>
    <groupId>pro.gravit.launcher</groupId>
    <artifactId>launcher-ws-api</artifactId>
    <version>5.5.0</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
<dependency>
    <groupId>pro.gravit.launcher</groupId>
    <artifactId>launchserver-api</artifactId>
    <version>5.5.0</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
```

  </CodeGroupItem>
</CodeGroup>

Для написания модулей для Лаунчера вам нужно подключить следующие библиотеки:

<CodeGroup>
  <CodeGroupItem title="Gradle (Short)" active>

```properties:no-line-numbers
implementation "pro.gravit.launcher:launcher-core:5.5.0"
implementation "pro.gravit.launcher:launcher-modern-core:5.5.0"
implementation "pro.gravit.launcher:launcher-ws-api:5.5.0"
implementation "pro.gravit.launcher:launcher-client-api:5.5.0"
```

  </CodeGroupItem>
  <CodeGroupItem title="Maven" active>

```xml:no-line-numbers
<dependency>
    <groupId>pro.gravit.launcher</groupId>
    <artifactId>launcher-core</artifactId>
    <version>5.5.0</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
<dependency>
    <groupId>pro.gravit.launcher</groupId>
    <artifactId>launcher-modern-core</artifactId>
    <version>5.5.0</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
<dependency>
    <groupId>pro.gravit.launcher</groupId>
    <artifactId>launcher-ws-api</artifactId>
    <version>5.5.0</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
<dependency>
    <groupId>pro.gravit.launcher</groupId>
    <artifactId>launcher-client-api</artifactId>
    <version>5.5.0</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
```

  </CodeGroupItem>
</CodeGroup>

## Написание модуля

Загрузка модулей происходит из папки modules. Менеджер модулей открывает по очереди все jar и смотрит на параметр
Module-Main-Class в манифесте JAR файла.

Главный класс модуля - это класс, наследуемый от  **pro.gravit.launcher.modules.LauncherModule**  и реализующий метод
init(LauncherInitContext initContext)

Метод init вызывается при инициализации модуля на ранних этапах запуска Лаунчера или ЛаунчСервера. Поэтому реализовывать
логику внутри метода init  **запрещено**. Внутри метода init разрешается обращаться только к методам modulesManager и
initContext, при этом при статической загрузке модуля initContext = null, а при динамической загрузке модуля через
команду loadModule он будет содержать инстанс контекста, из которого можно получить доступ к LaunchServer

:::: tip Примечание:
Если вы собираетесь использовать в модуле для лаунчера **ЛЮБЫЕ** классы из пакетов `launcher-client-api`, `launcher-modern-core` то вы должны запретить загрузку модуля если версия Java ниже 17. Для этого установите в манифесте параметр `Required-Modern-Java` в `true`
::::

## События(ивенты)

Всё что можно сделать из init - загружать другие модули, получать их инстансы и, самое важное,  **подписаться на
события**. Это единственный правильный способ реализовывать логику. При наступлении события менеджер модулей
последовательно проходится по всем модулям в порядке приоритета и вызывает соответствующие обработчики

Встроенные события находятся в pro.gravit.launcher.modules.event

События ЛаунчСервера находятся в pro.gravit.launchserver.modules.events. Вы должны использовать при работе с
ЛаунчСервером, так как внутри них содержится инстанс LaunchServer - главный объект ЛаунчСервера

События Лаунчера находятся в pro.gravit.launcher.client.events. Они отвечают за основные события, происходящие в
клиентской части Лаунчера

Для подписки на событие вы должны создать метод в вашем классе, принимающий 1 аргумент, соответствующий типу события,
которое вы хотите обрабатывать, после чего в методе init вы должны вызвать метод registerEvent, первый аргумент которого
- ваш метод-обработчик, второй аргумент - класс интересующего вас события

Обратите внимание при загрузке модуля через loadModule события, которые уже прошли не вызываются, вместо этого вам
передается initContext

## Внешние API

Вы можете использовать некоторые API Лаунчера извне в вашем моде Minecraft. Вот список пакетов, к которым можно
обращаться извне:

- **pro.gravit.utils**  - утилитные классы и хелперы
- **pro.gravit.launcher.events**  - ответы на запросы к ЛаунчСерверу и отдельные события
- **pro.gravit.launcher.request**  - запросы к ЛаунчСерверу
- **pro.gravit.launcher.api**  - Информация о текущем пользователе и профиле

## Отладка клиента с лаунчером

Вы можете писать собственные моды используя API лаунчера - иметь доступ к скинам, плащам и входу на сервер с `online-mode` `true`. Для этого настройте свое окружение (на примере fabric):
- Добавьте библиотеки лаунчера как при разработке модуля
- Вместо подключения `fabric-loader` добавьте туда его патченую версию с клиента:
```
modImplementation files("YOUR_CLIENT/libraries/net/fabricmc/fabric-loader/VERSION/fabric-loader-VERSION.jar")
```
- Откройте проект в `IDEA`. Дублируйте существующую конфигнурацию для запуска клиента и добавьте туда:
```
-Dlauncher.debug=true
-Dlauncher.stacktrace=true
-Dlauncher.dev=true
-Dlauncher.runtime.auth.authid=std
-Dlauncher.runtime.mainclass=net.fabricmc.devlaunchinjector.Main
-Dlauncher.runtime.username=YOUR_USERNAME
-Dlauncher.runtime.password=YOUR_PASSWORD
```
- Укажите MainClass `pro.gravit.launcher.debug.DebugMain`

### Как войти на сервер с отладочного клиента

Используйте `protectHandler` `none` (**только для тестирования, это сделает ваш сервер незащищенным**)

## Написание AuthCoreProvider

Для интеграции собственных CMS и сайтов с Лаунчером рекомендуется написать свой AuthCoreProvider. Для этого создайте
класс наследник AuthCoreProvider и реализуйте обязательные методы  [oauth](../dev/#реализация-oauth)  после чего
реализуйте необходимые вам расширения:

Расширения класса AuthCoreProvider

- **AuthSupportExit**  - вы поддерживаете методы завершения сессии пользователя
- **AuthSupportGetAllUsers**  - вы поддерживаете метод получения всех пользователей
- **AuthSupportGetSessionsFromUser**  - вы поддерживаете получение списка сессий пользователя
- **AuthSupportHardware**  - вы поддерживаете работу с HWID ```важно```

- **AuthSupportRegistration**  - вы поддерживаете регистрацию пользователей
- **AuthSupportUserBan**  - вы поддерживаете методы ban и unban

Расширения класса User

- **UserSupportTextures**  - ваш объект User хранит и предоставляет информацию о скинах и плащах. Вы должны вернуть
  соответствующие текстуры с метаданными при их наличии. При использовании этих методов TextureProvider больше не
  требуется
- **UserSupportHardware**  - ваш объект User хранит информацию о железе пользователя
- **UserSupportBanInfo**  - ваш объект User хранит информацию о банах пользователя
- **UserSupportAdditionalData**  - ваш объект User поддерживает кастомные параметры(такие как email, монеты и т.д.)

## Своя реализация OAuth (HttpAuthCoreProvider)

OAuth в Лаунчере позволяет использовать временные токены доступа(access) вместо устаревшей системы сессий. Этот метод
отлично подойдет для интеграции собственных CMS с Лаунчером

Для работы с OAuth вам необходимо реализовать соответствующие методы getUserSessionByOAuthAccessToken,
refreshAccessToken, а в методе authorize вернуть результат с данными OAuth

## Порядок авторизации с OAuth

- Первым шагом вызывается getAuthDetails (Если используется), который сообщает все возможные факторы авторизации
- Вторым шагом выполняется авторизация с помощью метода authorize. Вы должны:
    - Проверить, аргументы login и password на null и тип
    - Если context равен null, то это означает, что вам не требуется проверять пароль (если это возможно). Это позволяет
      администратору с помощью команды 'sendAuth' авторизировать пользователя без пароля. Вы вправе не поддерживать
      данный режим работы и всегда требовать пароль
    - Создайте объект UserSession, содержащий информацию о пользователе, а также токены accessToken и refreshToken
- Авторизация завершена

При необходимости пользователю обновить свой истекший accessToken будет вызван метод refreshAccessToken. В нем вы должны
обновить accessToken  **и refreshToken(если это возможно)**  и вернуть их пользователю. Выставление параметра expire в 0
делает токен вечным

При повторной авторизации вызывается метод getUserByTokenUrl, который должен вернуть объект UserSession с находящимся
внутри объектом HttpUser

## Написание своего скрипта авторизации

Смотрите [пример](https://github.com/GravitLauncher/HttpMethodExample)