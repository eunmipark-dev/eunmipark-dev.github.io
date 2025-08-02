export const convertNewLine = (text: string) => {
  return text.replaceAll('\n', '<br/>');
};

export const convertTab = (text: string) => {
  return text.replaceAll('	', '&emsp;');
};

export const convertDatetimeFormat = (dateTimeString: string, format = 'YYYY-MM-DD'): string => {
  if (!dateTimeString) return '';

  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return format === 'YYYY-MM-DD' ? `${year}-${month}-${day}` : ``;
};
