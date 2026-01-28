import { Modal, View, Text, TextInput, Pressable } from "react-native";
import { useState, useEffect } from "react";

type Props = {
  visible: boolean;
  initialValue: string;
  onSave: (text: string) => void;
  onClose: () => void;
};

export default function NoteModal({
  visible,
  initialValue,
  onSave,
  onClose,
}: Props) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
          Verse Note
        </Text>

        <TextInput
          multiline
          value={text}
          onChangeText={setText}
          placeholder="Write your note here..."
          style={{
            flex: 1,
            textAlignVertical: "top",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
          }}
        />

        <Pressable
          onPress={() => onSave(text)}
          style={{
            padding: 14,
            backgroundColor: "#007AFF",
            borderRadius: 8,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Save</Text>
        </Pressable>

        <Pressable onPress={onClose} style={{ padding: 14 }}>
          <Text style={{ textAlign: "center", color: "red" }}>Cancel</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
