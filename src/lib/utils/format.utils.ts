export const formatValue = (value: string): string => {
  const numericValue = value.replace(/\D/g, "");
  const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formattedValue;
};

export const deFormatValue = (value: string): string => {
  const deFormattedValue = value.replace(/,/g, "");
  return deFormattedValue;
};

export const formatData = (data: string): string => {
  data = data
    .replace(/^## (.*)$/gm, "<h2>$1</h2>\n")
    .replace(/^\*\*([^\*]+)\*\*/gm, "<strong>$1</strong>")
    .replace(/\*([^\*]+)\*/g, "<em>$1</em>")
    .replace(/^\* (.*?)$/gm, "<ul><li>$1</li></ul>\n");

  data = data.replace(/<\/ul>\n<ul>/g, "\n");
  console.log(data);

  return data as string;
};
