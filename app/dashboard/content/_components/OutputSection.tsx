import React, { useEffect, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface props{
  AiOutput:string;
}

function OutputSection({AiOutput}:props) {
const editorRef = useRef<any>(null);


useEffect(()=>{
  const editorInstance = editorRef.current.getInstance();
  editorInstance.setMarkdown(AiOutput);
},[AiOutput]);
  
  return (
    <div className='bg-white shadow-lg border rounded-lg'>
      <div className='flex justify-between items-center p-5'>
        <h2 className='text-xl'>Your Result</h2>
        <Button><Copy/>Copy</Button>
      </div>
      <Editor
      ref={editorRef}
    initialValue="Your result will appear here"
    height="600px"
    initialEditType="wysiwyg"
    useCommandShortcut={true}
    onChange={()=>console.log(editorRef.current.getInstance().getMarkdown())}
  />
    </div>
  )
}

export default OutputSection