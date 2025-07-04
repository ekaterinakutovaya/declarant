import React, { useEffect } from "react";
import {Form, Input, InputNumber, Button, Divider, Typography, Select} from "antd";
import type { FormInstance } from "antd";
import type { Declaration } from "../Declarations.tsx";
import type { Mode } from "../DeclarationPage.tsx";
import {SUBMISSION_TYPE_LABELS, SUBMISSION_TYPES} from "../../../shared/enums/enums.ts";

export interface DeclarationFormProps {
  mode: Mode;
  form: FormInstance<Declaration>;
  initialValues?: Declaration;
  loading: boolean;
  onFinish: (values: Declaration) => void;
}

const { Title } = Typography;

const DeclarationForm: React.FC<DeclarationFormProps> = ({
  mode,
  initialValues,
  loading,
}) => {
  const readOnly = mode === "view";
  const [form] = Form.useForm<Declaration>();

  const submissionOptions = SUBMISSION_TYPES.map((value) => ({
    label: SUBMISSION_TYPE_LABELS[value],
    value,
  }));

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const onFinish = (values: Declaration) => {
    /* ...save logic... */
  };

  return (
    <Form<Declaration>
      form={form}
      layout="horizontal"
      initialValues={{
        formNumber: "ED"
      }}
      onFinish={onFinish}
      disabled={readOnly}
    >
      <div className="flex items-center justify-between">
        <div className="flex item-center gap-2">
          <Title level={4}>Грузовая таможенная декларация №</Title>
          <Form.Item name="formNumber">
            <Input maxLength={10}/>
          </Form.Item>
        </div>
        <div className="flex item-center gap-2">
          <Form.Item name="submissionType" label="Тип подачи">
            <Select className="min-w-[230px]" options={submissionOptions} placeholder="Выберите..."/>
          </Form.Item>
        </div>
      </div>
      <Divider
        style={{
          borderColor: "#4DB6AC",
          marginTop: "0",
        }}
      />
      <Form.Item name="note" label="Примечание" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="type" label="Тип" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="mode" label="Режим" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      {/* …другие поля аналогичным образом… */}

      <Form.Item
        name="paymentAmount"
        label="Сумма платежа"
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      {(mode === "new" || mode === "edit") && (
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {mode === "new" ? "Создать" : "Сохранить"}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default DeclarationForm;
