import React from 'react'
import loading from '../spinner.gif'

const Loading = () => {
  return (
    <div className='text-center my-3'>
        <img src={loading} alt="" style={{paddingTop : '12rem'}}/>
    </div>
  )
}

export default Loading
