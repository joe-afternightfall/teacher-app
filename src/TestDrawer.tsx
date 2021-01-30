import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ResponsiveSideDrawer from './components/app-shell/ResponsiveSideDrawer';
import AppBar from './components/app-shell/AppBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

export default function ResponsiveDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <ResponsiveSideDrawer
        open={open}
        handleDrawerToggle={handleDrawerToggle}
      />

      <main className={classes.content}>
        <AppBar tempToggleSideDrawerHandler={handleDrawerToggle} />

        {/*<div className={classes.toolbar} />*/}
      </main>
    </div>
  );
}
