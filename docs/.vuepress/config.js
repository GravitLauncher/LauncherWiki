module.exports = {
    head: [
        ['link', {rel: 'icon', type: 'image/png', sizes: '16x16', href: `/images/icons/favicon-16x16.png`,}],
        ['link', {rel: 'icon', type: 'image/png', sizes: '32x32', href: `/images/icons/favicon-32x32.png`,}],
    ],
    lang: 'ru_RU',
    title: 'GravitLauncher Wiki',
    description: 'GravitLauncher Wiki',
    theme: '@vuepress/theme-default',
    port: '8080', //Порт на котором запускается VuePress
    themeConfig: {
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
                toggleSidebar: "переключить боковую панель"
            },
        },
        logo: 'images/hero.png',
        navbar: [
            {
                text: 'Руководство',
                children: [{
                    text: 'Установка LaunchServer',
                    link: '/install/',
                },
                    {
                        text: 'Настройка авторизации',
                        link: '/auth/',
                    },
                    {
                        text: 'Настройка клиента',
                        link: '/clientbuild/',
                    },
                    {
                        text: 'Привязка сервера Minecraft',
                        link: '/servers/',
                    },
                    {
                        text: 'Настройка рантайм',
                        link: '/runtime/',
                    },
                    {
                        text: 'Другие настройки',
                        link: '/other/',
                    },
                    {
                        text: 'Разработчикам',
                        link: '/dev/',
                    },
                ],
            },
            {
                text: 'Discord',
                link: '/https://discord.gg/b9QG4ygY75',
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
                        '/dev/README.md',
                    ],
                },
            ],
        },
        /*sidebar: [
            {
            text: 'Установка LaunchServer',
            link: '/install/#установка-launchserver',
            children: [
                {
                    text: 'Выбор хостинга2',
                    link: '/install/hosting-choice.md',
                    children: [],
                },
                {
                    text: 'Выбор хостинга',
                    link: '/install/#выбор-хостинга',
                    children: [],
                },
                {
                    text: 'Настройка хостинга',
                    link: '/install/#настроика-хостинга',
                    children: [],
                },
                {
                    text: 'Установка LaunchServer',
                    link: '/install/#установка-launchserver-1',
                    children: [],
                },
                {
                    text: 'Настройка Nginx',
                    link: '/install/#настроика-nginx',
                    children: [],
                },
                {
                    text: 'Настройка безопасного подключения',
                    link: '/install/#настроика-безопасного-подключения',
                    children: [],
                },
                {
                    text: 'Установка на Windows (только для тестирования)',
                    link: '/install/#установка-на-windows-только-для-тестирования',
                    children: [],
                },
            ],
        },
            {
                text: 'Настройка авторизации',
                link: '/auth/#настроика-авторизации',
                children: [{
                    text: 'Обзор AuthCodeProvider',
                    link: '/auth/#настроика-авторизации',
                    children: [],
                },
                    {
                        text: 'Настройка PasswordVerifier',
                        link: '/auth/#конфигурация-passwordverifier',
                        children: [],
                    },
                    {
                        text: 'Привилегии',
                        link: '/auth/#привилегии',
                        children: [],
                    },
                    {
                        text: 'Метод Memory',
                        link: '/auth/#метод-memory',
                        children: [],
                    },
                    {
                        text: 'Метод MySQL',
                        link: '/auth/#метод-mysql',
                        children: [],
                    },
                    {
                        text: 'Метод PostgreSQL',
                        link: '/auth/#метод-postgresql',
                        children: [],
                    },
                    {
                        text: 'Метод http',
                        link: '/auth/#метод-http',
                        children: [],
                    },
                    {
                        text: 'Метод FileAuthSystem',
                        link: '/auth/#метод-fileauthsystem',
                        children: [],
                    }
                ],
            },
            {
                text: 'Настройка клиента',
                link: '/clientbuild/#настроика-клиента',
                children: [{
                    text: 'Совместимость',
                    link: '/clientbuild/#совместимость',
                    children: [],
                },
                    {
                        text: 'Скачивание клиента',
                        link: '/clientbuild/#скачивание-клиента-с-зеркала',
                        children: [],
                    },
                    {
                        text: 'Сборка Authlib 1',
                        link: '/clientbuild/#сборка-authlib-minecraft-до-1-16-4',
                        children: [],
                    },
                    {
                        text: 'Сборка Authlib 2',
                        link: '/clientbuild/#сборка-authlib-minecraft-с-1-16-5-1-17-1',
                        children: [],
                    },
                    {
                        text: 'Сборка Authlib 3',
                        link: '/clientbuild/#сборка-authlib-minecraft-с-1-18-и-выше',
                        children: [],
                    },
                    {
                        text: 'Настройка профиля',
                        link: '/clientbuild/#настроика-профиля',
                        children: [],
                    },
                    {
                        text: 'Опциональные моды',
                        link: '/clientbuild/#опциональные-моды',
                        children: [],
                    }
                ],
            },
            {
                text: 'Привязка сервера Minecraft',
                link: '/servers/',
                children: [{
                    text: 'Совместимость',
                    link: '/servers/#совместимость',
                },
                    {
                        text: 'Установка ServerWrapper',
                        link: '/servers/#использование-serverwrapper',
                    },
                ],
            },
            {
                text: 'Настройка рантайма',
                link: '/runtime/',
                children: [{
                    text: 'Обзор рантайма',
                    link: '/runtime/#описание-рантаима',
                },
                    {
                        text: 'Настройка рантайма',
                        link: '/runtime/#настроика-рантаима-1',
                    },
                    {
                        text: 'Структура рантайма',
                        link: '/runtime/#структура-рантаима',
                    },
                    {
                        text: 'Основные сущности',
                        link: '/runtime/#объекты-рантаима',
                    },
                    {
                        text: 'Отладка рантайма',
                        link: '/runtime/#отладка-рантаима',
                    },
                ],
            },
            {
                text: 'Другие настройки',
                link: '/other/',
                children: [{
                    text: 'Настройка TextureProvider',
                    link: '/other/#textureprovider',
                },],
            },
            {
                text: 'Разработчикам',
                link: '/dev/',
                children: [{
                    text: 'Подключение зависимостей Gradle',
                    link: '/dev/#подключение-зависимостеи-gradle',
                },
                    {
                        text: 'Написание модуля',
                        link: '/dev/#написание-модуля',
                    },
                    {
                        text: 'Внешнее API',
                        link: '/dev/#внешние-api',
                    },
                    {
                        text: 'Написание AuthCodeProvider',
                        link: '/dev/#написание-authcoreprovider',
                    },
                    {
                        text: 'Реализация OAuth',
                        link: '/dev/#реализация-oauth',
                    },
                ],
            },
        ],*/
    },
    plugins: [
        [
            '@vuepress/plugin-search',
            {
                locales: {
                    '/': {
                        placeholder: 'Поиск...',
                    },
                },
            },
        ],
    ]
}