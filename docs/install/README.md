# Установка LaunchServer

## Выбор хостинга

Для работы ЛаунчСервера необходим  **виртуальный (VDS/VPS)**  или  **выделенный (Dedicated)**  сервер на дистрибутиве Linux (для  локального тестирования воспользуйтесь [WSL](https://learn.microsoft.com/ru-ru/windows/wsl/install)) , а так же:

-  Один из актуальных дистрибутивов: **Ubuntu 22.04**, **Debian 12**, **CentOS 8**, **ArchLinux** и другие
-  Веб-сервер  **Nginx**  для раздачи статического контента
-  Минимум  **300Мб свободной оперативной памяти**  для работы ЛаунчСервера
-  При сборке ЛаунчСервера из исходников прямо на машине может потребоваться до 1 Гб свободной оперативной памяти для работы Gradle
::: warning Примечание:
-  Лаунчерсервер работает исправно ИСКЛЮЧИТЕЛЬНО НА **LINUX**, при запуске его на **Windows** вам не будет оказана поддержка при решении каких либо проблем!
   -  Такие модули как MirrorHelper не работают с путями **Windows**
   -  Будет возникать проблема с открытиями портов, если подключений к **LaunchServer** внезапно станет очень много
   -  Почти все команды на Wiki приведены исключительно под **Linux** системы
:::

*Опционально:*

-  Веб-сайт, CMS или личный кабинет с поддерживаемым алгоритмом хеширования
-  База данных  **MySQL/MariaDB**  или  **PostgreSQL**

*Рекомендации:*

-  Не размещайте сайт на shared хостинге, так как это может привести к проблемам с подключением к базе данных, производительностью и стабильностью работы
-  Хостинги, предоставляющие VDS/VPS на основе виртуализации OpenVZ не позволяют использовать некоторые программы и нагружать процессор выше определенного уровня длительное время
-  Старые версии дистрибутивов могут содержать уязвимости или слишком старые версии ПО с большим количеством багов. В таком случае рекомендуется обновиться до последней версии или сменить хостинг провайдера

Инструкция по установке на Windows больше недоступна, однако вы можете использовать [WSL](https://learn.microsoft.com/ru-ru/windows/wsl/install) для установки для тестирования и отладки

## Настройка хостинга

- Первым шагом необходимо подготовить окружение:
  - Установить JDK FULL
  - Создать пользователя для ЛаунчСервера

- Настоятельно рекомендуем:
  - Настроить проксирование через Nginx с поддоменом
  - Установить сертификат SSL на поддомен

### Установка JDK 21
Для запуска ЛаунчСервера необходима Java 21. Она так же подходит для запуска майнкрафт сервера 1.18+
Для запуска майнкрафт сервера 1.17.x необходима - Java 16.
Для запуска майнкрафт сервера 1.16.5 и ниже - Java 8.
Необходимо установить их все, если вы собираетесь держать ЛаунчСервер и сервера на одной машине.
:::::: code-group
::::: code-group-item DEBIAN / UBUNTU
::: tip Копировать и вставлять целиком
```bash:no-line-numbers
sudo apt-get update ;
sudo apt-get install gnupg2 wget apt-transport-https -y ;
sudo mkdir -p /etc/apt/keyrings ;
sudo wget -O - https://packages.adoptium.net/artifactory/api/gpg/key/public | tee /etc/apt/keyrings/adoptium.asc ;
echo "deb [signed-by=/etc/apt/keyrings/adoptium.asc] https://packages.adoptium.net/artifactory/deb $(awk -F= '/^VERSION_CODENAME/{print$2}' /etc/os-release) main" | sudo tee /etc/apt/sources.list.d/adoptium.list ;
sudo apt-get update ;
sudo apt-get install temurin-21-jdk ;
wget https://download2.gluonhq.com/openjfx/21/openjfx-21_linux-x64_bin-jmods.zip ;
unzip openjfx-21_linux-x64_bin-jmods.zip ;
sudo cp javafx-jmods-21/* /usr/lib/jvm/temurin-21-jdk-amd64/jmods ;
rm -r javafx-jmods-21
```

:::
::: warning Примечание:
При наличии следующей ошибки:

```sh
java.lang.UnsatisfiedLinkError: /usr/lib/jvm/temurin-21-jdk-amd64/lib/libfontmanager.so: libfreetype.so: cannot open shared object file: No such file or directory
        at java.base/jdk.internal.loader.NativeLibraries.load(Native Method)
```
Установите необходимую библиотеку:
```sh
sudo apt-get libfreetype-dev
```
- Обычна такая ошибка встречается на Ubuntu 22.04
:::
::: tip Смена Java по умолчанию
```bash:no-line-numbers
sudo update-alternatives --config java
sudo update-alternatives --config javac
```
:::

:::::
::::: code-group-item CENTOS
::: tip Добавить репозиторий Adoptium и установить
```bash:no-line-numbers
cat <<EOF > /etc/yum.repos.d/adoptium.repo
[Adoptium]
name=Adoptium
baseurl=https://packages.adoptium.net/artifactory/rpm/rhel/\$releasever/\$basearch
enabled=1
gpgcheck=1
gpgkey=https://packages.adoptium.net/artifactory/api/gpg/key/public
EOF
```
```bash
dnf update
dnf install temurin-21-jdk
wget https://download2.gluonhq.com/openjfx/21/openjfx-21_linux-x64_bin-jmods.zip ;
unzip openjfx-21_linux-x64_bin-jmods.zip ;
sudo cp javafx-jmods-21/* /usr/lib/jvm/temurin-21-jdk/jmods ;
alternatives --config java
alternatives --config javac
```
:::
:::: tip Смена Java по умолчанию
```bash:no-line-numbers
sudo alternatives --config java
sudo alternatives --config javac
```
::::
:::::
::::: code-group-item WINDOWS
::: tip Откройте PowerShell (От имени Администратора)
- Установите пакет **Adoptium JDK 21** с помощью **winget**
```bash:no-line-numbers
winget install EclipseAdoptium.Temurin.21.JDK
```
- Откройте [сайт OpenJFX](https://gluonhq.com/products/javafx/) и скачайте последнюю версию **SDK** и **jmods** для Java 21
- Распакуйте файлы с расширением jmod из архива с **jmods** в `C:\Program Files\Eclipse Adoptium\ВАША_JDK\jmods`
- Распакуйте файлы из архива *SDK* (внутри будет папка с названием версии, распакуйте её содержимое а не саму папку) в `C:\Program Files\Eclipse Adoptium\ВАША_JDK\`
:::
:::::
::::: code-group-item OTHER
::: tip Установка для других систем
Посетите сайт JDK [Adoptium](https://adoptium.net/) и [OpenJFX](https://gluonhq.com/products/javafx/)
:::
:::::
::::::

::: warning Примечание:
- Такие архитектуры как **arm64** и **armhf** не поддерживают сборку EXE - бинарного файла Лаунчера, через launch4j
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
**После завершения установки запустите ЛаунчСервер для начальной настройки:**
```bash:no-line-numbers
./start.sh
```
-   Укажите ваш ДОМЕН или IP, на котором будет работать ЛаунчСервер
-   Укажите название вашего проекта, которое будет отображаться в Лаунчере и в папке AppData
-   После первого запуска закройте ЛаунчСервер командой **stop**

```bash:no-line-numbers
stop
```
:::: details Описание папок и файлов установленных скриптом
::: tip Список папок SRC и git:
-   **src/**  - исходный код ЛаунчСервера, API, модулей, Лаунчера
-   **srcRuntime/**  - исходный код графической части Лаунчера (рантайм)
-   **compat/**  - дополнительные важные файлы: библиотека авторизации, ServerWrapper, модули для Лаунчера и ЛаунчСервера и т.д.
:::
::: tip Установщик так же собирает все модули, готовые модули можно найти по путям:
-   **src/modules/<НазваниеМодуля>_module/build/libs/<НазваниеМодуля>_module.jar** - собранный модуль для ЛаунчСервера.
-   **src/modules/<НазваниеМодуля>_lmodule/build/libs/<НазваниеМодуля>_lmodule.jar** - собранный модуль для Лаунчера.
:::
::: tip Готовые скрипты, созданные установщиком:
-   **./start.sh**  - запуск ЛаунчСервера для тестирования и начальной настройки
-   **./startscreen.sh**  - запуск ЛаунчСервера на постоянной основе с помощью утилиты screen. Не запускайте два ЛаунчСервера одновременно!
-   **./update.sh**  - обновляет ЛаунчСервер, Лаунчер и рантайм до последней релизной версии
:::
::: tip Список папок ЛаунчСервера:
-   **libraries/**  - библиотеки для ЛаунчСервера
-   **modules/**  - модули для ЛаунчСервера (оканчивающиеся на _module.jar)
-   **profiles/**  - папка профилей для запуска Minecraft
-   **updates/**  - папка обновлений
-   **logs/**  - папка с логами (журналом) ЛаунчСервера
-   **runtime/**  - папка с дизайном Лаунчера
-   **launcher-modules/**  - модули для Лаунчера (оканчивающиеся на _lmodule.jar)
-   **launcher-libraries/**  - библиотеки для Лаунчера
-   **launcher-compile-libraries/**  - вспомогательные библиотеки для Лаунчера
-   **launcher-pack** - файлы, которые будут включены в jar Лаунчера без изменений
-   **config/**  - настройка конфигурации модулей
-   **proguard/**  - настройки Proguard (обфускация кода)
-   **guard/**  - нативная защита (по умолчанию отсутствует)
:::
::::

### Настройка Nginx

Для достижения оптимальной производительности отдачи файлов нужно настроить Nginx

- Посетите сайт [\[NGINX\]](https://nginx.org/ru/linux_packages.html) и установите Nginx в соответствии с вашей системой

- Создайте в пространстве имён своего домена **A** запись, вида `launcher.ИМЯ_ВАШЕГО_ДОМЕНА.ru`, с вашим **IP** машины с ЛаунчСервером
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
    server_name launcher.ВАШ_ДОМЕН;
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
 - Без доменного имени перенос Лаунчера на другую машину привёдёт к отказу самообновления.
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

Для обеспечения безопасности передаваемых паролей, защиты от внедрения в процесс обмена данными нужно подключить к своему домену SSL сертификат. На данный момент его можно купить или получить бесплатно (Let's Encrypt/Cloudflare). Вы должны будете установить его на домен с ЛаунчСервером ```ВАШ_ПОДДОМЕН_ДЛЯ_ЛАУНЧЕРА``` это ```launcher.ИМЯ_ВАШЕГО_ДОМЕНА.ru``` и немного изменить настройки ЛаунчСервера:

-   Откройте файл LaunchServer.json и найдите там секцию netty
-   Измените ссылки формата:
    - ```http://ВАШ_ПОДДОМЕН_ДЛЯ_ЛАУНЧЕРА ИЛИ IP:9274/ЧТО-ТО```
    - на:
    - ```https://ВАШ_ПОДДОМЕН_ДЛЯ_ЛАУНЧЕРА/ЧТО-ТО```
-   Измените ссылку на websocket Лаунчера с:
    - ```ws://ДОМЕН ИЛИ IP:9274/api```
    - на:
    - ```wss://ВАШ_ПОДДОМЕН_ДЛЯ_ЛАУНЧЕРА/api```
-   Если создавали поддомен, должно быть указано в формате ```launcher.ВАШ_ДОМЕН```
-   Соберите Лаунчер командой ```build``` и проверьте работоспособность
-   Закройте порт 9274 (если он был открыт), так как теперь ЛаунчСервер будет получать и передавать данные через nginx по портам 80 и 443

В качестве дополнительных мер безопасности можно настроить сертификат подписи кода (CodeSign), который помогает уменьшить ложноположительные срабатывания антивирусов на Launch4J обертку (для .exe файла). Установите модуль  [OSSLCodeSignModule](https://github.com/GravitLauncher/LauncherModules/tree/master/OpenSSLSignCode_module)  для подписи. Получить сертификат подписи кода можно несколькими способами:

-   Сгенерировать самоподписанный сертификат с помощью модуля  [GenerateCertificateModule](https://github.com/GravitLauncher/LauncherModules/tree/master/GenerateCertificate_module)
-   Создать себе самоподписанные сертификаты с помощью утилиты  [XCA](https://github.com/chris2511/xca/releases)
-   Купить полноценный сертификат подписи кода (дорого)
-   Отдать сборки Лаунчера другому человеку, который подпишет .exe файлы за денежное вознаграждение

Для большинства проектов (кроме достаточно крупных) рекомендуется первый вариант. По ссылке вы можете найти инструкцию по установке модуля и генерации сертификата.

Если вы не крупный проект, то скорее всего столкнетесь с защитником  [SmartScreen](https://docs.microsoft.com/ru-ru/windows/security/threat-protection/microsoft-defender-smartscreen/microsoft-defender-smartscreen-overview), который ведет статистику скачиваний и на файлы с низким числом скачиваний выдает предупреждение. Чтобы его не было, вам необходимо отправить файл на проверку:

-   Зарегистрируйтесь или войдите в аккаунт Microsoft
-   Отправьте файл на проверку, заполнив  [эту форму](https://www.microsoft.com/en-us/wdsi/filesubmission/)
-   Ждите результата

При достижении определенного числа скачиваний проблема уйдет "сама собой", а некоторые пользователи могут её вовсе не заметить.

### Установка LauncherPrestarter
Начииная с версии 5.5 лаунчер требует Java 17+ для работы. Что бы избавить игроков от необходимости устанавливать Java самостоятельно был создан LauncherPrestarter. Перейдите на [страницу проекта на GitHub](https://github.com/GravitLauncher/LauncherPrestarter) что бы узнать больше

## Установка dev версий ЛаунчСервера

DEV версии ЛаунчСервера содержат самый новый функционал и исправления, которые ещё не попали в релиз. Они могут быть нестабильны( вызывать проблемы), иметь расхождение с официальной вики. Настоятельно рекомендуется проверять работоспособность dev версий в тестовом окружении, прежде чем давать игрокам.

-   **Первый способ: Установка скриптом.**  Следуйте  [этой](../install/#установка-launchserver-1)  инструкции, используя скрипт установки DEV версии: ```https://mirror.gravitlauncher.com/scripts/setup-dev.sh```
-   **Второй способ: Установка через GitHub Actions.**
    -   Зарегистрируйтесь или войдите на  [GitHub](https://github.com/)
    -   Скачайте архивы с  [Лаунчером](https://github.com/GravitLauncher/Launcher/actions?query=event%3Apush+branch%3Adev)  и  [рантаймом](https://github.com/GravitLauncher/LauncherRuntime/actions?query=event%3Apush+branch%3Adev)  с GitHub Actions.
    -   Действуйте аналогично установке  [stable версии](../install/#установка-на-windows-только-для-тестирования) на Windows, используя архивы, скачанные на предыдущем этапе
