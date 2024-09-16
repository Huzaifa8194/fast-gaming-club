import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const overrride =
{
    display: 'block',
    margin: '100px auto'
}




const Spinner = ({loading}) => {
  return (
    <ClipLoader
        color= '#4338ca'
        loading={loading}
        cssOverride={overrride}
        size={150}
      />
  )
}

export default Spinner