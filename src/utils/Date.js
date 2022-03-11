import moment from 'moment';

const formatDate = (date = new Date()) => {
  return moment(date).format('YYYY-MM-DD');
};

const todayDate = moment(new Date()).format('YYYY-MM-DD');

// const getWeekDurationDate = () => {
//   return new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
// };
// const getMonthDurationDate = ()=>new Date(new Date().setMonth(new Date().getMonth()+1))
// const getYearDurationDate = ()=>new Date(new Date().setFullYear(new Date().getFullYear()+1))
// const getFirstDayInWeek=()=>{
//     const curr = new Date(); // get current date
//     const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
//     return new Date(curr.setDate(first));
// }
// const getLastDayInWeek=()=>{
//     const curr = new Date(); // get current date
//     const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
//     const last = first + 6; // last day is the first day + 6    
//     return new Date(curr.setDate(last));
// }
// const getLastDayOfMonth=()=>{
//     const today = new Date();
//     const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 1);
// }
// const firstDayInMonth=()=>{
//     return new Date().getFullYear()+'-'+new Date().getMonth()+1+'-'+'01'
// }
// const firstDayInYear =()=>{
//     return `${new Date().getFullYear()}-01-01}`
// }
const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD');
const startOfWeek = moment().startOf('week').format('YYYY-MM-DD');
const endOfWeek   = moment().endOf('week').format('YYYY-MM-DD');
const startOfYear = moment().startOf('year').format('YYYY-MM-DD');
const endOfYear   = moment().endOf('year').format('YYYY-MM-DD');

// const lastDayInYear =()=>`${new Date().getFullYear()}-12-31}`
// const format = (value)=>value<10?'0'+value:value
export { formatDate, todayDate, startOfMonth,endOfMonth, startOfWeek,endOfWeek,startOfYear, endOfYear  };