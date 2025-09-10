import { useState, type FC } from "react"

import { StyleSheet, ScrollView, KeyboardAvoidingView, View, TextInput, Alert, useWindowDimensions } from "react-native"
import PrimaryButton from "../components/ui/PrimaryButton"
import Title from "../components/ui/Title"
import InstructionsText from "../components/ui/InstructionsText"
import Card from "../components/game/Card"
import { COLORS } from "../constants/colors"

type StartGameScreenProps = {
  onConfirm(chosenNumber: number): void
}

const StartGameScreen: FC<StartGameScreenProps> = ({ onConfirm }) => {
  const { height } = useWindowDimensions()

  const [value, setValue] = useState<string>("")

  const handleInputChanged = (val: string) => {
    setValue(val)
  }

  const handleConfirmInput = () => {
    const chosenNumber = parseInt(value)
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid",
        "Number should be between 1 and 99",
        [{text: "OK", style: "destructive", onPress: handleResetInput}]
      )
      setValue("")
      return
    }
    return onConfirm(chosenNumber)
  }

  const handleResetInput = () => setValue("")

  const marginTop = height < 450 ? 30 : 100

  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
        <View style={[styles.container, { marginTop }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionsText>
              Enter a number between 1 and 99.
            </InstructionsText>
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="number-pad"
              maxLength={2}
              style={styles.input}
              value={value}
              onChangeText={handleInputChanged}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={handleResetInput}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={handleConfirmInput}>Confirm</PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default StartGameScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: deviceHeight < 380 ? 30 : 100,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8
  },
  buttonContainer: {
    flex: 1
  },
  input: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: COLORS.accent500,
    borderBottomWidth: 2,
    color: COLORS.accent500,
    fontWeight: "bold",
    textAlign: "center"
  }
})
