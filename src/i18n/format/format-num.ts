export const formatNum = Intl.NumberFormat("en-US", {
  currency: "IDR",
  notation: "compact",
});

const rupiah = (number: number | bigint) => {
  const formattedNumber = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);

  return formattedNumber;
};

const n = formatNum.format(1_222_222);

console.log(n);
