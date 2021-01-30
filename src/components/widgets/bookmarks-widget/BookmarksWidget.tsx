import React from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import AppLink from '../../app-shell/AppLink';
import { Grid, Typography } from '@material-ui/core';
import { State } from '../../../configs/redux/store';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Subject } from '../../../configs/types/Subject';
import NewBookmarkDialog from './components/NewBookmarkDialog';
import { openNewBookmarkDialog } from '../../../creators/bookmarks/bookmarks-dialog';
import { updateBookmark } from '../../../services/bookmarks/update-bookmark';
import { deleteBookmark } from '../../../services/bookmarks/delete-bookmark';
import { Bookmark } from '../../../configs/models/Bookmark';

const getLink = (rowData: any) => (
  <AppLink
    title={rowData.bookmark.bookmarkUrl}
    url={rowData.bookmark.bookmarkUrl}
  />
);

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
        // icons={tableIcons}
        title={
          <Grid container spacing={2}>
            <Grid item>
              <BookmarkIcon />
            </Grid>

            <Grid item>
              <Typography>{'Bookmarks List'}</Typography>
            </Grid>
          </Grid>
        }
        options={{
          pageSize: 6,
          draggable: false,
          pageSizeOptions: [6, 12, 18],
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowUpdate: (newData, oldData): Promise<void> =>
            new Promise((resolve, reject) => {
              props.updateClickHandler(newData.bookmark);
              setTimeout(() => {
                resolve();
              }, 1000);
            }),
          onRowDelete: (newData): Promise<void> =>
            new Promise((resolve, reject) => {
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
