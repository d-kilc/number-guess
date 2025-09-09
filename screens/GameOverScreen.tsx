import { type FC } from "react"
import { Text, View, StyleSheet, Image } from "react-native"
import PrimaryButton from "../components/ui/PrimaryButton"
import Title from "../components/ui/Title"
import { COLORS } from "../constants/colors"

type GameOverScreenProps = {
  onRestart(): void
  userNumber: number
  rounds: number
}

const GameOverScreen: FC<GameOverScreenProps> = ({
  onRestart,
  userNumber,
  rounds
}) => {
  return (
    <View style={styles.container}>
      <Title>Game Over</Title>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/images/success.png")} style={styles.image}/>
      </View>
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.textHighlighted}>{rounds}</Text> rounds to guess the number <Text style={styles.textHighlighted}>{userNumber}</Text>.
      </Text>
      <PrimaryButton onPress={onRestart}>New Game</PrimaryButton>
    </View>
  )
}

export default GameOverScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    borderRadius: 150,
    width: 300,
    height: 300,
    borderWidth: 3,
    borderColor: COLORS.white,
    overflow: "hidden",
    margin: 24
  },
  image: {
    height: "100%",
    width: "100%"
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24
  },
  textHighlighted: {
    fontFamily: "open-sans-bold",
    color: COLORS.primary500
  }
})