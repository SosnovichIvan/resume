<template>
    <div class="menu">
        <button class="menu__btn">Обо мне</button>
        <button class="menu__btn">Проекты</button>
        <button class="menu__btn">Сертификаты</button>
        <button class="menu__btn">Контакты</button>
    </div>
</template>

<script>

export default {
  name: 'menu-comp',
};
</script>

<style>
    .menu {
      background: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .menu__btn {
      margin-right: 32px;
      color: var(--primary_text_color);
      font-family: 'IBMPlexMono-Regular', sans-serif;
      background: none;
      border: none;
    }
    .menu__btn:last-of-type {
      margin-right: 0;
    }
    .menu__btn:hover {
       background: none;
      -webkit-box-shadow: 5px 5px 5px -5px rgba(50, 51, 66, 0.6) inset;
      -moz-box-shadow: 5px 5px 5px -5px rgba(50, 51, 66, 0.6) inset;
      box-shadow: 5px 5px 5px -5px rgba(50, 51, 66, 0.6) inset;
    }
</style>
