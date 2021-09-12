import DocCode from "components/DocCode.vue"
import DocHeader from "components/DocHeader.vue"

export default ({ app, router, store }) => {
    app.component("doc-code", DocCode);
    app.component("doc-header", DocHeader);
}