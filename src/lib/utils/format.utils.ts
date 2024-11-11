export const formatValue = (value: string): string => {
  const numericValue = value.replace(/\D/g, "");
  const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formattedValue;
};

export const deFormatValue = (value: string): string => {
  const deFormattedValue = value.replace(/,/g, "");
  return deFormattedValue;
};

export const formatData = (data: string) => {
  // data = data
  //   .replace(/^## (.*)$/gm, "<h2>$1</h2>\n")
  //   .replace(/^\*\*([^\*]+)\*\*/gm, "<strong>$1</strong>")
  //   .replace(/\*([^\*]+)\*/g, "<em>$1</em>")
  //   .replace(/^\* (.*?)$/gm, "<ul><li>$1</li></ul>\n")
  //   .replace(/<\/ul>\n<ul>/g, "\n")
  //   .replace(/^"(.)"$/g, "$1");
  // return data;
  data = data
    .replace(/^## (.*)$/gm, "$1\n")
    .replace(/^\*\*([^\*]+)\*\*/gm, "$1\n")
    .replace(/\*([^\*]+)\*/g, "$1\n")
    .replace(/^\* (.*?)$/gm, "$1\n")
    .replace(/<\/ul>\n<ul>/g, "\n");
  return data;
};
