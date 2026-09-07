<template>
    <q-page class="bg-grey-2 q-pa-md flex justify-center flex-center q-pt-xl">
        <div style="width: 100%; max-width: 500px;">

            <!-- Una sola tarjeta madre envuelve todo el contenido -->
            <q-card class="shadow-3">
                <q-card-section class="text-h6 text-center text-weight-bold">
                    Datos del local
                </q-card-section>

                <!-- Sección 1: los campos de texto -->
                <q-card-section class="q-gutter-y-sm">
                    <q-input v-model="direccion" label="Dirección del local"></q-input>
                    <q-input v-model="telefono" label="Teléfono"></q-input>
                </q-card-section>

                <q-separator />

                <!-- Sección 2: el mapa placeholder -->
                <q-card-section>
                    <div class="bg-grey-4 flex flex-center text-grey-7 text-center" style="height: 180px; border-radius: 8px;">
                        <div>
                            <q-icon name="place" size="2rem"></q-icon>
                            <div>Toca para ubicar en el mapa</div>
                        </div>
                    </div>
                </q-card-section>

                <!-- Sección 3: el botón de guardar -->
                <q-card-actions class="q-pa-md">
                    <q-btn label="Guardar cambios" color="primary" unelevated class="full-width" @click="guardarDatos"></q-btn>
                </q-card-actions>

            </q-card>
        </div>
    </q-page>
</template>
<script setup>
import { ref } from 'vue'

const direccion = ref('')
const telefono = ref('')

const guardarDatos = () => {
    console.log('Datos guardados:', { direccion: direccion.value, telefono: telefono.value })
}

</script>