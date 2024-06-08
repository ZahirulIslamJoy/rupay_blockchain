import React from 'react';
import Nav from '../shared/Nav';
import { Outlet } from 'react-router-dom';
import { MetaMaskProvider } from '../context-api/MetaMaskContext';
import { AuthProvider } from '../context-api/AuthContext';

const Main = () => {
    return (
        <div>
            <MetaMaskProvider>
            <AuthProvider>
            <Nav></Nav>
            <Outlet></Outlet>
            </AuthProvider>
            </MetaMaskProvider>
        </div>
    );
};

export default Main;