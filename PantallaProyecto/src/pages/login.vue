<route lang="yaml">
meta:
  layout: false
</route>

<template>
  <q-page class="bg-grey-2 flex flex-center q-pa-md">
    <q-card class="shadow-3 q-pa-md" style="width: 100%; max-width: 400px;">
      <q-card-section class="text-center">
        <q-icon name="account_circle" color="primary" size="4rem" />
        <div class="text-h5 text-weight-bold text-grey-9 q-mt-sm">
          Iniciar Sesión
        </div>
        <div class="text-caption text-grey-7">
        Inicie su sesión
        </div>
      </q-card-section>

      <q-card-section class="q-gutter-y-md">
        <q-input
          v-model="email"
          label="Correo Electrónico / Usuario"
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
          label="Ingresar"
          color="primary"
          unelevated
          class="full-width q-py-sm"
          to="/"
        />
      </q-card-section>

      <q-card-section class="text-center q-pt-none">
        <div class="text-body2 text-grey-8">
          ¿No tienes una cuenta?
          <q-btn
            flat
            dense
            no-caps
            label="Regístrate aquí"
            color="primary"
            class="text-weight-bold"
            to="/registro"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
</script>

 