import { useContext, useEffect, useState } from 'react';
import minusCircle from '@/assets/icons/minusCircle.svg';
import plusCircle from '@/assets/icons/plusCircle.svg';
import { AppContext } from '@/App';

function ParticipateCounter({ value = 0, labelClassName }) {
  const [count, setCount] = useState(value);
  const { updateCreateRoomForm } = useContext(AppContext);

  useEffect(() => {
    updateCreateRoomForm('participateNumber', count);
  }, [count]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  return (
    <div className="py-2">
      <label htmlFor="participateCounter" className={labelClassName}>
        참여자 인원
      </label>
      <div value={count} id="participateCounter" className="flex gap-2 float-right p-2 items-center">
        <button type="button" onClick={decrementCount}>
          <img src={minusCircle} alt="minus" />
        </button>

        {count}

        <button type="button" onClick={incrementCount}>
          <img src={plusCircle} alt="plus" />
        </button>
      </div>
    </div>
  );
}

export default ParticipateCounter;
