let page = 1;
const URL = 'https://rickandmortyapi.com/api';
const CHARACTERS = `${URL}/character`;
const LOCATIONS = `${URL}/location`;
const EPISODES = `${URL}/episode`;
// const CHARACTERS_PAGE = `${CHARACTERS}/?page=${page}`;
// const LOCATIONS_PAGE = `${LOCATIONS}/?page=${page}`;
// const EPISODES_PAGE = `${EPISODES}/?page=${page}`;

export default {
  page,
  URL,
  CHARACTERS,
  LOCATIONS,
  EPISODES,
};
