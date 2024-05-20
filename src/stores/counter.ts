import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMountainStore = defineStore('Mountain', () => {
  const selectMountain = ref("")

  return { selectMountain }
})
