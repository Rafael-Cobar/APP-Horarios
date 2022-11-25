const fs = require("fs");
const { v4: uuid } = require("uuid");

const jsonCursos = fs.readFileSync("src/db/cursos.json", "utf-8");
let cursos = JSON.parse(jsonCursos);

//---------------------------------------------------------------------------------------------
const getCursos = async(req, res) => {
    res.status(200).json(jsonResponseCorrecto("", cursos));
};

//---------------------------------------------------------------------------------------------
const jsonResponseCorrecto = (mensaje, data = []) => {
    return { error: false, data, mensaje };
};

module.exports = { getCursos };