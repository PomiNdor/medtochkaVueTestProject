<template>
  <AlternativeContent v-if="persons === null" type="error"/>
  <AlternativeContent v-else-if="persons.length === 0" type="load"/>
  <ul v-else class="catalog">
    <CatalogPerson 
      v-for="person in persons" 
      :key="person.id"
      :person="person"
    />
  </ul>
</template>

<script>

import Scripts from "@/script.js"
import CatalogPerson from '@/components/CatalogPerson.vue'
import AlternativeContent from '@/components/AlternativeContent.vue'

export default {
  name: 'CatalogView',
  components: {
    CatalogPerson,
    AlternativeContent
  },
  data() {
    return {
      persons: [],
    }
  },
  async mounted () {
    this.persons = await Scripts.fetchItems('https://json.medrating.org/users/');
  }
}
</script>

<style lang="scss">
.catalog { margin-top: 16px; }
.list {
  &__item {
    list-style-type: none;
  }
  &__title {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 24px 0;
  }
  &__subtitle {
    padding-left: 54px;
  }
}
.album__images {
  display: flex;
  flex-wrap: wrap;
  gap: 42px;
  padding: 32px 105px;
}

.list-image {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #117DC1;
  margin-right: 24px;

  position: relative;
  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 14px;
    height: 2px;
    background-color: #fff;
    transform-origin: center;
    transform: translate(-50%, -50%);
  }
  &::after {
    transform: translate(-50%, -50%) rotateZ(90deg);
  }
  &.active::after {
    display: none;
  }
}

</style>