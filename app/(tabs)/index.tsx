import { View, Text, FlatList } from 'react-native'
import { useState } from 'react'
import { getChapter, BibleVersion } from '@/lib/bible'

export default function BibleScreen() {
  const [version, setVersion] = useState<BibleVersion>('WEB')
  const [book] = useState('Genesis')
  const [chapter] = useState(1)

  const verses = getChapter(version, book, chapter)

  return (
    <FlatList
      data={verses}
      keyExtractor={(_, i) => i.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item, index }) => (
        <Text style={{ marginBottom: 12, fontSize: 16, lineHeight: 22 }}>
          <Text style={{ fontWeight: 'bold' }}>{index + 1} </Text>
          {item}
        </Text>
      )}
    />
  )
}
