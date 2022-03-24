<template>
  <li class="list__item">
    <h2 
      class="list__title list__subtitle"
      @click="BlockChange()"
    >
      <span :class="['list-image', {'active': isActive}]"></span>
      {{ album.title }}
    </h2>

    <template v-if="isActive">
      <AlternativeContent v-if="images === null" type="error"/>
      <AlternativeContent v-else-if="images.length === 0" type="load"/>
      <div class="album__images">
        <ImageBlock
          v-for="image in images"
          :image="image"
          :key="image.id"
        />
      </div>
    </template>

  </li>
</template>

<script>
import Scripts from "@/script.js"
import ImageBlock from "@/components/ImageBlock.vue"
import AlternativeContent from './AlternativeContent.vue'

export default {
  name: 'CatalogPersonAlbum',
  components: {
    ImageBlock,
    AlternativeContent,
  },
  props: ['album'],
  data() {
    return {
      images: [],
      isActive: false,
    }
  },
  methods: {
    async BlockChange() {
      this.isActive = !this.isActive;
      if (this.isActive) {
        this.images = await Scripts.fetchItems('https://json.medrating.org/photos?albumId='+this.album.id);
        this.CheckFavoriteImages();
      }
    },
    CheckFavoriteImages() {
      if (this.images === null || !localStorage.favoriteImagesIds)
        return;

      const favoriteImagesIds = JSON.parse(localStorage.favoriteImagesIds);
      this.images.map(image => 
        image.favorite = favoriteImagesIds.includes(image.id));
    }
  },
}
</script>