import Spinner from '@/components/Spinner';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import StatusIcon from './StatusIcon';

function DetailStatus() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function detailProgress() {
      try {
        const db = getFirestore();
        const shareRef = doc(db, 'share', id);
        const shareSnap = await getDoc(shareRef);
        if (shareSnap.exists()) {
          setData(shareSnap.data());
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setLoading(false);
      }
    }

    detailProgress();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (data) {
    return (
      <>
        {data.status === '모집중' ? (
          <div className="flex">
            <StatusIcon color="#30B66E" textColor="#FFF" text="모집중" />
            <StatusIcon text="쉐어중" />
            <StatusIcon text="쉐어완료" textX="30%" textY="64%" />
          </div>
        ) : data.status === '쉐어중' ? (
          <div className="flex">
            <StatusIcon text="모집중" />
            <StatusIcon color="#F09847" textColor="#FFF" text="쉐어중" />
            <StatusIcon text="쉐어완료" textX="30%" textY="64%" />
          </div>
        ) : (
          <div className="flex">
            <StatusIcon text="모집중" />
            <StatusIcon text="쉐어중" />
            <StatusIcon
              color="#8D948F"
              textColor="#FFF"
              text="쉐어완료"
              textX="30%"
              textY="64%"
            />
          </div>
        )}
      </>
    );
  } else {
    return <div role="alert">No data found</div>;
  }
}

export default DetailStatus;
