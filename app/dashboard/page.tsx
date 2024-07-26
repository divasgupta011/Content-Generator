'use client'

import React, { useState } from 'react'
import TemplateListSection from './_components/TemplateListSection'
import SearchSection from './_components/SearchSection'

function Dashboard() {

  const [userSearchInput, setuserSearchInput] = useState<string>()


  return (
    <div>
      <SearchSection onSearchInput={(value:string)=>setuserSearchInput(value)}/>
      <TemplateListSection  userSearchInput={userSearchInput}/>
    </div>
  )
}

export default Dashboard