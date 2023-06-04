import InfojobsProvider from 'infojobs-next-auth-provider'
import NextAuth from 'next-auth/next'
const clientId = process.env.CLIENT_ID ?? ''
const clientSecret = process.env.CLIENT_SECRET ?? ''
const redirectUri = process.env.REDIRECT_URI ?? ''

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }

const handler = NextAuth({
  pages: {
    signIn: '/',
    signOut: '/'
  },
  providers: [
    InfojobsProvider({
      clientId,
      clientSecret,
      redirect_uri: redirectUri,
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
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      return session
    }
  },
  debug: false
})

export { handler as GET, handler as POST }
