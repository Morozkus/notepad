import React, { FC } from 'react'
import PageButton from './UI/Button/PageButton'
import PageInput from './UI/Input/PageInput'
import { InputWithReloadType } from '../hooks/useInput'
import classes from '../assets/styles/modules/FolderMenu.module.css'
import parseModule from '../hooks/parseModule'

interface IFolderMenu {
    valueFolderNameInput: InputWithReloadType,
    createFolder: React.MouseEventHandler<HTMLButtonElement>,
    deleteFolder: React.MouseEventHandler<HTMLButtonElement>,
}

const FolderMenu: FC<IFolderMenu> = ({ createFolder, deleteFolder, valueFolderNameInput }) => {
    return (
        <div className={parseModule([classes.folderMenu])}>
            <PageButton onClick={createFolder}>Создать папку</PageButton>
            <PageButton onClick={deleteFolder}>Удалить папку</PageButton>
            <PageInput value={valueFolderNameInput.value} onChange={valueFolderNameInput.onChange} />
        </div>
    )
}

export default FolderMenu