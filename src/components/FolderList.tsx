import React, {FC} from 'react'
import FolderItem from './FolderItem'
import { IFolderNotes } from '../model/INote'
import classes from '../assets/styles/modules/FolderList.module.css'

interface FolderListProps {
    notepad: IFolderNotes[]
    activeNoteFolder: number,
}

const FolderList: FC<FolderListProps> = ({notepad, activeNoteFolder}) => {
  return (
    <ul className={classes.folderList}>
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