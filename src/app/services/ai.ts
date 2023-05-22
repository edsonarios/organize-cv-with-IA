import Cors from 'cors'
const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''
const cors = Cors({
  methods: ['GET', 'HEAD', 'PUT']
})

// Una función para ejecutar la biblioteca cors como middleware
async function runMiddleware (req, res, fn) {
  return await new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export async function putCVText (req, res) {
//   const res = await fetch('https://api.infojobs.net/api/1/curriculum/d1e4835e-bf61-4d26-8785-5ac4833ec415/cvtext', {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Basic ${infoJobsToken}`
//     },
//     body: JSON.stringify(cv)
//   })

  // Inicializa la biblioteca cors
  await runMiddleware(req, res, cors)
  const response = await fetch('https://api.infojobs.net/api/7/offer?category=informatica-telecomunicaciones', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${infoJobsToken}`
    }
  })
  // const res = await PUT(cv)
  const json = await response.json()
  console.log(json)

  return json
}
