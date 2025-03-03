const Houses = require("../models/Houses");
const messages = require("../utils/messages");
const mongoose = require("mongoose");

// GET all houses
exports.getAllHouses = async (req, res) => {
  try {
    // begin new 3.4 content
    const filter = {};
    if (req.query.ghost) {
      filter.ghost = { $in: [req.query.ghost.trim()] };
    }
    if (req.query.notFounder) {
      filter.founder = { $ne: req.query.notFounder.trim() };
    }

    // new mongoose query for filtering
    let query = Houses.find(filter);

    // using SELECT param to include or exclude fields
    if (req.query.select) {
      // remove the comma from spacing
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    } else {
      // default exclude version
      query = query.select("-__v");
    }

    // SORT logic
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }

    // PAGINATION logic
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    const houses = await query;

    // get the total doc count
    const totalDocuments = await Houses.countDocuments(filter);

    // end new 3.4 content
    res.status(200).json({
      success: true,
      data: houses,
      message: `${req.method} - Retrieved all Hogwarts Houses.`,
      currentPage: page,
      totalPages: Math.ceil(totalDocuments / limit),
      totalDocuments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};

// GET houses by ID
exports.getHouseByID = async (req, res) => {
  try {
    const { id } = req.params;
    const house = await Houses.findById(id).select("-__v");

    if (!house) {
      return res.status(404).json({
        success: false,
        message: messages.houseNotFound(id),
      });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format. Please provide a valid ObjectId.",
      });
    }

    res.status(200).json({
      data: house,
      success: true,
      message: `${req.method} - Retrieved specific Hogwarts House.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: messages.serverError,
      error: error.message,
    });
  }
};

// POST house
exports.createHouse = async (req, res) => {
  try {
    const newHouse = await Houses.create(req.body);
    res.status(201).json({
      data: newHouse,
      success: true,
      message: messages.houseCreated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: messages.houseCreationFailed,
      error: error.message,
    });
  }
};

// PUT (update) house
exports.updateHouse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        success: false,
        message: messages.emptyUpdateBody,
      });
    }
    const existingHouse = await Houses.findById(id);
    if (!existingHouse) {
      return res.status(404).json({
        success: false,
        message: messages.houseNotFound(id),
      });
    }
    const updatedHouse = await Houses.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).select("-__v");

    res.status(200).json({
      data: updatedHouse,
      success: true,
      message: messages.houseUpdated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: messages.houseUpdateFailed,
      error: error.message,
    });
  }
};

// DELETE house
exports.deleteHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Houses.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: messages.houseNotFound(id),
      });
    }

    res.status(200).json({
      data: deleted,
      success: true,
      message: messages.houseDeleted,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: messages.houseDeleteFailed,
      error: error.message,
    });
  }
};
