import Image from 'next/image'
import dynamic from 'next/dynamic';


const Exercises = dynamic(() => import('@/pages/exercise'), {
  ssr: false,
  loading: () => <p>Loading...</p>
})


export default function Home() {
  return (
    <div>
      <h1>My Next.js Page</h1>
      <Exercises />
    </div>
  );
}