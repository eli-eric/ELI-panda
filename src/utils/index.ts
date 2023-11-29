import { twMerge } from 'tailwind-merge'

export function classNames(...classes) {
  return twMerge(classes.filter(Boolean).join(' '))
}

export function generatePassword() {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const digits = '0123456789'
  const specialChars = '._-@!'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'

  let password = ''

  // Adding one uppercase letter
  password += uppercase[Math.floor(Math.random() * uppercase.length)]

  // Adding one special character
  password += specialChars[Math.floor(Math.random() * specialChars.length)]

  // Adding two digits
  for (let i = 0; i < 2; i++) {
    password += digits[Math.floor(Math.random() * digits.length)]
  }

  // Filling the rest of the password
  const combinedChars = uppercase + lowercase + digits + specialChars
  while (password.length < 10) {
    password += combinedChars[Math.floor(Math.random() * combinedChars.length)]
  }

  // Shuffle the password to randomize the order of characters
  password = password
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('')

  return password
}
