const getSTATE_FROM_DRIVER_REDUCER = (state) => state.drivers.justadded;
/*
 let ParseOrders = {
      orders: {},
      columns: {
        "column-1": {
          id: "column-1",
          title: "Orders",
          orderIds: [],
        },
      },
      columnOrder: ["column-1"],
    };
*/

export function* RETREIVE_DATA_FROM_LISTENER() {
  const items = yield select(getSTATE_FROM_DRIVER_REDUCER);

  console.log("ADD ACTIVE DRIVER IN STORE SAGA", items);
}

export function* OnActiveDriverStart() {
  yield takeLatest(DriversActionTypes.ADD_ACTIVE_DRIVER, tester);
}

export function* driversSagas() {
  yield all([call(onDriverSocketStart)]);
}
