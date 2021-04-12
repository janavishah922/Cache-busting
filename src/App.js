import React, { Component } from 'react';
import CacheBuster from './CacheBuster';
import './App.css';

class App extends Component {
  render() {
    return (
      <CacheBuster>
        {({ loading, isLatestVersion, refreshCacheAndReload }) => {
          if (loading) return null;
          if (!loading && !isLatestVersion) {
            refreshCacheAndReload();
          }

          return (
            <div className="App">
              <header className="App-header" >
                <h1>Cache Busting Project</h1>
                <p>
                  Bundle version - <code>v{global.appVersion}</code>
                </p>
                <img
                        alt="logo"
                        src="/assets/img/OssApi.jpg"
                        width="75"
                        height="75"
                        // className="responsive border-0 border-radius img-fluid mb-3"
                      />
                       <img
                        alt="header"
                        src="/assets/img/header.jpg"
                        width="75"
                        height="75"
                        // className="responsive border-0 border-radius img-fluid mb-3"
                      />
              </header>
            </div>
          );
        }}
      </CacheBuster>
    );
  }
}

export default App;
