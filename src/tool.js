const TOKEN = 'player_token'

export function setToken (token) {
  localStorage.setItem(TOKEN, token)
}

export function getToken () {
  localStorage.getItem(TOKEN) || ''
}