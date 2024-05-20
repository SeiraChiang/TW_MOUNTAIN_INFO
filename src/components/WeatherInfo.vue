<template>
  <!-- <h1>{{weather}}</h1> -->
  <DatePicker type="date" placeholder="Select date" style="width: 70%; margin-right: 10px; height: 40px;"/>
  <Button type="primary" :size="buttonSize" style="width: 20%" @click="fetchWeather">獲取天氣預報</Button>
  <div v-if="weatherViewCondition===1">
    <div v-for="(value) in weatherResponse" :key="value.mountain">
      <!-- <div v-for="(value,key,index) in weatherResponse" :key="value.mountain"> -->
      <div v-if="value.mountain === selectedMountain">
        <div class="title">{{ value.area }}：{{ value.mountain }}</div>
        <div class="title">日期: {{ value.date }}</div>
        <div class="content">
          <!-- index: {{ index }}，
          key: {{ key }}， -->
          
          <font-awesome-icon icon="fa-solid fa-cloud-sun-rain" size="5x"/>
          <span>降雨機率: {{ value.chanceOfRainfall }}%</span>
          <font-awesome-icon icon="fa-solid fa-temperature-high" size="5x"/>
          <span>溫度: {{ value.temperature.min }}°C 至 {{ value.temperature.max }}°C</span>
          </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePicker, Button } from 'view-ui-plus';


const buttonSize = ref('large');

const selectedMountain = ref('八仙山');
// const weather = ref('天氣資訊');
const weatherViewCondition = ref(0);
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
.title {
  width: 700px;
  text-align: left;
  margin: 15px auto;
  font-weight: 900;
  font-size: 18px;
  letter-spacing: 1px;
}

.content{
  margin-top: 30px;
}

.content > span {
  /* text-align: center; */
  margin: 10px 20px;
  font-weight: 400;
  font-size: 18px;
  letter-spacing: 3px;
}

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