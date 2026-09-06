<route lang="yaml">
meta:
  layout: false
</route>

<template>
  <q-page class="bg-grey-2 flex flex-center q-pa-lg select-none">
    <q-card class="shadow-6 radius-16 overflow-hidden full-width" style="max-width: 1100px;">
      
      <!-- ENCABEZADO TV CON HORA EN VIVO -->
      <q-card-section class="bg-white row items-center justify-between q-px-xl q-py-md bordered-bottom">
        <div class="text-h5 text-weight-bolder text-grey-9 text-uppercase">
          TV / Pantalla para visualizar turnos
        </div>
        <div class="text-h4 text-weight-bolder text-primary font-mono">
          {{ horaActual }}
        </div>
      </q-card-section>

      <!-- SECCIÓN DE CAJAS (GRID ADAPTABLE SEGÚN CAJAS ACTIVAS) -->
      <q-card-section class="q-py-xl q-px-lg bg-grey-1">
        <div class="row q-col-gutter-lg justify-center items-center">
          <div
            v-for="caja in cajasActivas"
            :key="caja.id"
            :class="colClass"
          >
            <q-card class="shadow-2 radius-12 text-center q-pa-md bg-white border-caja">
              <div class="text-subtitle1 text-weight-bold text-grey-8">
                {{ caja.nombre }}
              </div>
              <div class="text-caption text-grey-6 q-mb-sm">
                atendiendo número:
              </div>
              <div class="text-weight-bolder text-positive numero-caja">
                {{ caja.numero }}
              </div>
            </q-card>
          </div>
        </div>
      </q-card-section>

      <!-- ZÓCALO INFERIOR: PRÓXIMOS NÚMEROS -->
      <q-card-section class="bg-white text-center q-py-md bordered-top">
        <div class="text-caption text-weight-bold text-grey-7 text-uppercase">
          Próximos números
        </div>
        <div class="text-h5 text-weight-bolder text-grey-9 q-mt-xs font-mono letter-spacing">
          <span v-for="(num, index) in proximosNumeros" :key="index" class="q-mx-xs">
            {{ num }}
          </span>
        </div>
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Hora actual en tiempo real
const horaActual = ref('')
let timerHora = null

const actualizarHora = () => {
  const ahora = new Date()
  const horas = String(ahora.getHours()).padStart(2, '0')
  const minutos = String(ahora.getMinutes()).padStart(2, '0')
  horaActual.value = `${horas}:${minutos}`
}

// Cajas activas en el sistema (ejemplo con 2 cajas que iniciaron sesión)
const cajasActivas = ref([
  { id: 1, nombre: 'Caja 1', numero: 25 },
  { id: 2, nombre: 'Caja 2', numero: 26 }
])

const proximosNumeros = ref([27, 28, 29, 30, 31])

// Adaptación dinámica de columnas según cantidad de cajas activas (2, 3 o 4)
const colClass = computed(() => {
  const total = cajasActivas.value.length
  if (total <= 2) return 'col-12 col-sm-6'
  if (total === 3) return 'col-12 col-sm-4'
  return 'col-12 col-sm-6 col-md-3'
})

onMounted(() => {
  actualizarHora()
  timerHora = setInterval(actualizarHora, 1000)
})

onUnmounted(() => {
  if (timerHora) clearInterval(timerHora)
})
</script>

<style scoped>
.radius-16 { border-radius: 16px; }
.radius-12 { border-radius: 12px; }
.select-none { user-select: none; }
.bordered-bottom { border-bottom: 1px solid #e0e0e0; }
.bordered-top { border-top: 1px solid #e0e0e0; }
.border-caja { border: 1px solid #d6d6d6; }
.font-mono { font-family: monospace; }
.letter-spacing { letter-spacing: 4px; }
.numero-display, .numero-caja { font-size: 5rem; line-height: 1; }
</style>