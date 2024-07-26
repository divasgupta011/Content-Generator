import { Search } from 'lucide-react'
import React from 'react'

function SearchSection({onSearchInput}:any) {

  return (
    <div className='p-10 bg-gradient-to-br from-gray-800 via-gray-600 to-white flex flex-col items-center justify-center'>
        <h2 className='text-white text-4xl font-bold'>Browse all templates</h2>
        <p className='text-white'>What would you like to create today  !!</p>
        <div className='flex gap-2 items-center p-2 '>
            <Search className='text-white'/>
            <input type="text" placeholder='search' className='' onChange={(e)=>onSearchInput(e.target.value)}/>
        </div>
    </div>
  )
}

export default SearchSection