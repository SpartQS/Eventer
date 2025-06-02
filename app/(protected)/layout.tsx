import MainLayout from '@/components/layouts/MainLayout';

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MainLayout>{children}</MainLayout>;
} 