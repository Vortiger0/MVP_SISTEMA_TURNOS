<template>
  <q-layout view="1Hh Lpr lFf">
    <!-- esto es la barra de navegacion que se comparte entre todas las paginas del admin -->
     <AdminNav />
    <q-page-container>
       <!--lo que hace router-view es mostrar el contenido de la pagina actual  -->
      <router-view />
    </q-page-container>


  </q-layout>

 
 
</template>

<script setup>
import AdminNav from '../components/AdminNav.vue'
</script>