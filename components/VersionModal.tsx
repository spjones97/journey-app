import { Modal, View, Text, Pressable } from "react-native";
import type { BibleVersion } from "@/lib/bible";
import { getTranslationInfo } from "@/lib/bible";

const versions: BibleVersion[] = ["KJV", "ASV", "WEB"];

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (v: BibleVersion) => void;
};

export default function VersionModal({ visible, onClose, onSelect }: Props) {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>
          Select Translation
        </Text>

        {versions.map((v) => (
          <Pressable
            key={v}
            onPress={() => {
              onSelect(v);
              onClose();
            }}
          >
            <Text style={{ fontSize: 16, marginBottom: 14 }}>
              {getTranslationInfo(v)}
            </Text>
          </Pressable>
        ))}

        <Pressable onPress={onClose}>
          <Text style={{ marginTop: 30, color: "blue" }}>Cancel</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
