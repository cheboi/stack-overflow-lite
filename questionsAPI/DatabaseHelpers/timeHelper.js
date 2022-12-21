exports.getDays = (data) => {
    return data.map(item => {
      let todaysDate = new Date();
      let itemDate = item.date;
      let diffTime = Math.ceil((todaysDate - itemDate) / (1000 * 60 * 60 * 24));
      return {
        ...item,
        days: `${diffTime > 1 ? `${diffTime} days`: `${diffTime} day`}`
      }
    })
  }