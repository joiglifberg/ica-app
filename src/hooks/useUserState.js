import { useState, useEffect } from "react"

export default () => {
  const [user, setUser] = useState(null)
  const [authToken, setAuthToken] = useState(null)

  useEffect(() => {
    sessionStorage.setItem("authToken", authToken)
  }, [authToken])

  useEffect(() => {
    setAuthToken(sessionStorage.getItem("authToken"))
  }, [])

  return { user, setUser, authToken, setAuthToken }
}
