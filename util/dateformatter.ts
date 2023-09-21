export function formatDate(inputDate: Date ): string {

    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = inputDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  export function stringToDateformat(inputDate: string): string {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const date = new Date(inputDate);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    const formattedDate = `${day} ${months[monthIndex]} ${year}`;
    return formattedDate;
  }
  

  