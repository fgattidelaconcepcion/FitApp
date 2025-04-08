import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../global/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";

const Search = ({onSearch = ()=>{}, error="", goBack=()=>{}}) => {
  const [keyword, setKeyword] = useState("");
  //console.log(error)
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={keyword}
        onChangeText={setKeyword}
      />
      <Pressable onPress={() => onSearch(keyword)}>
        <FontAwesome name="search" size={24} color="black" />
      </Pressable>
      <Pressable onPress={() => setKeyword("")}>
        <FontAwesome5 name="eraser" size={24} color="black" />
      </Pressable>
      <Pressable onPress={goBack}>
        <AntDesign name="back" size={24} color="black" />
      </Pressable>
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
  input: {
    width: 250,
    padding: 8,
    fontSize: 18,
    backgroundColor: colors.teal400,
    color: colors.platinum,
    borderRadius: 10,
  },
});