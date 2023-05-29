// ExperienceList.tsx
import { Title, Callout } from '@tremor/react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { UIErrorResponse } from '@/types/infojobs/response'
import { toUpperCamelCase } from '@/app/utils/utils'

interface Props {
  errors: UIErrorResponse[]
}

export const ErrorList: React.FC<Props> = ({ errors }) => (
  <>
    {errors !== null && Array.isArray(errors) && errors.length > 0 && (
      <div>
        <Title>Datos que no puedieron ser añadidos</Title>
        {errors.map((error: UIErrorResponse, index) => (
          <div key={index} className='p-2'>
            <Callout
              className='mt-1'
              title={toUpperCamelCase(error.type) + ' — error: ' + error.errorCode}
              icon={CheckCircleIcon}
              color='rose'
            >
              {error.error_description}<br />
              <pre>
                {JSON.stringify(error.body, null, 2)}
              </pre>
            </Callout>
          </div>
        ))}
      </div>
    )}
  </>
)
