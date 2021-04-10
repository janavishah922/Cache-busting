import React from 'react';
import packageJson from '../package.json';
global.appVersion = packageJson.version;
// version from response - first param, local version second param
const semverGreaterThan = (versionA, versionB) => {
 
  const versionsA = versionA.split(/\./g);
  
  const versionsB = versionB.split(/\./g);
  while (versionsA.length || versionsB.length) {
    const a = Number(versionsA.shift());
   
    const b = Number(versionsB.shift());
    
    // eslint-disable-next-line no-continue
    if (a === b) continue;
    // eslint-disable-next-line no-restricted-globals
    return a > b || isNaN(b);
  }
  return false;
};

class CacheBuster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isLatestVersion: false,
      
      refreshCacheAndReload: async() => {
        console.log('Clearing cache and hard reloading...')
        
        if (caches) {
          caches.keys().then(async function(names) {
            await Promise.all(names.map(name => caches.delete(name)));
            });
        }
        window.location.reload();
      }
    };
  }

  componentDidMount() {
    fetch('/meta.json')
      .then((response) => response.json())
      .then((meta) => {
        const latestVersion = meta.version;
        const currentVersion = global.appVersion;
        console.log("metaVersion", latestVersion)
        console.log("currentVersion", currentVersion)
        const shouldForceRefresh = semverGreaterThan(latestVersion, currentVersion);
        if (shouldForceRefresh) {
          console.log(`We have a new version - ${latestVersion}. Should force refresh`);
          this.setState({ loading: false, isLatestVersion: false });
        } else {
          console.log(`You already have the latest version - ${latestVersion}. No cache refresh needed.`);
          this.setState({ loading: false, isLatestVersion: true });
        }
      });
  }
  render() {
    console.log(caches)
    const { loading, isLatestVersion, refreshCacheAndReload } = this.state;
    return this.props.children({ loading, isLatestVersion, refreshCacheAndReload });
  }
}

export default CacheBuster;
