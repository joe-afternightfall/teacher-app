import React from 'react';
import {
  Theme,
  useTheme,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import NestedList from './NestedList';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import ResponsiveSideDrawer from './components/app-shell/ResponsiveSideDrawer';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    // drawer: {
    //   [theme.breakpoints.up('sm')]: {
    //     width: drawerWidth,
    //     flexShrink: 0,
    //   },
    // },
    appBar: {
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    // drawerPaper: {
    //   width: drawerWidth,
    // },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

// interface Props {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window?: () => Window;
// }

export default function ResponsiveDrawer() {
  // const { window } = props;
  const classes = useStyles();
  // const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>

      <ResponsiveSideDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      {/*<nav className={classes.drawer}>*/}
      {/*  <Hidden smUp>*/}
      {/*    <Drawer*/}
      {/*      container={container}*/}
      {/*      variant="temporary"*/}
      {/*      anchor={theme.direction === 'rtl' ? 'right' : 'left'}*/}
      {/*      open={mobileOpen}*/}
      {/*      onClose={handleDrawerToggle}*/}
      {/*      classes={{*/}
      {/*        paper: classes.drawerPaper,*/}
      {/*      }}*/}
      {/*      ModalProps={{*/}
      {/*        keepMounted: true, // Better open performance on mobile.*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      {<NestedList />}*/}
      {/*    </Drawer>*/}
      {/*  </Hidden>*/}
      {/*  <Hidden xsDown>*/}
      {/*    <Drawer*/}
      {/*      classes={{*/}
      {/*        paper: classes.drawerPaper,*/}
      {/*      }}*/}
      {/*      variant="permanent"*/}
      {/*      open*/}
      {/*    >*/}
      {/*      {<NestedList />}*/}
      {/*    </Drawer>*/}
      {/*  </Hidden>*/}
      {/*</nav>*/}
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}
