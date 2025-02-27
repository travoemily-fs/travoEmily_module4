const router = require("express").Router();
const {
  getAllHouses,
  getHouseByID,
  createHouse,
  updateHouse,
  deleteHouse,
} = require("../controller/houseController");

// GET method
router.get("/", getAllHouses);

// POST method
router.post("/", createHouse);

// GET by ID method
router.get("/:id", getHouseByID);

// PUT by ID method
router.put("/:id", updateHouse);

// DELETE by ID method
router.delete("/:id", deleteHouse);

module.exports = router;