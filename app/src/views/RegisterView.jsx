import React from 'react';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Column,
  Form,
  FormGroup,
  TextInput,
  RadioButtonGroup,
  RadioButton,
  Button,
  Tile,
} from 'carbon-components-react';
import WalletSelector from '../components/WalletSelector';
import WalletRoles from '../components/WalletRoles';
import * as accountActions from '../actions/accountActions';

const ACCOUNT_TYPES = {
  OEM: 'Manufacturer',
  DEALERSHIP: 'Dealership',
  CONSUMER: 'Consumer',
};

const RegisterView = ({
  drizzle, drizzleState, account, actions,
}) => {
  const navigation = useHistory();
  const [selectedAccountType, setSelectedAccountType] = React.useState(ACCOUNT_TYPES.OEM);
  const [selectedName, setSelectedName] = React.useState('');

  const isAlreadyOEM = account.registration.oem.isFinished;
  const isAlreadyDealer = account.registration.dealership.isFinished;

  const isOEM = selectedAccountType === ACCOUNT_TYPES.OEM;
  const isDealership = selectedAccountType === ACCOUNT_TYPES.DEALERSHIP;
  const isConsumer = selectedAccountType === ACCOUNT_TYPES.CONSUMER;

  const isNameInvalid = selectedName.length < 1;
  const isDisabled = isNameInvalid
    || (isOEM && isAlreadyOEM)
    || (isDealership && isAlreadyDealer)
    || account.registration.oem.isSending
    || account.registration.dealership.isSending;

  const handleSubmit = () => {
    if (isDisabled) { return; }

    const selectedWallet = Object.values(drizzleState.accounts)[account.selectedWalletIndex];
    const payload = { name: selectedName };

    if (isOEM) {
      actions.registerAsManufacturer(drizzle, selectedWallet, payload);
    }

    if (isDealership) {
      actions.registerAsDealership(drizzle, selectedWallet, payload);
    }
  };

  return (
    <Grid>
      <Row>
        <Column>
          <h1>Register</h1>
        </Column>
      </Row>

      <Form>
        <Row>
          <Column>
            <FormGroup legendText="Account Type">
              <RadioButtonGroup valueSelected={selectedAccountType} name="account-type">
                {Object.values(ACCOUNT_TYPES).map((_) => <RadioButton key={_} id={`account-type-${_}`} labelText={_} value={_} onClick={() => setSelectedAccountType(_)} />)}
              </RadioButtonGroup>
            </FormGroup>
          </Column>
        </Row>

        {(isOEM || isDealership) && (
          <Row>
            <Column className="col">
              <TextInput
                invalid={isNameInvalid}
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
                labelText="Name"
                id="name"
                placeholder={isOEM ? 'eg. Toyota' : 'eg. Awesome Toyota Dealership'}
              />
            </Column>
          </Row>
        )}

        {!isConsumer && (
          <Row>
            <Column className="col">
              <WalletSelector
                drizzle={drizzle}
                drizzleState={drizzleState}
              />
              <br />
              <WalletRoles
                drizzle={drizzle}
                drizzleState={drizzleState}
              />
            </Column>
          </Row>
        )}

        {isConsumer && (
          <Row>
            <Column>
              <Tile>
                <h3>Consumers Don&apos;t Need to Register</h3>
                <br />
                <br />
                {/* eslint-disable-next-line max-len */}
                <p>Since International Vehicle Tokens are based on the ERC-721 standard, anyone with an Ethereum wallet address can own and trade the token.</p>
                {/* eslint-disable-next-line max-len */}
                <p>Therefore any wallet address that is not registered on the blockchain as a manufacturer or a dealership is considered to be a consumer.</p>
              </Tile>
            </Column>
          </Row>
        )}

        {!isConsumer && (
          <Row>
            <Column max={2}>
              <Button onClick={handleSubmit} disabled={isDisabled}>Register</Button>
            </Column>

            {isAlreadyOEM && (
              <Column max={2}>
                <Button onClick={() => navigation.push('/vehicles/manufacture')}>
                  Manufacture vehicle
                </Button>
              </Column>
            )}
          </Row>
        )}
      </Form>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  account: state.account,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(accountActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
