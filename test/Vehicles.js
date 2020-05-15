/* eslint-disable */
const Vehicles = artifacts.require('Vehicles');
const faker = require('faker');

const VIN = faker.random.uuid();

describe('Vehicles Contract', () => {

  let accounts;
  let manufacturer;
  let dealership;
  let consumer;
  let instance;

  before(() => new Promise(((resolve, reject) => {
    contract('Vehicles', async (accs) => {
      accounts = accs;
      manufacturer = accs[0];
      dealership = accs[1];
      consumer = accs[2];
      instance = await Vehicles.deployed().catch(reject);
      resolve();
    });
  })));

  describe('Manufacturer Registration', () => {
    it('should add the account as a manufacturer', async () => {
      const name = faker.lorem.word();
      await instance.addManufacturer(name, { from: manufacturer });
      const result = await instance.getManufacturer.call(manufacturer);
      assert.equal(result, name);
    });
  });

  describe('Dealership Registration', () => {
    it('should add the account as a dealership', async () => {
      const name = faker.lorem.word();
      await instance.addDealership(name, { from: dealership });
      const result = await instance.getDealership.call(dealership);
      assert.equal(result, name);
    });
  });

  describe('Vehicle Manufacturing', () => {
    const mockVehicle = () => ({
      vin: VIN,
      make: faker.lorem.word(),
      model: faker.lorem.word(),
      year: 2020
    });

    it('should mint a token for a vehicle', async () => {
      const {
        vin, make, model, year,
      } = mockVehicle();

      await instance.manufactureVehicle(vin, make, model, year, { from: manufacturer });
      const result = await instance.getVehicleByVIN(vin, { from: manufacturer });

      assert.equal(result.make, make);
      assert.equal(result.model, model);
      assert.equal(result.year, year);
    });
  });

  describe('Vehicle Transferring', () => {
    it('should transfer the vehicle to the dealership', async () => {
      await instance.transferVehicle(VIN, manufacturer, dealership, { from: manufacturer });
      const { owner } = await instance.getVehicleByVIN(VIN, { from: dealership });
      assert.equal(owner, dealership);
    });

    it('should transfer the vehicle to the consumer', async () => {
      await instance.transferVehicle(VIN, dealership, consumer, { from: dealership });
      const { owner } = await instance.getVehicleByVIN(VIN, { from: consumer });
      assert.equal(owner, consumer);
    });
  });

});
