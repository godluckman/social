import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './redusers';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// @ts-ignore
const DataProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default DataProvider;
