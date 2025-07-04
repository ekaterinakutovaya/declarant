// src/pages/Declarations/DeclarationPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin, message } from 'antd';
import DeclarationForm from "./ui/DeclarationForm.tsx";
import type {Declaration} from "./Declarations.tsx";
// import type { Declaration } from './DeclarationsListPage'; // or wherever your interface lives

export type Mode = 'new' | 'view' | 'edit';

interface Props {
    mode: Mode;
}

const DeclarationPage: React.FC<Props> = ({ mode }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [declaration, setDeclaration] = useState<Declaration>({

    });
    const [loading, setLoading] = useState(false);

    // Load data when viewing or editing
    // useEffect(() => {
    //     if ((mode === 'view' || mode === 'edit') && id) {
    //         setLoading(true);
    //         // TODO: replace with your data‐fetching logic (e.g. Supabase)
    //         fetch(`/api/declarations/${id}`)
    //             .then((res) => res.json())
    //             .then((data: any) => {
    //                 form.setFieldsValue(data);
    //             })
    //             .catch(() => {
    //                 message.error('Не удалось загрузить данные.');
    //             })
    //             .finally(() => setLoading(false));
    //     }
    // }, [mode, id, form]);

    const onFinish = (values: any) => {
        setLoading(true);
        const url = mode === 'new'
            ? '/api/declarations'
            : `/api/declarations/${id}`;
        const method = mode === 'new' ? 'POST' : 'PUT';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        })
            .then(() => {
                message.success(mode === 'new' ? 'Создано!' : 'Сохранено!');
                navigate('/declarations');
            })
            .catch(() => {
                message.error('Ошибка при сохранении.');
            })
            .finally(() => setLoading(false));
    };

    const readOnly = mode === 'view';

    return (
        <Spin spinning={loading}>
            {/*<PageHeader*/}
            {/*    onBack={() => navigate('/declarations')}*/}
            {/*    title={*/}
            {/*        mode === 'new'*/}
            {/*            ? 'Новая декларация'*/}
            {/*            : mode === 'edit'*/}
            {/*                ? `Редактирование декларации ${id}`*/}
            {/*                : `Просмотр декларации ${id}`*/}
            {/*    }*/}
            {/*    extra={[*/}
            {/*        (mode === 'new' || mode === 'edit') && (*/}
            {/*            <Button*/}
            {/*                key="save"*/}
            {/*                type="primary"*/}
            {/*                onClick={() => form.submit()}*/}
            {/*            >*/}
            {/*                {mode === 'new' ? 'Создать' : 'Сохранить'}*/}
            {/*            </Button>*/}
            {/*        ),*/}
            {/*    ]}*/}
            {/*/>*/}

            <DeclarationForm
                mode={mode}
                initialValues={declaration}
                loading={loading}
                onFinish={onFinish}
            />
        </Spin>
    );
};

export default DeclarationPage;
