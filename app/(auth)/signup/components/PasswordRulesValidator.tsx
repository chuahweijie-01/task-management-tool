import clsx from 'clsx'
import FeatherIcon from 'feather-icons-react'
import React from 'react'
import { IPasswordRules } from '../interfaces/password-rules.interface'

type PasswordValidatorProps = {
  rules: IPasswordRules
  hasUserInteracted: boolean
}

const getIconName = (valid: boolean, interacted: boolean) => {
  if (!interacted) return 'circle'
  return valid ? 'check-circle' : 'x-circle'
}

const PasswordRulesValidator = ({ rules, hasUserInteracted }: PasswordValidatorProps) => {
  const rulesList = [
    { valid: rules.minLength, label: 'At least 8 characters' },
    { valid: rules.hasAlphanumeric, label: 'At least 1 letter and 1 number' },
    { valid: rules.hasSpecialChar, label: 'At least 1 special character' },
  ]

  return (
    <div>
      <span className="font-bold">Password must contain:</span>
      <div className="flex flex-col gap-2 mt-2 text-xs">
        {rulesList.map(({ valid, label }) => (
          <span
            key={label}
            className={clsx('flex gap-2 items-center transition duration-300', {
              'text-gray-500': !hasUserInteracted,
              'text-green-600': hasUserInteracted && valid,
              'text-red-600': hasUserInteracted && !valid,
            })}
          >
            <FeatherIcon icon={getIconName(valid, hasUserInteracted)} size={14} />
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default PasswordRulesValidator
