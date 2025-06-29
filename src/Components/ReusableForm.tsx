import React, { useEffect } from "react";
import { Form, Input, Select, Radio, Checkbox, Button } from "antd";
import type { ReusableFormProps } from "../Interface/ReusableFormInterface";

export const ReusableForm: React.FC<ReusableFormProps> = ({
  fields,
  initialValues,
  onSubmit,
  onCancel,
  submitText = "Submit",
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleFinish = (values: any) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={initialValues}
    >
      {fields.map((field) => (
        <Form.Item
          key={field.name}
          label={field.label}
          name={field.name}
          rules={field.rules}
        >
          {field.type === "input" && (
            <Input
              placeholder={field.placeholder}
              type={field.inputType || "text"} // 👈 smart default
            />
          )}

          {field.type === "textarea" && (
            <Input.TextArea placeholder={field.placeholder} />
          )}

          {field.type === "select" && (
            <Select placeholder={field.placeholder}>
              {field.options?.map((opt) => (
                <Select.Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Select.Option>
              ))}
            </Select>
          )}

          {field.type === "radio" && (
            <Radio.Group>
              {field.options?.map((opt) => (
                <Radio key={opt.value} value={opt.value}>
                  {opt.label}
                </Radio>
              ))}
            </Radio.Group>
          )}

          {field.type === "checkbox" && (
            <Checkbox.Group options={field.options} />
          )}
        </Form.Item>
      ))}

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" htmlType="submit">
          {submitText}
        </Button>
      </div>
    </Form>
  );
};
