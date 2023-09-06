import React, { FC } from 'react'
import { INote } from '../model/INote'

interface NoteItemProps {
    setActiveNote: any
    note: INote
}

const NoteItem: FC<NoteItemProps> = ({setActiveNote, note}) => {
  return (
    <li className='note-area__item' onClick={setActiveNote}>{note.title}</li>
  )
}

export default NoteItem