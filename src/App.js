import React from "react"
import Login from "./components/Login"
import useUserState from "./hooks/useUserState"

function App() {
  const { user, setUser, setAuthToken } = useUserState()

  console.log("user in app", user)

  if (!user) {
    return <Login user={user} setUser={setUser} setAuthToken={setAuthToken} />
  }

  return <div>{JSON.stringify(user)}</div>
}

export default App
