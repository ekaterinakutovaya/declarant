import { Table, Tabs, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { supabase } from "../../api/supabaseClient.ts";
import { Link } from "react-router-dom";
import type { Individual, LegalEntity, Regime } from "../../types/types.ts";
import type { TableColumnsType } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import type {ColumnsType} from "antd/es/table";

const { TabPane } = Tabs;

interface ParticipantsRefProps {
  selectedKey: number | null;
  onSelect: (id: number, row: Regime) => void;
  onDoubleSelect: (id: number, row: Regime) => void;
}

export const ParticipantsRef: React.FC<ParticipantsRefProps> = ({
  selectedKey,
  onSelect,
  onDoubleSelect,
}) => {
    // State for legal entities
    const [legalEntities, setLegalEntities] = useState<LegalEntity[]>([]);
    const [leLoading, setLeLoading] = useState<boolean>(false);

    // State for individuals
    const [individuals, setIndividuals] = useState<Individual[]>([]);
    const [indLoading, setIndLoading] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    // ***********************************************************************
    const loadLegalEntities = async () => {
        setLeLoading(true);
        const { data, error } = await supabase.from("legal_entities").select("*");
        setLeLoading(false);
        if (error) console.error("Error fetching legal_entities", error);
        else setLegalEntities(data || []);
    };

    const loadIndividuals = async () => {
        setIndLoading(true);
        const { data, error } = await supabase.from("individuals").select("*");
        setIndLoading(false);
        if (error) console.error("Error fetching individuals", error);
        else setIndividuals(data || []);
    };
    // ***********************************************************************


    useEffect(() => {
        loadLegalEntities();
        loadIndividuals();
    }, []);


    // Row selection for legal entities
    const leRowSelection: TableRowSelection<LegalEntity> = {
        type: 'radio',
        selectedRowKeys: selectedKey != null ? [selectedKey] : [],
        onChange: (keys, rows) => {
            onSelect(keys[0], rows[0]);
        },
    };

    // Row selection for individuals
    const indRowSelection: TableRowSelection<Individual> = {
        type: 'radio',
        selectedRowKeys: selectedKey != null ? [selectedKey] : [],
        onChange: (keys, rows) => {
            onSelect(keys[0], rows[0]);
        },
    };

    // Columns for legal_entities
    const leColumns: ColumnsType<LegalEntity> = [
        { title: "ИНН", dataIndex: "inn", key: "inn", width: 80, className: "cursor-pointer", },
        { title: "ОКПО", dataIndex: "okpo", key: "okpo", width: 80, className: "cursor-pointer", },
        { title: "Район", dataIndex: "region", key: "region", width: "15%", className: "cursor-pointer", },
        { title: "Наименование", dataIndex: "name", key: "name", width: "25%", className: "cursor-pointer", },
        { title: "Адрес", dataIndex: "address", key: "address", width: "25%", className: "cursor-pointer", },
        { title: "Руководитель", dataIndex: "director", key: "director", width: "15%", className: "cursor-pointer", },
        { title: "Телефон", dataIndex: "phone", key: "phone", width: "15%", className: "cursor-pointer",  },
        {
            title: "Детали",
            key: "details",
            render: (_, record) => (
                // <Tooltip title="Просмотреть" placement="bottom">
                    <Link to={`/reference/legal_entities/${record.id}`}>Открыть</Link>
                // </Tooltip>
            ),
        },
    ];

    // Columns for individuals
    const indColumns: ColumnsType<Individual> = [
        { title: "PINFL", dataIndex: "pinfl", key: "pinfl" },
        { title: "ФИО", dataIndex: "full_name", key: "full_name" },
        { title: "Адрес", dataIndex: "address", key: "address" },
        { title: "Телефон", dataIndex: "phone", key: "phone" },
        {
            title: "Детали",
            key: "details",
            render: (_, record) => (
                <Tooltip title="Просмотреть" placement="bottom">
                    <Link to={`/reference/individuals/${record.id}`}>Открыть</Link>
                </Tooltip>
            ),
        },
    ];

  const columns: TableColumnsType<Regime> = [
    {
      key: "type",
      dataIndex: "type",
      title: "Тип",
      className: "cursor-pointer",
    },
    {
      key: "code",
      dataIndex: "code",
      title: "Код",
      className: "cursor-pointer",
    },
    {
      key: "name",
      dataIndex: "name",
      title: "Наименование",
      className: "cursor-pointer",
    },
    {
      key: "regulatory_legal_acts",
      dataIndex: "regulatory_legal_acts",
      title: "НПА",
      className: "font-semibold",
      render: (text: string, record: Regime) => {
        return (
          <Tooltip title="Смотреть" placement="bottom">
            <Link
              key={record.regulatory_legal_acts}
              to={"#"}
              onClick={(e) => {
                // prevent row click when NPA link is clicked
                e.stopPropagation();
              }}
            >
              {text}
            </Link>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <div className="">
        <Tabs defaultActiveKey="legal">
            <TabPane tab="Юридические лица" key="legal">
                <Table<LegalEntity>
                    className="custom-table"
                    bordered
                    size="small"
                    loading={leLoading}
                    columns={leColumns}
                    dataSource={legalEntities}
                    rowKey="id"
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                    rowSelection={leRowSelection}
                    onRow={(record) => ({
                        onClick: () => onSelect(record.id, record),
                        onDoubleClick: () => onDoubleSelect(record.id, record),
                    })}
                />
            </TabPane>

            <TabPane tab="Физические лица" key="individuals">
                <Table<Individual>
                    bordered
                    size="small"
                    loading={indLoading}
                    columns={indColumns}
                    dataSource={individuals}
                    rowKey="id"
                    pagination={false}
                    rowSelection={indRowSelection}
                    onRow={(record) => ({
                        onClick: () => onSelect(record.id, record),
                        onDoubleClick: () => onDoubleSelect(record.id, record),
                    })}
                />
            </TabPane>
        </Tabs>
      {/*<Table*/}
      {/*  bordered*/}
      {/*  size={"small"}*/}
      {/*  className="custom-table"*/}
      {/*  columns={columns}*/}
      {/*  dataSource={[]}*/}
      {/*  rowKey="id"*/}
      {/*  pagination={false}*/}
      {/*  loading={loading}*/}
      {/*  rowSelection={rowSelection}*/}
      {/*  onRow={(record) => ({*/}
      {/*      onClick: () => onSelect(record.id, record),*/}
      {/*      onDoubleClick: () => onDoubleSelect(record.id, record),*/}
      {/*  })}*/}
      {/*/>*/}
    </div>
  );
};
