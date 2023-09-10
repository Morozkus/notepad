import React, {FC} from 'react'
import { InputWithReloadType } from '../hooks/useInput'
import classes from '../assets/styles/modules/FolderInputContainer.module.css'
import PageInput from './UI/Input/PageInput'

interface FolderInputContainerProps {
    valueFolderNameInput: InputWithReloadType,
}

const FolderInputContainer: FC<FolderInputContainerProps> = ({valueFolderNameInput}) => {
    return (
        <PageInput
            className={classes.addNotePanelItem}
            value={valueFolderNameInput.value}
            onChange={valueFolderNameInput.onChange}
        />
    )
}

export default FolderInputContainer