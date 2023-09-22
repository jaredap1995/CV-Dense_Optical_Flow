import Image from 'next/image'
import dynamic from 'next/dynamic';
import styles from './index.module.scss'


const Exercises = dynamic(() => import('@/pages/exercise'), {
  ssr: false,
  loading: () => <p>Loading...</p>
})

const PlotlyGraph = dynamic(() => import('@/Components/PlotlyJSChart'), {
  ssr: false,
  loading: () => <p>Loading Plotly graph</p>
})


export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.dataContainer}>
      <Exercises />
      <PlotlyGraph />
      </div>
    </div>
  );
}