<template>
  <div class="site__content">
    <!-- <h1 class="title">Login</h1> -->
    <div class="auth center">
      <div class="auth-banner">
        <picture class="image">
          <source srcset="../../images/banner.png" />
          <img src="../../images/banner.png" alt="Doggy" />
        </picture>
      </div>
      <div class="auth-form">
        <form @submit.prevent="onSubmit()" :class="{invalid: ($v.$invalid )}">
          <div class="auth-form__title">Вход</div>
          <div class="auth-form__login" :class="{error: ($v.email.$error )}">
            <label for>Login:</label>
            <input type="text" placeholder="aff@faw.geg" v-model.trim="$v.email.$model" />
            <div class="msg">Неверно набран логин</div>
          </div>
          <div class="auth-form__password" :class="{error: $v.password.$error}">
            <label for>Password:</label>
            <input type="text" placeholder="123321" v-model.trim="$v.password.$model" />
            <div class="msg">Минимальная длина пароля {{$v.password.$params.minLength.min}} символов</div>
          </div>
          <div class="invalid__message">{{submitStatus}}</div>
          <div class="auth-form__btn">
            <button type="submit">Sign in</button>
          </div>
          <div class="auth-form__signup">
            Don't have an account?
            <router-link to="/auth" tag="a">Sign up</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      submitStatus: ""
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    ...mapActions(["loginUser"]),
    ...mapMutations(['setLoading']),
    onSubmit() {
      console.log(1);
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const user = {
        email: this.email,
        password: this.password
      };
      this.loginUser(user)
        .then(() => {
          this.setLoading(true);
          this.$router.push("/");
          this.setLoading(false);
        })
        .catch(error => {
          this.submitStatus = error.message;
        });
    },

    cl() {
      console.log(this.$v.password);
    }
  }
};
</script>

<style scoped>
@import "../../style/bem-blocks/variables.css";

section {
  height: 100%;
}
/* .msg {
  display: none;
} */

.auth {
  &-banner {
    margin-right: 40px;
    .image {
      display: block;
      width: 250px;
      height: 250px;
      source,
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  &-form {
    padding-bottom: 40px;
    max-width: 320px;
    width: 100%;

    &__title {
      font-size: 36px;
      font-weight: bold;
    }
    &__login {
      margin-top: 60px;
      label {
        font-size: 14px;
        color: #333;
        display: block;
      }
      input {
        margin-top: 6px;
        width: 100%;
        padding: 4px 0 5px 0;
        display: block;
        outline: none;
        font-family: $font;
        font-size: 16px;
        border: none;
        border-bottom: 1px solid #e3e3e3;
        &::placeholder {
          color: #d2d2d2;
        }
      }
      .msg {
        display: none;
        margin-top: 8px;
        color: crimson;
      }
    }
    &__password {
      margin-top: 25px;
      label {
        color: #333;
        font-size: 14px;
        display: block;
      }
      input {
        margin-top: 6px;
        width: 100%;
        padding: 4px 0 5px 0;
        display: block;
        outline: none;
        font-family: $font;
        font-size: 16px;
        border: none;
        border-bottom: 1px solid #e3e3e3;

        &::placeholder {
          color: #d2d2d2;
        }
      }
      .msg {
        display: none;
        margin-top: 8px;
        color: crimson;
      }
    }

    &__btn {
      margin-top: 40px;

      button {
        font-family: $font;
        font-size: 16px;
        background: white;
        border: 1px solid black;
        padding: 5px 12px 6px;
        cursor: pointer;
        outline: none;
        &:hover {
          background: black;
          color: white;
        }
      }
    }

    &__signup {
      margin-top: 60px;
      a {
        color: blue;
        text-decoration: underline;
      }
    }
  }
}
</style>