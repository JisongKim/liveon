import {Link} from 'react-router-dom';
import prev from '@/assets/icons/prev.svg';
import {string} from 'prop-types';
import logo from '@/assets/icons/logo2.svg';

function Header({link = '/home'}) {
  return (
    <div className="relative">
      <Link to="/home">
        <img src={logo} alt="리본 로고" className="w-12 h-12 m-auto" />
      </Link>
      <Link to={link}>
        <img src={prev} alt="뒤로 가기" className="absolute top-3 w-6 h-6" />
      </Link>
    </div>
  );
}

Header.propTypes = {
  link: string,
};

export default Header;
