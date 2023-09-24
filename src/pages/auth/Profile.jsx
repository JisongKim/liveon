import {pb} from '@/api/pocketbase';
import Spinner from '@/components/Spinner';
import Header from '@/layout/Header';
import {getPbImageURL} from '@/utils/getPbImageURL';
import {numberWithComma} from '@/utils/numberWithComma';
import navStyles from '@/styles/Nav.module.css';
import Button from '@/components/Button';
import {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import toast from 'react-hot-toast';
import {Link, useNavigate} from 'react-router-dom';
import Withdrawal from './Withdrawal';
import Nav from '@/parts/nav/Nav';

function Profile() {
  const [userData, setUserData] = useState();
  const [productsData, setProductsData] = useState();

  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem('pocketbase_auth')).model.id;

  useEffect(() => {
    async function readUserInfo() {
      const userInfo = await pb.collection('users').getFullList();
      userInfo.filter((userList) => {
        if (userList.id === userId) {
          setUserData(userList);
        }
      });
    }

    async function readProductList() {
      const SalesProducts = await pb.collection('products').getFullList({
        expand: 'creator',
        filter: `creator.id="${userId}"`,
      });
      setProductsData(SalesProducts);
    }

    readUserInfo();
    readProductList();
  }, [userId]);

  if (userData && productsData) {
    const {email, name, created} = userData;

    return (
      <>
        <Helmet>
          <title>R09M - 프로필</title>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            property="og:title"
            content="합리적인 소비를 위한 공동구매 서비스 R09M 프로필 페이지"
          />
          <meta
            property="twitter:title"
            content="합리적인 소비를 위한 공동구매 서비스 R09M 프로필 페이지"
          />
          <meta property="og:type" content="web application" />
          <meta property="og:url" content="https://r09m.vercel.app/profile" />
          <meta
            property="og:description"
            content="로그인된 사용자의 정보 및 판매 상품을 확인할 수 있는 페이지입니다."
          />
          <meta
            name="description"
            content="로그인된 사용자의 정보 및 판매 상품을 확인할 수 있는 페이지입니다."
          ></meta>
          <meta property="og:image" content="favicon.png" />
          <meta property="og:article:author" content="Ready! Act" />
        </Helmet>
        <h1 className="sr-only">R09M</h1>

        <div className="px-4 py-2 h-screen">
          <Header />
          <h2 className="pageTitle">프로필</h2>

          <div className="flex gap-5 border-b border-b-line-400 pb-4 pt-4">
            <img
              src={getPbImageURL(userData, 'photo')}
              alt={`${name}의 프로필`}
              className="w-[100px] h-[100px] rounded-full p-2 bg-slate-200/80"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-lg text-primary-600">
                {name}
              </span>
              <span className="text-greenishgray-600 text-xs my-1">
                {email}
              </span>
              <span className="text-greenishgray-500 text-xs">{`${created.slice(
                0,
                11
              )} 가입`}</span>
              <div className="flex gap-2">
                <Button
                  type="button"
                  className="signOut"
                  onClick={() => {
                    localStorage.removeItem('pocketbase_auth');
                    toast.success('로그아웃되었습니다', {
                      position: 'top-center',
                      ariaProps: {
                        role: 'status',
                        'aria-live': 'polite',
                      },
                    });
                    navigate('/signin');
                  }}
                >
                  로그아웃
                </Button>
                <Withdrawal />
              </div>
            </div>
          </div>

          <h3 className="font-semibold mt-6 mb-3">판매 상품</h3>
          <ul>
            {productsData.map((products) => (
              <Link to={`/profile/${products.id}`} key={products.id}>
                <li>
                  <div className="bg-primary-200 p-4 rounded-2xl mb-4 relative">
                    <figure className="flex gap-4 h-[100px]">
                      <img
                        src={getPbImageURL(products, 'uploadImage')}
                        alt={products.title}
                        className="w-[100px] h-full rounded-2xl"
                      />
                      <figcaption>
                        <h4 className="text-sm text-greenishgray-700 font-semibold ">
                          {products.title}
                        </h4>

                        {products.status === '대기중' ? (
                          <span className="font-bold absolute text-primary-500 right-6 top-4">
                            {products.status}
                          </span>
                        ) : products.status === '진행중' ? (
                          <span className="font-bold absolute text-map-500 right-6 top-4">
                            {products.status}
                          </span>
                        ) : (
                          <span className="font-bold absolute text-greenishgray-500 right-6 top-4">
                            {products.status}
                          </span>
                        )}
                        <div className="text-xs flex flex-col">
                          <span className="mt-1 mb-5">
                            {numberWithComma(products.price)}원
                          </span>

                          <span className="max-w-xl text-ellipsis	line-clamp-2">
                            {products.content}
                          </span>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <Nav profileColor="#000" profileSpan={navStyles.navSpan} />
      </>
    );
  } else {
    <Spinner />;
  }
}

export default Profile;
