<template><div class="wiki">
  <h2>Сборка клиента на версии 5.1.0+ <gtag type="important">Важно</gtag>
  </h2>
  <p>Для уже готового клиента, скачанного с зеркала выполните:</p>
  <h3>Для сборки клиентов 1.16.3 и ниже</h3>
  <ul>
    <li>Вам необходимо будет скопировать файл authlib-clean.jar отсюда ( <a
        href="https://github.com/GravitLauncher/Launcher/raw/master/compat/authlib/authlib-clean.jar">master</a> ) в
      папку libraries клиента</li>
    <li>Скопируйте из артефактов сборки файл LauncherAuthlib.jar в папку libraries клиента</li>
  </ul>
  <h3>Для сборки клиента 1.16.4 и выше</h3>
  <span><i>Клиенты 1.16.4 и выше на зеркале уже содержат authlib 2. Выполнять пункты ниже <b>не нужно</b> если вы скачали готовое</i></span>
  <ul>
    <li>Вы должны найти в своем клиенте authlib в папке libraries и удалить оттуда все классы, присутствующие в LauncherAuthlib 2. После чего скопировать получившийся файл в
      папку libraries клиента</li>
    <li>Скачайте LauncherAuthlib 2 с <a href="https://mirror.gravit.pro/compat/authlib/2/LauncherAuthlib.jar">зеркала</a> и поместите его в папку libraries</li>
  </ul>
  <sploiler><template #header>Сборка Forge 1.12.2 и ниже</template>
      <p>
        Скачайте клиентский лаунчвраппер и <b>замените</b> предыдущий лаунчвраппер в папке librares клиента(<a
        href="https://mirror.gravit.pro/compat/launchwrapper-1.12-5.1.x-clientonly.jar">ссылка</a>)(<u>только клиент</u>). Обратите внимание - нужно именно заменить - новый лаунчвраппер должен
        находится по тому же пути и с тем же именем что и стандартный
      </p>
  </sploiler>
  <h3>Сборка клиентов с нуля</h3>
  <sploiler><template #header>Сборка Vanilla</template>
      <p>
        <ul>
          <li>Установите модуль UnsafeCommandsPack и выполните <codes>newdownloadclient ВЕРСИЯ НАЗВАНИЕ</codes></li>
          <li>Соберите нативные библиотеки так, что бы для Windows и Linux использовался LWJGL 3.2.2, а для MacOS 3.2.1</li>
          <li>Замените authlib по соответствующей инструкции</li>
        </ul>
      </p>
  </sploiler>
  <sploiler><template #header>Сборка Fabric</template>
      <p v-if="version < 50200">
        Для сборки Fabric 1.13+ вы должны:
        <ul>
          <li>Соберите клиент со всеми библиотеками на оффициальном лаунчере Mojang и перенесите файл minecraft.jar и папку libraries в папку клиента</li>
          <li>Соберите нативные библиотеки так, что бы для Windows и Linux использовался LWJGL 3.2.2, а для MacOS 3.2.1</li>
          <li>Замените authlib по соответствующей инструкции</li>
          <li>Составьте профиль по образцу оффициального лаунчера - MainClass, clientArgs. Добавьте опциональные моды с библиотеками LWJGL. Windows и Linux необходима версия 3.2.2, а MacOS 3.2.1 <b>наличие двух версий одновременно без опционального мода или несоответствие версии jar и нативная библиотеки приведет к крашу</b></li>
          <li>После создания профиля cкопируйте <a href="https://mirror.gravit.pro/compat/jimfs-register-1.0.jar">этот файл</a> в папку libraries клиента</li>
        </ul>
      </p>
      <p v-if="version >= 50200">
        Для сборки Fabric 1.13+ вы должны:
        <ul>
          <li>Соберите клиент со всеми библиотеками на оффициальном лаунчере Mojang и перенесите файл minecraft.jar и папку libraries в папку клиента</li>
          <li>Соберите нативные библиотеки так, что бы для Windows и Linux использовался LWJGL 3.2.2, а для MacOS 3.2.1</li>
          <li>Замените authlib по соответствующей инструкции</li>
          <li>Выполните <codes>makeprofile НАЗВАНИЕ ВЕРСИЯ ПАПКА_В_UPDATES</codes></li>
          <li>После генерации профиля cкопируйте <a href="https://mirror.gravit.pro/compat/jimfs-register-1.0.jar">этот файл</a> в папку libraries клиента</li>
        </ul>
      </p>
  </sploiler>
  <sploiler><template #header>Сборка Forge 1.13 и выше</template>
      <p><b>По возможности рекомендуется использовать Fabric</b></p>
      <p v-if="version < 50200">
        Для сборки Forge 1.13+ вы должны:
        <ul>
          <li>Соберите клиент со всеми библиотеками на оффициальном лаунчере Mojang и перенесите файл minecraft.jar и папку libraries в папку клиента</li>
          <li>Соберите нативные библиотеки так, что бы для Windows и Linux использовался LWJGL 3.2.2, а для MacOS 3.2.1</li>
          <li>Замените authlib по соответствующей инструкции</li>
          <li>Составьте профиль по образцу оффициального лаунчера - MainClass, clientArgs. Добавьте опциональные моды с библиотеками LWJGL. Windows и Linux необходима версия 3.2.2, а MacOS 3.2.1 <b>наличие двух версий одновременно без опционального мода или несоответствие версии jar и нативная библиотеки приведет к крашу</b></li>
          <li>Укажите classLoaderConfig AGENT</li>
        </ul>
      </p>
      <p v-if="version >= 50200">
        Для сборки Forge 1.13+ вы должны:
        <ul>
          <li>Соберите клиент со всеми библиотеками на оффициальном лаунчере Mojang и перенесите файл minecraft.jar и папку libraries в папку клиента</li>
          <li>Соберите нативные библиотеки так, что бы для Windows и Linux использовался LWJGL 3.2.2, а для MacOS 3.2.1</li>
          <li>Замените authlib по соответствующей инструкции</li>
          <li>Выполните <codes>makeprofile НАЗВАНИЕ ВЕРСИЯ ПАПКА_В_UPDATES</codes></li>
          <li>После регенации профиля выберите один из возможных вариантов classLoaderConfig:
            <ul>
              <li><codes>LAUNCHER</codes> - в данный момент не работает с Forge 1.13+</li>
              <li><codes>AGENT</codes> - может вызывать проблемы с некоторыми сборками Java на Windows с русскими путями к лаунчеру и/или майнкрафту</li>
              <li><codes>SYSTEM_ARGS</codes> - теоретически может вызвать ошибку с превышением размера аргументов процессу. На практике не встречалась</li>
            </ul>
          </li>
        </ul>
      </p>
  </sploiler>
  <sploiler><template #header>Подпись всего клиента <gtag type='hard'>Сложный уровень</gtag></template>
    <h3>Подпись всего клиента <gtag type="hard">Сложный уровень</gtag>
    </h3>
    <p>Начиная с 5.1.0 появилась возможность подписывать не только лаунчер, а весь клиент целиком. Подпись всего клиента
      осуществляется командой signdir и доступна только если у вас настроен свой сертификат(автосгенерированный не
      подойдет). Перед началом подписи убедитесь что вы настроили раздел sign Лаунчсервера</p>
    <ol>
      <li>Сделайте бекап клиента</li>
      <li>Подготовьте клиент к подписи. Удалите из forge.jar/minecraft.jar/liteloader.jar файлы подписи, которые
        находятся в META-INF и имеют разрешение .SF/.RSA/.EC при их наличии. Так же может понадобится удаление из
        манифеста всех хешей. Убедитесь, что ничего вы этим действием не сломали</li>
      <li>Выполните <codes>signdir updates/ВашКлиент</codes></li>
      <li>Выполните <codes>syncUpdates</codes></li>
    </ol>
    <p>После каждого обновления модов и любых других .jar файлов вам нужно будет их переподписать командой <span
        class="codes">signjar updates/ВашКлиент/ПутьКФайлу</span>. Команда signdir не умеет игнорировать уже подписанные
      файлы, имейте это ввиду</p>
    <p>Подпись клиента - вспомогательное действие, нужное некоторым защитам от читов для нормальной работы</p>
    <h3>Наложение патчей на клиент <gtag type="hard">Сложный уровень</gtag>
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

  </sploiler>
  <h3>Конфигурация <gtag type="easy">Это просто</gtag>
  </h3>
  <pcode autodetect code='
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
'/>
  <h3>Опциональные моды <gtag type="easy">Это просто</gtag>
  </h3>
  <p>Опциональные моды позволяют игроку управлять загрузкой определенных модов/classpath/jvmargs</p>
  <p>Настройка опциональных модов производится для каждого профиля отдельно</p>
  <pcode v-if="version < 50108" code='
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
'/>
<p v-if="version >= 50108">В новых версиях изменили структуру опциональных модов. Теперь каждый опциональный мод может содержать один или несколько действий - это может быть файл или список файлов, изменение аргументов клиента или JVM, classpath, а так же любые кастомные действия, добавляемые модулями
  Для конвертации старого формата опциональных модов в новый используйте команду saveprofile
</p>
<p v-if="version >= 50108">
  <pcode autodetect code='
"updateOptional": [
    {
       "actions": [ //Список действий опционального мода
        { //Первое действие
          "files": {
            "mods/1.7.10/NotEnoughItems-1.7.10-1.0.5.118-universal.jar": "", //Простое добавление файла без переименований
            "mods/SuperStrangeMod0.jar": "mods/SuperStrangeMod.jar", //Добавление файла с перемещением. на стороне лаунчсервера файл находится по пути "mods/SuperStrangeMod0.jar", а в клиент он попадет сюда "mods/SuperStrangeMod.jar"
            "mods2/LowStrangeMod2.jar": "mods/LowStrangeMod.jar", //Между папками перемещение тоже работает
            "config2/ic2": "config/ic2" //Перемещение папок с файлами тоже работает
          },
          "type": "file" //Тип действия - обработка файлов
        }
      ],
       "info": "Мод, показывающий рецепты", //Описание
       "visible": true, //Видимость
       "mark": true, //Включен по умолчанию
       "permissions": 0, //Маска привилегий. 0 - мод для всех, 1 - только для админов.
       "name": "NotEnoughItems" //Имя
    },
    {
       "actions": [
        {
          "files": {
            "mods/Waila_1.5.10_1.7.10.jar": ""
          },
          "type": "file"
        }
      ],
       "info": "Мод, показывающий дополнительную информацию при наведении на блок",
       "name": "Walia",
       "permissions": 0,
       "visible": true,
       "dependenciesFile": [{"name":"NotEnoughItems"/* Имя зависимого мода */}],
       "conflictFile": [{"name":"ClientFixer"/* Имя конфликтующего мода */}],
       "subTreeLevel": 2  //Смещение относительно первого мода. Используется для создания визуального отображения дерева зависимостей
    },
    {
       "actions": [
         {
           "args": [
             "--add-modules",
             "jdk.unsupported"
           ],
           "type": "jvmArgs"
         }
       ],
       "triggers": [{"type": "JAVA_VERSION", "compareMode": 1, "need": true, "value": 8}], //Триггеры, о них ниже
       "info": "Аргументы Java9+",
       "visible": false,
       "permissions": 0,
       "name": "Java9Args"
    },
    {
       "actions": [
        {
          "files": {
            "mods/1.7.10/OptiFine_1.7.10_HD_U_E7.jar": ""
          },
          "type": "file"
        }
      ],
       "info": "Улучшение производительности",
       "permissions": 0,
       "visible": true,
       "name": "OptiFine HD"
    }
  ],
'/>
</p>
  <div v-if="version < 50200"><h3>Триггеры в опциональных модах <gtag type="medium">Средний уровень</gtag>
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
  </div>
  <div v-if="version >= 50200"><h3>Триггеры в опциональных модах <gtag type="medium">Средний уровень</gtag></h3>
  <p>В 5.2.0 триггеры в опц. модах были изменены для поддержки выбора Java в клиенте и обеспечения большей расширяемости</p>
  <p>Список триггеров теперь находится в поле <codes>triggersList</codes>, а не <codes>triggers</codes> как раньше. Для конвертации в новый формат можете воспользоватся saveprofiles</p>
  <p>Триггер <codes>java</codes></p>
  <pcode autodetect code='
  {
    "type": "java",
    "minVersion": 8, //Минимальная версия Java для срабатывания триггера
    "maxVersion": 11, //Максимальная версия Java для срабатывания триггера
    "required": true, //Показывает что без этого триггера включение опц.мода не имеет смысла
    "inverted": false //Инвертировать триггер
  }
  '/>
  <p>Триггер <codes>os</codes></p>
  <pcode autodetect code='
  {
    "type": "os",
    "os": "MUSTDIE", //Тип ОС(MUSTDIE - Windows, LINUX - Linux, MACOSX - MacOS)
    "required": true, //Показывает что без этого триггера включение опц.мода не имеет смысла
    "inverted": false //Инвертировать триггер
  }
  '/>
  </div>
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
<script>
import coremethods from '@/components/core-methods.js'
export default {
  mixins: [coremethods],
  created: function () {}
}
</script>
