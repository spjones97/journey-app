import { Pressable, Text, View } from "react-native";
import type { BibleVersion } from "@/lib/bible";

type Props = {
  version: BibleVersion;
  onPress: () => void;
};

export default function VersionButton({ version, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 6,
          backgroundColor: "#eee",
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "600" }}>{version} ▾</Text>
      </View>
    </Pressable>
  );
}
