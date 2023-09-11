import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IFolderNotes } from '../../model/INote'
import { colorFolderList } from '../../model/ColorList'

const DEFAULTFOLDER: IFolderNotes = { id: Date.now(), noteLen: 1, folderTitle: 'Default Folder', folderNotes: [] }

type TError = { code: number, msg: string }

interface INotePad {
    color: string,
    activeNoteFolder: number,
    activeNote: number | null,
    folderLen: number,
    error: TError | null,
    notepad: IFolderNotes[]
}

const initialState: INotePad = {
    color: colorFolderList[0],
    activeNoteFolder: 0,
    activeNote: null,
    folderLen: 1,
    error: null,
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
            state.error = null
            state.notepad.push({ id: Date.now(), noteLen: 1, folderTitle: `Папка ${state.folderLen}`, folderNotes: [] })
            state.folderLen += 1
        },
        deleteFolder(state) {
            if (state.notepad[state.activeNoteFolder].id === DEFAULTFOLDER.id) {
                return
            }
            state.notepad = state.notepad.filter(folder => folder.id !== state.notepad[state.activeNoteFolder].id)
            state.activeNoteFolder = 0
            state.color = colorFolderList[0]
        },
        renameFolder(state, payload: PayloadAction<string>) {
            if (payload.payload === '' || payload.payload.length > 32) {
                state.error = {code: 7, msg: 'Количество символов в имени файла или папки должно быть больше 2 и меньше 32'}
                return
            }
            state.notepad[state.activeNoteFolder].folderTitle = payload.payload
        },
        renameNote(state, payload: PayloadAction<string>) {
            if ((state.activeNote || state.activeNote === 0) && state.notepad[state.activeNoteFolder].folderNotes[state.activeNote].title) {
                if (payload.payload === '' || payload.payload.length > 32) {
                    state.error = {code: 7, msg: 'Количество символов в имени файла или папки должно быть больше 2 и меньше 32'}
                    return
                }
                state.notepad[state.activeNoteFolder].folderNotes[state.activeNote].title = payload.payload
            }
        },
        createNoteInFolder(state) {
            state.notepad[state.activeNoteFolder].folderNotes.push({ id: Date.now() + state.notepad[state.activeNoteFolder].id, title: `Записка ${state.notepad[state.activeNoteFolder].noteLen}`, text: '' })
            state.notepad[state.activeNoteFolder].noteLen += 1
        },
        deleteNoteInFolder(state) {
            state.notepad[state.activeNoteFolder].folderNotes = state.notepad[state.activeNoteFolder].folderNotes
                .filter(note => (state.activeNote || state.activeNote === 0) && note.id !== state.notepad[state.activeNoteFolder].folderNotes[state.activeNote].id)
            state.activeNote = null
        },
        setActiveFolder(state, payload: PayloadAction<number>) {
            for (let i = 0; i < state.notepad.length; i++) {

                if (state.notepad[state.activeNoteFolder].id === payload.payload) return

                if (state.notepad[i].id === payload.payload) {
                    state.activeNoteFolder = i
                    state.activeNote = null
                    state.color = colorFolderList[i]
                }
            }
        },
        setActiveNote(state, payload: PayloadAction<number>) {
            for (let i = 0; i < state.notepad[state.activeNoteFolder].folderNotes.length; i++) {
                if (state.notepad[state.activeNoteFolder].folderNotes[i].id === payload.payload) {
                    state.activeNote = i
                    return
                }
            }
            state.activeNote = null
        },
        setNoteText(state, payload: PayloadAction<string>) {
            if (state.activeNote || state.activeNote === 0) {      
                state.notepad[state.activeNoteFolder].folderNotes[state.activeNote].text = payload.payload
            }
        },
        setNullError(state) {
            state.error = null
        }
    }
})

export default NoteSlice.reducer