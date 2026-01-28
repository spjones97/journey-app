import { Modal, View, Text, Pressable, FlatList } from "react-native";
import type { BibleVersion } from "@/lib/bible";
import { getBooks, getChapterCount } from "@/lib/bible";

type Props = {
  visible: boolean;
  version: BibleVersion;
  currentBook: string;
  currentChapter: number;
  onSelect: (book: string, chapter: number) => void;
  onClose: () => void;
};

export default function ReferenceModal({
  visible,
  version,
  currentBook,
  currentChapter,
  onSelect,
  onClose,
}: Props) {
  const books = getBooks(version);
  const chapterCount = getChapterCount(version, currentBook);
  const chapters = Array.from({ length: chapterCount }, (_, i) => i + 1);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Select Passage</Text>

        {/* BOOK LIST */}
        <Text style={{ fontSize: 16, marginBottom: 8 }}>Book</Text>
        <FlatList
          data={books}
          keyExtractor={(item) => item}
          style={{ maxHeight: 250 }}
          renderItem={({ item }) => (
            <Pressable onPress={() => onSelect(item, 1)}>
              <Text
                style={{
                  paddingVertical: 6,
                  fontWeight: item === currentBook ? "bold" : "normal",
                }}
              >
                {item}
              </Text>
            </Pressable>
          )}
        />

        {/* CHAPTER GRID */}
        <Text style={{ fontSize: 16, marginVertical: 12 }}>Chapter</Text>
        <FlatList
          data={chapters}
          numColumns={6}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <Pressable onPress={() => onSelect(currentBook, item)}>
              <Text
                style={{
                  width: 44,
                  margin: 6,
                  padding: 10,
                  textAlign: "center",
                  backgroundColor: item === currentChapter ? "#ddd" : "#f2f2f2",
                }}
              >
                {item}
              </Text>
            </Pressable>
          )}
        />

        <Pressable onPress={onClose}>
          <Text style={{ marginTop: 30, color: "blue" }}>Done</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
