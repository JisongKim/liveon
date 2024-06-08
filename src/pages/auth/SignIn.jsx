import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import Header from '@/layout/Header';
import toast from 'react-hot-toast';
import {debounce} from '@/utils/debounce';
import {useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function SignIn() {
  const {state} = useLocation();

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = async (e) => {
    e.preventDefault();

    const { email, password } = formState;
    const auth = getAuth();

    try {
      // 파이어베이스 인증으로 로그인
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      if (!state) {
        navigate('/');
      } else {
        const { wishLocationPath } = state;
        navigate(wishLocationPath === '/signin' ? '/' : wishLocationPath);
      }
    } catch (error) {
      console.error(error);
      toast.error('로그인에 실패했습니다.', {
        position: 'top-center',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    }
  };

  const handleInput = debounce((e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }, 400);

  return (
    <>
      <Helmet>
        <title>LIVE:ON - 로그인</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="자취인 전용 위치기반 커뮤니티 리본(LIVE: ON) 로그인 페이지"
        />
        <meta
          property="twitter:title"
          content="자취인 전용 위치기반 커뮤니티 리본(LIVE: ON) 로그인 페이지"
        />
        <meta property="og:type" content="web application" />
        <meta property="og:url" content="https://LIVEON.vercel.app/signin" />
        <meta
          property="og:description"
          content="LIVE:ON 로그인 페이지입니다. 인증된 사용자만 공동구매에 참여할 수 있습니다."
        />
        <meta
          name="description"
          content="LIVE:ON 로그인 페이지입니다. 인증된 사용자만 공동구매에 참여할 수 있습니다."
        ></meta>
        <meta property="og:image" content="favicon.png" />
        <meta property="og:article:author" content="Ready! Act" />
      </Helmet>
      <h1 className="sr-only">LIVE:ON</h1>

      <div className="px-4 py-2">
        <Header />
        <h2 className="pageTitle">로그인</h2>

        <form onSubmit={handleSignIn}>
          <FormInput
            type="email"
            label="이메일"
            name="email"
            placeholder="이메일을 입력해 주세요."
            labelClassName="authLabel"
            inputClassName="authInput"
            defaultValue={formState.email}
            onChange={handleInput}
          />
          <FormInput
            type="password"
            label="패스워드"
            name="password"
            placeholder="비밀번호를 입력해 주세요."
            labelClassName="authLabel"
            inputClassName="authInput"
            defaultValue={formState.password}
            onChange={handleInput}
          />

          <Button type="submit" className="authActiveButton">
            로그인
          </Button>
          <Button type="reset" className="authinActiveButton">
            취소
          </Button>
        </form>

        <Link to="/signup">
          <span className="authTransform">회원가입</span>
        </Link>
      </div>
    </>
  );
}

export default SignIn;