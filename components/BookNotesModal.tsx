import { Modal, View, Text, ScrollView, Pressable } from "react-native";

type Props = {
  visible: boolean;
  book: string;
  chapter: number;
  version: string;
  notes: Record<string, string>;
  getVerseText: (book: string, chapter: number, verse: number) => string;
  onSelectVerse: (chapter: number, verse: number) => void;
  onClose: () => void;
};

export default function BookNotesModal({
  visible,
  book,
  version,
  notes,
  getVerseText,
  onSelectVerse,
  onClose,
}: Props) {
  const bookNotes = Object.entries(notes).filter(([key]) =>
    key.startsWith(`${version}-${book}-`)
  );

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 12 }}>
          Notes — {book}
        </Text>

        <ScrollView>
          {bookNotes.length === 0 && (
            <Text style={{ color: "#666", marginTop: 20 }}>
              No notes for this book yet.
            </Text>
          )}

          {bookNotes.map(([key, note]) => {
            const [, , chapterStr, verseStr] = key.split("-");
            const chapter = Number(chapterStr);
            const verse = Number(verseStr);
            const verseText = getVerseText(book, chapter, verse);

            return (
              <Pressable
                key={key}
                onPress={() => {
                  onSelectVerse(chapter, verse);
                  onClose();
                }}
                style={{
                  marginBottom: 20,
                  padding: 12,
                  backgroundColor: "#F5F5F5",
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
                  {book} {chapter}:{verse}
                </Text>

                <Text style={{ fontStyle: "italic", marginBottom: 6 }}>
                  {verseText}
                </Text>

                <Text>{note}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Pressable
          onPress={onClose}
          style={{
            padding: 12,
            marginTop: 10,
            backgroundColor: "#007AFF",
            borderRadius: 6,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
