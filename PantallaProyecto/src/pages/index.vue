<route lang="yaml">
meta:
  layout: false
</route>

<template>
  <q-page class="bg-grey-2 q-pa-md">
    <div class="max-width-container margin-auto q-pt-md">
      
      <!-- 1. VISTA CATÁLOGO -->
      <div v-if="pantalla === 'catalogo'">
        <!-- CABECERA: BOTÓN MIS TURNOS & LOGOUT -->
        <div class="row items-center justify-between q-mb-md">
          <q-btn
            color="primary"
            icon="confirmation_number"
            label="Mis turnos"
            unelevated
            @click="dialogoMisTurnos = true"
          />
          <q-btn flat round dense color="grey-7" icon="logout" to="/login">
            <q-tooltip>Cerrar sesión</q-tooltip>
          </q-btn>
        </div>

        <!-- GRID DE SEDES -->
        <div class="row q-col-gutter-md">
          <div
            v-for="sede in sedesFiltradas"
            :key="sede.id"
            class="col-12 col-sm-6 col-md-4"
          >
            <q-card
              class="cursor-pointer card-hover shadow-2 text-center q-pa-sm"
              @click="seleccionarSede(sede)"
            >
              <q-card-section class="q-py-md">
                <div class="text-subtitle1 text-weight-bold q-mb-md text-grey-9">
                  ({{ sede.nombre }})
                </div>
                
                <!-- INDICADOR DE OCUPACIÓN Y TURNOS -->
                <div class="row items-center justify-center q-gutter-x-xs">
                  <q-icon name="fiber_manual_record" :color="colorEstado(sede.estado)" size="12px" />
                  <span class="text-caption text-weight-medium">
                    {{ sede.estado }}: {{ sede.turnos }} turnos
                  </span>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- 2. VISTA DETALLADA DE LA SEDE -->
      <div v-if="pantalla === 'detalle'" class="max-width-detalle margin-auto">
        <q-btn
          flat
          icon="arrow_back"
          label="Volver a sedes"
          color="primary"
          class="q-mb-md"
          @click="pantalla = 'catalogo'"
        />

        <q-card class="shadow-3 q-pa-md">
          <div class="text-h6 text-weight-bold text-center text-uppercase q-mb-md">
            "Vista Detallada"
          </div>

          <div class="row q-col-gutter-md items-center">
            <!-- MAPA -->
            <div class="col-12 col-md-6">
              <q-card flat bordered class="bg-grey-3 flex flex-center" style="height: 200px;">
                <div class="text-h5 text-weight-bolder text-grey-6">MAPA</div>
              </q-card>
            </div>

            <!-- DATOS DE LA SEDE -->
            <div class="col-12 col-md-6">
              <q-card flat bordered class="q-pa-md bg-grey-1">
                <div class="text-subtitle1 text-weight-bold text-center text-uppercase q-mb-sm">
                  {{ sedeSeleccionada?.nombre }}
                </div>
                <q-separator class="q-mb-sm" />
                
                <div class="text-caption text-grey-9 q-gutter-y-xs">
                  <div><strong>Dirección:</strong> {{ sedeSeleccionada?.direccion }}</div>
                  <div><strong>Horarios:</strong> {{ sedeSeleccionada?.horarios }}</div>
                  <div><strong>Teléfono:</strong> {{ sedeSeleccionada?.telefono }}</div>
                  <div><strong>Redes:</strong> {{ sedeSeleccionada?.redes }}</div>
                </div>
              </q-card>
            </div>
          </div>

          <q-card-actions align="center" class="q-pt-lg q-pb-xs">
            <q-btn
              label="Sacar número"
              color="primary"
              size="lg"
              unelevated
              class="q-px-xl text-bold"
              :to="{ path: '/sacar-turno', query: { sede: sedeSeleccionada?.nombre } }"
            />
          </q-card-actions>
        </q-card>
      </div>

    </div>

    <!-- VENTANA EMERGENTE: MIS TURNOS -->
    <q-dialog v-model="dialogoMisTurnos">
      <q-card style="width: 100%; max-width: 350px;">
        <q-card-section class="row items-center justify-between">
          <div class="text-h6 text-weight-bold">Mis Turnos</div>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section class="text-center q-py-lg">
          <div v-if="turnoActivo">
            <div class="text-caption text-grey-7">Sede: {{ turnoActivo.sede }}</div>
            <div class="text-h2 text-weight-bolder text-primary q-my-xs">
              #{{ turnoActivo.numero }}
            </div>
            <div class="text-caption text-grey-8">
              Estado: Esperando llamadas en caja
            </div>
          </div>
          <div v-else class="text-grey-7">
            No tienes turnos activos asociados a tu usuario.
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

const pantalla = ref('catalogo')
const busqueda = ref('')
const dialogoMisTurnos = ref(false)
const sedeSeleccionada = ref(null)

const turnoActivo = ref(null)

const sedes = ref([
  { id: 1, nombre: 'Abitab', estado: 'Ocupado', turnos: 18, direccion: 'Av. 18 de Julio 1234', horarios: '09:00 - 18:00', telefono: '2900 0000', redes: '@abitab_oficial' },
  { id: 2, nombre: 'Abitab centro', estado: 'Muy ocupado', turnos: 30, direccion: 'Plaza Independencia 567', horarios: '08:30 - 19:00', telefono: '2901 1111', redes: '@abitab_centro' },
  { id: 3, nombre: 'Abitab Dorado', estado: 'Ocupado', turnos: 13, direccion: 'Av. Rivera 2420', horarios: '09:00 - 19:00', telefono: '2902 3333', redes: '@abitab_dorado' },
  { id: 4, nombre: 'Redpagos Terminal', estado: 'Poco ocupado', turnos: 8, direccion: 'Tres Cruces Nivel 2', horarios: '07:00 - 22:00', telefono: '2903 4444', redes: '@redpagos_terminal' }
])

const sedesFiltradas = computed(() => {
  if (!busqueda.value) return sedes.value
  return sedes.value.filter(s => 
    s.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  )
})

const seleccionarSede = (sede) => {
  sedeSeleccionada.value = sede
  pantalla.value = 'detalle'
}

const colorEstado = (estado) => {
  switch (estado) {
    case 'Poco ocupado': return 'positive'
    case 'Ocupado': return 'warning'
    case 'Muy ocupado': return 'negative'
    default: return 'grey'
  }
}
</script>

<style scoped>
.max-width-container { max-width: 900px; }
.max-width-detalle { max-width: 650px; }
.margin-auto { margin-left: auto; margin-right: auto; }
.card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
.card-hover:hover { transform: translateY(-3px); box-shadow: 0 8px 15px rgba(0,0,0,0.1) !important; }
</style>