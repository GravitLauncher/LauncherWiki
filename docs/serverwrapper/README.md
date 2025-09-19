# Привязка сервера

ServerWrapper - это компонент лаунчера, предназначеный для привязывания вашего сервера Minecraft к лаунчеру

## Привязка сервера с помощью inline режима

Этот метод привязки сейчас является наиболее простым и рекомендуемым для всех пользователей

- Запустите сервер хотя бы один раз без привязки

- Получите токен checkServer выполнив в лаунчсервере команду

```
token server YourProfileTitle std false
```

Сохраните токен в безопасном месте

- Определите вашу версию authlib

| 1.7.10-1.16.3 | 1.16.4-1.17.X | 1.18.X | 1.19.0-1.19.4 | 1.20.0-1.20.1 | 1.20.2 | 1.20.3+ |
|---------------|---------------|--------|---------------|---------------|--------|---------|
| 1             | 2             | 3      | 3-1.19        | 4             | 5      | 6       |

- Скачайте ServerWrapper и ServerWrapperInline

```bash
wget https://github.com/GravitLauncher/Launcher/releases/latest/download/ServerWrapper.jar
wget https://github.com/GravitLauncher/Launcher/releases/latest/download/ServerWrapperInline.jar
```

- Установите authlib

```bash
java -jar ServerWrapper.jar installAuthlib https://mirror.gravitlauncher.com/5.7.x/authlib/LauncherAuthlibXXX.jar
```

Вместо XXX укажите версию authlib из таблицы выше

- Установите ServerWrapperInline

```bash
java -jar ServerWrapper.jar installAuthlib ServerWrapperInline.jar
```

- Модифицируйте ваш скрипт запуска, добавив перед запуском ядра следующие строчки (пример для Linux)

```bash
export SERVERWRAPPER_ADDRESS="ws://localhost:9274/api"
export SERVERWRAPPER_CHECK_SERVER_TOKEN="YOUR CHECKSERVER TOKEN"
export _JAVA_OPTIONS: "-Dlauncher.authlib.inlineClass=pro.gravit.launcher.server.ServerWrapperInlineInitializer -Dlauncher.useSlf4j=true"
```

Замените адрес лаунчсервера и токен на ваш

## Привязка Velocity

Так как Velocity не использует authlib, вам необходимо применить [патч](https://mirror.gravitlauncher.com/5.7.x/patches/Velocity.patch)

- Выполните следующие команды в терминале(пример приведен для Linux)

```bash
git clone git@github.com:VelocityPowered/Velocity.git ./velocity
wget https://mirror.gravitlauncher.com/5.7.x/patches/Velocity.patch
cd ./velocity
git am -3 ../Velocity.patch
./gradlew assemble
cd ..
mv ./velocity/proxy/build/libs/velocity-*-all.jar ./velocity.jar
```

- Файл `velocity.jar` теперь пропатчен для работы с ServerWrapper

- Теперь перейдите в директорию куда будете устанавливать Velocity и поместите туда собранный и пропатченный velocity.jar. Выполните:

```bash
wget https://github.com/GravitLauncher/Launcher/releases/latest/download/ServerWrapper.jar
java -jar ServerWrapper.jar setup
```

И следуйте инструкциям установщика