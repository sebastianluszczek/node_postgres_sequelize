const db = require("../models");
const Tutorial = db.tutorials;
const Comment = db.comments;
const Op = db.Sequelize.Op;
const { ErrorHandler } = require('../helpers/errors.helper');
const { commentValidator } = require('../helpers/validation.helper');

// Create and Save a new Comment for given Tutorial
exports.create = async (req, res, next) => {
    try {
        const tutorialId = req.params.id;
        // Validate request
        const { error } = commentValidator(req.body.data);
        if (error) {
            throw new ErrorHandler(400, error.details[0].message)
        }

        // Create new Comment
        const comment = {
            name: req.body.data.name,
            text: req.body.data.text,
            tutorialId: tutorialId
        }

        const response = await Comment.create(comment);
        res.status(201).json({ data: response })
    } catch (err) {
        next(err)
    }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res, next) => {
    try {
        const id = req.params.id;

        const response = await Tutorial.findByPk(id)
        res.json({ data: response })
    } catch (err) {
        next(err)
    }
};