<template>
  <q-page padding>
    <doc-header name="launcher">Отладка лаунчера</doc-header>
    <p>Для просмотра логов запуска лаунчера нужно запустить его с включенным режимом отладки:</p>
    <ul>
      <li>Откройте консоль (командная строка в Windows, терминал в Linux), перейдите в папку с лаунчером командой <q-badge>cd ПУТЬ_К_ЛАУНЧЕРУ</q-badge></li>
      <li>Выполните <q-badge>java -Dlauncher.debug=true -Dlauncher.stacktrace=true -jar Launcher.jar</q-badge></li>
      <li>Скопируйте текст ошибки и отправьте нам в Discord</li>
    </ul>
    <a>В большинстве случаев вам понадобится отключить обфускацию proguard и stripLineNumbers для того, чтобы мы могли понять, в каком месте произошла ошибка</a>
    <ul>
      <li>Для отключения proguard откройте файл конфигурации лаунчсервера, найдите там секцию proguard в разделе components и измените параметр enabled с true на false</li>
      <li>Для отключения stripLineNumbers в том же файле найдите раздел launcher и измените параметр stripLineNumbers с true на false</li>
      <li>Сделайте build и повторите действия для получения лога с ошибкой</li>
      <li>После исправления ошибки не забудьте вернуть обратно параметры proguard и stripLineNumbers</li>
    </ul>
    <doc-header name="launchserver">Отладка лаунчсервера</doc-header>
    <a>Логи лаунчсервера хранятся в папке logs</a>
    <doc-header name="network">Отладка сетевых проблем</doc-header>
    <ul>
      <li>Проверьте, что лаунчсервер, БД, сайт запущены только в одном экземпляре</li>
      <li>При ошибках с подключением к базе данных убедитесь, что данные введены верно и доступ к БД не блокируется хостингом</li>
      <li>При ошибках с подключением к лаунчсерверу убедитесь, что вы правильно настроили проксирование, выключили Browser Integrity Check при использовании Cloudflare</li>
      <li>При ошибках запуска клиента убедитесь, что антивирус не блокирует лаунчер</li>
    </ul>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "PageDefault",
  data: function () {
    return {
    };
  },
});
</script>
