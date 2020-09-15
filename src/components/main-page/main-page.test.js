import React from "react";
import renderer from "react-test-renderer";
import MainPage from "./main-page.jsx";

it(`Main page screen correctly render`, () => {
  const tree = renderer
      .create(
          <MainPage movies={[`test`]}/>).toJSON();

  expect(tree).toMatchSnapshot();
}
);
