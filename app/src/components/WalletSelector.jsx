import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Select,
  SelectItem,
} from 'carbon-components-react';
import * as accountActions from '../actions/accountActions';

const WalletSelector = ({
  drizzle, drizzleState, account, actions, labelText,
}) => {
  const { web3 } = drizzle;
  const wallets = Object.values(drizzleState.accounts);
  const balances = Object.values(drizzleState.accountBalances).map((_) => web3.utils.fromWei(_, 'ether'));

  const handleChange = (e) => {
    const { value } = e.target;
    actions.setSelectedWalletIndex(value);
  };

  return (
    <Select id="wallet" defaultValue={account.selectedWalletIndex} labelText={labelText || 'Select Wallet'} onChange={handleChange}>
      {wallets.map((_, i) => {
        const label = `${_} (ETH ${balances[i]})`;
        return <SelectItem key={_} value={i} text={label} />;
      })}
    </Select>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  account: state.account,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(accountActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletSelector);
