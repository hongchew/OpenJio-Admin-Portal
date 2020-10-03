import {createStore} from 'redux';
import rootReducer from './reducers/rootReducer';
import {loadState} from './localStorage';

// const store = createStore(rootReducer);

const persistedState = loadState();

export default createStore(rootReducer, persistedState);
