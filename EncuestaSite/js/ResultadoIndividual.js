$(document).ready(function () {
    todayDate();
    const urlParams = new URLSearchParams(window.location.search);
    const Nombre_Completo = urlParams.get('Nombre_Completo');
    const Total_Respuestas_Acertadas = urlParams.get('Total_Respuestas_Acertadas');
    const Nota = urlParams.get('Nota');
    //const Respuestas_Correctas = urlParams.get('Respuestas_Correctas');

    var alumno = {
        Nombre_Completo: Nombre_Completo,
        Total_Respuestas_Acertadas: Total_Respuestas_Acertadas,
        Nota: Nota,
        Respuestas_Correctas: ["\n1. 22 marzo 1988", "\n2. Oscar Arias Sanchez", "\n3. Trabajo, Paz, Cultura", "\n4. Café, Maíz, Banano, Caña"]
    };
    console.log(alumno);
    document.getElementById('Nombre_Completo').innerHTML = 'Hola, ' + Nombre_Completo;
    document.getElementById('ResultadoAlumno').innerHTML =
        '<strong>Nombre Completo</strong> ' + alumno.Nombre_Completo + '<br/>' +
        '\n<strong>Total de Respuestas Acertadas</strong> ' + alumno.Total_Respuestas_Acertadas + '<br/>' +
        '\n<strong>Nota</strong> ' + alumno.Nota + '<br/>' +
        '\n<strong>Las Respuestas Correctas eran</strong> ';
    alumno.Respuestas_Correctas.forEach(myFunction);
    function myFunction(item, index) {
        document.getElementById("demo").innerHTML += /*index + ":" +*/ item + "<br>";
    }
});

function todayDate() {
    var d = new Date();
    var n = d.getFullYear() + "  ";
    return document.getElementById("date").innerHTML = n;
}