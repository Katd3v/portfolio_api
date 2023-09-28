const express = require("express");
const router = express.Router();
const projectCtrl = require("../controllers/projects");

router.get("/", projectCtrl.getAllProjects);
router.post("/", projectCtrl.createProject);

module.exports = router;
