"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar(){

    const {data: session} = useSession()    

    console.log(session)
    return(
        <nav className=" fixed top-0 right-0 py-4 px-12 lg:px-64">
              <div className="flex gap-7 items-center text-base font-collector">       
                      {session && session.user && (
                        <div className='flex items-center gap-2'>
                                                
                              <div className=" flex gap-6 items-center">
                                    <h1 className="text-white">Hi {session.user.name || ''}</h1>
                                  <Image src={session.user.image || ''} width={40} height={40} alt='image'  className=' rounded-[1000px] cursor-pointer text-[30px]'/>                                
                                  <button onClick={() => signOut()} className=" px-4 rounded-lg py-2 border border-white text-white">
                                    LOG OUT
                                  </button>
                                  
                            </div>
                        </div>
                        
                      )} 
                      { !session && (
                        <button onClick={() => signIn()} className="px-4 rounded-lg py-2 border text-white">
                          <p className='button_top '>LOG IN</p>
                        </button>
                      )}
                    </div>
        </nav>
    )
}