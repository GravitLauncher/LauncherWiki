<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> GravitLauncher Wiki </q-toolbar-title>

        <q-tabs v-model="tab" v-if="false" shrink>
          <q-route-tab name="tab1" label="Начало работы"></q-route-tab>
          <q-route-tab name="tab2" label="Tab 2"></q-route-tab>
          <q-route-tab name="tab3" label="Tab 3"></q-route-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8"> Меню сайта </q-item-label>
        <q-expansion-item expand-separator default-opened icon="home" label="Разделы">
          <q-list>
            <q-expansion-item
              expand-separator
              label="Установка лаунчсервера"
              :header-inset-level="0.5"
              :content-inset-level="1"
            >
              <q-list>
                <q-item to="/install#hostselect">Выбор хостинга</q-item>
                <q-item to="/install#hostconfigure">Настройка хостинга</q-item>
                <q-item to="/install#launchserver">Установка LaunchServer</q-item>
                <q-item to="/install#nginx">Настройка Nginx</q-item>
                <q-item to="/install#safety">Настройка безопасного подключения</q-item>
              </q-list>
            </q-expansion-item>
            <q-expansion-item
              expand-separator
              label="Настройка авторизации"
              :header-inset-level="0.5"
              :content-inset-level="1"
            >
              <q-list>
                <q-item to="/auth#authcoreprovider">Обзор AuthCoreProvider</q-item>
                <q-item to="/auth#passwordverifier">Настройка PasswordVerifier</q-item>
                <q-item to="/auth#mysql">Способ mysql</q-item>
              </q-list>
            </q-expansion-item>
            <q-expansion-item
              expand-separator
              label="Настройка клиента"
              :header-inset-level="0.5"
              :content-inset-level="1"
            >
              <q-list>
                <q-item to="/clientbuild#compatibility">Совместимость</q-item>
                <q-item to="/clientbuild#authlib1">Сборка Authlib 1</q-item>
                <q-item to="/clientbuild#authlib2">Сборка Authlib 2</q-item>
                <q-item to="/clientbuild#profile">Настройка профиля</q-item>
                <q-item to="/clientbuild#optionals">Опциональные моды</q-item>
              </q-list>
            </q-expansion-item>
          </q-list>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      tab: ref(""),
      version: ref(5020000),
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
