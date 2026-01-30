import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import type { BibleVersion } from "@/lib/bible";
import { getAvailableVersions } from "@/lib/bible";

type Props = {
  version: BibleVersion;
  onChange: (v: BibleVersion) => void;
};

export default function VersionSelector({ version, onChange }: Props) {
  const [versions, setVersions] = useState<BibleVersion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAvailableVersions()
      .then(setVersions)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={{ padding: 12 }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ paddingVertical: 8 }}
    >
      <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
        {versions.map((v) => {
          const selected = v === version;

          return (
            <Pressable
              key={v}
              onPress={() => onChange(v)}
              style={({ pressed }) => ({
                marginRight: 10,
                paddingVertical: 8,
                paddingHorizontal: 14,
                borderRadius: 999,
                backgroundColor: selected
                  ? "#2563EB"
                  : pressed
                  ? "#E5E7EB"
                  : "#F3F4F6",
              })}
            >
              <Text
                style={{
                  fontWeight: "600",
                  color: selected ? "white" : "#111827",
                }}
              >
                {v}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
