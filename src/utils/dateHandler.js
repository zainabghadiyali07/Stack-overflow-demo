import { WEEKDAY } from "./constants";

export const formatTime = (date) => {
    if (!date) return '';
  
    const normalizeDate = new Date(date);
    const options = { hour: 'numeric', minute: 'numeric' };
  
    return Intl.DateTimeFormat(options).format(normalizeDate);
  };

export const formatToDateOnly = (date) => {
    const normalizeDate = new Date(date);
  
    if (normalizeDate) {
      const numericDate = normalizeDate.getDate();
      const month = normalizeDate.getMonth() + 1;
      const fullYear = String(normalizeDate.getFullYear());
  
      return `${month}/${numericDate}/${fullYear.slice(2)}`;
    }
  
    return '';
  };

export const formatDateForPost = (date) => {
    const currentDate = new Date();
    const normalizeDate = new Date(date);
  
    if (!normalizeDate) {
      return '';
    }
  
    let differenceValue = (currentDate.getTime() - normalizeDate.getTime()) / 1000;
  
    if (differenceValue < 60) {
      return 'Just Now';
    }
  
    if ((differenceValue / 60) < 60) {
      differenceValue /= 60;
  
      return `${Math.abs(Math.round(differenceValue))} min ago`;
    }
  
    if ((differenceValue / 3600) < 24) {
      return `${Math.abs(Math.round(differenceValue / 3600))} hour ago`;
    }
  
    const totalDays = Math.ceil(differenceValue / (1000 * 3600 * 24));
  
    if (totalDays < 7) {
      return `${WEEKDAY[normalizeDate.getDay()]} ${formatTime(date)}`;
    }
  
    return formatToDateOnly(date);
  };

  export const isDay = () => {
    const currentDate = new Date();

    return currentDate.getHours() > 18;
  }