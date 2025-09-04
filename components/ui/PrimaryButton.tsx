import { type FC, type ReactNode } from "react"
import { StyleSheet, Pressable, View, Text, type GestureResponderEvent } from "react-native"

import { COLORS } from "../../constants/colors"

type PrimaryButtonProps = {
  children: ReactNode
  onPress(event: GestureResponderEvent): void
}

const PrimaryButton: FC<PrimaryButtonProps> = ({children, onPress}) => {
  return (
    <View style={styles.buttonOuter}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: COLORS.primary600 }}
        style={({pressed}) => {
          return pressed
            ? [styles.pressed, styles.buttonInner]
            : styles.buttonInner
        }}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
  buttonOuter: {
    borderRadius: 28,
    overflow: "hidden"
  }, 
  buttonInner: {
    backgroundColor: COLORS.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  text: {
    color: COLORS.white,
    textAlign: "center"
  },
  pressed: {
    opacity: 0.75,
  }
})