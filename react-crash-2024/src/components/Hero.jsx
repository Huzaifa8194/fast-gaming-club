import React from 'react'

const Hero = ({title, subtitle}) => {
  return (
    <section className="bg-stone-800 py-20 mb-0">
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
    >
      <div className="text-center">
        <h1
          className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
        >
          Fast Gaming Club
        </h1>
        <p className="my-4 text-xl text-white">
          Bla Bla bla bla bla bla bla bal
        </p>
      </div>
    </div>
  </section>
  )
}

export default Hero