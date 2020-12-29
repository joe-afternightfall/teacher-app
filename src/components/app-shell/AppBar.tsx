import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import { State } from '../../configs/redux/store';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position={'static'}>
      <Toolbar>
        <IconButton
          edge={'start'}
          className={classes.menuButton}
          color={'inherit'}
          aria-label={'menu'}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant={'h6'} className={classes.title}>
          {"Jamie's Teacher App"}
        </Typography>
        {auth && (
          <div>
            <IconButton
              aria-label={'account of current user'}
              aria-controls={'menu-appbar'}
              aria-haspopup={'true'}
              onClick={handleMenu}
              color={'inherit'}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id={'menu-appbar'}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export interface AppBarProps {
  username: string | null;
}

const mapStateToProps = (state: State): AppBarProps => {
  return ({
    username: state.applicationState.username,
  } as unknown) as AppBarProps;
};

const mapDispatchToProps = (dispatch: Dispatch): AppBarProps => {
  return ({} as unknown) as AppBarProps;
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuAppBar);
