module.exports = {
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: `/images/icons/favicon-16x16.png`, }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: `/images/icons/favicon-32x32.png`, }],
  ],
  lang: 'ru_RU',
  title: 'GravitLauncher Wiki',
  description: 'GravtiLauncher Wiki',
  theme: '@vuepress/theme-default',
  port: '8080', //Порт на котором запускается VuePress
  themeConfig: {
    repo: 'GravitLauncher/Launcher',
    docsRepo: 'https://github.com/GravitLauncher/LauncherWiki',
    docsBranch: 'master', //Гравита тут впеши название ветки где будет лежать эта вики (потом сотри)
    docsDir: 'docs',
    editLinkPattern: ':repo/edit/:branch/:path',
    locales: {
      '/': {
        editLinkText: 'Измените эту страницу на GitHub',
      },
    },
    logo: 'images/hero.png',
    navbar: [
      {
        text: 'Launcher',
        children: [
          {
            text: 'Установка LaunchServer',
            link: 'install.html',
          },
          {
            text: 'Настройка авторизации',
            link: 'auth.html',
          },
          {
            text: 'Настройка клиента',
            link: 'clientbuild.html',
          },
          {
            text: 'Привязка сервера Minecraft',
            link: 'server.html',
          },
          {
            text: 'Настройка рантайм',
            link: 'runtime.html',
          },
          {
            text: 'Другие настройки',
            link: 'othersettings.html',
          },
          {
            text: 'Разработчикам',
            link: 'developers.html',
          },
        ],
      },
      {
        text: 'Discord',
        link: 'https://discord.gg/b9QG4ygY75',
      },
    ],
    sidebar: [
      {
        text: 'Установка LaunchServer',
        link: 'install.html#установка-launchserver',
        children: [
          {
            text: 'Выбор хостинга',
            link: 'install.html#выбор-хостинга',
            children: [],
          },
          {
            text: 'Настройка хостинга',
            link: 'install.html#настроика-хостинга',
            children: [],
          },
          {
            text: 'Установка LaunchServer',
            link: 'install.html#установка-launchserver-1',
            children: [],
          },
          {
            text: 'Настройка Nginx',
            link: 'install.html#настроика-nginx',
            children: [],
          },
          {
            text: 'Настройка безопасного подключения',
            link: 'install.html#настроика-безопасного-подключения',
            children: [],
          },
          {
            text: 'Установка на Windows (только для тестирования)',
            link: 'install.html#установка-на-windows-только-для-тестирования',
            children: [],
          },
        ],
      },
      {
        text: 'Настройка авторизации',
        link: 'auth.html#настроика-авторизации',
        children: [
          {
            text: 'Обзор AuthCodeProvider',
            link: 'auth.html#настроика-авторизации',
            children: [],
          },
          {
            text: 'Настройка PasswordVerifier',
            link: 'auth.html#конфигурация-passwordverifier',
            children: [],
          },
          {
            text: 'Привилегии',
            link: 'auth.html#привилегии',
            children: [],
          },
          {
            text: 'Метод Memory',
            link: 'auth.html#метод-memory',
            children: [],
          },
          {
            text: 'Метод MySQL',
            link: 'auth.html#метод-mysql',
            children: [],
          },
          {
            text: 'Метод PostgreSQL',
            link: 'auth.html#метод-postgresql',
            children: [],
          },
          {
            text: 'Метод http',
            link: 'auth.html#метод-http',
            children: [],
          },
          {
            text: 'Метод FileAuthSystem',
            link: 'auth.html#метод-fileauthsystem',
            children: [],
          }
        ],
      },
      {
        text: 'Настройка клиента',
        link: 'clientbuild.html#настроика-клиента',
        children: [
          {
            text: 'Совместимость',
            link: 'clientbuild.html#совместимость',
            children: [],
          },
          {
            text: 'Скачивание клиента',
            link: 'clientbuild.html#скачивание-клиента-с-зеркала',
            children: [],
          },
          {
            text: 'Сборка Authlib 1',
            link: 'clientbuild.html#сборка-authlib-minecraft-до-1-16-4',
            children: [],
          },
          {
            text: 'Сборка Authlib 2',
            link: 'clientbuild.html#сборка-authlib-minecraft-с-1-16-5-1-17-1',
            children: [],
          },
          {
            text: 'Сборка Authlib 3',
            link: 'clientbuild.html#сборка-authlib-minecraft-с-1-18-и-выше',
            children: [],
          },
          {
            text: 'Настройка профиля',
            link: 'clientbuild.html#настроика-профиля',
            children: [],
          },
          {
            text: 'Опциональные моды',
            link: 'clientbuild.html#опциональные-моды',
            children: [],
          }
        ],
      },
      {
        text: 'Привязка сервера Minecraft',
        link: 'server.html',
        children: [
          {
            text: 'Совместимость',
            link: 'server.html#совместимость',
          },
          {
            text: 'Установка ServerWrapper',
            link: 'server.html#использование-serverwrapper',
          },
        ],
      },
      {
        text: 'Настройка рантайма',
        link: 'runtime.html',
        children: [
          {
            text: 'Обзор рантайма',
            link: 'runtime.html#описание-рантаима',
          },
          {
            text: 'Настройка рантайма',
            link: 'runtime.html#настроика-рантаима-1',
          },
          {
            text: 'Структура рантайма',
            link: 'runtime.html#структура-рантаима',
          },
          {
            text: 'Основные сущности',
            link: 'runtime.html#объекты-рантаима',
          },
          {
            text: 'Отладка рантайма',
            link: 'runtime.html#отладка-рантаима',
          },
        ],
      },
      {
        text: 'Другие настройки',
        link: 'othersettings.html',
        children: [
          {
            text: 'Настройка TextureProvider',
            link: 'othersettings.html#textureprovider',
          },
        ],
      },
      {
        text: 'Разработчикам',
        link: 'developers.html',
        children: [
          {
            text: 'Подключение зависимостей Gradle',
            link: 'developers.html#подключение-зависимостеи-gradle',
          },
          {
            text: 'Написание модуля',
            link: 'developers.html#написание-модуля',
          },
          {
            text: 'Внешнее API',
            link: 'developers.html#внешние-api',
          },
          {
            text: 'Написание AuthCodeProvider',
            link: 'developers.html#написание-authcoreprovider',
          },
          {
            text: 'Реализация OAuth',
            link: 'developers.html#реализация-oauth',
          },
        ],
      },
    ],
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
  ],
}
