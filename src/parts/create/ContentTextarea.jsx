import { AppContext } from '@/App';
import { useContext, useEffect, useState } from 'react';


function ContentTextarea(
  { value = "", title, placeholder, className, labelClassName, ...restProps }) {
  const { updateCreateRoomForm } = useContext(AppContext);
  const [data, setData] = useState(value);

  useEffect(() => {
    updateCreateRoomForm('content', data);
  }, [data]);

  const handleInputChange = (e) => {
    setData(e.target.value);
  };

  return (
    <>
      <label htmlFor="content" className={labelClassName}>
        내용
      </label>
      <textarea
        value={data}
        onChange={handleInputChange}
        id="content"
        placeholder={placeholder}
        className={className}
        {...restProps}
      />
    </>
  );
}

export default ContentTextarea;
