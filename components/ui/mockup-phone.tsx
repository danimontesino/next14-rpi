import React from 'react'

export interface MockupPhoneProps {
  children?: React.ReactNode
}
export const MockupPhone = ({ children }: MockupPhoneProps) => {
  return (
    <div className="inline-block border-4 border-solid border-gray-500 p-[10px] mx-auto overflow-hidden rounded-[50px] z-20 bg-black">
      <div className="relative top-0 left-0 bg-black h-[25px] w-[150px] mx-auto rounded-bl-2xl rounded-br-2xl z-20 before:content-[''] before:absolute before:top-[33%] before:left-1/2 before:w-12 before:h-1 before:rounded-[5px] before:bg-gray-800 before:-translate-x-1/2 after:content-[''] after:absolute after:top-[28%] after:left-[70%] after:w-2 after:h-2 after:rounded-[5px] after:bg-gray-800"></div>
      <div className="overflow-hidden rounded-[40px] -mt-[25px]">
        <div className="w-[320px] h-[568px] flex flex-col items-center justify-center shadow bg-gray-800 text-gray-400 relative">
          {children}
        </div>
      </div>
    </div>
  )
}
