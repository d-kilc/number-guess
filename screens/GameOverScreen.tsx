import { type FC } from "react"
import { Text, View } from "react-native"
import PrimaryButton from "../components/ui/PrimaryButton"

type GameOverScreenProps = {
  onRestart(): void
}

const GameOverScreen: FC<GameOverScreenProps> = ({ onRestart }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <PrimaryButton onPress={onRestart}>Restart</PrimaryButton>
    </View>
  )
}

export default GameOverScreen