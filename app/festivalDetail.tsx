import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useFestival } from '@/hooks/useFestivals';
import { formatDate } from '@/utils/date';

export default function FestivalDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { data: festival, isLoading, isError } = useFestival(id);

  if (isLoading) {
    return (
      <View style={styles.fallback}>
        <Stack.Screen options={{ title: 'Details', headerTitle: 'Details' }} />
        <Text style={styles.title}>Loading festival...</Text>
      </View>
    );
  }

  if (isError || !festival) {
    return (
      <View style={styles.fallback}>
        <Stack.Screen options={{ title: 'Details', headerTitle: 'Details' }} />
        <Text style={styles.title}>Festival not found</Text>
        <Text>We could not find that festival.</Text>
        <Link href="/" style={styles.backLink}>
          Back to list
        </Link>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: 'Details', headerTitle: 'Details' }} />
      <Image
        source={{ uri: festival.photos[1] || festival.photos[0] || undefined }}
        style={styles.heroImage}
      />
      <Text style={styles.title}>{festival.name}</Text>
      <Text>
        {festival.place} • {formatDate(festival.date)}
      </Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Lineup</Text>
        {festival.lineup.map((artist) => (
          <Text key={artist.id}>
            • {artist.name} ({artist.genre})
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 12,
  },
  heroImage: {
    width: '100%',
    height: 220,
    borderRadius: 16,
  },
  section: {
    gap: 6,
    marginTop: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
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
