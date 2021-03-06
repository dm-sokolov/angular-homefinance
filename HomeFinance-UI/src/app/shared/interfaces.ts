export interface User {
  email: string,
  password: string
  returnSecureToken?: boolean
}

export interface FbAuthResponse {
  idToken: string
  expiresIn: string
}

export interface Operation {
  id?: string
  title: string
  text: string
  author: string
  date: Date
}

export interface FbCreateResponse {
  name: string
}
