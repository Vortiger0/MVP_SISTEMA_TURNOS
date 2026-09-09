<template>
  <q-page class="bg-grey-2 q-pa-md flex flex-center">
    
    <div style="width: 100%; max-width: 1100px;">
      <!-- BARRA SUPERIOR PARA LAPTOP (1366x768) -->
      <div class="row items-center justify-between q-mb-md">
        <q-btn
          color="primary"
          icon="confirmation_number"
          label="MIS TURNOS"
          unelevated
          class="text-weight-bold"
        />
        
        <q-btn 
          flat 
          round 
          dense 
          color="grey-8" 
          icon="logout"
          @click="mostrarConfirmacion = true"
        >
          <q-tooltip>Cerrar sesión</q-tooltip>
        </q-btn>
      </div>

      <!-- GRID DE SUCURSALES (OPTIMIZADO PARA 1366x768) -->
      <div class="row q-col-gutter-md">
        <div 
          v-for="local in sucursales" 
          :key="local.id" 
          class="col-12 col-sm-6 col-md-4"
        >
          <q-card 
            flat 
            bordered 
            class="q-pa-md text-center shadow-1 laptop-card"
            :class="`border-${obtenerConcurrencia(local.personas).color}`"
          >
            <!-- NOMBRE SUCURSAL -->
            <div class="text-subtitle1 text-weight-bold text-grey-9 q-mb-xs">
              ({{ local.nombre }})
            </div>

            <!-- ESTADO DE CONCURRENCIA -->
            <div class="row items-center justify-center q-gutter-x-xs text-body2">
              <q-badge 
                rounded 
                :color="obtenerConcurrencia(local.personas).color" 
                style="width: 10px; height: 10px;" 
              />
              <span class="text-weight-bold text-grey-10">
                {{ obtenerConcurrencia(local.personas).label }}:
              </span>
              <span class="text-weight-medium text-grey-8">
                {{ local.personas }} personas
              </span>
            </div>
          </q-card>
        </div>
      </div>
    </div>

    <!-- DIÁLOGO DE CONFIRMACIÓN -->
    <q-dialog v-model="mostrarConfirmacion" persistent>
      <q-card style="min-width: 320px;">
        <q-card-section class="row items-center">
          <q-avatar icon="logout" color="primary" text-color="white" size="md" />
          <span class="q-ml-sm text-subtitle1 text-weight-bold">Confirmar salida</span>
        </q-card-section>

        <q-card-section class="q-pt-none text-grey-8">
          ¿Estás seguro de que deseas cerrar sesión?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="grey-8" v-close-popup />
          <q-btn label="Cerrar sesión" color="negative" unelevated @click="cerrarSesion" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mostrarConfirmacion = ref(false)

const sucursales = ref([
  { id: 1, nombre: 'Abitab', personas: 18 },
  { id: 2, nombre: 'Abitab centro', personas: 30 },
  { id: 3, nombre: 'Abitab Dorado', personas: 13 },
  { id: 4, nombre: 'Redpagos Terminal', personas: 8 }
])

const obtenerConcurrencia = (personas) => {
  if (personas <= 10) {
    return { label: 'Concurrencia baja', color: 'positive' }
  } else if (personas <= 20) {
    return { label: 'Concurrencia media', color: 'warning' }
  } else {
    return { label: 'Concurrencia alta', color: 'negative' }
  }
}

const cerrarSesion = () => {
  mostrarConfirmacion.value = false
  router.push('/login')
}
</script>

<style scoped>
.laptop-card {
  border-radius: 8px;
  border-left-width: 6px !important;
  background-color: #ffffff;
}

/* BORDES LATERALES SEGÚN CONCURRENCIA */
.border-positive {
  border-left-color: #21ba45 !important;
}
.border-warning {
  border-left-color: #f2c037 !important;
}
.border-negative {
  border-left-color: #c10015 !important;
}
</style>