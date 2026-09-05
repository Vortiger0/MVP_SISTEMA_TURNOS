<route lang="yaml">
meta:
  layout: false
</route>

<template>
  <q-page class="bg-grey-3 flex flex-center q-pa-md select-none">
    <div style="width: 100%; max-width: 500px;">
      <q-card class="shadow-5 q-pa-lg text-center radius-12">
        
        <!-- CABECERA DEL TOTEM / SUCURSAL LOCAL -->
        <q-card-section class="q-pb-none">
          <q-icon name="confirmation_number" color="primary" size="4.5rem" />
          <div class="text-h4 text-weight-bolder text-grey-9 q-mt-md">
            Bienvenido
          </div>
          <div class="text-subtitle1 text-grey-7 q-mt-xs">
            Sucursal Centro
          </div>
        </q-card-section>

        <q-separator class="q-my-md" />

        <!-- ESTADO 1: BOTÓN INICIAL PARA SACAR TURNO -->
        <q-card-section v-if="!turnoOtorgado" class="q-py-xl">
          <p class="text-body1 text-grey-8 q-mb-xl">
            Presione el botón a continuación para obtener su número de atención en sala.
          </p>

          <q-btn
            label="SACAR TURNO"
            color="primary"
            size="24px"
            unelevated
            class="full-width q-py-lg text-bold shadow-4 button-touch"
            @click="confirmarTurno"
          />
        </q-card-section>

        <!-- ESTADO 2: MUESTRA DEL TURNO Y TEMPORIZADOR AUTO-REINICIO -->
        <q-card-section v-else class="q-py-lg">
          <q-icon name="check_circle" color="positive" size="4rem" />
          
          <div class="text-subtitle1 text-grey-8 q-mt-md">
            Su número asignado es:
          </div>

          <div class="text-h1 text-weight-bolder text-primary q-my-sm" style="font-size: 5rem;">
            #{{ miTurno }}
          </div>

          <!-- BARRA DE PROGRESO Y CONTEO REGRESIVO DE 10 SEGUNDOS -->
          <div class="q-my-md q-px-md">
            <q-linear-progress
              :value="segundosRestantes / 10"
              color="primary"
              track-color="grey-4"
              size="10px"
              rounded
            />
            <div class="text-caption text-grey-7 q-mt-xs">
              Reiniciando pantalla en <strong>{{ segundosRestantes }}</strong> segundos...
            </div>
          </div>

          <div class="text-caption text-grey-7 q-mb-lg">
            Espere a ser llamado en la pantalla de la caja correspondiente.
          </div>

          <q-btn
            label="Finalizar ahora"
            color="secondary"
            size="lg"
            unelevated
            class="full-width q-py-md text-bold"
            @click="reiniciarTotem"
          />
        </q-card-section>

      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

// Contador interno simulado para el tótem local
const contadorTurnos = ref(20)

// Estados de la pantalla
const turnoOtorgado = ref(false)
const miTurno = ref(null)

// Variables para el temporizador de 10 segundos
const segundosRestantes = ref(10)
let temporizadorIntervalo = null

const confirmarTurno = () => {
  contadorTurnos.value++
  miTurno.value = contadorTurnos.value
  turnoOtorgado.value = true
  iniciarConteoRegresivo()
}

const iniciarConteoRegresivo = () => {
  segundosRestantes.value = 10
  
  // Limpia cualquier intervalo activo previo por seguridad
  if (temporizadorIntervalo) clearInterval(temporizadorIntervalo)

  temporizadorIntervalo = setInterval(() => {
    segundosRestantes.value--
    if (segundosRestantes.value <= 0) {
      reiniciarTotem()
    }
  }, 1000)
}

const reiniciarTotem = () => {
  if (temporizadorIntervalo) {
    clearInterval(temporizadorIntervalo)
    temporizadorIntervalo = null
  }
  turnoOtorgado.value = false
  miTurno.value = null
  segundosRestantes.value = 10
}

// Limpieza de recursos al desmontar la vista
onUnmounted(() => {
  if (temporizadorIntervalo) clearInterval(temporizadorIntervalo)
})
</script>

<style scoped>
.radius-12 {
  border-radius: 16px;
}

.select-none {
  user-select: none;
}

.button-touch {
  border-radius: 12px;
  transition: transform 0.1s ease;
}

.button-touch:active {
  transform: scale(0.97);
}
</style>