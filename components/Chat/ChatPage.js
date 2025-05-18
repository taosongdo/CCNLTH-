import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, TextInput, Button, Text, StyleSheet, Pressable, Image } from 'react-native';
import { db } from '../../config/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import Styles from '../../Styles';
import { UserContext } from '../../config/AppContext';
import InputBar from '../InputBar';
import TouchButton from '../TouchButton';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Alert } from 'react-native';
import Apis, { endpoints } from '../../config/Apis';


const ChatPage = ({ route, navigation }) => {
  const {
    apply_id,
    another_user_avatar,
    another_user_last_name,
    another_user_first_name,
    deleteItemHandler
  } = route.params
  const { role, access_token } = useContext(UserContext)
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'chats'), where('apply_id', '==', apply_id), orderBy('createdAt', 'desc'));
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
        text: text.trim(),
        createdAt: new Date(),
        role: role,
        apply_id: apply_id
      });
      setText('');
    }
  };
  const changeData = async (apply_status) => {
    try {
      const res = await Apis.patch(endpoints['applies-details'](apply_id), {
        apply_status: apply_status
      }, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
    }
    catch (err) {
      console.log(err)
    }
  }
  const acceptApply = () => {
    Alert.alert("thông báo", " chấp nhận công việc! ",
      [
        {
          text: "Hủy", // Nút hủy
          style: "cancel",
        },
        {
          text: "đánh rót", // Nút hủy
          onPress: () => {
            changeData(5)
            navigation.goBack()
          }
        },
        {
          text: "đánh đậu", // Nút hủy
          onPress: () => {
            changeData(4)
            navigation.goBack()
          }
        },
      ]
    )
  }

  return (
    <>
      <View style={[Styles.h60, Styles.bgColorF8FAFC, Styles.flexDirectionRow, { justifyContent: "space-between" }]}>
        <View style={Styles.flexDirectionRow}>
          <Pressable style={[Styles.w60, Styles.h60, Styles.p10]} onPress={() => { navigation.goBack() }}>
            <FontAwesome5Icon name="arrow-left" size={40} />
          </Pressable>
          <View style={[Styles.w60, Styles.h60, Styles.p10]}>
            <Image source={{ uri: another_user_avatar }} style={[Styles.flex1, Styles.borderRadius100]} />
          </View>
          <View style={Styles.justifyContentCenter}>
            <Text style={{ fontSize: 25 }}>{another_user_last_name} {another_user_first_name}</Text>
          </View>
        </View>
        <Pressable style={[Styles.w60, Styles.h60, Styles.p10]} onPress={() => { navigation.navigate("trang video") }}>
          <FontAwesome name="video-camera" size={40} />
        </Pressable>
      </View>
      <View style={[Styles.bgColorF8FAFC, Styles.flex1]}>
        <FlatList
          inverted
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (item.role !== role) {
              return (
                <View style={[{ alignItems: "flex-start" }, Styles.p10]}>
                  <Text style={[Styles.p10, Styles.bgColorBFDBFE, Styles.borderRadius10, { maxWidth: '70%' }]}>{item.text}</Text>
                </View>
              )
            }
            else {
              return (
                <View style={[{ alignItems: "flex-end" }, Styles.p10]}>
                  <Text style={[Styles.p10, Styles.bgColorBFDBFE, Styles.borderRadius10, { maxWidth: '70%' }]}>{item.text}</Text>
                </View>
              )
            }
          }}
        />
        <View style={[Styles.flexDirectionRow, Styles.bgColorF8FAFC]}>
          {role == 2 &&
            <View style={[{ width: 80 }, Styles.p10]}>
              <TouchButton title={<FontAwesome name='check' />} pressHandler={acceptApply} />
            </View>
          }
          <View style={[Styles.flex1, Styles.p10]}>
            <InputBar value={text} TextChangeHandler={setText} placeholder={"tin nhắn"} />
          </View>
          <View style={[{ width: 80 }, Styles.p10]}>
            <TouchButton title={"gửi"} pressHandler={handleSend} />
          </View>
        </View>
      </View>
    </>
  );
}
export default ChatPage