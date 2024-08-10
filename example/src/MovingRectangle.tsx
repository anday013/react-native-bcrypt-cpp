import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export const MovingRectangle = () => {
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animationValue, {
            toValue: 100,
            duration: 300,
            useNativeDriver: false, // This runs the animation on the JS thread
          }),
          Animated.timing(animationValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false, // This runs the animation on the JS thread
          }),
        ])
      ).start();
    };

    animate();
  }, [animationValue]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.rectangle,
          { transform: [{ translateX: animationValue }] },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  rectangle: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});
