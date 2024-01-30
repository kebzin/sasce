import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Text, View,  Dimensions , Modal,} from "react-native";
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

    const [showLoadingModal, setShowLoadingModal] = useState(true);

    // Assume you have a function to load your images
    const loadImages = async () => {
      // Your image loading logic here
  
      // After loading all images, hide the loading modal
      setShowLoadingModal(false);
    };
  
    useEffect(() => {
      // Call the function to load images when the component mounts
      loadImages();
    }, []);

    return (
      <View style={{ flex: 1, backgroundColor: COLORS.grey08, paddingHorizontal: 10 }}>
        {/* Your existing components */}
        {/* ... */}
  
        {/* Loading Modal */}
        <Modal transparent={true} visible={showLoadingModal} animationType="slide">
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={{ marginTop: 10, color: COLORS.dark }}>Loading images...</Text>
          </View>
        </Modal>
  
        {/* Your existing loading bar */}
        {loadingMore && (
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              opacity: animatedOpacity,
              backgroundColor: COLORS.light,
              paddingVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size="small" color={COLORS.primary} />
            <Text style={{ marginTop: 5, color: COLORS.dark }}>Loading more data...</Text>
          </Animated.View>
        )}
      </View>
    );
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
  useEffect(() => {
    if (loadingMore) {
      rotateImage();
    }
  }, [loadingMore]);

  const rotateImage = () => {
    Animated.loop(
      Animated.timing(rotationValue, {
        toValue: 1,
        duration: 1000, // Adjust the duration as needed
        useNativeDriver: true,
      })
    ).start();
  };
  const rotationValue = useRef(new Animated.Value(0)).current;

  const interpolatedRotateAnimation = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
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
        renderItem={({ item }) => (
          <View style={{ width: '48%', marginHorizontal: '1%', marginBottom: 20 }}>
            {item?.image === null || item?.image === undefined ? null : (
              <RenderItems item={item} card={card} setCard={setCard} />
            )}
          </View>
        )}
        initialNumToRender={50}
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
