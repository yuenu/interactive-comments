export interface Data {
  comments: Comment[]
  currentUser: User
}

export interface Comment {
  content: string
  createdAt: string
  id: number
  replies: Replay[]
  score: number
  user: User
}

export interface User {
  username: string
  image: {
    png: string
    webp: string
  }
}

export interface Replay {
  id: number
  content: string
  createdAt: string
  score: number
  replyingTo: string
  user: User
}
