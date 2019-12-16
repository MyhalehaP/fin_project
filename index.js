/**
 * @format
 */

 import {AppRegistry} from 'react-native';
 import Login from './src/components/Login';
  import Dashboard from './src/components/Dashboard';
 import {name as appName} from './app.json';

 AppRegistry.registerComponent(appName, () => Login);
