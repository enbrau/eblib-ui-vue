<script setup>
import { useCacheStore } from '../stores/cache'
import { defineComputed, defineProps, expose } from 'vue'

const cacheItem = defineComputed({
  get: () => {
    return useCacheStore().cacheItem
  },
  set: (value) => {
    useCacheStore().cacheItem = value
  }
})

</script>
