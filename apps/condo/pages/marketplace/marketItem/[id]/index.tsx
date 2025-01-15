import { AccessDeniedPage } from '@condo/domains/common/components/containers/AccessDeniedPage'
import { PageComponentType } from '@condo/domains/common/types'
import { MarketItemReadPermissionRequired } from '@condo/domains/marketplace/components/PageAccess'

const MarketItemIdPage: PageComponentType = () => {
    return (
        <AccessDeniedPage/>
    )
}

MarketItemIdPage.requiredAccess = MarketItemReadPermissionRequired

export default MarketItemIdPage
