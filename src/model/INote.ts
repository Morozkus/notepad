export interface IFolderNotes {
    id: number,
    noteLen: number,
    folderTitle: string,
    folderNotes: INote[]
}

export interface INote {
    id: number,
    title: string,
    text: string
}