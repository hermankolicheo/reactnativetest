import React, {useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { size } from "lodash";
import { reautenticar } from "../../utils/api";
import * as firebase from "firebase";

export default function ChangePasswordForm(props){
    const {setShowModal, toastRef } = props;
    const [ShowPassword, setShowPassword] = useState(false);
    const [Error, setError] = useState({});
    const [FormData, setFormData] = useState(defaultValue());
    const [IsLoading, setIsLoading] = useState(false);

    const onChange = (e, type) => {
        setFormData({...FormData, [type]: e.nativeEvent.text})
    }
    const onSubmit  = async () => {
        let isSetError = true;
        let errorsTemp = {};
        setError({});
        if (!FormData.password || 
            !FormData.newPassword || 
            !FormData.repeatNewPassword
            ) {
            errorsTemp = {
                password: !FormData.password ? "No puede estar vacía" 
                : "",
                newPassword: !FormData.newPassword ? "No puede estar vacía" 
                :"",
                repeatNewPassword: !FormData.repeatNewPassword ? "No puede estar vacía" 
                : "",
            };
        } else if (FormData.newPassword !== FormData.repeatNewPassword) {
            errorsTemp= {
                newPassword: "Las contraseñas no coinciden",
                repeatNewPassword: "Las contraseñas no coinciden",
            };
        } else if(size(FormData.newPassword) < 6) {
            errorsTemp = {
                newPassword: "La contraseña dene ser mayor a 6 caracteres",
                repeatNewPassword: "La contraseña dene ser mayor a 6 caracteres",
            }
        } else {
           setIsLoading(true);
           await reautenticar(FormData.password).then(async () => {
                await firebase
                .auth()
                .currentUser.updatePassword(FormData.newPassword).then(() => {
                    isSetError = false;
                    setIsLoading(false);
                    setShowModal(false);
                    firebase.auth().signOut();
                }).catch(()=>{
                    errorsTemp = {
                        other: "Error al actualizar contraseña",
                    };
                    setIsLoading(false);
                })
           }).catch(() => {
               errorsTemp = {
                   password:"La contraseña no es correcta",
               };
               setIsLoading(false);
           })
        }

        isSetError && setError(errorsTemp);
   }

    return (
        <View styles={styles.view}>
           <Input
                placeholder="Contraseña actual"
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
             <Input
                placeholder="Nueva Contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={ShowPassword ? false: true}
                rightIcon={{
                    type: "material-community",
                    name: ShowPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!ShowPassword),
                }}
                onChange={(e) => onChange(e, "newPassword")}
                errorMessage={Error.newPassword}
               
            />
             <Input
                placeholder=" Repetir nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={ShowPassword ? false: true}
                rightIcon={{
                    type: "material-community",
                    name: ShowPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!ShowPassword),
                }}
                onChange={(e) => onChange(e, "repeatNewPassword")}
                errorMessage={Error.repeatNewPassword}
            />
            <Button
                title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={IsLoading}
            />
            <Text> {Error.other} </Text>
        </View>
    );
}

function defaultValue(){
    return{
        password: "",
        newPassword: "",
        repeatNewPassword:"",
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
