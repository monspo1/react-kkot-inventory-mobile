import { categoryColors } from '../constants/constants';

export function getUniqueId () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export const getCategoryColors = (category) => {
    const elemColor = categoryColors.find(item => item.label === category);
    return elemColor ? { backgroundColor: elemColor.backgroundColor, color: elemColor.color } : {}
}

export function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}

export const getTodayString = () => {
  const today = new Date();
  var year = today.getFullYear();
  var month = (1 + today.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;
  var day = today.getDate().toString();
  day = day.length > 1 ? day : "0" + day;
  return month + "/" + day + "/" + year;
};
