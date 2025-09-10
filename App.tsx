import { Fragment, useState, type ReactNode } from "react"
import { ImageBackground, StyleSheet, SafeAreaView } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"
import { useFonts } from "expo-font"
import AppLoading from "expo-app-loading"
import { StatusBar } from "expo-status-bar"

import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from "./screens/GameOverScreen"

import { COLORS } from "./constants/colors"

const App = () => {
  const [number, setNumber] = useState<number | null>(null)
  const [guessRounds, setGuessRounds] = useState<number>(0)
  const [gameOver, setGameOver] = useState(false)

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  })

  if (!fontsLoaded) return <AppLoading />

  const handleStartGame = (chosenNumber: number) => {
    setNumber(chosenNumber)
    setGameOver(false)
  }

  const handleGameOver = (numRounds: number) => {
    setGameOver(true)
    setGuessRounds(numRounds)
  }

  const handleRestart = () => {
    setNumber(null)
    setGuessRounds(0)
  }

  let screen: ReactNode
  if (gameOver && number) {
    screen = <GameOverScreen
      onRestart={handleRestart}
      userNumber={number}
      rounds={guessRounds}
    />
  } else if (!number) {
    screen = <StartGameScreen onConfirm={handleStartGame} />
  } else {
    screen = <GameScreen
      onGameOver={handleGameOver}
      chosenNumber={number}
    />
  }

  return (
    <Fragment>
      <StatusBar style="light"/>
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
    </Fragment>
  )
}

export default App

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  }
})