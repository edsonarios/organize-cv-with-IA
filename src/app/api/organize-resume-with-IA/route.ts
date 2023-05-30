import { NextResponse } from 'next/server'
import {
  Configuration,
  ChatCompletionRequestMessageRoleEnum,
  OpenAIApi
} from 'openai'

const openaiToken = process.env.OPENAI_TOKEN ?? ''

const configuration = new Configuration({ apiKey: openaiToken })
const openai = new OpenAIApi(configuration)

const INITIAL_MESSAGES = [
  {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content: `Te mandare un CV completo y tienes que armar y devolver un objeto JSON manteniendo la estructura del ejemplo, se dividira en 3 secciones y cada seccione tiene sus propias reglas, al final combinar las 3 secciones en un solo objeto JSON, sino hubiera suficientes datos para llenar alguna seccion, devolver esa seccion vacio

    {
        "personalData": {
            ...
        },
        "experience":{
            ...
        }
        "education":{
            ...
        }
    }

    SECCION "personalData"
    Armar y llenar con los datos segun corresponda, algunos campos tendran restricciones, pero solo modificar: name, surname1, surname2, country, province, cityName, internationalPhone, nationalities, birthDay

    - En el campo de "country" debe tener el siguiente formato "puerto-rico"

    - En el campo de "province" debe tener el siguiente formato "alicante-alacant", sino aplicara algun valor valido, copiar el mismo valor de country, y si country es igual a "otro" entonces su valor sera "otro-pais"

    - En el campo de "nationalities", puede tener un array de las mismas opciones de country, si no aplica ninguno, colocar ["otro"]

    - En el campo de "birthDay" debe tener el formato "AAAA-MM-DD", sino se puede obtener, colocar por defecto "1990-01-01"

    - En el campo de "zipCode" tendra algun numero entero de 5 cifras, solo si, el valor de "country" es "españa", sino dejar vacio

    {
        "name": "",
        "surname1": "",
        "surname2": "",
        "country": "",
        "province": "",
        "cityName": "",
        "zipCode": "10000",
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

    SECCION "experience"
    Armar y llenar con los datos segun corresponda, pero solo modificaras los campos de: company, job, description, startingDate, finishingDate, level, expertise, industry, category y subcategories

    - Si tiene mas de 1 experiencia, repartir en multiples elementos del array y dejar el id vacio

    - En los campos de "startingDate" y "finishingDate" debe tener este formato: "AAAA-MM-DD"
    Si aun no hay fecha de terminado su trabajo, el campo de "finishingDate" debe estar vacio

    - En el campo de "level", debe estar solo una de las siguientes opciones, sino aplicara ninguno solo poner "seleccionar": becario-a-practicas,empleado-a

    - En el campo de "expertise" debes colocar los keywords relacionados con el CV, cada keyword es un json con el atributo skill, maximo 15 elementos, puede ser cualquier keyword, ejemplo: NodeJS, Python, Java, etc.

    - En el campo de "category", puede ir solo uno de las siguientes opciones: informatica-telecomunicaciones,ingenieros-tecnicos,marketing-comunicacion,otros

    - En el campo de "subcategories", es dependiendo de "category" pero es un array de las siguientes opciones, al menos debe estar 1 opcion y sino estuviera ninguno añadir solo "-":

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
            "expertise": [
                    {
                        "skill": ""
                    },
            ]
        }
    ]
      IMPORTANTE: subcategories, no hacer combinaciones, mantener estricto el nombre

    SECCION "education"
    Armar y llenar un JSON con los datos segun corresponda, pero solo modificaras los campos de: "educationLevelCode", "courseCode","startingDate","finishingDate","stillEnrolled","institutionName"

    - En el campo de "startingDate" y "finishingDate" debe tener el siguiente formato "AAAA-MM-DD", si aun esta cursando el finishingDate debera estar vacio

    - En el campo de "educationLevelCode", primero verificar si las opciones de "courseCode" estan acorde a la educacion, y luego rellenar "educationLevelCode" con su key, sino aplicara ninguno y entonces recien verificar si se acerca mas a las opciones de "postgrado,master,otros-titulos-certificaciones-y-carnes,otros-cursos-y-formacion-no-reglada", las opciones de "educationLevelCode" son:
    educacion-secundaria-obligatoria,bachillerato,formacion-profesional-grado-superior,licenciado,ingeniero-superior,postgrado,master,otros-titulos-certificaciones-y-carnes,otros-cursos-y-formacion-no-reglada

    - En el campo de "courseCode" dependera del valor de "educationLevelCode", pero las opciones para "courseCode" son:

        formacion-profesional-grado-superior:fp-ii-administracion,fp-ii-administracion-finanzas,fp-ii-artes-graficas,fp-ii-comercio-internacional,fp-ii-comercio-marketing,fp-ii-comunicacion-imagen-sonido,fp-ii-edificacion-obra-civil,fp-ii-electricidad-electronica,especialidad-industrial,fp-ii-fabricacion-mecanica,fp-ii-imagen-personal,fp-ii-industrias-alimentarias,fp-ii-informatica,prevencion-de-riesgos-profesionales,fp-ii-quimica,fp-ii-secretariado,sistemas-de-regulacion-y-control-automaticos,fp-ii-transporte-logistica

        licenciado:administracion-y-direccion-de-empresas,antropologia-social-y-cultural,bellas-artes,biologia,bioquimica,biotecnologia,ciencia-y-tecnologia-de-los-alimentos,ciencias-actuariales-y-financieras,ciencias-ambientales,ciencias-de-la-actividad-fisica-y-del-deporte,ciencias-del-mar,ciencias-del-trabajo,ciencias-politicas-y-de-la-administracion,ciencias-quimicas,ciencias-religiosas,ciencias-y-tecnicas-estadisticas,comunicacion-audiovisual,criminologia,derecho,documentacion,economia,enologia,estudios-de-asia-oriental,farmacia,lic-filologia-alemana,filologia-arabe,lic-filologia-catalana,filologia-clasica,lic-filologia-eslava,lic-filologia-francesa,filologia-gallega,filologia-hebrea,lic-filologia-hispanica,lic-filologia-inglesa,lic-filologia-italiana,filologia-portuguesa,lic-filologia-romanica,lic-filologia-vasca,lic-filosofia,fisica,geografia,geologia,historia,lic-historia-del-arte,historia-y-ciencias-de-la-musica,humanidades,investigacion-y-tecnicas-de-mercado,linguistica,lic-maquinas-navales,marketing,matematicas,lic-medicina,nautica-y-transporte-maritimo,odontologia,pedagogia,lic-periodismo,psicologia,psicopedagogia,publicidad-y-relaciones-publicas,lic-quimica,lic-radioelectronica-naval,lic-sociologia,lic-teoria-de-la-literatura-literatura-comparada,lic-traduccion-e-interpretacion,veterinaria

        ingeniero-superior:i-sup-aeronautico,agronomo,arquitecto,geologo,i-sup-industrial,ingeniero-de-caminos-canales-y-puertos,ingeniero-de-materiales,ingeniero-de-minas,ingeniero-de-montes,ingeniero-de-sistemas-de-defensa,ingeniero-de-telecomunicacion,ingeniero-en-automatica-y-electronica-industrial,ingeniero-en-electronica,ingeniero-en-geodesia-y-cartografia,ingeniero-en-informatica,ingeniero-en-organizacion-industrial,naval-y-oceanico,quimico

    IMPORTANTE para el campo de "courseCode": si el campo de "educationLevelCode" fuera alguna de las siguientes opciones "postgrado,master,otros-titulos-certificaciones-y-carnes,otros-cursos-y-formacion-no-reglada", entonces dejar vacio el campo de "courseCode"
    IMPORTANTE no mezclar las opciones de ninguna manera, es estricto cada opcion acorde a la educacion

    - En el campo de courseName, si el campo de "educationLevelCode" es alguna de las siguientes opciones "postgrado,master,otros-titulos-certificaciones-y-carnes,otros-cursos-y-formacion-no-reglada", entonces recien añadir el nombre del curso de la educacion, sino es ninguna de las opciones dejar el campo vacio

    [
        {
            "id": "",
            "educationLevelCode": "",
            "courseCode": "",
            "courseName": "",
            "startingDate": "",
            "finishingDate": "",
            "stillEnrolled": false,
            "institutionName": ""
        }
    ]

    IMPORTANTE: Si tiene mas de una carrera profesional, repartir en multiples elementos del array, dejar el id vacio, y no es necesario que todos los items sean un elemento del array, obligatorio si "educationLevelCode" estuviera vacio, borrar todo ese elemento, no importa si al final termina un array vacio
    `
  }
]

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
    console.log(data)
    json = JSON.parse(data)
    console.log(json)
    return NextResponse.json(json)
  } catch {
    return new Response('No se ha podido transformar el JSON', { status: 500 })
  }
}
