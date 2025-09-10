import { type FC } from "react"
import { ScrollView, Text, View, StyleSheet, Image, useWindowDimensions } from "react-native"
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
  const { width, height } = useWindowDimensions()

  let imageSize = 300
  if (width < 700) imageSize = 150
  if (height < 500) imageSize = 80
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <Title>Game Over</Title>
        <View style={[styles.imageContainer, { width: imageSize, height: imageSize, borderRadius: imageSize / 2}]}>
          <Image source={require("../assets/images/success.png")} style={styles.image}/>
        </View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.textHighlighted}>{rounds}</Text> rounds to guess the number <Text style={styles.textHighlighted}>{userNumber}</Text>.
        </Text>
        <PrimaryButton onPress={onRestart}>New Game</PrimaryButton>
      </View>
    </ScrollView>
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
    // borderRadius: deviceWidth < 380 ? 75 : 150,
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 160 : 300,
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