import React, { useState, useEffect } from 'react';
import { View, Button, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import the ImagePicker module
import { AntDesign } from "@expo/vector-icons";
import * as Crypto from "expo-crypto";
import { uploadFileAndGetURL } from 'src/config/firebase';

const CameraPicker = ({ setImage, setImageLoading }) => {



    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera permissions to make this work!');
            }
        })();
    }, []);

    const takePicture = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (result.canceled) return;

        setImage("");
        setImageLoading(true);
        let random = Crypto.randomUUID();
        const url = await uploadFileAndGetURL(
            random + "-photo",
            result.assets[0].uri
        );
        setImage(url);
        console.log(url)

    };

    return (
        <>
            <TouchableOpacity style={styles.selfiBtnBox} onPress={takePicture}>
                <View style={styles.selfiBtn}>
                    <AntDesign name="camera" size={30} color="#FFF" />
                </View>
                <Text>Take photo</Text>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photo: {
        width: 300,
        height: 300,
        marginTop: 20,
        alignSelf: 'center',
    },
    selfiBtnBox: {
        // backgroundColor: "red",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    selfiBtn: {
        backgroundColor: "#278B55",
        padding: 10,
        borderRadius: 100,
    },
});

export default CameraPicker;
