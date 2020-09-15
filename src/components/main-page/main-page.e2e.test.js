import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MainPage from "./main-page.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Welcome-screen button click work correctly`, () => {
  const clickHandler = jest.fn();
  const app = shallow(<MainPage movies={[`test`]} onMovieTitleClick={clickHandler}/>);

  const movieTitle = app.find(`p`);
  movieTitle.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
