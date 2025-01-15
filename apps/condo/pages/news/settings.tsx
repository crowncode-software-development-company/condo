import { AccessDeniedPage } from '@condo/domains/common/components/containers/AccessDeniedPage'
import { PageComponentType } from '@condo/domains/common/types'
import {
    NewsReadAndManagePermissionRequired,
} from '@condo/domains/news/components/PageAccess'


const NewsSettingsPage: PageComponentType = () => {
  
    return (
        <AccessDeniedPage/>
    )
}

NewsSettingsPage.requiredAccess = NewsReadAndManagePermissionRequired

export default NewsSettingsPage
