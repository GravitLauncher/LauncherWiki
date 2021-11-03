<template>
  <q-page padding>
    <doc-header name="textureprovider">TextureProvider</doc-header>
    <p>TextureProvider нужен при отсутствии поддержки скинов со стороны AuthCoreProvider. Выберите один из вариантов TextureProvider:</p>
    <ul>
      <li><b>request</b> - прямое получение скина<br/>
      <s>Поддерживаются следующие placeholder: <b>%username%</b> имя пользователя, <b>%uuid%</b> UUID пользователя, <b>%hash%</b> UUID пользователя без разделителей</s>
      <doc-code language="json" code='
      "textureProvider": {
        "skinURL": "http://example.com/skins/%username%.png",
        "cloakURL": "http://example.com/cloaks/%username%.png",
        "type": "request"
      },' /></li>
      <li><b>request</b> - прямое получение скина по локальному пути
      <doc-code language="json" code='
      "textureProvider": {
        "skinURL": "http://example.com/skins/%username%.png",
        "cloakURL": "http://example.com/cloaks/%username%.png",
        "skinLocalPath": "/var/www/site/skins/%username%.png",
        "cloakLocalPath": "/var/www/site/cloaks/%username%.png",
        "type": "request"
      },' />
      </li>
      <li><b>json</b> - запрос к сайту для получения URL скина и метаданных
      <doc-code language="json" code='
      "textureProvider": {
        "url": "http://example.com/getskin.php?username=%username%",
        "type": "json"
      },' />
      <p>Пример ответа:</p>
      <doc-code language="json" code='
      {
        "skin": {
          "url": "http://example.com/skins/Gravita.png",
          "digest": "",
          "metadata": {
            "model": "slim"
          }
        },
        "cloak": {
          "url": "http://example.com/cloaks/Gravita.png",
          "digest": ""
        }
      }' />
      </li>
      <li><b>void</b> - скины и плащи не поддерживаются
      <doc-code language="json" code='
      "textureProvider": {
        "type": "void"
      },' />
      </li>
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
