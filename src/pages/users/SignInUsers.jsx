//import {pb} from '@/api/pocketbase';
import Header from '@/layout/Header';
//import { getPbImageURL } from '@/utils/getPbImageURL';
import { ClientResponseError } from 'pocketbase';
import { useState } from 'react';
import {useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';




function User() {
  const[data, setData] = useState([])
  useEffect(() => {
    async function getUsers() {
    
      try {
        const readUserList = await pb.collection('users').getFullList();
       setData(readUserList)
      } catch (error) {
        if (!(error instanceof ClientResponseError)) {
          console.error(error);
        }
      }
    }
    getUsers();
  }, []);

  return (
    <>
      <Helmet>
        <title>R09M - 동네 가입자 목록</title>
      </Helmet>

      
     <div className="px-4 py-2">
        <Link to="/detail">
         <Header />
          </Link>
      </div>
      
      <div className='flex justify-center'>
        <h2 className='text-2xl font-semibold'>우리동네 유저목록</h2>
      </div>
     

      <ul className='w-full'>
        {data.map((item) => (
  
        <li key={item.id} className='flex mb-4 mt-4 items-center'>
          <img src={ getPbImageURL(item,'photo')} alt={item.name} className='object-cover rounded-full w-14 h-14 ml-4'/>
            <span className='pl-3 font-bold text-lg'>{item.name}</span>
        </li>
        
        ))
        }
      </ul>
    </>
  );
}

export default User;