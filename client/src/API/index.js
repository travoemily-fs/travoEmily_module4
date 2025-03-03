import axios from "axios";

const API = Object.create(null);

// GET method
API.fetchCharacter = async (searchTerm) => {
  // encoded postman get request, see comments below
  const query = searchTerm ? `?name=${encodeURIComponent(searchTerm)}` : "";
  const response = await axios.get(
    `http://localhost:3000/api/v1/characters/${query}`
  );
  console.log(response.data);
  return response.data;
};

// POST method
API.createCharacter = async (characterData) => {
  const response = await axios.post(
    "http://localhost:3000/api/v1/characters",
    characterData
  );
  console.log(response.data);
  return response.data;
};

// DELETE method
API.deleteCharacter = async (id) => {
  const response = await axios.delete(
    `http://localhost:3000/api/v1/characters/${id}`
  );
  console.log(response.data);
  return response.data;
};

// PUT/PATCH method
API.updateCharacter = async (id, updatedData) => {
  const response = await axios.put(
    `http://localhost:3000/api/v1/characters/${id}`,
    updatedData
  );
  console.log(response.data);
  return response.data;
};

export default API;

//**
// starting endpoint:
// http://localhost:3000/api/v1/characters?name=harry%20potter
// BECOMES...
// `?name=${encodedURIComponent(searchTerm)}`
//
// searchTerm refers to what the user types in, for example...
// if you search for "harry"
// it's just like sending the get request with filter params name=harry!
//
// we add in %20potter to account for users typing in harry's full name or spacing or punctuation marks that would break the url... which we don't want!
//
// source: mdn docs
//  */
