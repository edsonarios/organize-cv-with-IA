import { Title, Callout } from '@tremor/react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { ErrorResponse, ResponsePersonalData } from '@/types/infojobs/response'
import { isError, toUpperCamelCase } from '@/utils/utils'

interface Props {
  personalData: ResponsePersonalData | ErrorResponse
}

export const PersonalData: React.FC<Props> = ({ personalData }) => (
  <>
    {personalData !== null && !isError(personalData) && (
      <div>
        {/* <Metric className=''>Datos personales Actualizados</Metric> */}
        <Title className=''>Datos personales Actualizados:</Title>
        <div className='p-2'>
          <Callout
            className='mt-1'
            title={personalData.name + ' ' + personalData.surname1 + ' ' + personalData.surname2}
            icon={CheckCircleIcon}
            color='teal'
          >
            Pais: {toUpperCamelCase(personalData.country)}<br />
            Ciudad: {toUpperCamelCase(personalData.cityCode)}<br />
            Provincia: {toUpperCamelCase(personalData.province)}<br />
            Nacionalidad: {toUpperCamelCase(personalData.nationalities.join(' '))}<br />
            Telefono: {personalData.internationalPhone}<br />
            ...
          </Callout>
        </div>
      </div>
    )}
  </>
)
