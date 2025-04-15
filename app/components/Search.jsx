import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../global/colors";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Search = ({onSearch = ()=>{}, error="", goBack=()=>{}}) => {
  const [keyword, setKeyword] = useState("");
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={keyword}
        onChangeText={setKeyword}
      />
      <Pressable onPress={() => onSearch(keyword)}>
      <Ionicons name="search-circle-sharp" size={24} color="black" />
      </Pressable>
      <Pressable onPress={() => setKeyword("")}>
      <MaterialIcons name="clear" size={24} color="black" />
      </Pressable>
      <Pressable onPress={goBack}>
        <Entypo name="back" size={24} color="black" />
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
    backgroundColor: colors.primary,
    color: colors.background,
    borderRadius: 10,
  },
});