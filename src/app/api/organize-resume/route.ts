import { NextResponse } from 'next/server'
import {
  Configuration,
  ChatCompletionRequestMessageRoleEnum,
  OpenAIApi
} from 'openai'

const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''
const openaiToken = process.env.OPENAI_TOKEN ?? ''

const configuration = new Configuration({ apiKey: openaiToken })
const openai = new OpenAIApi(configuration)

const INITIAL_MESSAGES = [
  {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content: `Te mandare un CV completo y tienes que armar y devolver un objeto JSON, se dividira en 2 secciones y cada seccione tiene sus propias reglas, al final combinar las 2 secciones en un solo objeto JSON, sino hubiera suficientes datos para llenar alguna seccion, devolver esa seccion vacio

    {
        "personalData": {
            ...
        },
        "experience":{
            ...
        }
    }
    
    SECCION personalData
    Armar y llenar con los datos segun corresponda, algunos campos tendran restricciones, pero solo modificar: name, surname1, surname2, country, province, cityName, internationalPhone, nationalities, birthDay
    
    - En el campo de "country" solo escoger entre las siguientes opciones, sino aplicara ninguno colocar "otro": bolivia,costa-rica,cuba,ecuador,el-salvador,guatemala,haiti,honduras,nicaragua,panama,paraguay,peru,puerto-rico,republica-dominicana,uruguay
    
    - En el campo de "province" colocar el mismo valor que "country", pero si el valor es "otro" en country colocar "otro-pais"
    
    - En el campo de "nationalities", puede tener un array de las mismas opciones de country, si no aplica ninguno, colocar "otro"
    
    - En el campo de "birthDay" debe tener el formato "AAAA-MM-DD", sino se puede obtener, colocar por defecto "1990-01-01"
    {
        "name": "",
        "surname1": "",
        "surname2": "",
        "country": "",
        "province": "",
        "cityName": "",
        "preferredContactPhone": "foreign-phone",
        "internationalPhone": "",
        "driverLicenses": [
            "seleccionar"
        ],
        "nationalities": [
        "bolivia"
        ],
        "birthDay": ""
    }
    
    
    SECCION experience
    Armar y llenar con los datos segun corresponda, pero solo modificaras los campos de: company, job, description, startingDate, finishingDate, level, expertise, industry, category y subcategories
    
    - Si tiene mas de 1 experiencia, repartir en multiples elementos del array y dejar el id vacio
    
    - En los campos de "startingDate" y "finishingDate" debe tener este formato: "AAAA-MM-DD"
    Si fuera su trabajo actual "finishingDate" debe estar vacio
    
    - En el campo de "level", debe estar una de las siguientes opciones, sino aplicara ninguno solo poner "seleccionar": becario-a-practicas,empleado-a
    
    - En el campo de "expertise" debes colocar los keywords relacionados con en CV, cada keyword es un json con el atributo skill, maximo 15 elementos, puede ser cualquier keyword, ejemplo: NodeJS, Python, Java, etc.
    
    - En el campo de "industry" se debe alguno de las siguientes opciones, en caso de que no aplique ninguno tendra el valor de "seleccionar": arquitectura-y-planificacion,audiovisual,biotecnologia,desarrollo-de-programacion,diseno-grafico,entretenimiento,equipos-informaticos,ingenieria,internet,portales-web-proceso-de-datos-hosting-y-act.-relac.,servicios-y-tecnologia-de-la-informacion,telecomunicaciones
    
    - En el campo de "category", puede ir solo uno de las siguientes opciones: informatica-telecomunicaciones,ingenieros-tecnicos,marketing-comunicacion,otros
    
    - En el campo de "subcategories", es dependiendo de "category" pero es un array de las siguientes opciones, al menos debe estar 1 opcion y sino estuviera ninguno añadir "-":
    
    subcategories opciones:
        informatica-telecomunicaciones:[administracion-bases-datos,analisis,arquitectura,calidad,erp-crm-business-intelligence,it-gestion-proyectos,hardware-redes-seguridad,helpdesk,programacion,sistemas,telecomunicaciones,-]
    
        ingenieros-tecnicos:[aeronautico,agronomo-montes,electronica,electronica-automatica-industrial,energias-renovables,geologia-geodesia-cartografia,industrial,minas,naval-oceanico,organizacion-industrial,otras-ingenierias,quimico,sistemas-defensa,-]
    
        marketing-comunicacion:[comunicacion-corporativa,desarrollo-marca-producto,investigacion-mercados,marketing,periodismo-edicion,produccion,publicidad,rrpp-eventos,tecnicas-audiovisuales,-]
    
        otros:[-]
    
    [
        {
            "id": "",
            "company": "",
            "job": "",
            "description": "",
            "startingDate": "",
            "finishingDate": "",
            "onCourse": false,
            "category":"",
            "subcategories": [],
            "level":"",
            "visible": true,
            "industry": "",
            "expertise": [
                    {
                        "skill": ""
                    },
            ]
        }
    ]
    `
  }
]

const fakeData = {
  personalData: {
    name: 'Edson',
    surname1: 'Añawaya',
    surname2: 'Rios',
    country: 'bolivia',
    province: 'bolivia',
    cityName: 'La Paz',
    preferredContactPhone: 'foreign-phone',
    internationalPhone: '+591 78784906',
    driverLicenses: [
      'seleccionar'
    ],
    nationalities: [
      'bolivia'
    ],
    birthDay: '1990-01-01'
  },
  experience: [
    {
      id: '',
      company: 'JALASOFT',
      job: 'QA Automation',
      description: 'Trabajo como Outsourcing para una empresa de clase mundial, donde trabajo con dos aplicaciones de consola usando Go y Python, agregando nuevas funciones, mejorando las existentes, encontrando y solucionando errores, agregando pruebas unitarias, mejorando la documentación, etc.; Además, se brinda soporte a clientes que requieren ayuda al momento de administrar sus productos como: administración de usuarios, servidores dedicados o virtuales, vlans, subredes, firewalls, etc.\nAdemás, como Mentor, he guiado a los solicitantes en varias versiones de los Boot Camps de QA Automation. Además, he sido Trainer de cursos de admisión para desarrolladores.',
      startingDate: '2021-01-01',
      finishingDate: '',
      onCourse: true,
      category: 'informatica-telecomunicaciones',
      subcategories: [
        'programacion'
      ],
      level: 'empleado-a',
      visible: true,
      industry: 'servicios-y-tecnologia-de-la-informacion',
      expertise: [
        {
          skill: 'QA Automation'
        },
        {
          skill: 'Go'
        },
        {
          skill: 'Python'
        }
      ]
    },
    {
      id: '',
      company: 'PATELECOM',
      job: 'Back End Developer',
      description: 'Lideré un equipo de 6 miembros para desarrollar un Sistema Integrador de Llamadas, que integra comunicaciones de línea fija, analógicas, teléfonos IP y frecuencia de radio; todo a través de un servidor Asterisk PBX y desplegado en AWS.',
      startingDate: '2019-02-01',
      finishingDate: '2020-12-31',
      onCourse: false,
      category: 'informatica-telecomunicaciones',
      subcategories: [
        'programacion'
      ],
      level: 'empleado-a',
      visible: true,
      industry: 'telecomunicaciones',
      expertise: [
        {
          skill: 'NodeJS'
        },
        {
          skill: 'Express.js'
        },
        {
          skill: 'Asterisk PBX'
        },
        {
          skill: 'WebRTC'
        },
        {
          skill: 'MQTT'
        },
        {
          skill: 'Socket.io'
        },
        {
          skill: 'API-Rest'
        },
        {
          skill: 'PostgreSQL Database'
        },
        {
          skill: 'AWS'
        },
        {
          skill: 'Front End Angular'
        },
        {
          skill: 'Git'
        },
        {
          skill: 'GitHub'
        }
      ]
    }
  ]
}

export async function GET (request: Request) {
  const { searchParams } = new URL(request.url)
  let cv = ''
  if (searchParams.has('cv')) {
    const cvParam = searchParams.get('cv')
    if (cvParam !== null) {
      cv = decodeURIComponent(cvParam)
    }
  }

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    messages: [
      ...INITIAL_MESSAGES,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: cv
      }
    ]
  })
  const data = completion.data.choices[0].message?.content ?? ''
  let json

  try {
    json = JSON.parse(data)
    console.log('MANDANDO...')
    console.log(json)
    await madeRequests(json)
  } catch {
    return new Response('No se ha podido transformar el JSON', { status: 500 })
  }
}

async function madeRequests (data) {
  console.log(data)
  if (data.personalData && Object.keys(data.personalData).length > 0) {
    console.log(data.personalData)
    const response = await putPersonalData(data.personalData)
    console.log(response)
  }
  if (data.experience && Object.keys(data.experience).length > 0) {
    console.log(data.experience)
    data.experience.map(async item => {
      const response = await putExperience(item)
      console.log(response)
    })
  }
}

async function putExperience (experience) {
  console.log(experience)

  const response = await fetch('https://api.infojobs.net/api/4/curriculum/d1e4835e-bf61-4d26-8785-5ac4833ec415/experience', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${infoJobsToken}`
    },
    body: JSON.stringify(experience)
  })

  console.log(response)
  const data = await response.json()
  console.log(data)
  return data
}

async function putPersonalData (personalData) {
  console.log(personalData)

  const response = await fetch('https://api.infojobs.net/api/3/curriculum/d1e4835e-bf61-4d26-8785-5ac4833ec415/personaldata', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${infoJobsToken}`
    },
    body: JSON.stringify(personalData)
  })

  console.log(response)
  const data = await response.json()
  console.log(data)
  return data
}
