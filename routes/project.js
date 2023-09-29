const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const projectCtrl = require("../controllers/projects");

router.get("/", projectCtrl.getAllProjects);
router.post("/", multer, projectCtrl.createProject);

module.exports = router;
