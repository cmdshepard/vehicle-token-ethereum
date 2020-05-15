import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Content } from 'carbon-components-react';
import { fetchAccountRoles } from './actions/accountActions';
import reduxStore from './config/reduxStore';
import Header from './components/Header';
import NotificationHandler from './components/NotificationHandler';
import ManufactureVehicleView from './views/ManufactureVehicleView';
import VehicleView from './views/VehicleView';
import LookupView from './views/LookupView';
import RegisterView from './views/RegisterView';
import HomeView from './views/HomeView';

const Routes = (props) => {
  const { drizzle, drizzleState, account } = props;
  const { selectedWalletIndex } = account;
  const selectedWalletAddress = drizzleState.accounts[selectedWalletIndex];

  React.useEffect(() => {
    reduxStore.dispatch(fetchAccountRoles(drizzle, selectedWalletAddress));
  }, [drizzle, selectedWalletAddress]);

  return (
    <Router>
      <Header />
      <Switch>
        <Content>
          <NotificationHandler />

          <Route exact path="/vehicles/manufacture">
            <ManufactureVehicleView {...props} />
          </Route>

          <Route path="/lookup/:vin">
            <VehicleView {...props} />
          </Route>

          <Route exact path="/lookup">
            <LookupView {...props} />
          </Route>

          <Route path="/register">
            <RegisterView {...props} />
          </Route>

          <Route exact path="/">
            <HomeView {...props} />
          </Route>
        </Content>
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  account: state.account,
});

export default connect(mapStateToProps)(Routes);
