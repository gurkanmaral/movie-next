import Hero from '@/components/Hero'
import New from '@/components/New'
import PopularMovies from '@/components/PopularMovies'
import PopularSeries from '@/components/PopularSeries'
import SecondHero from '@/components/SecondHero'
import Image from 'next/image'


export default function Home() {



  return (
   <div className='w-full md:max-w-[1440px]  mx-auto'>
        <section>
          <Hero />
        </section>
        <section>
          <SecondHero />
        </section>
        <section>
         <PopularMovies />
        </section>
        <section>
          <PopularSeries />
        </section>  
        <section>
          <New />
        </section>
   </div>
  )
}
