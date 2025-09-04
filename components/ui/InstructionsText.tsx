import { type FC, type ReactNode } from "react"
import { Text, StyleSheet } from "react-native"
import { COLORS } from "../../constants/colors"

type InstructionsTextProps = {
  children: ReactNode
}

const InstructionsText: FC<InstructionsTextProps> = ({ children }) => {
  return (
    <Text style={styles.text}>
      {children}
    </Text>
  )
}

export default InstructionsText

const styles = StyleSheet.create({
  text: {
    color: COLORS.accent500,
    fontSize: 16,
    textAlign: "center"
  },
})
