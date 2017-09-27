function LastDayOfMonth(Year, Month) {
  var t= new Date(Year, Month-1);
  console.log(t)
  return (new Date(t.getFullYear(), t.getMonth() + 1, 0, 23, 59, 59));
}
console.log(LastDayOfMonth(2017, 9));
