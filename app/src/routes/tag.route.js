const tutorials = require("../controllers/tutorial.controller.js");
const tags = require("../controllers/tag.controller.js");

const router = require("express").Router();

// Create a new Tag
router.post("/", tags.create);

// Retrieve all Tags
router.get("/", tags.findAll);

// Retrieve Tag by id
router.get("/:id", tags.findById);

// Retrieve Tag by id
router.post("/:tagId/tutorials/:tutId", tags.addTutorial);

module.exports = router;
