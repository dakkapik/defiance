import SocketActionTypes from "./socket.types";
import socketReducer from "./socket.reducer";

//https://www.youtube.com/watch?v=UOGxfvNwv-8
describe("socketReducer", () => {
  const defaultState = {
    socket: {},
    socketToggle: false,
    socketStoreName: "",
  };
  it("should return default state", () => {
    const newState = socketReducer(undefined, {});
    expect(newState).toEqual(defaultState);
  });

  // it("should return new state if receiving type STORE IN SOCKET", () => {
  //   const mockStorePayload = "psq-1";
  //   // we pass a payload to the reducer and expect a new state
  //   const newState = socketReducer(undefined, {
  //     type: SocketActionTypes.!*#&*!?>AD,
  //     payload: mockStorePayload,
  //   });
  //   const expectedState = {
  //     ...defaultState,
  //     socketToggle: true,
  //     socketStoreName: "psq-1",
  //   };
  //   // //we mimick the returned object from the reducer by calling the functions from utlis
  //   expect(newState).toEqual(expectedState);
  // });
  it("should return new state if receiving type SOCKET_ON", () => {
    const mockSocket = {};
    // we pass a payload to the reducer and expect a new state
    const newState = socketReducer(undefined, {
      type: SocketActionTypes.SOCKET_ON,
      payload: mockSocket,
    });

    const expectedState = {
      ...defaultState,
    };
    expect(newState).toEqual(expectedState);
  });
  it("should return new state if receiving type SOCKET_OFF", () => {
    const mocksocketToggleOff = false;
    // we pass a payload to the reducer and expect a new state
    const newState = socketReducer(undefined, {
      type: SocketActionTypes.SOCKET_OFF,
      payload: mocksocketToggleOff,
    });

    const expectedState = {
      ...defaultState,
    };
    expect(newState).toEqual(expectedState);
  });
});
