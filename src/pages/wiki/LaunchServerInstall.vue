<template>
  <q-page padding>
    <doc-header name="hostselect">Выбор хостинга</doc-header>
    <p>
      Для работы лаунчсервера необходим <b>виртуальный (VDS/VPS)</b> или
      <b>выделенный (Dedicated)</b> сервер на дистрибутиве Linux. А так же:
    </p>
    <ul>
      <li>
        Один из актуальных дистрибутивов: Ubuntu 21.04, Debian 11, CentOS 8,
        ArchLinux и другие
      </li>
      <li>Веб сервер <b>Nginx</b> для раздачи статического контента</li>
      <li>
        Не менее 300Мб свободной оперативной памяти для постоянной работы
        лаунчсервера
      </li>
      <li>
        При сборке лаунчсервера из исходников прямо на машине может потребоваться
        до 1 Гб свободной оперативной памяти для работы Gradle
      </li>
      <li>
        Веб-сайт, CMS или личный кабинет с поддерживаемым алгоритмом хеширования
        <q-badge color="orange" text-color="black">опционально</q-badge>
      </li>
      <li>
        База данных <b>MySQL/MariaDB</b> или <b>PostgreSQL</b>
        <q-badge color="orange" text-color="black">опционально</q-badge>
      </li>
    </ul>
    <p>Важно помнить, что:</p>
    <ul>
      <li>
        Распологать сайт на shared хостинге не рекомендуется, так как это может
        привести к проблемам с подключением к базе данных, производительностью и
        стабильностью работы
      </li>
      <li>
        Хостинги предоставляющие VDS/VPS на основе виртуализации OpenVZ не
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
        Первым шагом необходимо подготовить окружение - создать пользователя, установить firewall, Java 8 и Java 17
    </p>
    <p>
      Для запуска LaunchServer необходима <b>Java 17</b>, а для запуска
      майнкрафт сервера 1.12.2 и ниже - <b>Java 8</b>. Необходимо установить их
      обе, если вы собираетесь держать лаунчсервер и сервера на одной машине.
    </p>
    <q-tabs v-model='baseInstall'>
        <q-tab name='debian' label='Debian' />
        <q-tab name='centos' label='CentOS' />
        <q-tab name='archlinux' label='ArchLinux' />
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model='baseInstall'>
        <q-tab-panel name='debian'>
            <doc-code
      header="Подготовка Debian"
      language="bash"
      code='
apt-get update && apt-get upgrade
apt-get install apt curl wget nftables openjdk-17-jdk 
useradd -m -G www-data launcher
wget "https://download2.gluonhq.com/openjfx/17.0.0.1/openjfx-17.0.0.1_linux-x64_bin-jmods.zip"
unzip openjfx-17.0.0.1_linux-x64_bin-jmods.zip
cp openjfx-17.0.0.1_linux-x64_bin-jmods/* /usr/lib/jvm/java-17-openjdk-amd64/jmods
rm -r openjfx-17.0.0.1_linux-x64_bin-jmods
rm openjfx-17.0.0.1_linux-x64_bin-jmods.zip
wget -qO - "https://adoptopenjdk.jfrog.io/adoptopenjdk/api/gpg/key/public" | sudo apt-key add -
add-apt-repository --yes "https://adoptopenjdk.jfrog.io/adoptopenjdk/deb/"
apt-get update && apt-get install adoptopenjdk-8-hotspot
update-alternatives --config java
' />
<p>
    <b>*</b> С помощью update-alternatives выберите по умолчанию java 17. Тогда путь к java для серверов 1.12.2 и ниже будет таким: <q-badge>/usr/lib/jvm/adoptopenjdk-8-hotspot-amd64/bin/java</q-badge>
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
' />
        </q-tab-panel>
        <q-tab-panel name='archlinux'>
            <doc-code
      header="Подготовка ArchLinux"
      language="bash"
      code='
pacman -Syu jdk8-openjdk java8-openjfx jdk-openjdk java-openjfx
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
      <li>Укажите ваш поддомен, на котором будет работать лаунчсервер</li>
      <li>
        После успешного первого запуска закройте лаунчсервер командой
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
        ServerWrapper, модули для лаунчера и лаунчсервера и другое
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
        помощью screen. Не запускайте два лаунчсервера одновременно!
      </li>
      <li>
        <b>./update.sh</b> - обновляет лаунчсервер, лаунчер и рантайм до
        последней релизной версии
      </li>
    </ul>
    <p>Список папок лаунчсервера с пояснениями:</p>
    <ul>
      <li><b>libraries/</b> - библиотеки для лаунчсервера</li>
      <li>
        <b>modules/</b> - модули для лаунчсервера (оканчивающиеся на
        _module.jar)
      </li>
      <li><b>profiles/</b> - папка профилей для запуска майнкрафт</li>
      <li><b>updates/</b> - папка обновлений</li>
      <li><b>logs/</b> - папка с логами лаунчсервера</li>
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
      Для достижения оптимальной производительности отдачи файлов нужно
      обязательно настроить Nginx
    </p>
    <doc-code
      header="Конфигурация Nginx"
      language="nginx"
      code="
server {
        listen 80 http2;
        server_name launcher.ВАШДОМЕН.ru;
        location / {
                root /путь/до/updates;
        }
        location /api {
                proxy_pass http://localhost:9274/api;
                proxy_set_header Host $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Real-IP $remote_addr;
        }
        location /webapi/ {
                proxy_pass http://localhost:9274/webapi/;
                proxy_set_header Host $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Real-IP $remote_addr;
        }
}
"
    />
    <p>
        Примечание: Если у nginx не хватает прав доступа для чтения папки необходимо выдать соответствующие права: <q-badge>chmod +x /home/launcher && chmod -R 755 /home/launcher/updates</q-badge>
    </p>
    <doc-header name="safety">Настройка безопасного подключения</doc-header>
    <p>
        Для обеспечения безопасности передаваемых паролей, защиты от внедрения в процесс обмена данными нужно подключить к своему домену SSL сертификат. На данный момент его можно купить или получить бесплатно(Lets Encrypt/Cloudflare). Каким бы вы способом его не получали, вы должны будуте установить его на домен <q-badge>launcher.ВАШДОМЕН.ru</q-badge> и немного изменить конфиугацию лаунчсервера:
    </p>
    <ul>
        <li>Откройте файл LaunchServer.json и найдите там секцию netty</li>
        <li>Измените ссылки формата <q-badge>http://ДОМЕН ИЛИ IP:9274/ЧТО ТО</q-badge> на <q-badge>https://launcher.ВАШДОМЕН.ru/ЧТО ТО</q-badge></li>
        <li>Измените ссылку на websocket лаунчера с <q-badge>ws://ДОМЕН ИЛИ IP:9274/api</q-badge> на <q-badge>wss://launcher.ВАШДОМЕН.ru/api</q-badge></li>
        <li>Соберите лаунчер командой <q-badge>build</q-badge> и проверье работоспособность</li>
        <li>Закройте порт 9274 (если он был открыт), так как теперь лаунчсервер будет передавать данные через nginx по портам 80 и 443</li>
    </ul>
    <p>
        В качестве дополнительных мер безопасности можно настроить сертификат подписи кода (CodeSign), который помогает уменьшить ложноположительные срабатывания антивирусов на launch4j обертку. <b>Это не обязательно</b>. Получить его можно несколькими способами:
    </p>
    <ul>
        <li>Можно сгенерировать самому себе самоподписанный сертификат с помощью модуля <a href='https://github.com/GravitLauncher/LauncherModules/tree/master/GenerateCertificate_module'>GenerateCertificateModule</a></li>
        <li>Можно создать себе самоподписанные сертификаты с помощью утилиты <a href='https://github.com/chris2511/xca/releases'>XCA</a></li>
        <li>Можно купить полноценный сертификат подписи кода(дорого)</li>
        <li>Можно отдать сборки лаунчера другому человеку, который подпишет .exe файлы за денежное вознаграждение</li>
    </ul>
    <p>Для всех проектов(кроме достаточно крупных) рекомендуется первый вариант. По ссылке вы можете найти инструкцию по установке модуля и генерации сертификата. Вне зависимости от вашего выбора способа получения сертификата теперь нужно установить модуль <a href='https://github.com/GravitLauncher/LauncherModules/tree/master/OpenSSLSignCode_module'>OSSLCodeSignModule</a> для подписи EXE файла</p>
    <p>
        Если вы не крупный проект, то скорее всего столкнетесь с защитником <a href='https://docs.microsoft.com/ru-ru/windows/security/threat-protection/microsoft-defender-smartscreen/microsoft-defender-smartscreen-overview'>SmartScreen</a>, который ведет статистику скачиваний и на файлы с низким числом скачиваний выдает предупреждение. Что бы его не было вам необходимо сделать следующие действия:
    </p>
    <ul>
        <li>Зарегистрируйтесь или войдите в аккаунт Microsoft</li>
        <li>Отправьте файл на проверку заполнив <a href='https://www.microsoft.com/en-us/wdsi/filesubmission/'>эту форму</a></li>
        <li>Ждете результата</li>
    </ul>
    <a>
        Каждый проект должен сам решить - нужно ли отправлять файлы лаунчера в Microsoft для проверки или нет. При достижении определенного числа скачиваний проблема уйдет "сама собой", а некоторые пользователи могут её вовсе не заметить
    </a>
    <doc-header name="windows">Установка на Windows для тестирования</doc-header>
    <p>Настройте окружение:</p>
    <ul>
      <li>Скачиваем сборку OpenJDK 17 от <a href="https://adoptium.net/">AdoptJDK</a>(JDK 17 Windows x64 Hotspot) или <a href="https://libericajdk.ru/pages/liberica-jdk/">LibericaJDK</a> и устанавливаем на свой локальный компьютер. <b>Запомните или запишите путь к установленной JDK</b></li>
      <li>Если вы установили AdoptJDK или любую другую сборку OpenJDK без OpenJFX скачайте <a href="https://download2.gluonhq.com/openjfx/17.0.0.1/openjfx-17.0.0.1_windows-x64_bin-jmods.zip">jmods</a> и <a href="https://download2.gluonhq.com/openjfx/17.0.0.1/openjfx-17.0.0.1_windows-x64_bin-sdk.zip">sdk</a> и скопируйте содержимое архивов <b>с заменой</b> в папку установки JDK, полученную на первом этапе</li>
      <li>Скачиваем сборку JDK 8 от <a href="https://adoptium.net/">AdoptJDK</a>(JDK 8 Windows x64 Hotspot), <a href="https://libericajdk.ru/pages/liberica-jdk/">LibericaJDK</a>, или <a href="https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html">Oracle</a> и устанавливаем</li>
      <li>Всё!</li>
    </ul>
    <p>Далее вам необходимо установить сам лаунчсервер вручную, без использования скрипта установки</p>
    <ul>
      <li>На странице <a href='https://github.com/GravitLauncher/Launcher/releases'>Launcher releases</a> найдите последний релиз и скачайте его</li>
      <li>Распакуйте библиотеки и LaunchServer.jar из архива</li>
      <li>Создайте start.bat с таким содержимым: <doc-code language='bat' code='@ECHO OFF
"ПУТЬ_ДО_JDK_17/bin/java.exe" -javaagent:LaunchServer.jar -jar LaunchServer.jar
PAUSE' /></li>
      <li>Запустите <q-badge>start.bat</q-badge> и при первом запуске укажите свой projectName и localhost в качестве адреса</li>
      <li>Скачайте рантайм для вашей версии лаунчера тут: <a href='https://github.com/GravitLauncher/LauncherRuntime/releases'>LauncherRuntime releases</a></li>
      <li>Скопируйте папку runtime в папку с установленным лаунчсервером, а .jar файл модуля в папку launcher-modules</li>
      <li>Запустите лаунчсервер и выполните команду build для запуска сборки. По её завершению готовый лаунчер появится в папке <q-badge>updates</q-badge></li>
    </ul>
    <doc-header name="dev">Установка dev версий лаунчсервера</doc-header>
    <a>
      DEV версии лаунчсервера содержат самые последние фитчи и исправления, которые еще не попали в релиз. Они могут быть нестабильны, вызывать проблемы, иметь расхождение с оффициальной вики. Настоятельно рекомендуется проверять работоспособность dev версий в тестовом окружении прежде чем обновлять production.
    </a>
    <ul>
      <li><b>Первый способ: Установка через GitHub Actions. </b> <ul>
        <li>Зарегистрируйтесь или войдите на <a href='https://github.com'>GitHub</a></li>
        <li>Скачайте архивы с <a href='https://github.com/GravitLauncher/Launcher/actions?query=event%3Apush+branch%3Adev'>лаунчером</a> и <a href='https://github.com/GravitLauncher/LauncherRuntime/actions?query=event%3Apush+branch%3Adev'>рантаймом</a> с GitHub Actions.</li>
        <li>Действуйте аналогично установке <a href='/install#windows'>stable версии</a> на Windows</li>, используя архивы, скачанные на предыдущем этапе</ul></li>
      <li><b>Второй способ: Установка скриптом.</b> Следуйте <a href='/install#launchserver'>этой</a> инструкции, используя скрипт установки DEV версии: <q-badge>https://mirror.gravit.pro/scripts/setup-dev.sh</q-badge></li>
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
