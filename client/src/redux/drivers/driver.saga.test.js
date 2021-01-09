import { call } from "redux-saga/effects";
import { DriverSocketFlow, connect } from "./drivers.saga";
//Uses Jest
describe("Testing sagas with Jest", () => {
  it("should test the sagas", async () => {
    const mockGeneratorPayload = { payload: { name: "Royal Palms" } };
    const generator = DriverSocketFlow(mockGeneratorPayload);

    await expect(
      connect().then((res) => res.disconnect())
    ).resolves.toBeDefined();
  });
});
