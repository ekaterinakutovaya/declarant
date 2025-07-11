// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { supabase } from "../../api/supabaseClient.ts";
import { Link } from "react-router-dom";
import type {Regime} from "../../types/types.ts";
import type { TableColumnsType } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';

interface RegimesClassifierProps {
  selectedKey: number | null;
  onSelect: (id: number, row: Regime) => void;
  onDoubleSelect: (id: number, row: Regime) => void;
}

export const RegimesClassifier: React.FC<RegimesClassifierProps> = ({
  selectedKey,
  onSelect,
  onDoubleSelect,
}) => {
  const [regimes, setRegimes] = useState<
    {
      id: number;
      code: string;
      name: string;
      type: string;
      regulatory_legal_acts: string;
    }[]
  >([]);

    const [loading, setLoading] = useState<boolean>(false);


    const rowSelection: TableRowSelection<Regime> = {
        type: 'radio',
        selectedRowKeys: selectedKey != null ? [selectedKey] : [],
        onChange: (selectedRowKeys, selectedRows) => {
            onSelect(selectedRowKeys[0] as number, selectedRows[0]);
        },
    };

  // REQUESTS *********************************************
  async function loadRegimes() {
      setLoading(true);
    const { data, error } = await supabase.from("customs_regimes").select("*");
      setLoading(false);
    if (error) {
      console.error("Error loading customs regimes:", error);
    } else if (data) {
      console.log("data", data);
      setRegimes(data);
    }
  }
  // ******************************************************

  useEffect(() => {
    loadRegimes();
  }, []);

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
      <Table
        bordered
        size={"small"}
        className="custom-table"
        columns={columns}
        dataSource={regimes}
        rowKey="id"
        pagination={false}
        loading={loading}
        rowSelection={rowSelection}
        onRow={(record) => ({
            onClick: () => onSelect(record.id, record),
            onDoubleClick: () => onDoubleSelect(record.id, record),
        })}
      />
    </div>
  );
};


// {
//     "formNumber": "ED",
//     "submissionType": "new",
//     "customsRegimeType": "ЭК",
//     "customsRegimeCode": "10",
//     "additionalSheet1": 1,
//     "additionalSheet2": 1,
//     "gTDRegistryNumber": "00101",
//     "exporterName": "\"GREENTECH INNOVATIONS\" MChJ",
//     "exporterAddress": "Jizzax viloyati, Jizzax shahri, Zargarlik ko'chasi, 4-uy, 3-xonadon",
//     "exporterPhone": "99899 999 99 99",
//     "exporterAdditionalInfo": "vfvdfbd",
//     "exporterName2": "sfgnfgn",
//     "exporterInn": "303065161",
//     "importerName": "\"SYNERGY SOLUTIONS\" MChJ",
//     "importerAddress": "Andijon viloyat, Andijon tuman, Qumko'cha MFY, Qumko'cha 91 uy\t",
//     "importerPhone": "99999999999",
//     "importerAdditionalInfo": "sfgnsfgn",
//     "importerName2": "dfbsbbbsd",
//     "importerInn": "123456789",
//     "fillingLocation": "sdfbsdfbdfb",
//     "fillingDate": "2025-07-06T17:06:17.600Z",
//     "gTDNumber": "bfbfbfb",
//     "contractNumberAndDate": "sdfbsdfbds",
//     "declarantPinfl": "11111111111111"
// }