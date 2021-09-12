import hljs from 'highlight.js/lib/common';
import nginx from 'highlight.js/lib/languages/nginx';
import bash from 'highlight.js/lib/languages/bash';
import hljsVuePlugin from "@highlightjs/vue-plugin";

import 'highlight.js/styles/github.css'

export default ({ app, router, store }) => {
    hljs.registerLanguage("nginx", nginx);
    hljs.registerLanguage("bash", bash);
    app.use(hljsVuePlugin, { hljs })
}