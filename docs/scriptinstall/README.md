# Установка лаунчсервера скриптом

Этот раздел содержит инструкцию по установке лаунчсервера без использования Docker для тестирования и отладки, а так же для тех кто предпочитает старый способ установки. Всем новым пользователям рекомендуется использовать [полный гайд](../quickstart/README.md)

## Настройка хостинга

- Первым шагом необходимо подготовить окружение:
  - Установить JDK FULL
  - Создать пользователя для ЛаунчСервера

- Настоятельно рекомендуем:
  - Настроить проксирование через Nginx с поддоменом
  - Установить сертификат SSL на поддомен

### Установка JDK 21
Для запуска ЛаунчСервера необходима Java 21. Она так же подходит для запуска майнкрафт сервера

:::::::: tabs
@tab DEBIAN / UBUNTU
:::::: tip Копировать и вставлять целиком
::: tip Установка пакетов и Temurin JDK 21 (Часть 1)
```bash:no-line-numbers
sudo apt-get update ;
sudo apt-get install gnupg2 wget apt-transport-https unzip -y ;
sudo mkdir -p /etc/apt/keyrings ;
sudo wget -O - https://packages.adoptium.net/artifactory/api/gpg/key/public | sudo tee /etc/apt/keyrings/adoptium.asc ;
echo "deb [signed-by=/etc/apt/keyrings/adoptium.asc] https://packages.adoptium.net/artifactory/deb $(awk -F= '/^VERSION_CODENAME/{print$2}' /etc/os-release) main" | sudo tee /etc/apt/sources.list.d/adoptium.list ;
sudo apt-get update ;
sudo apt-get install temurin-21-jdk -y
```
:::

::: tip Для X86_64
```bash:no-line-numbers
wget https://download2.gluonhq.com/openjfx/22.0.2/openjfx-22.0.2_linux-x64_bin-jmods.zip ;
unzip openjfx-22.0.2_linux-x64_bin-jmods.zip ;
sudo cp javafx-jmods-22.0.2/* /usr/lib/jvm/temurin-21-jdk-amd64/jmods ;
rm -r javafx-jmods-22.0.2 ;
rm -rf openjfx-22.0.2_linux-x64_bin-jmods.zip
```
:::

::: tip Для ARM64
```bash:no-line-numbers
wget https://download2.gluonhq.com/openjfx/22.0.2/openjfx-22.0.2_linux-aarch64_bin-jmods.zip ;
unzip openjfx-22.0.2_linux-aarch64_bin-jmods.zip ;
sudo cp javafx-jmods-22.0.2/* /usr/lib/jvm/temurin-21-jdk-arm64/jmods ;
rm -r javafx-jmods-22.0.2 ;
rm -rf openjfx-22.0.2_linux-aarch64_bin-jmods.zip
```
:::

::: tip Смена Java по умолчанию
```bash
sudo update-alternatives --config java
sudo update-alternatives --config javac
```
:::
::: warning Примечание:
При наличии следующей ошибки:

```sh
java.lang.UnsatisfiedLinkError: /usr/lib/jvm/temurin-21-jdk-amd64/lib/libfontmanager.so: libfreetype.so: cannot open shared object file: No such file or directory
        at java.base/jdk.internal.loader.NativeLibraries.load(Native Method)
```
Установите необходимую библиотеку:
```sh:no-line-numbers
sudo apt-get install libfreetype-dev
```
- Обычно такая ошибка встречается на Ubuntu 22.04
:::
::::::
@tab CENTOS
:::::: tip Копировать и вставлять целиком
::: tip Добавление репозитория Adoptium и установка Temurin JDK 21 (Часть 1)
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
```bash:no-line-numbers
dnf install temurin-21-jdk
```
:::

::: tip Для X86_64
```bash:no-line-numbers
wget https://download2.gluonhq.com/openjfx/22.0.2/openjfx-22.0.2_linux-x64_bin-jmods.zip ;
unzip openjfx-22.0.2_linux-x64_bin-jmods.zip ;
sudo cp javafx-jmods-22.0.2/* /usr/lib/jvm/temurin-21-jdk/jmods ;
rm -r javafx-jmods-22.0.2 ;
rm -rf openjfx-22.0.2_linux-x64_bin-jmods.zip
```
:::

::: tip Для ARM64
```bash:no-line-numbers
wget https://download2.gluonhq.com/openjfx/22.0.2/openjfx-22.0.2_linux-aarch64_bin-jmods.zip ;
unzip openjfx-22.0.2_linux-aarch64_bin-jmods.zip ;
sudo cp javafx-jmods-22.0.2/* /usr/lib/jvm/temurin-21-jdk/jmods ;
rm -r javafx-jmods-22.0.2 ;
rm -rf openjfx-22.0.2_linux-aarch64_bin-jmods.zip
```
:::

:::: tip Смена Java по умолчанию
```bash:no-line-numbers
sudo alternatives --config java
sudo alternatives --config javac
```
::::
::::::
@tab WINDOWS
::: tip Откройте PowerShell (От имени Администратора)
- Установите пакет **Adoptium JDK 21** с помощью **winget**
```bash:no-line-numbers
winget install EclipseAdoptium.Temurin.21.JDK
```
- Откройте [сайт OpenJFX](https://gluonhq.com/products/javafx/) и скачайте последнюю версию **SDK** и **jmods** для Java 21
- Распакуйте файлы с расширением jmod из архива с **jmods** в `C:\Program Files\Eclipse Adoptium\ВАША_JDK\jmods`
- Распакуйте файлы из архива *SDK* (внутри будет папка с названием версии, распакуйте её содержимое а не саму папку) в `C:\Program Files\Eclipse Adoptium\ВАША_JDK\`
:::
@tab OTHER
::: tip Установка для других систем
Посетите сайт JDK [Adoptium](https://adoptium.net/) и [OpenJFX](https://gluonhq.com/products/javafx/)
:::
::::::::

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

## Использование X11 Forwarding
Для установки некоторых Forge версий клиентов вам может понадобиться использование X11 Forwarding:
- Установите пакет `xauth` на ваш сервер
- Добавьте или измените параметр `X11Forwarding` на `yes` в `sshd_config` на вашем сервере
- Перезапустите sshd
- Следуйте инструкции для вашего SSH клиента:
:::: tabs
@tab [ WSL 2 ]
::: tip Использование WSL 2 (рекомендуется)
- Установите WSL 2 по этому [гайду](https://learn.microsoft.com/ru-ru/windows/wsl/install)
- Находясь в WSL, выполните команду `ssh -XYC yourusername@SERVER_IP`
- Находясь в этой SSH сессии, запустите лаунчсервер без использования screen, docker, tmux и других средств
- Теперь вы можете установить Forge клиент командой `installclient` (см. выше)
@tab [ Linux ]
::: tip Использование Linux (рекомендуется)
- Выполните команду `ssh -XYC yourusername@SERVER_IP`
- Находясь в этой SSH сессии, запустите лаунчсервер без использования screen, docker, tmux и других средств
- Теперь вы можете установить Forge клиент командой `installclient` (см. выше)
@tab [ Putty ]
::: tip Использование Putty
- Установите X Server на Windows: [vcxsrv](https://sourceforge.net/projects/vcxsrv/) и запустите его с настройками по умолчанию
- Включите X11 Forwarding в настройках соединения Putty и подключитесь к серверу
- Находясь в этой SSH сессии, запустите лаунчсервер без использования screen, docker, tmux и других средств
- Теперь вы можете установить Forge клиент командой `installclient` (см. выше)
@tab [ Windows SSH Client ]
::: tip Использование стандартного клиента SSH в Windows
- Установите X Server на Windows: [vcxsrv](https://sourceforge.net/projects/vcxsrv/) и запустите его с настройками по умолчанию
- Если у вас не работает команда `ssh` в терминале Windows, [установите компонент](https://learn.microsoft.com/ru-ru/windows/terminal/tutorials/ssh)
- Выполните команду для CMD `set DISPLAY=localhost:0` или для PowerShell `$env:DISPLAY = 'localhost:0'`
- Не закрывая терминал, выполните команду `ssh -XYC yourusername@SERVER_IP`
- Находясь в этой SSH сессии, запустите лаунчсервер без использования screen, docker, tmux и других средств
- Теперь вы можете установить Forge клиент командой `installclient` (см. выше)
::::

## Настройка Nginx

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
:::: code-tabs
@tab Systemd
```bash:no-line-numbers
systemctl restart nginx
```
@tab init.d
```bash:no-line-numbers
service nginx restart
```
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