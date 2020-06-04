import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/validations"
import { size, isEmpty } from "lodash"
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../components/Loading"

export default function RegisterForm(props){
    const {toastRef } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [ShowRepeatPassword, setShowRepeatPassword] = useState(false)
    const [formData, setformData] = useState(defaultFormValue());
    const [loading, setloading] = useState(false)
    const navigation = useNavigation();

    const onsubmit = () => {
        if (
            isEmpty(formData.email) ||
            isEmpty(formData.password) ||
            isEmpty(formData.repeatPassword)
        )  {
           toastRef.current.show("Todos los campos son obligatorios")
        } else if (!validateEmail(formData.email)) {
            toastRef.current.show("Email no es válido")
        } else if (formData.password !== formData.repeatPassword) {
            toastRef.current.show("Las contraseñas deben ser iguales")
        } else if (size(formData.password) <6) {
            toastRef.current.show("La contraseña debe tener al menos 6 caracteres")
        } else {
            setloading(true);
            firebase
            .auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then(() => {
                setloading(false);
                navigation.navigate("account");
            })
            .catch(() => {
                setloading(false);
                toastRef.current.show("El email ya está registrado")
            } 
            )
        }
    };

    const onChange = (e, type) => {
      setformData({...formData, [type]: e.nativeEvent.text})
    };

    return(
        <View styles={styles.formContainer}>
            <Input
            placeholder="Correo electronico"
            containerStyle={styles.inputForm}
            onChange={(e) => onChange(e, "email")}
            rightIcon={
                <Icon
                    type="material-community"
                    name="at"
                    iconStyle={styles.iconRight}
                />
            }
            />
         <Input
            placeholder="Contraseña"
            containerStyle={styles.inputForm}
            password={true}
            secureTextEntry={showPassword ? false : true}
            onChange={(e) => onChange(e, "password")}
            rightIcon={
                <Icon
                    type="material-community"
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.iconRight}
                    onPress={() => setShowPassword(!showPassword)}
                />
            }
            />
         <Input
            placeholder="Repetir Contraseña"
            containerStyle={styles.inputForm}
            password={true}
            secureTextEntry={ShowRepeatPassword ? false : true}
            onChange={(e) => onChange(e, "repeatPassword")}
            rightIcon={
                <Icon
                    type="material-community"
                    name={ShowRepeatPassword ? "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.iconRight}
                    onPress={() => setShowRepeatPassword(!ShowRepeatPassword)}
                />
            }
            />
            <Button
                title={"Unirse"}
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={onsubmit}
            />
            <Loading
                isVisible={loading}
                text="Creando cuenta"
            />
        </View>
    );

}

function defaultFormValue (){
    return {
        email: "",
        password: "",
        repeatPassword: "",
    }   
};

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    inputForm: {
        width: "100%",
        marginTop: 20,

    },
    btnContainerRegister: {
        marginTop: 20,
        width: "95%",
    },
    btnRegister: {
        backgroundColor: "#00a680",
    },
    iconRight: {
        color: "#c1c1c1"
    },

});