import { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import BookSelector from "@/components/BookSelector";
import ChapterSelector from "@/components/ChapterSelector";
import { getBooks, getChapter, getChapterCount } from "@/lib/bible";
import type { BibleVersion } from "@/lib/bible";
import VersionSelector from "@/components/VersionSelector";

export default function BibleScreen() {
  const [version, setVersion] = useState<BibleVersion>("KJV");
  const [books, setBooks] = useState<string[]>([]);
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState(1);

  useEffect(() => {
    const b = getBooks(version);
    setBooks(b);
    setBook(b[0]);
    setChapter(1);
  }, [version]);

  const chapterCount = book ? getChapterCount(version, book) : 0;

  const verses = book ? getChapter(version, book, chapter) : [];

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, padding: 10 }}>
        {version} — {book} {chapter}
      </Text>

      {/* VERSION SELECTOR */}
      <View style={{ height: 50 }}>
        <VersionSelector
          version={version}
          onChange={(v) => {
            setVersion(v);
            setChapter(1);
          }}
        />
      </View>

      {/* BOOK SELECTOR */}
      <View style={{ height: 220 }}>
        <BookSelector
          books={books}
          selectedBook={book}
          onSelect={(b) => {
            setBook(b);
            setChapter(1);
          }}
        />
      </View>

      {/* CHAPTER SELECTOR */}
      <View style={{ height: 150 }}>
        <ChapterSelector
          chapterCount={chapterCount}
          selectedChapter={chapter}
          onSelect={setChapter}
        />
      </View>

      {/* VERSES */}
      <ScrollView style={{ padding: 16 }}>
        {verses.map((text, i) => (
          <Text key={i} style={{ marginBottom: 8 }}>
            <Text style={{ fontWeight: "bold" }}>{i + 1} </Text>
            {text}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}
