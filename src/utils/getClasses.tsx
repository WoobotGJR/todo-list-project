export const getClasses = (...classNames: string[]) =>
  classNames.filter(Boolean).join(' ').trim();
