import React, { useState } from "react";
import {StyleSheet, View} from "react-native";
import { ListItem } from "react-native-elements";
import { map } from "lodash";
import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeDisplayEmailForm from "./ChangeDisplayEmailForm";
import ChangeDisplayPasswordForm from "./ChangeDisplayPasswordForm";

export default function AccountOptions(props) {
    const {userInfo, toastRef, setReloadUserInfo} = props;
    const [showModal, setShowModal] = useState(false);
    const [RenderComponent, setRenderComponent] = useState(null);


    const selectComponent = (key) => {

        switch(key) {
            case "displayName":
                setRenderComponent (
                    <ChangeDisplayNameForm
                        displayName={userInfo.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUserInfo={setReloadUserInfo}
                    />
                    );
                    setShowModal(true);
                    break;
            case "email":
                setRenderComponent (
                    <ChangeDisplayEmailForm
                    email={userInfo.email}
                    setShowModal={setShowModal}
                    toastRef={toastRef}
                    setReloadUserInfo={setReloadUserInfo}
                    />
                    );
                    setShowModal(true);
                    break;
            case "password":
                setRenderComponent (
                    <ChangeDisplayPasswordForm
                    setShowModal={setShowModal}
                    toastRef={toastRef}
                    />
                    );
                    setShowModal(true);
                    break;
            default:
                setRenderComponent(null);
                setShowModal(false);
                break;
        }

    };
    const menuOptions = generateOptions(selectComponent);

    return (
        <View>
            {map(menuOptions, (menu, index) => (
                <ListItem
                    key={index}
                    title={menu.title}
                    leftIcon={{
                        type: menu.iconType,
                        name: menu.iconNameLeft,
                        color: menu.iconColorLeft,
                    }}
                    rightIcon={{
                        type: menu.iconType,
                        name: menu.iconNameRight,
                        color: menu.iconColorRight,
                    }}
                    containerStyle={styles.menuItem}
                    onPress={menu.onPress}
                />
            ))}
            {RenderComponent && (
             <Modal isVisible= {showModal} setIsVisible={setShowModal}>
                 {RenderComponent}  
            </Modal>
            )}
        </View>
    );
}

function generateOptions(selectComponent) {
    return[
        {
            title: "Cambiar nombre y apellido",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectComponent("displayName"),
        },
        {
            title: "Cambiar Email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectComponent("email"),
        },
        {
            title: "Cambiar contraseña",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectComponent("password"),
        },
    ];
}


const styles = StyleSheet.create({
    menuItem: {
        borderBottomColor: 1,
        borderBottomColor: "#e3e3e3",
    },


})