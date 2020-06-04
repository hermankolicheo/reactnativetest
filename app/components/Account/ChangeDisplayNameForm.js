import React, { useState } from "react";
import {StyleSheet, View, Text} from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";

export default function ChangeDisplayNameForm(props) {
    const { displayName, setShowModal, toastRef, setReloadUserInfo } = props;
    const [NewDisplayName, setNewDisplayName] = useState(null);
    const [error, setError] = useState(null);
    const [IsLoading, setIsLoading] = useState(false)

    const onSubmit = () => {
        setError(null);
        if (!NewDisplayName) {
            setError("EL nombre no puede estar vacío");
        } else if (displayName === NewDisplayName) {
            setError("El nombre no puede ser igual al actual");
        } else {
            setIsLoading(true);
            const update = {
                displayName: NewDisplayName
            }
            firebase 
                .auth()
                .currentUser.updateProfile(update)
                .then(() => {
                    setIsLoading(false);
                    setReloadUserInfo(true);
                    setShowModal(false);
                    console.log("OK");
                })
                .catch(() => {
                    setError("Error al actualizar");
                    setIsLoading(false);
                });
        }
    };

    return (
        <View styles={styles.view}>
            <Input
                placeholder="Nombre y apellidos"
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline"
                }}
                defaultValue={displayName || ""}
                onChange={e => setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
            />
            <Button
                title="Cambiar nombre"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={IsLoading}
            />
        </View>
    );
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