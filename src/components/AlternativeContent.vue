<template>
  <div class="alternative">
    <template v-if="type === 'load'">
      <img class="alternative__image" src="@/assets/loader.gif" alt="Загрузка">
    </template>
    
    <template v-else-if="type === 'error'">
      <div class="alternative__image">
        <img src="@/assets/error.png" alt="Ошибка">
      </div>
      <div class="alternative__wrap">
        <h1 class="alternative__title">Сервер не отвечает</h1>
        <div class="alternative__text">Уже работаем над этим</div>
      </div>
    </template>  

    <template v-else-if="type === 'empty'">
      <div class="alternative__image">
        <img src="@/assets/empty.png" alt="Пусто">
      </div>
      <div class="alternative__wrap">
        <h1 class="alternative__title">Список избранного пуст</h1>
        <div class="alternative__text">Добавляйте изображения, нажимая на звездочки</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AlternativeContent',
  props: {
    type: String,
    default: 'load'
  }
}
</script>

<style lang="scss">
.alternative {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;

  min-height: 320px;
  flex-grow: 1;

  &__wrap {
    text-align: left;
    margin-left: 24px;
  }
  &__title {
    font-weight: 700;
    margin: 32px 0 8px 0;
  }
}
#app > .alternative {
  flex-direction: column;
}
#app > .alternative  .alternative__wrap {
  text-align: center;
  margin: 0;
}
</style>