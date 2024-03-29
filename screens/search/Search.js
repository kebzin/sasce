import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import SearchComponent from "../../components/Headers/SearchComponent";
import { COLORS, SIZES, FONTS, constants, icons } from "../../constants";
import { IconeBotten, InputField, TextButton } from "../../components/common";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import RenderItems from "../Home/RenderItems";
import { useData } from "../../hook/useData";
import { supabase } from "../../lib/superbase";

const Search = () => {
  const [search, setSearch] = useState("");
  const { card, setCard } = useData();
  const [data, setData] = useState([]);
  const [Error, setError] = useState("");
  const [isError, setISError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setError("");
    try {
      setLoading(true);
      if (search.length === 0) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("product")
        .select("*")
        .textSearch("title", search, {
          type: "websearch",
          config: "english",
        });
      // .filter("title @@ to_tsquery('english', $1)")
      // .filter("title", "")

      if (error) {
        setISError(true);
        setLoading(false);
        setError(error.message);
        console.log(error);
        return;
      }
      setData(data || []);
      if (data.lenght === 0) {
        return (
          isError(true),
          setError("Oops we cannot find any result related to you search ")
        );
      }
      setLoading(false);
    } catch (error) {
      setISError(true);
      setError(error.message);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <SafeAreaView
      style={{
        paddingTop:
          Platform.OS === "android"
            ? StatusBar.currentHeight + 10
            : SIZES.padding,
        paddingHorizontal: SIZES.padding - 10,
        backgroundColor: COLORS.grey08,
        flex: 1,
      }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",

            gap: 10,
          }}
        >
          <InputField
            containerStyle={{ flex: 1 }}
            value={search}
            onChange={(text) => setSearch(text)}
            Placeholder={"Search for product Name / Category"}
            prependComponent={
              <IconeBotten
                icone={icons.search}
                iconeStyle={{
                  tintColor: COLORS.grey,
                }}
              />
            }
          />
         <TouchableOpacity onPress={handleSearch}>
    <TextButton
      contentContainerStyle={{
        backgroundColor: null,
      }}
      label={"search"}
      labelStyle={{
        ...FONTS.body5,
        backgroundColor: COLORS.success,
        paddingHorizontal: SIZES.base,
        borderRadius: SIZES.base,
      }}
    />
  </TouchableOpacity>
        </View>

        {/* suggest for you */}
        <Text style={{  paddingTop: 25 , fontWeight:900,color:'grey',margin:10}}>
          Available Categories 
        </Text>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 15,
            marginTop: 5,
          }}
        >
          {constants.Category?.map((item, index) => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSearch(item.label)}
              >
                {item.label === "All category" ? null : (
                  <Text style={{ color: COLORS.grey,  fontWeight:300,color:'grey'}}>
                    {item.label}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* search result */}

        {loading && (
          <View>
            <ActivityIndicator color={COLORS.success} />
          </View>
        )}
        {isError && (
          <View>
            <Text>{Error}</Text>
          </View>
        )}
        <View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return <RenderItems item={item} card={card} setCard={setCard} />;
            }}
            initialNumToRender={10}
            numColumns={2}
            columnWrapperStyle={{
              gap: 10,
            }}
            contentContainerStyle={{
              rowGap: 20,
              marginTop: 15,
              marginBottom: SIZES.padding,paddingBottom:500
            }}
          />

          {data.length === 0 ? <Text>No Data found</Text> : null}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
