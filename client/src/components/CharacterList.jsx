import "react";
import Character from "./Character.jsx";

function CharacterList({ characters, onDelete, onEdit }) {
  return (
    <>
      <h3>
        {characters.map((characterObj) => (
          <Character
            key={characterObj._id}
            character={characterObj}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </h3>
    </>
  );
}
export default CharacterList;
