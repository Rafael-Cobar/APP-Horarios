const fs = require("fs");
const { v4: uuid } = require("uuid");

const jsonHorariosInit = fs.readFileSync("src/db/horarios.json", "utf-8");
let horarios = JSON.parse(jsonHorariosInit);

//---------------------------------------------------------------------------------------------
const postHorario = async(req, res) => {
    const { dia, horarioInicial, horarioFinal, tutor, carnet, curso, codigo, seccion, semestre } = req.body;
    // validaciones

    let newHorario = { id: uuid(), dia, horarioInicial, horarioFinal, tutor, curso, seccion, codigo, semestre };

    agregarHorario(newHorario);

    const jsonHorarios = JSON.stringify(horarios);
    fs.writeFileSync("src/db/horarios.json", jsonHorarios, "utf-8");

    res.status(201).json(jsonResponseCorrecto("Horario Almacenado correctamente"));
};

//---------------------------------------------------------------------------------------------
const getHorarios = async(req, res) => {};

//---------------------------------------------------------------------------------------------
const getHorario = async(req, res) => {};

//---------------------------------------------------------------------------------------------
const deleteHorario = async(req, res) => {
    const { id } = req.params;
    horarios = horarios.filter((horario) => horario.id !== id);

    const jsonHorarios = JSON.stringify(horarios);
    fs.writeFileSync("src/db/horarios.json", jsonHorarios, "utf-8");
};

//---------------------------------------------------------------------------------------------
const patchHorario = async(req, res) => {
    const { id } = req.params;
};

//---------------------------------------------------------------------------------------------
const jsonResponseCorrecto = (mensaje, data = []) => {
    return { error: false, data, mensaje };
};

const jsonResponseError = (mensaje, data = []) => {
    return { error: true, data, mensaje };
};

//---------------------------------------------------------------------------------------------
const agregarHorario = (newHorario) => {
    switch (newHorario.dia) {
        case 1:
            horarios.lunes.push(newHorario);
            break;
        case 2:
            horarios.martes.push(newHorario);
            break;
        case 3:
            horarios.miercoles.push(newHorario);
            break;
        case 4:
            horarios.jueves.push(newHorario);
            break;
        case 5:
            horarios.viernes.push(newHorario);
            break;
        case 6:
            horarios.sabado.push(newHorario);
            break;
        default:
            break;
    }
};

module.exports = {
    postHorario,
    getHorarios,
    getHorario,
    deleteHorario,
    patchHorario,
};