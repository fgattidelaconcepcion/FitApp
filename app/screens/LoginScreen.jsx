import { StyleSheet, Text, View, Pressable } from 'react-native';
import { colors } from '../global/colors';
import React, { useState } from "react";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useDispatch } from 'react-redux';
import { useSignInMutation } from '../services/authService';
import { setUser } from '../features/user/userSlice'; // Importa la acción setUser
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const [triggerSignIn, result] = useSignInMutation();
    const navigation = useNavigation(); // Obtén el objeto navigation

    const onSubmit = async () => {

        try {
            const signInResult = await triggerSignIn({ email, password, returnSecureToken: true }); // Asegúrate de solicitar el token

            if (signInResult?.data?.idToken) { // Utiliza idToken aquí
                console.log('Inicio de sesión exitoso:', signInResult.data);
                // **Despacha la acción setUser para actualizar el estado de autenticación**
                dispatch(setUser({
                    user: signInResult.data.email, // O la información del usuario que necesites
                    token: signInResult.data.idToken // Utiliza signInResult.data.idToken
                }));
                // **La navegación a la siguiente pantalla se maneja en StackNavigator
                // al detectar el cambio en el estado 'user' de Redux.**

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
                <InputForm label={"email"} onChange={setEmail} error={""} value={email} />
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