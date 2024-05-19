<template>
  <main>
    <MountainInfo />
    <WeatherInfo />
  </main>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import MountainInfo from '../components/MountainInfo.vue'
import WeatherInfo from '../components/WeatherInfo.vue'

defineComponent({
  components: {
    MountainInfo,
    WeatherInfo
  }
});

</script>
