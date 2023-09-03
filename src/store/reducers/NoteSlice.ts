import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { INote, IFolderNotes } from '../../model/INote'

const DEFAULTFOLDER = 'Default Folder'

interface INotePad {
    activeNoteFolder: string,
    notepad: IFolderNotes[]
}

const initialState: INotePad = {
    activeNoteFolder: DEFAULTFOLDER,
    notepad: [
        { folderTitle: DEFAULTFOLDER, folderNotes: [] }
    ]
}

export const NoteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        pushToDefoultFolder() {
            
        }
    }
})

export default NoteSlice.reducer