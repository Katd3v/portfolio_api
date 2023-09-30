const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const sharp = require("../middleware/sharp");
const projectCtrl = require("../controllers/projects");

router.get("/", projectCtrl.getAllProjects);
router.post("/", multer, sharp, projectCtrl.createProject);

module.exports = router;
