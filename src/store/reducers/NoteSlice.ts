import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { INote, IFolderNotes } from '../../model/INote'
import { colorFolderList } from '../../model/ColorList'

const DEFAULTFOLDER: IFolderNotes = { id: Date.now(), noteLen: 1, folderTitle: 'Default Folder', folderNotes: [] }

type TError = { code: number, msg: string }

interface INotePad {
    color: string,
    activeNoteFolder: IFolderNotes,
    activeNote: INote | null,
    folderLen: number,
    error: TError | false,
    notepad: IFolderNotes[]
}

const initialState: INotePad = {
    color: colorFolderList[0],
    activeNoteFolder: DEFAULTFOLDER,
    activeNote: null,
    folderLen: 1,
    error: false,
    notepad: [
        DEFAULTFOLDER
    ]
}

export const NoteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        createFolder(state) {
            if (state.notepad.length >= 10) {
                state.error = { code: 10, msg: 'Превышено количество папок' }
                return
            }
            state.error = false
            state.notepad.push({ id: Date.now(), noteLen: 1, folderTitle: `Папка ${state.folderLen}`, folderNotes: [] })
            state.folderLen += 1
        },
        deleteFolder(state) {
            if (state.activeNoteFolder.id === DEFAULTFOLDER.id) {
                return
            }
            state.notepad = state.notepad.filter(folder => folder.id !== state.activeNoteFolder.id)
            state.activeNoteFolder = state.notepad[0]
        },
        renameFolder(state, payload: PayloadAction<string>) {
            for (let i = 0; i < state.notepad.length; i++) {
                if (state.notepad[i].id === state.activeNoteFolder.id) {
                    state.activeNoteFolder.folderTitle = payload.payload
                    state.notepad[i] = state.activeNoteFolder
                }
            }
        },
        renameNote(state, payload: PayloadAction<string>) {
            if (state.activeNote?.title) {
                state.activeNote.title = payload.payload
            }
        },
        createNoteInFolder(state) {
            for (let i = 0; i < state.notepad.length; i++) {
                if (state.notepad[i].id === state.activeNoteFolder.id) {
                    state.activeNoteFolder.folderNotes.push({ id: Date.now() + state.notepad[i].id, title: `Записка ${state.activeNoteFolder.noteLen}`, text: '' })
                    state.activeNoteFolder.noteLen += 1
                    state.notepad[i] = state.activeNoteFolder
                }
            }
        },
        deleteNoteInFolder(state) {
            for (let i = 0; i < state.notepad.length; i++) {
                if (state.notepad[i].id === state.activeNoteFolder.id) {
                    state.activeNoteFolder.folderNotes = state.activeNoteFolder.folderNotes.filter(note => note.id !== state.activeNote?.id)
                    state.notepad[i].folderNotes = state.activeNoteFolder.folderNotes
                }
            }
            state.activeNote = null
        },
        setActiveFolder(state, payload: PayloadAction<number>) {
            for (let i = 0; i < state.notepad.length; i++) {

                if(state.activeNoteFolder.id === payload.payload) return

                if (state.notepad[i].id === payload.payload) {
                    state.activeNoteFolder = state.notepad[i]
                    state.color = colorFolderList[i]
                }
            }
        },
        setActiveNote(state, payload: PayloadAction<number>) {
            for (let i = 0; i < state.activeNoteFolder.folderNotes.length; i++) {
                if (state.activeNoteFolder.folderNotes[i].id === payload.payload) {
                    state.activeNote = state.activeNoteFolder.folderNotes[i]
                    return
                }
            }
            state.activeNote = null
        },
        setNoteText(state, payload: PayloadAction<string>) {
            if (state.activeNote) {
                state.activeNote.text = payload.payload
            }
        }
    }
})

export default NoteSlice.reducer