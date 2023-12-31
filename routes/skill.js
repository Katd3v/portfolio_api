const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const sharp = require("../middleware/sharp");
const auth = require("../middleware/auth");
const skillCtrl = require("../controllers/skills");

router.get("/", skillCtrl.getAllSkills);
router.post("/", auth, multer, sharp, skillCtrl.createSkill);

module.exports = router;
