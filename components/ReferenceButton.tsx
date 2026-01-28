import { Pressable, Text, View } from "react-native";

type Props = {
  book: string;
  chapter: number;
  onPress: () => void;
};

export default function ReferenceButton({ book, chapter, onPress }: Props) {
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
        <Text style={{ fontSize: 14, fontWeight: "600" }}>
          {book} {chapter} ▾
        </Text>
      </View>
    </Pressable>
  );
}
