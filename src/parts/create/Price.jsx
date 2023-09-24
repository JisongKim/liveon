import { AppContext } from '@/App';
import FormInput from '@/components/FormInput';
import { useContext, useState, useEffect } from 'react';

function Price(
  {
    value,
  }
) {
  const { updateCreateRoomForm } = useContext(AppContext);
  const [data, setData] = useState(value);

  useEffect(() => {
    updateCreateRoomForm('price', data)
  }, [data])

  const handleInputChange = (e) => {
    setData(e.target.value);

  };

  return (
    <>
      <FormInput
        value={data}
        onChange={handleInputChange}
        type="number"
        placeholder="0원"
        labelClassName="product price"
        inputClassName="defaultInput w-full"
        label="상품 가격"
      />
    </>
  );
}

export default Price;
