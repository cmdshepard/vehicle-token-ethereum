import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Header as Container,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from 'carbon-components-react';
import { Add32, Search32 } from '@carbon/icons-react';
import './Header.scss';

const Header = () => {
  const navigation = useHistory();
  const title = 'International Vehicle Tokens';

  return (
    <Container aria-label={title}>
      <HeaderName element={Link} to="/" prefix="ERC-721">{title}</HeaderName>

      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label="Add Vehicle"
          className="header_global_action"
          onClick={() => navigation.push('/vehicles/manufacture')}
        >
          <Add32 aria-label="add icon" />
        </HeaderGlobalAction>

        <HeaderGlobalAction
          aria-label="VIN Lookup"
          className="header_global_action"
          onClick={() => navigation.push('/lookup')}
        >
          <Search32 aria-label="search icon" />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Container>
  );
};

export default Header;
