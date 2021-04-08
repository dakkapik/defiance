import { call, put, takeLatest, all } from "redux-saga/effects";
import { setSocket, onSetSocket, socketSagas } from "./socket.saga";
import { socketOn } from "./socket.action";
import { Connect_To_Socket_With_StoreId } from "./socket.utils";
import SocketActionTypes from "./socket.types";

describe("Socket generator function\n", () => {
  const mockGeneratorPayload = { payload: { storeId: "psq-1" } };
  const generator = setSocket(mockGeneratorPayload);
  it(" should call the socket function", () => {
    expect(generator.next().value).toEqual(
      call(Connect_To_Socket_With_StoreId, {
        storeId: "psq-1",
      })
    );
  });

  it(" should put the socket object in the socket reducer", () => {
    let MockSocketObject = {};
    expect(generator.next(MockSocketObject).value).toEqual(
      put(socketOn(MockSocketObject))
    );
  });
});

//REDO TEST
// describe("Should Trigger reDO TEST ", () => {
//   it("should be test", () => {
//     const generator = onSetSocket();
//     expect(generator.next().value).toEqual(
//       takeLatest(SocketActionTypes.~!1231239SAJCNAMSJI, setSocket)
//     );
//   });
// });

// describe("Should test the root Socket saga", () => {
//   it("should be test", () => {
//     const generator = socketSagas();
//     expect(generator.next().value).toEqual(all([call(onSetSocket)]));
//   });
// });
