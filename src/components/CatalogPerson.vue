<template>
  <li class="list__item">
    <h1 
      class="list__title"
      @click="BlockChange()"
    >
      <span :class="['list-image', {'active': isActive}]"></span>
      {{ person.name }}
    </h1>

    <template v-if="isActive">
      <AlternativeContent v-if="albums === null" type="error"/>
      <AlternativeContent v-else-if="albums.length === 0" type="load"/>
      <ul v-else>
        <CatalogPersonAlbum 
          v-for="album in albums" 
          :key="album.id"
          :album="album"
        />
      </ul>
    </template>
  </li>
</template>

<script>
import Scripts from "@/script.js"
import CatalogPersonAlbum from "@/components/CatalogPersonAlbum.vue"
import AlternativeContent from '@/components/AlternativeContent.vue'

export default {
  name: 'CatalogPerson',
  components: {
    CatalogPersonAlbum,
    AlternativeContent,
  },
  props: ['person'],
  data() {
    return {
      albums: [],
      isActive: false,
    }
  },
  methods: {
    async BlockChange() {
      this.isActive = !this.isActive;
      if (this.isActive)
        this.albums = await Scripts.fetchItems('https://json.medrating.org/albums?userId='+this.person.id);
    },
  },
}
</script>