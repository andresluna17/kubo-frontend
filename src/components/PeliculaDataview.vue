<template>
  <div>
    <DataView
      :value="peliculas"
      :layout="layout"
      :paginator="true"
      :rows="9"
      :sortOrder="sortOrder"
      :sortField="sortField"
    >
      <template #grid="pelicula">
        {{
          pelicula.data.calificaciones[0]
            ? null
            : (pelicula.data.calificaciones = [
                { vista: false, calificacion: 0 },
              ])
        }}
        <div class="p-col-12 p-md-4">
          <div class="product-grid-item card">
            <div class="product-grid-item-top">
              <template v-for="categoria in pelicula.data.categorias">
                <div :key="categoria.id">
                  <i class="pi pi-tag product-category-icon"></i>
                  <span class="product-category">{{ categoria.nombre }}</span>
                </div>
              </template>
            </div>

            <div class="product-grid-item-content">
              <img
                :src="pelicula.data.imagen"
                width="100"
                :alt="pelicula.data.titulo"
              />
              <div class="">Fecha de estreno: {{ pelicula.data.estreno }}</div>
              <ScrollPanel style="width: 100%; height: 360px">
                <div class="">{{ pelicula.data.titulo }}</div>
                <div class="">
                  {{ pelicula.data.descripcion }}
                </div>
                <youtube-media
                  :video-id="getidYoutube(pelicula.data.trailer)"
                ></youtube-media>
              </ScrollPanel>
            </div>

            <div class="product-grid-item-bottom">
              <i class="pi pi-eye product-category-icon"></i>
              <InputSwitch
                :change="onchange(pelicula.data)"
                v-model="pelicula.data.calificaciones[0].vista"
              />
              <Rating
                :change="onchange(pelicula.data)"
                v-model="pelicula.data.calificaciones[0].calificacion"
                :cancel="false"
              />
              <span class="product-price"></span>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script>
import axios from "axios";
import { url } from "../constantes";
import { getIdFromURL } from "vue-youtube-embed";
export default {
  props: ["peliculas"],
  methods: {
    getidYoutube(url) {
      return getIdFromURL(url);
    },
    onchange(value) {
      let token = localStorage.getItem("token");

      let data = {
        vista: value.calificaciones[0].vista,
        calificacion: value.calificaciones[0].calificacion,
        idPelicula: value.id,
      };
      axios({
        url: url + "/calificacion",
        method: "post",
        data: data,
        headers: {
          authorization: token,
        },
      })
        .then((res) => {
          if (res.data.ok) {
            console.log(res.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  data() {
    return {
      layout: "grid",
      sortKey: null,
      sortOrder: null,
      sortField: null,
    };
  },
};
</script>