// ExperienceList.tsx
import { Metric, Title, Callout } from '@tremor/react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { UIErrorResponse } from '@/types/infojobs/response'

interface Props {
  errors: UIErrorResponse[]
}

export const ErrorList: React.FC<Props> = ({ errors }) => (
  <>
    {errors !== null && Array.isArray(errors) && (
      <div>
        <Metric className=''>Errores</Metric>
        {errors.map((error: UIErrorResponse, index) => (
          <div key={index} className='p-2'>
            <Title>{error.error_description}</Title>
            <Callout
              className='mt-1'
              title='Critical speed limit reached'
              icon={CheckCircleIcon}
              color='rose'
            >
              All systems are currently within their default operating ranges.
            </Callout>
          </div>
        ))}
      </div>
    )}
  </>
)
