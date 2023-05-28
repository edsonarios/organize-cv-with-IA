// ExperienceList.tsx
import { Metric, Title, Callout } from '@tremor/react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { ErrorResponse, ResponseEducation } from '@/types/infojobs/response'
import { isError, manageDate, toUpperCamelCase } from '@/utils/utils'

interface Props {
  educations: Array<ResponseEducation | ErrorResponse>
}

export const EducationList: React.FC<Props> = ({ educations }) => (
  <>
    {educations !== null && Array.isArray(educations) && !isError(educations[0]) && (
      <div>
        <Title>Educacion añadidas:</Title>
        {educations.map((education: ResponseEducation, index) => (
          <div key={index} className='p-2'>
            <Callout
              className='mt-1'
              title={toUpperCamelCase(education.educationLevelCode)}
              icon={CheckCircleIcon}
              color='teal'
            >
              {manageDate(education.startingDate)} — {manageDate(education.finishingDate)}<br />
              <strong>Institucion:</strong> {toUpperCamelCase(education.institutionName)}<br />
            </Callout>
          </div>
        ))}
      </div>
    )}
  </>
)
