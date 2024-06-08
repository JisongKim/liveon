import { AppContext } from '@/App';
import FormInput from '@/components/FormInput';
import { useContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase'; // Firestore 초기화 파일 임포트

function Creator() {
  const { updateCreateRoomForm } = useContext(AppContext);
  const [idData, setIdData] = useState({});

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const userRef = doc(db, 'users', userId);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setIdData(userData);
          updateCreateRoomForm('creator', { id: userId, name: userData.name });
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      fetchUserData(user.uid);
    }
  }, [updateCreateRoomForm]);

  return (
    <>
      <FormInput
        readOnly
        value={idData.name || ''}
        label="생성자"
        type="text"
        name="creator"
        placeholder="생성자 정보"
        inputClassName="w-full defaultInput"
      />
    </>
  );
}

export default Creator;
