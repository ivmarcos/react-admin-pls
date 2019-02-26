export function isInteger(value, allValues, props) {
  return Number.isInteger(value)
    ? undefined
    : props.translate("validation.isInteger");
}
