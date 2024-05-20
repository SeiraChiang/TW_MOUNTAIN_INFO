import axios from 'axios'
import type { weatherInfoList } from "../type/WeatherType.ts"
export default {
  doGetWeather: async function (): Promise<weatherInfoList> {
    const result = await axios.get('https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-B0053-033?Authorization=CWA-24BF512F-9D55-443F-A0F8-E36086AC8747&downloadType=WEB&format=JSON')
    return result.data;
  }
}
