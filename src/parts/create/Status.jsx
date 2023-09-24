import { AppContext } from '@/App';
import { useContext, useState, useEffect } from 'react';

function Status({ value = "대기중", title, className, labelClassName, ...restProps }) {
  const { updateCreateRoomForm } = useContext(AppContext);
  const [data, setData] = useState(value);

  useEffect(() => {
    updateCreateRoomForm('status', data)
  }, [data])

  const handleInputChange = (e) => {
    setData(e.target.value);
  };

  function Status({ title, className, labelClassName, ...restProps }) {
    return (
      <>
        <label htmlFor="status" className={labelClassName}>
          상태
        </label>
        <select
          value={data || ""}
          onChange={handleInputChange}
          id="status"
          className={className}
          name="status"
          {...restProps}
        >
          <option value="대기중">대기중</option>
          <option value="진행중">진행중</option>
          <option value="공구종료">공구종료</option>
        </select>
      </>
    );
  }
}
export default Status;
