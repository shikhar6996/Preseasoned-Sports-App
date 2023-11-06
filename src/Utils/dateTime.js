import moment from 'moment'

export const getDateDifferenceInDesiredFormat = dateTimeString => {
  let dateString = ''
  if (dateTimeString && dateTimeString !== '') {
    let currentDateTimeString = moment(new Date()).format('YYYY-MM-DD')
    currentDateTimeString += dateTimeString.substring(10)

    if (dateTimeString !== '') {
      dateString = moment(currentDateTimeString).diff(
        moment(dateTimeString),
        'years',
        true,
      )

      dateString = moment(new Date()).diff(moment(dateTimeString), 'days', true)

      if (dateString > 2.0) {
        /* less than 1 year and greater than 2 days */
        dateString = moment(dateTimeString).format('DD/MM/YY')
      } else if (dateString >= 1.0) {
        dateString = `${Math.floor(dateString)} ${
          Math.floor(dateString) > 1 ? 'days ago' : 'day ago'
        }`
      } else {
        dateString = moment(new Date()).diff(
          moment(dateTimeString),
          'hours',
          false,
        )
        if (dateString > 1) {
          /* greater than 1 hour */
          dateString += ' hrs ago'
        } else if (dateString === 1) {
          /* equal 1 hour */
          dateString += ' hr ago'
        } else {
          /* less than 1 hour */
          dateString = moment(new Date()).diff(
            moment(dateTimeString),
            'minutes',
          )
          if (dateString > 1) {
            dateString += ' mins ago'
          } else if (dateString === 1) {
            dateString += ' min ago'
          } else dateString = 'Just Now'
        }
      }
    }
  }
  return dateString
}
