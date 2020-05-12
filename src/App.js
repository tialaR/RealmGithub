import React from 'react';
import { StatusBar } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Main from './pages/Main';

MaterialIcons.loadFont();
FontAwesome.loadFont();

const App = () => {
  return (
    <>
      <Main />
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />
    </>
  );
};

export default App;
