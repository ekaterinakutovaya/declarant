// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import { Spin } from 'antd';
import DeclarationForm from "./ui/DeclarationForm.tsx";

export type Mode = 'new' | 'view' | 'edit';

interface Props {
    mode: Mode;
}

const DeclarationPage: React.FC<Props> = ({ mode }) => {


    return (
        <Spin spinning={false}>

            <DeclarationForm
                mode={mode}
            />
        </Spin>
    );
};

export default DeclarationPage;
