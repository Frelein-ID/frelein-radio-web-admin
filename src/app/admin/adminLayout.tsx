import '../globals.css'
import Header from '../_components/layouts/header';
import CustomSidebar from '../_components/layouts/sidebar';
import Container from '../_components/layouts/container';
import NextNProgress from 'nextjs-progressbar';

const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <NextNProgress></NextNProgress>
            <Header></Header>
            <div className="flex">
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