'use client'
import { Card, Text, Title, Button, Grid, Col } from '@tremor/react'
import { useState } from 'react'
export function EditCvText () {
  const [loadingGuardar, setLoadingGuardar] = useState(false)
  const [loadingIA, setLoadingIA] = useState(false)
  const [textAreavalue, setTextAreaValue] = useState('')
  const handleChange = (event) => {
    setTextAreaValue(event.target.value)
  }

  const Guardar = async (cv: string) => {
    setLoadingGuardar(true)
    const encodedCv = encodeURIComponent(cv)
    let response
    try {
      response = await fetch(`/api/guardar-cv-text/?cv=${encodedCv}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(response)
      if (response.ok) {
        console.log('exito')
        //   window.location.href = 'https://www.infojobs.net/candidate/cv/view/index.xhtml'
      } else {
        throw new Error('Error')
      }
    } catch (error) {
      console.log('Error:', response.statusText)
    }
    setLoadingGuardar(false)
  }

  const SaveCvWithIA = async (cv: string) => {
    setLoadingIA(true)
    const encodedCv = encodeURIComponent(cv)
    const response = await fetch(`/api/organize-resume/?cv=${encodedCv}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // const json = await response.json()
    // console.log(value)
    // console.log(json)
    setLoadingIA(false)
  }

  return (
    <>
      <Card className='max-w-4xl mx-auto flex flex-col'>
        <Title className='mx-auto text-center'>Editar CV en texto</Title>
        <Text>CV en texto</Text>
        <textarea
          className='border-2 border-gray-200 rounded w-full h-32'
          value={textAreavalue}
          onChange={handleChange}
        />

        <Grid numCols={1} numColsSm={2} numColsLg={3} className='gap-3'>
          <Col numColSpan={1} numColSpanLg={2}>
            <Button
              size='xl' className='mt-8 mr-4'
              disabled={loadingGuardar}
              loading={loadingGuardar}
              loadingText='Guardando...'
              onClick={async (event) => {
                event.stopPropagation()
                await Guardar(textAreavalue)
              }}
            >GUARDAR
            </Button>
            <Button size='xl' variant='secondary'>CANCELAR</Button>
          </Col>
          <Button size='xl' variant='light' className='hover:bg-gray-100 mt-8'>ELIMINAR CV EN TEXTO</Button>
        </Grid>
        <Button
          size='sm' variant='secondary' className='mt-8'
          disabled={loadingIA}
          loading={loadingIA}
          loadingText='Analizando con IA'
          onClick={async (event) => {
            event.stopPropagation()
            await SaveCvWithIA(textAreavalue)
          }}
        >GUARDAR CV CON IA
        </Button>
      </Card>
    </>
  )
}
