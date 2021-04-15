<template>
  <div class="wiki">
    <h2>Базовая настройка защиты</h2>
    <ol>
      <li>
        <h4><router-link to="/protection/nginx">Настройка Nginx</router-link></h4>
      </li>
      <li>
        <h4><router-link to="/protection/protecthandler">Настройка ProtectHandler</router-link></h4>
      </li>
      <li>
        <h4><router-link to="/protection/signing">Подпись лаунчера и EXE</router-link></h4>
      </li>
      <li v-if="version >= 50110">
        <sploiler link="certificatepinning"><template #header>Настройка certificatePinning </template>
          <p>
            Опция <span class="codes">certificatePinning</span> позволяет работать лаунчеру независимо от системного хранилища сертификатов. Это повысит безопасность лаунчера и устранит проблемы с старой Java у пользователя и Lets'Encrypt сертификатом
          </p>
          <ol>
            <li>Откройте в браузере свой сайт, где находятся клиенты и /api лаунчсервера</li>
            <li>Откройте в браузере "Просмотр сертификата" и найдите там ваш корневой сертификат(Root CA). Скачайте его</li>
            <li>Повторите пункт 2 для всех сертификатов, которые вы хотите добавить в доверенные</li>
            <li>Скопируйте все файлы .crt, скачанные на предыдущих этапах в папку truststore лаунчсервера</li>
            <li>В конфиге лаунчсервера измените параметр certificatePinning на true</li>
            <li>Перезапустите лаунчсервер и сделайте build</li>
            <li>Проверьте работоспособность</li>
          </ol>
        </sploiler>
      </li>
    </ol>
  </div>
</template>
<script>
import coremethods from '@/components/core-methods.js'
export default {
  mixins: [coremethods],
  created: function () {}
}
</script>
