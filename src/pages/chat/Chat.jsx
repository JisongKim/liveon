import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore'; // orderBy 추가
import { getAuth } from 'firebase/auth';
import Header from '@/layout/Header';
import { getApp } from 'firebase/app';

const Chat = () => {
  const { id } = useParams(); // Assuming {id} is share id
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatTitle, setChatTitle] = useState('');
  const [userProfiles, setUserProfiles] = useState({});
  const messagesEndRef = useRef(null);
  const db = getFirestore(getApp());
  const auth = getAuth();

  useEffect(() => {
    const fetchChat = async () => {
      const chatDocRef = doc(db, 'chats', id);
      const chatDoc = await getDoc(chatDocRef);
      
      if (!chatDoc.exists()) {
        const shareDocRef = doc(db, 'share', id);
        const shareDoc = await getDoc(shareDocRef);

        if (shareDoc.exists()) {
          const shareData = shareDoc.data();
          await setDoc(chatDocRef, {
            title: shareData.title,
            participate: shareData.participate
          });
          setChatTitle(shareData.title);
        }
      } else {
        setChatTitle(chatDoc.data().title);
      }
    };

    const fetchUserProfiles = async (uids) => {
      const profiles = {};
      await Promise.all(uids.map(async (uid) => {
        const userDocRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          profiles[uid] = `${userData.region} ${userData.nickname}`;
        }
      }));
      setUserProfiles(profiles);
    };

    fetchChat();

    const q = query(collection(db, 'messages'), where('chat_id', '==', id), orderBy('timestamp')); // orderBy 추가
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const messagesData = [];
      const senderUids = new Set();
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        messagesData.push({ id: doc.id, ...data });
        senderUids.add(data.sender);
      });

      setMessages(messagesData);
      await fetchUserProfiles(Array.from(senderUids));
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

    return () => unsubscribe();
  }, [db, id]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const messageData = {
      chat_id: id,
      sender: auth.currentUser.uid,
      timestamp: new Date(),
      text: newMessage
    };

    await addDoc(collection(db, 'messages'), messageData);
    setNewMessage('');
  };

  return (
    <>
      <Helmet>
        <title>LIVE:ON - 채팅방</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="LIVE:ON 채팅방" />
        <meta property="twitter:title" content="LIVE:ON 채팅방" />
        <meta property="og:type" content="web application" />
        <meta property="og:url" content={`https://r09m.vercel.app/chat/${id}`} />
        <meta property="og:description" content="이 채팅방에서 대화를 나눌 수 있습니다." />
        <meta name="description" content="이 채팅방에서 대화를 나눌 수 있습니다." />
        <meta property="og:image" content="ribbon.png" />
        <meta property="og:article:author" content="LIVE:ON" />
      </Helmet>
      <h1 className="sr-only">LIVE:ON</h1>

      <div className="bg-line-200 py-2">
        <div className="px-4">
          <Header />
          <h2 className="pageTitle">{chatTitle}</h2>
        </div>
        <div className="px-4 pb-16">
          <div className="overflow-y-auto" style={{ maxHeight: '70vh' }}>
            {messages.map(({ id, text, sender, timestamp }) => (
              <div
                key={id}
                className={`my-2 p-2 rounded-md ${sender === auth.currentUser.uid ? 'bg-blue-200 self-end text-right' : 'bg-gray-200 self-start'}`}
              >
                <div className="text-xs text-gray-600">
                  {sender !== auth.currentUser.uid ? userProfiles[sender] || `${sender}` : ''} 
                </div>
                <div>{text}</div>
                <div className="text-xs text-gray-600">
                  {timestamp instanceof Date ? timestamp.toLocaleString() : new Date(timestamp.seconds * 1000).toLocaleString()}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="fixed bottom-0 max-w-xl w-full py-3 z-50 bg-white flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border rounded p-2 mr-2"
              placeholder="메시지를 입력하세요"
            />
            <button type="submit" className="bg-primary-500 text-white px-4 py-2 rounded">
              전송
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
