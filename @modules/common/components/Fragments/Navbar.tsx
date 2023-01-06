import Link from 'next/link';
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/solid';
import Logo from './Logo';
import Mobilenav from './Mobile-Nav';
import uniqid from 'uniqid';
import { useContext, useEffect, useState } from 'react';
import { CustomPropsWithChildren } from '@modules/common/types/types-interfaces';
import ProfileMenu from './profile-menu';
import { CurrentUserContext } from '@modules/common/hooks/current-user-context';
import getCurrentUserFunction from '@modules/common/hooks/get-current-user';

const Navbar: React.FC<CustomPropsWithChildren> = ({ currentUser }) => {

  const userCtx = useContext(CurrentUserContext)

  const addCurrentUserToContext = async () => {
    try {
      let user = await getCurrentUserFunction();
      console.log(user.currentUser)
      userCtx.updateUser(user.currentUser)

    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    addCurrentUserToContext();
  }, [])


  const [scale, setScale] = useState('scale-0');
  const [profileScale, setProfileScale] = useState<string>('scale-0');
  const authItems = [
    !currentUser && { label: 'Sign in', href: '/auth/signin' },
    currentUser && { label: 'Sign out', href: '/auth/signout' },
  ]
    .filter(Boolean)
    .map(({ label, href }: any) => {
      return (
        <Link key={uniqid()} className='nav-link' href={href}>
          {' '}
          <button
            onClick={(e) => mobileNavHandler(e, 'button')}
            className='navButton'
            key={href}
          >
            {label}
          </button>
        </Link>
      );
    });

  const navItems = [
    { label: 'Regular Outgoings', href: '/outgoings' },
    { label: 'Daily expenses', href: '/daily' },
    { label: 'Savings', href: '/savings' },
    { label: 'Stocks', href: '/stocks' },
    { label: 'News', href: '/news' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <Link key={uniqid()} className='nav-link' href={href}>
          {' '}
          <li
            className='navItem'
            key={href}
            onClick={(e) => mobileNavHandler(e, 'button')}
          >
            {label}
          </li>
        </Link>
      );
    });

  const profileItems = [
    currentUser && { label: 'My Profile', href: '/user/profile' },
  ]
    .filter(Boolean)
    .map(({ label, href }: any) => {
      return (
        <Link key={uniqid()} className='nav-link' href={href}>
          {' '}
          <li
            className='navItem'
            key={href}
            onClick={(e) => mobileNavHandler(e, 'button')}
          >
            {label}
          </li>
        </Link>
      );
    });

  const mobileProfileHandler = (event: any, source?: string) => {
    //this condition closes the navbar if the users clicks one of the buttons/links
    if (source === 'button' && profileScale === 'scale-100') {
      return setScale('scale-0');
    }
    profileScale === 'scale-0'
      ? setProfileScale('scale-100')
      : setProfileScale('scale-0');
  };

  const mobileNavHandler = (event: any, source?: string) => {
    //this condition closes the navbar if the users clicks one of the buttons/links
    if (source === 'button' && scale === 'scale-100') {
      return setScale('scale-0');
    }
    scale === 'scale-0' ? setScale('scale-100') : setScale('scale-0');
  };

  return (
    <div className='navbar'>
      <Logo />
      <ul className='hidden md:flex justify-around items-center  w-[calc(750px)] pr-12 '>{navItems}</ul>
      {/*<ul className='hidden md:flex  gap-2'>{authItems}</ul>*/}
      <UserCircleIcon
        className='h-12 w-10 hidden md:flex hover:cursor-pointer'
        onClick={mobileProfileHandler}
      />
      <ProfileMenu
        authItems={authItems}
        mobileProfileHandler={mobileProfileHandler}
        profileScale={profileScale}
        profileItems={profileItems}
      />
      <Bars3Icon
        className='h-8 w-6 md:hidden hover:cursor-pointer'
        onClick={mobileNavHandler}
      />
      <Mobilenav
        authItems={authItems}
        navItems={navItems}
        profileItems={profileItems}
        scale={scale}
        mobileNavHandler={mobileNavHandler}
      />
    </div>
  );
};

export default Navbar;
