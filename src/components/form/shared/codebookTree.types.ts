export type Codebooktree = {
    name: string
    uid: string
    code?: string
    children?: Codebooktree[]
    isExpandable?: boolean
}
