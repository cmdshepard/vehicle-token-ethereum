import React from 'react';
import {
  Grid,
  Row,
  Column,
  TextInput,
  Button,
} from 'carbon-components-react';
import { useHistory } from 'react-router-dom';

const LookupView = () => {
  const navigation = useHistory();
  const [vinQuery, setVinQuery] = React.useState('');

  const handleSubmit = () => {
    if (vinQuery.length < 1) { return; }
    navigation.push(`/lookup/${vinQuery}`);
  };

  return (
    <Grid>
      <Row>
        <Column className="col">
          <h1>Lookup Vehicle</h1>
          {/* eslint-disable-next-line max-len */}
          <p>Search the blockchain for a vehicle token using the vehicle&apos;s Vehicle Identification Number.</p>
        </Column>
      </Row>

      <Row>
        <Column className="col">
          <TextInput
            labelText="VIN"
            id="vin"
            value={vinQuery}
            onChange={(e) => setVinQuery(e.target.value)}
          />
        </Column>
      </Row>

      <Row>
        <Column className="col">
          <Button onClick={handleSubmit}>
            Lookup vehicle
          </Button>
        </Column>
      </Row>
    </Grid>
  );
};

export default LookupView;
