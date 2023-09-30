import {useState,useEffect,} from'react';
import { Text, SafeAreaView, StyleSheet,TouchableOpacity,Image,ScrollView,TextInput } from 'react-native';

import Firebase from'../firebase';

export default function Login({navigation}){
const[email, setEmail]= useState('');
  const[senha, setSenha] = useState('');
  const[user, setUser]= useState('');

  function login(){
Firebase.auth().signInWithEmailAndPassword(email, senha)
  .catch(function (error) {
  
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorCode, errorMessage);
   
  })
  }
  useEffect(()=>{
    Firebase.auth().onAuthStateChanged(function(user){
      setUser(user);
      if(initializing) setInitializing(false);
    });
  },[])


if(user){
    alert("BEM-VINDO"+user.uid);
    return navigation.navigate('Home');
 }
 else{
 //alert('Senha ou Email errado');
 }


  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
    
    <Image source={require('../assets/logooo.png')} style={styles.logo}>
   </Image>

    <Text style={styles.textoentrar}></Text>
    
    <TextInput
    placeholderTextColor={'#B0C4DE'}
    style={styles.textinput}
    placeholder="Digite o email"
    onChangeText={(email) => setEmail(email)}
    value={email}
    />
  
  <TextInput
    placeholderTextColor={'#B0C4DE'}
    style={styles.textinput}
    placeholder="Senha Secreta ;)"
    onChangeText={(senha) => setSenha(senha)}
    value={senha}
    />

    <TouchableOpacity
    style={styles.botao}
    onPress={() =>{ 
    login();
    }}>
    <Text style={styles.textboxbutao}>Acessar</Text>
    </TouchableOpacity>
     </ScrollView>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'#B22222',
    padding: 8,
    paddingTop:140,
  },
  logo:{
    width:250,
    height:200,
    borderRadius:150,
  },
  textinput:{
  width:260,
  paddingLeft:10,
  backgroundColor:'#FFFFF0',
  color:'#800000',
  marginTop:10,
  fontSize:20,
  fontWeight:'bold',
  borderRadius:10,
  },
  textoentrar:{
    marginTop:55,
    marginBottom:10,
    fontWeight:'bold',
    fontSize:30,
  },
  botao:{
    flex:1,
    marginTop:20,
    alignItems:'center',
    width:230,
    backgroundColor:'#FF4500',
    color:'#DCDCDC',
    borderRadius:20,

  },
  textboxbutao:{
    fontSize:30,
    color:'#DCDCDC',
    fontWeight:'bold',
  }
 
});
