import { generateStore, EventActions } from '@drizzle/store';
import drizzleOptions from './drizzleOptions';
import contractEventDispatcher from './contractEventDispatcher';

// eslint-disable-next-line no-unused-vars
const contractEventNotifier = (store) => (next) => (action) => {
  if (action.type === EventActions.EVENT_FIRED) {
    contractEventDispatcher(store, action.event);
  }

  return next(action);
};

const appMiddlewares = [contractEventNotifier];

export default generateStore({
  drizzleOptions,
  appMiddlewares,
  disableReduxDevTools: false,
});
