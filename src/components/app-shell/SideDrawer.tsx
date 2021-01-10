import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import { Styles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles: Styles<Theme, StyledComponentProps> = () => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginRight: 16,
  },
});

class SideDrawer extends Component<SideDrawerProps> {
  state = {
    open: false,
  };

  render(): JSX.Element {
    const { classes } = this.props;

    const toggleDrawer = () => {
      this.setState({
        open: !this.state.open,
      });
    };

    return (
      <React.Fragment>
        <IconButton
          edge={'start'}
          color={'inherit'}
          aria-label={'menu'}
          className={classes.menuButton}
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Drawer open={this.state.open} onClose={toggleDrawer}>
          <div
            className={classes.list}
            role={'presentation'}
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
          >
            <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                (text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                )
              )}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      </React.Fragment>
    );
  }
}

export type SideDrawerProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(SideDrawer);
