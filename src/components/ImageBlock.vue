<template>
  <div class="image-block">
    <div class="image-block__wrap">
      <img 
        class="image-block__img"
        :src="image.thumbnailUrl"
        alt="Картинка"
        @mouseover="title.show = true"
        @mouseleave="title.show = false"
        @mousemove="Mousemove($event)"
        @click="ModalChange()"
      >

      <div 
        :class="['image-block__star', {'favorite': isFavorite}]"
        @click="FavoriteChange()">
      </div>

      <div
        :class="['image-block__title', {'show': title.show}]"
        :style="{ top: title.top + 'px', left: title.left + 'px' }"
      >
        {{image.title}}
      </div>
    </div>
    <div 
      :class="['image-block__modal', 'full-size-image', {'active': modalActive}]"
      @click.self="ModalChange()"
    >
      <img class="full-size-image__img" :src="image.url">
      <div 
        class="full-size-image__close"
        @click="ModalChange()"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageBlock',
  props: {
    image: Object,
  },
  data() {
    return {
      title: {
        show: false,
        top: 0,
        left: 0,
      },
      modalActive: false,
      isFavorite: this.image.favorite,
    }
  },
  watch: {
    isFavorite() {
      this.image.favorite = this.isFavorite;
    }
  },
  methods: {
    Mousemove(event) {
      this.title.top = event.offsetY;
      this.title.left = event.offsetX;
    },

    ModalChange() {
      this.modalActive = !this.modalActive;
      if (this.modalActive)
        document.body.style.overflow='hidden';
      else document.body.style.overflow='initial';
    },

    FavoriteChange() {
      this.isFavorite = !this.isFavorite;
      if (this.isFavorite)
        this.SaveFavoriteImage();
      else 
        this.DeleteFavoriteImage();
      this.$emit('removeFavoriteImage', this.image.id);
    },

    SaveFavoriteImage() {
      let favoriteImagesIds = [];
      if (localStorage.favoriteImagesIds)
        favoriteImagesIds = JSON.parse(localStorage.favoriteImagesIds);

      favoriteImagesIds.push(this.image.id);
      localStorage.favoriteImagesIds = JSON.stringify(favoriteImagesIds);
    },

    DeleteFavoriteImage() {
      if (!localStorage.favoriteImagesIds) 
        return;

      let favoriteImagesIds = JSON.parse(localStorage.favoriteImagesIds);
      const index = favoriteImagesIds.indexOf(this.image.id);
      favoriteImagesIds.splice(index, 1);
      localStorage.favoriteImagesIds = JSON.stringify(favoriteImagesIds);
    },
  }
}
</script>

<style lang='scss'>
.image-block {
  &__wrap {
    position: relative;
    width: min-content;
  }
  &__img {
    min-width: 150px;
    min-height: 150px;
    cursor: pointer;
    display: block;
    border-radius: 4px;
  }
  &__star {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 32px;
    height: 32px;

    background: url('@/assets/star_empty.png');
    border-radius: 50%;
    cursor: pointer;
    &.favorite {
      background: url('@/assets/star_active.png');
    }
  }
  &__title {
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-50%, 20px);

    min-width: 150px;
    z-index: 10;

    background: rgba(0, 0, 0, 0.69);
    border-radius: 4px;
    padding: 4px 8px;

    font-size: 12px;
    line-height: 130%;
    color: #fff;

    display: none;
    &.show { display: block; }
  }
  .favorites &__title {
    display: block;
    position: static;
    transform: translate(0,0);

    padding: 0;
    margin-top: 12px;

    font-size: 14px;
    line-height: 150%;
    background-color: transparent;
    color: #787878;
  }
}
.full-size-image {
  display: none;
  justify-content: center;
  align-items: center;

  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.47);
  &.active { display: flex; }
  
  &__close {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 40px;
    width: 24px;
    height: 24px;

    &::before, &::after {
      content:'';
      display: block;
      position: absolute;
      top: 0;
      width: 34px;
      height: 2px;
      background-color: #fff;
    }
    &::before {
      left: 0;
      transform-origin: left top;
      transform: rotateZ(45deg) translateY(-50%);
    }
    &::after {
      right: 0;
      transform-origin: right top;
      transform: rotateZ(-45deg) translateY(-50%);
    }
  }
}
</style>