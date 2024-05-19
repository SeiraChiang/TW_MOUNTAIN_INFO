<template>
  <div>
    <div class="title">踏青小幫手 - 路線天氣查詢</div>
    <div style="width: 800px">
      <!-- 選擇區域 -->
      <Select v-model="selectedArea" style="width:20%" class="button" placeholder="地區">
        <Option v-for="area in areaList" :value="area.value" :key="area.value" class="option">{{ area.label }}</Option>
      </Select>
      <!-- 選擇路線 -->
      <Select v-model="selectedMountain" style="width:70%" filterable class="button" placeholder="請選擇路線" not-found-text="尚未選擇區域">
        <Option v-for="mountain in filterMountains" :value="mountain.value" :key="mountain.value" class="option">{{ mountain.label }}</Option>
      </Select>
    </div>
    <div v-if="title" class="title">{{ title }}踏青路線介紹</div>
    <IntroContent :selectedMountain="selectedMountain" :mountainDescriptions="mountainDescriptions" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Option, Select } from 'view-ui-plus';
import IntroContent from './IntroContent.vue';

const areaList = [
  { value: 'all', label: '全區' },
  { value: 'north', label: '北區' },
  { value: 'middle', label: '中區' },
  { value: 'south', label: '南區' }
];

const mountainList = [
  { value: '大屯山', label: '大屯山', area: 'north' },
  { value: '太平山', label: '太平山', area: 'north' },
  { value: '拉拉山', label: '拉拉山', area: 'north' },
  { value: '八仙山', label: '八仙山', area: 'middle' },
  { value: '杉林溪', label: '杉林溪', area: 'middle' },
  { value: '玉山', label: '玉山', area: 'south' },
  { value: '阿里山', label: '阿里山', area: 'south' }
];

const mountainDescriptions = [
  { value: '大屯山', description: '大屯山主峰標高1092公尺，位於台灣北部的陽明山國家公園內，為一錐狀火山，是觀賞夕陽和秋天賞芒花的極佳地點，為臺灣小百岳之一。大屯山山形渾圓雄厚，有王者氣勢，著名「大屯春色」、「大屯雲海」與「觀音圈」，皆為登臨大屯山途中可見之美景。', url: 'https://www.atunas.com.tw/upload/2021_06_07/2_20210607170026ljr9cui7D1.jpeg' },
  { value: '太平山', description: '太平山國家森林遊樂區位於宜蘭縣大同鄉，素有『人間仙境』的美稱，面積廣達12,631公頃、標高1950公尺，隸屬於羅東林區管理處管理，全區包括有南湖大山山系、三星山山系、大霸尖山支脈，園區內以保留的原始林木包括紅檜、扁柏、鐵杉等聞名，曾與阿里山、八仙山並列為台灣三大林場。', url: 'https://tps.forest.gov.tw/TPSWeb/wSite/public/Data/f1479952174137.jpg' },
  { value: '拉拉山', description: '拉拉山，又名達觀山，高約2031公尺，位於桃園復興鄉和新北烏來區之間。「拉拉」一詞，源自泰雅族語，意即美麗之意。拉拉山林種豐富多元，棲息許多珍貴動物，擁有完整的森林生態體系，故林業署將其與塔曼山稜線南側地區規劃自然保護區，為桃園熱門的觀光休閒據點。', url: 'https://i0.wp.com/pukemago.com/wp-content/uploads/Compress_20230308_162059_9420-scaled.jpg?fit=2560%2C1440&ssl=1' },
  { value: '八仙山', description: '八仙山森林遊樂區位於台中市和平區，主峰海拔2366公尺，約為八千台尺，因而得名「八仙」，區內森林蒼翠，氣候清爽宜人，十文溪與佳保溪匯流其間，溪水源自深山森林，水質清澈，溪中大小岩石遍佈，處處潺流。自然生態資源豐富且昔日為台灣三大林場之一，擁有濃郁的林業人文風情。', url: 'https://recreation.forest.gov.tw/Files/Forest/RA/photo/album/0300002/03_%E5%85%AB%E4%BB%99%E5%B1%B1.JPG' },
  { value: '杉林溪', description: '杉林溪距溪頭17公里，佔地40公頃的杉林溪森林生態渡假園區位於溪頭往阿里山健行熱線之中途站，海拔1,600公尺，一年四季花期不斷；春櫻吐蕊、夏石楠花開、秋蘭飄香、冬楓相映。自溪頭孟宗山莊後的溪杉觀光道路進入，著名景點依序為石井磯、青龍瀑布、聚英村、花卉中心、松瀧岩與天地眼。', url: 'https://travel.nantou.gov.tw/wp-content/uploads/google_map_photos/44916/1.jpg?1634689071' },
  { value: '玉山', description: '玉山，又名新高山，主峰高達3952公尺，為臺灣第一高山，東北亞第一高峰。位於南投、嘉義、高雄的交界處，上有一顆一等三角點，與雪山、秀姑巒山、南湖大山、北大武山合稱「五岳」，為五岳之首、百岳之王。其山脈巍巍高聳、尖聳入天、氣勢磅礡懾人，東西南北側均呈不同風貌；尤其冬季積雪時，整座山區瑩白如玉，煞是迷人，為登山者最嚮往攀登的百岳。', url: 'https://www.ysnp.gov.tw/FileDownload/ContentManagement/20200917185611616637714.jpg' },
  { value: '阿里山', description: '阿里山森林遊樂區海拔高度2,216公尺，四周高山環列，氣候涼爽，以日出、雲海、晚霞、森林、登山森林鐵路並列為阿里山五奇，聞名國際。 而鄒族原住民人文資源更增其觀光魅力。 阿里山地區橫跨臺灣森林垂直分佈之熱、暖、溫三帶，蘊藏豐富的森林資源，尤以檜木名聞國際，漫步林間隨處可見。', url: 'https://s.yimg.com/os/creatr-uploaded-images/2019-10/212975e0-eabb-11e9-b7fb-1b4329bd9a7f' }
];

const selectedArea = ref('all');
const selectedMountain = ref('');

const filterMountains = computed(() => {
  if (selectedArea.value === 'all' || !selectedArea.value) {
    return mountainList;
  }
  return mountainList.filter(mountain => mountain.area === selectedArea.value);
});

watch(selectedArea, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    selectedMountain.value = '';
  }
});

// 標題更新
const title = computed(() => {
  const mountain = mountainList.find(item => item.value === selectedMountain.value);
  return mountain ? mountain.label : '';
});
</script>

<style scoped>
@import url('https://unpkg.com/view-ui-plus/dist/styles/viewuiplus.css');

.title {
  width: 700px;
  text-align: left;
  margin: 10px auto;
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
