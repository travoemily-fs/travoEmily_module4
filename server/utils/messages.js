const messages = {
// character messages
    characterNotFound: (id) => `Character with ID ${id} not found.`,
    noCharactersFound: "No characters found in the database.", 
    characterCreated: "Character created successfully.",
    characterExists: "A character with this name already exists.",
    characterUpdated: "Character updated successfully.", 
    characterDeleted: "Character deleted successfully.",
    characterCreationFailed: "Failed to create character. Check your input.",
    characterUpdateFailed: "Failed to update character.",
    characterDeleteFailed: "Failed to delete character.",
  
// house messages
    houseNotFound: (id) => `House with ID ${id} not found.`,
    houseCreated: "House created successfully.",
    houseUpdated: "House updated successfully.",
    houseDeleted: "House deleted successfully.",
    houseCreationFailed: "Failed to create House. Check your input.",
    houseUpdateFailed: "Failed to update House.",
    houseDeleteFailed: "Failed to delete House.",
  
// server messages
    serverError: "The server is experiencing an issue. Try again.",
  };
  
  module.exports = messages;
  