import React from 'react';
import { connect } from 'react-redux';
import {
  deleteBookmark,
  updateBookmark,
  UpdateBookmarkProps,
} from '../../../services/bookmarks-service';
import MaterialTable from 'material-table';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Bookmark } from '../../../configs/types/Bookmark';
import { State } from '../../../configs/redux/store';
import NewBookmarkDialog from './components/NewBookmarkDialog';
import { Subject } from '../../../configs/types/Subject';
import { openNewBookmarkDialog } from '../../../creators/bookmarks/bookmarks-dialog';

const BookmarksWidget = (props: BookmarksWidgetProps): JSX.Element => {
  // todo: rip out to util
  const data = props.bookmarks.map((bookmark: Bookmark, index: number) => {
    index += 1;

    return {
      number: index,
      firebaseId: bookmark.firebaseId,
      id: bookmark.id,
      bookmarkUrl: bookmark.bookmarkUrl,
      bookmarkTitle: bookmark.bookmarkTitle,
      subjectId: bookmark.subjectId,
      plannerItemIds: bookmark.plannerItemIds,
    };
  });

  const subjects = props.subjectList.reduce((obj: any, subject: Subject) => {
    obj[subject.id] = subject.subjectName;
    return obj;
  }, {});

  return (
    <React.Fragment>
      <NewBookmarkDialog />

      <MaterialTable
        data={data}
        // icons={tableIcons}
        title={'Bookmarks List'}
        options={{
          pageSize: 6,
          draggable: false,
          pageSizeOptions: [6, 12, 18],
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowUpdate: (newData, oldData): Promise<void> =>
            new Promise((resolve, reject) => {
              props.updateClickHandler({
                firebaseId: newData.firebaseId,
                bookmarkUrl: newData.bookmarkUrl,
                bookmarkTitle: newData.bookmarkTitle,
                subjectId: newData.subjectId,
              });
              setTimeout(() => {
                resolve();
              }, 1000);
            }),
          onRowDelete: (newData): Promise<void> =>
            new Promise((resolve, reject) => {
              props.deleteClickHandler(newData.firebaseId);
              setTimeout(() => {
                resolve();
              }, 1500);
            }),
        }}
        columns={[
          {
            title: '#',
            field: 'number',
            editable: 'never',
            cellStyle: {
              width: '10%',
            },
          },
          {
            title: 'Bookmark Title',
            field: 'bookmarkTitle',
          },
          {
            title: 'URL',
            field: 'bookmarkUrl',
          },
          {
            title: 'Subject',
            field: 'subjectId',
            lookup: subjects,
          },
        ]}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add Bookmark',
            isFreeAction: true,
            onClick: () => props.addNewClickHandler(),
          },
        ]}
      />
    </React.Fragment>
  );
};

interface BookmarksWidgetProps {
  bookmarks: Bookmark[];
  subjectList: Subject[];
  addNewClickHandler: () => void;
  deleteClickHandler: (id: string) => void;
  updateClickHandler: (bookmark: UpdateBookmarkProps) => void;
}

const mapStateToProps = (state: State): BookmarksWidgetProps => {
  return ({
    bookmarks: state.bookmarksState.bookmarks ? state.bookmarksState.bookmarks : [],
    subjectList: state.subjectListState.subjectList
      ? state.subjectListState.subjectList
      : [],
  } as unknown) as BookmarksWidgetProps;
};

const mapDispatchToProps = (dispatch: Dispatch): BookmarksWidgetProps =>
  (({
    addNewClickHandler: () => {
      dispatch(openNewBookmarkDialog());
    },
    deleteClickHandler: (id: string) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(deleteBookmark(id));
    },
    updateClickHandler: (bookmark: UpdateBookmarkProps) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(updateBookmark(bookmark));
    },
  } as unknown) as BookmarksWidgetProps);

export default connect(mapStateToProps, mapDispatchToProps)(BookmarksWidget);
