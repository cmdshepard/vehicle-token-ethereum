import reduxStore from './reduxStore';
import * as accountActions from '../actions/accountActions';
import * as vehicleActions from '../actions/vehicleActions';

const contractEventDispatcher = (drizzleStore, e) => {
  const { account } = reduxStore.getState();
  const { accounts } = drizzleStore.getState();

  const selectedWalletAddress = accounts[account.selectedWalletIndex];

  switch (e.event) {
    case 'VehicleManufactured':
      reduxStore.dispatch(vehicleActions.notifyVehicleManufactured(
        e.returnValues.token,
        e.returnValues.vin,
      ));
      break;
    case 'ManufacturerAdded':
      if (e.returnValues.id === selectedWalletAddress) {
        reduxStore.dispatch(accountActions.manufacturerRegistered());
      }
      break;
    case 'DealershipAdded':
      if (e.returnValues.id === selectedWalletAddress) {
        reduxStore.dispatch(accountActions.dealershipRegistered());
      }
      break;
    case 'Transfer':
      if (e.returnValues.from === selectedWalletAddress) {
        reduxStore.dispatch(vehicleActions.notifyVehicleTransferred(
          e.returnValues.from,
          e.returnValues.to,
          e.returnValues.tokenId,
        ));
      }
      break;
    default:
  }
};

export default contractEventDispatcher;
