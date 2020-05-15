import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Row,
  Column,
  Button,
} from 'carbon-components-react';
import WalletSelector from '../components/WalletSelector';
import WalletRoles from '../components/WalletRoles';
import ContractStatisticColumn from '../components/ContractStatisticColumn';

const HomeView = ({ drizzle, drizzleState }) => {
  const navigation = useHistory();

  return (
    <Grid>
      <Row>
        <Column>
          <h1>Welcome</h1>
          {/* eslint-disable-next-line max-len */}
          <p>The International Vehicle Token is an ERC-721 token that can be minted by a vehicle manufacturer to track vehicle ownership.</p>
          <br />
          {/* eslint-disable-next-line max-len */}
          <p>To get started, register as a manufacturer to mint a token. You can then transfer your token to a dealership. The dealership can then transfer the token to a consumer when it sells the vehicle.</p>
          <br />
          {/* eslint-disable-next-line max-len */}
          <p>Consumers can take advantge of all ERC-721 features like transferring between parties and approving other parties to make transfers on their behalf.</p>
          <br />
        </Column>
      </Row>

      <Row>
        <Column className="col">
          <Button onClick={() => navigation.push('/register')}>Register account</Button>
        </Column>
      </Row>

      <Row>
        <Column className="col">
          <h1>Current Account</h1>
          <WalletSelector drizzle={drizzle} drizzleState={drizzleState} />
          <br />
          <br />
          <WalletRoles drizzle={drizzle} drizzleState={drizzleState} />
        </Column>
      </Row>

      <Row>
        <Column>
          <h1>Contract Stats</h1>
        </Column>
      </Row>

      <Row>
        <ContractStatisticColumn
          drizzle={drizzle}
          drizzleState={drizzleState}
          title="Vehicles"
          method="lastId"
        />

        <ContractStatisticColumn
          drizzle={drizzle}
          drizzleState={drizzleState}
          title="Manufacturers"
          method="numberOfManufacturers"
        />

        <ContractStatisticColumn
          drizzle={drizzle}
          drizzleState={drizzleState}
          title="Dealerships"
          method="numberOfDealerships"
        />
      </Row>
    </Grid>
  );
};

export default HomeView;
