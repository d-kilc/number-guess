import { useState, useEffect, type FC } from "react"
import { Text, View, StyleSheet, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Title from "../components/ui/Title"
import NumberContainer from "../components/game/NumberContainer"
import Card from "../components/game/Card"
import PrimaryButton from "../components/ui/PrimaryButton"
import InstructionsText from "../components/ui/InstructionsText"

type GameScreenProps = {
  onGameOver(): void
  chosenNumber: number
}

let lowBoundary = 1
let highBoundary = 100

const calculateRandom = (min: number, max: number, exclude?: number) => {
  const randomNum = Math.floor(Math.random() * (max - min) + min)
  if (randomNum === exclude) return calculateRandom(min, max, exclude)
  else return randomNum
}

const GameScreen: FC<GameScreenProps> = ({ chosenNumber, onGameOver }) => {
  const initialGuess = calculateRandom(1, 100, chosenNumber)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  
  const handleNextGuess = (direction: "lower" | "higher") => {
    if (
      (direction === "lower" && currentGuess < chosenNumber)
      || (direction === "higher" && currentGuess > chosenNumber)
    ) {
      Alert.alert("Liar", "That is wrong", [{text: "Sorry", style: "cancel"}])
      return
    }
    if (direction === "lower") highBoundary = currentGuess
    else lowBoundary = currentGuess + 1
    const generated = calculateRandom(lowBoundary, highBoundary, currentGuess)
    setCurrentGuess(generated)
  }

  useEffect(() => {
    console.log("Guess", currentGuess)
    if (currentGuess === chosenNumber) onGameOver()
  }, [currentGuess, chosenNumber, onGameOver])

  return (
    <View style={styles.container}>
    <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <View>
          <InstructionsText>Higher or Lower?</InstructionsText>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={{flex: 1}}>
            <PrimaryButton onPress={() => handleNextGuess("lower")}>
              <Ionicons name="remove" />
            </PrimaryButton>
          </View>
          <View style={{flex: 1}}>
            <PrimaryButton onPress={() => handleNextGuess("higher")}>
              <Ionicons name="add"/>
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  container : {
    flex: 1,
    padding: 24
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8
  }
})