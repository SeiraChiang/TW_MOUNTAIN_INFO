<template>
  <h1>{{weather}}</h1>
  <button @click="fetchWeather" class="large-button">獲取天氣預報</button>
  <div v-if="weatherViewCondition===1">
    <div v-for="(value,key,index) in weatherResponse" :key="value.mountain">
      <div v-if="value.mountain === selectedMountain">
        <h2>{{ value.area }}：{{ value.mountain }}</h2>
        <h3>
          index: {{ index }}，
          key: {{ key }}，
          日期: {{ value.date }}， 
          降雨機率: {{ value.chanceOfRainfall }}%， 
          溫度: {{ value.temperature.min }}°C 至 {{ value.temperature.max }}°C
        </h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const selectedMountain = ref('八仙山')
const weather = ref(123)
const weatherViewCondition = ref(0)
const weatherResponse = ref({
  key1:{
    date:'20240520',
    temperature:{min:30,max:32},
    chanceOfRainfall:20,
    area:'北區',
    mountain:'大屯山'
  },
  key2:{
    date:'20240520',
    temperature:{min:32,max:35},
    chanceOfRainfall:10,
    area:'中區',
    mountain:'八仙山'
  }
})

const fetchWeather = () => {
  weatherViewCondition.value=1
  if (selectedMountain.value==='八仙山') selectedMountain.value= '大屯山'
  else selectedMountain.value='八仙山'
}

</script>


<style scoped>
.large-button {
  font-size: 20px;  /* 字體大小 */
  padding: 15px 30px;  /* 內邊距 */
  border-radius: 10px;  /* 圓角 */
  background-color: #007BFF;  /* 背景顏色 */
  color: white;  /* 字體顏色 */
  border: none;  /* 邊框 */
  cursor: pointer;  /* 鼠標指針 */
}

.large-button:hover {
  background-color: #0056b3;  /* 懸停時背景顏色 */
}
</style>