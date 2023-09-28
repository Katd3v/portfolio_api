const express = require("express");
const router = express.Router();
const skillCtrl = require("../controllers/skills");

router.get("/", skillCtrl.getAllSkills);
router.post("/", skillCtrl.createSkill);

module.exports = router;
