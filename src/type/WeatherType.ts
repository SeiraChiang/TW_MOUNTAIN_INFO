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
  weatherElement: {
    elementName: string
    time: {
      startTime: string
      elementValue: {
        value: string
        measures: string
      }
    }[]
  }[]
}

export type weatherDetail = {
  date: string
  time: string
  value: string
}
