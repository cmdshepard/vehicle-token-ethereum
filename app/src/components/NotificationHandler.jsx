import React from 'react';
import { connect } from 'react-redux';
import { ToastNotification } from 'carbon-components-react';
import moment from 'moment';
import reduxStore from '../config/reduxStore';
import * as accountActions from '../actions/accountActions';
import * as vehicleActions from '../actions/vehicleActions';
import './NotificationHandler.scss';

const NotificationHandler = ({ account, vehicles }) => {
  // OEM Registration
  const isOEMRegistrationSending = account.registration.oem.isSending;
  const isOEMRegistrationFinished = account.registration.oem.isFinished;
  const didOEMRegistrationFail = account.registration.oem.didSendFail;

  // Dealer Registration
  const isDealerRegistrationSending = account.registration.dealership.isSending;
  const isDealerRegistrationFinished = account.registration.dealership.isFinished;
  const didDealerRegistrationFail = account.registration.dealership.didSendFail;

  // Vehicle Manufacturing
  const isVehicleManufacturing = vehicles.isManufacturing;
  const isVehicleManufactured = vehicles.isManufactured;
  const didVehicleManufacturingFail = vehicles.didManufactureFail;

  // Vehicle Transferring
  const isVehicleTransferring = vehicles.isTransferring;
  const isVehicleTransferred = vehicles.isTransferred;
  const didVehicleTransferFail = vehicles.didTransferFail;

  const renderToast = (
    title,
    body,
    kind = 'info',
    onClose = () => {},
  ) => (
    <ToastNotification
      title={title}
      subtitle={body}
      kind={kind}
      onCloseButtonClick={onClose}
      timeout={kind === 'success' ? 3500 : 0}
      caption={moment().format('hh:mm:ss A')}
    />
  );

  return (
    <div className="toast_container">
      {/* OEM Registration */}

      {isOEMRegistrationSending && renderToast(
        'Manufacturer Registration Sent',
        'The blockchain is processing your manufacturer registration transaction.',
      )}

      {isOEMRegistrationFinished && renderToast(
        'Manufacturer Registered',
        'This account is a manufacturer.',
        'success',
      )}

      {didOEMRegistrationFail && renderToast(
        'Manufacturer Registration Rejected',
        'The blockchain rejected your manufacturer registration transaction. Are you already registered as a manufacturer?',
        'error',
        () => reduxStore.dispatch(accountActions.registrationAsManufacturerFailureNotified()),
      )}

      {/* Dealer Registration */}

      {isDealerRegistrationSending && renderToast(
        'Dealership Registration Sent',
        'The blockchain is processing your dealership registration transaction.',
      )}

      {isDealerRegistrationFinished && renderToast(
        'Dealership Registered',
        'This account is a dealership.',
        'success',
      )}

      {didDealerRegistrationFail && renderToast(
        'Dealership Registration Rejected',
        'The blockchain rejected your dealership registration transaction. Are you already registered as a dealership?',
        'error',
        () => reduxStore.dispatch(accountActions.registrationAsDealershipFailureNotified()),
      )}

      {/* Vehicle Manufacturing */}

      {isVehicleManufacturing && renderToast(
        'Manufacturing Vehicle',
        'The blockchian is processing your manufacturing',
      )}

      {isVehicleManufactured && renderToast(
        'Vehicle Manufactured',
        'Your vehicle token has been manufactured',
        'success',
        () => reduxStore.dispatch(vehicleActions.vehicleManufacturedDismissed()),
      )}

      {didVehicleManufacturingFail && renderToast(
        'Vehicle Manufacturing Failed',
        'The blockchain rejected your token minting request. Is your VIN number unique?',
        'error',
        () => reduxStore.dispatch(vehicleActions.vehicleManufactureFailureDismissed()),
      )}

      {/* Vehicle Transferring */}

      {isVehicleTransferring && renderToast(
        'Vehicle Transfer Sent',
        'The blockchain is processing your transfer',
      )}

      {isVehicleTransferred && renderToast(
        'Vehicle Transferred',
        'Your vehicle token has been transferred',
        'success',
        () => reduxStore.dispatch(vehicleActions.transferDismissed()),
      )}

      {didVehicleTransferFail && renderToast(
        'Vehicle Transfer Failed',
        'The blockchain rejected your token transfer request. Are you authorized to transfer this vehicle?',
        'error',
        () => reduxStore.dispatch(vehicleActions.transferFailureDismissed()),
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  account: state.account,
  vehicles: state.vehicles,
});

export default connect(mapStateToProps)(NotificationHandler);
