import { Link } from 'react-router-dom';
import close from '@/assets/icons/close.svg';
import logo from '@/assets/icons/logo.svg';

function CreateHeader({ ...restProps }) {
  return (
    <div className="relative">
      <Link to="/home">
        <img src={logo} alt="공구룸 로고" className="w-12 m-auto" />
      </Link>
      <Link to="/home">
        <img
          src={close}
          alt="닫기"
          className=" absolute top-4"
          {...restProps}
        />
      </Link>
    </div>
  );
}

export default CreateHeader;
