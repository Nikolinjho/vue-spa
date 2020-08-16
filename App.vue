<template>
  <div id="app" :class="{blur: loading}">
    <div class="overlay" v-if="loading">
      <svg
        width="45"
        height="45"
        viewBox="0 0 45 45"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#fff"
      >
        <g fill="none" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2">
          <circle cx="22" cy="22" r="6" stroke-opacity="0">
            <animate
              attributeName="r"
              begin="1.5s"
              dur="3s"
              values="6;22"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              begin="1.5s"
              dur="3s"
              values="1;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-width"
              begin="1.5s"
              dur="3s"
              values="2;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="22" cy="22" r="6" stroke-opacity="0">
            <animate
              attributeName="r"
              begin="3s"
              dur="3s"
              values="6;22"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              begin="3s"
              dur="3s"
              values="1;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-width"
              begin="3s"
              dur="3s"
              values="2;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="22" cy="22" r="8">
            <animate
              attributeName="r"
              begin="0s"
              dur="1.5s"
              values="6;1;2;3;4;5;6"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </div>
    <div class="container">
      <div class="navbar">
        <div class="header">
          <div class="header__logo">
            <router-link class="logo" to="/" tag="a">SPApp</router-link>
          </div>
          <div class="header__btn">
            <div class="header__btn-icon" v-if="checkUser" @click="logOutUser">
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                style="enable-background:new 0 0 512 512;"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <path
                      d="M255.15,468.625H63.787c-11.737,0-21.262-9.526-21.262-21.262V64.638c0-11.737,9.526-21.262,21.262-21.262H255.15c11.758,0,21.262-9.504,21.262-21.262S266.908,0.85,255.15,0.85H63.787C28.619,0.85,0,29.47,0,64.638v382.724c0,35.168,28.619,63.787,63.787,63.787H255.15c11.758,0,21.262-9.504,21.262-21.262C276.412,478.129,266.908,468.625,255.15,468.625z"
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="M505.664,240.861L376.388,113.286c-8.335-8.25-21.815-8.143-30.065,0.213s-8.165,21.815,0.213,30.065l92.385,91.173H191.362c-11.758,0-21.262,9.504-21.262,21.262c0,11.758,9.504,21.263,21.262,21.263h247.559l-92.385,91.173c-8.377,8.25-8.441,21.709-0.213,30.065c4.167,4.21,9.653,6.336,15.139,6.336c5.401,0,10.801-2.041,14.926-6.124l129.276-127.575c4.04-3.997,6.336-9.441,6.336-15.139C512,250.302,509.725,244.88,505.664,240.861z"
                    />
                  </g>
                </g>
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
              </svg>
            </div>
            <div
              class="hamburger hamburger--slider"
              @click="toggleClass"
              :class="{'is-active' : isActive }"
            >
              <div class="hamburger-box">
                <div class="hamburger-inner"></div>
              </div>
            </div>
          </div>
          <div class="header__menu" :class="{out: isActive}">
            <div class="header__menu-wrapper">
              <div v-for="(link, index) in linkMenu" :key="index">
                <router-link class="link" :to="link.url" tag="a">{{link.title}}</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <transition mode="out-in" name="slide" appear> -->
      <router-view></router-view>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters,  } from "vuex";

export default {
  name: "App",
  data() {
    return {
      isActive: false
      // linkMenu: [
      //   {
      //     title: "Home",
      //     url: "/"
      //   },
      //   {
      //     title: "Tasks",
      //     url: "/tasks"
      //   },
      //   {
      //     title: "Login",
      //     url: "/login"
      //   },
      //   {
      //     title: "Registration",
      //     url: "/auth"
      //   }
      // ]
    };
  },
  methods: {
    toggleClass() {
      return (this.isActive = !this.isActive);
    },
    ...mapActions(["logOut"]),
    ...mapMutations(['setLoading']),
    logOutUser() {
      this.setLoading(true)
      setTimeout(() => {
        this.logOut();
        this.$router.push("/login");
        this.setLoading(false)
      }, Math.floor(Math.random() * 1000));
    }
  },
  computed: {
    ...mapGetters(["loading", "checkUser"]),
    linkMenu() {
      if (this.checkUser) {
        return [
          { title: "Home", url: "/" },
          { title: "Tasks", url: "/tasks" }
        ];
      } else {
        return [
          { title: "Login", url: "/login" },
          { title: "Registration", url: "/auth" }
        ];
      }
    }
  }
};
</script>

<style >
@import "./style/bem-blocks/variables.css";
@import "./style/bem-blocks/mixins.css";

* {
  box-sizing: border-box;
}
#app {
  font-family: $font;
  -webkit-font-smoothing: antialiased;
  color: black;
  background: white;
  height: 100%;
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    svg {
      width: 150px;
      height: 150px;
      stroke: blue;
    }
  }
}

.slide {
  &-leave-active {
    animation: left 0.3s ease-in-out;
    overflow: hidden;
  }
  &-enter-active {
    animation: right 0.3s ease-in-out;
    overflow: hidden;
  }
}

@mixin animeSlide left, 0px, -50%, 1, 0;
@mixin animeSlide right, 50%, 0px, 0, 1;

.blur {
  z-index: 2;
  filter: blur(1px);
}
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 1100px;
  margin: 0 auto;
}

.navbar {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 25px 0 35px 0;
    /* margin-bottom: 35px; */
    position: relative;
    background: white;

    &::after {
      content: "";
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 1px;
      background: #e3e3e3;
    }
    &__logo {
      .logo {
        font-size: 24px;
        color: black;
        cursor: pointer;
      }
    }
    &__btn {
      display: flex;
      align-items: center;
      &-icon {
        margin-right: 15px;
        cursor: pointer;
        svg {
          width: 25px;
        }
      }
    }

    &__menu {
      position: absolute;
      top: calc(100%);
      width: 100%;
      overflow: hidden;
      max-height: 0;
      transition: max-height 0.55s;

      &-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        transform: translateY(calc(-100% - 25px));
        padding: 25px 0 25px 0;
        background: white;
        /* border-bottom: 1px solid #e3e3e3;  */
        transition: transform 0.55s;

        & > div {
          /* margin-top: 12px; */
          font-size: 18px;
          cursor: pointer;
          width: 100%;
          text-align: center;
          padding: 5px 0 5px 0;

          &:hover {
            text-decoration: underline;
          }
          & > .link {
            width: 100%;
            display: block;
            color: rgb(0, 0, 0);
            user-select: none;
          }
        }
      }

      &.out {
        max-height: 100vh;
        .header__menu-wrapper {
          transform: translateY(0);
        }
      }
    }
  }
}

.hamburger {
  padding: 0;
  display: inline-block;
  cursor: pointer;
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  font: inherit;
  color: inherit;
  text-transform: none;
  background-color: transparent;
  border: 0;
  margin: 0;
  overflow: visible;
}
.hamburger:hover {
  opacity: 0.7;
}
.hamburger.is-active:hover {
  opacity: 0.7;
}
.hamburger.is-active .hamburger-inner,
.hamburger.is-active .hamburger-inner::before,
.hamburger.is-active .hamburger-inner::after {
  background-color: #000;
}

.hamburger-box {
  width: 40px;
  height: 24px;
  display: inline-block;
  position: relative;
}

.hamburger-inner {
  display: block;
  top: 50%;
  margin-top: -2px;
}
.hamburger-inner,
.hamburger-inner::before,
.hamburger-inner::after {
  width: 40px;
  height: 4px;
  background-color: #000;
  border-radius: 4px;
  position: absolute;
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease;
}
.hamburger-inner::before,
.hamburger-inner::after {
  content: "";
  display: block;
}
.hamburger-inner::before {
  top: -10px;
}
.hamburger-inner::after {
  bottom: -10px;
}
.hamburger--slider .hamburger-inner {
  top: 2px;
}
.hamburger--slider .hamburger-inner::before {
  top: 10px;
  transition-property: transform, opacity;
  transition-timing-function: ease;
  transition-duration: 0.15s;
}
.hamburger--slider .hamburger-inner::after {
  top: 20px;
}

.hamburger--slider.is-active .hamburger-inner {
  transform: translate3d(0, 10px, 0) rotate(45deg);
}
.hamburger--slider.is-active .hamburger-inner::before {
  transform: rotate(-45deg) translate3d(-5.71429px, -6px, 0);
  opacity: 0;
}
.hamburger--slider.is-active .hamburger-inner::after {
  transform: translate3d(0, -20px, 0) rotate(-90deg);
}
</style>
