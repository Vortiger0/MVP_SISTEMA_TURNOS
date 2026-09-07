<template>
    <!--lo que hace q-header es fijar la barra arriba de la pantalla, incluso con scroll  -->
 <q-header elevated class="bg-blue text-white-9">
    <!-- lo que hace toolbar es alinear todos los elementos en una fila horizontal -->
    <q-toolbar>
        <q-toolbar-title class="text-weight-bold" style="flex: none;"
        >
            Abitab Centro - Admin
        </q-toolbar-title>

        <q-btn flat label="Inicio" to="/admin" />
        <q-btn flat label="Horarios" to="/admin/horarios" />
        <q-btn flat label="Funcionarios" to="/admin/datosFuncionario" />
        <q-btn flat label="Datos del local" to="/admin/datos-local" />
        <q-space></q-space>
        <q-btn flat icon="logout" to="/login" />
    </q-toolbar>




 </q-header>    

</template>

<script setup>

</script>

<style>
</style>