type FieldType = "input" | "textarea" | "select" | "radio" | "checkbox";

export interface FormField {
  label: string;
  name: string;
  type: FieldType;
  placeholder?: string;
  rules?: any[];
  options?: { label: string; value: string }[]; // for select, radio, checkbox
  inputType?: "text" | "email" | "password"; // 👈 new! for <Input>
}

export interface ReusableFormProps {
  fields: FormField[];
  initialValues?: Record<string, any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
  submitText?: string;
}
