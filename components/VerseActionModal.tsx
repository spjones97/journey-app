import { Modal, View, Text, Pressable } from "react-native";

type Props = {
  visible: boolean;
  isHighlighted: boolean;
  onClose: () => void;
  onHighlight: () => void;
  onNote: () => void;
};

export default function VerseActionModal({
  visible,
  isHighlighted,
  onClose,
  onHighlight,
  onNote,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.3)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            width: "80%",
          }}
        >
          <Pressable onPress={onHighlight} style={{ padding: 12 }}>
            <Text style={{ fontSize: 16 }}>
              {isHighlighted ? "Remove Highlight" : "Highlight Verse"}
            </Text>
          </Pressable>

          <Pressable onPress={onNote} style={{ padding: 12 }}>
            <Text style={{ fontSize: 16 }}>Add / Edit Note</Text>
          </Pressable>

          <Pressable onPress={onClose} style={{ padding: 12 }}>
            <Text style={{ color: "red", textAlign: "center" }}>Cancel</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}
