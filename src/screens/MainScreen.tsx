import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MainScreen = () => {
  return (
    <View style={styles.container} testID="main-screen">
      <Text style={styles.title}>Bienvenue sur Runova</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default MainScreen;
