module.exports = {
  preset: 'react-native',
  // Ensure Jest transforms ESM code from React Native / navigation packages in node_modules
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|@react-native-async-storage' +
      '|react-native-vector-icons' +
      ')/)',
  ],
};
