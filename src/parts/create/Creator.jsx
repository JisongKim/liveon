import {AppContext} from '@/App';
import {pb} from '@/api/pocketbase';
import FormInput from '@/components/FormInput';
import {ClientResponseError} from 'pocketbase';
import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Creator() {
  const {updateCreateRoomForm} = useContext(AppContext);
  const [, setProductIdData] = useState('');
  const navigate = useNavigate();

  const [localStorageId] = useState(
    localStorage.getItem('pocketbase_auth')
      ? () => JSON.parse(localStorage.getItem('pocketbase_auth')).model.id
      : navigate('/signin')
  );

  const [idData, setIdData] = useState({});

  useEffect(() => {
    if (idData.id) {
      updateCreateRoomForm('creator', {id: idData.id, name: idData.name});
    }
  }, [idData]);

  useEffect(() => {
    async function readUserId() {
      try {
        const pocketHostId = await pb.collection('users').getFullList();

        pocketHostId.filter((idList) => {
          if (idList.id === localStorageId) {
            setIdData(idList);
          }
        });
      } catch (error) {
        if (!(error instanceof ClientResponseError)) {
          console.error(error);
        }
      }
    }

    async function readProductId() {
      try {
        const productId = await pb.collection('products').getFullList({
          expand: 'creator',
          filter: `creator.id="${localStorageId}"`,
        });

        setProductIdData(productId);
      } catch (error) {
        if (!(error instanceof ClientResponseError)) {
          console.error(error);
        }
      }
    }

    readUserId();
    readProductId();
  }, []);

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
