import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import createStore, { MockStore } from 'redux-mock-store';
import { createStore as createRealStore } from '../../configs/redux/store';
import { createHashHistory, History } from 'history';
import thunk from 'redux-thunk';

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
  applicationState: {
    lessonPlanners: lessonPlanners,
    selectedPlannerId: lessonPlanners[0].id,
  },
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

export function buildPlannerItem(items: number) {
  let index = 0;
  const builtList = [];

  while (index < items) {
    index += 1;

    builtList.push({
      id: `test-id-${index}`,
      content: `test-content-${index}`,
    });
  }

  return builtList;
}

export function buildLessonPlanner() {
  return {
    createdAt: '123456789',
    id: 'planner-id',
    title: 'planner-title',
    items: {
      monday: {
        date: '01/01/2021',
        items: buildPlannerItem(3),
      },
      tuesday: {
        date: '01/02/2021',
        items: buildPlannerItem(1),
      },
      wednesday: {
        date: '01/03/2021',
        items: buildPlannerItem(2),
      },
      thursday: {
        date: '01/04/2021',
        items: buildPlannerItem(1),
      },
      friday: {
        date: '01/05/2021',
        items: buildPlannerItem(2),
      },
    },
    notes: [
      {
        id: 'note-id-one',
        content: 'note-content-one',
      },
      {
        id: 'note-id-two',
        content: 'note-content-two',
      },
    ],
  };
}
