const express = require("express");
const getResponse = require("../controllers/ai.controller.js");
const router = express.Router();

router.post("/get-response", getResponse);

module.exports = router;
