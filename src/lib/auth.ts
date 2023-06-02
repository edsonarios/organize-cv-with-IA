import InfojobsProvider from 'infojobs-next-auth-provider'
import { NextAuthOptions } from 'next-auth'
const clientId = process.env.CLIENT_ID ?? ''
const clientSecret = process.env.CLIENT_SECRET ?? ''

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/',
    signOut: '/'
  },
  providers: [
    InfojobsProvider({
      clientId,
      clientSecret,
      redirect_uri: 'https://organize-cv-with-ia.vercel.app/',
      infojobs_scopes: 'MY_APPLICATIONS,CANDIDATE_PROFILE_WITH_EMAIL,CANDIDATE_READ_CURRICULUM_SKILLS,CV,CANDIDATE_READ_CURRICULUM_EXPERIENCE,CANDIDATE_EDIT_CURRICULUM_EXPERIENCE,CANDIDATE_READ_CURRICULUM_CVTEXT,CANDIDATE_EDIT_CURRICULUM_CVTEXT,CANDIDATE_EDIT_CURRICULUM_EDUCATION,CANDIDATE_READ_CURRICULUM_EDUCATION,CANDIDATE_EDIT_CURRICULUM_PERSONAL_DATA,CANDIDATE_READ_CURRICULUM_PERSONAL_DATA,CANDIDATE_DELETE_CURRICULUM_EXPERIENCE,CANDIDATE_DELETE_CURRICULUM_EDUCATION'
    })
  ],
  callbacks: {
    async jwt ({ token, account }) {
      if (account != null) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      return token
    },
    async session ({ session, token }) {
      // @ts-expect-error
      session.accessToken = token.accessToken
      // @ts-expect-error
      session.refreshToken = token.refreshToken
      return session
    }
  },
  debug: false
}
