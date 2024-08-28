import Line from '@/components/line'
import LinkPreview from '@/components/link-preview'

const Home = () => {
  return (
    <section className='flex min-h-screen flex-col justify-center'>
      <Line />
      <div className='container mb-32'>
        <div className='flex flex-col gap-6 font-medium lg:ml-auto lg:w-3/4 lg:flex-row'>
          <p className='lg:mt-3 lg:text-nowrap'>Smart Development</p>
          <div className='text-2xl lg:text-3xl'>
            <span>
              Our website is launching soon, built with cutting-edge technology
              including
            </span>
            <LinkPreview url='https://www.tailwindcss.com'>
              Tailwind CSS
            </LinkPreview>
            <span>for beautiful design,</span>
            <LinkPreview url='https://www.framer.com/motion'>
              Framer Motion
            </LinkPreview>
            <span>for smooth animations, and powered by the</span>
            <LinkPreview url='https://nextjs.org'>Next.js</LinkPreview>
            <span>
              framework for top-notch performance. In the meantime, relax with a
              llama while we finalize the details. We can&apos;t wait to show
              you what we&apos;ve been creating. Stay tuned! Meanwhile, you can
              check out the project on
            </span>
            <LinkPreview url='https://github.com/fiquell/luminoustrailartistry'>
              GitHub
            </LinkPreview>
            <span>for a sneak peek behind the scenes.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
