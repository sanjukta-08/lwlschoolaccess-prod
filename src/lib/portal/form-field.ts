/**
 * Form Builder field contract — identical to the live Application Portal's
 * `FormField`, because both read the same `lwl_site.form_templates.schema`.
 */
export interface FormField {
  id: string;
  db_column: string;
  label: string;
  type: "text" | "email" | "tel" | "date" | "select" | "multiselect" | "textarea" | "number";
  required: boolean;
  placeholder: string;
  help_text: string;
  section: string;
  options: string[];
  half_width?: boolean;
  hidden?: boolean;
  read_only?: boolean;
  max_selections?: number;
  min_selections?: number;
}

export interface PublicFormTemplate {
  id: string;
  name: string;
  slug: string | null;
  program_code: string | null;
  schema: FormField[] | null;
  settings: Record<string, any> | null;
  has_payment: boolean;
  is_active?: boolean;
}
