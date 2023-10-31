import { defineUserConfig } from "vuepress";
import { defaultTheme } from "@vuepress/theme-default";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";

export default defineUserConfig({
    head: [
        ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: `/images/icons/favicon-16x16.png`, }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: `/images/icons/favicon-32x32.png`, }],
        ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: `/images/icons/apple-touch-icon.png`, }],
        ['link', { rel: 'manifest', href: `/manifest.webmanifest`, }],
        ['link', { rel: 'mask-icon', color: '#5bbad5', href: `/images/icons/safari-pinned-tab.svg`, }],
        ['link', { rel: 'shortcut icon', href: `/images/icons/favicon.ico`, }],
        ['meta', { name: 'apple-mobile-web-app-title', content: 'GravitLauncher Wiki' }],
        ['meta', { name: 'application-name', content: 'GravitLauncher Wiki' }],
        ['meta', { name: 'msapplication-TileColor', content: '#603cba' }],
        ['meta', { name: 'msapplication-config', content: '/images/icons/browserconfig.xml' }],
        ['meta', { name: 'theme-color', content: '#ffffff' }],
        ['meta', { property: 'og:title', content: 'GravitLauncher Wiki' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:url', content: 'https://gravitlauncher.com/' }],
        ['meta', { property: 'og:image', content: 'https://gravitlauncher.com/images/logo.png' }],
        ['meta', { property: 'og:image:width', content: '512' }],
        ['meta', { property: 'og:image:height', content: '512' }],
    ],
    lang: 'ru_RU',
    title: 'GravitLauncher Wiki',
    description: 'GravitLauncher Wiki',
    port: '8080', //Порт на котором запускается VuePress
    theme: defaultTheme({
        repo: 'GravitLauncher/Launcher',
        docsRepo: 'https://github.com/GravitLauncher/LauncherWiki',
        docsBranch: 'main',
        docsDir: 'docs',
        editLinkPattern: ':repo/edit/:branch/:path',
        locales: {
            '/': {
                editLinkText: 'Измените эту страницу на GitHub',
                lastUpdatedText: "Последнее обновление",
                notFound: [
                    "Здесь ничего нет.",
                    "Как мы тут оказались?",
                    "Похоже, у нас есть несколько неработающих ссылок."
                ],
                backToHome: "Вернуться на главную",
                openInNewWindow: "открыть в новом окне",
                toggleDarkMode: "переключить темный режим",
                toggleSidebar: "переключить боковую панель",
                contributors: false,
                contributorsText: "Спонсоры",
            },
        },
        logo: 'images/logo.png',
        navbar: [
            {
                text: 'Руководство',
                children: [
                    '/install/README.md',
                    '/auth/README.md',
                    '/clientbuild/README.md',
                    '/servers/README.md',
                    '/runtime/README.md',
                    '/other/README.md',
                    '/modules/README.md',
                    '/dev/README.md',
                ],
            },
            {
                text: 'Зеркало',
                link: 'https://mirror.gravitlauncher.com/',
            },
            {
                text: 'Discord',
                link: 'https://discord.gg/b9QG4ygY75',
            },
        ],
        sidebar: {
            '/': [
                {
                    text: 'Руководство',
                    collapsible: false,
                    children: [
                        '/install/README.md',
                        '/auth/README.md',
                        '/clientbuild/README.md',
                        '/servers/README.md',
                        '/runtime/README.md',
                        '/other/README.md',
                        '/modules/README.md',
                        '/dev/README.md',
                    ],
                },
            ],
        },
    }),
    plugins: [
        docsearchPlugin({
            appId: 'H9GISVMWXN',
            apiKey: '256b831b5e9c45c225d0a55f2de0d4b0',
            indexName: 'gravitlauncher1',
            debug: false,
            locales: {
                '/': {
                    placeholder: 'Поиск',
                    translations: {
                        button: {
                            buttonText: 'Поиск',
                        },
                    },
                },
            },
        }),
    ]
})