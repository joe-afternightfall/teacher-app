import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import { Button, Grid, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import SaveIcon from '@material-ui/icons/Save';

export interface CustomLink {
  linkUrl: string;
  linkTitle: string;
}

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class NewLinkCard extends Component<NewLinkCardProps> {
  state = {
    url: '',
    title: '',
  };

  render(): JSX.Element {
    const { clickHandler } = this.props;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    };

    const save = () => {
      clickHandler({
        linkUrl: this.state.url,
        linkTitle: this.state.title,
      });
    };

    return (
      <Grid
        container
        spacing={2}
        alignItems={'center'}
        justify={'space-between'}
      >
        <Grid item xs={9} container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id={'new-link-title'}
              label={'Link Title'}
              variant={'outlined'}
              fullWidth
              inputProps={{
                name: 'title',
              }}
              value={this.state.title}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id={'new-link-url'}
              label={'URL'}
              variant={'outlined'}
              inputProps={{
                name: 'url',
              }}
              value={this.state.url}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <Button
            fullWidth
            onClick={save}
            color={'primary'}
            variant={'contained'}
            startIcon={<SaveIcon />}
          >
            {'Save'}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export interface NewLinkCardProps extends WithStyles<typeof styles> {
  clickHandler: (link: CustomLink) => void;
}

export default withStyles(styles, { withTheme: true })(NewLinkCard);
