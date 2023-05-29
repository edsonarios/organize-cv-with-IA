'use client'
import { ResponseRequest } from '@/types/infojobs/response'
import { Card, Text, Title, Button, Grid, Col, Metric, Toggle, ToggleItem } from '@tremor/react'
import { useEffect, useRef, useState } from 'react'
import { ExperienceList } from './experience'
import { EducationList } from './education'
import { PersonalData } from './personalData'
import { ErrorList } from './error'
import { useStore } from '@/app/store/store'
import { Snackbar, Alert, AlertColor, SnackbarCloseReason } from '@mui/material'
import { ErrorSnackbar } from '../errors/errors'

export function EditCvText () {
  const [loadingGuardar, setLoadingGuardar] = useState(false)
  const [loadingIA, setLoadingIA] = useState(false)
  const [textAreavalue, setTextAreaValue] = useState('')
  const [iaData, setIaData] = useState<ResponseRequest | null>(null)
  const elementoRef = useRef<HTMLDivElement>(null)
  const [toggleValue, setToggleValue] = useState('No')
  const loadingText = useStore(state => state.loadingText)
  const setLoadingText = useStore(state => state.setLoadingText)
  const setError = useStore((state) => state.setError)
  const error = useStore((state) => state.error)

  const handleChange = (event) => {
    setTextAreaValue(event.target.value)
  }

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
    setIaData(null)
    console.log(toggleValue)
    if (toggleValue === 'Si') {
      setLoadingText('Limpiando CV...')
      try {
        const response = await fetch('/api/clean-resume/', {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        console.log(response)
        if (response.status === 500) {
          console.log('ser error')
          setError({
            error: true,
            description: response.statusText
          })
        }
        const json = await response.json()
        console.log(json)
      } catch (error) {
        console.log('Error: ', error)
      }
    }

    // setLoadingText('Analizando con IA...')
    setLoadingText('Organizando CV con IA...')
    const encodedCv = encodeURIComponent(cv)
    const response = await fetch(`/api/organize-resume-with-IA/?cv=${encodedCv}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log(response)
    const json = await response.json()
    console.log(json)

    setLoadingText('Guardando CV...')
    const saveCV = await fetch('/api/save-resume/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    })
    setLoadingText('Mostrando respuesta...')
    console.log(saveCV)
    const json2 = await saveCV.json()
    console.log(json2)

    setIaData(json2)
    setLoadingIA(false)
  }

  const prueba = () => {
    console.log('prueba')
    const dataFromIA: ResponseRequest =
    {
      personalData: {
        name: 'Maximilian',
        surname1: 'Schulz',
        surname2: '',
        nationalIdentityCardType: 'nif',
        nationalIdentityCard: '',
        birthDay: '1990-01-01T00:00:00.000Z',
        country: 'alemania',
        province: 'berlin',
        cityName: 'berlin',
        preferredContactPhone: 'foreign-phone',
        internationalPhone: '+49 176 849 0042',
        driverLicenses: ['seleccionar'],
        vehicleOwner: false,
        freelance: false,
        nationalities: ['alemania'],
        email: 'edsonrios9@gmail.com',
        segment: 'White-Specialist'
      },
      experience: [
        {
          id: '34230610308',
          company: 'BLUECHIP SOFTWARE',
          job: 'Software Engineer',
          description:
            'Creating and maintaining high-performance web applications using C#, .NET, Azure, and SQL Server. Implementing new features, maintaining existing code, and debugging issues.',
          startingDate: '2022-01-01T00:00:00.000Z',
          onCourse: true,
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
          expertise: [{ skill: '.NET' }, { skill: 'Azure' }, { skill: 'C#' }, { skill: 'SQL Server' }]
        }, {
          id: '34230610310',
          company: 'TECHNOLOGIC SOLUTIONS',
          job: 'Backend Developer',
          description:
            'In charge of backend development for several web and mobile applications, using C# and .NET. Creating RESTful APIs, managing SQL Server databases, and implementing security solutions.',
          startingDate: '2014-09-01T00:00:00.000Z',
          finishingDate: '2021-12-31T00:00:00.000Z',
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
          expertise: [
            { skill: '.NET' }, { skill: 'RESTful APIs' }, { skill: 'C#' }, { skill: 'Security Solutions' }, { skill: 'SQL Server' }

          ]
        }

      ],
      education: [
        {
          id: 48228282678,
          educationLevelCode: 'master',
          courseName: 'Technical University of Berlin',
          startingDate: '2015-09-01T00:00:00.000Z',
          finishingDate: '2017-07-31T00:00:00.000Z',
          stillEnrolled: false,
          institutionName: 'Technical University of Berlin',
          hideEducation: false
        }, {
          id: 48228282686,
          educationLevelCode: 'otros-titulos-certificaciones-y-carnes',
          courseName: 'Microsoft Certified: Azure Developer Associate',
          finishingDate: '2018-01-01T00:00:00.000Z',
          stillEnrolled: false,
          hideEducation: false
        }

      ],
      UIErrorResponse: [
        {
          type: 'Educacion',
          errorCode: '609',
          error_description:
            'The course name provided for the educationLevelCode: otros-cursos-y-formacion-no-reglada is invalid',
          body: {
            id: '',
            educationLevelCode: 'otros-cursos-y-formacion-no-reglada',
            courseCode: '',
            courseName: '',
            startingDate: '2010-09-01',
            finishingDate: '2014-07-31',
            stillEnrolled: false,
            institutionName: 'Technical University of Munich'
          }
        }
      ]
    }

    const dataFromIA2: ResponseRequest = {
      personalData: {
        name: 'Sergio',
        surname1: 'Valdez',
        surname2: 'Lozano',
        nationalIdentityCardType: 'nif',
        nationalIdentityCard: '',
        birthDay: '1990-01-01T00:00:00.000Z',
        country: 'bolivia',
        province: 'bolivia',
        cityName: 'Sucre',
        preferredContactPhone: 'foreign-phone',
        internationalPhone: '+59178784910',
        driverLicenses: ['seleccionar'],
        vehicleOwner: false,
        freelance: false,
        nationalities: ['bolivia'],
        email: 'edsonrios9@gmail.com',
        segment: 'White-Non-Specialist'
      },
      experience: [
        {
          id: '34230589217',
          company: 'FASTECH',
          job: 'Full Stack Developer',
          description:
              'En FASTECH, trabajo en la creación y mantenimiento de aplicaciones web y móviles, utilizando un stack de tecnologías modernas que incluye JavaScript, Node.js, React, Python y Django. También soy responsable de la integración y el mantenimiento de bases de datos en PostgreSQL y MongoDB.',
          startingDate: '2018-04-01T00:00:00.000Z',
          onCourse: true,
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
          expertise: [
            { skill: 'JavaScript' }, { skill: 'Node.js' }, { skill: 'Python' }, { skill: 'Django' }, { skill: 'React' }
          ]
        }, {
          id: '34230589218',
          company: 'REDGATE',
          job: 'Backend Developer',
          description:
              'En REDGATE, estuve a cargo del desarrollo del back-end de varias aplicaciones web, utilizando principalmente Node.js y Python. Fui responsable de la integración de las APIs, gestión de las bases de datos y seguridad de las aplicaciones.',
          startingDate: '2015-03-01T00:00:00.000Z',
          finishingDate: '2018-03-01T00:00:00.000Z',
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
          expertise: [{ skill: 'Node.js' }, { skill: 'Python' }]
        }

      ],
      education: [
        {
          id: 48213881306,
          educationLevelCode: 'ingeniero-superior',
          courseCode: 'i-sup-industrial',
          startingDate: '2010-01-01T00:00:00.000Z',
          finishingDate: '2015-01-01T00:00:00.000Z',
          stillEnrolled: false,
          institutionName: 'Universidad Mayor de San Simón (UMSS)',
          hideEducation: false
        }, {
          id: 48213881308,
          educationLevelCode: 'postgrado',
          courseName: 'M.Sc. in Software Engineering',
          startingDate: '2018-01-01T00:00:00.000Z',
          finishingDate: '2020-01-01T00:00:00.000Z',
          stillEnrolled: false,
          institutionName: 'Georgia Institute of Technology (Online Degree)',
          hideEducation: false
        }

      ],
      UIErrorResponse: [
        {
          type: 'Educacion',
          errorCode: '613',
          error_description:
              'The field: startingDate should NOT be informed for the educationLevelCode: otros-titulos-certificaciones-y-carnes',
          body: {
            id: '',
            educationLevelCode: 'otros-titulos-certificaciones-y-carnes',
            courseCode: '',
            courseName: 'Full Stack Web Development Certificate',
            startingDate: '2017-01-01',
            finishingDate: '2018-01-01',
            stillEnrolled: false,
            institutionName: 'Codecademy'
          }
        }
      ]
    }
    console.log(dataFromIA)
    setIaData(dataFromIA)
  }
  const prueba2 = async () => {
    setIaData(null)
    // await fetch('/api/clean-resume/', {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
  }

  return (
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
          <div className='flex justify-between'>

            <Button
              size='sm' variant='secondary' className='mt-8 flex-grow mr-2'
              disabled={loadingIA}
              loading={loadingIA}
              loadingText={loadingText}
              onClick={async (event) => {
                event.stopPropagation()
                await SaveCvWithIA(textAreavalue)
              }}
            >ORGANIZAR Y GUARDAR CV CON IA
            </Button>
            <div className='ml-4 flex flex-col items-center'>
              <Title>Reemplazar todo CV?</Title>
              <Toggle
                color='zinc'
                defaultValue='No'
                value={toggleValue}
                onValueChange={setToggleValue}
              >
                <ToggleItem value='No' text='No' />
                <ToggleItem value='Si' text='Si' />
              </Toggle>
            </div>
          </div>
        </Card>
      </div>

      <div className='max-w-full flex flex-col mt-5 pb-8' ref={elementoRef}>
        {iaData !== null && (
          <Card className='max-w-4xl mx-auto flex flex-col'>
            <div className='flex justify-between'>
              <Metric>CV Organizado</Metric>
              <a
                className='text-blue-500 underline text-lg'
                href='https://www.infojobs.net/candidate/cv/view/index.xhtml'
                target='_blank'
                rel='noopener noreferrer'
              >Ver CV organizado aqui...!!!
              </a>
            </div>
            <PersonalData personalData={iaData.personalData} />

            <ExperienceList experiences={iaData.experience} />

            <EducationList educations={iaData.education} />

            <ErrorList errors={iaData.UIErrorResponse} />

          </Card>
        )}
      </div>
      <ErrorSnackbar />
    </>
  )
}
