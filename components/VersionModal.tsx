import { Modal, View, Text, Pressable, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { getTranslationInfo } from "@/lib/bible";
import type { BibleVersion } from "@/lib/bible";
import { AVAILABLE_VERSIONS } from "@/lib/versionList";

type Props = {
  visible: boolean;
  selected?: BibleVersion;
  onSelect: (v: BibleVersion) => void;
  onClose: () => void;
};

export default function VersionModal({
  visible,
  selected,
  onSelect,
  onClose,
}: Props) {
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!visible) return;

    let cancelled = false;

    function loadTranslations() {
      AVAILABLE_VERSIONS.forEach(async (version) => {
        try {
          const desc = await getTranslationInfo(version);

          if (!cancelled) {
            setTranslations((prev) => ({
              ...prev,
              [version]: desc,
            }));
          }
        } catch {
          if (!cancelled) {
            setTranslations((prev) => ({
              ...prev,
              [version]: version,
            }));
          }
        }
      });
    }

    loadTranslations();

    return () => {
      cancelled = true;
    };
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.3)",
          justifyContent: "flex-end",
        }}
      >
        <Pressable
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: "70%",
            paddingTop: 12,
          }}
        >
          <View
            style={{
              alignSelf: "center",
              width: 40,
              height: 4,
              borderRadius: 2,
              backgroundColor: "#D1D5DB",
              marginBottom: 12,
            }}
          />

          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Select Version
          </Text>

          <ScrollView>
            {AVAILABLE_VERSIONS.map((v) => {
              const isSelected = selected === v;

              return (
                <Pressable
                  key={v}
                  onPress={() => {
                    onSelect(v);
                    onClose();
                  }}
                  style={({ pressed }) => ({
                    paddingVertical: 14,
                    paddingHorizontal: 20,
                    backgroundColor: pressed
                      ? "#F3F4F6"
                      : isSelected
                      ? "#EEF2FF"
                      : "white",
                    borderBottomWidth: 1,
                    borderBottomColor: "#F3F4F6",
                  })}
                >
                  <Text style={{ fontWeight: "600", fontSize: 16 }}>{v}</Text>

                  <Text
                    style={{
                      color: "#6B7280",
                      fontSize: 13,
                      marginTop: 2,
                    }}
                  >
                    {translations[v] ?? "Loading…"}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
