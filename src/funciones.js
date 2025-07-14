import Swal from "sweetalert2";
import axios from "axios";

export function mostrarAlerta(titulo, icono, foco = '') {
    if (foco !== '') {
        document.getElementById(foco).focus();
    }
    Swal.fire({
        title: titulo,
        icon: icono,
        customClass: {
            confirmButton: 'btn btn-primary',
            popup: 'animated zoomIn'
        },
        buttonsStyling: false,
    });
}

export function mostrarConfirmacion(id, name) {
    var url = 'http://127.0.0.1:8000/api/libros/' + id;
    const swalwithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    swalwithBootstrapButtons.fire({
        title: '¿Estás seguro de eliminar el producto ' + name + '?',
        text: "Se perderá la información del libro",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '<i className="fas fa-check" style="color: white; font-size: 1.2em; margin-right: 5px;"></i> Sí, eliminar',
        cancelButtonText: '<i className="fas fa-times" style="color: white; font-size: 1.2em; margin-right: 5px;"></i> No, cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            enviarPeticionEliminar(url);
            axios.delete(url)
                .then(response => {
                    mostrarAlerta('Libro eliminado correctamente', 'success');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                })
                .catch(error => {
                    mostrarAlerta('Error al eliminar el libro', 'error');
                });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            mostrarAlerta('Operación cancelada', 'info');
        }
    });
}

export function enviarPeticionEliminar(metodo, parametros, url, mensaje) {
    axios({ method: metodo, url: url, data: parametros })
        .then(function (response) {
            var  status = response.data[0]['status'];
            if (status === 'success') {
                mostrarAlerta(mensaje, 'status');
                window.setTimeout(function () {
                    window.location.href = '/';
                }, 1000);
            } else {
                var lista = '';
                var errorer = response.data[1]['error'];
                Object.keys(errorer).forEach(
                    key => {lista += errorer[key][0] + '<br>';
                });
                mostrarAlerta(lista, 'error');
            }
    }).catch(function (error) {
        mostrarAlerta('Error al enviar la petición: ' + error.message, 'error');
    });
}