import React from 'react';
import { newContextComponents } from '@drizzle/react-components';
import { Column, Tile } from 'carbon-components-react';

const { ContractData } = newContextComponents;

const ContractStatisticColumn = ({
  drizzle,
  drizzleState,
  title,
  method,
}) => (
  <Column className="col">
    <Tile className="text-center">
      <h3>{title}</h3>
      <br />
      <h3>
        <ContractData
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="Vehicles"
          method={method}
        />
      </h3>
    </Tile>
  </Column>
);

export default ContractStatisticColumn;
