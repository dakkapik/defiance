import React from "react";
import { MapSideBar } from "./map-sidebar.component";
import { shallow } from "enzyme";

describe("Orders component render", () => {
  let wrapper;
  let mockSocketOff;
  let mockClearActiveDriver;
  let mockOrdersSocketOn;
  let mockOrdersSocketOff;

  beforeEach(() => {
    mockSocketOff = jest.fn();
    mockClearActiveDriver = jest.fn();
    mockOrdersSocketOn = jest.fn();
    mockOrdersSocketOff = jest.fn();
    const mockProps = {
      SocketOff: mockSocketOff,
      ClearActiveDriver: mockClearActiveDriver,
      OrdersSocketOn: mockOrdersSocketOn,
      OrdersSocketOff: mockOrdersSocketOff,
      socket: false,
      showorders: false,
    };

    wrapper = shallow(<MapSideBar {...mockProps} />);
  });

  it("should render MapSideBar component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
