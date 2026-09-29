import { safeHttpUrl } from '../safe-http-url'

describe('safeHttpUrl', () => {
    it('keeps absolute HTTP links and drops executable or credential-bearing URLs', () => {
        expect(safeHttpUrl('https://www.webofscience.com/record')).toBe(
            'https://www.webofscience.com/record',
        )
        for (const url of [
            'javascript:alert(1)',
            'data:text/html,<script>alert(1)</script>',
            '//www.webofscience.com/record',
            'https://user:password@www.webofscience.com/record',
        ]) {
            expect(safeHttpUrl(url)).toBeUndefined()
        }
    })
})
