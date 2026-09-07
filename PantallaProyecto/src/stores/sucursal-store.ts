import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSucursalStore = defineStore('sucursal', () => {
    //el store nos sirve para compartir datos entre componentes, en este caso la cantidad de cajas que tiene la sucursal
    const cantidadCajas = ref(5);

    return {
        cantidadCajas
    }
});