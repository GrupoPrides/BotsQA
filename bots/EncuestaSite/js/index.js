
// A $( document ).ready() block.
$(document).ready(function () {
    todayDate();

    $('input:checkbox').click(function () {
        $('input:checkbox').not(this).prop('checked', false);
    });
});

function todayDate() {
    var d = new Date();
    var n = d.getFullYear() + "  ";
    return document.getElementById("date").innerHTML = n;
}
function resultadoFinal() {
    var nombre = document.getElementById('nombre1').value;
    var apellido1 = document.getElementById('apellido1').value;
    var preg1 = $('.radio:checked').val();
    var preg2 = $('.checkbox:checked').val();
    var preg3 = document.getElementById('preg3').value;
    var preg4 = document.getElementById('preg4').value;
    // console.log(nombre);
    // console.log(apellido1);
    // console.log(preg1);
    // console.log(preg2);
    // console.log(preg3);
    // console.log(preg4);
    if (nombre == '' || apellido1 == ''
        || preg1 == undefined || preg2 == undefined || preg3 == '' || preg4 == ''
    ) {
        alert("Error, Por favor complete todos los campos!");
    }
    else {
        var totalRespCorrectas = 0;
        if (preg1 == 'correctaPreg1') { totalRespCorrectas++; }
        if (preg2 == 'correctaPreg2') { totalRespCorrectas++; }
        if (preg3.includes('trabajo') || preg3.includes('paz') || preg3.includes('cultura')) { totalRespCorrectas++; }
        if (preg4.includes('cafe') || preg4.includes('maiz') || preg4.includes('café') || preg4.includes('maíz') || preg4.includes('banano') || preg4.includes('caña')) { totalRespCorrectas++; }

        var alumno = {
            Nombre_Completo: nombre + ' ' + apellido1,
            Total_Respuestas_Acertadas: totalRespCorrectas,
            Nota: (totalRespCorrectas * 100) / 4,
            Respuestas_Correctas: ["\n1. 22 marzo 1988", "\n2. Oscar Arias Sanchez", "\n3. Trabajo, Paz, Cultura", "\n4. Cafe, Maiz, Banano, Caña"]
        };
        //console.log(alumno);
        /*alert(
            'Nombre Completo ' + alumno.Nombre_Completo +
            '\nTotal Respuestas Acertadas ' + alumno.Total_Respuestas_Acertadas +
            '\nNota ' + alumno.Nota +
            '\nRespuestas Correctas ' + alumno.Respuestas_Correctas             
            );*/
        // window.location = './ResultadoIndividual.html?Nombre_Completo='+alumno.Nombre_Completo
        // +'&Total_Respuestas_Acertadas='+alumno.Total_Respuestas_Acertadas
        // +'&Nota='+alumno.Nota
        // +'&Respuestas_Correctas='+alumno.Respuestas_Correctas;
        window.location = './ResultadoIndividual.html?Nombre_Completo=' + alumno.Nombre_Completo
            + '&Total_Respuestas_Acertadas=' + alumno.Total_Respuestas_Acertadas
            + '&Nota=' + alumno.Nota;
    }
}