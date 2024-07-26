// _components/HistoryContent.tsx
import React from 'react'

type HistoryItem = {
  id: number;
  formData: string;
  aiResponse: string | null;
  templateSlug: string;
  createdBy: string;
  createdAt: string | null;
}

type HistoryContentProps = {
  data: HistoryItem[];
}

function HistoryContent({ data }: HistoryContentProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Template Slug</th>
            <th className="py-3 px-6 text-left">AI Response</th>
            <th className="py-3 px-6 text-center">Response Length</th>
            <th className="py-3 px-6 text-center">Created At</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{item.templateSlug}</td>
              <td className="py-3 px-6 text-left">{item.aiResponse ? item.aiResponse.substring(0, 150) + '...' : 'No response'}</td>
              <td className="py-3 px-6 text-center">{item.aiResponse ? item.aiResponse.length : 0}</td>
              <td className="py-3 px-6 text-center">{item.createdAt || 'N/A'}</td>
              <td className="py-3 px-6 text-center">
                <button 
                  onClick={() => item.aiResponse && copyToClipboard(item.aiResponse)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  disabled={!item.aiResponse}
                >
                  Copy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HistoryContent