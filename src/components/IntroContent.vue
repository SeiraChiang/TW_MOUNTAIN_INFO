<template>
    <div class="container" :class="{ 'show-border': selectedMountain !== '' }">
      <!-- 文字 -->
      <div class="content" v-if="descriptions">
        {{ descriptions }}
      </div>
      <!-- 圖片 -->
      <div v-if="imageUrl" style="width:50%">
        <img class="pic" :src="imageUrl" alt="山景圖">
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, defineProps } from 'vue';
  
  const props = defineProps<{
    selectedMountain: string;
    mountainDescriptions: Array<{ value: string; description: string; url: string }>;
  }>();
  
  const descriptions = computed(() => {
    const mountain = props.mountainDescriptions.find(item => item.value === props.selectedMountain);
    return mountain ? mountain.description : '';
  });
  
  const imageUrl = computed(() => {
    const mountain = props.mountainDescriptions.find(item => item.value === props.selectedMountain);
    return mountain ? mountain.url : '';
  });
  </script>
  
  <style scoped>
  .container {
    width: 700px;
    display: flex;
    text-align: left;
    padding: 10px;
    margin: 5px auto;
    color: #515a6e;
    /* border-bottom: 2px solid transparent; */
  }
  
  .content {
    width: 50%;
    float: left;
    letter-spacing: 2px;
    line-height: 1.8;
    margin-right: 3px;
  }
  
  .pic {
    max-width: 90%;
    float: right;
    object-fit: cover;
  }
  
  .show-border {
    border-bottom-color: #515a6e; 
  }
  </style>
  