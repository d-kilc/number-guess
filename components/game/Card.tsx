import { type FC, type ReactNode } from "react"
import { View, StyleSheet } from "react-native"
import { COLORS } from "../../constants/colors"

type CardProps = {
  children: ReactNode
}

const Card: FC<CardProps> = ({ children }) => {
  return (
    <View style={styles.card}>
      {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginTop: 36,
    marginHorizontal: 24,
    borderRadius: 8,
    backgroundColor: COLORS.primary800,
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    alignItems: "center",
    gap: 16,
  },
})