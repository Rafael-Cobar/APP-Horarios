const { Router } = require("express");
const router = Router();
const cursosCT = require("../controllers/cursos.controllers");

router.get("/", cursosCT.getCursos);

module.exports = router;