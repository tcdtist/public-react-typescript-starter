import React from 'react'

import { get } from 'lodash-es'
import { Controller, useFormContext } from 'react-hook-form'

import { VALIDATION_MESSAGES } from '@/shared/constants/validation'
import { cn } from '@/shared/utils/functions'

import { Checkbox } from './Checkbox'
import { DatePicker } from './DatePicker'
import { Description, Helper, Label } from './FormText'
import { Input } from './Input'
import { InputNumber } from './InputNumber'
import { InputPassword } from './InputPassword'
import { Radio } from './Radio'
import { Select } from './Select'
import { TextArea } from './TextArea'

interface BaseFormItemProps {
  children?: React.ReactElement
  name?: string
  label?: string
  description?: string
  helper?: string
  rules?: Record<string, unknown>
  required?: boolean
  optional?: boolean

  // ClassName
  wrapperClassName?: string
  labelClassName?: string
  descriptionClassName?: string
  helperClassName?: string
  innerClassName?: string

  // Extra props
  hideError?: boolean
  [key: string]: unknown
}

const BaseFormItem = ({
  children,
  name,
  label,
  description,
  helper,
  rules,
  required,
  optional,

  // ClassName
  wrapperClassName,
  labelClassName,
  descriptionClassName,
  helperClassName,
  innerClassName,

  // Extra props
  hideError = false,
  ...props
}: BaseFormItemProps) => {
  const id = React.useId()
  const { control, formState } = useFormContext() || {}

  if (!control) {
    throw new Error('FormItem must be used within a form with FormProvider or useFormContext')
  }

  const getErrorMessage = (fieldState: { error?: { message?: string } }) => {
    const errorFieldState = fieldState.error?.message

    if (errorFieldState) {
      return errorFieldState
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorFormState = get(formState.errors, name || '') as any
    return errorFormState?.message || ''
  }

  return (
    <Controller
      rules={{
        ...(required ? { required: VALIDATION_MESSAGES.REQUIRED_FIELD(label) } : {}),
        ...rules,
      }}
      name={name || ''}
      control={control}
      render={({ field, fieldState }) => {
        const { ref, ...fieldRest } = field
        const errorMessage = !hideError ? getErrorMessage(fieldState) : ''

        return (
          <div className={cn('space-y-2', wrapperClassName)}>
            {!!label && (
              <Label
                htmlFor={id}
                required={required}
                optional={optional}
                className={labelClassName}
              >
                {label}
              </Label>
            )}

            {!!description && (
              <Description className={descriptionClassName}>{description}</Description>
            )}

            <div className={cn('relative', innerClassName)}>
              {children &&
                React.cloneElement(children, {
                  id,
                  ...fieldRest,
                  ...props,
                  ref,
                  error: errorMessage,
                })}
            </div>

            {errorMessage && (
              <p className="animate-fade-in text-sm font-medium text-destructive">{errorMessage}</p>
            )}

            {!!helper && <Helper className={helperClassName}>{helper}</Helper>}
          </div>
        )
      }}
    />
  )
}

// Sub-components with proper typing
interface FormItemInputProps extends Omit<BaseFormItemProps, 'children'> {
  type?: string
  placeholder?: string
}
const FormItemInput: React.FC<FormItemInputProps> = (props) => (
  <BaseFormItem {...props}>
    <Input />
  </BaseFormItem>
)

interface FormItemInputNumberProps extends Omit<BaseFormItemProps, 'children'> {
  placeholder?: string
  min?: number
  max?: number
}
const FormItemInputNumber: React.FC<FormItemInputNumberProps> = (props) => (
  <BaseFormItem {...props}>
    <InputNumber />
  </BaseFormItem>
)

interface FormItemInputPasswordProps extends Omit<BaseFormItemProps, 'children'> {
  placeholder?: string
}
const FormItemInputPassword: React.FC<FormItemInputPasswordProps> = (props) => (
  <BaseFormItem {...props}>
    <InputPassword />
  </BaseFormItem>
)

interface FormItemTextAreaProps extends Omit<BaseFormItemProps, 'children'> {
  placeholder?: string
  rows?: number
}
const FormItemTextArea: React.FC<FormItemTextAreaProps> = (props) => (
  <BaseFormItem {...props}>
    <TextArea />
  </BaseFormItem>
)

interface FormItemSelectProps extends Omit<BaseFormItemProps, 'children'> {
  options: { value: string; label: string; disabled?: boolean }[]
  placeholder?: string
}
const FormItemSelect: React.FC<FormItemSelectProps> = (props) => (
  <BaseFormItem {...props}>
    <Select options={props.options} />
  </BaseFormItem>
)

type FormItemCheckboxProps = Omit<BaseFormItemProps, 'children'>
const FormItemCheckbox: React.FC<FormItemCheckboxProps> = (props) => (
  <BaseFormItem {...props}>
    <Checkbox />
  </BaseFormItem>
)

type FormItemRadioProps = Omit<BaseFormItemProps, 'children'>
const FormItemRadio: React.FC<FormItemRadioProps> = (props) => (
  <BaseFormItem {...props}>
    <Radio />
  </BaseFormItem>
)

interface FormItemDatePickerProps extends Omit<BaseFormItemProps, 'children'> {
  showTime?: boolean
  format?: string
}
const FormItemDatePicker: React.FC<FormItemDatePickerProps> = (props) => (
  <BaseFormItem {...props}>
    <DatePicker />
  </BaseFormItem>
)

// Main FormItem with sub-components
export const FormItem = Object.assign(BaseFormItem, {
  Input: FormItemInput,
  InputNumber: FormItemInputNumber,
  InputPassword: FormItemInputPassword,
  TextArea: FormItemTextArea,
  Select: FormItemSelect,
  Checkbox: FormItemCheckbox,
  Radio: FormItemRadio,
  DatePicker: FormItemDatePicker,
})

// Export individual text components
export const FormLabel = Label
export const FormDescription = Description
export const FormHelper = Helper
