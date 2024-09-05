'use client'



import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext';
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db';
import { geminiOutput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useState } from 'react'

type HistoryItem = {
  id: number;
  formData: string;
  aiResponse: string | null;
  templateSlug: string;
  createdBy: string;
  createdAt: string | null;
}

function UsageTrack() {
  const { user } = useUser();
  const [totalUsage, setTotalUsage] = useState(0);
  const maxCredits = 10000;
  const {updateCreditUsage, setUpdateCreditUsage} = useContext(UpdateCreditUsageContext)


  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user,updateCreditUsage]);
  

  const getData = useCallback(async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      const result = await db.select().from(geminiOutput).where(eq(geminiOutput.createdBy, user.primaryEmailAddress.emailAddress));
      getTotalUsage(result as HistoryItem[]);
    }
  }, [user?.primaryEmailAddress?.emailAddress]);

  const getTotalUsage = useCallback((result: HistoryItem[]) => {
    let total = 0;
    result.forEach(element => {
      total += element.aiResponse?.length || 0;
    });
    setTotalUsage(total);
  }, []);

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user, updateCreditUsage, getData]);

  const usagePercentage = (totalUsage / maxCredits) * 100;

  return (
    <div className='m-1'>
      <div className='bg-[#ff0c81] text-white rounded-md p-3'>
        <h2 className='font-medium'>Credits</h2>
        <div className='bg-white h-2 rounded-full w-full mt-2'>
          <div 
            className='h-2 bg-[#ffd43d] rounded-full'
            style={{ width: `${usagePercentage}%` }}
          ></div>
        </div>
        <h2 className='pt-1'>{totalUsage}/{maxCredits} credit used</h2>
      </div>
    </div>
  )
}

export default UsageTrack