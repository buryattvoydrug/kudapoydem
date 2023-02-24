import { Dispatch } from "redux"

export type CardTypeProps = {
  type: string,
  post: PostProps
}
export type AuthCallAssetsI = {
  email: string,
  password: string,
}

export type User = {
  _id: string,
  username: string,
  email: string,
  password: string, 
  profilePicture?: string,
  followers: Array<string>,
  followings: Array<string>,
  desc: string,
}

export type UserUpdate = {
  userId: string,
  profilePicture?: string,
  desc?: string,
}

export type Post = {
  userId: string | null,
  title: string | null,
  link: string | null,
  price: string | null,
  img?: string | null,
}

export type PostProps = {
  createdAt: string,
  img: string,
  likes: string[],
  link: string,
  price: number,
  title: string,
  updatedAt: string,
  userId: string,
  __v: number,
  _id: string,
}

export type AuthState = {
  user: User,
  isFetching: boolean,
  error: boolean,
  dispatch?: any
}