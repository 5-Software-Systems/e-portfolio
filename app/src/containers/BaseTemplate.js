import React, { Fragment } from 'react';
import Test from '../components/Test';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';


export default function BaseTemplate(props) {
    return (
        <Fragment>
            <ButtonAppBar nav_right={props.nav_right}/>
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="end" className={classes.menuButton} color='default' aria-label="menu">
            <a href="/" tabIndex="-1">
              <img src={process.env.PUBLIC_URL + "/images/Logo.svg"} alt="" height="50" />
            </a>
          </IconButton>
          <h6 className={classes.title}>Echidna</h6>
          {props.nav_right}
        </Toolbar>
      </AppBar>
    </div>
  );
}
