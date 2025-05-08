import { StyleSheet, Text, View, Image, Button, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { usePostProfileImageMutation } from '../services/shopServices';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../global/colors';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

const ImageSelector = () => {
    const [image, setImage] = useState(null);
    const [triggerPostImage, { isLoading: isSubmitting, isSuccess, isError, error }] = usePostProfileImageMutation();
    const { localId } = useSelector(state => state.auth.value);
    const dispatch = useDispatch();
    const navigation = useNavigation(); // Obtén la instancia de navigation

    useEffect(() => {
        if (isSuccess) {
            alert('Foto de perfil actualizada con éxito.');
            navigation.goBack(); // O navega a otra pantalla
        }
        if (isError) {
            console.error("Error al subir la imagen:", error);
            alert('Hubo un error al actualizar la foto de perfil.');
        }
    }, [isSuccess, isError, error, navigation]);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Se necesitan permisos para acceder a la galería.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const confirmImage = async () => {
        if (!image) {
            alert('Por favor, selecciona una imagen primero.');
            return;
        }

        const formData = new FormData();
        formData.append('image', {
            uri: image,
            name: 'profileImage.jpg', // Genera un nombre único si es necesario
            type: 'image/jpeg', // Asegúrate de que el tipo sea correcto
        });

        await triggerPostImage({ image, localId });

    };

    return (
        <View style={styles.container}>
            {image ? (
                <>
                    <Image source={{ uri: image }} style={styles.image} />
                    <Button title='Tomar otra foto' onPress={pickImage} />
                    {isSubmitting ? (
                        <ActivityIndicator size="large" color={colors.primary} />
                    ) : (
                        <Button title='Confirmar foto' onPress={confirmImage} disabled={isSubmitting} />
                    )}
                </>
            ) : (
                <View style={styles.noPhotoContainer}>
                    <Text>No hay foto</Text>
                    <Button title='Tomar una foto' onPress={pickImage} />
                </View>
            )}
        </View>
    );
};

export default ImageSelector;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 200,
        height: 200,
        borderWidth: 2,
        padding: 10
    },
    noPhotoContainer: {
        padding: 10,
        gap: 15,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});