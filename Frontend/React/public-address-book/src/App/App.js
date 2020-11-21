import React from 'react';
import SideMenu from '../components/SideMenu';
import './App.css';
import { makeStyles, CssBaseline, ThemeProvider, createMuiTheme } from '@material-ui/core';
import Header from '../components/Header';
import  Contacts  from '../pages/Contacts';
import { store } from '../actions/store';
import { Provider } from 'react-redux';

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
})

function App() {

  const classes = useStyles();

  return (
  <Provider store={store}>
    <SideMenu />
    <div className={classes.appMain}>
      <Header />
      <Contacts />
    </div>
    <CssBaseline />
  </Provider>
  );
}

export default App;
