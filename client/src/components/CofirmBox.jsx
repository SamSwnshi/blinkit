import React from 'react'
import { IoClose } from "react-icons/io5";

const CofirmBox = ({cancel,confirm,close}) => {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 z-50 bg-neutral-900 bg-opacity-70 p-4 flex justify-center items-center'>
      <div className='bg-green-700 w-full max-w-md p-4 rounded'>
           <div className='flex justify-between items-center gap-3'>
                <h1 className='font-semibold text-white'>Permanent Delete</h1>
                <button onClick={close} className='hover:text-white'>
                    <IoClose size={25} />
                </button>
           </div>
           <p className='my-4 text-white'>Are you sure permanent delete ?</p>
           <div className='w-fit  flex items-center justify-between gap-3'>
                <button onClick={cancel} className='px-4 py-1 border rounded border-white hover:bg-red-500 hover:text-white text-white'>Cancel</button>
                <button onClick={confirm} className='px-4 py-1 border rounded border-white text-white hover:bg-green-600 hover:text-white'>Confirm</button>
           </div>
      </div>
    </div>
  )
}

export default CofirmBox
