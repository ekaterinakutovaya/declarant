// src/pages/Declarations/DeclarationPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin, message } from 'antd';
import DeclarationForm from "./ui/DeclarationForm.tsx";
import type {Declaration} from "../../shared/types/types.ts";

export type Mode = 'new' | 'view' | 'edit';

interface Props {
    mode: Mode;
}

const DeclarationPage: React.FC<Props> = ({ mode }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const readOnly = mode === 'view';

    return (
        <Spin spinning={loading}>

            <DeclarationForm
                mode={mode}
            />
        </Spin>
    );
};

export default DeclarationPage;
