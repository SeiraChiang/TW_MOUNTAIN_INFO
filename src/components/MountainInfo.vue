<template>
  <div>
    <div class="title">踏青小幫手 - 路線天氣查詢</div>
    <div style="width: 800px; margin: auto;">
      <!-- 選擇區域 -->
      <Select v-model="selectedArea" style="width: 20%" class="button" placeholder="地區">
        <Option v-for="area in areaList" :value="area.value" :key="area.value" class="option">{{
          area.label
        }}</Option>
      </Select>
      <!-- 選擇路線 -->
      <Select
        v-model="selectedMountain"
        style="width: 70%"
        filterable
        class="button"
        placeholder="請選擇路線"
        not-found-text="尚未選擇區域"
      >
        <Option
          v-for="mountain in filterMountains"
          :value="mountain.value"
          :key="mountain.value"
          class="option"
          >{{ mountain.label }}</Option
        >
      </Select>
    </div>
    <div v-if="title" class="title">{{ title }}踏青路線介紹</div>
    <IntroContent
      :selectedMountain="selectedMountain"
      :mountainDescriptions="mountainDescriptions"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Option, Select } from 'view-ui-plus'
import IntroContent from './IntroContent.vue'
import { useMountainStore } from '../stores/counter'

const mountainStore = useMountainStore()

const areaList = [
  { value: 'all', label: '全區' },
  { value: 'north', label: '北區' },
  { value: 'middle', label: '中區' },
  { value: 'south', label: '南區' }
]

const mountainList = [
  { value: '大屯山', label: '大屯山', area: 'north' },
  { value: '七星山', label: '七星山', area: 'north' },
  { value: '拉拉山', label: '拉拉山', area: 'north' },
  { value: '南湖大山', label: '南湖大山', area: 'middle' },
  { value: '合歡山', label: '合歡山', area: 'middle' },
  { value: '玉山', label: '玉山', area: 'south' },
  { value: '關山', label: '關山', area: 'south' }
]

const mountainDescriptions = [
  {
    value: '大屯山',
    description:
      '大屯山主峰標高1092公尺，位於台灣北部的陽明山國家公園內，為一錐狀火山，是觀賞夕陽和秋天賞芒花的極佳地點，為臺灣小百岳之一。大屯山山形渾圓雄厚，有王者氣勢，著名「大屯春色」、「大屯雲海」與「觀音圈」，皆為登臨大屯山途中可見之美景。',
    url: 'https://www.atunas.com.tw/upload/2021_06_07/2_20210607170026ljr9cui7D1.jpeg'
  },
  {
    value: '七星山',
    description:
      '七星山，高約1120公尺，位於陽明山國家公園內，係屬大屯火山群，為臺北市最高的山岳。七星山頂端原為火山噴口，後因長久侵蝕成七個小山頭而得名。其山頂視野遼闊，能將整個大臺北地區一覽無遺，沿途自然景觀豐富，隨四季呈現不同變化，為最佳的自然解說教室，適合親子共遊的好地方。',
    url: 'https://mochislife.com/wp-content/uploads/20200427152544_60.jpg'
  },
  {
    value: '拉拉山',
    description:
      '拉拉山，又名達觀山，高約2031公尺，位於桃園復興鄉和新北烏來區之間。「拉拉」一詞，源自泰雅族語，意即美麗之意。拉拉山林種豐富多元，棲息許多珍貴動物，擁有完整的森林生態體系，故林業署將其與塔曼山稜線南側地區規劃自然保護區，為桃園熱門的觀光休閒據點。',
    url: 'https://i0.wp.com/pukemago.com/wp-content/uploads/Compress_20230308_162059_9420-scaled.jpg?fit=2560%2C1440&ssl=1'
  },
  {
    value: '南湖大山',
    description:
      '南湖大山，高達3742公尺。位處臺中和平鄉、花蓮秀林鄉間、中央山脈北段，為臺灣第四高峰，並與雪山、秀姑巒山、玉山、北大武山合稱「五岳」。其山勢雄偉，基盤廣大，氣度恢宏，素有「帝王之山」、「王者之山」之稱，而主山的山體，更別號「帝王座」。沿途自然景觀豐富，加以山頂視野廣闊，周遭群山勝景盡收眼底，為許多山友們心目中不可不爬的好山。',
    url: 'https://www.sunriver.com.tw/blog/wp-content/uploads/C-a-034-32.jpg'
  },
  {
    value: '合歡山',
    description:
      '合歡山，又名合歡主峰，高達3416公尺，為臺灣百岳之一。位處花蓮縣與南投縣的交界，為大甲溪、濁水溪與立霧溪的分水嶺。因擁有高山景致與冷溫帶氣候、交通便利的條件，為熱門觀景、避暑、賞雪景點，加上是合歡、奇萊等群峰門戶，所以也是攀登合歡東峰、合歡尖山、石門山與中央山脈北三段的登山口。',
    url: 'https://th.bing.com/th/id/R.a90a5e423e8146d2c174483ac0eddb5c?rik=pckGSSfa6%2byCeA&pid=ImgRaw&r=0'
  },
  {
    value: '玉山',
    description:
      '玉山，又名新高山，主峰高達3952公尺，為臺灣第一高山，東北亞第一高峰。位於南投、嘉義、高雄的交界處，上有一顆一等三角點，與雪山、秀姑巒山、南湖大山、北大武山合稱「五岳」，為五岳之首、百岳之王。其山脈巍巍高聳、尖聳入天、氣勢磅礡懾人，東西南北側均呈不同風貌；尤其冬季積雪時，整座山區瑩白如玉，煞是迷人，為登山者最嚮往攀登的百岳。',
    url: 'https://www.ysnp.gov.tw/FileDownload/ContentManagement/20200917185611616637714.jpg'
  },
  {
    value: '關山',
    description:
      '關山，高3668公尺，有一編號1674的二等三角點基石。位於高雄市桃源區、臺東縣海端鄉間，為玉山國家公園南側範圍的界山，也為中央山脈大水窟以南最高的山峰。關山山頂呈南北走向，周圍支稜較低，加上山勢高立聳然直入天際，因而有「南台首岳」之稱，也名列臺灣百岳中的「十峻」之一。',
    url: 'https://i0.wp.com/www.sunriver.com.tw/blog/wp-content/uploads/D-g-096-20.jpg'
  }
]

const selectedArea = ref('all')
const selectedMountain = ref('')

const filterMountains = computed(() => {
  if (selectedArea.value === 'all' || !selectedArea.value) {
    return mountainList
  }
  return mountainList.filter((mountain) => mountain.area === selectedArea.value)
})

watch(selectedArea, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    selectedMountain.value = ''
  }
})

watch(selectedMountain, () => {
  mountainStore.selectMountain = selectedMountain.value;
  const weatherSection = document.querySelector('.weather');
  if (weatherSection) {
    weatherSection.style.display = 'none';
    }
})

// 標題更新
const title = computed(() => {
  const mountain = mountainList.find((item) => item.value === selectedMountain.value)
  return mountain ? mountain.label : ''
})
</script>

<style scoped>
@import url('https://unpkg.com/view-ui-plus/dist/styles/viewuiplus.css');

.title {
  width: 700px;
  text-align: left;
  margin: 15px auto;
  font-weight: 900;
  font-size: 18px;
  letter-spacing: 1px;
}

.button {
  height: 40px;
  margin: 5px;
  padding-left: 5px;
  text-align: left;
}

.option {
  text-align: left;
}
</style>
