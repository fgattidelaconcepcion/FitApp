import { StyleSheet, Text, View, Pressable } from 'react-native';
import { colors } from '../global/colors';
import React, { useState, useEffect } from "react"; 
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useDispatch } from 'react-redux';
import { useSignInMutation } from '../services/authService';
import { setUser } from '../features/user/userSlice'; 
import { useNavigation } from '@react-navigation/native'; 
import { useSession } from '../hooks/useSession';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const [triggerSignIn, result] = useSignInMutation();
    const navigation = useNavigation(); 

   
    const {insertSession} = useSession()

    useEffect(() => {
        if (result.isSuccess) {
          (async () => {
            try {
              await insertSession({
                localId: result.data.localId,
                email: result.data.email,
                token: result.data.idToken,
              });
              console.log("Session created:", result.data);
              dispatch(
                setUser({
                  email: result.data.email,
                  idToken: result.data.idToken,
                  localId: result.data.localId,
                })
              );
            } catch (err) {
              console.log("Error inserting session:", err);
            }
          })();
        }
    }, [result]);

    const onSubmit = async () => {
      try {
        const signInResult = await triggerSignIn({
          email,
          password,
          returnSecureToken: true,
        });
    
        if (signInResult?.data?.idToken) {
          const { localId, email, idToken } = signInResult.data;
    
          console.log('Inicio de sesión exitoso:', signInResult.data);
    
          //Guardar sesión en SQLite
          await insertSession({
            localId,
            email,
            token: idToken,
          });
    
          // Guardar en Redux
          dispatch(
            setUser({
              user: email,
              token: idToken,
              localId: localId,
            })
          );
        } else if (signInResult?.error) {
          console.error('Error al iniciar sesión:', signInResult.error);
          
        }
      } catch (error) {
        console.error('Error inesperado al iniciar sesión:', error);
      }
    };

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.title}>Inicio de sesión</Text>
                <InputForm label={"Mail"} onChange={setEmail} error={""} value={email} />
                <InputForm
                    label={"Contraseña"}
                    onChange={setPassword}
                    error={""}
                    isSecure={true}
                    value={password}
                />
                <SubmitButton onPress={onSubmit} title="Aceptar" />
                <Text style={styles.sub}>No tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.subLink}>Registrarse</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "90%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
        gap: 15,
        paddingVertical: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 22,
        fontFamily: "Josefin",
    },
    sub: {
        fontSize: 14,
        color: "black",
    },
    subLink: {
        fontSize: 14,
        color: "blue",
    },
});
