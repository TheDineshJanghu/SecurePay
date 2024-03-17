import { ClockIcon, CurrencyDollarIcon, UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { classNames } from '../../utils/classNames'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { truncate } from '../../utils/string'
require('@solana/wallet-adapter-react-ui/styles.css')
    
const NavMenu = ({ connected, publicKey }) => {
    const menus = [
        {
            icon: ClockIcon,
            item: 'Transactions',
            current: true,
        },
        
        
    ]

    return (
        <nav className="flex flex-1 items-center justify-center">
            <ul className="flex flex-col space-y-10">
                {menus.map(({ icon, item, current, action }, i) => (
                    <NavMenuItem key={i} Icon={icon} item={item} current={current} action={action} />
                ))}
                
                <li>
                    <WalletMultiButton className="phantom-button" startIcon={<UserCircleIcon style={{ height: 24, width: 24, color: '#FFFFFF' }} />}>
                        <span className="text-sm font-semibold text-[#FFFFFF]">{connected ? truncate(publicKey.toString()) : 'Connect Wallet'}</span>
                    </WalletMultiButton>
                    
                </li>
            </ul>   
                    <img src="https://blogger.googleusercontent.com/img/a/AVvXsEgnexGe35Hb2efe6NkKe4w6T83ZSldiubxLscHBsLUGS3q0KEQC5EQ1UEDqkHmwLtDyfdUfcfC8NaMuxusmblqJgr7l_bGHNWQSedbdx0qrpRVv5uhs5zWQe0TaIjS0s5BH6ba8ddO4zj1L5idtBHU857zNGI7bJzitmLKdoYA5Gvhi7ZTTbFPQqoAH5Hc" />
        </nav>
    )
}


const NavMenuItem = ({ Icon, item, current, action }) => {
    return (
        <li onClick={action} className={classNames('flex cursor-pointer space-x-3 transition-all hover:text-gray-100', current ? 'text-white' : 'text-[#FFFFFF]', 'font-semibold')}>
            <Icon className="h-6 w-6 " />
            <span>{item}</span>
        </li>
    )
}

export default NavMenu 
