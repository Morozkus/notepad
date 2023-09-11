import React, { FC } from 'react'
import { InputWithReloadType } from '../hooks/useInput'
import classes from '../assets/styles/modules/NoteArea.module.css'
import folderClasses from '../assets/styles/modules/FolderPage.module.css'

interface NoteAreaProps {
    valueTextArea: InputWithReloadType,
    isActiveNote: boolean
}

const NoteArea: FC<NoteAreaProps> = ({valueTextArea, isActiveNote}) => {
    return (
        <div className={folderClasses.textArea}>
            <textarea
                className={classes.textAreaInput}
                name={classes.textAreaInput}
                id={classes.textAreaInput}
                value={valueTextArea.value}
                onChange={valueTextArea.onChange}
                disabled={!isActiveNote}>
            </textarea>
        </div>
    )
}

export default NoteArea