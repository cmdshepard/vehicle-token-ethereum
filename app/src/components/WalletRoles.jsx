import React from 'react';
import { connect } from 'react-redux';
import { newContextComponents } from '@drizzle/react-components';
import {
  Tag,
} from 'carbon-components-react';

const { ContractData } = newContextComponents;

const WalletRoles = ({ drizzle, drizzleState, account }) => {
  const { selectedWalletIndex } = account;
  const selectedWalletAddress = drizzleState.accounts[selectedWalletIndex];

  return (
    <>
      <Tag>
        Consumer: YES
      </Tag>

      <Tag>
        <ContractData
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="Vehicles"
          methodArgs={[selectedWalletAddress]}
          method="getRoles"
          render={(_) => `Manufacturer: ${_.isOEM ? 'YES' : 'NO'}`}
        />
      </Tag>

      <Tag>
        <ContractData
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="Vehicles"
          methodArgs={[selectedWalletAddress]}
          method="getRoles"
          render={(_) => `Dealership: ${_.isDealership ? 'YES' : 'NO'}`}
        />
      </Tag>
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  account: state.account,
});

export default connect(mapStateToProps)(WalletRoles);
