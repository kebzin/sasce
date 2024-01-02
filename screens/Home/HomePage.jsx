import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Text, View } from "react-native";
import HeaderComponent from "../../components/Headers/HeaderComponent";
import { COLORS, SIZES, FONTS } from "../../constants";
import SearchComponent from "../../components/Headers/SearchComponent";
import Categories from "../../components/Headers/Categories";
import RenderItems from "./RenderItems";
import { FlatList } from "react-native";
import { useData } from "../../hook/useData";
import { TextButton } from "../../components/common";

const HomePage = () => {
  const {
    itemList,
    setItemList,
    card,
    setCard,
    handleOnEndReach,
    refreshData,
    error,
    refreshing,
    isError,
  } = useData();

  const [data, setData] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setData(itemList);
  }, [itemList]);

  const handleRefreshing = async () => {
    try {
      await refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEndReach = async () => {
    try {
      if (loadingMore) {
        // If already loading more data, return early
        return;
      }

      setLoadingMore(true);
      await handleOnEndReach();
    } catch (error) {
      console.log("end", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const renderFooter = () => {
    if (!loadingMore) {
      return null;
    }

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text
          style={{ marginTop: 10, textAlign: "center", color: COLORS.dark }}
        >
          Loading more data...
        </Text>
      </View>
    );
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const animatedOpacity = scrollY.interpolate({
    inputRange: [0, 100], // Adjust as needed
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.grey08,
        paddingHorizontal: 10,
      }}
    >
      <HeaderComponent />
      <SearchComponent />
      <Categories data={data} setData={setData} />
      <FlatList
        ListEmptyComponent={
          <View>
            {isError && (
              <View>
                <Text>{error}</Text>
                <TextButton
                  onPress={refreshData}
                  label={"refresh"}
                  labelStyle={{
                    ...FONTS.body5,
                  }}
                  contentContainerStyle={{
                    height: 50,
                    backgroundColor: COLORS.success,
                    borderRadius: SIZES.radius,
                  }}
                />
              </View>
            )}
          </View>
        }
        onRefresh={handleRefreshing}
        refreshing={refreshing}
        onEndReached={handleEndReach}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        fadingEdgeLength={1}
        data={data}
        keyExtractor={(item) => item.id.toString()}
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
        }}
        onScroll={handleScroll}
      />
      {loadingMore && (
        <Animated.View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            opacity: animatedOpacity,
            backgroundColor: COLORS.light,
            paddingVertical: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="small" color={COLORS.primary} />
          <Text style={{ marginTop: 5, color: COLORS.dark }}>
            Loading more data...
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

export default HomePage;
