'use client'
import { Card, Text, Title, Button, Grid, Col } from '@tremor/react'
import { useState } from 'react'
export function EditCvText () {
  const [value, setValue] = useState('')
  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const Guardar = async (cv: string) => {
    const encodedCv = encodeURIComponent(cv)
    const response = await fetch(`/api/guardar-cv-text/?cv=${encodedCv}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      console.log('exito')
      window.location.href = 'https://www.infojobs.net/candidate/cv/view/index.xhtml'
    }
  }

  const SaveCvWithIA = async () => {
    console.log(value)
  }
  return (
    <>
      <Card className='max-w-4xl mx-auto flex flex-col'>
        <Title className='mx-auto text-center'>Editar CV en texto</Title>
        <Text>CV en texto</Text>
        <textarea
          className='border-2 border-gray-200 rounded w-full h-32'
          value={value}
          onChange={handleChange}
        />

        <Grid numCols={1} numColsSm={2} numColsLg={3} className='gap-3'>
          <Col numColSpan={1} numColSpanLg={2}>
            <Button
              size='xl' className='mt-8 mr-4'
              onClick={async (event) => {
                event.stopPropagation()
                await Guardar(value)
              }}
            >GUARDAR
            </Button>
            <Button size='xl' variant='secondary'>CANCELAR</Button>
          </Col>
          <Button size='xl' variant='light' className='hover:bg-gray-100 mt-8'>ELIMINAR CV EN TEXTO</Button>
        </Grid>
        <Button
          size='sm' variant='secondary' className='mt-8'
          onClick={async (event) => {
            event.stopPropagation()
            await SaveCvWithIA()
          }}
        >GUARDAR CV CON IA
        </Button>
      </Card>
    </>
  )
}
