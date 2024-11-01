import dayjs from "dayjs";

export const formatDate = (date: Date) => {
  return new Date(date)
    .toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    })
    .replace("de", "")
    .replace(".", "");
};

export const formatDateToString = (date: Date | dayjs.Dayjs): string => {
  if (dayjs.isDayjs(date)) {
    date = date.add(1, "day").toDate();
  } else if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error("Input must be a valid Date object or a Day.js object");
  } else {
    date.setDate(date.getDate() + 1);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
