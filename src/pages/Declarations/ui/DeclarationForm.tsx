import React, {type ReactNode, useEffect, useState} from "react";
import {
  Form,
  Input,
  Button,
  Divider,
  Typography,
  Select,
  Tooltip,
  Modal,
} from "antd";
import type { Mode } from "../DeclarationPage.tsx";
import {
  SUBMISSION_TYPE_LABELS,
  SUBMISSION_TYPES,
} from "../../../shared/enums/enums.ts";
import { supabase } from "../../../shared/api/supabaseClient.ts";
import { BookOpenText } from "lucide-react";
import { RegimesClassifier } from "../../../shared/components/classifiers/RegimesClassifier.tsx";
import type {Declaration} from "../../../shared/types/types.ts";

export interface DeclarationFormProps {
  mode: Mode;
}

const { Title } = Typography;

const DeclarationForm: React.FC<DeclarationFormProps> = ({
  mode
}) => {
  const readOnly = mode === "view";
  const [form] = Form.useForm<Declaration>();

  const [selectedRegimeId, setSelectedRegimeId] = useState<number | null>(null);
  // const [selectedRegime, setSelectedRegime] = useState<{
  //   id: number;
  //   code: string;
  //   name: string;
  //   type: string;
  //   regulatory_legal_acts: string;
  // } | null>(null);

  const [regimesClassifierOpen, setRegimesClassifierOpen] = useState(false);

  // REQUESTS *********************************************
  async function loadRegimes() {
    const { data, error } = await supabase
      .from("customs_regimes")
      .select("id, code, name, type");
    // .order("code", { ascending: true });
    if (error) {
      console.error("Error loading customs regimes:", error);
    } else if (data) {
      setRegimesOptions(
        data.map((r) => ({
          value: r.id,
          label: <div className="flex items-center"><div className=" min-w-[30px]">{`${r.type}`}</div>{`${r.code}   — ${r.name}`}</div>,
        })),
      );
    }
  }
  // ******************************************************

  const [regimesOptions, setRegimesOptions] = useState<
    { label: ReactNode; value: number | string }[]
  >([]);

  useEffect(() => {
    loadRegimes();
  }, []);

  const submissionOptions = SUBMISSION_TYPES.map((value) => ({
    label: SUBMISSION_TYPE_LABELS[value],
    value,
  }));

  const onFinish = () => {
    /* ...save logic... */
  };

  const handleSelectAndClose = () => {
    if (selectedRegimeId != null) {
      form.setFieldsValue({ declarationType: selectedRegimeId });
      setRegimesClassifierOpen(false);
    }
  };

  return (
    <>
      <Form<Declaration>
        form={form}
        layout="horizontal"
        initialValues={{
          formNumber: "ED",
          submissionType: "new",
        }}
        onFinish={onFinish}
        disabled={readOnly}
      >
        <div className="flex items-center justify-between">
          <div className="flex item-center gap-2">
            <Title level={4}>Грузовая таможенная декларация №</Title>
            <Form.Item name="formNumber">
              <Input maxLength={10} />
            </Form.Item>
          </div>
          <div className="flex item-center gap-2">
            <Form.Item name="submissionType" label="Тип подачи">
              <Select
                className="min-w-[220px]"
                options={submissionOptions}
                placeholder="Выберите..."
              />
            </Form.Item>
          </div>
        </div>
        <Divider
          style={{
            borderColor: "#4DB6AC",
            marginTop: "0",
          }}
        />

        <div className="w-full">
          <div className="w-1/2 flex gap-2">
            <Form.Item name="declarationType" label="1. Тип декларации">
              <Select
                className="min-w-[400px]"
                options={regimesOptions}
              />
            </Form.Item>
            <div>
              <Tooltip title="Справочник" placement="bottom">
                <Button
                  onClick={() => setRegimesClassifierOpen(true)}
                  type="text"
                  className="!text-primary flex items-center justify-center"
                  icon={<BookOpenText className="w-5 h-5 align-middle mt-1" />}
                ></Button>
              </Tooltip>
            </div>
          </div>
          <div className="w-1/2"><Form.Item name="exporter" label="2. Экспортер/грузоотправитель">
            <Select
                className="min-w-[400px]"
                options={regimesOptions}
            />
          </Form.Item></div>
        </div>
      </Form>

      <Modal
        open={regimesClassifierOpen}
        title="Справочник таможенных режимов"
        width={750}
        onCancel={() => setRegimesClassifierOpen(false)}
        onOk={handleSelectAndClose}
        okText="Выбрать"
        cancelText="Отмена"
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <RegimesClassifier
            selectedKey={selectedRegimeId}         // controlled selected key
            onSelect={(id: number) => {               // single click only selects
              setSelectedRegimeId(id);
            }}
            onDoubleSelect={(id: number) => {         // double click selects & closes
              setSelectedRegimeId(id);
              handleSelectAndClose();
            }}
        />
      </Modal>
    </>
  );
};

export default DeclarationForm;
