import { connect } from 'react-redux';
import React, { ChangeEvent } from 'react';
import MaterialTable from 'material-table';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import AppLink from '../../app-shell/AppLink';
import { TextField } from '@material-ui/core';
import PageTitle from '../../shared/PageTitle';
import { State } from '../../../configs/redux/store';
import { Subject } from '../../../configs/models/Subject';
import { Bookmark } from '../../../configs/models/Bookmark';
import NewBookmarkDialog from './components/NewBookmarkDialog';
import { updateBookmark } from '../../../services/bookmarks/update-bookmark';
import { deleteBookmark } from '../../../services/bookmarks/delete-bookmark';
import { openNewBookmarkDialog } from '../../../creators/bookmarks/bookmarks-dialog';

const getLink = (rowData: any) => (
  <AppLink
    title={rowData.bookmark.bookmarkUrl}
    url={rowData.bookmark.bookmarkUrl}
  />
);

const editField = (props: any) => {
  return (
    <TextField
      value={props.value}
      data-testid={'edit-url-text-field'}
      onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
        props.onChange(e.target.value)
      }
    />
  );
};

const BookmarksWidget = (props: BookmarksWidgetProps): JSX.Element => {
  const data = props.bookmarks.map((bookmark: Bookmark, index: number) => {
    index += 1;

    return {
      number: index,
      bookmark: bookmark,
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
        title={<PageTitle title={'Bookmarks'} />}
        options={{
          pageSize: 6,
          draggable: false,
          pageSizeOptions: [6, 12, 18],
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowUpdate: (newData): Promise<void> =>
            new Promise((resolve) => {
              props.updateClickHandler(newData.bookmark);
              setTimeout(() => {
                resolve();
              }, 1000);
            }),
          onRowDelete: (newData): Promise<void> =>
            new Promise((resolve) => {
              props.deleteClickHandler(newData.bookmark.firebaseId);
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
            title: 'Title',
            field: 'bookmark.bookmarkTitle',
            cellStyle: {
              width: '20%',
            },
          },
          {
            title: 'URL',
            render: getLink,
            field: 'bookmark.bookmarkUrl',
            editComponent: editField,
          },
          {
            title: 'Subject',
            field: 'bookmark.subjectId',
            lookup: subjects,
            cellStyle: {
              width: '20%',
            },
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
  updateClickHandler: (bookmark: Bookmark) => void;
}

const mapStateToProps = (state: State): BookmarksWidgetProps => {
  return ({
    bookmarks: state.bookmarksState.bookmarks
      ? state.bookmarksState.bookmarks
      : [],
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
    updateClickHandler: (bookmark: Bookmark) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        updateBookmark(bookmark)
      );
    },
  } as unknown) as BookmarksWidgetProps);

export default connect(mapStateToProps, mapDispatchToProps)(BookmarksWidget);
