import {
  ACCOUNT_ROLES_FETCHED,
  WALLET_INDEX_SELECTED,
  REGISTER_AS_OEM_SENT,
  REGISTER_AS_OEM_FAILED_TO_SEND,
  REGISTER_AS_OEM_FAILED_NOTIFIED,
  REGISTERED_AS_OEM,
  REGISTER_AS_DEALER_SENT,
  REGISTER_AS_DEALER_FAILED_TO_SEND,
  REGISTER_AS_DEALER_FAILED_NOTIFIED,
  REGISTERED_AS_DEALER,
  FETCHED_OEM_NAME,
} from '../actions/accountActionTypes';

const initialState = {
  selectedWalletIndex: 0,
  registration: {
    oem: {
      name: null,
      isSending: false,
      didSendFail: false,
      isFinished: false,
    },
    dealership: {
      isSending: false,
      didSendFail: false,
      isFinished: false,
    },
  },
};

const accountReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case ACCOUNT_ROLES_FETCHED:
      newState.registration.oem.isFinished = action.result.isOEM;
      newState.registration.dealership.isFinished = action.result.isDealership;
      return newState;
    case WALLET_INDEX_SELECTED:
      newState.selectedWalletIndex = action.index;
      return newState;
    case REGISTER_AS_OEM_SENT:
      newState.registration.oem.isSending = true;
      return newState;
    case REGISTER_AS_OEM_FAILED_TO_SEND:
      newState.registration.oem.isSending = false;
      newState.registration.oem.didSendFail = true;
      return newState;
    case REGISTER_AS_OEM_FAILED_NOTIFIED:
      newState.registration.oem.didSendFail = false;
      return newState;
    case REGISTERED_AS_OEM:
      newState.registration.oem.isSending = false;
      newState.registration.oem.didSendFail = false;
      newState.registration.oem.isFinished = true;
      return newState;
    case REGISTER_AS_DEALER_SENT:
      newState.registration.dealership.isSending = true;
      return newState;
    case REGISTER_AS_DEALER_FAILED_TO_SEND:
      newState.registration.dealership.isSending = false;
      newState.registration.dealership.didSendFail = true;
      return newState;
    case REGISTER_AS_DEALER_FAILED_NOTIFIED:
      newState.registration.dealership.didSendFail = false;
      return newState;
    case REGISTERED_AS_DEALER:
      newState.registration.dealership.isSending = false;
      newState.registration.dealership.didSendFail = false;
      newState.registration.dealership.isFinished = true;
      return newState;
    case FETCHED_OEM_NAME:
      newState.registration.oem.name = action.name;
      return newState;
    default:
      return newState;
  }
};

export default accountReducer;
