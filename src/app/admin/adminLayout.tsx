import '../globals.css'
import Header from '../_components/layouts/header';
import CustomSidebar from '../_components/layouts/sidebar';
import Container from '../_components/layouts/container';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CheckUserIsLogin } from '../_utils/auth-utils';

const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const router = useRouter()
    useEffect(() => {
        const isUserLoggedIn = CheckUserIsLogin()
        if (!isUserLoggedIn) {
            router.push("/login")
        }
    }, [router])
    return (
        <>
            <Header></Header>
            <div className="flex bg-gray-100 dark:bg-gray-900">
                <aside className='min-h-screen'>
                    <CustomSidebar></CustomSidebar>
                </aside>
                <Container>
                    {children}
                </Container>
            </div>
        </>
    );
};

export default AdminLayout