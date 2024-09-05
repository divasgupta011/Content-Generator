'use client'
import { History, Home, icons, Settings, Settings2Icon, Wallet2, WalletIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import UsageTrack from './UsageTrack'
import Link from 'next/link'
import Image from 'next/image'

function SideNav() {

    const menuList=[
        {
            name:'Home',
            icon: Home,
            path:'/dashboard'
        },
        {
            name:'History',
            icon: History,
            path:'/dashboard/history'
        },
        {
            name:'Billing',
            icon: Wallet2,
            path:'/dashboard/billing'
        },
        {
            name:'Setting',
            icon: Settings,
            path:'/dashboard/setting'
        },
    ]

    const path=usePathname();
    useEffect(()=>{
        console.log(path);
    })


  return (
    <div className='h-screen p-5 border shadow-lg'>
        <div className='flex justify-center '>
        <Image src='./logoipsum-332.svg' alt='logo' width={100} height={100}/>
        </div>
        <div className='mt-10'>
            {menuList.map((menu)=>(
                <Link href={menu.path} className={`flex p-3 mb-2 gap-2 hover:bg-black hover:text-white cursor-pointer items-center ${path==menu.path && 'bg-black text-white'}`}>
                    <menu.icon className='h-7 w-7'/>
                    <h2 className='text-xl'>{menu.name}</h2>
                </Link>
            ))}
        </div>
        <div>
            <UsageTrack/>
        </div>
    </div>
  )
}

export default SideNav