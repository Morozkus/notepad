import React, { useState } from 'react'
import './assets/app.css'
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { NoteSlice } from './store/reducers/NoteSlice';
import FolderMenu from './components/FolderMenu';
import FolderItem from './components/FolderItem';
import AddNotePanel from './components/AddNotePanel';
import NoteItem from './components/NoteItem';


function App() {
  const { activeNote, activeNoteFolder, notepad, color } = useAppSelector(state => state.NoteSlice)
  const { createFolder, createNoteInFolder, deleteFolder, deleteNoteInFolder, setActiveFolder, setActiveNote, setNoteText, renameNote } = NoteSlice.actions
  const dispatch = useAppDispatch()

  const [inputNoteText, setInputNoteText] = useState('')

  return (
    <div className="App">
      <div className="header-menu">
        <FolderMenu
          activeFolder={activeNoteFolder}
          createFolder={() => dispatch(createFolder())}
          deleteFolder={() => dispatch(deleteFolder())}
        />
        <ul className="folder-list">
          {notepad.map((folder, index) => (
            folder.id === activeNoteFolder.id
              ?
              <FolderItem
                index={index}
                folder={folder}
                isActive={true}
                setActiveFolder={() => dispatch(setActiveFolder(folder.id))}
              />
              :
              <FolderItem
                index={index}
                folder={folder}
                isActive={false}
                setActiveFolder={() => dispatch(setActiveFolder(folder.id))}
              />
          ))}
        </ul>
      </div>
      <div className="notepad" style={{backgroundColor: color}}>
        <div className='folder-name-container'>
          {activeNote?.title && <input type="text" className='folder-name-container__input' value={activeNote.title} onChange={e => dispatch(renameNote(e.target.value))}/>}
        </div>
        <ul className="note-area">
          {activeNoteFolder.folderNotes.map(note => (
            <NoteItem note={note} setActiveNote={() => dispatch(setActiveNote(note.id))} />
          ))}
        </ul>
        <div className="text-area">
          <button className='save-btn'>Сохранить</button>
          <textarea className='text-area-input' name="note" id="note">
          </textarea>
        </div>
        {activeNote ?
          <AddNotePanel
            isActiveNote={true}
            createNoteInFolder={() => dispatch(createNoteInFolder())}
            deleteActiveNote={() => dispatch(deleteNoteInFolder())}
          />
          :
          <AddNotePanel
            isActiveNote={false}
            createNoteInFolder={() => dispatch(createNoteInFolder())}
            deleteActiveNote={null}
          />}
      </div>

    </div>
  );
}

export default App;