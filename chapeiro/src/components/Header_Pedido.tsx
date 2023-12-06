import { Avatar, FAB } from '@rneui/themed';
import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Number from './Number';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createAndOpenPDF } from '../store/action/html_pdf';
import { connect } from 'react-redux';

const Header_pedido = (props:any) => {
  const [loading, setLoading] = useState(false);

  const handlePress = async (pedido_itens, array_pdf) => {
    try {
      setLoading(true);

      // Sua lógica de impressão e compartilhamento aqui
      await createAndOpenPDF(pedido_itens, array_pdf);

      // Simulando uma operação assíncrona
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Após a conclusão bem-sucedida, você pode redefinir o estado de carregamento
      setLoading(false);
    } catch (error) {
      // Lida com erros, se houver
      setLoading(false);
    }
  };

  const userormesa = props.numero_mesa ?
    <Number number={props.numero_mesa} pedido_tamanho /> :
    <Avatar
      size={250}
      rounded
      source={props.image_on ? { uri: props.image_on } : undefined}
      icon={!props.image_on ? { name: 'account-circle', type: 'material-icons', color: '#E8F0FE' } : undefined}
      containerStyle={{
        width: 150,
        height: 150,
        margin: 10
      }}
    />;

  const id_pedido = () => {
    const itens = props.pedidos.find(item => item.id === props.id);
    const itens_chapeiro = itens.itens.filter(item => item.categoria === 'comidas' && (item.categoria_2 === 'hotdogs' || item.categoria_2 === 'lanches'))
    return itens_chapeiro ? itens_chapeiro : [];
  };

  const pedido_itens = id_pedido();
  const array_pdf = [props.numero_mesa, props.pegar_local, props.rua, props.numero, props.dinheiro, props.cartao, props.pix];

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.textuser}>User :</Text>
        {userormesa}
        <FAB
          loading={loading}
          onPress={() => handlePress(pedido_itens, array_pdf)}
          visible={true}
          icon={{ name: 'print', color: '#d6cecd' }}
          size="large"
          color='#3C4043'
          style={{ borderColor: 'tomato', borderWidth: 1, elevation: 15, shadowColor: 'tomato' }}
        />
      <Text style={styles.text}>{props.name_on}</Text>
      <View style={styles.divider} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textuser: {
    position: 'absolute',
    left: 10,
    top: 1,
    fontFamily: 'OpenSans-Bold',
    color: '#F4F7FC',
    fontSize: 35,
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    color: '#F4F7FC',
    fontSize: 20,
  },
  divider: {
    width: '100%',
    borderBottomColor: '#F4F7FC',
    borderBottomWidth: 2,
  },
  headerTop: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = ({ pedidos }: { pedidos: any }) => {
  return {
    pedidos: pedidos.pedidos
  };
};

export default connect(mapStateToProps)(Header_pedido);
