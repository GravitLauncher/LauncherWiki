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

### Установка Docker

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

## Выбор CMS

Что бы ваши пользователи могли зарегистрироваться на вашем проекте, вам нужен сайт или Discord/Telegram бот где вы сможете настроить регистрацию

### Вариант 1: SimpleCabinet

Самый простой способ для начинающего проекта - воспользоваться [SimpleCabinetDockered](https://github.com/SimpleCabinet/SimpleCabinetDockered). В README вы найдете информацию по его базовой настройке

### Вариант 2: Сторонние CMS

Для запуска образа лаунчера вам понадобится [LauncherDockered](https://github.com/GravitLauncher/LauncherDockered). Следуйте инструкции в README, после чего [настройте авторизацию sql](../auth/README.md#метод-sql) в соответствии с вашей базой данных.

## Установка необходимых модулей

Лаунчсервер поддерживает множество модулей, которые могут использоваться для расширения функциональности. Большую часть из них вы можете найти в разделе [модули](../modules/README.md). Установим и настроим самые необходимые:

```bash
docker compose exec gravitlauncher /app/install_launchserver_module.sh MirrorHelper
docker compose exec gravitlauncher /app/install_launchserver_module.sh GenerateCertificate
docker compose exec gravitlauncher bash -c "cd /app/data && wget https://github.com/GravitLauncher/LauncherPrestarter/releases/latest/download/Prestarter.exe"
docker compose exec gravitlauncher bash -c "cd /app/data/modules && wget https://github.com/GravitLauncher/LauncherPrestarter/releases/latest/download/Prestarter_module.jar"
docker compose restart gravitlauncher
sleep 10
echo "applyworkspace" | docker compose exec -T gravitlauncher socat UNIX-CONNECT:control-file -
echo "generatecertificate" | docker compose exec -T gravitlauncher socat UNIX-CONNECT:control-file -
docker compose exec gravitlauncher /app/install_launchserver_module.sh OpenSSLSignCode
docker compose restart gravitlauncher
sleep 10
echo "build" | docker compose exec -T gravitlauncher socat UNIX-CONNECT:control-file -
```

## Подключение Nginx

Используйте следующую конфигурацию nginx

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

## Установка клиента

:::: tabs
@tab Forge 1.7.10

**Подготовка (выполняется только один раз):**
- Скачайте актуальный установщик последней версии Forge с [оффициального сайта](https://maven.minecraftforge.net/net/minecraftforge/forge/1.7.10-10.13.4.1614-1.7.10/forge-1.7.10-10.13.4.1614-1.7.10-installer.jar)
- Скачайте [forget_install_dir.zip](https://mirror.gravitlauncher.com/5.6.x/forge_install_dir.zip) и распакуйте в любом удобном для вас месте
- Запустите установщик на вашей локальной машине и укажите путь в распакованную папку forge_install_dir
- Выполните (на локальной машине!)

```bash
cd TO_FORGE_INSTALL_DIR
tar -c * | ssh user@host "cd PATH_TO_DOCKERED && docker compose exec gravitlauncher bash -c 'mkdir -p /app/data/config/MirrorHelper/workspace/clients/forge/1.7.10 && cd /app/data/config/MirrorHelper/workspace/clients/forge/1.7.10/ && tar -x'"
```

- user@host замените на пользователь@хост вашего сервера
- TO_FORGE_INSTALL_DIR замените на путь на вашей локальной машине до распакованной forge_install_dir
- VERSION замените на желаемую версию Minecraft
- PATH_TO_DOCKERED замените на путь до папки LauncherDockered Или SimpleCabinetDockered

**Установка:**
- Выполните (на удаленной машине!)

```bash
echo "installclient ClientTitle 1.7.10 FORGE" | docker compose exec -T gravitlauncher socat UNIX-CONNECT:control-file -
```

- ClientTitle замените на желаемое имя клиента

@tab Forge 1.12.2

**Подготовка (выполняется только один раз):**
- Скачайте с [GitHub Cleanroom](https://github.com/CleanroomMC/Cleanroom) последний доступный installer
- Переименуйте его в `forge-1.12.2-installer-nogui.jar`
- Выполните (на локальной машине!)

```bash
cd TO_INSTALLER_DIR
tar -c forge-1.12.2-installer-nogui.jar | ssh user@host "cd PATH_TO_DOCKERED && docker compose exec gravitlauncher bash -c 'cd /app/data/config/MirrorHelper/workspace/installers/ && tar -x'"
```

- user@host замените на пользователь@хост вашего сервера
- TO_INSTALLER_DIR замените на путь на вашей локальной машине до папки где лежит forge-1.12.2-installer-nogui.jar
- PATH_TO_DOCKERED замените на путь до папки LauncherDockered Или SimpleCabinetDockered

**Установка:**
- Выполните (на удаленной машине!)

```bash
echo "installclient ClientTitle 1.12.2 FORGE" | docker compose exec -T gravitlauncher socat UNIX-CONNECT:control-file -
```

- ClientTitle замените на желаемое имя клиента

@tab NeoForge

**Подготовка (выполняется только один раз):**
- Скачайте с оффициального сайта installer необходимой вам версии NeoForge
- Переименуйте его в `neoforge-VERSION-installer-nogui.jar`, где VERSION это версия Minecraft
- Выполните (на локальной машине!)

```bash
cd TO_INSTALLER_DIR
tar -c neoforge-VERSION-installer-nogui.jar | ssh user@host "cd PATH_TO_DOCKERED && docker compose exec gravitlauncher bash -c 'cd /app/data/config/MirrorHelper/workspace/installers/ && tar -x'"
```

- user@host замените на пользователь@хост вашего сервера
- TO_INSTALLER_DIR замените на путь на вашей локальной машине до папки где лежит neoforge-VERSION-installer-nogui.jar
- VERSION замените на желаемую версию Minecraft
- PATH_TO_DOCKERED замените на путь до папки LauncherDockered Или SimpleCabinetDockered

**Установка:**
- Выполните (на удаленной машине!)

```bash
echo "installclient ClientTitle 1.21.4 NEOFORGE" | docker compose exec -T gravitlauncher socat UNIX-CONNECT:control-file -
```

- ClientTitle замените на желаемое имя клиента
- 1.21.4 замените на версию Minecraft

@tab Fabric
- Выполните

```bash
echo "installclient ClientTitle 1.21.4 FABRIC" | docker compose exec -T gravitlauncher socat UNIX-CONNECT:control-file -
```

- ClientTitle замените на желаемое имя клиента
- 1.21.4 замените на версию Minecraft

@tab Quilt
- Выполните

```bash
echo "installclient ClientTitle 1.21.4 QUILT" | docker compose exec -T gravitlauncher socat UNIX-CONNECT:control-file -
```

- ClientTitle замените на желаемое имя клиента
- 1.21.4 замените на версию Minecraft

::::

## Установка сервера

Для упрощения установки распространенных ядер серверов Minecraft был создан проект [ServersDockered](https://github.com/GravitLauncher/ServersDockered) в котором содержатся скрипты для создания своих образов и использования их для создания новых серверов. Если вашего ядра нет в списке готовых образов обратитесь к более [подробной инструкции](../servers/README.md)


### Выбор ядра

Выбор ядра зависит в первую очередь от версии Minecraft которую вы собираетесь использовать, а так же выборанного загрузчика модов forge/fabric и наличия/отсутствия поддержки плагинов bukkit. Все ядра представленные в образах рекомендуются к использованию - они актуальны и поддерживают Java 17+

### Сборка образа

- Скачайте репозиторий ServersDockered

```bash
git clone https://github.com/GravitLauncher/ServersDockered.git
cd ServersDockered
```

- Зайдите в папку интересующего вас ядра
- Отредактируйте файл build.sh подставив туда необходимые параметры
- Выполните скрипт build.sh
- Перейдите в директорию с LauncherDockered/SimpleCabinetDockered и создайте токен сервера

```bash
echo "token server Forge1.7.10 std false" | docker compose exec -T gravitlauncher socat UNIX-CONNECT:control-file -
```
Где Forge1.7.10 это title профиля клиента(вы указывали его при выполнении `installclient`), а `std` это внутреннее имя типа авторизации. Если вы не меняли его и не используете несколько типов авторизации - оставьте `std`

### Использование отдельной папки

- Создайте папку в любом удобном для вас месте и переместите туда файл docker-compose.yml из папки docker-compose-example
- Настройте параметры: `image` это тег образа сервера который вы хотите использовать, `SERVERWRAPPER_ADDRESS` это адрес лаунчсервера(в рамках сети Docker вы можете использовать `host.docker.internal` для обозначения хост машины или полное имя сервиса `launcherdockered-gravitlauncher` для обозначения лаунчсервера), `SERVERWRAPPER_CHECK_SERVER_TOKEN` это токен который вы создали на предыдущем этапе, `_JAVA_OPTIONS` это опции JVM
- Запустите сервер командой `docker compose up -d`

### Использование общей папки вместе с лаунчсервером

- Перенесите конфигурацию сервиса и volume из файла docker-compose.yml из папки docker-compose-example в ваш docker-compose.yml
- Настройте параметры: `image` это тег образа сервера который вы хотите использовать, `SERVERWRAPPER_ADDRESS` это адрес лаунчсервера(в рамках сети Docker вы можете использовать `host.docker.internal` для обозначения хост машины или полное имя сервиса `gravitlauncher` для обозначения лаунчсервера), `SERVERWRAPPER_CHECK_SERVER_TOKEN` это токен который вы создали на предыдущем этапе, `_JAVA_OPTIONS` это опции JVM
- Запустите сервер командой `docker compose up -d`

## Распространенные проблемы и их решения

### Защитник SmartScreen ругается на лаунчер

Это нормальное поведение защитника SmartScreen на любые файлы с низким числом скачиваний. Вы можете решить проблему несколькими способами:

- Купить полноценный сертификат подписи кода или воспользоватся услугами тех кто подпишет файл за вас (дорого)
- Отправить файл на проверку в Microsoft через [эту форму](https://www.microsoft.com/en-us/wdsi/filesubmission/)
