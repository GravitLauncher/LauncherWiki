<template>
  <q-page padding>
    <doc-header name="hostselect">Выбор хостинга</doc-header>
    <p>
      Для работы лаунчсервера необходим <b>виртуальный (VDS/VPS)</b> или
      <b>выделенный (Dedicated)</b> сервер на дистрибутиве Linux (Для <a href="/install#windows">Windows</a>) , а так же:
    </p>
    <ul>
      <li>
        Один из актуальных дистрибутивов: Ubuntu 21.04, Debian 11, CentOS 8,
        ArchLinux и другие
      </li>
      <li>Веб—сервер <b>Nginx</b> для раздачи статического контента</li>
      <li>
        Минимум <b>300Мб свободной оперативной памяти</b> для работы
        лаунчсервера
      </li>
      <li>
        При сборке лаунчсервера из исходников прямо на машине может потребоваться
        до 1 Гб свободной оперативной памяти для работы Gradle
      </li>
    </ul>
    <p>
      Опционально:
    </p>
    <ul>
      <li>
        Веб-сайт, CMS или личный кабинет с поддерживаемым алгоритмом хеширования
      </li>
      <li>
        База данных <b>MySQL/MariaDB</b> или <b>PostgreSQL</b>
      </li>
    </ul>
    <p>Рекомендации:</p>
    <ul>
      <li>
        Не размещайте сайт на shared хостинге, так как это может
        привести к проблемам с подключением к базе данных, производительностью и
        стабильностью работы
      </li>
      <li>
        Хостинги, предоставляющие VDS/VPS на основе виртуализации OpenVZ не
        позволяют использовать некоторые программы и нагружать процессор выше
        определенного уровня длительное время
      </li>
      <li>
        Старые версии дистрибутивов могут содержать уязвимости или слишком
        старые версии ПО с большим колличеством багов. В таком случае
        рекомендуется обновиться до последней версии или сменить хостинг
        провайдера
      </li>
    </ul>
    <p>
      Если вы хотите установить лаунчсервер на Windows для локального
      тестирования следуйте <a href="/install#windows">этой</a> инструкции.
    </p>
    <doc-header name="hostconfigure">Настройка хостинга</doc-header>
    <p>
        Первым шагом необходимо подготовить окружение - создать пользователя, установить firewall, Java
    </p>
    <p>
      Для запуска LaunchServer необходима <b>Java 17</b>. Она так же подходит для
      запуска майнкрафт сервера 1.18
      <br>
      Для запуска майнкрафт сервера 1.17.x необходима - <b>Java 16</b>.
      <br>
      Для запуска майнкрафт сервера 1.16.5 и ниже - <b>Java 8</b>. 
      <br></br>
      Необходимо установить их все, если вы собираетесь держать лаунчсервер и сервера на одной машине.
    </p>
    <q-tabs v-model='baseInstall'>
        <q-tab name='debian&ubuntu' label='Debian / Ubuntu' />
        <q-tab name='centos' label='CentOS' />
        <q-tab name='archlinux' label='ArchLinux' />
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model='baseInstall'>
        <q-tab-panel name='debian&ubuntu'>
            <doc-code
      header="Подготовка Debian / Ubuntu"
      language="bash"
      code='
wget -q -O - https://download.bell-sw.com/pki/GPG-KEY-bellsoft | apt-key add -
echo "deb [arch=amd64] https://apt.bell-sw.com/ stable main" | tee /etc/apt/sources.list.d/bellsoft.list
apt-get update && apt-get install bellsoft-java17-full -y
sudo update-alternatives --config java
' />
<p>
    <b>*</b> С помощью update-alternatives выберите по умолчанию java 17.
    <br>
    Путь к java для серверов 1.16.5 и ниже будет таким: <q-badge>/usr/lib/jvm/bellsoft-java8-full-amd64/bin/java</q-badge>
    <br>
    Путь к java для серверов 1.17.x будет таким: <q-badge>/usr/lib/jvm/bellsoft-java16-full-amd64/bin/java</q-badge>
</p>
        </q-tab-panel>
        <q-tab-panel name='centos'>
            <doc-code
      header="Подготовка CentOS"
      language="bash"
      code='
echo | tee /etc/yum.repos.d/bellsoft.repo > /dev/null << EOF
[BellSoft]
name=BellSoft Repository
baseurl=https://yum.bell-sw.com
enabled=1
gpgcheck=1
gpgkey=https://download.bell-sw.com/pki/GPG-KEY-bellsoft
priority=1
EOF
yum update
yum install bellsoft-java17-full
alternatives --config java
useradd -m -G www-data launcher
' />
        </q-tab-panel>
        <q-tab-panel name='archlinux'>
            <doc-code
      header="Подготовка ArchLinux"
      language="bash"
      code='
pacman -Syu jdk8-openjdk java8-openjfx jdk-openjdk java-openjfx
useradd -m -G www-data launcher
' />
        </q-tab-panel>
    </q-tab-panels>
    <doc-header name="launchserver">Установка LaunchServer</doc-header>
    <p>
      Перейдите в пользователя launcher командой <q-badge>su - launcher</q-badge> и выполните
      <q-badge
        >curl -o setup.sh https://mirror.gravit.pro/scripts/setup-master.sh &&
        chmod +x setup.sh && ./setup.sh</q-badge
      >
    </p>
    <b>
      После завершения установки запустите лаунчсервер для начальной настройки:
      <q-badge>./start.sh</q-badge>
    </b>
    <ul>
      <li>
        Укажите название вашего проекта, которое будет отображатся в лаунчере и
        в папке AppData
      </li>
      <li>Укажите ваш домен, на котором будет работать лаунчсервер</li>
      <li>
        После первого запуска закройте лаунчсервер командой
        <q-badge>stop</q-badge>
      </li>
    </ul>
    <p>Список папок, созданных установщиком :</p>
    <ul>
      <li><b>src/</b> - исходный код лаунчера и лаунчсервера</li>
      <li>
        <b>srcRuntime/</b> - исходный код графической части лаунчера (рантайм)
      </li>
      <li>
        <b>compat/</b> - дополнительные важные файлы: библиотека авторизации,
        ServerWrapper, модули для лаунчера и лаунчсервера и т.д.
      </li>
    </ul>
    <p>Готовые скрипты, созданные установщиком:</p>
    <ul>
      <li>
        <b>./start.sh</b> - запуск лаунчсервера для тестирования и начальной
        настройки
      </li>
      <li>
        <b>./startscreen.sh</b> - запуск лаунчсервера на постоянной основе с
        помощью утилиты screen. Не запускайте два лаунчсервера одновременно!
      </li>
      <li>
        <b>./update.sh</b> - обновляет лаунчсервер, лаунчер и рантайм до
        последней релизной версии
      </li>
    </ul>
    <p>Список папок лаунчсервера:</p>
    <ul>
      <li><b>libraries/</b> - библиотеки для лаунчсервера</li>
      <li>
        <b>modules/</b> - модули для лаунчсервера (оканчивающиеся на
        _module.jar)
      </li>
      <li><b>profiles/</b> - папка профилей для запуска MineCraft</li>
      <li><b>updates/</b> - папка обновлений</li>
      <li><b>logs/</b> - папка с логами (журналом) лаунчсервера</li>
      <li><b>runtime/</b> - папка с дизайном лаунчера</li>
      <li>
        <b>launcher-modules/</b> - модули для лаунчера (оканчивающиеся на
        _lmodule.jar)
      </li>
      <li><b>launcher-libraries/</b> - библиотеки для лаунчера</li>
      <li>
        <b>launcher-compile-libraries/</b> - вспомогательные библиотеки для
        лаунчера
      </li>
      <li><b>config/</b> - настройка конфигурации модулей</li>
      <li><b>proguard/</b> - настройки Proguard (обфускация кода)</li>
      <li><b>guard/</b> - нативная защита (по умолчанию отсутствует)</li>
    </ul>
    <doc-header name="nginx">Настройка Nginx</doc-header>
    <p>
      Для достижения оптимальной производительности отдачи файлов нужно настроить Nginx
    </p>
    <doc-code
      header="Конфигурация Nginx"
      language="nginx"
      code="
server {
        listen 80 http2;
        server_name ВАШДОМЕН.ru;
        location / {
                root /путь/до/updates;
        }
        location /api {
                proxy_pass http://127.0.0.1:9274/api;
                proxy_set_header Host $host;
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
}
"
    />
    <p>
        Примечание: Если у nginx нет прав для чтения папки, выдайте: <q-badge>chmod +x /home/launcher && chmod -R 755 /home/launcher/updates</q-badge>
    </p>
    <doc-header name="safety">Настройка безопасного подключения</doc-header>
    <p>
        Для обеспечения безопасности передаваемых паролей, защиты от внедрения в процесс обмена данными нужно подключить к своему домену SSL сертификат. На данный момент его можно купить или получить бесплатно (Let's Encrypt/Cloudflare). Вы должны будете установить его на домен с лаунчсервером <q-badge>ВАШДОМЕН.ru</q-badge> и немного изменить настройки лаунчсервера:
    </p>
    <ul>
        <li>Откройте файл LaunchServer.json и найдите там секцию netty</li>
        <li>Измените ссылки формата <q-badge>http://ДОМЕН ИЛИ IP:9274/ЧТО ТО</q-badge> на <q-badge>https://ВАШДОМЕН.ru/ЧТО ТО</q-badge></li>
        <li>Измените ссылку на websocket лаунчера с <q-badge>ws://ДОМЕН ИЛИ IP:9274/api</q-badge> на <q-badge>wss://ВАШДОМЕН.ru/api</q-badge></li>
        <li>Соберите лаунчер командой <q-badge>build</q-badge> и проверьте работоспособность</li>
        <li>Закройте порт 9274 (если он был открыт), так как теперь лаунчсервер будет получать и передавать данные через nginx по портам 80 и 443</li>
    </ul>
    <p>
        В качестве дополнительных мер безопасности можно настроить сертификат подписи кода (CodeSign), который помогает уменьшить ложноположительные срабатывания антивирусов на Launch4J обертку (для .exe файла). Установите модуль <a href='https://github.com/GravitLauncher/LauncherModules/tree/master/OpenSSLSignCode_module'>OSSLCodeSignModule</a> для подписи. Получить сертификат подписи кода можно несколькими способами:
    </p>
    <ul>
        <li>Сгенерировать самоподписанный сертификат с помощью модуля <a href='https://github.com/GravitLauncher/LauncherModules/tree/master/GenerateCertificate_module'>GenerateCertificateModule</a></li>
        <li>Создать себе самоподписанные сертификаты с помощью утилиты <a href='https://github.com/chris2511/xca/releases'>XCA</a></li>
        <li>Купить полноценный сертификат подписи кода (дорого)</li>
        <li>Отдать сборки лаунчера другому человеку, который подпишет .exe файлы за денежное вознаграждение</li>
    </ul>
    <p>Для большинства проектов (кроме достаточно крупных) рекомендуется первый вариант. По ссылке вы можете найти инструкцию по установке модуля и генерации сертификата.</p>
    <p>
        Если вы не крупный проект, то скорее всего столкнетесь с защитником <a href='https://docs.microsoft.com/ru-ru/windows/security/threat-protection/microsoft-defender-smartscreen/microsoft-defender-smartscreen-overview'>SmartScreen</a>, который ведет статистику скачиваний и на файлы с низким числом скачиваний выдает предупреждение. Чтобы его не было, вам необходимо отправить файл на проверку:
    </p>
    <ul>
        <li>Зарегистрируйтесь или войдите в аккаунт Microsoft</li>
        <li>Отправьте файл на проверку, заполнив <a href='https://www.microsoft.com/en-us/wdsi/filesubmission/'>эту форму</a></li>
        <li>Ждите результата</li>
    </ul>
    <a>
        При достижении определенного числа скачиваний проблема уйдет "сама собой", а некоторые пользователи могут её вовсе не заметить.
    </a>
    <doc-header name="windows">Установка на Windows (ТОЛЬКО ДЛЯ ТЕСТИРОВАНИЯ)</doc-header>
    <p>Настройте окружение:</p>
    <ul>
      <li>Скачиваем и устанавливаем сборку OpenJDK 17 от <a href="https://adoptium.net/">AdoptJDK</a> (JDK 17 Windows x64 Hotspot) или <a href="https://libericajdk.ru/pages/liberica-jdk/">LibericaJDK</a>. <b>Запомните или запишите путь к установленной JDK</b></li>
      <li>Если вы установили AdoptJDK или любую другую сборку OpenJDK без OpenJFX, скачайте <a href="https://download2.gluonhq.com/openjfx/17.0.0.1/openjfx-17.0.0.1_windows-x64_bin-jmods.zip">jmods</a> и <a href="https://download2.gluonhq.com/openjfx/17.0.0.1/openjfx-17.0.0.1_windows-x64_bin-sdk.zip">sdk</a> и скопируйте содержимое архивов <b>с заменой</b> в папку установки JDK, полученную на первом этапе</li>
      <li>Скачиваем сборку JDK 8 от <a href="https://adoptium.net/">AdoptJDK</a> (JDK 8 Windows x64 Hotspot), <a href="https://libericajdk.ru/pages/liberica-jdk/">LibericaJDK</a> или <a href="https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html">Oracle</a> и устанавливаем</li>
      <li>Всё!</li>
    </ul>
    <p>Далее вам необходимо установить лаунчсервер ВРУЧНУЮ, без использования скрипта установки</p>
    <ul>
      <li>На странице <a href='https://github.com/GravitLauncher/Launcher/releases'>Launcher releases</a> найдите последний релиз и скачайте его</li>
      <li>Распакуйте библиотеки и LaunchServer.jar из архива</li>
      <li>Создайте start.bat с таким содержимым: <doc-code language='bat' code='@ECHO OFF
"ПУТЬ_ДО_JDK_17/bin/java.exe" -javaagent:LaunchServer.jar -jar LaunchServer.jar
PAUSE' /></li>
      <li>Запустите <q-badge>start.bat</q-badge> и при первом запуске укажите свой projectName и localhost в качестве адреса</li>
      <li>Скачайте рантайм для вашей версии лаунчера: <a href='https://github.com/GravitLauncher/LauncherRuntime/releases'>LauncherRuntime releases</a></li>
      <li>Скопируйте папку runtime в папку с установленным лаунчсервером, а .jar файл модуля в папку launcher-modules</li>
      <li>Запустите лаунчсервер и выполните команду build для запуска сборки. После окончания готовый лаунчер появится в папке <q-badge>updates</q-badge></li>
    </ul>
    <doc-header name="dev">Установка dev версий лаунчсервера</doc-header>
    <a>
      DEV версии лаунчсервера содержат самый новый функционал и исправления, которые ещё не попали в релиз. Они могут быть нестабильны( вызывать проблемы), иметь расхождение с официальной вики. Настоятельно рекомендуется проверять работоспособность dev версий в тестовом окружении, прежде чем давать игрокам.
    </a>
    <ul>
      <li><b>Первый способ: Установка скриптом.</b> Следуйте <a href='/install#launchserver'>этой</a> инструкции, используя скрипт установки DEV версии: <q-badge>https://mirror.gravit.pro/scripts/setup-dev.sh</q-badge></li>
      <li><b>Второй способ: Установка через GitHub Actions.</b></li><ul>
        <li>Зарегистрируйтесь или войдите на <a href='https://github.com'>GitHub</a></li>
        <li>Скачайте архивы с <a href='https://github.com/GravitLauncher/Launcher/actions?query=event%3Apush+branch%3Adev'>лаунчером</a> и <a href='https://github.com/GravitLauncher/LauncherRuntime/actions?query=event%3Apush+branch%3Adev'>рантаймом</a> с GitHub Actions.</li>
        <li>Действуйте аналогично установке <a href='/install#windows'>stable версии</a> на Windows, используя архивы, скачанные на предыдущем этапе</li>
      </ul>
    </ul>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "PageInstall",
  data: function () {
    return {
      baseInstall: "debian",
    };
  },
});
</script>
