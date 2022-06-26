<template>
    <div class="main">
      <HeaderComp />
    </div>
</template>

<script>
import HeaderComp from './components/Header/Header.vue';

export default {
  name: 'App',
  components: {
    HeaderComp,
  },
};
</script>

<style>
    .main {
      margin-top: 32px;
      width: 100vw;
      min-height: 100%;
    }
    .main::before {
      content: ' ';
      background-color: var(--main_background);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
    }

    @font-face {
    font-family: 'IBMPlexMono-Medium';
    src: url('./assets/fonts/IBMPlexMono-Medium.ttf');
    }

    @font-face {
    font-family: 'IBMPlexMono-Regular';
    src: url('./assets/fonts/IBMPlexMono-Regular.ttf');
    }

</style>
