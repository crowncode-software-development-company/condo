import React from 'react'

import { AccessDeniedPage } from '@condo/domains/common/components/containers/AccessDeniedPage'
import { PageComponentType } from '@condo/domains/common/types'
import { OrganizationRequired } from '@condo/domains/organization/components/OrganizationRequired'


const MiniAppIndexPage: PageComponentType = () => {
    return  <AccessDeniedPage />
}

MiniAppIndexPage.requiredAccess = OrganizationRequired

export default MiniAppIndexPage
