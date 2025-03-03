import "react";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import CharacterList from "./components/CharacterList.jsx";
import CreateCharacterForm from "./components/CreateCharacterForm.jsx";
import EditCharacterForm from "./components/EditCharacterForm";
import API from "./API";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  // inline error alerts state
  const [error, setError] = useState("");
  // for the create a character, a boolean is used to control the display of the create a character  form
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // handle for editing(put or patch) modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCharacter, setEditCharacter] = useState(null);

  // handle for deleting a character from database
  // targets by mongoDB ID
  const handleDeleteCharacter = async (id) => {
    // additional confirmation before delete
    if (
      !window.confirm(
        "Are you sure you want to delete this Witch or Wizard from the Ministry database?"
      )
    ) {
      return;
    }
    try {
      await API.deleteCharacter(id);
      handleShowAll(); // refreshes list
    } catch (err) {
      console.error("Failed to delete profile:", err);
      setError("Could not delete selected profile. Please try again.");
    }
  };

  // handle for editing a character (when the form is opened)
  const handleEditCharacter = (character) => {
    setEditCharacter(character);
    setIsEditModalOpen(true);
  };

  // handle called after successfully updating a character in the edit modal
  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setEditCharacter(null);
    handleShowAll(); // refreshes list
  };

  // handle for search bar
  const handleSearch = async (searchTerm) => {
    setError(""); // resets any previous error
    try {
      const response = await API.fetchCharacter(searchTerm);
      setCharacters(response.data);
    } catch (err) {
      // special catch for 404 status
      if (err.response && err.response.status === 404) {
        setError("No characters found with that name.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
        console.error(err);
      }
    }
  };

  // handle for showing all characters
  const handleShowAll = async () => {
    setError(""); // resets any previous error
    try {
      const response = await API.fetchCharacter("");
      setCharacters(response.data);
    } catch (err) {
      // special catch for 404 status
      if (err.response && err.response.status === 404) {
        setError("No characters found.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
        console.error(err);
      }
    }
  };

  // handle for character creation
  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  // handle that's called after successful creation
  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false);
    handleShowAll(); // refreshes with new info
  };

  return (
    <>
      <img
        src="/images/ministryseal.png"
        alt="Ministry Seal"
        width="200px"
        height="200px"
        draggable="false"
      />
      <p>
        For official Ministry business <b>only</b>.
      </p>
      <h1>Wizard Search</h1>
      <SearchBar
        onSearch={handleSearch}
        onShowAll={handleShowAll}
        onCreate={handleCreate}
      />
      {error && <Error message={error} type="error" />}
      {characters.length > 0 && (
        <CharacterList
          characters={characters}
          onDelete={handleDeleteCharacter}
          onEdit={handleEditCharacter}
        />
      )}

      <CreateCharacterForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />

      {isEditModalOpen && (
        <EditCharacterForm
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          character={editCharacter}
          onSuccess={handleEditSuccess}
        />
      )}
    </>
  );
}

export default App;
