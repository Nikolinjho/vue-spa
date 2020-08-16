<template>
  <div>
    <div class="filters">
      <div
        class="filters__item"
        :class="{active : filter === 'all'}"
        @click="changeFilter('all')"
      >All</div>
      <div
        class="filters__item"
        :class="{active: filter === 'active'}"
        @click="changeFilter('active')"
      >Active</div>
      <div
        class="filters__item"
        :class="{active: filter === 'completed'}"
        @click="changeFilter('completed')"
      >Completed</div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations } from "vuex";
export default {
  name: "Filters",
  computed: {
    ...mapState(['filter'])
  },
  methods: {
    ...mapMutations(['changeFilter'])
  }
};
</script>

<style scoped>
.filters {
  display: flex;
  .active{
    color: white;
    background: black;
  }
  &__item {
    user-select: none;
    font-size: 12px;
    padding: 8px 9px;
    border: 1px solid #d2d2d2;
    display: flex;
    align-items: center;
    margin-right: 9px;
    text-transform: capitalize;
    background: white;
    color: black;
    letter-spacing: 1px;
    cursor: pointer;
  }
}
</style>