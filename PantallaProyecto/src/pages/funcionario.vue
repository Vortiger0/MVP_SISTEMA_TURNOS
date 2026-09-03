<route lang="yaml">
meta:
  layout: false
</route>

<template>
  <q-page class="bg-grey-2 flex flex-center q-pa-md relative-position">
    

    <div style="width: 100%; max-width: 500px;">
      <q-card class="shadow-3 q-pa-md">
        
        <q-card-section class="row items-center justify-between q-pb-none">
          <div class="text-subtitle1 text-weight-bold text-grey-9">
            Panel de Atención
          </div>
          <q-btn flat round dense color="grey-7" icon="logout" to="/login">
            <q-tooltip>Cerrar sesión</q-tooltip>
          </q-btn>
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-select
            v-model="cajaSeleccionada"
            :options="opcionesCajas"
            option-label="label"
            option-value="id"
            label="Seleccionar Caja de Atención"
            outlined
            dense
            emit-value
            map-options
            bg-color="white"
          >
            <template #prepend>
              <q-icon name="point_of_sale" color="primary" />
            </template>
          </q-select>
        </q-card-section>

        <q-separator class="q-mx-md q-my-xs" />

        <q-card-section class="text-center q-py-lg">
          <div class="text-caption text-grey-7">Atendiendo en:</div>
          <div class="text-h6 text-primary text-weight-bold q-mb-md">
            {{ cajaActual.label }}
          </div>

          <div class="row q-col-gutter-sm justify-center q-mb-md">
            <div class="col-6">
              <q-card flat bordered class="bg-grey-1 q-pa-sm">
                <div class="text-caption text-grey-7">Último en Fila</div>
                <div class="text-h6 text-weight-bold text-grey-9">
                  #{{ cajaActual.ultimoSolicitado }}
                </div>
              </q-card>
            </div>
            <div class="col-6">
              <q-card flat bordered class="bg-grey-1 q-pa-sm">
                <div class="text-caption text-grey-7">Pendientes</div>
                <div class="text-h6 text-weight-bold text-negative">
                  {{ cajaActual.ultimoSolicitado - cajaActual.numeroAtendido }}
                </div>
              </q-card>
            </div>
          </div>

          <div class="text-subtitle2 text-grey-8 text-weight-bold q-mt-lg">
            TURNO ACTUALMENTE EN ATENCIÓN
          </div>
          <div class="text-h1 text-weight-bolder text-primary q-my-sm">
            #{{ cajaActual.numeroAtendido }}
          </div>
        </q-card-section>

        <q-card-actions align="center" class="q-pb-md">
          <q-btn
            label="Siguiente / Atendido"
            color="primary"
            icon="navigate_next"
            size="lg"
            unelevated
            class="full-width q-py-sm"
            :disabled="cajaActual.numeroAtendido >= cajaActual.ultimoSolicitado"
            @click="atenderSiguiente"
          />
        </q-card-actions>

      </q-card>
    </div>

  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

// ID de la caja seleccionada por defecto
const cajaSeleccionada = ref(1)

// Opciones de las 4 Cajas con su estado independiente de turnos
const cajas = ref([
  { id: 1, label: 'Caja 1  ', numeroAtendido: 1, ultimoSolicitado: 8 },
  { id: 2, label: 'Caja 2  ', numeroAtendido: 3, ultimoSolicitado: 12 },
  { id: 3, label: 'Caja 3  ', numeroAtendido: 5, ultimoSolicitado: 5 },
  { id: 4, label: 'Caja 4  ', numeroAtendido: 2, ultimoSolicitado: 9 }
])

// Mapeo simple para la propiedad
const opcionesCajas = computed(() => {
  return cajas.value.map(c => ({ label: c.label, id: c.id }))
})

// Para devolver los datos reactivos de la caja seleccionada en el panel
const cajaActual = computed(() => {
  return cajas.value.find(c => c.id === cajaSeleccionada.value) || cajas.value[0]
})

// Avanza el turno de la caja seleccionada
const atenderSiguiente = () => {
  if (cajaActual.value.numeroAtendido < cajaActual.value.ultimoSolicitado) {
    cajaActual.value.numeroAtendido++
  }
}
</script>

<style scoped>
</style>