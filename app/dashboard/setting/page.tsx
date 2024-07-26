import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function Setting() {
  return (
    <div className='items-center flex justify-center'>
      <UserProfile routing="hash" />
    </div>
  )
}

export default Setting