import Fortmatic from 'fortmatic';
import Web3 from 'web3';
import Vehicles from '../contracts/Vehicles.json';

const options = {
  web3: {
    customProvider: new Web3(new Fortmatic('pk_test_91E1B2CCA46E4EC0').getProvider()),
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:7545',
    },
  },
  contracts: [Vehicles],
  events: {
    Vehicles: ['VehicleManufactured', 'Transfer', 'ManufacturerAdded', 'DealershipAdded'],
  },
};

export default options;
