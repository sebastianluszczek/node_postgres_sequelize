const db = require("../models");
const Tutorial = db.tutorials;
const Tag = db.tags;
const Comment = db.comments;
const Op = db.Sequelize.Op;
const { ErrorHandler } = require("../helpers/errors.helper");
const { tutorialValidator } = require("../helpers/validation.helper");

// Create and Save a new Tutorial
exports.create = async (req, res, next) => {
  try {
    // Validate request
    const { error } = tutorialValidator(req.body.data);
    if (error) {
      throw new ErrorHandler(400, error.details[0].message);
    }

    // Create a Tutorial
    const tutorial = {
      title: req.body.data.title,
      description: req.body.data.description,
      published: req.body.data.published ? req.body.data.published : false,
    };

    const response = await Tutorial.create(tutorial);
    res.status(201).json({ data: response });
  } catch (err) {
    next(err);
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res, next) => {
  try {
    const title = req.query.title;

    const response = await Tutorial.findAll({
      include: [
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "name", "text"],
        },
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
          // through: {
          //   attributes: ["tag_id", "tutorial_id"],
          // },
        },
      ],
    });
    res.json({ data: response });
  } catch (err) {
    next(err);
  }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res, next) => {
  try {
    const id = req.params.id;

    const response = await Tutorial.findByPk(id, {
      include: [
        "comments",
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
          // through: {
          //   attributes: ["tag_id", "tutorial_id"],
          // },
        },
      ],
    });
    res.json({ data: response });
  } catch (err) {
    next(err);
  }
};

// Update a Tutorial by the id in the request
exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Validate request
    const { error } = tutorialValidator(req.body.data);
    if (error) {
      throw new ErrorHandler(400, error.details[0].message);
    }

    const response = await Tutorial.update(req.body, { where: { id: id } });

    if (response == 1) {
      res.status(200).json({ message: "Tutorial was updated successfully." });
    } else {
      throw new ErrorHandler(400, `Cannot update Tutorial with id=${id}.`);
    }
  } catch (err) {
    next(err);
  }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;

    const response = await Tutorial.destroy({ where: { id: id } });
    if (response == 1) {
      res.status(200).json({ message: "Tutorial was deleted successfully." });
    } else {
      throw new ErrorHandler(400, `Cannot delete Tutorial with id=${id}.`);
    }
  } catch (err) {
    next(err);
  }
};

// Delete all Tutorials from the database.
exports.deleteAll = async (req, res, next) => {
  try {
    const response = await Tutorial.destroy({
      where: {},
      truncate: false,
    });
    res
      .status(200)
      .json({ message: `${response} Tutorials were deleted successfully!` });
  } catch (err) {
    next(err);
  }
};

// Find all published Tutorials
exports.findAllPublished = async (req, res, next) => {
  try {
    const response = await Tutorial.findAll({ where: { published: true } });
    res.json({ data: response });
  } catch (err) {
    next(err);
  }
};
