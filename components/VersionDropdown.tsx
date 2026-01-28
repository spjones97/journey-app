import { View, Text, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import type { BibleVersion } from "@/lib/bible";
import { getTranslationInfo } from "@/lib/bible";

type Props = {
  version: BibleVersion;
  onChange: (v: BibleVersion) => void;
};

const versions: BibleVersion[] = ["KJV", "ASV", "WEB"];

export default function VersionDropdown({ version, onChange }: Props) {
  return (
    <View
      style={{
        paddingHorizontal: 12,
        paddingTop: 10,
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 14, marginBottom: 6 }}>Translation</Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <Picker
          selectedValue={version}
          onValueChange={(value) => onChange(value)}
          style={{
            height: Platform.OS === "ios" ? 180 : 50,
          }}
          itemStyle={{
            color: "#000", // ✅ THIS is the key line
            fontSize: 16,
          }}
        >
          {versions.map((v) => (
            <Picker.Item key={v} label={getTranslationInfo(v)} value={v} />
          ))}
        </Picker>
      </View>
    </View>
  );
}
