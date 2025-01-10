export interface Comment {
  _id: string
  content: string
  moment: number
  user: {
    _id: string
    email: string
    name: string
    role: string
    type: string
  }
  track: {
    _id: string
    title: string
    description: string
    trackUrl: string
  }
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}
