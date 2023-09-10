import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { NoteSlice } from '../store/reducers/NoteSlice';
import FolderMenu from '../components/FolderMenu';
import AddNotePanel from '../components/AddNotePanel';
import NoteItem from '../components/NoteItem';
import useDebounce from '../hooks/useDebounce';
import FolderList from '../components/FolderList';
import { useInputReload } from '../hooks/useInput';
import NoteArea from '../components/NoteArea';
import FolderInputContainer from '../components/FolderInputContainer';
import classes from '../assets/styles/modules/FolderPage.module.css'
import parseModule from '../hooks/parseModule';

const FolderPage = () => {
    const { activeNote, activeNoteFolder, notepad, color, error } = useAppSelector(state => state.NoteSlice)
    const { createFolder, createNoteInFolder, deleteFolder, deleteNoteInFolder, setActiveNote, setNoteText, renameNote, setNullError, renameFolder } = NoteSlice.actions
    const dispatch = useAppDispatch()

    const isActiveNote = (activeNote || activeNote === 0)

    const text = (isActiveNote && notepad[activeNoteFolder].folderNotes[activeNote].text) || ''
    const title = (isActiveNote && notepad[activeNoteFolder].folderNotes[activeNote].title) || ''
    const nameFolder = notepad[activeNoteFolder].folderTitle

    const setNoteTextDebounce = useDebounce((text: string) => dispatch(setNoteText(text)), 400)
    const valueTextArea = useInputReload(text, (e: React.ChangeEvent<HTMLTextAreaElement>) => setNoteTextDebounce(e.target.value))

    const renameNoteDebounce = useDebounce((title: string) => dispatch(renameNote(title)), 200)
    const valueInputNote = useInputReload(title, (e: React.ChangeEvent<HTMLInputElement>) => renameNoteDebounce(e.target.value))

    const renameFolderDebounce = useDebounce((name: string) => dispatch(renameFolder(name)), 200)
    const valueInputFolder = useInputReload(nameFolder, (e: React.ChangeEvent<HTMLInputElement>) => renameFolderDebounce(e.target.value))

    error && dispatch(setNullError()) && alert(error.msg)

    return (
        <div>
            <div className={parseModule([classes.headerMenu])}>
                <FolderMenu
                    valueFolderNameInput={valueInputFolder}
                    createFolder={() => dispatch(createFolder())}
                    deleteFolder={() => dispatch(deleteFolder())}
                />
                <FolderList
                    notepad={notepad}
                    activeNoteFolder={activeNoteFolder}
                />
            </div>
            <div className={parseModule([classes.notepad])} style={{ backgroundColor: color }}>
                <div className={parseModule([classes.folderNameContainer, classes.folderNameContainerChild])}>
                    {isActiveNote && <FolderInputContainer valueFolderNameInput={valueInputNote} />}
                </div>
                <AddNotePanel
                    isActiveNote={isActiveNote ? true : false}
                    createNoteInFolder={() => dispatch(createNoteInFolder())}
                    deleteActiveNote={() => dispatch(deleteNoteInFolder())}
                />
                <ul className={parseModule([classes.noteArea])}>
                    {notepad[activeNoteFolder].folderNotes.map((note, index) => (
                        <NoteItem isActiveNote={activeNote === index} note={note} setActiveNote={() => dispatch(setActiveNote(note.id))} />
                    ))}
                </ul>
                <NoteArea
                    isActiveNote={Boolean(isActiveNote)}
                    valueTextArea={valueTextArea}
                />
            </div>
        </div>
    );
}

export default FolderPage