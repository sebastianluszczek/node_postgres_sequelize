const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;
const { ErrorHandler } = require('../helpers/errors.helper');

// Create and Save a new Tutorial
exports.create = async (req, res, next) => {
    try {
        // Validate request
        if (!req.body.title) {
            throw new ErrorHandler(400, "Content can not be empty!")
        }

        // Create a Tutorial
        const tutorial = {
            title: req.body.title,
            description: req.body.description,
            published: req.body.published ? req.body.published : false
        };

        const response = await Tutorial.create(tutorial);
        res.status(201).json(response)
    } catch (err) {
        next(err)
    }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    try {
        const title = req.query.title;
        var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

        const response = await Tutorial.findAll({ where: condition });
        res.json(response)
    } catch (err) {
        next(err)
    }
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;

        const response = await Tutorial.findByPk(id)
        console.log(response)
        res.json({ response })
    } catch (err) {
        next(err)
    }
};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
    try {
        const id = req.params.id;

        const response = await Tutorial.update(req.body, { where: { id: id } })

        if (response == 1) {
            res.status(204).json({message: "Tutorial was updated successfully."});
        } else {
            throw new ErrorHandler(400, `Cannot update Tutorial with id=${id}.`)
        }
    } catch (err) {
        next(err)
    }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        const response = await Tutorial.destroy({ where: { id: id } })
        if (response == 1) {
            res.status(204).json({message: "Tutorial was deleted successfully."});
        } else {
            throw new ErrorHandler(400, `Cannot delete Tutorial with id=${id}.`)
        }
    } catch (err) {
        next(err)
    }
};

// Delete all Tutorials from the database.
exports.deleteAll = async (req, res) => {
    try {
        const response = await Tutorial.destroy({
            where: {},
            truncate: false
        })
        res.status(204).json({ message: `${response} Tutorials were deleted successfully!` });
    } catch (err) {
        next(err)
    }
};

// Find all published Tutorials
exports.findAllPublished = async (req, res) => {
    try {
        const response = await Tutorial.findAll({ where: { published: true } });
        res.json({ data: response })
    } catch (err) {
        next(err)
    }
};
