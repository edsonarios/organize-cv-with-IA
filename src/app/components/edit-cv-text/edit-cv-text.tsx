'use client'
import { ResponseRequest } from '@/types/infojobs/response'
import { Card, Text, Title, Button, Grid, Col } from '@tremor/react'
import { useEffect, useRef, useState } from 'react'
import { ExperienceList } from './experience'
import { EducationList } from './education'
import { PersonalData } from './personalData'
import { ErrorList } from './error'

export function EditCvText () {
  const [loadingGuardar, setLoadingGuardar] = useState(false)
  const [loadingIA, setLoadingIA] = useState(false)
  const [textAreavalue, setTextAreaValue] = useState('')
  const handleChange = (event) => {
    setTextAreaValue(event.target.value)
  }
  const [iaData, setIaData] = useState<ResponseRequest | null>(null)
  const elementoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (iaData !== null) {
      elementoRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    console.log('effect')
  }, [iaData])

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
      console.log('Error:', response?.statusText)
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
    console.log(response)
    const json = await response.json() as ResponseRequest
    console.log(json)
    setLoadingIA(false)
  }

  const prueba = () => {
    console.log('prueba')
    const dataFromIA: ResponseRequest =
      {
        personalData: {
          name: 'Juan',
          surname1: 'Martínez',
          surname2: 'Morales',
          nationalIdentityCardType: 'nif',
          nationalIdentityCard: '',
          birthDay: '1990-01-01T00:00:00.000Z',
          country: 'espana',
          province: 'madrid',
          cityCode: 'madrid',
          zipCode: '10000',
          preferredContactPhone: 'foreign-phone',
          internationalPhone: '+34 625 849 002',
          driverLicenses: ['seleccionar'],
          vehicleOwner: false,
          freelance: false,
          nationalities: ['espana'],
          email: 'edsonrios9@gmail.com',
          segment: 'White-Non-Specialist'
        },
        experience: [
          {
            id: '34230566438',
            company: 'BYTEWISE',
            job: 'Desarrollador Full Stack',
            description:
              'Creación y mantenimiento de aplicaciones web de alto rendimiento, usando Java, Spring Boot, Angular y MySQL. Implementación de nuevas funcionalidades, mantenimiento del código existente y resolución de errores.',
            startingDate: '2021-06-01T00:00:00.000Z',
            onCourse: true,
            category: 'informatica-telecomunicaciones',
            subcategories: ['programacion'],
            industry: 'seleccionar',
            level: 'seleccionar',
            staff: '0',
            salaryMin: 'seleccionar',
            salaryMax: 'seleccionar',
            hideSalary: false,
            visible: true,
            reportingTo: 'seleccionar',
            expertise: [{ skill: 'Java' }, { skill: 'MySQL' }, { skill: 'Spring Boot' }, { skill: 'Angular' }]
          }, {
            id: '34230566439',
            company: 'TECHINNOVATIONS',
            job: 'Desarrollador Back End',
            description:
              'Desarrollo del back-end de varias aplicaciones web y móviles, utilizando Java y Spring Boot. Creación de APIs RESTful, gestión de bases de datos MySQL e implementación de soluciones de seguridad.',
            startingDate: '2015-01-01T00:00:00.000Z',
            finishingDate: '2021-05-01T00:00:00.000Z',
            onCourse: false,
            category: 'informatica-telecomunicaciones',
            subcategories: ['programacion'],
            industry: 'seleccionar',
            level: 'empleado-a',
            staff: '0',
            salaryMin: 'seleccionar',
            salaryMax: 'seleccionar',
            hideSalary: false,
            visible: true,
            reportingTo: 'seleccionar',
            expertise: [{ skill: 'Java' }, { skill: 'MySQL' }, { skill: 'Spring Boot' }]
          }

        ],
        education: [
          {
            id: 48205171786,
            educationLevelCode: 'ingeniero-superior',
            courseCode: 'i-sup-industrial',
            startingDate: '2010-09-01T00:00:00.000Z',
            finishingDate: '2014-06-01T00:00:00.000Z',
            stillEnrolled: false,
            institutionName: 'Universidad Politécnica de Madrid',
            hideEducation: false
          }, {
            id: 48205171788,
            educationLevelCode: 'master',
            courseName: 'Ingeniería del Software, Sistemas Informáticos y Computación',
            startingDate: '2015-09-01T00:00:00.000Z',
            finishingDate: '2017-06-01T00:00:00.000Z',
            stillEnrolled: false,
            institutionName: 'Universidad Politécnica de Madrid',
            hideEducation: false
          },
          {
            id: 48205171876,
            educationLevelCode: 'otros-titulos-certificaciones-y-carnes',
            courseName: 'Desarrollo Full Stack',
            finishingDate: '2018-01-01T00:00:00.000Z',
            stillEnrolled: false,
            institutionName: 'Codecademy',
            hideEducation: false
          }

        ],
        UIErrorResponse: [
          {
            error: '602',
            error_description: 'The value of educationLevelCode provided: otros-titulos-certificaciones-y-carnes123 is not valid.',
            timestamp: '2023-05-26T17:45:38.379Z'
          }, {
            error: '500',
            error_description: 'The value of educationLevelCode provided: otros-titulos-certificaciones-y-carnes123 is not valid.',
            timestamp: '2023-05-26T17:45:38.379Z'
          }]
      }

    console.log(dataFromIA)
    setIaData(dataFromIA)
  }
  const prueba2 = () => {
    setIaData(null)
  }

  return (
  // <div className='flex'>
    <>

      <div className='max-w-full flex flex-col'>
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
              <Button size='xl' variant='secondary' onClick={prueba}>CANCELAR</Button>
            </Col>
            <Button onClick={prueba2} size='xl' variant='light' className='hover:bg-gray-100 mt-8'>ELIMINAR CV EN TEXTO</Button>
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
      </div>

      <div className='max-w-full flex flex-col mt-5 pb-8' ref={elementoRef}>
        {iaData !== null && (
          <Card className='max-w-4xl mx-auto flex flex-col'>
            <PersonalData personalData={iaData.personalData} />

            <ExperienceList experiences={iaData.experience} />

            <EducationList educations={iaData.education} />

            <ErrorList errors={iaData.UIErrorResponse} />

          </Card>
        )}
      </div>

    </>
  )
}
