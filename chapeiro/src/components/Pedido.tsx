import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from '@rneui/themed';
import { Icon } from '@rneui/themed';
import Number from './Number'
import { pedido_props } from '../interface/inter';



export default class Pedido extends React.Component<pedido_props> {
  render() {
   

    const handlePress = () => {
      //clicar redireciona para os itens do pedido e passa as propriedades
        this.props.navigation?.navigate('Pedido',{ id:this.props.id,numero_mesa: this.props.numero_mesa, image_on: this.props.image_on, name_on:this.props.name_on, styles:this.props.styles})
    };

    // ususario ou mesa como retorno da const 
    const userormesa = this.props.numero_mesa?
    //styles seria preto ou branco 
    this.props.styles?<Number number={this.props.numero_mesa} styles/>:<Number number={this.props.numero_mesa} />:
    <Avatar
      size={100}
      rounded
      //tem imagem do usuario? se nao usa o icone de anonimo
      source={this.props.image_on ? { uri: this.props.image_on } : undefined}
     
      icon={!this.props.image_on ? { name: 'account-circle', type: 'material-icons', 
       //icone preto ou branco
      color: this.props.styles? '#3C4043':'#E8F0FE' } : undefined}
      containerStyle={{
        width: this.props.image_on?50:60,
        margin:this.props.image_on?7:null,
        aspectRatio: 1,
      }}
    />
      // se tem o nome ou nao
    const username = this.props.name_on?<Text style={this.props.styles?styles.textindex0:styles.text}>{this.props.name_on}</Text>:null
      // styles diz se esta em primeiro ou nao na ordem de pedidos || refere a cor pois o primeiro item o funco é branco e o restante é preto ...
    const icon_lanche = this.props.styles ?
     <Avatar size={60} source={require('../assets/image/porcao.png')} 
     containerStyle={{
       position:'absolute',
       bottom:5,
       right:20
     }}/> : null;
    
    return (
      
      <SafeAreaView style={styles.containerM}>
        <TouchableOpacity onPress={handlePress }>
        <View style={this.props.styles?styles.containerindex0:styles.container}>
        <View style={styles.content}>
          {userormesa}
          {username}
        </View>
        
        {/* <Icon size={23} raised name="minus" type="evilicon" onPress={() => console.warn('hello')} color='#252A32' /> */}
       
        {icon_lanche}
        {this.props.styles?<View
        style={{
          position: 'absolute',
          top: 56, // ajuste a posição vertical conforme necessário
          right: 25, // ajuste a posição horizontal conforme necessário
          zIndex: 1,
         backgroundColor:'#0000001a',
         borderRadius:25,
         width:50,
         height:15
          
          
        }}
      />:null}
        </View>
        </TouchableOpacity>
      </SafeAreaView>
    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3C4043',
    borderRadius: 50,
    height:Dimensions.get('window').width*1/7,
    width: Dimensions.get('window').width/1.6
  },
  containerindex0: {
    
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F4F7FC',
    borderRadius: 50,
    height:Dimensions.get('window').width*1/5.5,
    width: Dimensions.get('window').width/1.29,
    marginRight:"10%",
    marginLeft:"10%",
    
  },
  containerM: {
    
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    
   
    height:Dimensions.get('window').width*1/5.5,
    width: "100%"
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  text: {
    fontFamily:"RobotoMono-Bold",
    color: '#E8F0FE',
  },
  textindex0: {
    fontFamily:"RobotoMono-Bold",
    color: '#3C4043',
  },
  numbers: {
    width:'38%',
    aspectRatio: 1,
  },
  outros: {},
});
