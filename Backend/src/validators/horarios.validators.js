const verificacionTraslapesDia = (newHorario, horarios) => {
    let response = verificacionTraslapes(newHorario, horarios.lunes);
    if (response.error) return response;
    response = verificacionTraslapes(newHorario, horarios.martes);
    if (response.error) return response;
    response = verificacionTraslapes(newHorario, horarios.miercoles);
    if (response.error) return response;
    response = verificacionTraslapes(newHorario, horarios.jueves);
    if (response.error) return response;
    response = verificacionTraslapes(newHorario, horarios.viernes);
    if (response.error) return response;
    return verificacionTraslapes(newHorario, horarios.sabado);
};

const verificacionTraslapes = (newHorario, horarios) => {
    let response = {
        error: false,
        mensaje: "",
    };

    for (let i = 0; i < horarios.length; i++) {
        const el = horarios[i];
        let horariosInicial1 = new Date(`2022-01-0${el.dia}T${el.horarioInicial}`).getTime();
        let horariosFinal1 = new Date(`2022-01-0${el.dia}T${el.horarioFinal}`).getTime();
        let horariosInicial2 = new Date(`2022-01-0${el.dia}T${newHorario.horarioInicial}`).getTime();
        let horariosFinal2 = new Date(`2022-01-0${el.dia}T${newHorario.horarioFinal}`).getTime();

        // Verificacion si es tutor academico
        if (newHorario.esAuxiliar && el.carnet === newHorario.carnet) {
            // No este asignado al mismo curso del mismo semestre
            if (el.codigo === newHorario.codigo)
                return (response = {
                    error: true,
                    mensaje: `El tutor ${newHorario.nombre} con carnet ${newHorario.carnet} NO debe estar registrado más de una vez en el mismo curso de ${newHorario.codigo} - ${newHorario.curso}.`,
                });

            // Verificar si el tutor esta en otro curso asignado y que no tenga el mismo horario
            if (
                (horariosInicial2 >= horariosInicial1 && horariosInicial2 <= horariosFinal1) ||
                (horariosFinal2 >= horariosInicial1 && horariosFinal2 <= horariosFinal1)
            )
                return (response = {
                    error: true,
                    mensaje: `El tutor ${newHorario.nombre} con carnet ${newHorario.carnet} NO debe estar registrado dentro del rango de laboratorio de otro curso que tenga asignado`,
                });
        }

        // Verificacion de traslape
        if (el.semestre === newHorario.semestre) {
            // Si son auxiliares del mismo curso
            if (
                newHorario.esAuxiliar &&
                el.esAuxiliar &&
                el.codigo === newHorario.codigo &&
                el.seccion === newHorario.seccion
            ) {
                // Validar que el horario sea igual
                if (horariosInicial2 !== horariosInicial1 && horariosFinal2 !== horariosFinal1)
                    return (response = {
                        error: true,
                        mensaje: `El curso seleccionado ya tiene a un auxiliar asignado, por lo tanto, el horario de un segundo o N tutor del curso ${el.curso} - ${el.seccion} debe ser el mismo.`,
                    });
            }

            // Verificacion de horario
            if (
                (horariosInicial2 >= horariosInicial1 && horariosInicial2 <= horariosFinal1) ||
                (horariosFinal2 >= horariosInicial1 && horariosFinal2 <= horariosFinal1)
            ) {
                // No existe traslape si son del mismo curso pero seccion diferente
                if (newHorario.codigo === el.codigo && newHorario.seccion !== el.seccion) continue;

                return (response = {
                    error: true,
                    mensaje: `Existe traslape en el curso ${newHorario.curso} - ${newHorario.seccion} con el curso ${el.curso} - ${el.seccion} en el horario de ${newHorario.horarioInicial} - ${newHorario.horarioFinal}`,
                });
            }
        }
    }

    return response;
};

module.exports = { verificacionTraslapesDia };