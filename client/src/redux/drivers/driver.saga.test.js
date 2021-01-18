import { call, take, fork } from "redux-saga/effects";
import {
  DriverSocketFlow,
  connect,
  disconnect,
  Read_Emit_Or_Write_Emit,
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

  test("Checking if the saga was caled", () => {
    expect(generator.next().value).toEqual(
      call(connect, mockGeneratorPayload.payload.name)
    );
  });

  test("Expect it to read or write emit and disconnect and cancle successfully", () => {
    expect(generator.next(socket).value).toEqual(
      fork(Read_Emit_Or_Write_Emit, socket)
    );
    //close DriverSaga
    expect(generator.next().value).toEqual(
      take(DriversActionTypes.DRIVERS_SOCKET_OFF)
    );
    expect(generator.next(socket).value).toEqual(call(disconnect, socket));
  });
});
