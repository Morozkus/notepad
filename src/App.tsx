import React, { useState, useEffect } from 'react'
import './assets/app.css'
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { NoteSlice } from './store/reducers/NoteSlice';
import FolderMenu from './components/FolderMenu';
import AddNotePanel from './components/AddNotePanel';
import NoteItem from './components/NoteItem';
import useDebounce from './hooks/useDebounce';
import FolderList from './components/FolderList';


function App() {
  const { activeNote, activeNoteFolder, notepad, color, error } = useAppSelector(state => state.NoteSlice)
  const { createFolder, createNoteInFolder, deleteFolder, deleteNoteInFolder, setActiveNote, setNoteText, renameNote, setNullError } = NoteSlice.actions
  const dispatch = useAppDispatch()
  const debounce = useDebounce((text: string) => dispatch(setNoteText(text)), 400)
  const isActiveNote = (activeNote || activeNote === 0)


  const text = (isActiveNote && notepad[activeNoteFolder].folderNotes[activeNote].text) || ''
  const [inputNoteText, setInputNoteText] = useState(text)
  useEffect(() => {
    setInputNoteText(text)
  }, [text])

  error && dispatch(setNullError()) && alert(error.msg)

  return (
    <div className="App">
      <div className="header-menu">
        <FolderMenu
          activeFolder={notepad[activeNoteFolder]}
          createFolder={() => dispatch(createFolder())}
          deleteFolder={() => dispatch(deleteFolder())}
        />
        <FolderList
          notepad={notepad}
          activeNoteFolder={activeNoteFolder}
        />
      </div>
      <div className="notepad" style={{ backgroundColor: color }}>
        <div className='folder-name-container'>
          {(activeNote || activeNote === 0) &&
            <input
              type="text"
              className='folder-name-container__input'
              value={notepad[activeNoteFolder].folderNotes[activeNote].title}
              onChange={e => dispatch(renameNote(e.target.value))}
            />}
        </div>
        <ul className="note-area">
          {notepad[activeNoteFolder].folderNotes.map(note => (
            <NoteItem note={note} setActiveNote={() => dispatch(setActiveNote(note.id))} />
          ))}
        </ul>
        <div className="text-area">
          <textarea
            className='text-area-input'
            name="note"
            id="note"
            value={inputNoteText}
            onChange={e => {
              setInputNoteText(e.target.value)
              debounce(e.target.value)
            }}>
          </textarea>
        </div>
        <AddNotePanel
          isActiveNote={(activeNote || activeNote === 0) ? true : false}
          createNoteInFolder={() => dispatch(createNoteInFolder())}
          deleteActiveNote={() => dispatch(deleteNoteInFolder())}
        />
      </div>
    </div>
  );
}

export default App;