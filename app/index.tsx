import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { API_BASE_URL } from "@/api/festivals";
import type { Festival } from "@/constants/festivals";
import { useFestivals } from "@/hooks/useFestivals";
import { formatDate } from "@/utils/date";
import { Link } from "expo-router";

function getFestivalImageUri(photos?: string[]): string | null {
  const firstPhoto = photos?.find((photo) => Boolean(photo?.trim()));
  if (!firstPhoto) {
    return null;
  }

  if (firstPhoto.startsWith("http://") || firstPhoto.startsWith("https://")) {
    return firstPhoto;
  }

  const apiOrigin = API_BASE_URL.replace(/\/api$/, "");
  return `${apiOrigin}${firstPhoto.startsWith("/") ? "" : "/"}${firstPhoto}`;
}

export default function HomeScreen() {
  const { data: festivals, isLoading, isError } = useFestivals();

  const renderItem = ({ item }: { item: Festival }) => {
    const imageUri = getFestivalImageUri(item.photos);

    return (
      <Link
        href={{ pathname: "/festivalDetail", params: { id: item.id } }}
        asChild
      >
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <ImageBackground
            source={{ uri: imageUri ?? `https://picsum.photos/seed/${item.id}/800/600` }}
            style={styles.cardImage}
            imageStyle={styles.cardImageStyle}
          >
            <View style={styles.cardOverlay} />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={[styles.textWhite, styles.subtitle]}>
                  {item.name}
                </Text>
                <Text style={[styles.textWhite, styles.price]}>€{item.price}</Text>
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.textWhite}>
                  {item.place}
                </Text>
                <Text style={styles.textWhite}>
                  {formatDate(item.date)}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </Pressable>
      </Link>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        {isLoading ? (
          <View style={styles.stateContainer}>
            <Text>Loading festivals...</Text>
          </View>
        ) : isError ? (
          <View style={styles.stateContainer}>
            <Text>Could not load festivals.</Text>
            <Text>Please try again.</Text>
          </View>
        ) : (
        <FlatList
            data={festivals ?? []}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
            contentContainerStyle={styles.listContent}
            ListHeaderComponent={
              <View style={styles.header}>
                <Text style={styles.title}>Festival Finder</Text>
                <Text>Scroll through festivals and open a detail page.</Text>
              </View>
            }
        />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  header: {
    gap: 8,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  stateContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 8,
  },
  cardSeparator: {
    height: 16,
  },
  card: {
    marginTop: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  cardPressed: {
    opacity: 0.85,
  },
  cardImage: {
    minHeight: 190,
  },
  cardImageStyle: {
    borderRadius: 16,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(8, 16, 18, 0.45)",
    borderRadius: 16,
  },
  cardContent: {
    padding: 16,
    gap: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
  },
  textWhite: {
    color: "#fff",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
});
