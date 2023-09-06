import React, { FC } from 'react'

interface AddNotePanelProps {
    createNoteInFolder: any,
    isActiveNote: boolean,
    deleteActiveNote: any
}

const AddNotePanel: FC<AddNotePanelProps> = ({createNoteInFolder, isActiveNote, deleteActiveNote}) => {
  return (
    <div className="add-note-panel">
        <button className='add-note add-note-panel__item' onClick={createNoteInFolder}>Добавить запись</button>
        {isActiveNote && <button className='del-note add-note-panel__item' onClick={deleteActiveNote}>Удалить текущую запись</button>}
      </div>
  )
}

export default AddNotePanel