import { call, take } from "redux-saga/effects";
import { DriverSocketFlow, connect, disconnect } from "./drivers.saga";

import io from "socket.io-client";
import MockedSocket from "socket.io-mock";

import DriversActionTypes from "./drivers.types";

//Uses Jest
jest.mock("socket.io-client");

describe("DriverSocketFlow failed REASON:\n", () => {
  let socket;
  beforeEach(() => {
    socket = new MockedSocket();
    io.mockReturnValue(socket);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const mockGeneratorPayload = { payload: { name: "Royal Palms" } };
  const generator = DriverSocketFlow(mockGeneratorPayload);
  test("Checking if the saga was caled", () => {
    expect(generator.next().value).toEqual(
      call(connect, mockGeneratorPayload.payload.name)
    );
  });
  test("\nCall SocketOff action to prevent infinite loop\n also call disconnect to prevent memory leaks!", () => {
    console.log("SocketOffAction and  disconnect()");
    expect(generator.next(socket).value).toEqual(
      take(DriversActionTypes.DRIVERS_SOCKET_OFF)
    );
    expect(generator.next().value).toEqual(call(disconnect, socket));
  });
});
