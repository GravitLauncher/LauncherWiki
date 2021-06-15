<template>
    <div>
        <b-card>
        <b-card-header>
            <h4>{{ header ? header : "Код" }} <b-button v-on:click="copyin()" style="float: right;">{{ copytext }}</b-button></h4>
        </b-card-header>
        <b-card-body>
            <highlightjs :autodetect="autodetect" :language="language" :code="code" />
        </b-card-body>
        </b-card>
    </div>
</template>
<script>
export default {
    "props": ["header", "autodetect", "language", "code"],
    data: function() {
        return {
            "copytext": "Copy"
        };
    },
    methods: {
        "copyin": async function() {
            var cleartext = this.code.split('\n').map(e => this.clearlinein(e)).filter(e => e).join("\n");
            await navigator.clipboard.writeText(cleartext);
            this.copytext = "Copied";
        },
        "clearlinein": function(text) {
            var tmptext = text;
            var offset = 0;
            do {
                var r = tmptext.search("\"");
                if(r > 0) {
                    offset += r + 1;
                    tmptext = tmptext.substr(r+1);
                }
            } while(r > 0)
            r = tmptext.search("//");
            if(r > 0) {
                text = text.substr(0, offset+r);
            }
            if(text.trim().length == 0) return undefined;
            return text;
        }
    }
}
</script>