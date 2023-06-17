# Установка LaunchServer

## Выбор хостинга

Для работы лаунчсервера необходим  **виртуальный (VDS/VPS)**  или  **выделенный (Dedicated)**  сервер на дистрибутиве Linux (Для [Windows](../install/#установка-на-windows-только-для-тестирования)) , а так же:

-  Один из актуальных дистрибутивов: **Ubuntu 22.04**, **Debian 11**, **CentOS 8**, **ArchLinux** и другие
-  Веб-сервер  **Nginx**  для раздачи статического контента
-  Минимум  **300Мб свободной оперативной памяти**  для работы лаунчсервера
-  При сборке лаунчсервера из исходников прямо на машине может потребоваться до 1 Гб свободной оперативной памяти для работы Gradle

*Опционально:*

-  Веб-сайт, CMS или личный кабинет с поддерживаемым алгоритмом хеширования
-  База данных  **MySQL/MariaDB**  или  **PostgreSQL**

*Рекомендации:*

-  Не размещайте сайт на shared хостинге, так как это может привести к проблемам с подключением к базе данных, производительностью и стабильностью работы
-  Хостинги, предоставляющие VDS/VPS на основе виртуализации OpenVZ не позволяют использовать некоторые программы и нагружать процессор выше определенного уровня длительное время
-  Старые версии дистрибутивов могут содержать уязвимости или слишком старые версии ПО с большим количеством багов. В таком случае рекомендуется обновиться до последней версии или сменить хостинг провайдера

Если вы хотите установить лаунчсервер на Windows для локального тестирования следуйте [этой](../install/#установка-на-windows-только-для-тестирования) инструкции.

## Настройка хостинга

- Первым шагом необходимо подготовить окружение:
  - Установить JDK FULL
  - Создать пользователя для LaunchServer

- Настоятельно рекомендуем:
  - Настроить проксирование через Nginx с поддоменом
  - Установить сертификат SSL на поддомен

### Установка JDK FULL 17
Для запуска LaunchServer необходима Java 17. Она так же подходит для запуска майнкрафт сервера 1.18+
Для запуска майнкрафт сервера 1.17.x необходима - Java 16.
Для запуска майнкрафт сервера 1.16.5 и ниже - Java 8.
Необходимо установить их все, если вы собираетесь держать лаунчсервер и сервера на одной машине.
:::::: code-group
::::: code-group-item DEBIAN / UBUNTU
::: tip Копировать и вставлять целиком
```bash:no-line-numbers
sudo apt-get update ;
sudo apt-get install gnupg2 wget apt-transport-https -y ;
wget -q -O - https://download.bell-sw.com/pki/GPG-KEY-bellsoft | sudo apt-key add - ;
echo "deb [arch=amd64] https://apt.bell-sw.com/ stable main" | sudo tee /etc/apt/sources.list.d/bellsoft.list ;
sudo apt-get update ;
sudo apt-get install -y bellsoft-java17-full
```
:::
::: tip Смена Java по умолчанию
```bash:no-line-numbers
sudo update-alternatives --config java
```
:::
:::: details Целевые архитектуры процессоров: <Badge type="warning" text="Важно" vertical="top" />
::: warning Описание:
- **amd64** является более распространённой архитектурой на текущее время
- Если **amd64** не является целевой архитектурой, замените его в скрипте выше в поле **[arch=amd64]**

Список возможных архитектур:
```bash:no-line-numbers
amd64, i386, arm64, armhf
```
- Сопоставление:
  - **amd64** - x86 (64 бит)
  - **i386** - x86 (32 бит)
  - **arm64** - aarch64
:::
::: tip Узнать архитектуру ядра:
```bash:no-line-numbers
uname -m | awk '{print(substr($0,0,3))}'
```
:::
::: tip Узнать битность ядра:
```bash:no-line-numbers
getconf LONG_BIT
```
:::
::: tip Удалить из sources.list
- Необходимо, если ошибочно добавили неправильную архитектуру
  - Ошибка в консоли: `E: Unable to locate package bellsoft-java17-full`
```bash:no-line-numbers
rm -f /etc/apt/sources.list.d/bellsoft.list
```
- Измените архитектуру в скрипте и повторите добавление и установку
:::
::::
:::::
::::: code-group-item CENTOS
::: tip Добавить репозиторий BellSoft и установить
```bash:no-line-numbers
echo | tee /etc/yum.repos.d/bellsoft.repo > /dev/null << EOF
[BellSoft]
name=BellSoft Repository
baseurl=https://yum.bell-sw.com
enabled=1
gpgcheck=1
gpgkey=https://download.bell-sw.com/pki/GPG-KEY-bellsoft
priority=1
EOF
```
```bash
yum update
yum install bellsoft-java17-full
alternatives --config java
```
:::
:::: tip Смена Java по умолчанию
```bash:no-line-numbers
sudo alternatives --config java
```
::::
:::::
::::: code-group-item WINDOWS
::: tip Откройте PowerShell (От имени Администратора)
- Снимите проверку подписи, для правильной работы дальнейшего скрипта:
```bash:no-line-numbers
Set-ExecutionPolicy remotesigned
```
- Установите **Chocolatey**
```bash:no-line-numbers
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```
- Установите пакет **JDK 17 FULL** содержащий **JavaFX**
```bash:no-line-numbers
choco install liberica17jdkfull
```
:::
:::: details Обновление ENV запущенного терминала
- Для быстрой смены Переменных среды
- Возможность предоставляется только при установленном **Chocolatey**
```bash:no-line-numbers
refreshenv
```
::::
:::::
::::: code-group-item OTHER
::: tip Перейти по ссылке и ознакомится с гайдом
Посетите [BELLSOFT Installation Guide](https://bell-sw.com/pages/liberica_install_guide-17.0.7/)
:::
:::::
::::::

::: warning Примечание:
- Такие архитектуры как **arm64** и **armhf** не поддерживают сборку EXE - бинарного файла лаунчера, через launch4j
---
- Если ваша архитектура **amd64** или **i386**, включите сборку EXE в конфигурации `LaunchServer.json`:
  - launch4j: 
    - enabled: true
:::

### Создание пользователя launcher

Создание пользователя **launcher**:
(Актуально для Ubuntu, Debian, CentOS, ArchLinux)
```bash:no-line-numbers
sudo useradd -m -s /bin/bash launcher
```
:::: details Инструкции по работе с su:
::: tip Выполнение команд от имени пользователя launcher и переход в домашнюю папку:
```bash:no-line-numbers
su - launcher
```
:::
::: tip Выполнение команд от имени пользователя launcher без смены каталога:
```bash:no-line-numbers
su launcher
```
:::
::: tip Выход обратно в root:
```bash:no-line-numbers
exit
```
:::
::::

## Установка LaunchServer

Перейдите в пользователя **launcher**:

```bash:no-line-numbers
su - launcher
```
Выполнить установку **LaunchServer**'a скриптом:

```bash:no-line-numbers
wget -O - https://mirror.gravitlauncher.com/scripts/setup-master.sh | bash <(cat) </dev/tty
```
**После завершения установки запустите лаунчсервер для начальной настройки:**
```bash:no-line-numbers
./start.sh
```
-   Укажите ваш ДОМЕН или IP, на котором будет работать лаунчсервер
-   Укажите название вашего проекта, которое будет отображаться в лаунчере и в папке AppData
-   После первого запуска закройте лаунчсервер командой **stop**

```bash:no-line-numbers
stop
```
:::: details Описание папок и файлов установленных скриптом
::: tip Список папок SRC и git:
-   **src/**  - исходный код лаунчсервера, API, модулей, лаунчера
-   **srcRuntime/**  - исходный код графической части лаунчера (рантайм)
-   **compat/**  - дополнительные важные файлы: библиотека авторизации, ServerWrapper, модули для лаунчера и лаунчсервера и т.д.
:::
::: tip Установщик так же собирает все модули, готовые модули можно найти по путям:
-   **src/modules/<НазваниеМодуля>_module/build/libs/<НазваниеМодуля>_module.jar** - собранный модуль для лаунчсервера.
-   **src/modules/<НазваниеМодуля>_lmodule/build/libs/<НазваниеМодуля>_lmodule.jar** - собранный модуль для лаунчера.
:::
::: tip Готовые скрипты, созданные установщиком:
-   **./start.sh**  - запуск лаунчсервера для тестирования и начальной настройки
-   **./startscreen.sh**  - запуск лаунчсервера на постоянной основе с помощью утилиты screen. Не запускайте два лаунчсервера одновременно!
-   **./update.sh**  - обновляет лаунчсервер, лаунчер и рантайм до последней релизной версии
:::
::: tip Список папок лаунчсервера:
-   **libraries/**  - библиотеки для лаунчсервера
-   **modules/**  - модули для лаунчсервера (оканчивающиеся на _module.jar)
-   **profiles/**  - папка профилей для запуска MineCraft
-   **updates/**  - папка обновлений
-   **logs/**  - папка с логами (журналом) лаунчсервера
-   **runtime/**  - папка с дизайном лаунчера
-   **launcher-modules/**  - модули для лаунчера (оканчивающиеся на _lmodule.jar)
-   **launcher-libraries/**  - библиотеки для лаунчера
-   **launcher-compile-libraries/**  - вспомогательные библиотеки для лаунчера
-   **launcher-pack** - файлы, которые будут включены в jar лаунчера без изменений
-   **config/**  - настройка конфигурации модулей
-   **proguard/**  - настройки Proguard (обфускация кода)
-   **guard/**  - нативная защита (по умолчанию отсутствует)
:::
::::

### Настройка Nginx

Для достижения оптимальной производительности отдачи файлов нужно настроить Nginx

- Посетите сайт [\[NGINX\]](https://nginx.org/en/linux_packages.html) и установите Nginx в соответствии с вашей системой

- Создайте в пространстве имён своего домена **A** запись, вида `launcher.ИМЯ_ВАШЕГО_ДОМЕНА.ru`, с вашим **IP** машины с лаунчсервером
::: details Путь к конфигурации Nginx:
Предпочтительно создавать отдельный файл конфигурации для каждого домена отдельно:
(Воспользуйтесь SFTP клиентом)
```
/etc/nginx/conf.d/launcher.ВАШ_ДОМЕН.conf
```
Если у вас на машине будет только одна настройка, можете отредактировать конфигурацию по умолчанию:
```bash:no-line-numbers
nano /etc/nginx/conf.d/default.conf
```
:::
:::: code-group
::: code-group-item [ На DNS имени ]
```nginx{10,12-13,15}:no-line-numbers
upstream gravitlauncher {
    server 127.0.0.1:9274;
}
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}
server {
    listen 80;
    server_name launcher.ВАШ_ПОДДОМЕН_ДЛЯ_ЛАУНЧЕРА;
    charset utf-8;
    #access_log  /var/log/nginx/launcher.ВАШ_ДОМЕН.access.log;
    #error_log  /var/log/nginx/launcher.ВАШ_ДОМЕН.error.log notice;
    
    root /путь/до/updates; # Example: /home/launcher/updates
    
    location / {
    }
    location /api {
        proxy_pass http://gravitlauncher;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    location /webapi/ {
        proxy_pass http://127.0.0.1:9274/webapi/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```
:::
::: code-group-item [ На IP ]
```nginx{12-13,15}:no-line-numbers
upstream gravitlauncher {
    server 127.0.0.1:9274;
}
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}
server {
    listen 80;

    charset utf-8;
    #access_log  /var/log/nginx/launcher.access.log;
    #error_log  /var/log/nginx/launcher.error.log notice;
    
    root /путь/до/updates; # Example: /home/launcher/updates
    
    location / {
    }
    location /api {
        proxy_pass http://gravitlauncher;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    location /webapi/ {
        proxy_pass http://127.0.0.1:9274/webapi/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```
:::
::: code-group-item [ Под Docker ]
::: tip Для главного nginx, не в контейнере
- Получить IPAddress контейнера. Где `<container id>` это UUID контейнера
```bash:no-line-numbers
docker inspect <container id> | grep "IPAddress"
```
- Заменить `127.0.0.1` адрес на локальный IP от вашего интерфейса для Docker, полученный выше
```nginx{2,10,12-13,15}:no-line-numbers
upstream gravitlauncher {
    server 127.0.0.1:9274;
}
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}
server {
    listen 80;
    server_name ВАШ_ПОДДОМЕН_ДЛЯ_ЛАУНЧЕРА;
    charset utf-8;
    #access_log  /var/log/nginx/launcher.ВАШ_ДОМЕН.access.log;
    #error_log  /var/log/nginx/launcher.ВАШ_ДОМЕН.error.log notice;
    
    root /путь/до/updates;
    
    location / {
    }
    location /api {
        proxy_pass http://gravitlauncher;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    location /webapi/ {
        proxy_pass http://127.0.0.1:9274/webapi/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```
:::
:::
::::

::::: tip Проверить конфигурацию и перезагрузить Nginx:

```bash:no-line-numbers
nginx -t
```
Должны увидеть:
```log
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```
Включить Nginx как службу Systemd:
```bash:no-line-numbers
systemctl enable nginx
```
Перезагрузка сервиса:
:::: code-group
::: code-group-item Systemd
```bash:no-line-numbers
systemctl restart nginx
```
:::
::: code-group-item init.d
```bash:no-line-numbers
service nginx restart
```
:::
::::
:::::

::: warning
 - Без доменного имени перенос лаунчера на другую машину привёдёт к отказу самообновления.
 - Так же SSL сертификат невозможно выдать на IP. В последствии соединение будет незащищённым и может быть скомпрометировано.
:::
::: details Заметки по правам: <Badge type="warning" text="Важно" vertical="top" />
Если у nginx нет прав для чтения директорий, выдайте:
```bash:no-line-numbers
chmod +x /home/launcher &&
find /home/launcher/updates -type d -exec chmod 755 {} \; &&
find /home/launcher/updates -type f -exec chmod 644 {} \;
```
Изменить группу и пользователя на всё содержимое домашней директории **launcher**:
```bash:no-line-numbers
chown -R launcher:launcher /home/launcher
```
:::

### Настройка безопасного подключения

Для обеспечения безопасности передаваемых паролей, защиты от внедрения в процесс обмена данными нужно подключить к своему домену SSL сертификат. На данный момент его можно купить или получить бесплатно (Let's Encrypt/Cloudflare). Вы должны будете установить его на домен с лаунчсервером ```ВАШ_ПОДДОМЕН_ДЛЯ_ЛАУНЧЕРА``` это ```launcher.ИМЯ_ВАШЕГО_ДОМЕНА.ru``` и немного изменить настройки лаунчсервера:

-   Откройте файл LaunchServer.json и найдите там секцию netty
-   Измените ссылки формата:
    - ```http://ВАШ_ПОДДОМЕН_ДЛЯ_ЛАУНЧЕРА ИЛИ IP:9274/ЧТО-ТО```
    - на:
    - ```https://ВАШ_ПОДДОМЕН_ДЛЯ_ЛАУНЧЕРА/ЧТО-ТО```
-   Измените ссылку на websocket лаунчера с:
    - ```ws://ДОМЕН ИЛИ IP:9274/api```
    - на:
    - ```wss://ВАШ_ПОДДОМЕН_ДЛЯ_ЛАУНЧЕРА/api```
-   Если создавали поддомен, должно быть указано в формате ```launcher.ВАШ_ДОМЕН```
-   Соберите лаунчер командой ```build``` и проверьте работоспособность
-   Закройте порт 9274 (если он был открыт), так как теперь лаунчсервер будет получать и передавать данные через nginx по портам 80 и 443

В качестве дополнительных мер безопасности можно настроить сертификат подписи кода (CodeSign), который помогает уменьшить ложноположительные срабатывания антивирусов на Launch4J обертку (для .exe файла). Установите модуль  [OSSLCodeSignModule](https://github.com/GravitLauncher/LauncherModules/tree/master/OpenSSLSignCode_module)  для подписи. Получить сертификат подписи кода можно несколькими способами:

-   Сгенерировать самоподписанный сертификат с помощью модуля  [GenerateCertificateModule](https://github.com/GravitLauncher/LauncherModules/tree/master/GenerateCertificate_module)
-   Создать себе самоподписанные сертификаты с помощью утилиты  [XCA](https://github.com/chris2511/xca/releases)
-   Купить полноценный сертификат подписи кода (дорого)
-   Отдать сборки лаунчера другому человеку, который подпишет .exe файлы за денежное вознаграждение

Для большинства проектов (кроме достаточно крупных) рекомендуется первый вариант. По ссылке вы можете найти инструкцию по установке модуля и генерации сертификата.

Если вы не крупный проект, то скорее всего столкнетесь с защитником  [SmartScreen](https://docs.microsoft.com/ru-ru/windows/security/threat-protection/microsoft-defender-smartscreen/microsoft-defender-smartscreen-overview), который ведет статистику скачиваний и на файлы с низким числом скачиваний выдает предупреждение. Чтобы его не было, вам необходимо отправить файл на проверку:

-   Зарегистрируйтесь или войдите в аккаунт Microsoft
-   Отправьте файл на проверку, заполнив  [эту форму](https://www.microsoft.com/en-us/wdsi/filesubmission/)
-   Ждите результата

При достижении определенного числа скачиваний проблема уйдет "сама собой", а некоторые пользователи могут её вовсе не заметить.

## Установка на Windows (ТОЛЬКО ДЛЯ ТЕСТИРОВАНИЯ)

Настройте окружение: [Установите JDK FULL по инструкции выше](#установка-jdk-full-17)

Далее вам необходимо установить лаунчсервер ВРУЧНУЮ, без использования скрипта установки

-   На странице  [Launcher releases](https://github.com/GravitLauncher/Launcher/releases)  найдите последний релиз и скачайте его
-   Распакуйте библиотеки и LaunchServer.jar из архива
-   Создайте ```start.bat``` с таким содержимым:

    ```bash:no-line-numbers
    @ECHO OFF
    "ПУТЬ_ДО_JDK_17/bin/java.exe" -javaagent:LaunchServer.jar -jar LaunchServer.jar
    PAUSE
    ```

-   Запустите ```start.bat``` и при первом запуске укажите свой projectName и localhost в качестве адреса
-   Скачайте рантайм для вашей версии лаунчера:  [LauncherRuntime releases](https://github.com/GravitLauncher/LauncherRuntime/releases)
-   Скопируйте папку runtime в папку с установленным лаунчсервером, а .jar файл модуля в папку launcher-modules
-   Запустите лаунчсервер и выполните команду build для запуска сборки. После окончания готовый лаунчер появится в папке ```updates```

## Установка dev версий лаунчсервера

DEV версии лаунчсервера содержат самый новый функционал и исправления, которые ещё не попали в релиз. Они могут быть нестабильны( вызывать проблемы), иметь расхождение с официальной вики. Настоятельно рекомендуется проверять работоспособность dev версий в тестовом окружении, прежде чем давать игрокам.

-   **Первый способ: Установка скриптом.**  Следуйте  [этой](../install/#установка-launchserver-1)  инструкции, используя скрипт установки DEV версии: ```https://mirror.gravitlauncher.com/scripts/setup-dev.sh```
-   **Второй способ: Установка через GitHub Actions.**
    -   Зарегистрируйтесь или войдите на  [GitHub](https://github.com/)
    -   Скачайте архивы с  [лаунчером](https://github.com/GravitLauncher/Launcher/actions?query=event%3Apush+branch%3Adev)  и  [рантаймом](https://github.com/GravitLauncher/LauncherRuntime/actions?query=event%3Apush+branch%3Adev)  с GitHub Actions.
    -   Действуйте аналогично установке  [stable версии](../install/#установка-на-windows-только-для-тестирования) на Windows, используя архивы, скачанные на предыдущем этапе
