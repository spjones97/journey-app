import { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";

import VersionButton from "@/components/VersionButton";
import VersionModal from "@/components/VersionModal";
import ReferenceButton from "@/components/ReferenceButton";
import ReferenceModal from "@/components/ReferenceModal";
import VerseActionModal from "@/components/VerseActionModal";

import { getBooks, getChapter } from "@/lib/bible";
import type { BibleVersion } from "@/lib/bible";
import NoteModal from "@/components/NoteModal";

export default function BibleScreen() {
  const [version, setVersion] = useState<BibleVersion>("KJV");
  const [showVersions, setShowVersions] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const books = getBooks(version);
  const [book, setBook] = useState(books[0]);
  const [chapter, setChapter] = useState(1);

  const verses = getChapter(version, book, chapter);

  // verse interaction state
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [showVerseActions, setShowVerseActions] = useState(false);

  // highlight state
  const [highlights, setHighlights] = useState<Record<string, boolean>>({});

  const [notes, setNotes] = useState<Record<string, string>>({});
  const [showNoteModal, setShowNoteModal] = useState(false);

  const verseKey = (v: number) => `${version}-${book}-${chapter}-${v}`;

  const getVerseText = (v: number) => verses[v - 1];

  return (
    <View style={{ flex: 1 }}>
      {/* TOP BAR */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <ReferenceButton
          book={book}
          chapter={chapter}
          onPress={() => setShowReference(true)}
        />

        <VersionButton
          version={version}
          onPress={() => setShowVersions(true)}
        />
      </View>

      {/* READER */}
      <ScrollView
        style={{ flex: 1, padding: 16 }}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {verses.map((text, i) => {
          const verseNumber = i + 1;
          const key = verseKey(verseNumber);

          return (
            <Pressable
              key={i}
              onLongPress={() => {
                setSelectedVerse(verseNumber);
                setShowVerseActions(true);
              }}
              style={{
                marginBottom: 12,
                padding: 6,
                borderRadius: 6,
                backgroundColor: highlights[key] ? "#FFF3A0" : "transparent",
              }}
            >
              <Text>
                <Text style={{ fontWeight: "bold" }}>{verseNumber} </Text>
                {text}
                {notes[key] && (
                  <Text style={{ color: "#007AFF", fontSize: 12 }}> 📝</Text>
                )}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* VERSE ACTIONS */}
      <VerseActionModal
        visible={showVerseActions}
        isHighlighted={
          selectedVerse !== null && highlights[verseKey(selectedVerse)] === true
        }
        onClose={() => {
          setSelectedVerse(null);
          setShowVerseActions(false);
        }}
        onHighlight={() => {
          if (selectedVerse !== null) {
            const key = verseKey(selectedVerse);
            setHighlights((prev) => {
              const next = { ...prev };
              if (next[key]) delete next[key];
              else next[key] = true;
              return next;
            });
          }
          setShowVerseActions(false);
        }}
        onNote={() => {
          setShowVerseActions(false);
          setShowNoteModal(true);
        }}
      />

      {/* MODALS */}
      <VersionModal
        visible={showVersions}
        onClose={() => setShowVersions(false)}
        onSelect={(v) => {
          setVersion(v);
          const newBooks = getBooks(v);
          setBook(newBooks[0]);
          setChapter(1);
        }}
      />

      <ReferenceModal
        visible={showReference}
        version={version}
        currentBook={book}
        currentChapter={chapter}
        onSelect={(b, c) => {
          setBook(b);
          setChapter(c);
          setShowReference(false);
        }}
        onClose={() => setShowReference(false)}
      />

      <NoteModal
        visible={showNoteModal}
        reference={`${book} ${chapter}:${selectedVerse}`}
        verseText={selectedVerse !== null ? getVerseText(selectedVerse) : ""}
        initialValue={
          selectedVerse !== null ? notes[verseKey(selectedVerse)] ?? "" : ""
        }
        onSave={(text) => {
          if (selectedVerse !== null) {
            const key = verseKey(selectedVerse);
            setNotes((prev) => ({
              ...prev,
              [key]: text,
            }));
          }
          setShowNoteModal(false);
        }}
        onClose={() => setShowNoteModal(false)}
      />
    </View>
  );
}
