import rootReducer from './rootReducer';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

/**
 * Redux applyMiddleware feature. This allows us to add special handling for certain features such as async functions.
 * The ‘redux-thunk’ library, which provides async handling (described later)
 */
const reduxStore = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default reduxStore;
