<template>
  <Button type="primary" style="width: 20%" @click="fetchWeather">獲取天氣預報</Button>
  <div>
    <h1 class="title">{{ weather?.locationName }} 天氣資訊</h1>
    <Table :columns="column" :data="weatherDetailList" ></Table>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { Button,Table } from 'view-ui-plus';
import weatherApi from '../api/weatherApi'
import type { weatherDetail, weatherInfo, weatherInfoList } from '../type/WeatherType.ts'
import { useMountainStore } from '../stores/counter.ts'

const column = [
  { title: '日期', key: 'time' },
  { title: '時間', key: 'date' },
  {
    title: '天氣預報綜合描述',
    key: 'value'
  }
]
const mountainStore = useMountainStore()
const weatherDetailList = ref<weatherDetail[]>()
const weather = ref<weatherInfo>()
const res = ref<weatherInfoList>()

const fetchWeather = async () => {
  if (mountainStore.selectMountain !== '') {
    weather.value = res.value!.cwaopendata.dataset.locations.location.find(
      (item) => item.locationName === mountainStore.selectMountain
    )
    weatherDetailList.value = weather.value?.weatherElement
      .find((item) => item.elementName === 'WeatherDescription')
      ?.time.map((Item) => ({
        time: Item.startTime.split('T')[0],
        date: Item.startTime.split('T')[1].split('+')[0],
        value: Item.elementValue?.value
      }))
  }
  
  nextTick(() => {
    const targetDiv = document.querySelector('#app > main > div:nth-child(3) > h1');
      targetDiv?.scrollIntoView({ behavior: 'smooth' });
    });
}

onMounted(async () => {
  res.value = await weatherApi.doGetWeather()
  console.log(res.value)
})
</script>

<style scoped>
.title {
  width: 700px;
  text-align: left;
  margin: 15px auto;
  font-weight: 900;
  font-size: 18px;
  letter-spacing: 1px;
  margin-top: 30px;
}

#app > main > div:nth-child(3) > div{
  width: 700px;
  margin: auto;
}

#app > main > div:nth-child(3) > div > span{
  letter-spacing: 1px;
  line-height: 1.2;
}
</style>
: (arg0: string, arg1: any) => any: { row: { elementValue: { value: any; }; }; }