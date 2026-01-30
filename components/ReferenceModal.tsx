import { Modal, View, Text, Pressable, FlatList } from "react-native";
import { useEffect, useState } from "react";
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
  const [books, setBooks] = useState<string[]>([]);
  const [chapterCount, setChapterCount] = useState(0);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingChapters, setLoadingChapters] = useState(true);

  /* Load Books */
  useEffect(() => {
    async function loadBooks() {
      setLoadingBooks(true);
      const result = await getBooks(version);
      setBooks(result);
      setLoadingBooks(false);
    }

    if (visible) loadBooks();
  }, [version, visible]);

  /* Load Chapters */
  useEffect(() => {
    async function loadChapters() {
      setLoadingChapters(true);
      const count = await getChapterCount(version, currentBook);
      setChapterCount(count);
      setLoadingChapters(false);
    }

    if (visible && currentBook) loadChapters();
  }, [version, currentBook, visible]);

  const chapters = Array.from({ length: chapterCount }, (_, i) => i + 1);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Select Passage</Text>

        {/* BOOK LIST */}
        <Text style={{ fontSize: 16, marginBottom: 8 }}>Book</Text>

        {loadingBooks ? (
          <Text>Loading books…</Text>
        ) : (
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
        )}

        {/* CHAPTER GRID */}
        <Text style={{ fontSize: 16, marginVertical: 12 }}>Chapter</Text>

        {loadingChapters ? (
          <Text>Loading chapters…</Text>
        ) : (
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
                    backgroundColor:
                      item === currentChapter ? "#ddd" : "#f2f2f2",
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />
        )}

        <Pressable onPress={onClose}>
          <Text style={{ marginTop: 30, color: "blue" }}>Done</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
