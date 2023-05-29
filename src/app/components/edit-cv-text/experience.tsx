// ExperienceList.tsx
import { Title, Callout } from '@tremor/react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { ErrorResponse, ResponseExperience } from '@/types/infojobs/response'
import { isError, toUpperCamelCase, manageDate } from '@/app/utils/utils'

interface Props {
  experiences: Array<ResponseExperience | ErrorResponse>
}

export const ExperienceList: React.FC<Props> = ({ experiences }) => (
  <>
    {experiences !== null && Array.isArray(experiences) && experiences.length > 0 && !isError(experiences[0]) && (
      <div>
        {/* <Metric className=''>Experience</Metric> */}
        <Title className=''>Experiencia Laborar añadidas:</Title>
        {experiences.map((exp: ResponseExperience, index) => (
          <div key={index} className='p-2'>
            <Callout
              className='mt-1'
              // @ts-expect-error
              title={exp.job + ' — ' + exp.company}
              icon={CheckCircleIcon}
              color='teal'
            >
              {// @ts-expect-error
              manageDate(exp.startingDate, exp.finishingDate)
              }<br />
              <strong>Categoria:</strong> {// @ts-expect-error
              toUpperCamelCase(exp.category)
              }<br />
              <strong>Descripcion:</strong> {// @ts-expect-error
              exp.description
              }<br />
              <strong>Tecnologias:</strong> {// @ts-expect-error
              toUpperCamelCase(exp.expertise.map(tec => tec.skill).join(' '))
              }<br />
            </Callout>
          </div>
        ))}
      </div>
    )}
  </>
)
