<template><div class="wiki">
  <h2>Сборка клиента на версии 5.1.0+ <div class="gtag gtag-important">Важно</div>
  </h2>
  <p>Для уже готового клиента, скачанного с зеркала выполните:</p>
  <ul>
    <li>Вам необходимо будет скопировать файл authlib-clean.jar отсюда ( <a
        href="https://github.com/GravitLauncher/Launcher/raw/master/compat/authlib/authlib-clean.jar">master</a> ) в
      папку libraries клиента</li>
    <li>Скопируйте из артефактов сборки файл LauncherAuthlib.jar в папку libraries клиента</li>
  </ul>
  <p>Для сборки клиента с <b>Forge</b> также выполните следущее:</p>
  <ul>
    <li>Скачайте клиентский лаунчвраппер и <b>замените</b> предыдущий лаунчвраппер в папке librares клиента.(<a
        href="https://mirror.gravit.pro/compat/launchwrapper-1.12-5.1.x-clientonly.jar">ссылка</a> на момент
      публикации)(<u>только клиент</u>) Так как launchwrapper может постоянно фиксится под 5.1.0 следите за discord
      сервером</li>
  </ul>
  <p>Для сборки клиента с <b>Fabric</b> выполните следущее:</p>
  <ul>
    <li>Добавьте путь к библиотекам guava и jimfs в altClassPath. Например:
      <pre v-highlightjs><code class="json">
"altClassPath": [
  "libraries/com/google/jimfs/jimfs/1.1/jimfs-1.1.jar",
  "libraries/com/google/guava/guava/21.0/guava-21.0.jar"
]</code></pre>
      <p>Объяснение: jimfs использует технологию сервисов(ServiceLoader) и требует, что бы он был загружен системным
        загрузчиком классов(SystemClassLoader), в противном случае JVM не сможет правильно зарегистрировать обработчик
        URL'ов jimfs</p>
    </li>
  </ul>
  <details>
    <summary tabindex="2">Подпись всего клиента <div class="gtag gtag-hard">Сложный уровень</div>
    </summary>
    <h3>Подпись всего клиента <div class="gtag gtag-hard">Сложный уровень</div>
    </h3>
    <p>Начиная с 5.1.0 появилась возможность подписывать не только лаунчер, а весь клиент целиком. Подпись всего клиента
      осуществляется командой signdir и доступна только если у вас настроен свой сертификат(автосгенерированный не
      подойдет). Перед началом подписи убедитесь что вы настроили раздел sign Лаунчсервера</p>
    <ol>
      <li>Сделайте бекап клиента</li>
      <li>Подготовьте клиент к подписи. Удалите из forge.jar/minecraft.jar/liteloader.jar файлы подписи, которые
        находятся в META-INF и имеют разрешение .SF/.RSA/.EC при их наличии. Так же может понадобится удаление из
        манифеста всех хешей. Убедитесь, что ничего вы этим действием не сломали</li>
      <li>Выполните <span class="codes">signdir updates/ВашКлиент</span></li>
      <li>Выполните <span class="codes">syncUpdates</span></li>
    </ol>
    <p>После каждого обновления модов и любых других .jar файлов вам нужно будет их переподписать командой <span
        class="codes">signjar updates/ВашКлиент/ПутьКФайлу</span>. Команда signdir не умеет игнорировать уже подписанные
      файлы, имейте это ввиду</p>
    <p>Подпись клиента - вспомогательное действие, нужное некоторым защитам от читов для нормальной работы</p>
    <h3>Наложение патчей на клиент <div class="gtag gtag-hard">Сложный уровень</div>
    </h3>
    <p>Для работы некоторых возможностей лаунчера необходимо, что бы обращения к некоторым вызовам перенаправлялись в
      лаунчер. Это можно сделать с помощью мультикоманды patcher из UnsafeCommandsPack</p>
    <table>
      <tr>
        <th>Исходный класс</th>
        <th>Исходный метод</th>
        <th>Прокси класс</th>
        <th>Прокси метод</th>
      </tr>
      <tr>
        <td>java.lang.System</td>
        <td>setSecurityManager</td>
        <td>pro.gravit.launcher.api.SystemService</td>
        <td>setSecurityManager</td>
      </tr>
      <tr>
        <td>java.lang.System</td>
        <td>exit</td>
        <td>pro.gravit.launcher.api.SystemService</td>
        <td>exit</td>
      </tr>
    </table>
    <p>Так как это статические функции то должен использоваться патчер, который работает с опкодом INVOKESTATIC. В
      данном случае это <span
        class="codes">pro.gravit.launchermodules.unsafecommands.patcher.StaticReplacerPatcher</span>. Этот патчер
      принимает 4 аргумента в том порядке, в котором они указаны в таблице.</p>
    <p>Нет смысла пытаться пропатчить все .jar файлы(включая моды) этим патчером. Как правило достаточно патча
      forge.jar, так как в других файлах(и тем более модах) эти вызовы встречатся не должны. В выборе что патчить
      руководствуйтесь инструкцией к вашей защите</p>

  </details>
  <h3>Конфигурация <div class="gtag gtag-easy">Это просто</div>
  </h3>
  <pre v-highlightjs><code class="json">
{
  "version": "1.12.2", //Версия клиента
  "assetIndex": "1.12.2",
  "dir": "HiTech", //Папка клиента в updates
  "assetDir": "asset1.12", //Папка ассетов в updates
  "sortIndex": 0, //Индекс сортировки. В версиях до 5.1.0 у всех профилей должен быть различный индекс для корреткной работы опциональных модов
  "uuid": "d893746b-21be-4aa4-b62f-20800d4786bc", //UUID клиента
  "title": "XXX", //Заголовок клиента, отображаемый пользователю
  "info": "Информация о сервере", //Информация о сервере, отображаемая пользователю
  "serverAddress": "localhost", //Адрес майнкрафт сервера, к которому лаунчер будет обращаться за текущим онлайном
  "serverPort": 25565, //Порт майнкрафт сервера, к которому лаунчер будет обращаться за текущим онлайном
  "update": [ //Файлы и папки, которые нужно обновлять при запуске клиента
    "servers.dat"
  ],
  "updateExclusions": [ //Исключения для update и updateVerify(см предупреждение на главной странице Wiki по использованию этого параметра)
  ],
  "updateShared": [], //Не используется
  "updateVerify": [ //Файлы и папки, которые не должны меняться при работе клиента(более строгая версия update)
    "libraries",
    "natives",
    "mods",
    "minecraft.jar",
    "forge.jar",
    "liteloader.jar"
  ],
  "updateOptional": [], //Опциональные моды, см ниже отдельный раздел
  "updateFastCheck": true, //Проверка только размеров, без сравнения хешей
  "mainClass": "net.minecraft.launchwrapper.Launch", //Main Class клиента
  "jvmArgs": [ //Аргументы JVM
    "-Dfml.ignorePatchDiscrepancies\u003dtrue",
    "-Dfml.ignoreInvalidMinecraftCertificates\u003dtrue",
    "-XX:+UseConcMarkSweepGC",
    "-XX:+CMSIncrementalMode",
    "-XX:-UseAdaptiveSizePolicy",
    "-Xmn128M",
    "-XX:+DisableAttachMechanism"
  ],
  "classPath": [ //Class Path клиента. Указание папки в этом разделе равносильно добавлению всех .jar файлов в этой папке
    "forge.jar",
    "liteloader.jar",
    "minecraft.jar",
    "libraries"
  ],
  "altClassPath": [], //альтернативный ClassPath. Указанные здесь файлы будут загружены другим, отличным от classLoaderConfig загрузчиком классов(как правило SystemClassLoader). Используется только некоторыми клиентами
  "clientArgs": [ //Аргументы клиента
    "--tweakClass",
    "net.minecraftforge.fml.common.launcher.FMLTweaker",
    "--tweakClass",
    "com.mumfrey.liteloader.launch.LiteLoaderTweaker"
  ],
  "securityManagerConfig": "CLIENT", //Используемый SecurityManager для клиента
  "classLoaderConfig": "LAUNCHER" //Используемый тип класслоадера для клиента
}
</code></pre>
  <h3>Опциональные моды <div class="gtag gtag-easy">Это просто</div>
  </h3>
  <p>Опциональные моды позволяют игроку управлять загрузкой определенных модов/classpath/jvmargs</p>
  <p>Настройка опциональных модов производится для каждого профиля отдельно</p>
  <pre v-highlightjs><code class="json">
"updateOptional": [
    {
       "type": "FILE", //Тип опционального мода. Может быть FILE, CLIENTARGS, JVMARGS, CLASSPATH
       "list": ["mods/1.7.10/NotEnoughItems-1.7.10-1.0.5.118-universal.jar"], //Список файлов или аргументов
       "info": "Мод, показывающий рецепты", //Описание
       "visible": true, //Видимость
       "mark": true, //Включен по умолчанию
       "permissions": 0, //Маска привилегий. 0 - мод для всех, 1 - только для админов.
       "name": "NotEnoughItems" //Имя
    },
    {
       "type": "FILE",
       "list": ["mods/Waila_1.5.10_1.7.10.jar"],
       "info": "Мод, показывающий дополнительную информацию при наведении на блок",
       "name": "Walia",
       "permissions": 0,
       "visible": true,
       "dependenciesFile": [{"name":"NotEnoughItems"/* Имя зависимого мода */, "type": "FILE" /* Тип зависимого мода */}],
       "conflictFile": [{"name":"ClientFixer"/* Имя конфликтующего мода */, "type": "FILE" /* Тип конфликтующего мода */}],
       "subTreeLevel": 2  //Смещение относительно первого мода. Используется для создания визуального отображения дерева зависимостей
    },
    {
       "type": "JVMARGS",
       "list": ["--add-modules", "jdk.unsupported"],
       "triggers": [{"type": "JAVA_VERSION", "compareMode": 1, "need": true, "value": 8}], //Триггеры, о них ниже
       "info": "Аргументы Java9+",
       "visible": false,
       "permissions": 0,
       "name": "Java9Args"
    },
    {
       "type": "FILE",
       "list": ["mods/1.7.10/OptiFine_1.7.10_HD_U_E7.jar"],
       "info": "Улучшение производительности",
       "permissions": 0,
       "visible": true,
       "name": "OptiFine HD"
    }
  ],
</code></pre>
  <h3>Триггеры в опциональных модах <div class="gtag gtag-medium">Средний уровень</div>
  </h3>
  <p>Триггеры - условия, при которых опциональный мод будет включен без участия пользователя автоматически.<br>Первый
    параметр - type:</p>
  <ul>
    <li>JAVA_VERSION - версия Java, с которой запущен лаунчер. Принимает значения 8,9,11 и т.д.</li>
    <li>JAVA_BITS - разрядность Java, с которой запущен лаунчер. Принимает значения 32 и 64</li>
    <li>OS_BITS - разрядность ОС, с которой запущен лаунчер. Принимает значения 32 и 64</li>
    <li>OS_TYPE - тип ОС, с которой запущен лаунчер. Так как значение может быть только числом приняты следующие
      соответствия ОС-ЧИСЛО:<ul>
        <li>0 - Windows(MUSTDIE)</li>
        <li>1 - Linux</li>
        <li>2 - MacOS</li>
      </ul>
    </li>
  </ul>
  <p>Второй параметр - compareMode. Он соответствует одному из трех знаков сравнения</p>
  <ul>
    <li>0 - знак равенства</li>
    <li>Любое положительное число - знак больше(строгий)</li>
    <li>Любое отрицательное число - знак меньше(строгий)</li>
  </ul>
  <p>Третий параметр - value. Это значение, с которым будет сравниваться параметр</p>
  <p>Четвертый параметр - need. Это особый флаг, означающий "опциональный мод не может работать если этот триггер не
    сработал"</p>
  <p>Если триггеров с need нет - опциональный мод включится если сработает ХОТЯ БЫ ОДИН триггер</p>
  <p>Если есть ХОТЬ ОДИН триггер с NEED - опциональный мод включится только если ВСЕ ТРИГГЕРЫ С NEED сработают. При этом
    если хоть один триггер с need не сработает:
  <ol>
    <li>Если опциональный мод был включен по умолчанию - он будет выключен</li>
    <li>Если опциональный мод был видимым по умолчанию - он станет невидимым</li>
  </ol>
  </p>
  <p>Примеры тригеров</p>
  <ul>
    <li>{"type": "JAVA_VERSION", "compareMode": 1, "need": true, "value": 8} - выполняется если версия Java > 8</li>
    <li>{"type": "OS_TYPE", "compareMode": 0, "need": true, "value": 0} - выполняется если ОС Windows</li>
    <li>{"type": "JAVA_BITS", "compareMode": 0, "need": true, "value": 64} - выполняется если Java, с которой запущен
      лаунчер 64 бит</li>
  </ul>

</div></template>

<style>
table {
  border: 1px solid grey;
  padding: 3px;
}
/* границы ячеек первого ряда таблицы */
th {
  border: 1px solid grey;
  padding: 3px;
}
/* границы ячеек тела таблицы */
td {
  border: 1px solid grey;
  padding: 3px;
}
</style>
