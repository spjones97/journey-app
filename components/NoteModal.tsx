import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";

type Props = {
  visible: boolean;
  reference: string;
  verseText: string;
  initialValue: string;
  onSave: (text: string) => void;
  onClose: () => void;
};

export default function NoteModal({
  visible,
  reference,
  verseText,
  initialValue,
  onSave,
  onClose,
}: Props) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        {/* Backdrop */}
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.3)" }}
          onPress={onClose}
        />

        {/* Sheet */}
        <View
          style={{
            backgroundColor: "white",
            padding: 16,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: "70%",
          }}
        >
          {/* Reference */}
          <Text style={{ fontWeight: "600", marginBottom: 6 }}>
            {reference}
          </Text>

          {/* Verse Preview */}
          <Text
            style={{
              fontStyle: "italic",
              color: "#555",
              marginBottom: 12,
            }}
            numberOfLines={3}
          >
            {verseText}
          </Text>

          {/* Note Input */}
          <TextInput
            multiline
            value={text}
            onChangeText={setText}
            placeholder="Write your note..."
            style={{
              minHeight: 120,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 10,
              textAlignVertical: "top",
            }}
          />

          {/* Actions */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            <Pressable onPress={onClose}>
              <Text style={{ color: "red" }}>Cancel</Text>
            </Pressable>

            <Pressable onPress={() => onSave(text)}>
              <Text style={{ color: "#007AFF", fontWeight: "600" }}>Save</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
