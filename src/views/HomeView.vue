<template>
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Autor</th>
                            <th>Fecha de Publicación</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <!-- Mensaje de carga -->
                        <tr v-if="loading">
                            <td colspan="3" class="text-center">Cargando libros...</td>
                        </tr>
                        
                        <!-- Mensaje si no hay libros -->
                        <tr v-else-if="!libros || libros.length === 0">
                            <td colspan="3" class="text-center">No hay libros disponibles</td>
                        </tr>
                        
                        <!-- Lista de libros -->
                        <tr v-for="libro in libros" :key="libro.id">
                            <td>{{ libro.titulo }}</td>
                            <td>{{ libro.autor }}</td>
                            <td>{{ formatFecha(libro.fecha_publicacion) }}</td>
                            <td>
                                <router-link :to="{ path: 'edit/' + libro.id }" class="btn btn-warning">
                                    <i class="fas fa-book"></i>
                                </router-link>
                                <button class="btn btn-danger" @click="eliminarLibro(libro.id, libro.titulo)">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mostrarConfirmacion } from '../funciones.js'; // Asegúrate de que esta función esté definida en tu proyecto
export default {
    data() {
        return {
            libros: [], // Asegúrate de inicializarlo como array
            loading: true,
            error: null
        };
    },
    mounted() {
        this.fetchLibros();
    },
    methods: {
        async fetchLibros() {
            try {
                this.loading = true;
                const response = await axios.get('http://127.0.0.1:8000/api/libros');
                this.libros = response.data.libros; // ⬅️ ¡Cambio clave aquí!
            } catch (error) {
                console.error('Error al cargar libros:', error);
                this.error = "Error al cargar los libros";
            } finally {
                this.loading = false;
            }
        },
        formatFecha(fecha) {
            if (!fecha) return 'N/A';
            return new Date(fecha).toLocaleDateString('es-ES'); // Formato legible
        },
        eliminarLibro(id, titulo) {
            mostrarConfirmacion(id, titulo);

        }
    }
}
</script>