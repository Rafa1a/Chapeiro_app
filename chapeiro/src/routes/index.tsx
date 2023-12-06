
import React from 'react';
import {SafeAreaView} from 'react-native';

import {NavigationContainer }from  '@react-navigation/native'

import Stacks from './Navegation';


export default (props: any) => {
   
  return (
// navegacao stack 
    <SafeAreaView style={{ flex:1 }}>
      <NavigationContainer>
        
         <Stacks {...props} />
    
      </NavigationContainer>
    </SafeAreaView>
  );
}




