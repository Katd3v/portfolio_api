const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const sharp = require("../middleware/sharp");
const auth = require("../middleware/auth");
const projectCtrl = require("../controllers/projects");

router.get("/", projectCtrl.getAllProjects);
router.post("/", auth, multer, sharp, projectCtrl.createProject);

module.exports = router;
