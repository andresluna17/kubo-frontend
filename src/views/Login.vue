<template>
  <div class="home">
    <div class="login-box">
      <img src="../assets/logo.png" class="avatar" alt="Avatar Image" />
      <h1>Login</h1>
      <form>
        <!-- USERNAME INPUT -->
        <label for="username">Email</label>
        <input type="text" placeholder="Ingrese su Email" v-model="username" />
        <!-- PASSWORD INPUT -->
        <label for="password">Contraseña</label>
        <input
          type="password"
          placeholder="Ingrese su Contraseña"
          v-model="password"
        />
        <button v-on:click="submit" class="login-Button">Login in</button><br />
        <router-link to="/resgister">Resgistro</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { url } from "../constantes";
export default {
  name: "Login",
  data() {
    return { username: "", password: "" };
  },
  components: {},
  methods: {
    submit(e) {
      e.preventDefault();
      console.log(this.username, this.password);
      let data = {
        email: this.username,
        password: this.password,
      };
      axios({
        method: "POST",
        url: url + "/auth/login",
        data: data,
      })
        .then((res) => {
          if (res.data.ok) {
            localStorage.setItem("token", res.data.token);
            this.$router.push("Home");
          }
        })
        .catch(() => {
          this.$toast.add({
            severity: "error",
            summary: "Error En el Logeo",
            detail: "Credenciales Incorrectas",
            life: 3000,
          });
        });
    },
  },
};
</script>

<style>
.home {
  background: url(../assets/bg.jpeg) no-repeat center top;
  background-size: cover;
  font-family: sans-serif;
  height: 100vh;
}

.login-box {
  width: 320px;
  height: 420px;
  background: #000;
  color: #fff;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  padding: 70px 30px;
}

.login-box .avatar {
  width: 100px;
  height: 100px;
  position: absolute;
  top: -50px;
  left: calc(50% - 50px);
}

.login-box h1 {
  margin: 0;
  padding: 0 0 20px;
  text-align: center;
  font-size: 22px;
}

.login-box label {
  margin: 0;
  padding: 0;
  font-weight: bold;
  display: block;
}

.login-box input {
  width: 100%;
  margin-bottom: 20px;
}

.login-box input[type="text"],
.login-box input[type="password"] {
  border: none;
  border-bottom: 1px solid #fff;
  background: transparent;
  outline: none;
  height: 40px;
  color: #fff;
  font-size: 16px;
}

.login-box .login-Button {
  padding-right: 50px;
  padding-left: 50px;
  border: none;
  outline: none;
  height: 40px;
  background: #b80f22;
  color: #fff;
  font-size: 18px;
  border-radius: 20px;
  text-align: center;
}

.login-box .login-Button:hover {
  cursor: pointer;
  background: #ffc107;
  color: #000;
}

.login-box a {
  text-decoration: none;
  font-size: 12px;
  line-height: 20px;
  color: darkgrey;
}

.login-box a:hover {
  color: #fff;
}
</style>
