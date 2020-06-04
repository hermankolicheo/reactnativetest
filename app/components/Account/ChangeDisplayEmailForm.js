import React, { useState } from "react";
import {StyleSheet, View, Text} from "react-native";
import { Input, Button } from "react-native-elements";
import { validateEmail } from "../../utils/validations";
import * as firebase from "firebase";
import { reautenticar } from "../../utils/api";

export default function ChangeDisplayEmailForm(props) {
    const { email, setShowModal, toastRef, setReloadUserInfo } = props;
    const [FormData, setFormData] = useState(defaultValue());
    const [ShowPassword, setShowPassword] = useState(false);
    const [Error, setError] = useState({});
    const [IsLoading, setIsLoading] = useState(false);

    const onChange = (e, type) => {
        setFormData({...FormData, [type]: e.nativeEvent.text})
    }

   const onSubmit  = () =>{
        setError({});
        if (!FormData.email || email === FormData.email) {
            setError({
                email: "El email no ha cambiado",
            });
        } else if(!validateEmail(FormData.email)) {
            setError({
                email: "Email incorrecto",
            });
        } else if (!FormData.password) {
            setError({
                password:"Debe ingresar una contraseña",
            });
        } else {
            setIsLoading(true);
            reautenticar(FormData.password).then(response => {
                firebase.auth()
                    .currentUser.updateEmail(FormData.email)
                    .then(()=> {
                        setIsLoading(false);
                        setReloadUserInfo(true);
                        toastRef.current.show("Email actualizado correctamente");
                        setShowModal(false);
                    })
                    .catch(()=>{
                        setError({ email: "Error al actualizar email"});
                        setIsLoading(false);
                    });

            })
            .catch(() => {
                setIsLoading(false);
                setError({password: "La contraseña no es correcta"})
            });
        }
   }

   
    return (
        <View styles={styles.view}>
            <Input
                placeholder="Correo electrónico"
                containerStyle={styles.input}
                defaultValue={email || ""}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2",
                }}
                onChange={(e) => onChange(e, "email")}
                errorMessage={Error.email}

            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={ShowPassword ? false: true}
                rightIcon={{
                    type: "material-community",
                    name: ShowPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!ShowPassword),
                }}
                onChange={(e) => onChange(e, "password")}
                errorMessage={Error.password}                
            />
            <Button
                title="Cambiar correo electrónico"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={IsLoading}
            />
        </View>
    );
}

function defaultValue(){
    return{
        email: "",
        password: "",
    }
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    input: {
        marginBottom: 10,
    },
    btnContainer: {
        marginTop:20,
        width: "95%",
    },
    btn: {
        backgroundColor:"#00a680",
    },
});