import { useState } from 'react';
import { getAuth, deleteUser, onAuthStateChanged } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore'; // Firestore 추가
import Button from '@/components/Button';
import toast from 'react-hot-toast';
import { db } from '@/firebase'; // Firestore 인스턴스 가져오기

function Withdrawal() {
  const [isDeleting, setIsDeleting] = useState(false);
  const auth = getAuth();

  const handleWithdrawal = async () => {
    if (confirm('탈퇴하시겠습니까?')) {
      setIsDeleting(true);

      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error('사용자가 로그인되어 있지 않습니다.');
        }

        const userDocRef = doc(db, 'users', user.uid);
        await deleteDoc(userDocRef); // Firestore에서 사용자 데이터 삭제
        await deleteUser(user); // Firebase 인증 계정 삭제

        toast.success('탈퇴되었습니다. 이용해 주셔서 감사합니다.', {
          style: {
            border: '1px solid #258D55',
            padding: '16px',
            color: '#1B653D',
          },
          iconTheme: {
            primary: '#1B653D',
            secondary: '#FFF',
          },
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
          duration: 4000,
        });

        // 탈퇴 후 추가적인 처리 (예: 리디렉션)
      } catch (error) {
        console.error(error);
        toast.error('탈퇴에 실패하였습니다. 다시 시도해 주세요.', {
          position: 'top-center',
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Button
      type="button"
      className="signOut"
      disabled={isDeleting}
      onClick={handleWithdrawal}
    >
      회원탈퇴
    </Button>
  );
}

export default Withdrawal;
