import { AccessDeniedPage } from '@condo/domains/common/components/containers/AccessDeniedPage'
import { PageComponentType } from '@condo/domains/common/types'
import { NewsReadPermissionRequired } from '@condo/domains/news/components/PageAccess'

const NewsPage: PageComponentType = () => {
    return (
        <AccessDeniedPage/>
    )
}

NewsPage.requiredAccess = NewsReadPermissionRequired

export default NewsPage
