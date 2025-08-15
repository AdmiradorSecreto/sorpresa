export function getContrastColor(hexColor: string): string {
  // Remove # if present
  const color = hexColor.replace("#", "")

  // Convert to RGB
  const r = Number.parseInt(color.substr(0, 2), 16)
  const g = Number.parseInt(color.substr(2, 2), 16)
  const b = Number.parseInt(color.substr(4, 2), 16)

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Return white for dark colors, dark for light colors
  return luminance > 0.5 ? "#1a1a1a" : "#ffffff"
}

export function getButtonColor(hexColor: string): string {
  const color = hexColor.replace("#", "")
  const r = Number.parseInt(color.substr(0, 2), 16)
  const g = Number.parseInt(color.substr(2, 2), 16)
  const b = Number.parseInt(color.substr(4, 2), 16)

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Return a slightly different shade for buttons
  return luminance > 0.5 ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"
}
