import React from 'react';
import { Provider } from 'react-redux';
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from '@drizzle/store';
import { Loading } from 'carbon-components-react';
import drizzleOptions from './config/drizzleOptions';
import drizzleStore from './config/drizzleStore';
import reduxStore from './config/reduxStore';
import Routes from './Routes';

const drizzle = new Drizzle(drizzleOptions, drizzleStore);

const App = () => (
  <DrizzleContext.Provider drizzle={drizzle}>
    <DrizzleContext.Consumer>
      {(drizzleContext) => {
        const { drizzleState, initialized } = drizzleContext;

        if (!initialized) {
          return <Loading description="Active loading indicator" />;
        }

        return (
          <Provider store={reduxStore}>
            <Routes drizzle={drizzleContext.drizzle} drizzleState={drizzleState} />
          </Provider>
        );
      }}
    </DrizzleContext.Consumer>
  </DrizzleContext.Provider>
);

export default App;
