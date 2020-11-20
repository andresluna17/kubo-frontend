<template>
  <div>
    <div class="p-grid p-fluid">
      <div class="p-col-12 p-md-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-tag"></i>
          </span>
          <InputText v-model="titulo" placeholder="Titulo de pelicula" />
        </div>
        <br />
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-image"></i>
          </span>
          <InputText v-model="imagen" placeholder="url imagen" />
        </div>
        <br />
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-image"></i>
          </span>
          <InputText v-model="trailer" placeholder="url trailer de youtube" />
        </div>
        <br />
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-image"></i>
          </span>
          <MultiSelect
            v-model="categorias"
            :options="categoriasSelect"
            optionLabel="name"
            placeholder="Select Countries"
            class="multiselect-custom"
            style="width: 200px"
          >
            <template #value="slotProps">
              <div
                class="country-item country-item-value"
                style="display: inline"
                v-for="option of slotProps.value"
                :key="option.code"
              >
                {{ option.nombre }},
              </div>
              <template v-if="!slotProps.value || slotProps.value.length === 0">
                Seleccione las categorias de esta pelicula
              </template>
            </template>
            <template #option="slotProps">
              <div class="country-item" style="display: inline">
                <div>{{ slotProps.option.nombre }}</div>
              </div>
            </template>
          </MultiSelect>
        </div>
        <br />
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-align-justify"></i>
          </span>
          <Textarea v-model="descripcion" rows="5" cols="30" />
        </div>
        <br />
        <div>
          <label for="vertical" style="display: block">Duracion</label>
          <InputNumber
            v-model="hora"
            mode="decimal"
            showButtons
            buttonLayout="vertical"
            style="width: 4rem"
            decrementButtonClass="p-button-secondary"
            incrementButtonClass="p-button-secondary"
            incrementButtonIcon="pi pi-plus"
            :min="0"
            decrementButtonIcon="pi pi-minus"
          />
          <InputNumber
            v-model="minutos"
            mode="decimal"
            showButtons
            :min="0"
            :max="59"
            buttonLayout="vertical"
            style="width: 4rem; margin: 10px"
            decrementButtonClass="p-button-secondary"
            incrementButtonClass="p-button-secondary"
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"
          />
        </div>
        <label for="estreno" style="float: left">Fecha de Estreno</label>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-calendar"></i>
          </span>
          <Calendar
            v-model="estreno"
            id="estreno"
            :locale="es"
            dateFormat="dd/mm/yy"
          />
        </div>
        <div>
          <Button
            style="width: 200px"
            label="Crear Pelicula"
            v-on:click="submit"
            class="p-button-success"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { url } from "../constantes";
export default {
  data() {
    return {
      categoriasSelect: [],
      categorias: [],
      titulo: "",
      descripcion: "",
      imagen: "",
      trailer: "",
      hora: 0,
      minutos: 0,
      estreno: null,
      es: {
        firstDayOfWeek: 1,
        dayNames: [
          "Domingo",
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
        ],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
        dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
        monthNames: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
        monthNamesShort: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic",
        ],
        today: "Hoy",
        clear: "Borrar",
        weekHeader: "Sm",
      },
    };
  },
  created() {
    let token = localStorage.getItem("token");
    axios({
      url: url + "/categoria",
      method: "get",
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (res.data.ok) {
          console.log(res.data.categorias);
          this.categoriasSelect = res.data.categorias;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    submit() {
      if (
        this.titulo == "" ||
        this.descripcion == "" ||
        this.imagen == "" ||
        this.trailer == "" ||
        this.hora == 0 ||
        this.minutos == 0 ||
        this.estreno == null
      ) {
        this.$toast.add({
          severity: "error",
          summary: "Error ",
          detail: "Debes rellenar todos los campos",
          life: 3000,
        });
      } else {
        let token = localStorage.getItem("token");
        let duracion = this.hora * 10 + this.minutos;
        let categorias = this.categorias.map((c) => c.id);
        let data = {
          imagen: this.imagen,
          titulo: this.titulo,
          trailer: this.trailer,
          descripcion: this.descripcion,
          duracion,
          estreno: this.estreno,
          categorias,
        };
        axios({
          url: url + "/pelicula",
          method: "post",
          headers: {
            authorization: token,
          },
          data,
        })
          .then((res) => {
            if (res.data.ok) {
              this.$toast.add({
                severity: "success",
                summary: "Ok",
                detail: "Pelicula creada Exitosamente !!",
                life: 3000,
              });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
};
</script>