import React, { useState, useRef } from "react";
import { StyleSheet ,View, Text } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AddRestaurantForm from "../../components/Restaurants/AddRestaurantForm";

export default function AddRestaurant(props){
    const {navigation} = props;
    const [IsLoading, setIsLoading] = useState(false);
    const ToastRef = useRef();
    return (
        <View>
            <AddRestaurantForm
                ToastRef={ToastRef}
                setIsLoading={setIsLoading}
                navigation={navigation}
            />
            <Toast 
                ref={ToastRef}
                position="center"
                opacity={0.9}
            />
            <Loading 
                isVisible={IsLoading}
                text="Creando Restaurante"
            />
        </View>
    );
}
