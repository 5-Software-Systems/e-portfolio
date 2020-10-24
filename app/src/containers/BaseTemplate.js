import React, { Fragment } from 'react';
import Test from '../components/Test';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';


export default function BaseTemplate(props) {
    return (
        <Fragment>
            <ButtonAppBar nav_right={props.nav_right}/>
            <section className="main_content py-5">
                {props.children}
            </section>
            <footer className="border-top text-center text-muted">
                <p className="pt-3"><a href="/demo" tabIndex="-1">FiveCent Software Systems.</a></p>
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
          <Typography variant="h6" className={classes.title}>
            Echidna
          </Typography>
          {props.nav_right}
        </Toolbar>
      </AppBar>
    </div>
  );
}
