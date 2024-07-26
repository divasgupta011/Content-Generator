'use client'

import { db } from '@/utils/db'
import { geminiOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import HistoryContent from './_components/HistoryContent'

// Define the type for your history item
export type HistoryItem = {
  id: number;
  formData: string;
  aiResponse: string | null;
  templateSlug: string;
  createdBy: string;
  createdAt: string | null;
}

function Page() {
  const { user } = useUser();
  // Properly type the state
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);

  const fetchHistoryData = async () => {
    const email = user?.primaryEmailAddress?.emailAddress
    if (email) {
      try {
        const result = await db.select().from(geminiOutput).where(eq(geminiOutput.createdBy, email));
        // Explicitly type the result if needed
        setHistoryData(result as HistoryItem[]);
      } catch (error) {
        console.error('Error fetching history data:', error);
      }
    }
  }

  useEffect(() => {
    fetchHistoryData();
  }, [user])

  return (
    <div className='bg-white m-3 border shadow-lg rounded-md p-5'>
      <div className=''>
        <h1 className=''>History</h1>
        <p>Previously generated content</p>
      </div>
      <HistoryContent data={historyData} />
    </div>
  )
}

export default Page