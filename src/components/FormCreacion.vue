<template>
  <div>
    <div class="p-grid p-fluid">
      <div class="p-col-12 p-md-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-tag"></i>
          </span>
          <InputText placeholder="Titulo de pelicula" />
        </div>
        <br />
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-image"></i>
          </span>
          <InputText placeholder="url imagen" />
        </div>
        <br />
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-align-justify"></i>
          </span>
          <Textarea rows="5" cols="30" />
        </div>
        <br />
        <div>
          <label for="vertical" style="display: block">Duracion</label>
          <InputNumber
            id="vertical"
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
            id="vertical"
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
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hora: 0,
      minutos: 0,
    };
  },
};
</script>