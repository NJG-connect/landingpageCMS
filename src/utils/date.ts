function formatDate(date: Date, separator = '-'): string {
  const d = new Date(date);
  return (
    d.getFullYear() + separator + addZeroAtMonth(d.getMonth() + 1 ) + separator + d.getDate()
  );
}


function addZeroAtMonth(value: number){
   if (Math.ceil(Math.log10(value + 1))> 2){
    return value.toString();
   }
   return Math.ceil(Math.log10(value + 1)) === 1 ? `0${value}` : value.toString();
}

export { formatDate };
