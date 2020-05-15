import {
  ACCOUNT_ROLES_FETCHED,
  REGISTER_AS_OEM_SENT,
  REGISTER_AS_OEM_FAILED_TO_SEND,
  REGISTER_AS_OEM_FAILED_NOTIFIED,
  REGISTERED_AS_OEM,
  REGISTER_AS_DEALER_SENT,
  REGISTER_AS_DEALER_FAILED_TO_SEND,
  REGISTER_AS_DEALER_FAILED_NOTIFIED,
  REGISTERED_AS_DEALER,
  WALLET_INDEX_SELECTED,
  FETCHED_OEM_NAME,
} from './accountActionTypes';

export const setSelectedWalletIndex = (index) => (dispatch) => dispatch({
  type: WALLET_INDEX_SELECTED,
  index,
});

export const registerAsManufacturer = (drizzle, account, payload) => async (dispatch) => {
  try {
    await drizzle.contracts.Vehicles.methods.addManufacturer(payload.name).send({
      from: account,
    });

    dispatch({ type: REGISTER_AS_OEM_SENT });
  } catch (e) {
    dispatch({ type: REGISTER_AS_OEM_FAILED_TO_SEND });
  }
};

export const registrationAsManufacturerFailureNotified = () => (dispatch) => dispatch({
  type: REGISTER_AS_OEM_FAILED_NOTIFIED,
});

export const manufacturerRegistered = () => (dispatch) => dispatch({
  type: REGISTERED_AS_OEM,
});

export const registerAsDealership = (drizzle, account, payload) => async (dispatch) => {
  try {
    await drizzle.contracts.Vehicles.methods.addDealership(payload.name).send({
      from: account,
    });

    dispatch({ type: REGISTER_AS_DEALER_SENT });
  } catch (e) {
    dispatch({ type: REGISTER_AS_DEALER_FAILED_TO_SEND });
  }
};

export const registrationAsDealershipFailureNotified = () => (dispatch) => dispatch({
  type: REGISTER_AS_DEALER_FAILED_NOTIFIED,
});

export const dealershipRegistered = () => (dispatch) => dispatch({
  type: REGISTERED_AS_DEALER,
});

export const fetchAccountRoles = (drizzle, account) => async (dispatch) => {
  try {
    const result = await drizzle.contracts.Vehicles.methods.getRoles(account).call();

    dispatch({
      type: ACCOUNT_ROLES_FETCHED,
      result,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

export const fetchManufacturerName = (drizzle, account) => async (dispatch) => {
  try {
    const result = await drizzle.contracts.Vehicles.methods.getManufacturer(account).call();

    dispatch({
      type: FETCHED_OEM_NAME,
      name: result,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};
