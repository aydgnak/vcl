'use client'

import type { RemovePasswordI, SetPasswordI, UpdatePasswordI } from 'schemas'
import type { SettingsTab } from '@/components/settings-tabs'
import type { Locale } from '@/i18n/config'
import { Alert, Button, FieldError, Form, Input, Label, ListBox, Select, Spinner, TextField } from '@heroui/react'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { removePasswordSchema, setPasswordSchema, updatePasswordSchema } from 'schemas'
import { getSettingsTabPath } from '@/components/settings-tabs'
import { isLocale, localeMeta, locales } from '@/i18n/config'
import { useI18n } from '@/i18n/use-i18n'

type ThemeMode = 'system' | 'light' | 'dark'

interface ErrorResponseBody {
  message?: string | string[]
}

interface SecurityState {
  hasPassword: boolean
  providerCount: number
  providers: string[]
}

const TRAILING_SLASH_REGEX = /\/+$/

function getApiBaseUrl() {
  // eslint-disable-next-line node/prefer-global/process
  const configured = process.env.NEXT_PUBLIC_API_URL

  if (configured !== undefined && configured.length > 0)
    return configured.replace(TRAILING_SLASH_REGEX, '')

  return 'http://localhost:8000'
}

const API_BASE_URL = getApiBaseUrl()

function isThemeMode(value: string): value is ThemeMode {
  return value === 'system' || value === 'light' || value === 'dark'
}

async function getErrorMessage(response: Response) {
  const payload = await response.json().catch(() => null) as ErrorResponseBody | null
  const message = payload?.message

  if (typeof message === 'string' && message.length > 0)
    return message

  if (Array.isArray(message) && typeof message[0] === 'string' && message[0].length > 0)
    return message[0]

  return null
}

async function setLocale(locale: Locale) {
  const response = await fetch('/api/locale', {
    body: JSON.stringify({ locale }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  if (!response.ok)
    throw new Error('Failed to update locale')
}

async function getSecurityState() {
  const response = await fetch(`${API_BASE_URL}/users/me/security`, {
    cache: 'no-store',
    credentials: 'include',
  })

  if (!response.ok)
    throw new Error((await getErrorMessage(response)) ?? 'Failed to fetch security status')

  const payload = await response.json().catch(() => null) as Partial<SecurityState> | null

  if (typeof payload?.hasPassword !== 'boolean')
    throw new Error('Invalid security state payload')

  const providers = Array.isArray(payload.providers)
    ? payload.providers.filter((provider): provider is string => typeof provider === 'string')
    : []

  const providerCount = typeof payload.providerCount === 'number' ? payload.providerCount : providers.length

  return {
    hasPassword: payload.hasPassword,
    providers,
    providerCount,
  } satisfies SecurityState
}

async function postSecurityAction(path: string, body: object) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    body: JSON.stringify(body),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  if (!response.ok)
    throw new Error((await getErrorMessage(response)) ?? 'Security action failed')
}

function getProviderLabel(provider: string, t: (key: string) => string) {
  const key = `settings.security.providers.${provider.toLowerCase()}`
  const translated = t(key)

  return translated === key ? provider : translated
}

export function SettingsPanel({ activeTab }: { activeTab: SettingsTab }) {
  const { locale, t } = useI18n()
  const router = useRouter()
  const { setTheme, theme } = useTheme()
  const [isLocalePending, startLocaleTransition] = useTransition()
  const [isSecurityLoading, setIsSecurityLoading] = useState(true)
  const [languageSearchQuery, setLanguageSearchQuery] = useState('')
  const [securityState, setSecurityState] = useState<SecurityState | null>(null)
  const [securityLoadError, setSecurityLoadError] = useState<string | null>(null)
  const [setPasswordSuccess, setSetPasswordSuccess] = useState<string | null>(null)
  const [updatePasswordSuccess, setUpdatePasswordSuccess] = useState<string | null>(null)
  const [removePasswordSuccess, setRemovePasswordSuccess] = useState<string | null>(null)

  const setPasswordResolver = useMemo(() => {
    return valibotResolver(setPasswordSchema, { lang: locale })
  }, [locale])

  const updatePasswordResolver = useMemo(() => {
    return valibotResolver(updatePasswordSchema, { lang: locale })
  }, [locale])

  const removePasswordResolver = useMemo(() => {
    return valibotResolver(removePasswordSchema, { lang: locale })
  }, [locale])

  const {
    clearErrors: clearSetPasswordErrors,
    formState: { errors: setPasswordErrors, isSubmitting: isSettingPassword },
    handleSubmit: handleSetPasswordSubmit,
    register: registerSetPassword,
    reset: resetSetPassword,
    setError: setSetPasswordError,
  } = useForm<SetPasswordI>({
    defaultValues: {
      newPassword: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: setPasswordResolver,
  })

  const {
    clearErrors: clearUpdatePasswordErrors,
    formState: { errors: updatePasswordErrors, isSubmitting: isUpdatingPassword },
    handleSubmit: handleUpdatePasswordSubmit,
    register: registerUpdatePassword,
    reset: resetUpdatePassword,
    setError: setUpdatePasswordError,
  } = useForm<UpdatePasswordI>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: updatePasswordResolver,
  })

  const {
    clearErrors: clearRemovePasswordErrors,
    formState: { errors: removePasswordErrors, isSubmitting: isRemovingPassword },
    handleSubmit: handleRemovePasswordSubmit,
    register: registerRemovePassword,
    reset: resetRemovePassword,
    setError: setRemovePasswordError,
  } = useForm<RemovePasswordI>({
    defaultValues: {
      currentPassword: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: removePasswordResolver,
  })

  const selectedTheme: ThemeMode = theme === 'light' || theme === 'dark' || theme === 'system'
    ? theme
    : 'system'

  const themeOptions: Array<{ key: ThemeMode, labelKey: string }> = [
    { key: 'system', labelKey: 'header.theme.system' },
    { key: 'light', labelKey: 'header.theme.light' },
    { key: 'dark', labelKey: 'header.theme.dark' },
  ]

  const matchingLocaleOptions = useMemo(() => {
    const query = languageSearchQuery.trim().toLocaleLowerCase(locale)

    if (query.length === 0)
      return [...locales]

    return locales.filter((itemLocale) => {
      const option = localeMeta[itemLocale]
      const label = option.label.toLocaleLowerCase(locale)

      return label.includes(query) || itemLocale.includes(query)
    })
  }, [languageSearchQuery, locale])

  const localeOptionsForSelect = useMemo(() => {
    if (matchingLocaleOptions.includes(locale))
      return matchingLocaleOptions

    return [locale, ...matchingLocaleOptions]
  }, [locale, matchingLocaleOptions])

  const hasLanguageSearchResults = matchingLocaleOptions.length > 0
  const isSelectedLocaleInjected = !matchingLocaleOptions.includes(locale)

  const refreshSecurityState = useCallback(async () => {
    setIsSecurityLoading(true)
    setSecurityLoadError(null)

    try {
      const nextState = await getSecurityState()

      setSecurityState(nextState)
    }
    catch {
      setSecurityLoadError(t('settings.security.errors.load'))
      setSecurityState(null)
    }
    finally {
      setIsSecurityLoading(false)
    }
  }, [t])

  useEffect(() => {
    void refreshSecurityState()
  }, [refreshSecurityState])

  function onLocaleChange(nextLocale: Locale) {
    if (nextLocale === locale)
      return

    setLanguageSearchQuery('')

    startLocaleTransition(async () => {
      await setLocale(nextLocale)
      router.refresh()
    })
  }

  async function onSetPassword(values: SetPasswordI) {
    clearSetPasswordErrors('root.server')
    setSetPasswordSuccess(null)

    try {
      await postSecurityAction('/users/me/password/set', values)

      resetSetPassword()
      setSetPasswordSuccess(t('settings.security.setPassword.success'))
      await refreshSecurityState()
    }
    catch (error) {
      setSetPasswordError('root.server', {
        type: 'server',
        message: error instanceof Error ? error.message : t('settings.security.errors.default'),
      })
    }
  }

  async function onUpdatePassword(values: UpdatePasswordI) {
    clearUpdatePasswordErrors('root.server')
    setUpdatePasswordSuccess(null)

    try {
      await postSecurityAction('/users/me/password/update', values)

      resetUpdatePassword({
        currentPassword: '',
        newPassword: '',
      })
      setUpdatePasswordSuccess(t('settings.security.updatePassword.success'))
      await refreshSecurityState()
    }
    catch (error) {
      setUpdatePasswordError('root.server', {
        type: 'server',
        message: error instanceof Error ? error.message : t('settings.security.errors.default'),
      })
    }
  }

  async function onRemovePassword(values: RemovePasswordI) {
    clearRemovePasswordErrors('root.server')
    setRemovePasswordSuccess(null)

    try {
      await postSecurityAction('/users/me/password/remove', values)

      resetRemovePassword({
        currentPassword: '',
      })
      setRemovePasswordSuccess(t('settings.security.removePassword.success'))
      await refreshSecurityState()
    }
    catch (error) {
      setRemovePasswordError('root.server', {
        type: 'server',
        message: error instanceof Error ? error.message : t('settings.security.errors.default'),
      })
    }
  }

  const providerCount = securityState?.providerCount ?? 0
  const canRemovePassword = providerCount > 0
  const providerLabels = securityState?.providers.map(provider => getProviderLabel(provider, t)) ?? []
  const tabs: Array<{ key: SettingsTab, label: string, href: string }> = [
    { key: 'general', label: t('settings.tabs.general'), href: getSettingsTabPath('general') },
    { key: 'security', label: t('settings.tabs.security'), href: getSettingsTabPath('security') },
  ]

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-8rem)] w-full max-w-6xl flex-col">
      <div className="grid flex-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="h-full rounded-lg border border-border/70 bg-surface/70 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/55">
            {t('settings.title')}
          </p>

          <nav aria-label={t('settings.title')} className="space-y-1">
            {tabs.map(tab => (
              <Link
                key={tab.key}
                id={`settings-tab-${tab.key}`}
                href={tab.href}
                aria-current={activeTab === tab.key ? 'page' : undefined}
                className={activeTab === tab.key
                  ? 'block w-full cursor-pointer rounded-md bg-default/80 px-3 py-2 text-left text-sm font-semibold text-foreground'
                  : 'block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-foreground/75 transition hover:bg-default/55 hover:text-foreground/90'}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </aside>

        <section className="h-full rounded-lg border border-border/70 bg-surface p-5 sm:p-6">
          {activeTab === 'general' && (
            <div role="tabpanel" id="settings-panel-general" aria-labelledby="settings-tab-general" className="space-y-5">
              <div>
                <h2 className="text-base font-semibold text-foreground">{t('settings.general.title')}</h2>
                <p className="mt-1 text-sm text-foreground/70">{t('settings.general.description')}</p>
              </div>

              <div className="divide-y divide-border/70 overflow-hidden rounded-md bg-surface/70">
                <div className="grid gap-2 px-4 py-3 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-3">
                  <p className="text-sm font-medium text-foreground/90">{t('settings.general.appearance.label')}</p>

                  <Select
                    selectedKey={selectedTheme}
                    aria-label={t('settings.general.appearance.label')}
                    onSelectionChange={(key) => {
                      if (typeof key !== 'string' || !isThemeMode(key))
                        return

                      setTheme(key)
                    }}
                    className="w-full sm:w-52"
                  >
                    <Select.Trigger className="h-8 justify-end gap-1 border-none bg-transparent px-0 text-sm text-foreground shadow-none hover:bg-transparent sm:text-right">
                      <Select.Value className="text-sm text-foreground" />
                      <Select.Indicator className="size-3.5 text-foreground/60" />
                    </Select.Trigger>

                    <Select.Popover placement="bottom end" className="min-w-44">
                      <ListBox className="max-h-60 overflow-auto p-1">
                        {themeOptions.map(option => (
                          <ListBox.Item
                            key={option.key}
                            id={option.key}
                            textValue={t(option.labelKey)}
                            className="rounded-md px-3 py-2 text-sm"
                          >
                            {t(option.labelKey)}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <div className="grid gap-2 px-4 py-3 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-3">
                  <p className="text-sm font-medium text-foreground/90">{t('settings.general.language.label')}</p>

                  <Select
                    selectedKey={locale}
                    isDisabled={isLocalePending}
                    aria-label={t('settings.general.language.label')}
                    onOpenChange={(isOpen) => {
                      if (!isOpen)
                        setLanguageSearchQuery('')
                    }}
                    onSelectionChange={(key) => {
                      if (typeof key !== 'string' || !isLocale(key))
                        return

                      onLocaleChange(key)
                    }}
                    className="w-full sm:w-52"
                  >
                    <Select.Trigger className="h-8 justify-end gap-1 border-none bg-transparent px-0 text-sm text-foreground shadow-none hover:bg-transparent sm:text-right">
                      <Select.Value className="text-sm text-foreground" />
                      <Select.Indicator className="size-3.5 text-foreground/60" />
                    </Select.Trigger>

                    <Select.Popover placement="bottom end" className="min-w-56">
                      <div className="p-2 pb-1">
                        <Input
                          value={languageSearchQuery}
                          placeholder={t('settings.general.language.searchPlaceholder')}
                          onChange={(event) => {
                            setLanguageSearchQuery(event.currentTarget.value)
                          }}
                          className="h-9 w-full rounded-md border border-border/70 bg-default-50 px-3 py-2 text-sm text-foreground outline-none transition focus:border-foreground/60 focus:ring-1 focus:ring-foreground/20"
                        />
                      </div>

                      <ListBox className="max-h-56 overflow-auto p-1 pt-0">
                        {localeOptionsForSelect.map((itemLocale) => {
                          const option = localeMeta[itemLocale]
                          const shouldHideOption = isSelectedLocaleInjected && itemLocale === locale

                          return (
                            <ListBox.Item
                              key={itemLocale}
                              id={itemLocale}
                              textValue={option.label}
                              className={shouldHideOption ? 'hidden' : 'rounded-md px-3 py-2 text-sm'}
                            >
                              {option.label}
                            </ListBox.Item>
                          )
                        })}
                      </ListBox>

                      {!hasLanguageSearchResults && (
                        <p className="px-3 py-2 text-xs text-foreground/60">
                          {t('settings.general.language.noResults')}
                        </p>
                      )}
                    </Select.Popover>
                  </Select>
                </div>
              </div>

              {isLocalePending && (
                <p className="text-xs text-foreground/60">{t('settings.general.language.updating')}</p>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div role="tabpanel" id="settings-panel-security" aria-labelledby="settings-tab-security" className="space-y-7">
              <div>
                <h2 className="text-base font-semibold text-foreground">{t('settings.security.title')}</h2>
                <p className="mt-1 text-sm text-foreground/70">{t('settings.security.description')}</p>
              </div>

              {isSecurityLoading && (
                <div className="inline-flex items-center gap-2 rounded-md border border-border/70 bg-default/40 px-3 py-2">
                  <Spinner size="sm" />
                  <span className="text-sm text-foreground/75">{t('settings.security.loading')}</span>
                </div>
              )}

              {!isSecurityLoading && securityLoadError !== null && (
                <Alert status="danger" className="rounded-md border border-danger/35 bg-danger/10 px-3 py-2">
                  <Alert.Content>
                    <Alert.Description className="text-sm text-danger">
                      {securityLoadError}
                    </Alert.Description>

                    <div className="mt-3">
                      <Button type="button" size="sm" variant="outline" onPress={() => { void refreshSecurityState() }}>
                        {t('settings.security.retry')}
                      </Button>
                    </div>
                  </Alert.Content>
                </Alert>
              )}

              {!isSecurityLoading && securityLoadError === null && securityState !== null && (
                <>
                  <div className="rounded-md border border-border/70 bg-default/40 px-4 py-3 text-sm text-foreground/80">
                    <p>
                      {t('settings.security.passwordStatus.label')}
                      {': '}
                      <span className="font-semibold">
                        {securityState.hasPassword
                          ? t('settings.security.passwordStatus.set')
                          : t('settings.security.passwordStatus.notSet')}
                      </span>
                    </p>

                    <p className="mt-1">
                      {t('settings.security.providers.label')}
                      {': '}
                      <span className="font-semibold">
                        {providerLabels.length > 0
                          ? providerLabels.join(', ')
                          : t('settings.security.providers.none')}
                      </span>
                    </p>
                  </div>

                  {!securityState.hasPassword && (
                    <div className="rounded-lg border border-border/70 bg-surface/70 p-4">
                      <h3 className="text-sm font-semibold text-foreground">{t('settings.security.setPassword.title')}</h3>
                      <p className="mt-1 text-sm text-foreground/70">{t('settings.security.setPassword.description')}</p>

                      {setPasswordSuccess !== null && (
                        <Alert status="success" className="mt-4 rounded-md border border-success/35 bg-success/10 px-3 py-2">
                          <Alert.Content>
                            <Alert.Description className="text-sm text-success">
                              {setPasswordSuccess}
                            </Alert.Description>
                          </Alert.Content>
                        </Alert>
                      )}

                      <Form
                        className="mt-4 space-y-4"
                        validationBehavior="aria"
                        onSubmit={(event) => {
                          void handleSetPasswordSubmit(onSetPassword)(event)
                        }}
                      >
                        <TextField isInvalid={Boolean(setPasswordErrors.newPassword?.message)} className="space-y-2">
                          <Label htmlFor="set-new-password" className="block text-sm font-medium text-foreground/95">
                            {t('settings.security.fields.newPassword')}
                          </Label>

                          <Input
                            id="set-new-password"
                            type="password"
                            autoComplete="new-password"
                            placeholder={t('settings.security.fields.newPassword')}
                            {...registerSetPassword('newPassword', {
                              onChange: () => clearSetPasswordErrors('root.server'),
                            })}
                            className="w-full rounded-md border border-foreground/25 bg-default-50 px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-foreground/60 focus:ring-1 focus:ring-foreground/20"
                            disabled={isSettingPassword}
                          />

                          {typeof setPasswordErrors.newPassword?.message === 'string' && (
                            <FieldError className="text-sm text-danger">
                              {setPasswordErrors.newPassword.message}
                            </FieldError>
                          )}
                        </TextField>

                        {typeof setPasswordErrors.root?.server?.message === 'string' && (
                          <Alert status="danger" className="rounded-md border border-danger/35 bg-danger/10 px-3 py-2">
                            <Alert.Content>
                              <Alert.Description className="text-sm text-danger">
                                {setPasswordErrors.root.server.message}
                              </Alert.Description>
                            </Alert.Content>
                          </Alert>
                        )}

                        <Button type="submit" variant="primary" isDisabled={isSettingPassword}>
                          {isSettingPassword ? t('settings.security.setPassword.submitting') : t('settings.security.setPassword.submit')}
                        </Button>
                      </Form>
                    </div>
                  )}

                  {securityState.hasPassword && (
                    <>
                      <div className="rounded-lg border border-border/70 bg-surface/70 p-4">
                        <h3 className="text-sm font-semibold text-foreground">{t('settings.security.updatePassword.title')}</h3>
                        <p className="mt-1 text-sm text-foreground/70">{t('settings.security.updatePassword.description')}</p>

                        {updatePasswordSuccess !== null && (
                          <Alert status="success" className="mt-4 rounded-md border border-success/35 bg-success/10 px-3 py-2">
                            <Alert.Content>
                              <Alert.Description className="text-sm text-success">
                                {updatePasswordSuccess}
                              </Alert.Description>
                            </Alert.Content>
                          </Alert>
                        )}

                        <Form
                          className="mt-4 space-y-4"
                          validationBehavior="aria"
                          onSubmit={(event) => {
                            void handleUpdatePasswordSubmit(onUpdatePassword)(event)
                          }}
                        >
                          <TextField isInvalid={Boolean(updatePasswordErrors.currentPassword?.message)} className="space-y-2">
                            <Label htmlFor="update-current-password" className="block text-sm font-medium text-foreground/95">
                              {t('settings.security.fields.currentPassword')}
                            </Label>

                            <Input
                              id="update-current-password"
                              type="password"
                              autoComplete="current-password"
                              placeholder={t('settings.security.fields.currentPassword')}
                              {...registerUpdatePassword('currentPassword', {
                                onChange: () => clearUpdatePasswordErrors('root.server'),
                              })}
                              className="w-full rounded-md border border-foreground/25 bg-default-50 px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-foreground/60 focus:ring-1 focus:ring-foreground/20"
                              disabled={isUpdatingPassword}
                            />

                            {typeof updatePasswordErrors.currentPassword?.message === 'string' && (
                              <FieldError className="text-sm text-danger">
                                {updatePasswordErrors.currentPassword.message}
                              </FieldError>
                            )}
                          </TextField>

                          <TextField isInvalid={Boolean(updatePasswordErrors.newPassword?.message)} className="space-y-2">
                            <Label htmlFor="update-new-password" className="block text-sm font-medium text-foreground/95">
                              {t('settings.security.fields.newPassword')}
                            </Label>

                            <Input
                              id="update-new-password"
                              type="password"
                              autoComplete="new-password"
                              placeholder={t('settings.security.fields.newPassword')}
                              {...registerUpdatePassword('newPassword', {
                                onChange: () => clearUpdatePasswordErrors('root.server'),
                              })}
                              className="w-full rounded-md border border-foreground/25 bg-default-50 px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-foreground/60 focus:ring-1 focus:ring-foreground/20"
                              disabled={isUpdatingPassword}
                            />

                            {typeof updatePasswordErrors.newPassword?.message === 'string' && (
                              <FieldError className="text-sm text-danger">
                                {updatePasswordErrors.newPassword.message}
                              </FieldError>
                            )}
                          </TextField>

                          {typeof updatePasswordErrors.root?.server?.message === 'string' && (
                            <Alert status="danger" className="rounded-md border border-danger/35 bg-danger/10 px-3 py-2">
                              <Alert.Content>
                                <Alert.Description className="text-sm text-danger">
                                  {updatePasswordErrors.root.server.message}
                                </Alert.Description>
                              </Alert.Content>
                            </Alert>
                          )}

                          <Button type="submit" variant="primary" isDisabled={isUpdatingPassword}>
                            {isUpdatingPassword ? t('settings.security.updatePassword.submitting') : t('settings.security.updatePassword.submit')}
                          </Button>
                        </Form>
                      </div>

                      <div className="rounded-lg border border-border/70 bg-surface/70 p-4">
                        <h3 className="text-sm font-semibold text-foreground">{t('settings.security.removePassword.title')}</h3>
                        <p className="mt-1 text-sm text-foreground/70">{t('settings.security.removePassword.description')}</p>

                        {!canRemovePassword && (
                          <p className="mt-2 text-sm text-warning">
                            {t('settings.security.removePassword.providerRequired')}
                          </p>
                        )}

                        {removePasswordSuccess !== null && (
                          <Alert status="success" className="mt-4 rounded-md border border-success/35 bg-success/10 px-3 py-2">
                            <Alert.Content>
                              <Alert.Description className="text-sm text-success">
                                {removePasswordSuccess}
                              </Alert.Description>
                            </Alert.Content>
                          </Alert>
                        )}

                        <Form
                          className="mt-4 space-y-4"
                          validationBehavior="aria"
                          onSubmit={(event) => {
                            void handleRemovePasswordSubmit(onRemovePassword)(event)
                          }}
                        >
                          <TextField isInvalid={Boolean(removePasswordErrors.currentPassword?.message)} className="space-y-2">
                            <Label htmlFor="remove-current-password" className="block text-sm font-medium text-foreground/95">
                              {t('settings.security.fields.currentPassword')}
                            </Label>

                            <Input
                              id="remove-current-password"
                              type="password"
                              autoComplete="current-password"
                              placeholder={t('settings.security.fields.currentPassword')}
                              {...registerRemovePassword('currentPassword', {
                                onChange: () => clearRemovePasswordErrors('root.server'),
                              })}
                              className="w-full rounded-md border border-foreground/25 bg-default-50 px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-foreground/60 focus:ring-1 focus:ring-foreground/20"
                              disabled={isRemovingPassword || !canRemovePassword}
                            />

                            {typeof removePasswordErrors.currentPassword?.message === 'string' && (
                              <FieldError className="text-sm text-danger">
                                {removePasswordErrors.currentPassword.message}
                              </FieldError>
                            )}
                          </TextField>

                          {typeof removePasswordErrors.root?.server?.message === 'string' && (
                            <Alert status="danger" className="rounded-md border border-danger/35 bg-danger/10 px-3 py-2">
                              <Alert.Content>
                                <Alert.Description className="text-sm text-danger">
                                  {removePasswordErrors.root.server.message}
                                </Alert.Description>
                              </Alert.Content>
                            </Alert>
                          )}

                          <Button type="submit" variant="outline" isDisabled={isRemovingPassword || !canRemovePassword}>
                            {isRemovingPassword ? t('settings.security.removePassword.submitting') : t('settings.security.removePassword.submit')}
                          </Button>
                        </Form>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
