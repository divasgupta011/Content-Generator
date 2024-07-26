import React from 'react'
import { TEMPLATE } from './TemplateListSection'
import Image from 'next/image'
import Link from 'next/link'

function TemplateCard(item:TEMPLATE) {
  return (
    <Link href={'/dashboard/content/'+item?.slug}>
    <div className='p-5 shadow-md border bg-white rounded-md gap-3 cursor-pointer flex flex-col hover:scale-110 transition-all'>
        <Image src={item.icon} alt='icon' height={50} width={50}/>
        <h2 className='font-medium text-lg'>{item.name}</h2>
        <p className='text-gray-600 line-clamp-3'>{item.desc}</p>
    </div>
    </Link>
  )
}

export default TemplateCard