import React, { FC } from 'react'
import { INote } from '../model/INote'
import classes from '../assets/styles/modules/NoteItem.module.css'
import parseModule from '../hooks/parseModule'

interface NoteItemProps {
  setActiveNote: React.MouseEventHandler<HTMLLIElement>,
  note: INote,
  isActiveNote: boolean
}

const NoteItem: FC<NoteItemProps> = ({ setActiveNote, note, isActiveNote }) => {
  return (
    <li className={!isActiveNote ? parseModule([classes.noteAreaItem]) : parseModule([classes.noteAreaItem, classes.noteAreaItemActive])} onClick={setActiveNote}>{note.title}</li>
  )
}

export default NoteItem