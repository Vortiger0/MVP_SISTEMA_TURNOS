<route lang="yaml">
meta:
  layout: false
</route>

<template>
  <q-page class="flex flex-center bg-blue-2 q-pa-md relative-position">
    <!-- BOTÓN DE CAMBIO DE ROL / MODO EN LA PARTE SUPERIOR DERECHA -->
    <div class="absolute-top-right q-pa-md" style="z-index: 10;">
      <q-btn
        v-if="pantalla !== 'atencion'"
        outline
        color="primary"
        icon="admin_panel_settings"
        label="Modo Funcionario"
        size="sm"
        @click="irA('atencion')"
      />
      <q-btn
        v-else
        outline
        color="secondary"
        icon="person"
        label="Modo Ciudadano"
        size="sm"
        @click="irA('solicitar')"
      />
    </div>

    <!-- 1. PANTALLA DE REGISTRO -->
    <q-card v-if="pantalla === 'registro'" style="width: 100%; max-width: 400px" class="q-pa-sm shadow-3">
      <q-card-section class="text-center">
        <div class="text-h6 text-primary">Registro</div>
      </q-card-section>

      <q-card-section class="q-gutter-y-sm">
        <q-input v-model="formRegistro.nombre" label="Nombre y apellido" outlined dense />
        <q-input v-model="formRegistro.correo" label="Correo" type="email" outlined dense />
        <q-input v-model="formRegistro.password" label="Ingresar contraseña" type="password" outlined dense />
        <q-input v-model="formRegistro.repeatPassword" label="Repetir contraseña" type="password" outlined dense />
        
        <q-btn 
          label="Crear cuenta" 
          color="primary" 
          class="full-width q-mt-md" 
          unelevated 
          @click="irA('login')" 
        />
      </q-card-section>

      <q-card-actions align="center">
        <q-btn 
          flat 
          no-caps 
          label="¿Ya tienes una cuenta? Accede aquí" 
          color="secondary" 
          @click="irA('login')" 
        />
      </q-card-actions>
    </q-card>

    <!-- 2. PANTALLA DE LOGIN -->
    <q-card v-if="pantalla === 'login'" style="width: 100%; max-width: 400px" class="q-pa-sm shadow-3">
      <q-card-section class="text-center">
        <div class="text-h6 text-primary">Login</div>
      </q-card-section>

      <q-card-section class="q-gutter-y-sm">
        <q-input 
          v-model="formLogin.identificador" 
          label="Usuario o correo" 
          hint="Ciudadanos: correo | Funcionarios: usuario"
          outlined 
          dense 
        />
        <q-input v-model="formLogin.password" label="Contraseña" type="password" outlined dense />
        
        <q-btn 
          label="Ingresar" 
          color="primary" 
          class="full-width q-mt-md" 
          unelevated 
          @click="iniciarSesion" 
        />
      </q-card-section>

      <q-card-actions align="center">
        <q-btn 
          flat 
          no-caps 
          label="¿No tienes cuenta? Regístrate aquí" 
          color="secondary" 
          @click="irA('registro')" 
        />
      </q-card-actions>
    </q-card>

    <!-- 3. PANTALLA CIUDADANO: SACAR TURNO -->
    <q-card v-if="pantalla === 'solicitar'" style="width: 100%; max-width: 420px" class="q-pa-sm shadow-3">
      <q-card-section class="row items-center justify-between q-pb-none">
        <div class="text-subtitle2 text-weight-bold text-grey-8">
          Hola, {{ usuarioActual }}
        </div>
        <!-- ÍCONO MINIMALISTA DE CERRAR SESIÓN -->
        <q-btn 
          flat 
          round 
          dense 
          color="grey-7" 
          icon="logout" 
          size="sm" 
          @click="cerrarSesion"
        >
          <q-tooltip>Cerrar sesión</q-tooltip>
        </q-btn>
      </q-card-section>

      <q-separator class="q-my-md" />

      <q-card-section class="text-center q-py-md">
        <!-- Estado A: Si aún no ha sacado turno -->
        <div v-if="!miTurno">
          <div class="text-body1 text-grey-8 q-mb-lg">
            Presiona el botón para obtener tu número de atención.
          </div>
          <q-btn 
            label="Sacar Turno" 
            color="primary" 
            icon="confirmation_number" 
            size="lg" 
            unelevated 
            class="q-px-xl q-py-sm"
            @click="generarTurno" 
          />
        </div>

        <!-- Estado B: Cuando ya tiene un número asignado -->
        <div v-else class="q-gutter-y-sm">
          <div class="text-subtitle1 text-grey-8">Tu número de turno es:</div>
          <div class="text-h1 text-weight-bolder text-secondary q-my-sm">
            #{{ miTurno }}
          </div>
          <q-chip color="primary" text-color="white" icon="info">
            Número actualmente en atención: {{ numeroActual }}
          </q-chip>
          <div class="q-mt-md">
            <q-btn flat dense no-caps label="Sacar otro turno" color="primary" @click="miTurno = null" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- 4. PANTALLA FUNCIONARIO: ATENCIÓN DE TURNOS -->
    <q-card v-if="pantalla === 'atencion'" style="width: 100%; max-width: 480px" class="q-pa-sm shadow-3">
      <q-card-section class="row items-center justify-between q-pb-none">
        <div class="text-subtitle2 text-weight-bolder text-grey-9">
          ÚLTIMO NÚMERO SOLICITADO: 
          <q-badge color="negative" class="text-bold q-ml-xs q-px-sm" style="font-size: 0.9em;">
            {{ ultimoNumeroSolicitado }}
          </q-badge>
        </div>
        <!-- ÍCONO MINIMALISTA DE CERRAR SESIÓN -->
        <q-btn 
          flat 
          round 
          dense 
          color="grey-7" 
          icon="logout" 
          size="sm" 
          @click="cerrarSesion"
        >
          <q-tooltip>Cerrar cuenta</q-tooltip>
        </q-btn>
      </q-card-section>

      <q-card-section class="text-center q-pt-md">
        <div class="text-caption text-grey-7">Nombre de funcionario</div>
        <div class="text-subtitle1 text-weight-bold text-uppercase q-mb-md">
          {{ usuarioActual }}
        </div>

        <q-separator class="q-my-md" />

        <div class="text-subtitle2 text-grey-8 text-weight-bold q-mt-lg">
          NÚMERO SIENDO ATENDIDO
        </div>
        <div class="text-h1 text-weight-bolder text-primary q-my-sm">
          {{ numeroActual }}
        </div>
      </q-card-section>

      <q-card-actions align="center" class="q-pb-md">
        <q-btn 
          label="Siguiente" 
          color="primary" 
          size="lg" 
          unelevated
          class="q-px-xl" 
          :disabled="numeroActual >= ultimoNumeroSolicitado"
          @click="siguienteNumero" 
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Estado de navegación: 'registro', 'login', 'solicitar', 'atencion'
const pantalla = ref('login')

// Modelos para formularios
const formRegistro = reactive({
  nombre: '',
  correo: '',
  password: '',
  repeatPassword: ''
})

const formLogin = reactive({
  identificador: '',
  password: ''
})

// Estado global de turnos
const usuarioActual = ref('Usuario Demo')
const miTurno = ref(null)
const numeroActual = ref(1)
const ultimoNumeroSolicitado = ref(15)

// Métodos
const irA = (nuevaPantalla) => {
  pantalla.value = nuevaPantalla
}

const iniciarSesion = () => {
  if (formLogin.identificador.trim() !== '') {
    usuarioActual.value = formLogin.identificador
  }
  irA('solicitar')
}

const cerrarSesion = () => {
  miTurno.value = null
  irA('login')
}

const generarTurno = () => {
  ultimoNumeroSolicitado.value++
  miTurno.value = ultimoNumeroSolicitado.value
}

const siguienteNumero = () => {
  if (numeroActual.value < ultimoNumeroSolicitado.value) {
    numeroActual.value++
  }
}
</script>