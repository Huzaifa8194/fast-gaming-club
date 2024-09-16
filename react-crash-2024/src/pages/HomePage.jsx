

import Hero from '../components/Hero'
import HomeCards from '../components/HomeCards'
import Listings from '../components/Listings'
import Viewall from '../components/Viewall'

const HomePage = () => {
  return (
    <>
        <Hero />
        <HomeCards></HomeCards>
        <Listings isHome = {true}/>
        <Viewall></Viewall>


    </>
  )
}

export default HomePage