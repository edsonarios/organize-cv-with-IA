// ExperienceList.tsx
import { Metric, Title, Callout } from '@tremor/react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { ErrorResponse, ResponseEducation } from '@/types/infojobs/response'
import { isError } from '@/utils/utils'

interface Props {
  educations: Array<ResponseEducation | ErrorResponse>
}

export const EducationList: React.FC<Props> = ({ educations }) => (
  <>
    {educations !== null && Array.isArray(educations) && !isError(educations[0]) && (
      <div>
        <Metric className=''>Educations</Metric>
        {educations.map((education: ResponseEducation, index) => (
          <div key={index} className='p-2'>
            <Title>{education.educationLevelCode}</Title>
            <Callout
              className='mt-1'
              title='Critical speed limit reached'
              icon={CheckCircleIcon}
              color='teal'
            >
              All systems are currently within their default operating ranges.
            </Callout>
          </div>
        ))}
      </div>
    )}
  </>
)
