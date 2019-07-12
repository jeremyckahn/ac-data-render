import React from "react";
import { shallow } from "enzyme";
import App from "./App";

let component;

beforeEach(() => {
  component = shallow(<App />);
});

test("boots", () => {
  expect(component).toHaveLength(1);
});
