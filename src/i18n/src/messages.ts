import { get } from 'lodash'

import { messages as en } from './locale/en'

interface Payload {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any
}
// define all messages from modules HERE
const dictionary: Record<string, Record<string, string>> = { en: {} }

const enhanceMessages = (path: string, pureMessages: Payload, language: string): void => {
    const actualObject: Record<string, string> = path ? get(pureMessages, path) : pureMessages
    const keys = Object.keys(actualObject)

    keys.forEach((key: string) => {
        const value: Record<string, string> | string | typeof undefined = actualObject[key]
        const fullPath: string = path ? `${path}.${key}` : key

        switch (typeof value) {
            case 'object':
                enhanceMessages(fullPath, pureMessages, language)
                break
            case 'string':
                const stringValue: string = value
                dictionary[language][fullPath] = stringValue
                break
            default:
        }
    })
}

enhanceMessages('', { ...en }, 'en')

export const messages = {
    en: {
        ...dictionary['en'],
    },
}
const getMessageMap = <T extends object>(messages: T, previousPath = ''): T =>
    Object.keys(messages).reduce((prev, cur) => {
        const newPath = `${previousPath}${cur}`
        if (typeof messages[cur] === 'string') {
            return { ...prev, [cur]: newPath }
        }
        return { ...prev, [cur]: getMessageMap(messages[cur], `${newPath}.`) }
    }, {}) as T

export const message = getMessageMap(en)
