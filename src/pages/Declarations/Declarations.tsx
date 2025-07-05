import {Button, Divider, Typography, Table} from "antd";
// import type { TableColumnsType } from 'antd';
// import { createStyles } from 'antd-style';
import type { ColumnsType } from 'antd/es/table';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import type {Declaration} from "../../shared/types/types.ts";

const {Title} = Typography;

const Declarations = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<Declaration[]>([]);

    const columns: ColumnsType<Declaration> = [
        { title: 'Примечание',          dataIndex: 'note',            key: 'note',            width: 150, align: 'center' },
        { title: 'Тип',                dataIndex: 'type',            key: 'type',            width: 100, align: 'center' },
        { title: 'Режим',              dataIndex: 'customsRegime',            key: 'customsRegime',            width: 100, align: 'center' },
        { title: '№ бланка',           dataIndex: 'formNumber',      key: 'formNumber',      width: 120, align: 'center' },
        { title: '№ ГТД',              dataIndex: 'gtdNumber',       key: 'gtdNumber',       width: 120, align: 'center' },
        { title: 'Пост',               dataIndex: 'customsPost',            key: 'customsPost',            width: 80, align: 'center'  },
        { title: 'Дата рег.ГТД',       dataIndex: 'gtdRegDate',      key: 'gtdRegDate',      width: 130, align: 'center' },
        { title: 'Рег. № ГТД',         dataIndex: 'gtdRegNumber',    key: 'gtdRegNumber',    width: 130, align: 'center' },
        { title: 'Дата',               dataIndex: 'date',            key: 'date',            width: 110, align: 'center' },
        { title: 'Экспортер',          dataIndex: 'exporter',        key: 'exporter',        width: 180, align: 'center' },
        { title: 'Импортер',           dataIndex: 'importer',        key: 'importer',        width: 180, align: 'center' },
        { title: 'Страна отпр.',       dataIndex: 'countryOrigin',   key: 'countryOrigin',   width: 130, align: 'center' },
        { title: 'Страна назн.',       dataIndex: 'countryDestination', key: 'countryDestination', width: 130, align: 'center' },
        { title: 'Усл. пост.',         dataIndex: 'serviceConditions',     key: 'serviceConditions',     width: 100, align: 'center' },
        { title: 'Мест',               dataIndex: 'places',          key: 'places',          width: 80,   align: 'center' },
        { title: 'Количество',         dataIndex: 'quantity',        key: 'quantity',        width: 100,  align: 'center' },
        { title: '№ Договора',         dataIndex: 'contractNumber',  key: 'contractNumber',  width: 150, align: 'center' },
        { title: 'Код товара',         dataIndex: 'productCode',     key: 'productCode',     width: 120, align: 'center' },
        { title: 'Детал. товара',      dataIndex: 'productDetail',   key: 'productDetail',   ellipsis: true },
        { title: 'Сумма плетеж.',       dataIndex: 'paymentAmount',   key: 'paymentAmount',   width: 120,  align: 'center' },
        { title: 'Там. стоим.',        dataIndex: 'customsValue',    key: 'customsValue',    width: 120,  align: 'center' },
        { title: 'Фактур. стоимость',  dataIndex: 'invoiceValue',    key: 'invoiceValue',    width: 140,  align: 'center' },
        { title: 'Брутто',             dataIndex: 'grossWeight',     key: 'grossWeight',     width: 100,  align: 'center' },
        { title: 'Нетто',              dataIndex: 'netWeight',       key: 'netWeight',       width: 100,  align: 'center' },
        { title: 'КТД',                dataIndex: 'ktd',             key: 'ktd',             width: 100, align: 'center' },
        { title: 'Курс Долл. США',     dataIndex: 'usdRate',         key: 'usdRate',         width: 120,  align: 'center' },
        { title: 'Грф. 2 ИНН',         dataIndex: 'graph2Inn',       key: 'graph2Inn',       width: 130, align: 'center' },
        { title: 'Грф. 8 ИНН',         dataIndex: 'graph8Inn',       key: 'graph8Inn',       width: 130, align: 'center' },
    ];

    const onCreate = () => {
        navigate("/declarations/new")
    }


    return (
        <div>
            <Title level={3}>Список деклараций</Title>
            <Divider
                style={{
                    borderColor: "#4DB6AC",
                    marginTop: "0",
                }}
            />


            <div className="w-full text-end my-4">
                <Button type="primary" onClick={onCreate}>
                    + Создать
                </Button>
            </div>


            {/*  Declarations Table  */}
            <Table<Declaration>
                columns={columns}
                dataSource={data}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                scroll={{ x: 'max-content' }}
                bordered
                className="custom-table w-full"
            />
        </div>
    );
};

export default Declarations;