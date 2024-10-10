import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState(''); 
  const navigation = useNavigation();
  const [isSignUp, setIsSignUp] = useState(false); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Home');
      }
    });
    return unsubscribe; 
  }, []);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Kullanıcı kaydedildi:', user.email);
        const userData = {
          uid: user.uid,
          email: user.email,
          firstName,
          lastName,
        };
       
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setIsSignUp(false); 
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Kullanıcı giriş yaptı:', user.email);

        setEmail('');
        setPassword('');
        setIsSignUp(false); 
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/wrong-password':
            alert('Yanlış şifre. Lütfen tekrar deneyin.');
            break;
          case 'auth/user-not-found':
            alert('Kullanıcı bulunamadı. Kayıt olmaya ne dersiniz?');
            break;
          default:
            alert(error.message);
        }
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        {isSignUp && (
          <>
            <TextInput
              style={styles.input}
              placeholder="İsim"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Soyisim"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
          </>
        )}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        {!isSignUp ? (
          <>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Giriş Yap</Text>
            </TouchableOpacity>
            <Text style={styles.registerText}>
              Hesabın yok mu? <Text style={styles.registerLink} onPress={() => setIsSignUp(true)}>Kaydol.</Text>
            </Text>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Kayıt Ol</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsSignUp(false)}
              style={[styles.button, styles.outlineButton]}
            >
              <Text style={styles.outlineButtonText}>Giriş Yap</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    width: '60%',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  outlineButton: {
    backgroundColor: 'white',
    marginTop: 5,
  },
  outlineButtonText: {
    color: '#0782F9',
    fontSize: 16,
    fontWeight: '700',
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  registerLink: {
    color: '#0782F9',
    fontWeight: '700',
  },
});
