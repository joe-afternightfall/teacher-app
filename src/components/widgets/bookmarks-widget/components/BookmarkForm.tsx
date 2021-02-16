import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid, TextField } from '@material-ui/core';
import {
  updateBookmarkUrl,
  updateBookmarkTitle,
  updateBookmarkSubject
} from '../../../../creators/bookmarks/bookmark-form';
import { State } from '../../../../configs/redux/store';
import SubjectDropdown from '../../../shared/SubjectDropdown';

const BookmarkForm = (
  props: BookmarkFormProps
): JSX.Element => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.titleTextFieldHandler(e.target.name, e.target.value);
  }

  return (
    <form>
      <Grid container>
        <Grid item xs={12}>
          <Grid container alignItems={'center'} justify={'space-between'}>
            <Grid item xs={7}>
              <TextField
                fullWidth
                name={'title'}
                label={'Title'}
                margin={'normal'}
                data-testid={'bookmark-title'}
                value={props.title}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <SubjectDropdown
                value={props.subjectId}
                changeHandler={props.dropdownChangeHandler}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label={'URL'}
            margin={'normal'}
            name={'url'}
            data-testid={'bookmark-url'}
            value={props.url}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export interface BookmarkFormProps {
  title: string;
  url: string;
  subjectId: string;
  dropdownChangeHandler: (
    e: React.ChangeEvent<{ name?: string; value: string }>
  ) => void;
  titleTextFieldHandler: (name: string, value: string) => void;
}

const mapStateToProps = (state: State): BookmarkFormProps => {
  return ({
    title: state.bookmarksState.title,
    url: state.bookmarksState.url,
    subjectId: state.bookmarksState.subjectId,
  } as unknown) as BookmarkFormProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch
): BookmarkFormProps =>
  (({
    titleTextFieldHandler: (name: string, value: string) => {
      if (name === 'url') {
        dispatch(updateBookmarkUrl(value));
      } else if (name === 'title') {
        dispatch(updateBookmarkTitle(value));
      }
    },
    dropdownChangeHandler: (
      e: React.ChangeEvent<{ name?: string; value: string }>
    ) => {
      dispatch(updateBookmarkSubject(e.target.value));
    },
  } as unknown) as BookmarkFormProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarkForm);
