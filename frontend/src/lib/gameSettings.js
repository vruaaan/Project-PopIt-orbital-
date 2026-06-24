export const SETTING_DEFINITIONS = [
  {
    key: 'gravity',
    label: 'Gravity',
    description: 'How strongly particles fall.',
    options: [
      { value: 'weak', label: 'Weak' },
      { value: 'medium', label: 'Medium' },
      { value: 'strong', label: 'Strong' },
    ],
  },
  {
    key: 'horizontal',
    label: 'Horizontal',
    description: 'How much particles drift sideways.',
    options: [
      { value: 'slow', label: 'Slow' },
      { value: 'medium', label: 'Medium' },
      { value: 'fast', label: 'Fast' },
    ],
  },
  {
    key: 'lingerTime',
    label: 'Linger Time',
    description: 'How long particles stay visible.',
    options: [
      { value: 'short', label: 'Short' },
      { value: 'medium', label: 'Medium' },
      { value: 'long', label: 'Long' },
    ],
  },
]

export const DEFAULT_SETTINGS = {
  gravity: 'medium',
  horizontal: 'medium',
  lingerTime: 'medium',
}

let activeSettings = { ...DEFAULT_SETTINGS }

export function getActiveSettings() {
  return activeSettings
}

export function setActiveSettings(nextSettings) {
  activeSettings = typeof nextSettings === 'function'
    ? { ...activeSettings, ...nextSettings(activeSettings) }
    : { ...activeSettings, ...nextSettings }
}

const SETTING_MULTIPLIERS = {
  gravity: {
    weak: 0.8,
    medium: 1,
    strong: 1.25,
  },
  horizontal: {
    slow: 0.85,
    medium: 1,
    fast: 1.15,
  },
  lingerTime: {
    short: 0.85,
    medium: 1,
    long: 1.2,
  },
}

export function getSettingMultiplier(settingKey, selectedValue) {
  return SETTING_MULTIPLIERS[settingKey]?.[selectedValue] ?? 1
}
