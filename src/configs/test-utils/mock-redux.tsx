import React from 'react';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import MockTheme from './test-theme';
import { Provider } from 'react-redux';
import { createHashHistory, History } from 'history';
import createStore, { MockStore } from 'redux-mock-store';
import { render, RenderResult } from '@testing-library/react';
import { createStore as createRealStore } from '../../configs/redux/store';

const middleware = [thunk];

export function renderWithTheme(ui: JSX.Element) {
  return render(<MockTheme>{ui}</MockTheme>);
}

export function renderWithRedux(ui: JSX.Element, store: Store): RenderResult {
  return render(
    <Provider store={store}>
      <MockTheme>{ui}</MockTheme>
    </Provider>
  );
}

export async function renderAsyncWithRedux(
  ui: JSX.Element,
  store: any
): Promise<RenderResult> {
  return new Promise((resolve) => {
    const result = render(<Provider store={store}>{ui}</Provider>);
    setTimeout(() => {
      resolve(result);
    }, 100);
  });
}

export const initialState = {
  applicationState: {},
};

export function getStore(state: any, dispatchMock: any): MockStore {
  const store = createStore(middleware)({
    ...initialState,
    applicationState: { ...initialState.applicationState, ...state },
  });

  if (dispatchMock) {
    return { ...store, dispatch: dispatchMock };
  } else {
    return store;
  }
}

export function getRealStore(): Store {
  const history: History = createHashHistory();
  return createRealStore(history);
}
