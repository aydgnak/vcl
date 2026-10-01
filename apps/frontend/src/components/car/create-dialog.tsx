'use client'

import type { FieldPath } from 'react-hook-form'
import type { CreateCarI, CreateCarO } from 'shared/schemas'
import type { ValidationMessage } from 'shared/schemas/messages'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { PlusIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { createCarSchema } from 'shared/schemas'
import { Spinner } from '@/components//ui/spinner'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useCarCreate } from '@/hooks/car/use-car-create'

const formID = 'car-create-form'

type FormField = {
  name: FieldPath<CreateCarI>
} & Pick<
  React.ComponentProps<'input'>,
  'type' | 'min' | 'max' | 'step'
>

const fields: FormField[] = [
  { name: 'plate' },
  { name: 'brand' },
  { name: 'model' },
  { name: 'modelYear', type: 'number', min: 1900, step: 1, max: 2100 },
]

export function CarCreateDialog() {
  const [open, setOpen] = useState(false)
  const { trigger, isMutating, error, reset } = useCarCreate()
  const t = useTranslations()
  const form = useForm<CreateCarI, unknown, CreateCarO>({
    resolver: valibotResolver(createCarSchema),
    defaultValues: {
      plate: '',
      brand: '',
      model: '',
      modelYear: '',
    },
  })

  async function onSubmit(data: CreateCarO) {
    try {
      await trigger(data)
      setOpen(false)
    }
    catch {}
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={(open) => {
        if (!open) {
          form.reset()
          reset()
        }
      }}
      disablePointerDismissal
    >
      <DialogTrigger render={<Button><PlusIcon /></Button>} />
      <DialogContent className="sm:max-w-md" showCloseButton={!isMutating}>
        <DialogHeader>
          <DialogTitle>{t('car.create.title')}</DialogTitle>
          <DialogDescription>{t('car.create.description')}</DialogDescription>
        </DialogHeader>
        <Separator />
        <form
          id={formID}
          noValidate
          onSubmitCapture={reset}
          onSubmit={event => void form.handleSubmit(onSubmit)(event)}
        >
          <FieldGroup>
            {fields.map(({ name: fieldName, ...inputProps }) => (
              <Controller
                key={fieldName}
                name={fieldName}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm" htmlFor={field.name}>
                      {t(`car.fields.${fieldName}.label`)}
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        {...inputProps}
                        id={field.name}
                        className="text-sm md:text-sm"
                        aria-invalid={fieldState.invalid}
                        placeholder={t(`car.fields.${fieldName}.placeholder`)}
                        autoComplete="off"
                      />
                    </div>
                    {fieldState.error && (
                      <FieldError>{t(fieldState.error.message as ValidationMessage)}</FieldError>
                    )}
                  </Field>
                )}
              />
            ))}
          </FieldGroup>
        </form>
        {error && (
          <>
            <Separator />
            <Alert variant="destructive" className="border-0 p-0">
              <AlertDescription>
                {error.response?.data.message ?? error.message}
              </AlertDescription>
            </Alert>
          </>
        )}
        <Separator />
        <DialogFooter>
          <DialogClose
            disabled={isMutating}
            render={(<Button variant="outline">{t('car.actions.cancel')}</Button>)}
          />
          <Button
            form={formID}
            type="submit"
            disabled={isMutating}
          >
            {isMutating && <Spinner />}
            {t('car.actions.save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
