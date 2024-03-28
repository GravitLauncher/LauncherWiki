# GravitLauncher Wiki (vuepress)

Эта Википедия была обновлена специально для программного обеспечения GravitLauncher

## Установка зависимостей

```bash
yarn
```

### Запуск в режиме разработчика

```bash
yarn docs:dev
```

### Команда сборки статик файлов

```bash
yarn docs:build
```

Собранные файлы будут тут

`docs/.vuepress/dist`

### Использование в связке с Docker

Этот репозиторий можно использовать как путь до образа, например (`docker-compose.yaml`):

```yaml
services:
  wiki:
    build: https://github.com/GravitLauncher/LauncherWiki.git
    restart: always
    ports:
      - 8080:80
```