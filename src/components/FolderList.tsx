import React, {FC} from 'react'
import FolderItem from './FolderItem'
import { IFolderNotes } from '../model/INote'

interface FolderListProps {
    notepad: IFolderNotes[]
    activeNoteFolder: number,
}

const FolderList: FC<FolderListProps> = ({notepad, activeNoteFolder}) => {
  return (
    <ul className="folder-list">
          {notepad.map((folder, index) => (
            <FolderItem
              index={index}
              folder={folder}
              isActive={folder.id === notepad[activeNoteFolder].id ? true : false}
              idFolder={folder.id}
            />
          ))}
        </ul>
  )
}

export default FolderList