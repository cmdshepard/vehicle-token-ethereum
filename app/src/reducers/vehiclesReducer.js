import * as actions from '../actions/vehicleActionTypes';

const initialState = {
  isManufacturing: false,
  isManufactured: false,
  didManufactureFail: false,
  isTransferring: false,
  isTransferred: false,
  didTransferFail: false,
  vehicles: {},
};

const vehiclesReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case actions.VEHICLE_MANUFACTURE_SENT:
      newState.isManufacturing = true;
      newState.isManufactured = false;
      newState.didManufactureFail = false;
      return newState;
    case actions.VEHICLE_MANUFACTURED:
      newState.isManufacturing = false;
      newState.isManufactured = true;
      newState.didManufactureFail = false;
      return newState;
    case actions.VEHICLE_MANUFACTURED_DISMISSED:
      newState.isManufacturing = false;
      newState.isManufactured = false;
      newState.didManufactureFail = false;
      return newState;
    case actions.VEHICLE_MANUFACTURE_FAILED:
      newState.isManufacturing = false;
      newState.isManufactured = false;
      newState.didManufactureFail = true;
      return newState;
    case actions.VEHICLE_MANUFACTURE_FAILURE_DISMISSED:
      newState.isManufactured = false;
      newState.isManufacturing = false;
      newState.didManufactureFail = false;
      return newState;
    case actions.FETCHED_VEHICLE:
      newState.vehicles[action.vin] = action.vehicle;
      return newState;
    case actions.VEHICLE_TRANSFER_SENT:
      newState.isTransferring = true;
      newState.isTransferred = false;
      newState.didTransferFail = false;
      return newState;
    case actions.VEHICLE_TRANSFERRED:
      newState.isTransferring = false;
      newState.isTransferred = true;
      newState.didTransferFail = false;
      return newState;
    case actions.VEHICLE_TRANSFERRED_DISMISSED:
      newState.isTransferred = false;
      return newState;
    case actions.VEHICLE_TRANSFER_FAILED:
      newState.isTransferring = false;
      newState.isTransferred = false;
      newState.didTransferFail = true;
      return newState;
    case actions.VEHICLE_TRANSFER_FAILURE_DISMISSED:
      newState.didTransferFail = false;
      return newState;
    default:
      return newState;
  }
};

export default vehiclesReducer;
