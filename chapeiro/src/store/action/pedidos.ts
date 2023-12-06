
import axios from 'axios'
import {SET_PEDIDOS} from './actionTypes'
import { Dispatch } from 'redux'
//auth
import { db } from '../auth';

import { collection,doc,onSnapshot,getDocs,query, where, updateDoc} from "firebase/firestore"; 
import { setMessage } from './message';
import { fetchuser_get } from './user';

//onSnapshot para atualizar caso alguma informacao mude 
export const startPedidosListener = () => {
  return (dispatch: any) => {

    const q = query(collection(db, "pedidos"), where("status_porcoes", "==", true));
    onSnapshot(q, (snapshot) => {
      const cities: any[] = [];
      snapshot.forEach((doc) => {
          cities.push(doc.data());
      });
      if(cities.length === 1) {
        onDisplayNotification()
      }
      dispatch(fetchuser_get())
      dispatch(fetchpedidos());
    }); 
  };
};


//chamada assyncrona com o firebase get () com QUERY e WHERE retornando uma consulta especifica

export const fetchpedidos =  () =>{
  return async (dispatch:any)=>{
    try {
      const q = query(collection(db, "pedidos"), where("status_porcoes", "==", true));
      // const pedidosCol = collection(db, 'pedidos');
      const querySnapshot = await getDocs(q);
      const pedidos = querySnapshot.docs.map((doc) => {
        const rawPedidos = doc.data();
        return {
          ...rawPedidos,
          id: doc.id
        };
      }); 
      pedidos.sort((a:any, b:any) => a.ordem - b.ordem)
      // console.log("pedidossssssss") sda
      
       dispatch(setPedidos(pedidos))
      
    } catch (e) {
      console.error("Error fetching documents: ", e);
      dispatch(setMessage({
        title: 'Error',
        text: 'Ocorreu um erro ao contatar o servidor dos Pedidos'
      }))
    }
    ///////////ANTIGO  data base///////////
      // axios.get('/pedidos.json')
      // .catch(err => console.log(err))
      // .then((res:any) => {
          
      //     const rawPedidos = res.data
      //     const pedidos = []
      //     for (let key in rawPedidos) {
      //         pedidos.push({
      //             ...rawPedidos[key],
      //             id: key
      //         })
      //     }
      //     dispatch(setPedidos(pedidos))
      // })
  }
}
// chamda apra atualizar o status_chapeiro
export const fetchatualizar_pedido = (id:any) => {
  return async (dispatch:any)=>{

    const pedidoRef = doc(db, 'pedidos', id);
    await updateDoc(pedidoRef, {
      status_porcoes: false
    });
    dispatch(fetchpedidos());
    ///////////ANTIGO  data base///////////
      // axios.patch(`/pedidos/${id}.json`, {
      //     status_lanche : true
      // }).catch(err => console.log(err))
      // .then((res:any) => {
      //     dispatch(fetchpedidos())
      // })
  }
}
// definir no redux os pedidos ACTION
export const setPedidos =  (pedidos:any) => {
  return { 
      type:SET_PEDIDOS,
      payload:pedidos
  }

}


/////////////////notificacao ///////////////////////////////////
import * as Notifications from 'expo-notifications';

async function onDisplayNotification() {
  try {
    // Solicitar permissões (necessário para iOS)
    await Notifications.requestPermissionsAsync();

    // Criar um canal (necessário para Android)
    const channelId = 'default';
    await Notifications.setNotificationChannelAsync(channelId, {
      name: 'Default Channel',
      importance: Notifications.AndroidImportance.HIGH,
    });

    // Exibir uma notificação
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Novo Pedido',
        body: 'Vamos começar!',
      },
      trigger: null, // para exibir imediatamente, ou você pode definir um gatilho específico
    });

    console.log('Notificação enviada com sucesso.');
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
  }
}


/////////////////////////////////////////////////////////////

  


