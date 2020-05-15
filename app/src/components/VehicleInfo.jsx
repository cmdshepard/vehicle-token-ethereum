import * as React from 'react';
import {
  Grid,
  Row,
  Column,
  Tile,
} from 'carbon-components-react';

const VehicleInfo = ({ vehicle }) => {
  if (!vehicle) { return <></>; }

  const renderInfoCol = (title, data) => (
    <Column className="col text-center">
      <Tile>
        <h3>
          {title}
        </h3>
        <br />
        <p>
          {data}
        </p>
      </Tile>
    </Column>
  );

  return (
    <Grid>
      <Row>
        {renderInfoCol('Token ID', vehicle.tokenId)}
        {renderInfoCol('Make', vehicle.make)}
        {renderInfoCol('Model', vehicle.model)}
        {renderInfoCol('Year', vehicle.year)}
      </Row>

      <Row>
        <Column>
          <h2>Owner Information</h2>
        </Column>
      </Row>

      <Row>
        {renderInfoCol('Wallet Address', vehicle.owner.address)}
        {renderInfoCol('Manufacturer?', vehicle.owner.isOEM ? 'YES' : 'NO')}
        {renderInfoCol('Dealership?', vehicle.owner.isDealership ? 'YES' : 'NO')}
      </Row>
    </Grid>
  );
};

export default VehicleInfo;
