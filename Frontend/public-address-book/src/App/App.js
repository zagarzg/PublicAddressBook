import React from 'react';
import SideMenu from '../components/SideMenu';
import './App.css';
import { makeStyles, CssBaseline, ThemeProvider, createMuiTheme } from '@material-ui/core';
import Header from '../components/Header';
import Contacts from '../pages/Contacts'

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
})

function App() {

  const classes = useStyles();

  return (
  <>
    <SideMenu />
    <div className={classes.appMain}>
      <Header />
    </div>
    <Contacts />
    <CssBaseline />
  </>
  );
}

export default App;
