import { StyleSheet, Text, View, Pressable } from 'react-native';
import { colors } from '../global/colors';
import React, { useState } from "react";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useDispatch } from 'react-redux';
import { useSignInMutation } from '../services/authService';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState(''); // Inicializa el estado con strings vacíos
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const [triggerSignIn, result] = useSignInMutation(); // Cambié 'restul' a 'result' (error tipográfico común)

    const onSubmit = async () => {
        // Aquí llamamos a la mutación para iniciar sesión
        try {
            const signInResult = await triggerSignIn({ email, password });
            // Aquí puedes manejar el resultado de la mutación (por ejemplo, guardar el token, navegar, mostrar errores)
            if (signInResult?.data?.token) {
                console.log('Inicio de sesión exitoso:', signInResult.data);
                // TODO: Guardar el token en Redux o AsyncStorage y navegar a la siguiente pantalla
            } else if (signInResult?.error) {
                console.error('Error al iniciar sesión:', signInResult.error);
                // TODO: Mostrar un mensaje de error al usuario
            }
        } catch (error) {
            console.error('Error inesperado al iniciar sesión:', error);
            // TODO: Manejar el error inesperado
        }
    };

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.title}>Login to start</Text>
                <InputForm label={"email"} onChange={setEmail} error={""} value={email} /> {/* Añadí value para controlar el input */}
                <InputForm
                    label={"password"}
                    onChange={setPassword}
                    error={""}
                    isSecure={true}
                    value={password} 
                />
                <SubmitButton onPress={onSubmit} title="Send" />
                <Text style={styles.sub}>Not have an account?</Text>
                <Pressable onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.subLink}>Sign up</Text>
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