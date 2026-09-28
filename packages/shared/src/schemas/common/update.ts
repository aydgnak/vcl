const updateValidationMessage = {
  emptyUpdate: 'validation.emptyUpdate',
} as const

export type UpdateValidationMessage = typeof updateValidationMessage[keyof typeof updateValidationMessage]

export { updateValidationMessage }
