const router = require("express").Router();
const {
  getAllCharacters,
  getCharacterByID,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} = require("../controller/characterController");

// GET method
router.get("/", getAllCharacters);

// POST method
router.post("/", createCharacter);

// GET by ID method
router.get("/:id", getCharacterByID);

// PUT by ID method
router.put("/:id", updateCharacter);
router.patch("/:id", updateCharacter);


// DELETE by ID method
router.delete("/:id", deleteCharacter);

module.exports = router;

