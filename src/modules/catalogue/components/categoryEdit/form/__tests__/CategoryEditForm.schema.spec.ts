import { categoryValidationschema } from '../CategoryEditForm.schema'

const validCategory = {
    name: 'CategoryA',
    code: 'cat-a',
    groups: [
        {
            name: 'Group A',
            properties: [
                {
                    name: 'Property A',
                    listOfValues: ['one', 'two'],
                },
            ],
        },
    ],
    physicalItemProperties: [],
}

describe('categoryValidationschema', () => {
    it('accepts a valid category', async () => {
        await expect(categoryValidationschema.validate(validCategory)).resolves.toBeTruthy()
    })

    it('rejects missing name', async () => {
        await expect(
            categoryValidationschema.validate({ ...validCategory, name: '' }),
        ).rejects.toThrow(/Name/i)
    })

    it('rejects missing code', async () => {
        await expect(
            categoryValidationschema.validate({ ...validCategory, code: '' }),
        ).rejects.toThrow(/Code/i)
    })

    it('rejects group without name', async () => {
        const invalid = {
            ...validCategory,
            groups: [{ name: '', properties: [{ name: 'p' }] }],
        }
        await expect(categoryValidationschema.validate(invalid)).rejects.toThrow(/Group Name/i)
    })

    it('rejects property without name inside group', async () => {
        const invalid = {
            ...validCategory,
            groups: [{ name: 'G', properties: [{ name: '' }] }],
        }
        await expect(categoryValidationschema.validate(invalid)).rejects.toThrow(/Property Name/i)
    })

    it('rejects empty string in listOfValues', async () => {
        const invalid = {
            ...validCategory,
            groups: [
                {
                    name: 'G',
                    properties: [{ name: 'p', listOfValues: ['ok', ''] }],
                },
            ],
        }
        await expect(categoryValidationschema.validate(invalid)).rejects.toThrow(/Value/i)
    })

    it('allows nullable systemType', async () => {
        await expect(
            categoryValidationschema.validate({ ...validCategory, systemType: null }),
        ).resolves.toBeTruthy()
    })

    it('allows nullable defaultValue on property', async () => {
        const cat = {
            ...validCategory,
            groups: [
                {
                    name: 'G',
                    properties: [{ name: 'p', defaultValue: null }],
                },
            ],
        }
        await expect(categoryValidationschema.validate(cat)).resolves.toBeTruthy()
    })

    it('rejects physicalItemProperties property without name', async () => {
        const invalid = {
            ...validCategory,
            physicalItemProperties: [{ name: '' }],
        }
        await expect(categoryValidationschema.validate(invalid)).rejects.toThrow(/Property Name/i)
    })
})
