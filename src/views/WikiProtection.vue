<template><div class="wiki">
  <h2>Базовая настройка защиты</h2>
  <ol>
    <li>
      <details>
        <summary tabindex="2">Проксирование через Nginx</summary>
        <p>Для проксирования можно воспользоваться следующим конфигом nginx</p>
        <p>Подходит если у вас нет SSL сертификата или его предоставляет вам CloudFlare</p>
        <pre v-highlightjs><code class="json">
server {
        listen 80;
        server_name projectname.ru;
        location / {
                root /путь/до/updates;
        }
        location /api {
                proxy_pass http://localhost:9274/api;
                proxy_set_header Host $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Real-IP $remote_addr;
        }
}
</code></pre>
        <p>Подходит если у вас есть SSL сертификат(в том числе от Let's Encrypt)</p>
        <pre v-highlightjs><code class="json">
    server {
        listen 80;
        listen 443 ssl;
        server_name projectname.ru;
        ssl_certificate /путь/до/сертификата.crt;
        ssl_certificate_key /путь_до/ключа/сертификата.key;
        location / {
                root /путь/до/updates;
        }
        location /api {
                proxy_pass http://localhost:9274/api;
                proxy_set_header Host $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Real-IP $remote_addr;
        }
}
</code></pre>
      </details>
    </li>
    <li>
      <details>
        <summary tabindex="2">Настройка ProtectHandler</summary>
        <p>ProtectHandler часть находится в состоянии активной разработки. В дальнейшем будут появлятся всё новые и
          новые возможности</p>
        <h3>Способ none</h3>
        <p>Полностью отсутствует защита</p>
        <pre v-highlightjs><code class="json">
"protectHandler": {
    "type": "none"
}
</code></pre>
        <h3>Способ std (5.1+)</h3>
        <p>Стандартный protectHandler</p>
        <ul>
          <li>Токен авторизации можно получить только если authType CLIENT и пройдена проверка хеша лаунчера</li>
          <li>Получить и сменить профиль можно только если пройдена проверка на белый список</li>
          <li>Получить можно только такие папки updates: assets выбранного клиента, папка выбранного клиента, все папки
            из allowUpdates</li>
        </ul>
        <pre v-highlightjs><code class="json">
"protectHandler": {
    "profileWhitelist": { "Ваш UUID профиля": ["Ник1", "Ник2"] }, //Использование вайтлиста
    "allowUpdates": [],
    "type": "std"
  }
</code></pre>
        <h3>Способ advanced (5.1.6+) </h3>
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
        <h3>Настройка HWIDProvider ( 5.1.6+ )</h3>
        <p>HWIDProvider является частью advanced protectHandler и позволяет выдавать баны по железу, собирать статистику
          железа пользователя и отслеживать мультиакки. Конфигурации:</p>
        <p>Настройка HWIDHandler для версий ниже 5.1 находится <a href="?r=wiki%2Fpage&page=hwidhandler">тут</a></p>
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
        <p>Используя этот способ вы можете посмотреть собарнные HIWD командой <span class="codes">config protecthandler
            hardwarelist</span>. Забанить HWID - <span class="codes">config protecthandler hardwareban [ID]</span>, где
          ID вы берете из вывода первой команды</p>
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
        <p>Выполните следующие SQL запросы что бы создать таблицы для работы mysql hwid provider</p>
        <pre v-highlightjs><code class="sql">
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

      </details>
    </li>
    <li>
      <details>
        <summary tabindex="2">Подпись лаунчера и EXE</summary>
        <h2>Где взять сертификат <div class="gtag gtag-medium">Средний уровень</div>
        </h2>
        Вариантов несколько:
        <ul>
          <li>Можно сгенерировать самому себе самоподписанный сертификат(например с помощью GenerateCertificateModule
            или по инструкциям ниже)</li>
          <li>Можно попросить сертификат у того, кто уже настроил грамотно свой СА и может подписывать другие
            сертификаты (Например maintainer Gravit, активные участники sasha0552, radioegor146 за небольшую сумму (до
            500 рублей))<br>
            Для этого надо создать CSR, и передать его человеку, который его подпишет (см. инструкцию в конце)</li>
          <li>Можно отдавать каждый билд лаунчера человеку, имеющему сертификат, но не являющийся СА, на подпись.
            (Например активный участник Xaver будет подписывать каждый билд в течении года за 3+ тысяч рублей)</li>
          <li>Можно купить сертификат для подписи лаунчера у официальных СА (очень дорого)</li>
        </ul>
        <h2>Подпись jar <div class="gtag gtag-medium">Средний уровень</div>
        </h2>
        <p>Этот гайд необходим всем тем кто хочет настроить JarSigner module, а так же начиная с 5.1.0 подписывание
          обязательно.<br>
          Перед началом работы, у вас уже должны быть:
        <ol>
          <li>Установлен модуль JarSigner(5.0.11 и ниже) или версия 5.1.0+</li>
          <li>Сертификат, полученный одним из способов выше</li>
        </ol>
        Конфигурация:
        <h3>Для формата PKCS12 (рекомендуется)</h3>

        <pre v-highlightjs><code class="json">
{
  "key": "/home/myname/MyCert.p12",  // Путь к хранилищу ключей
  "storepass": "mypassword",         // Пароль от хранилища
  "algo": "PKCS12",                  // Тип хранилища
  "keyalias": "gravit code sign",    // Key Alias, см ниже как его узнать
  "pass": "mypassword",              // Пароль от хранилища, совпадает с storepass
  "signAlgo": "SHA256WITHRSA"        // При использовании ключей на эллиптический криптографии используйте SHA256withECDSA
}
</code></pre>
        <h4>Как узнать key alias из PKCS12 хранилища</h4>
        Выполните <span class="codes">keytool -storepass ПарольОтХранилища -keystore ПутьКХранилищу -list</span><br>
        У вас будет такой вывод<br>
        <span class="codes">Your keystore contains 1 entry
          untrusted code sign, 20.10.2019, PrivateKeyEntry,
        </span><br>
        untrusted code sign - ваш key alias, его вы и должны будете указать<br>
        <b>Утилита keystore поставляется вместе с JDK</b>
        <h3>Для JKS(Java KeyStore)</h3>
        <pre v-highlightjs><code class="json">
{
  "key": "/home/myname/MyCert.jks",  // Путь к хранилищу ключей
  "storepass": "mypassword",         // Пароль от хранилища
  "algo": "JKS",                     // Тип хранилища
  "keyalias": "gravit code sign ec", // Key Alias, задается при создании
  "pass": "mypassword",              // Пароль от хранилища, может не совпадать с storepass
  "signAlgo": "SHA256WITHRSA"        // При использовании ключей на эллиптический криптографии используйте SHA256withECDSA
}
</code></pre>
        <h2>Подпись exe <div class="gtag gtag-hard">Сложный уровень</div>
        </h2>
        <b>Инструкция и скрипты написаны под Linux</b><br>
        Перед началом работы с этими скриптами у вас уже должны быть:
        <ol>
          <li>Установлен osslsigncode<br>
            Debian-подобные системы: sudo apt install osslsigncode</li>
          <li>Сертификат</li>
          <li><a class="link-animated" href="https://yadi.sk/d/PAt9gkJyBORXjA">Скрипты для подписи</a></li>
        </ol>
        Если ваш сертификат имеет расширение pfx просто переименуйте его в p12 (это одно и тоже)<br>
        В другом случае конвертируйте свой сертификат в формат p12<br>
        <ol>
          <li>В папку с скриптами положите ваш Launcher.exe</li>
          <li>Выполните <span class="codes">sh sign-update.sh Launcher.exe</span><br>
            Будет создан файл signsize.txt, который понадобится на следующем этапе<br>
            Эту процедуру достаточно провести один раз</li>
          <li>Выполните <span class="codes">sh sign.sh Launcher.exe</span><br>
            У вас в папке со скриптами должен присутствовать signsize.txt<br>
            Если всё прошло успешно, вам покажет информацию о сертификатах внутри exe</li>
          <li>Замените ваш Launcher.exe рядом с лаунчсервером подписанной версией, и пропишите <span
              class="codes">syncBinaries</span> в консоли лаунчсервера</li>
        </ol>
        <b>При каждом билде шаги 3-4 нужно будет повторять заново</b><br>
        <b>При появлении ошибки <span class="codes">Corrupt jar file</span> (размер подписи изменился) заново выполните
          шаги 1-4</b>
        <h2>Создание CSR (Certificate Signing Request) для 3 варианта получения сертификата <div
            class="gtag gtag-medium">Средний уровень</div>
        </h2>
        <b>CSR это не сертификат - это запрос на сертификат</b><br>
        <b>Необходимо установить <a class="link-animated" href="https://www.openssl.org/source/">OpenSSL</a></b><br>
        В терминале:<br>
        <span class="codes">openssl genrsa -out private.key 4096</span><br>
        4096 - это размер приватного ключа в битах. Можно использовать от 1024 бит (небезопасно) до 8192
        (безопасно).<br>
        <b>Приватный ключ не должен быть скомпрометирован никем, и не должен передаватся по незащищенным каналам
          связи</b><br><br>
        <b>Если вы хотите использовать эллиптические кривые вместо RSA:</b><br>
        <span class="codes">openssl ecparam -name secp256k1 -genkey -out private.key</span><br>
        Где secp256k1 - название эллиптической кривой<br>
        Вы можете выбрать любую кривую на свое усмотрение, если понимаете что делаете<br>
        В противом случае рекомендуется оставить всё как есть<br><br>
        Далее:<br>
        <span class="codes">openssl req -new -key private.key -out cert.csr</span><br>
        И отвечаем на вопросы примерно так:
        <pre v-highlightjs><code class="json">
Country Name (2 letter code) [AU]:RU
State or Province Name (full name) [Some-State]:Russia
Locality Name (eg, city) []:Moscow
Organization Name (eg, company) [Internet Widgits Pty Ltd]:MyProjectName
Organizational Unit Name (eg, section) []:IT
Common Name (e.g. server FQDN or YOUR name) []:MyProjectName Code Sign
Email Address []:admin@myproject.name
A challenge password []:
An optional company name []:
</code></pre>
        После чего CSR вы должны отправить тому, кто подпишет вам сертификат своим СА<br>
        После получения сертификата (.pem) соберите его с своим приватным ключем в формат pfx<br>
        <span class="codes">openssl pkcs12 -export -in MyProjectName_Code_Sign.pem -inkey private.key -out
          cert.pfx</span><br>
        <p>У вас спросят пароль. Если вы хотите дополнительно защитить ваш ключ - можете поставить<br>
        Готовый pfx вы можете использовать для подписи самостоятельно
        </p>
        <h2>Создание самоподписаного CodeSign сертификата (минимальная настройка) <div class="gtag gtag-medium">Средний
            уровень</div>
        </h2>
        <p>Вы не хотите ни от кого зависить и полностью владеть всей цепочкой сертификатов? Тогда вам сюда. В этом
          разделе мы создадим базовую цепочку сертификатов с одним СА и одним конечным сертификатом. Этого хватит что бы
          подписать JAR и EXE лаунчера и пройти проверки</p>
        <p>Создавать мы будем с помощью утилиты XCA <a href="https://github.com/chris2511/xca/releases">отсюда</a>.
          Выбирайте последний релиз, качаете, устанавливаете</p>
        <ol>
          <li>Создайте базу данных. При создании базы данных обязательно задайте пароль и сохраните/запишите его в
            безопасное место. Старайтесь придерживаться правил безопастности - это доступ к всем вашим сертификатам.
          </li>
          <li>Перейдите во вкладку "Сертификаты" и нажмите кнопку "Новый сертификат"</li>
          <li>Во вкладке "Субьект" укажите поле commonName - например "SuperCraft Root CA". Рекомендуется ввести имя,
            заканчивающиеся на "Root CA" - так будет проще и вам, и всем остальным кто будет смотреть ваш сертификат
          </li>
          <li>В той же вкладке "Субъект" внизу нажмите на кнопку "Сгенерировать новый ключ". Тип ключа - RSA, длинна
            ключа - 4096 бит. Нажмите "Создать"</li>
          <li>В вкладке "Расширения" выберите "тип" - "Центр Сертификации", в графе "Выбор периода" укажите от 1 до 10
            лет и нажмите кнопку "Применить", после чего дата окончания должна сдвинуться на указанное вами число лет
          </li>
          <li>В вкладке "Область приминения ключа" в первой колонке укажите "Digitial Signature" и "Certificate Sign",
            во второй "Code Signing", больше ничего в этой вкладке менять не нужно</li>
          <li>В вкладке "Netscape" если что либо написано в поле "Netscape Comment" - уберите</li>
          <li>После чего если вы уверены в веденных параметрах можно нажать "ОК". Вы создали корневой сертификат!</li>
          <li>Экспортируем корневой сертификат. Для этого выберите свежесозданный сертификат и нажмите кнопку "Экспорт".
            Формат экспорта - "PEM (.crt)", файл куда экспортировать выберите сами на свое усмотрение. Нажимаете кнопку
            "ОК"</li>
          <li>Далее вам нужно создать конечный сертификат, которым вы будете подписывать лаунчер(JAR и/или EXE).
            Нажимаете "Новый сертификат"</li>
          <li>В Вкладке "Первоисточник" должен быть выбран "Использовать этот сертификат для подписи" где должен быть
            указан ваш Root CA, созданный на предыдущем этапе</li>
          <li>В вкладке "Субъект" укажите поле commonName - например "SuperCraft Code Sign". Рекомендуется ввести имя,
            заканчивающиеся на "Code Sign" - так будет проще и вам, и всем остальным кто будет смотреть ваш сертификат
          </li>
          <li>В той же вкладке "Субъект" внизу нажмите на кнопку "Сгенерировать новый ключ". Тип ключа - RSA, длинна
            ключа - 2048 бит. Нажмите "Создать"</li>
          <li>В вкладке "Расширения" выберите "тип" - "Конечный субъект", в графе "Выбор периода" укажите от 1 до 10 лет
            и нажмите кнопку "Применить", после чего дата окончания должна сдвинуться на указанное вами число лет.
            Обратите внимание - срок действия конечного сертификата не может быть больше срока действия вашего Root CA.
            Меньше можно, больше - нет</li>
          <li>Все прочие настройки аналогичны. В вкладке "Область приминения ключа" в первой колонке укажите "Digitial
            Signature"(и не указывайте Certificate Sign), во второй "Code Signing", больше ничего в этой вкладке менять
            не нужно. В вкладке "Netscape" если что либо написано в поле "Netscape Comment" - уберите. После чего если
            вы уверены в веденных параметрах можно нажать "ОК"</li>
          <li>Вы создали конечный сертификат! Осталось этот сертификат экспортировать. Выберите ваш "Code Sign"
            сертификат и нажмите кнопку "Экспорт". Формат экспорта - <b>"Цепочка PKCS12"</b>, месторасположение
            выбирайте сами. Введите пароль, которым будет зашифрован ваш .p12 контейнер. Пароль не должен совпадать с
            паролем от вашей базы данных, это небезопасно. Именно этот пароль вы будете указывать в конфигурации при
            подписи</li>
        </ol>
        <p>Всё! Уже можно пользоваться. Файл **_Root_CA.crt(ваш корневой сертификат) скопируйте в папку truststore
          лаунчсервера. При желании установите его в ваш ПК как доверенный центр сертификации. А дальше можете
          настраивать подпись JAR/EXE уже своим сертификатом</p>
        <h2>Создание самоподписаного CA (серьезная настройка) <div class="gtag gtag-hard">Сложный уровень</div>
        </h2>
        <p>Хотите почувствовать себя настоящим экспертом? Что бы всё выглядело максимально правдоподобно и серьезно?
          Хотите не только подписывать JAR/EXE, а вообще что угодно где используются сертификаты? Тогда вам сюда. Вам
          понадобится всё тот же XCA <a href="https://github.com/chris2511/xca/releases">отсюда</a></p>
        <ol>
          <li>Начнем с самого важного - ключа вашего центрального Root CA сертификата. Создайте базу данных XCA прямо на
            флешке и сгенерируйте ключ RSA с длинной не менее 4096 бит. После чего приступайте к созданию Root CA
            сертификата. В разделе "Субъект" укажите все основные параметры, исключая emailAddress, что бы всё выглядело
            серьезно. На дополнительные параметры можно забить в этой вкладке, они не нужны. В разделе "Расширения"
            укажите тип - "Центр сертификации", срок действия минимум 5 лет. "Область приминения ключа" - "Certificate
            Sign" и "CRL Sign", всё остальное без изменений. В разделе "Netscape" всё можно оставить пустым</li>
          <li>Дальше создайте в той же базе данных "дополнительный" CA с настройками как у Root CA, а в имени либо
            номер, либо год. Единственное отличие в "Расширения" в поле "X.509v3 CRL" укажите URL на ваш сайт, где будет
            находится центральный CRL(например https://ca.example.com/root.crl). Этот СА вы будете использовать вместо
            центрального Root CA для создания других сертификатов. После чего экспортируйте ключ и сам сертификат
            дополнительного СА а так же только сертификат Root CA. Ключ Root CA не должен покидать пределы флешки.
            Дальше я для удобства будут называть этот CA - "2020 CA"</li>
          <li>Создайте CRL root.crl используя ваш Root CA(ПКМ->ЦС->Сгенерировать CRL) и экспортируйте его. Потом вы его
            зальете себе на сайт по тому URL что указали выше, когда генерировали 2020 CA</li>
          <li>Сохраните эту базу данных на еще одну флешку, CD диск, что угодно что будет не подключено к вашему ПК
            физически(а значит и ключ Root CA будет в безопастности) и что внезапно сразу не сломается</li>
          <li>Создайте новю базу данных уже в другом месте(к примеру на вашем жестком диске) куда импортируйте
            сертификат Root CA, сертификат 2020 CA и ключ 2020 CA. Дальше вы будете работать только с этой базой.</li>
          <li>Создайте CA, который будет служить определенной цели, например "Code Sign RSA CA", указав в качестве CRL
            что то вроде https://ca.example.com/2020.crl . Все CA, созданные с помощью 2020 CA будут использовать этот
            CRL URL. Есстественно заполняя все необходимые поля</li>
          <li>Сгенерируйте CRL для 2020 CA(https://ca.example.com/2020.crl) и всех специализированных
            CA(https://ca.example.com/2020/codesign.crl). Потом вы зальете их на сайт по тому URL что указали</li>
          <li>И вот теперь можете создавать конечные сертификаты. Бывает нужно указать какой то особый OID, которого нет
            в GUI. Тогда вы идете в Дополнительно->Редактировать и там вы можете указать любые параметры, которые можно
            указать в конфигурации OpenSSL. К примеру добавить кастомные extendedKeyUsage</li>
        </ol>

      </details>
    </li>
    <li>
      <details>
        <summary tabindex="2">Проксирование через Nginx</summary>

      </details>
    </li>
  </ol>
</div></template>
