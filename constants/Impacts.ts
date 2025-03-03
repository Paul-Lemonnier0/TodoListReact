import * as Haptics from 'expo-haptics';

/**
 * Creates a little vibration on the phone
 */
export const BaseImpact = () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
