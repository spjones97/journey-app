import { Pressable, Text } from "react-native";

type Props = {
  verseNumber: number;
  text: string;
  highlighted?: boolean;
  onLongPress: () => void;
};

export default function Verse({
  verseNumber,
  text,
  highlighted = false,
  onLongPress,
}: Props) {
  return (
    <Pressable onLongPress={onLongPress}>
      <Text
        style={{
          marginBottom: 12,
          backgroundColor: highlighted ? "#fff3b0" : "transparent",
          paddingVertical: 2,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{verseNumber} </Text>
        {text}
      </Text>
    </Pressable>
  );
}
