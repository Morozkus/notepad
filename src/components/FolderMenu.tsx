import React, { FC } from 'react'
import { IFolderNotes } from '../model/INote'
import { useAppDispatch } from '../hooks/redux'
import { NoteSlice } from '../store/reducers/NoteSlice'

interface IFolderMenu {
    createFolder: any,
    deleteFolder: any,
    activeFolder: IFolderNotes
}

const FolderMenu: FC<IFolderMenu> = ({ createFolder, deleteFolder, activeFolder }) => {

    const dispatch = useAppDispatch()
    const { renameFolder } = NoteSlice.actions

    return (
        <div>
            <button onClick={createFolder}>Создать папку</button>
            <button onClick={deleteFolder}>Удалить папку</button>
            <input type="text" value={activeFolder.folderTitle} onChange={e => dispatch(renameFolder(e.target.value))} />
        </div>
    )
}

export default FolderMenu