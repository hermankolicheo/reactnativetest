import React from "react";
import {StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { Button} from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function UserGuest() {
    const navigation = useNavigation();
    return (
        <ScrollView centerContent= {true}>
        <Image
            source={require("../../../assets/img/user-guest.jpg")}
            resizeMode="contain"
            style={styles.image}
        />
        <Text style={styles.title}> Consulta tu perfil en 5 Tenedores </Text>
        <Text style={styles.description}>
            Busca y visualiza los mejores restaurnates de una forma
            sencilla, vota cual te ha gustado mas y comenta como ha sido tu experiencia
        </Text>
        <View style={styles.btnView}> 
            <Button
               buttonStyle={styles.btnStyle}
               containerStyle={styles.btnContainer}
               title="Ver tu perfil"
               onPress={() => navigation.navigate("login")} 
            />
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create ({
        viewBody: {
            marginLeft: 30,
            marginRight: 30,
        },
        image: {
            height: 300,
            width: "100%",
            marginBottom: 40,
        },
        title: {
            fontWeight: "bold",
            fontSize: 19,
            marginBottom: 10,
            textAlign: "center",
        },
        description: {
            textAlign: "center",
            marginBottom: 20,

        },
        btnStyle: {
            backgroundColor: "#00a680",
        },
        btnView: {
            flex: 1,
            alignItems: "center",
        },
        btnContainer: {
            width: "70%",
        },

});