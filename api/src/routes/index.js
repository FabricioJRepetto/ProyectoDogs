const { Router } = require("express");
//const { route } = require("../app");
const router = Router();

const Dog = require("./dog.js");
const Temperament = require("./temperament.js");

router.use("/dogs", Dog);
router.use("/temperament", Temperament);

module.exports = router;
