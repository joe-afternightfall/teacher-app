import React from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import PageTitle from '../../shared/PageTitle';
import { LibraryBook } from '../../../configs/models/LibraryBook';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { displayAppDialog } from '../../../creators/application/app-dialog';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../../../configs/redux/store';
import { deleteBookmark } from '../../../services/bookmarks/delete-bookmark';
import LibraryBookForm from './LibraryBookForm';
import { saveLibraryBookInfo } from '../../../services/library/save-libary-book';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const LibraryWidget = (props: LibraryWidgetProps): JSX.Element => {
  const data = props.books.map((book: LibraryBook, index: number) => {
    index += 1;

    return {
      number: index,
      book: book,
    };
  });

  const classes = useStyles();

  return (
    <MaterialTable
      data={data}
      data-testid={'library-widget'}
      title={<PageTitle title={'Library Books'} />}
      options={{
        pageSize: 6,
        draggable: false,
        pageSizeOptions: [6, 12, 18],
        actionsColumnIndex: -1,
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
          title: 'Book Title',
          field: 'book.title',
          editable: 'never',
          cellStyle: {
            width: '30%',
          },
        },
        {
          title: 'Genre',
          field: 'book.genre',
          editable: 'never',
          cellStyle: {
            width: '20%',
          },
        },
        {
          title: 'Grade',
          field: 'book.gradeLevel',
          editable: 'never',
          cellStyle: {
            width: '20%',
          },
        },
        {
          title: 'Pages',
          field: 'book.pages',
          editable: 'never',
          cellStyle: {
            width: '10%',
          },
        },
      ]}
      actions={[
        {
          icon: 'add',
          tooltip: 'Add Library Book',
          isFreeAction: true,
          onClick: () => props.addNewClickHandler(),
        },
      ]}
    />
  );
};

export interface LibraryWidgetProps {
  books: LibraryBook[];
  addNewClickHandler: () => void;
  deleteClickHandler: (id: string) => void;
  updateClickHandler: (libraryBooks: LibraryBook) => void;
}

const mapStateToProps = (state: any): LibraryWidgetProps => {
  return ({
    books: state.libraryBookState.books ? state.libraryBookState.books : [],
  } as unknown) as LibraryWidgetProps;
};

const mapDispatchToProps = (dispatch: Dispatch): LibraryWidgetProps =>
  (({
    addNewClickHandler: () => {
      dispatch(
        displayAppDialog({
          maxWidth: 'sm',
          titleColor: '#3baafc',
          content: <LibraryBookForm />,
          title: 'Add New Book',
          confirmButtonTitle: 'Save',
          confirmClickHandler: async () => {
            (dispatch as ThunkDispatch<State, void, AnyAction>)(
              saveLibraryBookInfo()
            );
          },
        })
      );
    },
    deleteClickHandler: (id: string) => {
      // todo: create delete handler
      // (dispatch as ThunkDispatch<State, void, AnyAction>)(deleteBookmark(id));
    },
  } as unknown) as LibraryWidgetProps);

export default connect(mapStateToProps, mapDispatchToProps)(LibraryWidget);
