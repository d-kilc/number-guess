import { type FC, type ReactNode } from "react"
import { Text, StyleSheet, Platform } from "react-native"
import { COLORS } from "../../constants/colors"

type TitleProps = {
  children: ReactNode
}

const Title: FC<TitleProps> = ({ children }) => (
  <Text style={styles.text}>{children}</Text>
)

export default Title

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: COLORS.white,
    padding: 12,
    textAlign: "center",
    borderWidth: Platform.OS === "android" ? 2 : 0,
    // borderWidth: Platform.select({ ios: 0, android: 2 }),
    borderColor: COLORS.white
  }
})