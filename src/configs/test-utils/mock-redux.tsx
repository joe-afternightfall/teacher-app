import React from 'react';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import MockTheme from './mock-theme';
import { Provider } from 'react-redux';
import { buildBookmarkList, buildLessonPlanner, buildSubjectList } from './test-util';
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
};

export function getStore(state: any): MockStore {
  return createStore(middleware)({
    ...initialState,
    applicationState: { ...initialState.applicationState, ...state },
    subjectListState: {
      subjectList: buildSubjectList(6),
    },
    bookmarksState: {
      bookmarks: buildBookmarkList(5),
      displayNewBookmarkDialog: false,
    },
    lessonPlannerState: {
      lessonPlanners: [buildLessonPlanner()]
    },
    templateBuilderState: {
      boardChanged: false,
    }
  });
}

export function getRealStore(): Store {
  const history: History = createHashHistory();
  return createRealStore(history);
}
