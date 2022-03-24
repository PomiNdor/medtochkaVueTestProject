<template>
  <AlternativeContent v-if="isLoading" type="load"/>
  <AlternativeContent v-else-if="favoriteImages === null" type="error"/>
  <AlternativeContent v-else-if="favoriteImages.length === 0" type="empty"/>
  <div v-else class="favorites">
    <ImageBlock
      v-for="image in favoriteImages"
      :image="image"
      :key="image.id"
      @removeFavoriteImage="RemoveFavoriteImage"
    />
  </div>
</template>

<script>
import Scripts from "@/script.js"
import ImageBlock from "@/components/ImageBlock.vue";
import AlternativeContent from '@/components/AlternativeContent.vue';

export default {
  name: 'FavoritesView',
  components: {
    ImageBlock,
    AlternativeContent,
  },
  data() {
    return {
      favoriteImages: [],
    }
  },
  computed: {
    isLoading() {
      return localStorage.favoriteImagesIds
              && localStorage.favoriteImagesIds.length > 2
              && this.favoriteImages 
              && this.favoriteImages.length === 0;
    }
  },
  methods: {
    RemoveFavoriteImage(id) {
      this.favoriteImages = this.favoriteImages.filter(item => item.id != id);
    },
    async LoadFavoriteImages() {
      if (!localStorage.favoriteImagesIds) 
        return;

      let favoriteImagesIds = JSON.parse(localStorage.favoriteImagesIds);
      this.favoriteImages = [];

      favoriteImagesIds.forEach(async favoriteImageId => {
        const albumId = (((favoriteImageId - 1) / 50) | 0) + 1;
        let images = await Scripts.fetchItems('https://json.medrating.org/photos?albumId='+albumId);

        if (images === null) {
          this.favoriteImages = null;
          return;
        }
        
        images.forEach(image => {
          if (image.id == favoriteImageId) {
            image.favorite = true;
            
            if (this.favoriteImages.findIndex(item => item.id == image.id) == -1)
              this.favoriteImages.push(image);
          }
        });
        
      });
    },
  },
  mounted() {
    this.LoadFavoriteImages();
  }
}
</script>

<style lang="scss">
.favorites {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;

  padding: 56px 105px;
  gap: 42px;
}
</style>