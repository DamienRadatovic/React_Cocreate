import { createBrowserRouter, redirect } from 'react-router-dom';
import Layout from '@/components/layout/Layout.tsx';
import Projects from '@/pages/projects/Projects.tsx';
import Project from '@/pages/project/Project.tsx';
import Login from '@/pages/login/Login.tsx';
import { ProtectedRoute } from '@/pages/ProtectedRoute.tsx';
import ProjectProvider from '@/contexts/project.context.tsx';
import ProjectsProvider from '@/contexts/projects.context.tsx';
import Page404 from '@/pages/page404/Page404.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute element={<Layout />} />,
        children: [
            {
                index: true,
                loader: async () => redirect('/projects'),
            },
            {
                path: '/projects',
                element: <ProjectsProvider><Projects /></ProjectsProvider>,
            },
            {
                path: '/projects/:id',
                element: <ProjectProvider><Project /></ProjectProvider>,
            },
        ]
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '*',
        element: <Page404 />,
    },
]);
