const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({ Mensaje: "API - NODEJS - Rafael" });
});

module.exports = router;