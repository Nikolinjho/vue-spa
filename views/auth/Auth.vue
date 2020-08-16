<template>
  <div class="site__content">
    <div class="center">
      <form class="form" :class="{invalid: $v.$invalid}" @submit.prevent="onSubmit()">
        <div class="sign-up">
          <div class="sign-up__title">Регистрация</div>
          <div class="sign-up__login" :class="{error: $v.email.$error}">
            <label for>Введите логин</label>
            <input type="text" clas placeholder="qwerty@as.ru" v-model.trim="$v.email.$model" />
            <div class="msg">Неверно введен логин</div>
          </div>
          <div class="sign-up__password" :class="{error: $v.password.$error}">
            <label for>Введите пароль</label>
            <input type="text" placeholder="123456" v-model.trim="$v.password.$model" />
            <div class="msg">Минимальная длина пароля {{$v.password.$params.minLength.min}} символов</div>
          </div>
          <div class="sign-up__password" :class="{error: $v.repeatPassword.$error}">
            <label for>Повторите пароль</label>
            <input type="text" placeholder="123456" v-model.trim="$v.repeatPassword.$model" />
            <div class="msg">Пароли не совпадают</div>
          </div>
          <div class="invalid__message">{{submitStatus}}</div>
          <div class="sign-up__btn">
            <button type="submit">Sign up</button>
          </div>
          <div class="sign-up__sign-in">
            Have an account?
            <router-link to="/login" tag="a">Log in</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "auth",
  data() {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      submitStatus: ''
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
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    ...mapActions(["registerUser"]),
    ...mapMutations(['setLoading']),
    onSubmit() {
      console.log(this.$v)
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const user = {
        email: this.email,
        password: this.password
      };
      this.registerUser(user)
        .then(() => {
          this.setLoading(true);
          this.$router.push('/');
          this.setLoading(false);
        })
        .catch(error => {
          this.submitStatus = error.message;
        });
    }
  },
  computed: {
    ...mapGetters(["loading"])
  }
};
</script>

<style >
@import "../../style/bem-blocks/variables.css";


.form {
  max-width: 360px;
  width: 100%;
}
.sign-up {
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
  &__sign-in {
    margin-top: 60px;
    a {
      color: blue;
      text-decoration: underline;
    }
  }
}
</style>