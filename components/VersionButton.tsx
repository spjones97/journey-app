import { Pressable, Text, View } from "react-native";

type Props = {
  version: string;
  onPress: () => void;
};

export default function VersionButton({ version, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        borderRadius: 999,
        backgroundColor: pressed ? "#E5E7EB" : "#F3F4F6",
        paddingHorizontal: 14,
        paddingVertical: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      })}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontWeight: "600", fontSize: 14 }}>{version}</Text>

        <Text style={{ marginLeft: 6, fontSize: 12, color: "#6B7280" }}>▼</Text>
      </View>
    </Pressable>
  );
}
