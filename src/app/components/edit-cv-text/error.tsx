// ExperienceList.tsx
import { Metric, Title, Callout } from '@tremor/react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { UIErrorResponse } from '@/types/infojobs/response'
import { toUpperCamelCase } from '@/utils/utils'

interface Props {
  errors: UIErrorResponse[]
}

export const ErrorList: React.FC<Props> = ({ errors }) => (
  <>
    {errors !== null && Array.isArray(errors) && (
      <div>
        {/* <Metric className=''>Errores</Metric> */}
        <Title>Datos que no puedieron ser añadidos</Title>
        {errors.map((error: UIErrorResponse, index) => (
          <div key={index} className='p-2'>
            {/* <Title>{error.error_description}</Title> */}
            <Callout
              className='mt-1'
              title={toUpperCamelCase(error.type) + ' — error: ' + error.errorCode}
              icon={CheckCircleIcon}
              color='rose'
            >
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
