import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, {useEffect, useState} from 'react'
import { colors } from '../global/colors';
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useDispatch } from 'react-redux';
import { useSignUpMutation } from '../services/authService';
import { signupSchema } from '../validations/authSchema';
import { setUser } from '../features/user/userSlice';

const SignupScreen = ({navigation}) => {
        const [email, setEmail] = useState("");
        const [errorMail, setErrorMail] = useState("");
        const [password, setPassword] = useState("");
        const [errorPassword, setErrorPassword] = useState("");
        const [confirmPassword, setconfirmPassword] = useState("");
        const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

        const dispatch = useDispatch()

        const [triggerSignUp, result] = useSignUpMutation()

        useEffect(()=>{
            if(result.isSuccess){
            dispatch(
              setUser({
                email: result.data.email,
                idToken: result.data.idToken,
              })
            );
            }
        },[result])

        const onSubmit = () => {
            try {
                setErrorMail("");
                setErrorPassword("")
                setErrorConfirmPassword("")
                signupSchema.validateSync({email, password, confirmPassword})
                triggerSignUp({ email, password, returnSecureToken: true });
            } catch (err) {
                console.log("entro en el signup del error")
                console.log(err)
                switch (err.path) {
                  case "email":
                    setErrorMail(err.message);
                    break;
                  case "pasword":
                    setErrorPassword(err.message);
                    break;
                }
            }
        }

return (
  <View style={styles.main}>
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <InputForm label={"Mail"} onChange={setEmail} error={errorMail} />
      <InputForm
        label={"Contraseña"}
        onChange={setPassword}
        error={errorPassword}
        isSecure={true}
      />
      <InputForm
        label={"Confirmar contraseña"}
        onChange={setconfirmPassword}
        error={errorConfirmPassword}
        isSecure={true}
      />
      <SubmitButton onPress={onSubmit} title="Aceptar" />
      <Text style={styles.sub}>¿Ya tienes una cuenta?</Text>
      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={styles.subLink}>Inicio de sesión</Text>
      </Pressable>
    </View>
  </View>
);
}

export default SignupScreen

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
    fontFamily: "Josefin",
    color: "black",
  },
  subLink: {
    fontSize: 14,
    fontFamily: "Josefin",
    color: "blue",
  },
});