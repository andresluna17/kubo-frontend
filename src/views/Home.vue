<template>
  <div>
    <Navigation />
    <PeliculaDataview v-bind:peliculas="peliculas" />
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
import PeliculaDataview from "../components/PeliculaDataview";
import axios from "axios";
import { url } from "../constantes";
export default {
  components: { Navigation, PeliculaDataview },
  data() {
    return {
      peliculas: [],
    };
  },
  created() {
    let token = localStorage.getItem("token");

    axios({
      url: url + "/pelicula",
      method: "get",
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (res.data.ok) {
          console.log(res.data.peliculas);
          this.peliculas = res.data.peliculas;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>