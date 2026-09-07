<template>
   <q-page class="bg-grey-2 q-pa-md flex justify-center">
    <div style="width: 100%; max-width: 500px;">
        <q-card class="shadow-3">
             <!-- Cabecera de la tarjeta con el nombre de la sección y botón de agregar -->
            <q-card-section class="flex items-center justify-between">
             <div class="text-h6 text-weight-bold">Funcionarios</div>
             <q-btn color="primary" unelevated @click="mostrarDialogo = true">
                <div class="flex items-center q-gutter-x-xs">
                    <q-icon name="add" />
                    <span>Agregar funcionario</span>
                </div>
            </q-btn>
            </q-card-section>
          
            
            <q-list separator>
                <!-- vfor lo que hace es repetir este q-item una vez por cada funcionario del array -->
                <q-item v-for="funcionario in funcionarios" :key="funcionario.usuario">
                    <q-item-section>
                        <q-item-label>{{ funcionario.nombre }}</q-item-label>
                        <q-item-label caption>{{ funcionario.usuario }} - caja {{ funcionario.caja }}</q-item-label>
                    </q-item-section>
                     <!-- Botones de edición y eliminación -->
                    <q-item-section side>
                        <q-btn flat round dense icon="edit" color="primary" @click="abrirEdicion(funcionario)"></q-btn>
                        <q-btn flat round dense icon="delete" color="negative" @click="eliminarFuncionario(funcionario)"></q-btn>
                    </q-item-section>
                </q-item>
            </q-list>
           
        </q-card>
    </div>
    <!-- Ventana de diálogo para agregar un nuevo funcionario -->
    <q-dialog v-model="mostrarDialogo">
        <q-card style="width: 400px;">

            <q-card-section class="text-h6 text-weight-bold">
            Nuevo funcionario
            </q-card-section>

            <q-card-section class="q-gutter-y-sm">
            <q-input v-model="nuevoNombre" label="Nombre y apellido" />
            <q-input v-model="nuevoUsuario" label="Usuario de acceso" />

            <!-- Selector de caja con opciones fijas 1,2,3,4 -->
            <q-select v-model="nuevaCaja" :options="opcionesCajas" label="Caja asignada" />
            </q-card-section>

            <q-card-actions align="right">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn label="Crear" color="primary" unelevated @click="agregarFuncionario" />
            </q-card-actions>

        </q-card>
    </q-dialog>
   </q-page>
</template>

<script setup>
import { useSucursalStore } from '../../stores/sucursal-store'
import { ref } from 'vue'
import { computed } from 'vue'
const sucursalStore = useSucursalStore()

const funcionarios = ref([
  { nombre: 'Lucía Fernández', usuario: '@lucia.fernandez', caja: 1 },
  { nombre: 'Martín Souza', usuario: '@martin.souza', caja: 2 }
])

const mostrarDialogo = ref(false)

const nuevoNombre = ref('')
const nuevoUsuario = ref('')
const nuevaCaja = ref(null)

// para agregar un nuevo funcionario al array
const agregarFuncionario = () => {
    if (funcionarioEditando.value) {
        // Si estamos editando, actualizamos los datos del funcionario existente
        funcionarioEditando.value.nombre = nuevoNombre.value
        funcionarioEditando.value.usuario = nuevoUsuario.value
        funcionarioEditando.value.caja = nuevaCaja.value

        
    } else {
        // Si no estamos editando, agregamos un nuevo funcionario
        funcionarios.value.push({
            nombre: nuevoNombre.value,
            usuario: nuevoUsuario.value,
            caja: nuevaCaja.value
        })
        // Limpiamos el formulario y cerramos el diálogo
        nuevoNombre.value = ''
        nuevoUsuario.value = ''
        nuevaCaja.value = null
        mostrarDialogo.value = false
        funcionarioEditando.value = null
        return

    }
   
  // se limpia el formulario para la próxima vez que se abra
  nuevoNombre.value = ''
  nuevoUsuario.value = ''
  nuevaCaja.value = null

  // Cerramos el diálogo
  mostrarDialogo.value = false
}

const eliminarFuncionario = (funcionario) => {
  funcionarios.value = funcionarios.value.filter(f => f !== funcionario)
}

const opcionesCajas = computed(() => {
    const total = sucursalStore.cantidadCajas
  // creamos un array con los números de caja disponibles según la cantidad de cajas en el store
  return Array.from({ length: total }, (_, i) => i + 1)
})

//para editar
const funcionarioEditando = ref(null)

const abrirEdicion = (funcionario) => {
  funcionarioEditando.value = funcionario 
  nuevoNombre.value = funcionario.nombre
  nuevoUsuario.value = funcionario.usuario
  nuevaCaja.value = funcionario.caja
  mostrarDialogo.value = true
}

</script>