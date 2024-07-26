import { UserButton } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div className='p-5 shadow-sm border-b-2 flex justify-between items-center'>
      <div className='flex gap-3 border p-2 items-center rounded-sm max-w-lg'>
        <Search/>
        <input type='text' placeholder='Search' className='outline-none'/>
      </div>
      <div className='flex gap-5 items-center'>
        <h2 className='bg-black text-white p-2 rounded-sm'>Generate Infinite Content</h2>
        <UserButton/>
      </div>
    </div>
  )
}

export default Header