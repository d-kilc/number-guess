import { useState, useEffect, Fragment, type FC } from "react"
import { View, StyleSheet, Alert, FlatList, useWindowDimensions} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Title from "../components/ui/Title"
import NumberContainer from "../components/game/NumberContainer"
import Card from "../components/game/Card"
import GuessItem from "../components/game/GuessItem"
import PrimaryButton from "../components/ui/PrimaryButton"
import InstructionsText from "../components/ui/InstructionsText"

type GameScreenProps = {
  onGameOver(numRounds: number): void
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
  const { width, height } = useWindowDimensions()

  const initialGuess = calculateRandom(1, 100, chosenNumber)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [guesses, setGuesses] = useState<Array<number>>([initialGuess])
  
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
    setGuesses((prev) => [generated, ...prev])
  }

  useEffect(() => {
    console.log("Guess", currentGuess)
    if (currentGuess === chosenNumber) onGameOver(guesses.length)
  }, [currentGuess, chosenNumber, onGameOver])

  useEffect(() => {
    lowBoundary = 1
    highBoundary = 100
  }, [])

  let content: React.ReactNode = width > 800
    ? ( // landscra
      <Fragment>
        <View>
          <View style={styles.buttonsContainerWide}>
            <View style={{flex: 1}}>
              <PrimaryButton onPress={() => handleNextGuess("lower")}>
                <Ionicons name="remove" />
              </PrimaryButton>
            </View>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View style={{flex: 1}}>
              <PrimaryButton onPress={() => handleNextGuess("higher")}>
                <Ionicons name="add"/>
              </PrimaryButton>
            </View>
          </View>
        </View>
      </Fragment>
    )
    : (
      <Fragment>
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
      </Fragment>
    )


  return (
    <View style={styles.container}>
      <Title>Opponent's Guess</Title>
      { content }
      <View style={styles.guessContainer}>
        <FlatList
          data={guesses}
          keyExtractor={(g) => String(g)}
          renderItem={(g) => (
            <GuessItem
              guess={g.item}
              round={guesses.length - g.index}
            />
          )}
        />
      </View>
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  container : {
    flex: 1,
    padding: 24,
    // alignItems: "center"
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8
  },
  buttonsContainerWide: {
    flexDirection: "row",
    alignItems: "center"
  },
  guessContainer: {
    flex: 1,
    padding: 16
  }
})