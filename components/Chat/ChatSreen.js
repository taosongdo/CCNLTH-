import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, Button, Text, StyleSheet } from 'react-native';
import { db } from '../../config/firebase';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function SimpleChat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })));
    });
    return unsubscribe;
  }, []);

  const handleSend = async () => {
    if (text.trim()) {
      await addDoc(collection(db, 'chats'), {
        text,
        createdAt: new Date(),
        user: 'Bạn',
      });
      setText('');
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        inverted
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Text>{item.user}: {item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Nhập tin nhắn..."
          style={styles.input}
        />
        <Button title="Gửi" onPress={handleSend} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    padding: 8,
    marginVertical: 4,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
  },
});
