<template>
    <div class="row mt-4">
        <div class="col-lg-8 offset-lg-2">
            <div class="card">
                <div class="card-header bg-dark text-white text-center">Crear Libro</div>
                <div class="card-body"></div>
                <form v-on="submit.prevent='guardar'">
                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fas fa-book"></i></span>
                        <input type="text" v-model= "titulo" class="form-control" maxlength="50" placeholder="Título del libro" required>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fas fa-book"></i></span>
                        <input type="text" v-model="autor" class="form-control" maxlength="50" placeholder="Autor del libro" required>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                        <input type="text" v-model="fecha_publicacion" class="form-control" maxlength="50" placeholder="Fecha de Publicación" required>
                    </div>
                    <div class="d-grid col-6 mx-auto">
                        <button type="submit" class="btn btn-primary"><i class="fas fa-plus"></i>Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import {mostrarAlerta} from '../funciones.js'; // Asegúrate de que esta función esté definida en tu proyecto
    export default {
        data() {
            return {
                titulo: '',
                autor: '',
                fecha_publicacion: '',
                url: 'http://127.0.0.1:8000/api/libros'
            };
        },
        methods: {
            guardar() {
                event.preventDefault();
                if(this.name.trim() === '') {
                    mostrarAlerta('Por favor, completa todos los campos.', 'warning');
                }
                else if (this.autor.trim() === '') {
                    mostrarAlerta('Por favor, completa todos los campos.', 'warning');
                }
                else if (this.fecha_publicacion.trim() === '') {
                    mostrarAlerta('Por favor, completa todos los campos.', 'warning');
                }
                else {
                    var parametros = {name: this.titulo.trim(), autor: this.autor.trim(), fecha_publicacion: this.fecha_publicacion.trim()};
                    enviarSolicitud('POST', parametros, this.url, 'Producto Guardado');
                }
            }
        }
    }
</script>