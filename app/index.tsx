import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { Festival } from "@/constants/festivals";
import { useFestivals } from "@/hooks/useFestivals";
import { formatDate } from "@/utils/date";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { push } = useRouter();
  const { festivals, isLoading } = useFestivals();

  const renderItem = ({ item }: { item: Festival }) => {
    return (
      <Pressable
        onPress={() =>
          push({
            pathname: "/festivalDetail",
            params: { id: item.id },
          })
        }
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      >
        <ImageBackground
          source={{
            uri: item.photos[0],
          }}
          style={styles.cardImage}
          imageStyle={styles.cardImageStyle}
        >
          <View style={styles.cardOverlay} />
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={[styles.textWhite, styles.subtitle]}>
                {item.name}
              </Text>
            </View>
            <View style={styles.extraInfoContainer}>
              <Text style={styles.textWhite}>{item.place}</Text>
              <Text style={styles.textWhite}>{formatDate(item.date)}</Text>
            </View>
          </View>
        </ImageBackground>
      </Pressable>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.screenContainer}>
        <FlatList
          data={festivals}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.title}>Festival Overview</Text>
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    borderRadius: 16,
    marginBottom: 20,
  },
  cardPressed: {
    opacity: 0.85,
  },
  cardImage: {
    height: 200,
  },
  cardImageStyle: {
    borderRadius: 16,
  },
  cardOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(8, 16, 18, 0.5)",
    borderRadius: 16,
  },
  cardContent: {
    padding: 16,
    gap: 10,
  },
  cardHeader: {
    flexDirection: "row",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  textWhite: {
    color: "#fff",
  },
  extraInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
