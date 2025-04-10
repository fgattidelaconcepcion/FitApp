import { Button, Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import allProducts from '../data/products.json';
import { colors } from '../global/colors';

const ItemDetail = ({idSelected='', setProductSelected = ()=>{}}) => {
  const [product, setProduct] = useState(null);
  const [orientation, setOrientation] = useState("portrait");
  const {width, height} = useWindowDimensions();

  useEffect(() => {
    if (width > height) setOrientation("landscape");
    else setOrientation("portrait");
  }, [width, height]);

  useEffect(() => {
    const productSelected = allProducts.find( (product) => product.id === idSelected);
    setProduct(productSelected)

  }, [idSelected]);
  console.log(product?.images[0])

  return (
    <>
      <Button title="Volver" color={colors.text.primary} onPress={() => setProductSelected("")} />
      {product ? (
        <View
          style={
            orientation === "portrait"
              ? styles.mainContainer
              : styles.mainContainerLandscape
          }
        >
          <Image
            source={{uri: product.images[0]}}
            resizeMode="contain"
            style={
              orientation === "portrait" ? styles.image : styles.imageLandscape
            }
          />
          <View
            style={
              orientation === "portrait" ? styles.textContainer : styles.textContainerLandscape
            }
          >
            <Text>{product.title}</Text>
            <Text>{product.description}</Text>
            <Text style={styles.price}>{product.price}</Text>
            <Button title="Add to cart" color={colors.text.primary} />
          </View>
        </View>
      ) : null}
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