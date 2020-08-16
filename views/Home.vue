<template>
  <div class="site__content">
    <h1 class="title">Home</h1>
    <section class="field">
      <div class="field__input">
        <input type="text" placeholder="What we want..." @keyup.enter="newTask" v-model="taskTitle" />
      </div>
      <div class="field__text">
        <textarea v-model="taskDescription" placeholder="I want to tell.."></textarea>
      </div>
      <div class="field__type">
        <div class="field__type-movie">
          <input type="radio" name="type" id="radioMovie" value="Movie" v-model="whatWatch" />
          <label for="radioMovie" class="label">Movie</label>
        </div>
        <div class="field__type-series">
          <input type="radio" name="type" id="radioseries" value="Series" v-model="whatWatch" />
          <label for="radioseries" class="label">serie</label>
        </div>
      </div>
      <div class="total-time" v-if="whatWatch === 'Movie'">
        <div class="total-time__block">
          <div>Hours</div>
          <input type="number" placeholder="1" v-model="movieHours" />
        </div>
        <div class="total-time__block colon">:</div>
        <div class="total-time__block">
          <div>Minutes</div>
          <input type="number" placeholder="35" v-model="movieMins" />
        </div>
      </div>
      <div class="total-time" v-else-if="whatWatch === 'Series'">
        <div class="total-time__block">
          <div>Seasons</div>
          <input type="number" placeholder="1" name="seasonSeries" v-model="seasonSeries" />
        </div>
        <div class="total-time__block">
          <div>Series in total</div>
          <input type="number" placeholder="15" name="seasonSeries" v-model="seasonSeries" />
        </div>
        <div class="total-time__block">
          <div>Average Time of a serie</div>
          <input type="number" placeholder="35" v-model="seasonSeriesMins" />
        </div>
      </div>
      <div class="tag-input">
        <input type="text" placeholder="Genre" v-model="tagInput" @keyup.enter="addTag" />
        <button @click="addTag">Tag</button>
      </div>
      <div>
        <transition-group name="tags" tag="div" class="tags">
          <div
            class="tags__item label"
            v-for="tag in tags"
            :key="tag.id"
            :class="{active: tag.usage}"
            @click="useTag(tag)"
          >
            {{tag.title}}
            <div class="cross" @click="removeTag(tag)">&#10005;</div>
          </div>
        </transition-group>
      </div>
      <div class="send-btn">
        <button @click="createTask">Go!</button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      taskTitle: "",
      id: 4,
      taskDescription: "",
      whatWatch: "",
      // total time

      // movie
      movieHours: "",
      movieMins: "",

      // serie
      seasons: "",
      seasonSeries: "",
      seasonSeriesMins: "",
      time: "",

      // tags
      tagId: 3,
      tagInput: "",

      tagsUsage: []
    };
  },
  methods: {
    ...mapActions(["newTask"]),
    ...mapActions(["newTag"]),
    createTask() {
      if (
        this.taskTitle.trim().length === 0 ||
        this.whatWatch.trim().length === 0
      ) {
        alert("pole pustoe");
        return;
      }
      if (
        this.whatWatch === "Movie" &&
        this.movieHours.trim().length !== 0 &&
        this.movieMins.trim().length !== 0
      ) {
        this.time = this.movieTime;
      } else {
        if (
          this.whatWatch === "Series" &&
          this.seasons.trim().length !== 0 &&
          this.seasonSeries.trim().length !== 0 &&
          this.seasonSeriesMins.trim().length !== 0
        ) {
          this.time = this.seriesTime;
        }
      }

      const task = {
        id: this.id,
        title: this.taskTitle,
        description: this.taskDescription,
        whatWatch: this.whatWatch,
        totalTime: this.time,
        tags: this.tagsUsage,
        completed: false,
        editing: false
      };

      console.log(task);

      this.newTask(task);
      // this.$store.dispatch('newTask', task);

      this.id++;
      this.taskTitle = "";
      this.taskDescription = "";
      this.whatWatch = "";
      this.movieHours = "";
      this.movieMins = "";
      this.seasons = "";
      this.seasonSeries = "";
      this.seasonSeriesMins = "";
      this.tags.forEach((el, index) => {
        el.usage = false;
      });
      this.tagsUsage = [];
    },
    useTag(tag) {
      tag.usage = !tag.usage;

      if (tag.usage) {
        this.tagsUsage.push({ title: tag.title });
      } else {
        this.tagsUsage.splice(this.tags.indexOf(tag.title), 1);
      }
    },
    addTag(tagName) {
      if (this.tagInput.trim().length === 0) {
        alert("tag pusto");
        return;
      }
      const tag = {
        id: this.tagId++,
        title: this.tagInput,
        usage: true
      };
      this.newTag(tag);
    },
    removeTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    }
  },
  computed: {
    ...mapGetters(["tags"]),
    movieTime() {
      return `${this.movieHours}.${this.movieMins} hrs`;
    },
    seriesTime() {
      return `${this.seasons} seasons ${this.seasonSeries} series ${this.seasonSeriesMins} min/serie`;
    }
  }
};
</script>

<style scoped>
@import "../style/bem-blocks/variables.css";

.tags-enter-active,
.tags-leave-active {
  transition: all 1s;
}

.tags-enter,
.tags-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}

.field {
  margin-top: 25px;

  &__input {
    display: flex;
    /* align-items: center; */
    input {
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
      font-size: 16px;
      border: 1px solid #c2c2c2;
      width: 100%;
      padding: 5px 0 6px 8px;
      outline: none;
    }
  }
  &__text {
    margin-top: 25px;
    textarea {
      padding: 7px;
      resize: none;
      width: 100%;
      max-width: 540px;
      height: 130px;
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
      font-size: 16px;
      outline: none;
      border: 1px solid #c2c2c2;
    }
  }
  &__type {
    display: flex;
    margin-top: 25px;
    div {
      margin-right: 12px;
    }
    input {
      display: none;
      & + label {
        padding: 3px 6px 4px;
        font-size: 12px;
        cursor: pointer;
        user-select: none;
        background: white;
        color: black;
        border: 1px solid black;
        text-transform: uppercase;
        letter-spacing: 2px;
      }

      &:checked + label {
        color: white;
        background: black;
        text-transform: uppercase;
        letter-spacing: 2px;
      }
    }
  }
}
.total-time {
  margin-top: 25px;
  display: flex;

  .colon {
    align-self: flex-end;
    margin-bottom: 8px;
  }

  &__block {
    &:not(:last-child) {
      margin-right: 10px;
    }
    & > div {
      font-size: 16px;
    }
    input {
      margin-top: 8px;
      font-family: $font;
      font-size: 14px;
      padding: 4px 6px 5px;
      max-width: 60px;
      outline: none;
      border: 1px solid #d2d2d2;
    }
  }
}
.tag-input {
  margin-top: 25px;
  display: flex;

  input {
    font-family: $font;
    font-size: 14px;
    outline: none;
    border: 1px solid #d2d2d2;
    padding: 5px 5px 6px 5px;
  }
  button {
    font-family: $font;
    font-size: 14px;
    font-weight: bold;
    margin-left: 15px;
    border: 1px solid black;
    outline: none;
    background: white;
    min-width: 40px;
    letter-spacing: 1px;
    cursor: pointer;
    padding: 5px 12px 6px;
    &:hover {
      background: black;
      color: white;
    }
  }
}
.tags {
  margin-top: 25px;
  display: flex;
  flex-wrap: wrap;
  max-width: 540px;

  &__item {
    font-size: 16px;
    padding: 8px 9px;
    border: 1px solid #d2d2d2;
    border-radius: 12px;
    display: flex;
    align-items: center;
    margin-right: 9px;
    margin-bottom: 9px;
    text-transform: capitalize;
    background: white;
    color: #a2a2a2;
    cursor: pointer;
    .cross {
      margin-left: 7px;
      cursor: pointer;
      font-size: 11px;
    }
  }
  .active {
    background: black;
    color: white;
  }
}
.send-btn {
  margin-top: 50px;
  button {
    cursor: pointer;
    font-family: $font;
    font-size: 16px;
    font-weight: bold;
    color: black;
    background: white;
    border: 1px solid black;
    padding: 5px 12px 6px;
    width: 90px;
    letter-spacing: 1px;
    outline: none;

    &:hover {
      background: black;
      color: white;
    }
  }
}
</style>