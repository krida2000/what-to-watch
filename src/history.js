import {createBrowserHistory} from "history";

const DefRoute = {
  AUTH: `/authorization`,
  ROOT: `/`,
  MOVIE_PAGE: `/films/`
};

const history = createBrowserHistory();

export default history;
export {DefRoute};
