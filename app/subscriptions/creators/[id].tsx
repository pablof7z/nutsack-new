import { View, Text } from "react-native";
import { useStyles } from "react-native-unistyles";
import { stylesheet } from "../../../styles";

export default function CreatorProfile() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Creator Profile</Text>
    </View>
  );
}