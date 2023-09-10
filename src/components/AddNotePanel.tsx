import React, { FC } from 'react'
import PageButton from './UI/Button/PageButton'
import classses from '../assets/styles/modules/AddNotePanel.module.css'
import parseModule from '../hooks/parseModule'

interface AddNotePanelProps {
    createNoteInFolder: any,
    isActiveNote: boolean,
    deleteActiveNote: any
}

const AddNotePanel: FC<AddNotePanelProps> = ({createNoteInFolder, isActiveNote, deleteActiveNote}) => {
  return (
    <div className={parseModule([classses.addNotePanel, classses.addNotePanelChild])}>
        <PageButton onClick={createNoteInFolder}>Добавить запись</PageButton>
        {isActiveNote && <PageButton onClick={deleteActiveNote}>Удалить текущую запись</PageButton>}
      </div>
  )
}

export default AddNotePanel