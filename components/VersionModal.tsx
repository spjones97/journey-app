import { Modal, View, Text, Pressable, ScrollView } from "react-native";
import { getAllTranslations } from "@/lib/bibleMeta";
import type { BibleVersion } from "@/lib/bible";

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
  const translations = getAllTranslations();
  const versions = Object.keys(translations) as BibleVersion[];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      {/* Background */}
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.3)",
          justifyContent: "flex-end",
        }}
      >
        {/* Bottom Sheet */}
        <Pressable
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: "70%",
            paddingTop: 12,
          }}
        >
          {/* Handle */}
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
            {versions.map((v) => {
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
                    {translations[v]}
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
