import { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";

import VersionButton from "@/components/VersionButton";
import VersionModal from "@/components/VersionModal";
import ReferenceButton from "@/components/ReferenceButton";
import ReferenceModal from "@/components/ReferenceModal";
import VerseActionModal from "@/components/VerseActionModal";
import NoteModal from "@/components/NoteModal";
import BookNotesModal from "@/components/BookNotesModal";

import { getBooks, getChapter } from "@/lib/bible";
import type { BibleVersion } from "@/lib/bible";

import { loadUserData, saveUserData } from "@/lib/storage";

export default function BibleScreen() {
  /* ---------------- VERSION / REFERENCE ---------------- */

  const [version, setVersion] = useState<BibleVersion>("KJV");
  const [showVersions, setShowVersions] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [showBookNotes, setShowBookNotes] = useState(false);

  const [books, setBooks] = useState<string[]>([]);
  const [book, setBook] = useState<string>("");
  const [chapter, setChapter] = useState(1);

  /* ---------------- BIBLE CONTENT ---------------- */

  const [verses, setVerses] = useState<string[]>([]);
  const [bibleLoading, setBibleLoading] = useState(true);

  /* ---------------- VERSE INTERACTION ---------------- */

  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [showVerseActions, setShowVerseActions] = useState(false);

  /* ---------------- USER DATA ---------------- */

  const [highlights, setHighlights] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [hydrated, setHydrated] = useState(false);

  const [showNoteModal, setShowNoteModal] = useState(false);

  /* ---------------- HELPERS ---------------- */

  const verseKey = (v: number) => `${version}-${book}-${chapter}-${v}`;

  const getVerseText = (b: string, c: number, v: number) => verses[v - 1] ?? "";

  /* ---------------- LOAD USER STORAGE ---------------- */

  useEffect(() => {
    loadUserData().then((data) => {
      setHighlights(data.highlights);
      setNotes(data.notes);
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveUserData({ highlights, notes });
  }, [highlights, notes, hydrated]);

  /* ---------------- LOAD BOOK LIST ---------------- */

  useEffect(() => {
    async function loadBooks() {
      const list = await getBooks(version);
      setBooks(list);

      if (list.length > 0) {
        setBook(list[0]);
        setChapter(1);
      }
    }

    loadBooks();
  }, [version]);

  /* ---------------- LOAD CHAPTER ---------------- */

  useEffect(() => {
    if (!book) return;

    async function loadChapter() {
      setBibleLoading(true);
      const data = await getChapter(version, book, chapter);
      setVerses(data);
      setBibleLoading(false);
    }

    loadChapter();
  }, [version, book, chapter]);

  /* ---------------- LOADING STATES ---------------- */

  if (!hydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading your notes…</Text>
      </View>
    );
  }

  if (bibleLoading || !book) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading Bible…</Text>
      </View>
    );
  }

  /* ---------------- UI ---------------- */

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

        <Pressable onPress={() => setShowBookNotes(true)}>
          <Text style={{ color: "#007AFF" }}>Notes</Text>
        </Pressable>

        <VersionButton
          version={version}
          onPress={() => setShowVersions(true)}
        />
      </View>

      {/* READER */}
      <ScrollView style={{ flex: 1, padding: 16 }}>
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

      {/* VERSION MODAL */}
      <VersionModal
        visible={showVersions}
        onClose={() => setShowVersions(false)}
        onSelect={(v) => {
          setVersion(v);
          setShowVersions(false);
        }}
      />

      {/* REFERENCE MODAL */}
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

      {/* NOTE MODAL */}
      <NoteModal
        visible={showNoteModal}
        reference={`${book} ${chapter}:${selectedVerse}`}
        verseText={
          selectedVerse !== null
            ? getVerseText(book, chapter, selectedVerse)
            : ""
        }
        initialValue={
          selectedVerse !== null ? notes[verseKey(selectedVerse)] ?? "" : ""
        }
        onSave={(text) => {
          if (selectedVerse !== null) {
            const key = verseKey(selectedVerse);
            setNotes((prev) => {
              const next = { ...prev };
              if (!text.trim()) delete next[key];
              else next[key] = text;
              return next;
            });
          }
          setShowNoteModal(false);
        }}
        onClose={() => setShowNoteModal(false)}
      />

      {/* BOOK NOTES */}
      <BookNotesModal
        visible={showBookNotes}
        book={book}
        chapter={chapter}
        version={version}
        notes={notes}
        getVerseText={getVerseText}
        onSelectVerse={(c, v) => {
          setChapter(c);
          setSelectedVerse(v);
        }}
        onClose={() => setShowBookNotes(false)}
      />
    </View>
  );
}
