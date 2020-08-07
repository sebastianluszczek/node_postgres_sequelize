const db = require("../models");
const Tutorial = db.tutorials;
const Tag = db.tags;
const { ErrorHandler } = require("../helpers/errors.helper");

exports.create = async (req, res, next) => {
  try {
    const response = await Tag.create({
      name: req.body.data.name,
    });
    res.json({ data: response });
  } catch (err) {
    next(err);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const response = await Tag.findAll({
      include: [
        {
          model: Tutorial,
          as: "tutorials",
          attributes: ["id", "title", "description"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.json({ data: response });
  } catch (err) {
    next(err);
  }
};

exports.findById = async (req, res, next) => {
  try {
    const id = req.params.tagId;
    const response = await Tag.findByPk(id, {
      include: [
        {
          model: Tutorial,
          as: "tutorials",
          attributes: ["id", "title", "description"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.json({ data: response });
  } catch (err) {
    next(err);
  }
};

exports.addTutorial = async (req, res, next) => {
  try {
    const tagId = req.params.tagId;
    const tutorialId = req.params.tutId;
    const tagResponse = await Tag.findByPk(tagId);
    console.log(tagResponse);
    if (!tagResponse) {
      throw new ErrorHandler(404, "Tag not found");
    }
    const tutResponse = await Tutorial.findByPk(tutorialId);
    console.log(tutResponse);
    if (!tutResponse) {
      throw new ErrorHandler(404, "Tutorial not found");
    }
    tagResponse.addTutorial(tutResponse);
    res.json({ data: tagResponse });
  } catch (err) {
    next(err);
  }
};
