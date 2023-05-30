import { Title, Callout } from '@tremor/react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { ErrorResponse, ResponseEducation } from '@/types/infojobs/response'
import { isError, manageDate, toUpperCamelCase, verifyCourseName } from '@/app/utils/utils'

interface Props {
  educations: Array<ResponseEducation | ErrorResponse>
}

export const EducationList: React.FC<Props> = ({ educations }) => (
  <>
    {educations !== null && Array.isArray(educations) && educations.length > 0 && !isError(educations[0]) && (
      <div>
        <Title>Educacion añadidas:</Title>
        {educations.map((education: ResponseEducation, index) => (
          <div key={index} className='p-2'>
            <Callout
              className='mt-1'
              // @ts-expect-error
              title={toUpperCamelCase(education.educationLevelCode)}
              icon={CheckCircleIcon}
              color='teal'
            >

              {// @ts-expect-error
              manageDate(education.startingDate, education.finishingDate)
              }<br />
              <strong>Institucion:</strong> {// @ts-expect-error
              toUpperCamelCase(education.institutionName)
              }<br />
              <strong>Estudio:</strong> {// @ts-expect-error
              toUpperCamelCase(verifyCourseName(education.courseCode, education.courseName))
              }<br />
            </Callout>
          </div>
        ))}
      </div>
    )}
  </>
)
