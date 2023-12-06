import { Avatar } from '@rneui/themed';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions
} from 'react-native';
import Number from './Number'


export default class Header_pedido extends React.Component<any> {
  render() {

    const userormesa = this.props.numero_mesa?
    //styles seria preto ou branco 
    //pedido_tamanho condicao boolean para notificar o number que é a tela maior navegation Pedido onde lista os itens
   <Number number={this.props.numero_mesa} pedido_tamanho />:
    <Avatar
      size={250}
      rounded
      //tem imagem do usuario? se nao usa o icone de anonimo
      source={this.props.image_on ? { uri: this.props.image_on } : undefined}
     
      icon={!this.props.image_on ? { name: 'account-circle', type: 'material-icons', 
       
      color:'#E8F0FE' } : undefined}
      containerStyle={{
        width:150,
        height:150,
        margin:10
      }}
    />
    return (
      <SafeAreaView style={styles.container}>
        <Text  style={styles.textuser}>User :</Text>
        {userormesa}
            
        <Text style={styles.text}>{this.props.name_on}</Text>
        <View style={styles.divider}/>
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    
    
  },
  textuser:{
    position:'absolute',
    left:10,
    top:1,
    fontFamily: 'OpenSans-Bold',
    color: '#F4F7FC',
    fontSize: 35,
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    color: '#F4F7FC',
    fontSize: 20, // Defina o tamanho da fonte aqui
  },
  divider: {
    width:"100%",
    borderBottomColor: '#F4F7FC',
    borderBottomWidth: 2,
    
  }
});
