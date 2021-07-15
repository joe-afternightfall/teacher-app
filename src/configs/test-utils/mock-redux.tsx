import React from 'react';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import MockTheme from './mock-theme';
import { Provider } from 'react-redux';
import { buildBookmarkList, buildColor, buildLessonPlanners, buildSubjectList } from './test-util';
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
  templateBuilderState: {},
  subjectListState: {
    subjectList: buildSubjectList(4),
  },
  lessonPlannerState: {},
};

export function getStore(state: any, dispatchMock?: any): MockStore {
  const store = createStore(middleware)({
    ...initialState,
    applicationState: { ...initialState.applicationState, ...state },
    //todo: remove and make use of new get store
    subjectListState: {
      subjectList: buildSubjectList(6),
      selectedIconId: '93efa857-716c-4d5e-bea2-e8c9d975c5d2',
      selectedColor: buildColor(1)[0],
      subjectName: 'Test Subject Name'
    },
    //todo: remove and make create new method
    bookmarksState: {
      bookmarks: buildBookmarkList(5),
      displayNewBookmarkDialog: false,
      subjectId: '',
      url: '',
      title: ''
    },
    //todo: remove and make create new method
    lessonPlannerState: {
      lessonPlanners: buildLessonPlanners(4)
    },
    //todo: remove and make create new method
    templateBuilderState: {
      boardChanged: false,
    }
  });

  if (dispatchMock) {
    return {...store, dispatch: dispatchMock};
  } else {
    return store;
  }
}

export function getSubjectListStore(state: any): MockStore {
  return createStore(middleware)({
    ...initialState,
    subjectListState: { ...initialState.subjectListState, ...state },
  });
}

export function getLessonPlannerStore(state: any): MockStore {
  return createStore(middleware)({
    ...initialState,
    lessonPlannerState: { ...initialState.lessonPlannerState, ...state },
  });
}

export function getTemplateBuilderStore(state: any): MockStore {
  return createStore(middleware)({
    ...initialState,
    templateBuilderState: { ...initialState.templateBuilderState, ...state },
  });
}

export function getRealStore(): Store {
  const history: History = createHashHistory();
  return createRealStore(history);
}
