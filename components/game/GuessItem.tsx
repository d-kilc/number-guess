import { type FC } from "react"
import { View, Text, StyleSheet } from "react-native"
import { COLORS } from "../../constants/colors"

type GuessItemProps = {
  round: number
  guess: number
}

const GuessItem: FC<GuessItemProps> = ({
  round,
  guess
}) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>#{round}</Text>
      <Text style={styles.itemText}>{guess}</Text>
    </View>
  )
}

export default GuessItem

const styles = StyleSheet.create({
  listItem: {
    borderColor: COLORS.primary800,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: COLORS.accent500,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3
  },
  itemText: {
    fontFamily: "open-sans"
  }
})