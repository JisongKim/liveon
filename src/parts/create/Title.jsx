import { AppContext } from '@/App';
import FormInput from '@/components/FormInput';
import { useContext, useState, useEffect } from 'react';

function Title({ value = "" }) {
  const { updateCreateRoomForm } = useContext(AppContext);
  const [data, setData] = useState(value);

  useEffect(() => {
    updateCreateRoomForm('title', data)
  }, [data])

  const handleInputChange = (e) => {
    setData(e.target.value);
  };

  return (
    <>
      <FormInput
        value={data}
        onChange={handleInputChange}
        type="text"
        placeholder="상품명을 입력해주세요."
        labelClassName="product name"
        inputClassName="defaultInput w-full"
        label="상품명"
      />
    </>
  );
}

export default Title;
