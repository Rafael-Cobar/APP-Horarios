const { Router } = require("express");
const router = Router();
const horarioCT = require("../controllers/horarios.controllers");

router.post("/", horarioCT.postHorario);
router.get("/", horarioCT.getHorarios);
router.get("/:id", horarioCT.getHorario);
router.patch("/:id", horarioCT.patchHorario);
router.delete("/:id", horarioCT.deleteHorario);

module.exports = router;