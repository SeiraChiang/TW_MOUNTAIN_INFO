export type weatherInfoList = {
  cwaopendata: {
    dataset: {
      locations: {
        location: weatherInfo[]
      }
    }
  }
}
export type weatherInfo = {
  locationName: string
  weatherElement: WeatherElement[]
}
type WeatherElement = {
  elementName: string;
  time: TimeItem[];
}
type TimeItem = {
  startTime: string;
  endTime: string;
  elementValue: ElementValue;
}
export type ElementValue = {
    value: string
    measures: string
  } | {
    value: string
    measures: string
  }[]

export type weatherDetail = {
  date: string
  startTime: string
  endTime: string
  MaxT: string
  MinT: string
  PoP12h: string
  RH: string
  Wx: string
}