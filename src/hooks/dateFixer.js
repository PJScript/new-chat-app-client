const dateFixer = (date) => {
    const date_arr = [1,2,3,4,5,6,7,8,9,10,11,12]

    let date_k = new Date(date)

    const year = date_k.getFullYear()
    const month = date_arr[ date_k.getMonth() ]
    const day = date_k.getDate()

    const h = date_k.getHours()
    const m = date_k.getMinutes()
    const s = date_k.getSeconds()
    let text = '오전'
   if(h >= 12){
      text = '오후'
   }
    // return {
    //     year:year,
    //     month,month,
    //     day:day,
    //     h:h,
    //     m:m,
    //     s:s
    // }

    const case01 = `${year}-${month}-${day} ${h}:${m}:${s}`
    const case02 = `${text} ${h}:${m}:${s}`

    return case02
}


export default dateFixer