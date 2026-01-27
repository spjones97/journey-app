import { FlatList, Pressable, Text } from "react-native";

type Props = {
  chapterCount: number;
  selectedChapter: number;
  onSelect: (chapter: number) => void;
};

export default function ChapterSelector({
  chapterCount,
  selectedChapter,
  onSelect,
}: Props) {
  const chapters = Array.from({ length: chapterCount }, (_, i) => i + 1);

  return (
    <FlatList
      data={chapters}
      numColumns={6}
      keyExtractor={(item) => item.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => onSelect(item)}>
          <Text
            style={{
              width: 44,
              margin: 6,
              padding: 10,
              textAlign: "center",
              backgroundColor: item === selectedChapter ? "#ddd" : "#f2f2f2",
            }}
          >
            {item}
          </Text>
        </Pressable>
      )}
    />
  );
}
