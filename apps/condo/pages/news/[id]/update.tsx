import React from 'react'

import { AccessDeniedPage } from '@condo/domains/common/components/containers/AccessDeniedPage'
import { PageComponentType } from '@condo/domains/common/types'
import { NewsReadAndManagePermissionRequired } from '@condo/domains/news/components/PageAccess'

const UpdateNewsPage: PageComponentType = () => {
    return <AccessDeniedPage/>
}

UpdateNewsPage.requiredAccess = NewsReadAndManagePermissionRequired

export default UpdateNewsPage
