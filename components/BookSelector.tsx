import { View, Text, Pressable, FlatList } from 'react-native'

type Props = {
  books: string[]
  selectedBook: string
  onSelect: (book: string) => void
}

export default function BookSelector({
  books,
  selectedBook,
  onSelect,
}: Props) {
  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <Pressable onPress={() => onSelect(item)}>
          <Text
            style={{
              padding: 12,
              fontSize: 16,
              backgroundColor: item === selectedBook ? '#ddd' : 'transparent',
            }}
          >
            {item}
          </Text>
        </Pressable>
      )}
    />
  )
}
