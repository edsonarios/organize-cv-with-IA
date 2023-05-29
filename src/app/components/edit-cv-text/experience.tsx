// ExperienceList.tsx
import { Metric, Title, Callout } from '@tremor/react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { ErrorResponse, ResponseExperience } from '@/types/infojobs/response'
import { isError, manageDate, toUpperCamelCase } from '@/utils/utils'

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
            {/* <Title>{exp.company}</Title> */}
            <Callout
              className='mt-1'
              title={exp.job + ' — ' + exp.company}
              icon={CheckCircleIcon}
              color='teal'
            >
              {manageDate(exp.startingDate)} — {manageDate(exp.finishingDate)}<br />
              <strong>Categoria:</strong> {toUpperCamelCase(exp.category)}<br />
              <strong>Descripcion:</strong> {exp.description}<br />
              <strong>Tecnologias:</strong> {toUpperCamelCase(exp.expertise.map(tec => tec.skill).join(' '))}<br />
            </Callout>
          </div>
        ))}
      </div>
    )}
  </>
)
