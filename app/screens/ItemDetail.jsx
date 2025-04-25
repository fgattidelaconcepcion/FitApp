import { Button, Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useGetProductByIdQuery } from '../services/shopServices';

const ItemDetail = ({
  route,
  navigation
}) => {
  const [orientation, setOrientation] = useState("portrait");
  const { width, height } = useWindowDimensions();

  const { productId: idSelected } = route.params || {}; // Protección en caso de que route.params sea undefined
  const { data: product, error, isLoading } = useGetProductByIdQuery(idSelected, { skip: !idSelected });

  useEffect(() => {
    if (width > height) setOrientation("landscape");
    else setOrientation("portrait");
  }, [width, height]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando detalles del producto...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error al cargar los detalles del producto.</Text>
        <Button title="Volver" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <>
      <Button title="Volver" onPress={() => navigation.goBack()} />
      {product ? (
        <View
          style={
            orientation === "portrait"
              ? styles.mainContainer
              : styles.mainContainerLandscape
          }
        >
          <Image
            source={{ uri: product.images?.[0] }} // Protección en caso de que images sea undefined o vacío
            resizeMode="contain"
            style={
              orientation === "portrait" ? styles.image : styles.imageLandscape
            }
          />
          <View
            style={
              orientation === "portrait"
                ? styles.textContainer
                : styles.textContainerLandscape
            }
          >
            <Text>{product.title}</Text>
            <Text>{product.description}</Text>
            <Text style={styles.price}>{product.price}</Text>
            <Button title="Add to cart" />
          </View>
        </View>
      ) : (
        idSelected !== undefined && ( // Mostrar este mensaje solo si se intentó cargar un ID
          <View style={styles.noProductContainer}>
            <Text>Producto no encontrado.</Text>
            <Button title="Volver" onPress={() => navigation.goBack()} />
          </View>
        )
      )}
    </>
  );
}

export default ItemDetail

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
  },
  mainContainerLandscape: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  imageLandscape: {
    width: "45%",
    height: 200,
  },
  textContainer: { flexDirection: "column" },
  textContainerLandscape: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    gap: 10,
  },
  price: { textAlign: "right", width: "100%" },
});