import { call, take, fork } from "redux-saga/effects";
import {
  DriverSocketFlow,
  connect,
  disconnect,
  Read_Emit_Or_Write_Emit,
  socketbug,
} from "./drivers.saga";

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

  test("Checking if DriverSocketFlow was called with it's methods and disconnected gracefully", () => {
    expect(generator.next(socket).value).toEqual(
      call(connect, mockGeneratorPayload.payload.name)
    );
    expect(generator.next(socket).value).toEqual(
      call(socketbug, mockGeneratorPayload.payload.name)
    );
    //disconnect gracefully
    expect(generator.next(socket).value).toEqual(
      fork(Read_Emit_Or_Write_Emit, socket)
    );
    expect(generator.next().value).toEqual(
      take(DriversActionTypes.DRIVERS_SOCKET_OFF)
    );
    expect(generator.next(socket).value).toEqual(call(disconnect, socket));
    expect(generator.next(socket).value).toEqual(call(disconnect, socket));
  });
});
