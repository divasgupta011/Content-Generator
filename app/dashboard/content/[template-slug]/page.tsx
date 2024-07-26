'use client'

import React, { use, useContext, useState } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import Templates from '@/app/(data)/Templates'
import { TEMPLATE } from '../../_components/TemplateListSection'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { chatSession } from '@/utils/AiModel'
import { db } from '@/utils/db'
import { geminiOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext'



interface PROPS{
  params:{
    'template-slug':string
  }
}


function createNewContent(props:PROPS) {

  const selectedTemplate:TEMPLATE|undefined=Templates?.find((item)=>item.slug==props.params['template-slug'])

  const [loading, setLoading] = useState(false);
  const [AiOutput, setAiOutput] = useState<string>('');

  const {user} = useUser();
  const {updateCreditUsage, setUpdateCreditUsage} = useContext(UpdateCreditUsageContext);



  const GenerateAiContent = async (formData:any) => {
    
    setLoading(true);
    const selectedPrompt = selectedTemplate?.aiPrompt;
    const FinalAiPrompt= JSON.stringify(formData)+", "+ selectedPrompt;
    const result = await chatSession.sendMessage(FinalAiPrompt);
    setAiOutput(result.response.text());
    await saveInDb(JSON.stringify(formData),selectedTemplate?.slug,result.response.text());
    setLoading(false);
    setUpdateCreditUsage(Date.now());
  }


  const saveInDb = async (formData:any,slug:any,AiResponse:string) => {
    const email = user?.primaryEmailAddress?.emailAddress
    if (!email) {
      console.error('User email is undefined');
      return;
    }
    const result = await db.insert(geminiOutput).values({
      formData:formData,
      templateSlug:slug,
      aiResponse:AiResponse,
      createdBy:email,
      createdAt:moment().format('YYYY-MM-DD HH:mm:ss'),
    })
    console.log('Inserted data: ', result);
  };


  return (
    <div>
      <Link href={'/dashboard'} className='p-5'>
        <Button><ArrowLeft/>Back</Button>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>    
        {/* From section*/}
        <FormSection userFormInput={(v:any)=>GenerateAiContent(v)} selectedTemplate={selectedTemplate} loading={loading} />

        {/* Output Section */}
        <div className='col-span-2'>
        <OutputSection AiOutput={AiOutput} />

        </div>

      </div>
    </div>
  )
}

export default createNewContent