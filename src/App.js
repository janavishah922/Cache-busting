import React, { Component } from "react";
import CacheBuster from "./CacheBuster";
import "./App.css";

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
              <header className="App-header">
                <h1>Cache Busting - Example</h1>
                <p>
                  Bundle version - <code>v{global.appVersion}</code>
                </p>
                <img src="/assets/img/1.jpg" width="150" height="150" alt="i1" />
                <img src="assets/img/2.jpg" alt="i1" width="150" height="150" />
              </header>
            </div>
          );
        }}
      </CacheBuster>
    );
  }
}

export default App;
