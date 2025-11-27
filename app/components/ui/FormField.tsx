// app/components/ui/FormField.tsx
import React from 'react';

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, error, required, children, ...props }) => {
  return (
    <div className="form-field" {...props}>
      <label htmlFor={name}>
        {label} {required && <span className="required">*</span>}
      </label>
      {children}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FormField;
