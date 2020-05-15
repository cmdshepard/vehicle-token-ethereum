import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Row,
  Column,
  Loading,
  Button,
} from 'carbon-components-react';
import VehicleInfo from '../components/VehicleInfo';
import VehicleTransferForm from '../components/VehicleTransferForm';
import * as vehicleActions from '../actions/vehicleActions';

const VehicleView = ({
  drizzle, drizzleState, vehicles, _vehicleActions,
}) => {
  const { vin } = useParams();
  const vehicle = vehicles[vin];
  const isLoading = typeof vehicle === 'undefined';
  const wasNotFound = vehicle === null;

  const load = (_drizzle, _vin) => _vehicleActions.fetchByVin(_drizzle, _vin);

  React.useEffect(() => {
    load(drizzle, vin);
  }, [_vehicleActions, drizzle, vin]);

  return (
    <Grid>
      <Row>
        <Column className="col">
          <h1>
            Vehicle&nbsp;
            {wasNotFound ? 'Not Found' : vin}
          </h1>
          {wasNotFound && (
            <p>
              A vehicle with VIN&nbsp;
              {vin}
              &nbsp;does not exist as a token.
            </p>
          )}
        </Column>
      </Row>

      {isLoading && (
        <Loading />
      )}

      {vehicle && (
        <>
          <VehicleInfo vehicle={vehicle} />
          <Row>
            <Column className="col text-center">
              <Button
                kind="ghost"
                onClick={() => load(drizzle, vin)}
              >
                Refresh vehicle information
              </Button>
            </Column>
          </Row>
          <VehicleTransferForm drizzle={drizzle} drizzleState={drizzleState} vin={vin} />
        </>
      )}
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  vehicles: state.vehicles.vehicles,
});

const mapDispatchToProps = (dispatch) => ({
  _vehicleActions: bindActionCreators(vehicleActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleView);
