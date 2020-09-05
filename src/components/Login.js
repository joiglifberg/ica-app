import React, { useState, useEffect } from "react"
import icaApi from "../utility/ica-api"

export default function Login({ setUser, setAuthToken, user }) {
  const [formData, setFormData] = useState({
    pin: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  console.log("user in login", user)

  useEffect(() => {
    if (loading) {
      setErrorMessage("")
    }
  }, [loading])

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    const res = await icaApi("/api/login", {
      headers: {
        Authorization: "Basic " + btoa(`${formData.pin}:${formData.password}`),
      },
    })

    const data = await res.json()

    if (!res.ok) {
      setLoading(false)

      if (res.status === 401 && data) {
        setErrorMessage(data)
      }

      return
    }

    setAuthToken(res.headers.get("AuthenticationTicket"))
    setUser(data)

    setLoading(false)
  }

  return (
    <div className="justify-center flex h-full min-h-screen items-center">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="personnummer">
              Personnummer
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pin"
              name="pin"
              type="number"
              value={formData.pin}
              placeholder="ÅÅMMDDXXXX"
              onChange={(e) => handleOnChange(e)}
              autoComplete="off"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Lösenord
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              placeholder="******************"
              onChange={(e) => handleOnChange(e)}
              autoComplete="current-password"
            />
          </div>
          <button
            className="bg-ica text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            Logga in
          </button>
          {errorMessage.length > 0 && <p className="text-red-500 text-xs italic mt-3">{errorMessage}</p>}
        </form>
      </div>
    </div>
  )
}
