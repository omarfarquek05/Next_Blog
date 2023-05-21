"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
   
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>

    <Link href='/' className='flex gap-2 flex-center'>
    <Image
      src='/assets/images/j.png'
      alt='logo'
      width={95}
      height={95}
      className='object-contain'
    />
    <p className='logo_text'>Promptopia</p>  
  </Link>

  {/*Dekstop Navigation */}

    <div className="sm:flex hidden">
      
    {
      session?.user ? (
        <div className="flex gap-3 md:gap-5">
          <Link href="/create-prompt"  className="black_btn"> Create Post </Link>
             <button onClick={signOut} className="outline_btn">Sign out</button>
              <Image src= {session?.user.image}  alt="profile"
                 width={37}
                  height={37}
                   className="rounded-full"
                />

        </div>
      ) : (
        <>
        {
          providers && Object.values(providers).map((provider) => (
               <button type="button" key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn">
                 signIn
               </button>
          )
          )}
        
        </>
      )
    }
    

    </div>

  {/*mobile Navigation */}
    
  <div className="sm:hidden flex relative">

     { 
      session?.user ? (
        <div className="flex">
        <Image src= {session?.user.image}  alt="profile"
        width={37}
         height={37}
          className="rounded-full"
          onClick={() => setToggleDropdown(!toggleDropdown)}
       />
       {toggleDropdown && (
        <div className='dropdown'>
          <Link href='/profile'
            className='dropdown_link'
            onClick={() => setToggleDropdown(false)} >
            My Profile
          </Link>
          <Link href='/create-prompt'
            className='dropdown_link'
            onClick={() => setToggleDropdown(false)} >
            Create Prompt
          </Link>
          <button type='button'
            onClick={() => {
              setToggleDropdown(false);
              signOut();
            }}
            className='mt-5 w-full black_btn' >
            Sign Out
          </button>
        </div>
      )}
      
        </div>
      ) : (
        <>
        {
          providers && Object.values(providers).map((provider) => (
               <button type="button" key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn">
                 signIn
               </button>
          )
          )}
        
        </>
      )
     }
  </div>

    </nav>
  )
}

export default Nav