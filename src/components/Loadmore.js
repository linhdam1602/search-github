import React from 'react'

const Loadmore = ({children, onClick}) => (
  <div className='text-center my-5'>
    <button className="btn btn-info" onClick={onClick}>{children}</button>
  </div>
)

export default Loadmore