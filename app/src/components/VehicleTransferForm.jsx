import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Column,
  TextInput,
  Button,
} from 'carbon-components-react';
import WalletSelector from './WalletSelector';
import * as vehicleActions from '../actions/vehicleActions';

const VehicleTransferForm = ({
  drizzle, drizzleState, vin, selectedWalletIndex, _vehicleActions,
}) => {
  const [toAddress, setToAddress] = React.useState('');
  const fromAddress = drizzleState.accounts[selectedWalletIndex];

  const handleTransfer = () => {
    if (toAddress.length < 1) { return; }
    _vehicleActions.transfer(drizzle, fromAddress, vin, toAddress);
  };

  return (
    <Grid>
      <Row>
        <Column className="col">
          <h2>Transfer Ownership</h2>
          <p>If you are authorized to transfer this vehicle, you can do so using the form below.</p>
        </Column>
      </Row>

      <Row>
        <Column className="col">
          <WalletSelector labelText="From" drizzle={drizzle} drizzleState={drizzleState} />
        </Column>

        <Column className="col">
          <TextInput
            labelText="To"
            placeholder="Destination wallet address"
            id="transfer-to"
            invalid={toAddress.length < 1}
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
          />
        </Column>

        <Column max={2}>
          <br />
          <Button disabled={toAddress.length < 1} kind="danger" onClick={handleTransfer}>
            Transfer
          </Button>
        </Column>
      </Row>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  selectedWalletIndex: state.account.selectedWalletIndex,
});

const mapDispatchToProps = (dispatch) => ({
  _vehicleActions: bindActionCreators(vehicleActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleTransferForm);
