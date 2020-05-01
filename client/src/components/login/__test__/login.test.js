/* eslint-disable no-undef */
import React from "react";
import LoginSide from "../login";
import { shallow } from "enzyme";

it("Login Component renders without crashing", () => {
  const props = {
    isLoggingIn: false,
    loginError: false,
    isAuthenticated: false
  };
  const wrapper = shallow(<LoginSide {...props} />);
  expect(wrapper).toMatchSnapshot();
});
