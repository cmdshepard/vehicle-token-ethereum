import * as types from './vehicleActionTypes';

export const manufacture = (drizzle, account, {
  vin, make, model, year,
}) => async (dispatch) => {
  try {
    await drizzle.contracts.Vehicles.methods.manufactureVehicle(
      vin, make, model, Number(year),
    ).send({ from: account });

    dispatch({ type: types.VEHICLE_MANUFACTURE_SENT });
  } catch (e) {
    dispatch({ type: types.VEHICLE_MANUFACTURE_FAILED });
  }
};

export const notifyVehicleManufactured = (tokenId, vin) => (dispatch) => dispatch({
  type: types.VEHICLE_MANUFACTURED,
  tokenId,
  vin,
});

export const vehicleManufacturedDismissed = () => (dispatch) => dispatch({
  type: types.VEHICLE_MANUFACTURED_DISMISSED,
});

export const vehicleManufactureFailureDismissed = () => (dispatch) => dispatch({
  type: types.VEHICLE_MANUFACTURE_FAILURE_DISMISSED,
});

export const fetchByVin = (drizzle, vin) => async (dispatch) => {
  let vehicle;

  try {
    const result = await drizzle.contracts.Vehicles.methods.getVehicleByVIN(vin).call();
    vehicle = {
      vin,
      tokenId: result.tokenId,
      make: result.make,
      model: result.model,
      year: result.year,
      owner: {
        address: result.owner,
        isOEM: result.isOEM,
        isDealership: result.isDealership,
      },
    };
  } catch (e) {
    vehicle = null;
  }

  dispatch({
    type: types.FETCHED_VEHICLE,
    vin,
    vehicle,
  });
};

export const transfer = (drizzle, account, vin, to) => async (dispatch) => {
  try {
    await drizzle.contracts.Vehicles.methods.transferVehicle(vin, account, to).send({
      from: account,
    });

    dispatch({ type: types.VEHICLE_TRANSFER_SENT });
  } catch (e) {
    dispatch({ type: types.VEHICLE_TRANSFER_FAILED });
  }
};

export const notifyVehicleTransferred = (from, to, tokenId) => (dispatch) => dispatch({
  type: types.VEHICLE_TRANSFERRED,
  from,
  to,
  tokenId,
});

export const transferDismissed = () => (dispatch) => dispatch({
  type: types.VEHICLE_TRANSFERRED_DISMISSED,
});

export const transferFailureDismissed = () => (dispatch) => dispatch({
  type: types.VEHICLE_TRANSFER_FAILURE_DISMISSED,
});
