'use client'

import * as React from 'react'

// TODO Add a way to manage session
export function AuthGuard({ children }) {
  //   const router = useRouter()
  //   const { user, error, isLoading } = useUser()
  //   const [isChecking, setIsChecking] = React.useState < boolean > true

  //   const checkPermissions = async () => {
  //     if (isLoading) {
  //       return
  //     }

  //     if (error) {
  //       setIsChecking(false)
  //       return
  //     }

  //     if (!user) {
  //       logger.debug('[AuthGuard]: User is not logged in, redirecting to sign in')
  //       router.replace(paths.auth.signIn)
  //       return
  //     }

  //     setIsChecking(false)
  //   }

  //   React.useEffect(() => {
  //     checkPermissions().catch(() => {
  //       // noop
  //     })
  //     // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  //   }, [user, error, isLoading])

  //   if (isChecking) {
  //     return null
  //   }

  //   if (error) {
  //     return <Alert color='error'>{error}</Alert>
  //   }

  return <React.Fragment>{children}</React.Fragment>
}
