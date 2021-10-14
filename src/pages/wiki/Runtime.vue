<template>
  <q-page padding>
    <doc-header name="overiew">Описание рантайма</doc-header>
    <p>
      Рантайм в лаунчере - это модуль для лаунчера и набор ресурсов(fxml/css/png), отвечающие за взаимодействие с пользователем. Рантайм
      использует <a href='https://openjfx.io/'>JavaFX</a> для взаимодействия с пользователем. Полезные ссылки:
    </p>
    <ul>
      <li><a href='https://gluonhq.com/products/scene-builder/'>Scene Builder</a> - Редактор fxml файлов</li>
      <li><a href='https://openjfx.io/javadoc/17/'>OpenJFX API Docs</a> - Документация JavaFX API</li>
      <li><a href='https://openjfx.io/javadoc/17/javafx.graphics/javafx/scene/doc-files/cssref.html'>JavaFX CSS Reference Guide</a> - Документация JavaFX CSS</li>
    </ul>
    <doc-header name="settings">Настройка рантайма</doc-header>
    <a>В этом разделе вы найдете полезные функции, входящие в рантайм "из коробки", но не включенные по умолчанию</a>
    <h4>Шифрование рантайма</h4>
    <ul>
      <li>Скачайте библиотеку <a href='https://mirror.gravit.pro/compat/EnFS-1.0.0.jar'>EnFS</a> и положите её в папку launcher-libraries</li>
      <li>Включите опцию <q-badge>runtimeEncrypt</q-badge> в конфигурации лаунчсервера и сделайте build</li>
      <li>Проверьте правильность работы</li>
    </ul>
    <h4>Скачивание своей Java</h4>
    <ul>
      <li>Скачайте <b>архивы</b> с JRE/JDK с оффициального сайта Oracle или другого поставщика сборок OpenJDK</li>
      <li>Распакуйте архивы в папку updates и дайте им понятные названия: <q-badge>java17-windows-64</q-badge>, <q-badge>java17-windows-32</q-badge> и т.д.</li>
      <li>По желанию удалите из сборок JRE/JDK необязательные компоненты для уменьшения объема скачиваемых данных</li>
      <li>Откройте файл <q-badge>config/JavaRuntime/Config.json</q-badge> в текстовом редакторе, найдите строку <q-badge>"javaList": {}</q-badge> и приведите её к такому виду:</li>
      <doc-code language="json" code='"javaList": {
    "java17-windows-64": "Java 17 b53 mustdie x64 javafx true",
    "java17-windows-32": "Java 17 b53 mustdie x32 javafx true"
  }' /><i>Формат записи: <q-badge>Java {номер версии} b{номер сборки} {mustdie/linux/macos} x{разрядность} javafx {наличие javafx}</q-badge></i>
      <li>Добавьте папки с вашими сборками JRE/JDK в allowUpdates конфиге лаунчсервера: <q-badge>"allowUpdates": ["java17-windows-64", "java17-windows-32"],</q-badge></li>
      <li>Выполните syncup и build</li>
      <li>Проверьте правильность работы</li>
    </ul>
    <doc-header name="structure">Структура рантайма</doc-header>
    <p>Файловая структура:</p>
    <ul>
      <li>images - папка, которая содержит все картинки</li>
      <li>
        overlay - папка, в которой находятся оверлеи. Каждому оверлею выдается
        отдельная папка, в которой должны лежать fxml и css файлы. Допускается
        рядом с fxml и css размещать картинки, специфичные для конкретного
        оверлея
      </li>
      <li>
        scenes - папка, аналогичная по своей структуре папке overlay, но
        предлязначена для сцен
      </li>
      <li>
        components - папка, в которой находится дизайн отдельных частей, таких
        как serverButton и уведомления
      </li>
      <li>
        dialogs - папка, в которой находится дизайн диалогов
      </li>
      <li>
        styles - папка с css стилями
      </li>
      <li>runtime_*.properties - собранные файлы локализации</li>
    </ul>
    <p>Основные сущности:</p>
    <ul>
      <li>
        Stage - окно. Эта сущность отвечает за иконку, параметры окна и его
        название
      </li>
      <li>
        Scene - содержимое окна. Является корнем всех объектов и не может быть
        встроена куда либо
      </li>
      <li>
        Overlay - кастомное содержимое, наложенное на сцену. При отображении
        оверлея сцена размывается и блокируется пока открыт оверлей
      </li>
      <li>
        Component - содержимое, не привязанное к чему либо. Компонент может
        существовать в нескольких экземплярах одновременно, чем и от отличается
        от сцен и оверлеев
      </li>
    </ul>
    <p>
      Для редактирования файлов fxml вам понадобится программа JavaFX
      SceneBuilder, которую вы можете скачать с любого удобного для вас сайта<br />
      После чего открываете интересующий вас fxml файл, заходите в Preview ->
      Internationalization -> Set Resourse и выбираете файл runtime_*.properties
    </p>
    <p>
      Для редактирования текста вам понадобится папка compat, в которой нахоятся
      оригинальные .properties файлы.
      <b
        >Измерять напрямую файлы runtime_*.properties из папки runtime нельзя
        (не будет работать русский язык)</b
      ><br />
      После того как вы изменили текст в compat файлах что бы привести его в
      понятный рантайму вид воспользуйтесь утилитой native2ascii, которая идет в
      любом JDK.
    </p>
    <doc-header name="entities">Объекты рантайма</doc-header>
    <p>
      <b>JavaFXApplication</b> - основной класс рантайма, точка доступа к всем
      компонентам и управлению приложением.
    </p>
    <p>
      <b>FXMLLoader</b> - асинхронный многопоточный загрузчик fxml, обеспечивает
      ускорение запуска и поддержку мультиязычности
    </p>
    <p>
      <b>StateService</b> - точка обмена данными и состоянием лаунчера
    </p>
    <p>
      <b>RuntimeSecurityService</b> - выполняет обмен ключами с лаунчсервером,
      сбор HardwareInfo(HWID) и обновление лаунчера
    </p>
    <p><b>MessageManager</b> - отображает уведомления и диалоги</p>
    <h3>Работа с .properties и перевод на другие языки</h3>
    <p>
      Вы можете перевести лаунчер на любой другой язык, добавив его в список
      языков в файле RuntimeSettings.java. Для этого добавьте в enum
      LAUNCHER_LOCALE свой язык. Первый параметр - 2-3 буквы страны, которые
      будут использоваться для поиска .properties файла. Второй параметр -
      отображаемое имя в всплывающем окне выбора языков.
    </p>
    <p>
      Помимо надписей .properties файлы поддерживают изменение любых свойств
      JavaFX, в том числе размеры и расположение элементов, пути до картинок,
      параметры объектов и вообще любые свойства, которые вы можете указать в
      .fxml файле
    </p>
    <doc-header name="debug">Отладка рантайма</doc-header>
    <p>
      Для отладки рантайма из IDEA укажите следующие параметры:
    </p>
    <ul>
      <li>Модуль: JavaRuntime.main</li>
      <li>
        Аргументы jvm:
        -Dlauncherdebug.modules=pro.gravit.launcher.client.JavaRuntimeModule
        (если параметр не отображаются нажмите Modify Options -> Add VM options)
      </li>
      <li>Main Class: pro.gravit.launcher.debug.DebugMain</li>
    </ul>
    <p>Ограничения отладочного режима:</p>
    <ul>
      <li>
        Не будет работать опция "Сохранить пароль", так как ключ шифрования
        пароля зашивается лаунчсервером
      </li>
      <li>
        Невозможно запустить клиент майнкрафта(при этом все этапы скачивания,
        проверки, и подготовки к старту работать будут)
      </li>
      <li>
        Лаунчер не будет пытаться обновиться и получить список методов
        авторизации
      </li>
      <li>
        Может не работать проверка HWID, так как лаунчсервер не будет доверять
        лаунчеру
      </li>
      <li>
        Отладочный режим невозможно активировать на уже собранном лаунчере
      </li>
    </ul>
  </q-page>
</template>

<script>
import DocCode from "src/components/DocCode.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { DocCode },
  name: "PageDefault",
  data: function () {
    return {
    };
  },
});
</script>
