import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Form,
  TextInput,
  Grid,
  Row,
  Column,
  Select,
  SelectItem,
  Button,
  Tile,
} from 'carbon-components-react';
import { WarningFilled32 } from '@carbon/icons-react';
import moment from 'moment';
import * as accountActions from '../actions/accountActions';
import * as vehicleActions from '../actions/vehicleActions';
import reduxStore from '../config/reduxStore';

const FormColumn = ({ children, fullWidth }) => (
  <Column sm={fullWidth || 4} md={fullWidth || 2} className="col">
    {children}
  </Column>
);

const ManufactureVehicleView = ({
  drizzle, drizzleState, account, vehicles, _accountActions, _vehicleActions,
}) => {
  const navigation = useHistory();
  const isOEM = account.registration.oem.isFinished;
  const currentWallet = drizzleState.accounts[account.selectedWalletIndex];
  const thisYear = moment().format('YYYY');

  const [vin, setVin] = React.useState('');
  const [make, setMake] = React.useState(account.registration.oem.name || '');
  const [model, setModel] = React.useState('');
  const [year, setYear] = React.useState(thisYear);

  const isVinValid = vin.length > 0;
  const isMakeValid = make.length > 0;
  const isModelValid = model.length > 0;
  const isFormValid = isOEM && isVinValid && isMakeValid && isModelValid;

  const yearSelections = [];

  for (let i = 0; i < 50; i += 1) {
    yearSelections.unshift((Number(thisYear) - (i + 1)).toString());
  }

  yearSelections.push(thisYear);

  for (let i = 0; i < 5; i += 1) {
    yearSelections.push((Number(thisYear) + (1 + i)).toString());
  }

  const handleManufacturePress = () => {
    if (!isFormValid) { return; }

    _vehicleActions.manufacture(drizzle, currentWallet, {
      vin, make, model, year,
    });
  };

  reduxStore.subscribe(() => {
    if (make.length < 1 && account.registration.oem.name) {
      setMake(account.registration.oem.name);
    }
  });

  React.useEffect(() => {
    if (isOEM) {
      _accountActions.fetchManufacturerName(drizzle, currentWallet);
    }
  }, [isOEM, currentWallet, _accountActions, drizzle]);

  return (
    <Grid>
      <Row>
        <FormColumn fullWidth>
          <h1>Manufacture Vehicle</h1>
          <p>Mint an ERC721 token for a newly manufactured vehicle.</p>
        </FormColumn>
      </Row>

      {!isOEM && (
        <>
          <Tile className="col">
            <Row>
              <Column max={1} className="text-center">
                <WarningFilled32 />
              </Column>

              <Column>
                <h2>You are not a manufacturer</h2>
                {/* eslint-disable-next-line max-len */}
                <p>Only manufacturers can mint vehicle tokens. Please register as a manufacturer first.</p>
              </Column>
            </Row>
          </Tile>

          <Row>
            <Column>
              <Button onClick={() => navigation.push('/register')}>Register as manufacturer</Button>
            </Column>
          </Row>
        </>
      )}

      {isOEM && (
        <Form>
          <Row>
            <FormColumn>
              <TextInput
                value={vin}
                invalid={!isVinValid}
                onChange={(e) => setVin(e.target.value)}
                labelText="VIN"
                id="vin"
              />
            </FormColumn>

            <FormColumn>
              <TextInput
                value={make}
                invalid={!isMakeValid}
                onChange={(e) => setMake(e.target.value)}
                labelText="Make"
                id="make"
              />
            </FormColumn>

            <FormColumn>
              <TextInput
                value={model}
                invalid={!isModelValid}
                onChange={(e) => setModel(e.target.value)}
                labelText="Model"
                id="model"
              />
            </FormColumn>

            <FormColumn>
              <Select
                defaultValue={thisYear}
                onChange={(e) => setYear(e.target.value)}
                id="year"
                labelText="Year"
              >
                {yearSelections.map((_) => <SelectItem key={Number(_)} text={_} value={_} />)}
              </Select>
            </FormColumn>
          </Row>

          <Row>
            <Column max={2}>
              <Button
                disabled={!isFormValid || vehicles.isManufacturing}
                onClick={handleManufacturePress}
              >
                Manufacture vehicle
              </Button>
            </Column>

            <Column max={2}>
              <Button kind="secondary" onClick={() => navigation.push('/lookup')}>Lookup vehicle</Button>
            </Column>
          </Row>
        </Form>
      )}
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  account: state.account,
  vehicles: state.vehicles,
});

const mapDispatchToProps = (dispatch) => ({
  _vehicleActions: bindActionCreators(vehicleActions, dispatch),
  _accountActions: bindActionCreators(accountActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManufactureVehicleView);
