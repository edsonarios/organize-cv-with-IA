import { EditCvText } from './components/edit-cv-text/edit-cv-text'
import { GlobalError } from './components/errors/errors'
import 'react-toastify/dist/ReactToastify.css'

export default function Home () {
  return (
    <main className='min-h-screen px-16'>
      {/* <main className='flex-col min-h-screen px-16'> */}
      {/* <Grid numCols={1} numColsSm={2} numColsLg={3} className='gap-2'> */}
      {/* <Col numColSpan={1} numColSpanLg={2}> */}
      {/* <CardLeft /> */}
      <EditCvText />
      {/* </Col> */}
      {/* <CardRight /> */}
      {/* </Grid> */}
    </main>
  )
}
