<route lang="yaml">
meta:
  layout: false
</route>

<template>
  <q-page class="bg-grey-2 flex flex-center q-pa-md">
    <q-card class="shadow-3 q-pa-md" style="width: 100%; max-width: 450px;">
      <q-card-section class="text-center">
        <q-icon name="person_add" color="primary" size="4rem" />
        <div class="text-h5 text-weight-bold text-grey-9 q-mt-sm">
          Registro de Ciudadano
        </div>
        <div class="text-caption text-grey-7">
          Crea tu cuenta para solicitar tus turnos
        </div>
      </q-card-section>

      <q-card-section class="q-gutter-y-md">
        <q-input
          v-model="nombre"
          label="Nombre completo"
          outlined
          dense
        >
          <template #prepend>
            <q-icon name="badge" />
          </template>
        </q-input>



        <q-input
          v-model="email"
          label="Correo Electrónico"
          outlined
          dense
          type="email"
        >
          <template #prepend>
            <q-icon name="email" />
          </template>
        </q-input>

        <q-input
          v-model="password"
          label="Contraseña"
          outlined
          dense
          type="password"
        >
          <template #prepend>
            <q-icon name="lock" />
          </template>
        </q-input>

        <q-btn
          label="Crear Cuenta"
          color="primary"
          unelevated
          class="full-width q-py-sm"
          to="/"
        />
      </q-card-section>

      <q-card-section class="text-center q-pt-none">
        <div class="text-body2 text-grey-8">
          ¿Ya tienes cuenta?
          <q-btn
            flat
            dense
            no-caps
            label="Inicia Sesión"
            color="primary"
            class="text-weight-bold"
            to="/login"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const nombre = ref('')
const documento = ref('')
const email = ref('')
const password = ref('')
</script>