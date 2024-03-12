
module.exports = {
    formatDate: (vDate) => {
         const date = new Date(vDate);
         const [month, day, year] = [
              date.getMonth()+1,
              date.getDate(),
              date.getFullYear()
         ];
         var newDate = "" + month + "-" + day + "-" + year;
         return newDate;
    }
};