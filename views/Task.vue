<template>
  <div class="site__content">
    <h1 class="title">Tasks</h1>
    <section class="body">
      <Filters />
      <div class="tasks">
        <div class="tasks-item" v-for="(unit, index) in tasksFiltered" :key="index">
          <div class="suggestion">
            <div class="suggestion-info">
              <div class="suggestion-info__label label">{{unit.whatWatch}}</div>
              <div class="suggestion-info__time">Total Time: {{unit.totalTime}}</div>
            </div>
            <div class="suggestion__check">
              <input type="checkbox" name :id="`title-${index}`" v-model="unit.completed"  @click="completed(unit.id)"/>
              <label :for="`title-${index}`"></label>
              <div>{{unit.title}}</div>
            </div>

            <div class="suggestion__descr">{{unit.description}}</div>
            <div class="suggestion__tags">
              <div
                class="suggestion__tags-item"
                v-for="(tag, index) in unit.tags"
                :key="index"
              >{{tag}}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Filters from '@comps/Filters';
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Task",
  components: {
    Filters,
  },
  computed: {
    ...mapGetters(['tasks', 'tasksFiltered']),
  },
  methods: {
    ...mapMutations(['completed']),

  },

};
</script>

<style>
.body {
  margin-top: 25px;
}
.tasks {
  margin-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &-item {
    margin-top: 35px;
    max-width: 520px;
    width: 100%;
  }
}
.suggestion {
  padding: 12px 15px 16px 15px;
  border: 1px solid #e3e3e3;
  background: white;
  min-height: 120px;
  /* height: 100%; */
  /* max-width: calc(50% - 25px); */

  width: 100%;

  &:nth-child(odd) {
  }
  &-info {
    display: flex;
    align-items: center;
    &__label {
      font-size: 12px;
      padding: 3px 6px 4px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    &__time {
      margin-left: 6px;
      font-size: 14px;
    }
  }

  &__check {
    margin-top: 12px;
    display: flex;
    align-items: center;
    input {
      display: none;

      & + label {
        cursor: pointer;
        width: 20px;
        height: 20px;
        border: 1px solid black;
        background: white;
        border-radius: 1px;
        position: relative;
      }
      &:checked + label {
        & + div{
          text-decoration: line-through;
        }
        &::before {
          content: "✔";
          margin: 3px;
          display: block;
        }
      }
    }
    div {
      font-size: 20px;
      margin-left: 8px;
    }
  }

  &__descr {
    margin-top: 12px;
    font-size: 16px;
    max-width: 520px;
    height: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__tags {
    display: flex;
    margin-top: 11px;
    &-item {
      font-size: 12px;
      padding: 8px 9px;
      border: 1px solid #d2d2d2;
      border-radius: 12px;
      display: flex;
      align-items: center;
      margin-right: 9px;
      margin-bottom: 9px;
      text-transform: capitalize;
      background: black;
      color: white;
      cursor: pointer;
    }
  }
}
</style>