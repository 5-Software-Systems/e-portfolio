import React, { Fragment } from 'react';
import Test from '../components/Test';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
import Fade from '@material-ui/core/Fade';


export default function BaseTemplate(props) {
    return (
        <Fragment>
            <PersistentDrawerLeft nav_right={props.nav_right}/>
            <section className="main_content">
                {props.children}
            </section>
            <footer className="border-top text-center text-muted">
                <p><a href="/demo" tabIndex="-1">FiveCent Software Systems.</a></p>
                <Test />
            </footer>
        </Fragment>
    );
}

const drawerWidth = 240;

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
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    flexShrink: 0,
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
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(! open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open)}
          >
            <img src={process.env.PUBLIC_URL + "/images/Logo.svg"} alt="" height="50" />
          </IconButton>
          <Typography variant="h6" className={classes.content} noWrap>
            Echidna
          </Typography>
          <div className={clsx(open && classes.hide)}>
              {props.nav_right}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
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