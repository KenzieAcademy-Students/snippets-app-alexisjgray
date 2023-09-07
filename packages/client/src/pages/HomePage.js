import React from 'react'
import { useRequireAuth } from 'hooks/useRequireAuth'
import { LoadingSpinner, Feed } from 'components'

export default function HomePage(props) {
  const {
    state: { isAuthenticated },
  } = useRequireAuth()

  // If auth is null (still fetching data)
  // above hook will show loading indicator
  // or false (logged out, will redirect)
  if (!isAuthenticated) {
    return <LoadingSpinner full />
  }

  return <Feed />
}
