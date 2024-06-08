import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import Button from '@/components/Button';
import Header from '@/layout/Header';
import FormInput from '@/components/FormInput';
import { Link } from 'react-router-dom';

function SignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const nicknameRef = useRef(null);
  const regionRef = useRef(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      toast.error('비밀번호가 일치하지 않습니다.\n다시 입력해 주세요.', {
        position: 'top-center',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: emailRef.current.value,
        nickname: nicknameRef.current.value,
        region: regionRef.current.value,
        createdAt: serverTimestamp(),
      });

      toast.success('회원가입이 성공적으로 완료되었습니다!');
      navigate('/');
    } catch (error) {
      toast.error('회원가입 중 오류가 발생했습니다: ' + error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>LIVE:ON - 회원가입</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="LIVE:ON 회원가입 페이지"
        />
        <meta
          property="twitter:title"
          content="LIVE:ON 회원가입 페이지"
        />
        <meta property="og:type" content="web application" />
        <meta property="og:url" content="https://LIVEON.vercel.app/signup" />
        <meta
          property="og:description"
          content="LIVE:ON 회원가입 페이지입니다. 인증된 사용자만 공동구매에 참여할 수 있습니다."
        />
        <meta
          name="description"
          content="LIVE:ON 회원가입 페이지입니다. 인증된 사용자만 공동구매에 참여할 수 있습니다."
        ></meta>
        <meta property="og:image" content="favicon.ico" />
        <meta property="og:article:author" content="Ready! Act" />
      </Helmet>
      <h1 className="sr-only">LIVE:ON</h1>

      <div className="px-4 py-2">
        <Header />
        <h2 className="pageTitle">회원가입</h2>
     

      <form encType="multipart/form-data" onSubmit={handleSignUp}>
        {/* <div className="relative flex flex-col gap-2 mt-4">
          <FormInput
            ref={photoRef}
            label="프로필 등록"
            type="file"
            name="photo"
            placeholder="비밀번호를 한 번 더 입력해 주세요."
            labelClassName="authLabel"
            inputClassName="cursor-pointer absolute w-full h-full opacity-0"
            onChange={handleDisplayUploadPhoto}
            accept="*.jpg,*.png,*.webp,*.avif,*.svg,*.gif"
          />

          <div className="w-[80px] h-[80px] bg-slate-200/80 p-2 rounded-full mb-4">
            <img
              ref={uploadPhotoRef}
              className="h-full border border-slate-400/50 rounded-full"
              src={placeholderProfile}
              alt="placeholder 이미지"
            />
          </div>
        </div> */}

        {/* <FormInput
          ref={nameRef}
          label="이름"
          type="text"
          name="name"
          placeholder="이름을 입력해 주세요."
          labelClassName="authLabel"
          inputClassName="authInput"
        /> */}

        <FormInput
          ref={emailRef}
          label="이메일"
          type="email"
          name="email"
          placeholder="이메일을 입력해 주세요."
          labelClassName="authLabel"
          inputClassName="authInput"
        />

        <FormInput
          ref={passwordRef}
          label="비밀번호"
          type="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요."
          labelClassName="authLabel"
          inputClassName="authInput"
        />

        <FormInput
          ref={passwordConfirmRef}
          label="비밀번호 확인"
          type="password"
          name="passwordConfirm"
          placeholder="비밀번호를 한 번 더 입력해 주세요."
          labelClassName="authLabel"
          inputClassName="authInput"
        />

        <FormInput
          ref={nicknameRef}
          label="닉네임"
          type="nickname"
          name="nickname"
          placeholder="사용할 닉네임을 입력해 주세요."
          labelClassName="authLabel"
          inputClassName="authInput"
        />

        <FormInput
          ref={regionRef}
          label="지역 (ㅇㅇ구)"
          type="region"
          name="region"
          placeholder="거주 지역을 입력해 주세요."
          labelClassName="authLabel"
          inputClassName="authInput"
        />

        <Button type="submit" className="authActiveButton">
          가입
        </Button>
        <Button
          type="reset"
          className="authinActiveButton"
          // onClick={() => {
          //   uploadPhotoRef.current.src = placeholderProfile;
          // }}
        >
          취소
        </Button>
      </form>
      <Link to="/signin">
        <span className="authTransform">로그인</span>
      </Link>
      </div>
    </>
  );
}

export default SignUp;