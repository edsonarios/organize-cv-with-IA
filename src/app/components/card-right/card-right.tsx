import { Card, Text, Button, Title } from '@tremor/react'
import { PlusCircle } from '../icons/plus-circle'
// import { RefreshIcon } from '@heroicons/react/outline'

export default function CardRight () {
  return (
    <Card className='max-w-xs mx-auto space-y-6 divide-y divide-gray-200'>
      <div className='space-y-4'>
        <Title>Completa tu CV</Title>
        <Button size='xs' variant='secondary'>
          <div className='flex'>
            <PlusCircle />
            HABILIDADES
          </div>
        </Button>
        <Button size='xs' variant='secondary'>
          <div className='flex'>
            <PlusCircle />
            OTROS DATOS
          </div>
        </Button>
        <Button size='xs' variant='secondary'>
          <div className='flex'>
            <PlusCircle />
            SITUACION LABORAL
          </div>
        </Button>
      </div>
      <div className='space-y-4 pt-4'>
        <Title>19/05/2023</Title>
        <Text>Ultima Actualizacion de tu CV</Text>
        <Button size='xs' variant='secondary'>
          <div className='flex'>
            ACTUALIZAR FECHA
          </div>
        </Button>
      </div>
      <div className='space-y-4 pt-4'>
        <Title>Mis CVs</Title>
        <Text>Edson</Text>
        <Text>CV principal</Text>
      </div>
      <div className='space-y-4 pt-4'>
        <Title>CV adjunto</Title>
        <Button size='xs' variant='secondary'>
          <div className='flex'>
            Resume - Edson
          </div>
        </Button>
      </div>
      <div className='space-y-4 pt-4'>
        <Title>Cartas de presentacion</Title>
        <Button size='xs' variant='secondary'>
          <div className='flex'>
            <PlusCircle />
            CREAR NUEVA CARTA
          </div>
        </Button>
      </div>
      <div className='space-y-4 pt-4'>
        <Title>Test de competencias</Title>
        <Button size='xs' variant='secondary'>
          <div className='flex'>
            Informe test competencia
          </div>
        </Button>
        <Text>Caducidad: 16/05/2024</Text>
      </div>

    </Card>
  )
}
