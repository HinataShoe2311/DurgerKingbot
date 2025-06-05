import React from 'react'

function ProceedToPay({ total }) {
  return (
    <div className='flex items-center justify-center l shadow-lg rounded-lg'>
      <button className="mt-4 align-center flex justify-center bg-green-500 text-white px-4 py-2 rounded">Proceed to Payment : ${total}</button>
    </div>
  )
}

export default ProceedToPay