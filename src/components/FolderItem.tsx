import React, { FC } from 'react'
import { IFolderNotes } from '../model/INote'
import { colorFolderList } from '../model/ColorList'
import { useAppDispatch } from '../hooks/redux'
import { NoteSlice } from '../store/reducers/NoteSlice'

interface FolderItemProps {
    isActive: boolean,
    folder: IFolderNotes,
    idFolder: number,
    index: number
}

const FolderItem: FC<FolderItemProps> = ({ folder, isActive, idFolder, index }) => {
    const dispatch = useAppDispatch()
    const { setActiveFolder } = NoteSlice.actions

    return (
        <li
            className={isActive ? ['folder', 'active-folder'].join(' ') : ['folder'].join(' ')}
            style={{ backgroundColor: colorFolderList[index] }}
            onClick={() => dispatch(setActiveFolder(idFolder))}>
            {folder.folderTitle}
        </li>
    )
}

export default FolderItem