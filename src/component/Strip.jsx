import React from 'react'

function Strip({handlePrev,handleNext,pageNo}) {
  return (
    <>
    <div className='bg-[grey] text-center mt-3 bg-opacity-40 flex justify-center'>
    <div className='px-8 hover:cursor-pointer hover:scale-110 duration-300'onClick={handlePrev} ><i className="fa-solid fa-arrow-left-long " ></i></div>
      <div className='font-bold'>{pageNo}</div>
    <div className='px-8 hover:cursor-pointer hover:scale-110 duration-300' onClick={handleNext}><i className="fa-solid fa-arrow-right"></i></div>
    </div>
    </>
    
  )
}

export default Strip