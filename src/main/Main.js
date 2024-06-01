import React from 'react';
import Nav from '../shared/Nav';
import { Outlet } from 'react-router-dom';
import { MetaMaskProvider } from '../context-api/MetaMaskContext';

const Main = () => {
    return (
        <div>
            <MetaMaskProvider>
            <Nav></Nav>
            <Outlet></Outlet>
            </MetaMaskProvider>
        </div>
    );
};

export default Main;