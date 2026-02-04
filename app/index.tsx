import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { Festival } from "@/constants/festivals";
import { useFestivals } from "@/hooks/use-festivals";
import { Link } from "expo-router";

export default function HomeScreen() {
  const { data: festivals, isLoading, isError } = useFestivals();

  const renderItem = ({ item }: { item: Festival }) => {
    return (
      <Link
        href={{ pathname: "/festival/[id]", params: { id: item.id } }}
        asChild
      >
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <ImageBackground
            source={{ uri: `https://picsum.photos/seed/${item.id}/800/600` }}
            style={styles.cardImage}
            imageStyle={styles.cardImageStyle}
          >
            <View style={styles.cardOverlay} />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <ThemedText type="subtitle" lightColor="#fff" darkColor="#fff">
                  {item.name}
                </ThemedText>
                <ThemedText
                  type="defaultSemiBold"
                  lightColor="#fff"
                  darkColor="#fff"
                >
                  {item.price}
                </ThemedText>
              </View>
              <View style={styles.metaRow}>
                <ThemedText lightColor="#fff" darkColor="#fff">
                  {item.location}
                </ThemedText>
                <ThemedText lightColor="#fff" darkColor="#fff">
                  {item.dates}
                </ThemedText>
              </View>
              <ThemedText numberOfLines={2} lightColor="#fff" darkColor="#fff">
                {item.about}
              </ThemedText>
            </View>
          </ImageBackground>
        </Pressable>
      </Link>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.screen}>
        {isLoading ? (
          <View style={styles.stateContainer}>
            <ThemedText>Loading festivals...</ThemedText>
          </View>
        ) : isError ? (
          <View style={styles.stateContainer}>
            <ThemedText>Could not load festivals.</ThemedText>
            <ThemedText>Please try again.</ThemedText>
          </View>
        ) : (
        <FlatList
          data={festivals ?? []}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={styles.header}>
              <ThemedText type="title">Festival Finder</ThemedText>
              <ThemedText>
                Scroll through festivals and open a detail page.
              </ThemedText>
            </View>
          }
        />
        )}
      </ThemedView>
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
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
});
