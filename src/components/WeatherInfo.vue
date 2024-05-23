<template>
  <Button type="primary" style="width: 20%" @click="fetchWeather">獲取天氣預報</Button>
  <!-- <div class="weather" style="display: none;" ref="weatherSection"> -->
    <div class="weather" ref="weatherSection">
    <h1 class="title">{{ weather?.locationName }} 天氣資訊</h1>
    <Table :columns="column" :data="weatherDetailList" no-data-text="暫無數據"></Table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Button,Table } from 'view-ui-plus';
import weatherApi from '../api/weatherApi'
import type { weatherDetail, weatherInfo, weatherInfoList } from '../type/WeatherType.ts'
import { useMountainStore } from '../stores/counter.ts'

const column = [
  { title: '日期', 
  key: 'date', 
  align: 'center' },
  {
    title: '最高溫',
    key: 'MaxT', 
    align: 'center'
  },
  {
    title: '最低溫',
    key: 'MinT', 
    align: 'center'
  },
  {
    title: '降雨機率',
    key: 'PoP12h', 
    align: 'center'
  },
  {
    title: '相對溼度',
    key: 'RH', 
    align: 'center'
  },
  {
    title: '天氣狀況',
    key: 'Wx', 
    align: 'center'
  }
]
const mountainStore = useMountainStore()
const weatherDetailList = ref<weatherDetail[]>([])
const weather = ref<weatherInfo>()
const res = ref<weatherInfoList>()

const fetchWeather = async () => {
  if (mountainStore.selectMountain !== '') {
    if (weatherSection.value) {
        weatherSection.value.style.display = 'block';
      }
    weather.value = res.value!.cwaopendata.dataset.locations.location.find(
      (item) => item.locationName === mountainStore.selectMountain
    )

    if (weather.value) {
      // 篩選日期&初始化 weatherDetailList
      weatherDetailList.value = weather.value.weatherElement[0]?.time.filter(item => item.startTime.split('T')[0] === item.endTime.split('T')[0])
      .map(() => ({
        date: '',
        startTime: '',
        endTime: '',
        MaxT: '',
        MinT: '',
        PoP12h: '',
        RH: '',
        Wx: '',
      }))?? [];

      weather.value.weatherElement
      .forEach((element) => {
        const filterColumns = element.time.filter(item => item.startTime.split('T')[0] === item.endTime.split('T')[0])
        switch (element.elementName) {
          case 'MaxT':
            filterColumns.forEach((Item, index) => {
              weatherDetailList.value[index].date = Item.startTime.split('T')[0]
              weatherDetailList.value[index].MaxT = Array.isArray(Item.elementValue) ? Item.elementValue[0].value : Item.elementValue.value
            });
            break;
          case 'MinT':
            filterColumns.forEach((Item, index) => {
              weatherDetailList.value[index].MinT = Array.isArray(Item.elementValue) ? Item.elementValue[0].value : Item.elementValue.value
            });
            break;
          case 'PoP12h':
            filterColumns.forEach((Item, index) => {
              weatherDetailList.value[index].PoP12h = Array.isArray(Item.elementValue) ? Item.elementValue[0].value : Item.elementValue.value
              if (weatherDetailList.value[index].PoP12h === null) {
                weatherDetailList.value[index].PoP12h = "--";
                }
            });
            break;
          case 'RH':
            filterColumns.forEach((Item, index) => {
              weatherDetailList.value[index].RH = Array.isArray(Item.elementValue) ? Item.elementValue[0].value : Item.elementValue.value
            });
            break;
          case 'Wx':
            filterColumns.forEach((Item, index) => {
              weatherDetailList.value[index].Wx = Array.isArray(Item.elementValue) ? Item.elementValue[0].value : Item.elementValue.value
            });
            break;
          default:
            break;
        }
    })
  }
  // nextTick(() => {
  //   const targetDiv = document.querySelector('#app > main > div:nth-child(3) > h1');
  //     targetDiv?.scrollIntoView({ behavior: 'smooth' });
  //   });
}else{
  window.alert("請選擇路線")
}
}
const weatherSection = ref<HTMLDivElement | null>(null);
onMounted(async () => {
  if (weatherSection.value) {
        weatherSection.value.style.display = 'none';
      }
  res.value = await weatherApi.doGetWeather()
  console.log(res.value)
})
</script>

<style scoped>
.title {
  width: 700px;
  text-align: left;
  margin: 5px auto;
  font-weight: 900;
  font-size: 18px;
  letter-spacing: 1px;
  margin-top: 30px;
}

.weather {
  width: 700px;
  margin: auto;
}

</style>
: (arg0: string, arg1: any) => any: { row: { elementValue: { value: any; }; }; }