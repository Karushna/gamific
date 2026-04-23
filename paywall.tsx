import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useRevenueCat } from '@/hooks/useRevenueCat';

export default function PaywallScreen() {
  const { offering, isPro, purchase, restore, loading } = useRevenueCat('demo-user');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>CookList Pro</Text>
      <Text style={styles.subtitle}>A polished RevenueCat-powered upgrade flow for your demo app.</Text>

      <View style={styles.featureCard}>
        <Text style={styles.featureTitle}>Included with Pro</Text>
        <Text style={styles.featureItem}>• Unlimited recipe saves</Text>
        <Text style={styles.featureItem}>• Pantry match</Text>
        <Text style={styles.featureItem}>• Smart grocery merge</Text>
        <Text style={styles.featureItem}>• Priority feature unlocks for demo storytelling</Text>
      </View>

      {isPro ? (
        <View style={styles.successCard}>
          <Text style={styles.successTitle}>You’re Pro</Text>
          <Text style={styles.successText}>The entitlement is active. Head back and explore the unlocked screens.</Text>
          <Pressable style={styles.primaryButton} onPress={() => router.back()}>
            <Text style={styles.primaryButtonText}>Done</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.packages}>
          {offering?.availablePackages?.length ? (
            offering.availablePackages.map((pkg) => (
              <Pressable key={pkg.identifier} style={styles.packageCard} onPress={() => purchase(pkg)}>
                <Text style={styles.packageTitle}>{pkg.product.title || pkg.packageType}</Text>
                <Text style={styles.packagePrice}>{pkg.product.priceString}</Text>
                <Text style={styles.packageNote}>{pkg.product.description || 'Unlock CookList Pro'}</Text>
              </Pressable>
            ))
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No packages loaded yet</Text>
              <Text style={styles.emptyText}>
                Add a default offering with monthly and annual packages in RevenueCat, then reload the app.
              </Text>
            </View>
          )}
        </View>
      )}

      <Pressable style={styles.secondaryButton} onPress={() => restore()}>
        <Text style={styles.secondaryButtonText}>{loading ? 'Loading…' : 'Restore purchases'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 16 },
  title: { fontSize: 32, fontWeight: '800' },
  subtitle: { color: '#64748b', lineHeight: 22 },
  featureCard: { backgroundColor: '#0f172a', borderRadius: 18, padding: 18, gap: 8 },
  featureTitle: { color: 'white', fontWeight: '800', fontSize: 18 },
  featureItem: { color: '#cbd5e1' },
  packages: { gap: 12 },
  packageCard: { backgroundColor: 'white', borderRadius: 18, padding: 18, gap: 6 },
  packageTitle: { fontWeight: '800', fontSize: 18 },
  packagePrice: { color: '#2563eb', fontWeight: '800' },
  packageNote: { color: '#64748b' },
  emptyCard: { backgroundColor: 'white', borderRadius: 18, padding: 18, gap: 8 },
  emptyTitle: { fontWeight: '800' },
  emptyText: { color: '#64748b', lineHeight: 20 },
  successCard: { backgroundColor: '#dcfce7', borderRadius: 18, padding: 18, gap: 10 },
  successTitle: { color: '#166534', fontWeight: '800', fontSize: 18 },
  successText: { color: '#166534' },
  primaryButton: { backgroundColor: '#2563eb', padding: 14, borderRadius: 14, alignItems: 'center' },
  primaryButtonText: { color: 'white', fontWeight: '700' },
  secondaryButton: { backgroundColor: 'white', padding: 14, borderRadius: 14, alignItems: 'center' },
  secondaryButtonText: { fontWeight: '700' },
});
