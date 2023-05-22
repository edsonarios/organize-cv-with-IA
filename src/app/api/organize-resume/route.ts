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
    content: `Te mandare una descripcion completa de un CV y armaras en un JSON con los datos segun corresponda, pero solo modificaras los campos de: company, job, description, startingDate, finishingDate, level, expertise, industry, category y subcategories

    - En startingDate y finishingDate debe tener este formato: "AAAA-MM-DD"
    Si fuera su trabajo actual finishingDate debe estar vacio
    
    - En level, debe estar una de las siguientes opciones, sino aplicara ninguno solo poner "seleccionar": becario-a-practicas,empleado-a,especialista,mando-intermedio,direccion-gerencia,consejo-directivo
    
    - En expertise debes colocar los keywords relacionados con en CV, cada keyword es un json con el atributo skill, maximo 15 elementos, puede ser cualquier keyword, ejemplo: NodeJS, Python, Java, etc.
    
    - En industry se debe alguno de las siguientes opciones, en caso de que no aplique ninguno solo colocar "seleccionar": arquitectura-y-planificacion,audiovisual,biotecnologia,desarrollo-de-programacion,diseno-grafico,entretenimiento,equipos-informaticos,ingenieria,internet,portales-web-proceso-de-datos-hosting-y-act.-relac.,servicios-y-tecnologia-de-la-informacion,telecomunicaciones
    
    - En category, puede ir solo uno de las siguientes opciones: informatica-telecomunicaciones,ingenieros-tecnicos,marketing-comunicacion,otros
    
    - En subcategories, es dependiendo de category pero es un array de las siguientes opciones, al menos debe estar 1 opcion y sino estuviera ninguno recien le pones "-":
    
    subcategories opciones:
        informatica-telecomunicaciones:[administracion-bases-datos,analisis,arquitectura,calidad,erp-crm-business-intelligence,it-gestion-proyectos,hardware-redes-seguridad,helpdesk,programacion,sistemas,telecomunicaciones,-]
    
        ingenieros-tecnicos:[aeronautico,agronomo-montes,electronica,electronica-automatica-industrial,energias-renovables,geologia-geodesia-cartografia,industrial,minas,naval-oceanico,organizacion-industrial,otras-ingenierias,quimico,sistemas-defensa,-]
    
        marketing-comunicacion:[comunicacion-corporativa,desarrollo-marca-producto,investigacion-mercados,marketing,periodismo-edicion,produccion,publicidad,rrpp-eventos,tecnicas-audiovisuales,-]
    
        otros:[-]
    
    {
        "id": "34230398109",
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
    
    IMPORTANTE: Responde el JSON generado en un bloque de codigo, sin ningun texto adicional fuera del bloque de codigo`
  }
]

export async function PUT (request: Request) {
//   const { searchParams } = new URL(request.url)

  //   if (id == null) return new Response('Missing id', { status: 400 })

  const resume = `PATELECOM
La Paz – Bolivia 
Back End Developer
2017 Feb – 2018 Dec 
Lideré un equipo de 5 miembros para desarrollar un Invernadero Automatizado utilizando datos de temperatura y humedad en tiempo real, para la automatización de puertas y ventanas, programación de riego automatizado, todo controlado desde un sistema integrado y desplegado en un servidor AWS, contando con persistencia local.
  Tools: NodeJS, Express.js, MQTT, Socket.io, Embedded Systems (Raspberry, Arduino), API-Rest, PostgreSQL Database, AWS, Contabo, Front End Angular, Git and GitHub
  `

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    messages: [
      ...INITIAL_MESSAGES,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: resume
      }
    ]
  })
  const data = completion.data.choices[0].message?.content ?? ''
  let json

  try {
    json = JSON.parse(data)
    return NextResponse.json(json)
  } catch {
    return new Response('No se ha podido transformar el JSON', { status: 500 })
  }
}
