import React from 'react'
import { FILE_TYPES } from 'utils/constants/constant';
import { toCapitalize } from 'utils/helpers'
import { NoData } from 'reusable';
import Icon from '@mdi/react';
import { mdi } from '@mdi/js'
const RepositoryFiles = (props) => {
    const { match } = props
    const fileType = toCapitalize(match.params.type)
    const results = FILE_TYPES.filter(el => el.name === fileType)
    const extenstions = results.length ? results[0].extensions : []
    const files = [
        {
            filename: "",
            uploader: "",
            description: "",
            date_uploaded: ""
        }
    ]
    return (
        !extenstions.length ?
            <NoData title="No files found" /> :
            <p>{JSON.stringify(extenstions)}</p>
    )
}

export default RepositoryFiles; 