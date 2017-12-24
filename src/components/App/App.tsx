import * as React from 'react';
import Main from './Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import * as logo from './logo.svg';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <MuiThemeProvider>
        <div
          style={{maxWidth: '500px',
                  marginLeft: 'auto',
                  marginRight: 'auto'}}
        >
        <a href="/">
          <AppBar
            style={{position: 'fixed',
              maxWidth: '500px',
              marginLeft: 'auto',
              marginRight: 'auto'}}
            title="Turnato"
            iconElementLeft={
              <img
               src={logo}
               style={{color: 'white', width: '32px',
                       height: '32px', marginTop: '8px'}}
               alt="Turnato logo."
              />}
          />
        </a>
        <div style={{height: '64px'}} />
        <Main />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;