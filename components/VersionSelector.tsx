import { View, Text, Pressable } from 'react-native'
import type { BibleVersion } from '@/lib/bible'

type Props = {
  version: BibleVersion
  onChange: (v: BibleVersion) => void
}

const versions: BibleVersion[] = ['KJV', 'ASV', 'WEB']

export default function VersionSelector({ version, onChange }: Props) {
  return (
    <View style={{ flexDirection: 'row', padding: 10 }}>
      {versions.map((v) => (
        <Pressable key={v} onPress={() => onChange(v)}>
          <Text
            style={{
              marginRight: 12,
              fontWeight: v === version ? 'bold' : 'normal',
            }}
          >
            {v}
          </Text>
        </Pressable>
      ))}
    </View>
  )
}
