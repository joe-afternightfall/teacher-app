import React from 'react';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { buildLessonPlanner } from './test-util';
import { createHashHistory, History } from 'history';
import createStore, { MockStore } from 'redux-mock-store';
import { createStore as createRealStore } from '../../configs/redux/store';

const middleware = [thunk];

export function renderWithRedux(ui: JSX.Element, store: Store) {
  return render(<Provider store={store}>{ui}</Provider>);
}

export async function renderAsyncWithRedux(ui: JSX.Element, store: any) {
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    const result = render(<Provider store={store}>{ui}</Provider>);
    setTimeout(() => {
      resolve(result);
    }, 100);
  });
}

const lessonPlanners = [buildLessonPlanner()];

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

// export function getInboxStore(state: object, dispatchMock: any): MockStore {
//   let store = createStore(middleware)({
//     ...initialState,
//     auditInboxState: {...initialState.auditInboxState, ...state},
//   });
//   if (dispatchMock) {
//     return {...store, dispatch: dispatchMock};
//   } else {
//     return store;
//   }
// }

// export function getFullStore(state: object, dispatchMock: any): MockStore {
//   let store = createStore(middleware)({
//     ...initialState,
//     applicationState: {...initialState.applicationState, ...state},
//     auditInboxState: {...initialState.auditInboxState, ...state},
//   });
//   if (dispatchMock) {
//     return {...store, dispatch: dispatchMock};
//   } else {
//     return store;
//   }
// }

export function getRealStore() {
  const history: History = createHashHistory();
  return createRealStore(history);
}
