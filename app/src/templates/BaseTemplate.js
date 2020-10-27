import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import { isLoggedIn, deauthorize } from "../util/cookies";
import { useHistory } from "react-router-dom";

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ContactIcon from '@material-ui/icons/RecentActors';
import UpdatesIcon from '@material-ui/icons/DynamicFeed';
import LoginIcon from '@material-ui/icons/LockOpen';
import SignUpIcon from '@material-ui/icons/ContactMail';
import GalleryIcon from '@material-ui/icons/ViewCarousel';
import HelpIcon from '@material-ui/icons/Help';
import SettingsIcon from '@material-ui/icons/Settings';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


export default function BaseTemplate(props) {
    return (
        <Fragment>
            <PersistentDrawerLeft nav_right={props.nav_right}/>
            <section className="main_content">
                {props.children}
            </section>
            <footer className="border-top text-center text-muted">
                <p><a href="/">FiveCent Software Systems.</a></p>
            </footer>
        </Fragment>
    );
}

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: -drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  show: {
    transition: theme.transitions.create(['visibility', 'opacity'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
  },
  hide: {
    visibility: 'none',
    opacity: 0,
    transition: theme.transitions.create(['visibility', 'opacity'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
  },
  drawer: {
    flexShrink: 0,
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(! open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  async function handleLogout() {
        // clear cookies
        deauthorize().then(() => {
            history.push("/");
        });
    }

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            href="/"
            edge="start"
            className={clsx(classes.menuButton, open)}
          >
              <img src={process.env.PUBLIC_URL + "/images/Logo.svg"} alt="Logo" height="50" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Echidna
          </Typography>
          <div position="static"
               className={clsx(classes.show, {
                 [classes.hide]: open,
               })}
          >
              {/* this is jank af but it works*/}
              { isLoggedIn() ?
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
              :
                props.nav_right
              }
          </div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
          <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button key="home" component={Link} to="/">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button key="contacts" component={Link} to="/contact">
              <ListItemIcon><ContactIcon /></ListItemIcon>
              <ListItemText primary="Contact Us" />
            </ListItem>
            <ListItem button key="update" component={Link} to="/updates">
              <ListItemIcon><UpdatesIcon /></ListItemIcon>
              <ListItemText primary="Updates" />
            </ListItem>
            <ListItem button key="help" component={Link} to="/help">
              <ListItemIcon><HelpIcon /></ListItemIcon>
              <ListItemText primary="Help" />
            </ListItem>
        </List>
        <Divider />
        { isLoggedIn() ?
            <UserNav />
        :
            <List>
                <ListItem button key="login" component={Link} to="/login">
                  <ListItemIcon><LoginIcon /></ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem button key="signup" component={Link} to="/signup">
                  <ListItemIcon><SignUpIcon /></ListItemIcon>
                  <ListItemText primary="Sign Up" />
                </ListItem>
            </List>
        }
      </Drawer>
    </div>
  );
}

export function UserNav() {
    const history = useHistory();

    async function handleLogout() {
        // clear cookies
        deauthorize().then(() => {
            history.push("/");
        });
    }

    return (
        <List>
            <ListItem button key="Gallery" component={Link} to="/profile">
              <ListItemIcon><GalleryIcon /></ListItemIcon>
              <ListItemText primary="Portfolio Gallery" />
            </ListItem>
            <ListItem button key="Settings" component={Link} to="/settings">
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Account Settings" />
            </ListItem>
            <ListItem button key="Logout" onClick={handleLogout}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
        </List>
    );
};