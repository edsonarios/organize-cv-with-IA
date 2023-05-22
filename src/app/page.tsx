import { Grid, Col, Metric, Card, Text, Title, Button } from '@tremor/react'
import { PlusCircle } from './components/icons/plus-circle'
import CardRight from './components/card-right/card-right'
import CardLeft from './components/card-right/card-left'
import { EditCvText } from './components/edit-cv-text/edit-cv-text'

export default function Home () {
  return (
    <main className='min-h-screen px-16'>
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
