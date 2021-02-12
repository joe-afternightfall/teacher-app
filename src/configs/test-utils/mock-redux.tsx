import React from 'react';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import MockTheme from './mock-theme';
import { Provider } from 'react-redux';
import { createHashHistory, History } from 'history';
import createStore, { MockStore } from 'redux-mock-store';
import { render, RenderResult } from '@testing-library/react';
import { createStore as createRealStore } from '../../configs/redux/store';
import { buildSubjectList } from './test-util';

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
    const result = render(
      <Provider store={store}>
        <MockTheme>{ui}</MockTheme>
      </Provider>
    );
    setTimeout(() => {
      resolve(result);
    }, 100);
  });
}

export const initialState = {
  applicationState: {},
};

// todo:  remove dispatch mock
export function getStore(state: any, dispatchMock: any): MockStore {
  const store = createStore(middleware)({
    ...initialState,
    applicationState: { ...initialState.applicationState, ...state },
    subjectListState: {
      subjectList: buildSubjectList(6),
    },
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
