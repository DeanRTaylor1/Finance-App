import { Fragment, useEffect, useState } from 'react';
import { currentUserProps, userProfileData } from '@modules/common/types/types-interfaces';
import DoRequests from '@modules/common/hooks/do-request';
import { CircleLoader } from 'react-spinners';
import axios from 'axios';
import { toNormalCase } from '@modules/common/utils/utility-functions';
import Link from 'next/link';

//type userStateData = Omit<userProfileData, 'id' | 'createdAt'>
type userDataItem = {
  name: string;
  value: string;
  tag: string;
}

type userStateData = userDataItem[];


const ProfilePage: React.FC<any> = ({ currentUser }) => {
  //redirect if no current user and populate user data from api
  const [userData, setUserData] = useState<userStateData | null>(null)
  const getUserData = async (email: string) => {
    let response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/finances`, { email }, { withCredentials: true })
    let results = []
    let responseData = response.data
    for (let key in responseData as userProfileData) {
      console.log(key, responseData[key])
      let temp = {
        name: toNormalCase(key),
        value: responseData[key],
        tag: key
      }
      results.push(temp)
    }
    console.log(results)

    setUserData(results)

  }

  useEffect(() => {
    getUserData(currentUser.email)

  }, [])


  return (
    <div className=' max-w-[calc(900px)] w-[90vw] h-[calc(85vh)] flex mt-14 items-start justify-center z-10'>
      <div className='h-[95%] w-[95%] flex flex-col gap-4  bg-white  rounded-md px-8 py-4 text-xl font-bold'>
        <div className='py-4 h-20 flex justify-between underline underline-offset-4 font-extrabold'>{currentUser.username}</div>
        {userData && userData
          .filter(item => item.name !== 'Created At' && item.name !== 'Updated At' && item.name !== 'Username')
          .map((item, index) => {
            return (
              <div key={index} className='p-2 border-b border-dashed border-slate-200 flex flex-col gap-2'>
                {item.name}: <div className='font-extralight text-lg'>{item.value} </div>
              </div>)
          })}
        {userData && <Link href='/user/profile/update'> <button className='signInButton'>Update Details</button> </Link>}
      </div>
    </div>
  );
}

export default ProfilePage