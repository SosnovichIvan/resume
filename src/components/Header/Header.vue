<template>
    <div class="header">
      <div class="header__descrition">Июль</div>
        <Menu />
      <div class="header__descrition">2022</div>
    </div>
</template>

<script>
import Menu from '../Menu/Menu.vue';

export default {
  name: 'header-comp',
  components: {
    Menu,
  },
};
</script>

<style>
    .header {
      padding: 0 36px 0 36px;
      background: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 48px;
    }
    .header__descrition {
      font-family: 'IBMPlexMono-Medium';
      border: 2px solid #272421;
      border-radius: 40px;
      padding: 8px 12px;
      color: var(--primary_text_color)
    }
</style>
