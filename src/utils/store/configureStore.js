import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import AppReducers from 'utils/reducers';
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()
const reducer = combineReducers({
  appState: AppReducers,
});

const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);

export default function configureStore(initialState) {
  let store;
  if (process.env.NODE_ENV === 'development') {
    const persistState = require('redux-devtools').persistState;
    const DevTools = require('app/DevTools').default;

    const enhancer = compose(
      DevTools.instrument(),
      persistState(
        window.location.href.match(
          /[?&]debug_session=([^&#]+)\b/
        )
      )
    );
    store = createStoreWithMiddleware(reducer, initialState, enhancer);

    if (module.hot) {
      module.hot.accept('utils/reducers', () =>
        store.replaceReducer(require('utils/reducers').default)
      );
    }
  } else {
    store = createStoreWithMiddleware(reducer, initialState);
  }
  return store;
}
