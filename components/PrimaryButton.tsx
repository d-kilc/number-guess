import { type FC, type ReactNode } from "react"
import { Pressable, View, Text } from "react-native"

type PrimaryButtonProps = {
  children: ReactNode
}

const PrimaryButton: FC<PrimaryButtonProps> = ({children}) => {
  return (
    <Pressable>
      <View>
        <Text>{children}</Text>
      </View>
    </Pressable>
  )
}

export default PrimaryButton