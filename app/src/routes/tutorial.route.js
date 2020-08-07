const tutorials = require("../controllers/tutorial.controller.js");
const comments = require("../controllers/comment.controller.js");

const router = require("express").Router();

// Create a new Tutorial
router.post("/", tutorials.create);

// Retrieve all Tutorials
router.get("/", tutorials.findAll);

// Retrieve all published Tutorials
router.get("/published", tutorials.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", tutorials.findOne);

// Update a Tutorial with id
router.put("/:id", tutorials.update);

// Delete a Tutorial with id
router.delete("/:id", tutorials.delete);

// Create a new Tutorial
router.delete("/", tutorials.deleteAll);

// Create comment for given tutorial
router.post("/:id/comments", comments.create);

module.exports = router;
