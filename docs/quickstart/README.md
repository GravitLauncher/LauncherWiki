# Быстрый старт

В этой инструкции мы подробно разберем техническую сторону создания своего проекта. Всё остальное - от идеи и тематики до команды администраторов, разработчиков и дизайнеров это полностью ваш выбор. Этот гайд будет полезен как новичкам, так и опытным администраторам - каждый найдет для себя здесь что то новое.

## Выбор хостинга

Мы рекомендуем иметь несколько VDS/VPS серверов под различные задачи если это возможно. Так обеспечивается большая безопасность и разделение ответственности - проблемы на одном сервере не приведут к проблемам на другом сервере. Мы рекомендуем иметь хотя бы два сервера - VDS/VPS под лаунчсервер, сайт и базу данных, и VDS/Dedicated сервер под сервера.

### Требования к хостингу для GravitLauncher, сайта и базы данных

Общие требования, учитывающие что вы будете держать на этом сервере GravitLauncher, сайт и базу данных

:::: tabs

@tab Минимальные
- 2Гб оперативной памяти
- 1 или 2 ядра
- 10Гб свободного пространства HDD или SSD
- Виртуализация KVM или Hyper-V
- Актуальный дистрибутив Linux: Ubuntu 24.10 и выше, Debian 12 и выше, ArchLinux, Fedora
- IPv4 адрес

@tab Рекомендуемые
- 4Гб оперативной памяти
- 2 или 4 ядра
- 30Гб свободного пространства SSD
- Виртуализация KVM или Hyper-V
- Актуальный дистрибутив Linux: Ubuntu 24.10 и выше, Debian 12 и выше, ArchLinux, Fedora
- IPv4 адрес
::::

### Требования к хостингу Minecraft сервера

Требования зависят от версии Minecraft, числа игроков, установленных модов и плагинов и размера карты. Поскольку в отличии от сайта, базы данных и GravitLauncher сервер Minecraft не способен использовать много потоков, главными притериями выбора становится частота процессора и объем оперативной памяти. Здесь вы можете посмотреть усредненные цифры для сборок средней сложности и небольшом онлайне. Если вы планируете держать несколько серверов на одном физическом/виртуальном сервере убедитесь что ресурсов процессора, памяти и диска хватит всем.

:::: tabs
@tab Легкая сборка
- 4Гб оперативной памяти
- 2 ядра
- 30Гб свободного пространства SSD
- Виртуализация KVM или Hyper-V
- Актуальный дистрибутив Linux: Ubuntu 24.10 и выше, Debian 12 и выше, ArchLinux, Fedora
- IPv4 адрес

@tab Средняя сборка
- 8Гб оперативной памяти
- 4 ядра
- 50Гб свободного пространства SSD
- Виртуализация KVM или Hyper-V
- Актуальный дистрибутив Linux: Ubuntu 24.10 и выше, Debian 12 и выше, ArchLinux, Fedora
- IPv4 адрес

@tab Тяжелая сборка
- 16Гб оперативной памяти
- 6 ядер
- 80Гб свободного пространства SSD
- Виртуализация KVM или Hyper-V
- Актуальный дистрибутив Linux: Ubuntu 24.10 и выше, Debian 12 и выше, ArchLinux, Fedora
- IPv4 адрес
::::


### VDS против Dedicated

Производительность dedicated серверов выше, так как вы не делите ресурсы с другими пользователями хостинга - весь физический сервер принадлежит вам. Однако аренда dedicated сервера вам обойдется дороже, а его мощности оправданы только при наличии нескольких Minecraft серверов или большом онлайне. С точки зрения настройки VDS и dedicated не будут отличаться.

### Выбор хостинг провайдера

В мире существуют множество компаний предлагающих услуги хостинга. Вы можете купить сервера у одной из них или приобрести белый IP у вашего провайдера и установить сервер у себя дома. Во втором случае вы сами собираете свой собственный домашний сервер - любые отключения электропитания или интернета, технические проблемы на сервере, выход из строя каких то компонентов, стабильность - будут влиять на ваших игроков
- Отдавайте предпочтение хостинг провайдерам которым вы доверяете. Помните, что как у крупных хостинг провайдеров бывают плохо работающие сервера, так и у мелких провайдеров в силу своей непопулярности могут быть выгодные предложения
- Читайте отзывы. Чаше всего реальные отзывы оставляют люди у которых что то не работает или они недовольны хостингом - помните об этом когда будете их читать. Люди, у которых всё хорошо работает редко будут оставлять отзывы
- Купите минимальную конфигурацию или сервер с почасовой/подневной оплатой и проверьте скорость сетевого соеденения, пинг и потери пакетов, работу диска, удобство панели управления и другие параметры, важные для вас
- Прочитайте пользовательское соглашение
- Прочитайте FAQ и посты в блоге хостинг провайдера - там вы можете найти полезную информацию
- Посмотрите на дополнительные услуги и функции: есть ли защита от DDoS атак, выдают ли IPv6, можно ли загружать свои iso образы, есть ли объеденение нескольких виртуальных машин в одну сеть и т.д.

### Регистрация домена

Для того что бы использовать читаемые адреса вместо IP вам нужен домен. Часто компании, занимающиеся предоставлением хостинга, так же продают домены
- В разных зонах цена может сильно отличатся
- В некоторых зонах требуется предоставить дополнительные документы
- Смена регистратора и владельца в разных зонах и у разных регистраторов может отличаться
- Цена продления может сильно отличаться от изначальной цены - будьте внимательны

## Настройка локального окружения

Здесь и далее редполагается что вы купили VDS/Dedicated сервера необходимые вам и домен

- Вам необходимо установить [WSL](https://learn.microsoft.com/ru-ru/windows/wsl/install) если вы используете Windows на вашем ПК. Все дальнейшие команды во всех разделах приведены для Linux и WSL
- Выполните `ssh-keygen` что бы сгенерировать ключ SSH
- Выполните `ssh-copy-id root@IP` где IP - IP вашего VDS/Dedicated сервера. Если у вас несколько серверов выполните эту команду для каждого сервера. Пароль от root как правило пишется в панели управления хостингом

## Базовая настройка сервера

После того как вы настроили подключение к вашим серверам пора занятся их настройкой. В этом разделе мы настроим firewall, закроем вход в SSH по паролю и установим базовые инструменты. Если у вас несколько серверов - рекомендуется повторить эту процедуру для каждого
- Войдите на сервер командой `ssh root@IP`
- Установите базовые пакеты
:::: tabs
@tab Ubuntu/Debian
```bash
apt update
apt upgrade
apt install nftables nano vim htop iotop curl wget screen jq
```
@tab Fedora/CentOS
```bash
dnf upgrade
dnf install nftables nano vim htop iotop curl wget screen jq
```
@tab ArchLinux
```bash
pacman -Syu
pacman -S nftables nano vim htop iotop curl wget screen jq
```
::::
- Отключите аудентифицкаию по паролю - для этого выполните `nano /etc/ssh/sshd_config`, раскомментируйте строку `PasswordAuthentication` и установите её значение на `no`  
Сохранить Ctrl+O  
Выйти Ctrl + X
- Перезапустите sshd командой `systemctl restart sshd`
- Перезагрузите сервер командой `systemctl reboot`

### Настройка firewall

- Выполните `nano /etc/nftables.conf` и замените предыдущую конфигурацию на:
```bash
#!/sbin/nft -f

flush ruleset

table inet filter {
	chain input {
		type filter hook input priority 0; policy drop;
		ct state invalid counter drop comment "early drop of invalid packets"
		ct state {established, related} counter accept comment "accept all connections related to connections made by us"
		iif lo accept comment "accept loopback"
		iif != lo ip daddr 127.0.0.1/8 counter drop comment "drop connections to loopback not coming from loopback"
		iif != lo ip6 daddr ::1/128 counter drop comment "drop connections to loopback not coming from loopback"
		ip protocol icmp counter accept comment "accept all ICMP types"
		meta l4proto ipv6-icmp counter accept comment "accept all ICMP types"
		tcp dport 22 counter accept comment "accept SSH"
        tcp dport { http, https } counter accept comment "accept http/https"
        tcp dport { 25565 } counter accept comment "accept minecraft"
		counter comment "count dropped packets"
	}

	chain forward {
		type filter hook forward priority 0; policy drop;
		counter comment "count dropped packets"
	}

	# If we're not counting packets, this chain can be omitted.
	chain output {
		type filter hook output priority 0; policy accept;
		counter comment "count accepted packets"
	}
}
```
- Включите firewall `systemctl enable nftables`
- Запустите firewall `systemctl restart nftables`

## Установка LaunchServer

LaunchServer - это главный сервис лаунчера предоставляющий все самые важные функции:
- Сборка лаунчера (команда `build`)
- Сборка клиентов (команда `installclient`)
- Соеденение с различными сервисами авторизации и CMS
- Выполнение запросов от лаунчера, проверка авторизации и токенов доступа

Существуют несколько способов установки LaunchServer на вашу машину

### Установка с помощью Docker

:::: tabs
@tab [ UBUNTU | DEBIAN | CentOS 8/7 | Fedora 41^ ]
```bash
curl -sSL https://get.docker.com/ | bash
```
@tab [ ArchLinux]
Вы можете просто установить docker из официального репозитория
```bash
pacman -S docker
```
Запустите docker командой `systemctl enable --now docker`
::::
- Поддерживаемые дистрибутивы и архитектуры: [Docker Install](https://docs.docker.com/engine/install/)

#### Установка через LauncherDockered

Этот проект позволяет запустить лаунчер вместе с корректной конфигурацией nginx если вы используете собственное подключение к БД

- Установите git
- После установки Docker и git выполните команду:

```bash
git clone https://github.com/GravitLauncher/LauncherDockered.git
cd LauncherDockered
```

- Отредактируйте `docker-compose.yml` указав **внешний** адрес лаунчсервера и желаемое имя проекта
- Запустите лаунчсервер командой `docker compose up -d`
- После завершения инициализации(подождите около 5-10 секунд) выполните базовую настройку:

```bash
echo "modules load MirrorHelper" | docker compose exec -T gravitlauncher socat UNIX-CONNECT:control-file -
echo "modules load GenerateCertificate" | docker compose exec -T gravitlauncher socat UNIX-CONNECT:control-file -
echo "applyworkspace" | docker compose exec -T gravitlauncher socat UNIX-CONNECT:control-file -
echo "generatecertificate" | docker compose exec -T gravitlauncher socat UNIX-CONNECT:control-file -
docker compose exec gravitlauncher wget https://github.com/GravitLauncher/LauncherRuntime/releases/latest/download/JavaRuntime.jar
docker compose exec gravitlauncher bash -c "mkdir runtime && cd runtime && wget https://github.com/GravitLauncher/LauncherRuntime/releases/latest/download/runtime.zip && unzip runtime.zip && rm runtime.zip && cd .."
echo "modules launcher-load JavaRuntime.jar" | docker compose exec -T gravitlauncher socat UNIX-CONNECT:control-file -
echo "modules load Prestarter" | docker compose exec -T gravitlauncher socat UNIX-CONNECT:control-file -
docker compose exec gravitlauncher wget https://github.com/GravitLauncher/LauncherPrestarter/releases/latest/download/Prestarter.exe
```

#### Установка через SimpleCabinetDockered

Этот проект позволяет запустить лаунчер вместе с SimpleCabinet - готовым кабинетом с сменой скинов, плащей, пагазином и другими функциями для вашего проекта Minecraft. Не поддерживает привязку к вашей CMS (без дополнительной работы)

- Установите git
- После установки Docker и git выполните команду:

```bash
git clone https://github.com/SimpleCabinet/SimpleCabinetDockered.git
cd SimpleCabinetDockered
```

- Отредактируйте `docker-compose.yml` указав **только** желаемое имя проекта
- Отредактируйте `setup.sh` указав внешний адрес кабинета в `SIMPLECABINET_REMOTE`
- Запустите установку командой `chmod +x setup.sh && ./setup.sh`
- После завершения инициализации(подождите около 5-10 секунд) выполните базовую настройку:

```bash
echo "modules load MirrorHelper" | docker compose exec -T gravitlauncher socat UNIX-CONNECT:control-file -
echo "modules load GenerateCertificate" | docker compose exec -T gravitlauncher socat UNIX-CONNECT:control-file -
echo "applyworkspace" | docker compose exec -T gravitlauncher socat UNIX-CONNECT:control-file -
echo "generatecertificate" | docker compose exec -T gravitlauncher socat UNIX-CONNECT:control-file -
docker compose exec gravitlauncher wget https://github.com/GravitLauncher/LauncherRuntime/releases/latest/download/JavaRuntime.jar
docker compose exec gravitlauncher bash -c "mkdir runtime && cd runtime && wget https://github.com/GravitLauncher/LauncherRuntime/releases/latest/download/runtime.zip && unzip runtime.zip && rm runtime.zip && cd .."
echo "modules launcher-load JavaRuntime.jar" | docker compose exec -T gravitlauncher socat UNIX-CONNECT:control-file -
echo "modules load Prestarter" | docker compose exec -T gravitlauncher socat UNIX-CONNECT:control-file -
docker compose exec gravitlauncher wget https://github.com/GravitLauncher/LauncherPrestarter/releases/latest/download/Prestarter.exe
```

#### Конфигурация nginx

В обоих случаях конфигурация nginx будет одинаковой:

:::: tabs
@tab Без SSL

```nginx
upstream gravitlauncher {
    server 127.0.0.1:17549;
}

map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    listen 80;
    server_name launcher.mydomain.ru;

    charset utf-8;
    #access_log  /var/log/nginx/launcher.access.log;
    #error_log  /var/log/nginx/launcher.error.log notice;

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    location / {
        proxy_pass http://gravitlauncher;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

@tab С SSL

```nginx
upstream gravitlauncher {
    server 127.0.0.1:17549;
}

map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    listen 80;
	listen 443 ssl;
    server_name launcher.mydomain.ru;
    ssl_certificate     /path/to/cartificate/cert.crt;
    ssl_certificate_key /path/to/cartificate/cert.key;

    charset utf-8;
    #access_log  /var/log/nginx/launcher.access.log;
    #error_log  /var/log/nginx/launcher.error.log notice;

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    location / {
        proxy_pass http://gravitlauncher;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

::::

#### Конфигурация SSL через Certbot

Установка Certbot и быстрая настройка сертификатов через плагин nginx

:::: tabs
@tab Ubuntu / Debian

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

@tab Fedora / CentOS / RHEL

```bash
sudo dnf install certbot python3-certbot-nginx
```

@tab Arch Linux

```bash
sudo pacman -S certbot certbot-nginx
```
::::

Интерактивная установка сертификата (рекомендуется для первого запуска)

- При выполнении вы введёте email, согласитесь с ToS и выберете опцию для EFF
```bash
sudo certbot --nginx
```

Быстрая установка для конкретного поддомена (без интерактива)

```bash
sudo certbot --nginx -d launcher.ВАШ_ДОМЕН --email ВАШ_EMAIL --agree-tos --no-eff-email
```

### Установка с помощью скрипта

Для разработки и тестирования, а так же если вы не умеете работать с средой Docker вы можете использовать установку лаунчсервера напрямую с помощью скрипта установки

- Выполните следующий скрипт:

:::: tabs
@tab Git
```bash
curl -o install_plain_git.sh https://mirror.gravitlauncher.com/5.7.x/scripts/install_plain_git.sh && chmod +x install_plain_git.sh && ./install_plain_git.sh
```
@tab Zip
```bash
curl -o install_plain.sh https://mirror.gravitlauncher.com/5.7.x/scripts/install_plain.sh && chmod +x install_plain.sh && ./install_plain.sh
```
::::

#### Настройка nginx для установки скриптом

:::: tabs
@tab [ На DNS имени ]
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
@tab [ На IP ]
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
@tab [ Под Docker ]
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
::::

## Защита лаунчера

GravitLauncher предоставляет несколько механизмов призванных повысить безопасность и защиту от читеров. Некоторые из этих способов снижают удобство отладки и разработки, поэтому включать их  стоит на production лаунчсервере

### Опции лаунчера

- Установите параметр `env` в конфигурации лаунчсервера в PROD
- Установите параметр `encryptRuntime` в конфигурации лаунчсервера в `true`
- Установите параметр `type` в разделе `protectHandler` в `advanced`
- Перезапустите лаунчсервер и выполните `build`

### Установка GravitGuard

GravitGuard это проект созданный для защиты от читов основанных на инъекции dll в процесс

- Скачайте пресобранный билд или соберите самостоятельно проект [GravitGuard](https://github.com/GravitLauncher/GravitGuard)
- Поместите папку `guard` в папку `launcher-pack` лаунчсервера
- Установите модуль `LauncherGuard`
- Перезапустите лаунчсервер и выполните `build`

### CertificatePinning

Эта технология призвана защитить от атаки MITM через подстановку в систему своего TLS/SSL сертификата. Что бы её использовать выполните слеюущие действия:

- Определитесь с тем какой TLS сертификат вы будете использовать постоянно, например Cloudflare, Lets Encrypt или свой самоподписанный
- Скачайте корневой сертификат: в Firefox это можно сделать нажав на замочек, после чего открыть информацию о соеденении -> View SCertificate -> выбрав в списке самый правый сертификат и нажав `PEM (cert)`. В Chrome: значек меню слева от адресной строки -> Connection is secure -> выбрать самый верхний сертификат -> Export
- Положите сертификат с расширением crt в папку `truststure` лаунчсервера
- Установите `certificatePinning` в true в конфигурации лаунчсервера
- Перезапустите лаунчсервер и выполните `build`

::: tip
Если по той или иной причине вы захотите сменить провайдера сертификата TLS/SSL вам будет необходимо добавить новый сертификат в `truststore` лаунчсервера и сделать build до перехода после чего дождаться пока большинство игроков обновят лаунчер. В противном случае лаунчер не будет доверять новому сертификату и игроки не смогут запустить лаунчер и войти в игру без ручного обновления
:::

## Распространенные проблемы и их решения

### Защитник SmartScreen ругается на лаунчер

Это нормальное поведение защитника SmartScreen на любые файлы с низким числом скачиваний. Вы можете решить проблему несколькими способами:

- Купить полноценный сертификат подписи кода или воспользоватся услугами тех кто подпишет файл за вас (дорого)
- Отправить файл на проверку в Microsoft через [эту форму](https://www.microsoft.com/en-us/wdsi/filesubmission/)
