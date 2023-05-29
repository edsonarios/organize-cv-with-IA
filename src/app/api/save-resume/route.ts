import { NextResponse } from 'next/server'
import { cleanResponse } from './cleanResponse'
import { makeRequests } from './makeRequests'

export async function POST (request: Request) {
  const data = await request.json()
  console.log(data)
  const json = await cleanResponse(data)
  console.log(json)

  const response = await makeRequests(json)
  console.log(response)

  return NextResponse.json(response)
}

const fakeData = {
  personalData: {
    name: 'Juan',
    surname1: 'Martínez',
    surname2: 'Morales',
    country: 'espana',
    province: 'madrid',
    cityName: 'Madrid',
    zipCode: '',
    preferredContactPhone: 'foreign-phone',
    internationalPhone: '+34 625 849 002',
    driverLicenses: ['seleccionar'],
    nationalities: ['espana'],
    birthDay: '1990-01-01'
  },
  experience: [
    {
      id: '',
      company: 'BYTEWISE',
      job: 'Desarrollador Full Stack',
      description:
        'Creación y mantenimiento de aplicaciones web de alto rendimiento, usando Java, Spring Boot, Angular y MySQL. Implementación de nuevas funcionalidades, mantenimiento del código existente y resolución de errores.',
      startingDate: '2021-06-01',
      finishingDate: '',
      onCourse: true,
      category: 'informatica-telecomunicaciones',
      subcategories: ['programacion'],
      level: 'empleado-a',
      visible: true,
      expertise: [{ skill: 'Java' }, { skill: 'Spring Boot' }, { skill: 'Angular' }, { skill: 'MySQL' }]
    }, {
      id: '',
      company: 'TECHINNOVATIONS',
      job: 'Desarrollador Back End',
      description:
        'Desarrollo del back-end de varias aplicaciones web y móviles, utilizando Java y Spring Boot. Creación de APIs RESTful, gestión de bases de datos MySQL e implementación de soluciones de seguridad.',
      startingDate: '2015-01-01',
      finishingDate: '2021-05-01',
      onCourse: false,
      category: 'informatica-telecomunicaciones',
      subcategories: ['programacion'],
      level: 'empleado-a',
      visible: true,
      expertise: [{ skill: 'Java' }, { skill: 'Spring Boot' }, { skill: 'MySQL' }]
    }

  ],
  education: [
    {
      id: '',
      educationLevelCode: 'ingeniero-superior',
      courseCode: 'i-sup-industrial',
      courseName: '',
      startingDate: '2010-09-01',
      finishingDate: '2014-06-01',
      stillEnrolled: false,
      institutionName: 'Universidad Politécnica de Madrid'
    }, {
      id: '',
      educationLevelCode: 'master',
      courseCode: '',
      courseName: 'Ingeniería del Software, Sistemas Informáticos y Computación',
      startingDate: '2015-09-01',
      finishingDate: '2017-06-01',
      stillEnrolled: false,
      institutionName: 'Universidad Politécnica de Madrid'
    },
    {
      id: '',
      educationLevelCode: 'otros-titulos-certificaciones-y-carnes',
      courseCode: '',
      courseName: 'Desarrollo Full Stack',
      startingDate: '2018-01-01',
      finishingDate: '2019-12-31',
      stillEnrolled: false,
      institutionName: 'Codecademy'
    }

  ]
}

const fakeData2 = {
  personalData: {
    name: 'Sergio',
    surname1: 'Valdez',
    surname2: 'Lozano',
    country: 'bolivia',
    province: 'bolivia',
    cityName: 'Sucre',
    zipCode: '',
    preferredContactPhone: 'foreign-phone',
    internationalPhone: '+59178784910',
    driverLicenses: ['seleccionar'],
    nationalities: ['bolivia'],
    birthDay: '1990-01-01'
  },
  experience: [
    {
      id: '',
      company: 'FASTECH',
      job: 'Full Stack Developer',
      description:
        'En FASTECH, trabajo en la creación y mantenimiento de aplicaciones web y móviles, utilizando un stack de tecnologías modernas que incluye JavaScript, Node.js, React, Python y Django. También soy responsable de la integración y el mantenimiento de bases de datos en PostgreSQL y MongoDB.',
      startingDate: '2018-04-01',
      finishingDate: '',
      onCourse: true,
      category: 'informatica-telecomunicaciones',
      subcategories: ['programacion'],
      level: 'empleado-a',
      visible: true,
      expertise: [
        { skill: 'JavaScript' }, { skill: 'Node.js' }, { skill: 'React' }, { skill: 'Python' }, { skill: 'Django' }
      ]
    }, {
      id: '',
      company: 'REDGATE',
      job: 'Backend Developer',
      description:
        'En REDGATE, estuve a cargo del desarrollo del back-end de varias aplicaciones web, utilizando principalmente Node.js y Python. Fui responsable de la integración de las APIs, gestión de las bases de datos y seguridad de las aplicaciones.',
      startingDate: '2015-03-01',
      finishingDate: '2018-03-01',
      onCourse: false,
      category: 'informatica-telecomunicaciones',
      subcategories: ['programacion'],
      level: 'empleado-a',
      visible: true,
      expertise: [{ skill: 'Node.js' }, { skill: 'Python' }]
    }

  ],
  education: [
    {
      id: '',
      educationLevelCode: 'ingeniero-superior',
      courseCode: 'i-sup-industrial',
      courseName: '',
      startingDate: '2010-01-01',
      finishingDate: '2015-01-01',
      stillEnrolled: false,
      institutionName: 'Universidad Mayor de San Simón (UMSS)'
    }, {
      id: '',
      educationLevelCode: 'postgrado',
      courseCode: '',
      courseName: 'M.Sc. in Software Engineering',
      startingDate: '2018-01-01',
      finishingDate: '2020-01-01',
      stillEnrolled: false,
      institutionName: 'Georgia Institute of Technology (Online Degree)'
    },
    {
      id: '',
      educationLevelCode: 'otros-titulos-certificaciones-y-carnes',
      courseCode: '',
      courseName: 'Full Stack Web Development Certificate',
      startingDate: '2017-01-01',
      finishingDate: '2018-01-01',
      stillEnrolled: false,
      institutionName: 'Codecademy'
    }

  ]
}
