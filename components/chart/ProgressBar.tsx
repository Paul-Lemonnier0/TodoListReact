import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { ThemedText } from "../ThemedText";

interface ProgressBarProps {
  progress: number;
  showPercentage?: boolean
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  showPercentage
}) => {

  const contrast = useThemeColor({}, "contrast")
  const secondary = useThemeColor({}, "secondary")

  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 500 });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value * 100}%`,
  }));

  const borderRadius = 3
  const height = 5

  return (
    <View style={{flexDirection: "row", gap: 15, alignItems: "center"}}>
      <View style={[styles.container, { height, backgroundColor: secondary, borderRadius }]}>
        <Animated.View
          style={[
            styles.progress,
            animatedStyle,
            { backgroundColor: contrast, borderRadius },
          ]}
        />
      </View>
      {
        showPercentage &&
        <ThemedText type="defaultSemiBold" style={{marginTop: 5, fontSize: 13}}>{`${Math.round(progress * 100)}%`}</ThemedText>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    flex: 1,
  },
  progress: {
    height: "100%",
  },
});

export default ProgressBar;
