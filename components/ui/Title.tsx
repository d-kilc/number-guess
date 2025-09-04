import { type FC, type ReactNode } from "react"
import { Text, StyleSheet } from "react-native"
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
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
    // borderColor: COLORS.accent500,
    // borderWidth: 1,
    padding: 12,
    textAlign: "center"
  }
})