<template>
  <div class="wiki">
    <h2>Шифрование рантайма</h2>
    <b-alert
          variant="danger"
          :show="version < 50200"
          >Доступно только с <b>5.2.0</b></b-alert>
    <p>Шифрование рантайма - опция, которая позволяет иметь зашифрованные файлы дизайна(fxml/css/png) для защиты от кражи дизайна другими проектами</p>
    <p>Для её активации:</p>
    <ul>
      <li>Добавьте в папку launcher-libraries библиотеку EnFS</li>
      <li>Активируйте опция <codes>encryptedRuntime</codes> в LaunchServer.json</li>
      <li>Сделайте build</li>
    </ul>
    <p>После чего у вас внутри .jar должно лежать зашифрованное содержимое папки runtime</p>
  </div>
</template>
<script>
import coremethods from '@/components/core-methods.js'
export default {
  mixins: [coremethods],
  created: function () {}
}
</script>
