import React from "react";
import { StoreList } from "./store-list.component";
import { shallow } from "enzyme";

const stores = [
  {
    location: { lat: 26.260501899508107, lng: -80.26398159301463 },
    manager: false,
    name: "Royal Palm",
    storeId: "psq1",
    __v: 0,
    _id: "60410e74be5b952498d3a376",
  },
  {
    location: { lat: 26.28667161574308, lng: -80.19981841629402 },
    manager: false,
    name: "Coconut Creek",
    storeId: "psq2",
    __v: 0,
    _id: "60410f737d208b79e88b2bc3",
  },
  {
    location: { lat: 26.29833880868759, lng: -80.27676612767324 },
    manager: false,
    name: "Haron Bay",
    storeId: "psq3",
    __v: 0,
    _id: "60410f947d208b79e88b2bc4",
  },
  {
    location: { lat: 26.028871713486605, lng: -80.37106942245414 },
    manager: false,
    name: "Pembroke Pines",
    storeId: "psq4",
    __v: 0,
    _id: "60410faf7d208b79e88b2bc5",
  },
];

describe("StoreList component render", () => {
  let wrapper;

  let mocktriggerStores;

  beforeEach(() => {
    mocktriggerStores = jest.fn();

    const mockProps = {
      stores: stores,
      fetchApiStoreListUseEffect: mocktriggerStores,
    };

    wrapper = shallow(<StoreList {...mockProps} />);
  });

  it("should render StoreList component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
