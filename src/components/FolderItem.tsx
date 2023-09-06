import React, { FC } from 'react'
import { IFolderNotes } from '../model/INote'
import { colorFolderList } from '../model/ColorList'

interface FolderItemProps {
    isActive: boolean,
    folder: IFolderNotes,
    setActiveFolder: any,
    index: number
}

const FolderItem: FC<FolderItemProps> = ({ folder, isActive, setActiveFolder, index }) => {
    return (
        isActive
            ?
            <li
                className={['folder', 'active-folder'].join(' ')}
                style={{ backgroundColor: colorFolderList[index] }}
                onClick={setActiveFolder}>
                {folder.folderTitle}
            </li>
            :
            <li
                className={['folder'].join(' ')}
                style={{ backgroundColor: colorFolderList[index] }}
                onClick={setActiveFolder}>
                {folder.folderTitle}
            </li>
    )
}

export default FolderItem