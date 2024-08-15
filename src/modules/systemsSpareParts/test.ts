const user = {
  name: 'John',
  age: 30,
  height: 180
}

type User = {
  name: string
  age: number
  height: number
}

const test = (user: User) => {
  const userName = user.age
}
