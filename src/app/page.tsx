import Line from '@/components/line'

const Home = () => {
  return (
    <section className='flex min-h-screen flex-col justify-center'>
      <Line />
      <div className='container'>
        <div className='ml-auto flex w-3/4 gap-6 font-medium'>
          <p className='mt-3 text-nowrap'>Smart Development</p>
          <p className='text-3xl leading-normal'>
            Our website is launching soon, built with cutting-edge technology
            including Tailwind CSS for beautiful design, Framer Motion for
            smooth animations, and powered by the Next.js framework for
            top-notch performance. In the meantime, relax with a llama while we
            finalize the details. We can&apos;t wait to show you what we&apos;ve
            been creating. Stay tuned! Meanwhile, you can check out the project
            on GitHub for a sneak peek behind the scenes.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Home
