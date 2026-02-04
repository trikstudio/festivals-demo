import { ScrollView, StyleSheet } from 'react-native';

import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useFestival } from '@/hooks/use-festivals';

export default function FestivalDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { data: festival, isLoading, isError } = useFestival(id);

  if (isLoading) {
    return (
      <ThemedView style={styles.fallback}>
        <Stack.Screen options={{ title: 'Festival' }} />
        <ThemedText type="title">Loading festival...</ThemedText>
      </ThemedView>
    );
  }

  if (isError || !festival) {
    return (
      <ThemedView style={styles.fallback}>
        <Stack.Screen options={{ title: 'Festival' }} />
        <ThemedText type="title">Festival not found</ThemedText>
        <ThemedText>We could not find that festival.</ThemedText>
        <Link href="/" style={styles.backLink}>
          Back to list
        </Link>
      </ThemedView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: festival.name }} />
      <ThemedText type="title">{festival.name}</ThemedText>
      <ThemedText>
        {festival.location} • {festival.dates}
      </ThemedText>
      <ThemedText type="defaultSemiBold">{festival.price}</ThemedText>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Lineup</ThemedText>
        {festival.lineup.map((artist) => (
          <ThemedText key={artist}>• {artist}</ThemedText>
        ))}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Highlights</ThemedText>
        {festival.highlights.map((highlight) => (
          <ThemedText key={highlight}>• {highlight}</ThemedText>
        ))}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">About</ThemedText>
        <ThemedText>{festival.about}</ThemedText>
      </ThemedView>

      <Link href="/" style={styles.backLink}>
        Back to list
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 12,
  },
  section: {
    gap: 6,
    marginTop: 6,
  },
  fallback: {
    flex: 1,
    padding: 20,
    gap: 12,
    justifyContent: 'center',
  },
  backLink: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
  },
});
