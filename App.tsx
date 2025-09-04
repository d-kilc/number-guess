import { useState, type ReactNode } from "react"
import { ImageBackground, StyleSheet, Text, SafeAreaView } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"

import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from "./screens/GameOverScreen"

import { COLORS } from "./constants/colors"

const App = () => {
  const [number, setNumber] = useState<number | null>(null)
  const [gameOver, setGameOver] = useState(false)

  const handleStartGame = (chosenNumber: number) => {
    setNumber(chosenNumber)
    setGameOver(false)
  }

  const handleGameOver = () => setGameOver(true)

  const handleRestart = () => {
    setGameOver(false)
    setNumber(null)
  }

  let screen: ReactNode
  if (gameOver && number) {
    screen = <GameOverScreen onRestart={handleRestart}/>
  } else if (!number) {
    screen = <StartGameScreen onConfirm={handleStartGame} />
  } else {
    screen = <GameScreen onGameOver={handleGameOver} chosenNumber={number}/>
  }

  return (
    <LinearGradient
      colors={[COLORS.primary700, COLORS.accent500]}
      style={styles.appContainer}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={{ flex: 1 }}
        imageStyle={{ opacity: 0.1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  )
}

export default App

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  }
})