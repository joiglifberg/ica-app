export default (endpoint, options) => {
  const authToken = sessionStorage.getItem("authToken")

  if (authToken) {
    options.headers = {
      ...options.headers,
      AuthenticationTicket: authToken,
    }
  }

  return fetch(`https://cors-anywhere.herokuapp.com/https://handla.api.ica.se${endpoint}`, options)
}
