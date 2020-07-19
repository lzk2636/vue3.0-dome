import http from '../util/request';
const moveList=({start=0,count=30})=>{
    return http({
        method:"GET",
        url:`/in_theaters?count=${count}&start=${start}`,
    })
}
export{
    moveList
}
// 获取即将上映的数据
export const getComingSoon = ({ start = 0, count = 5 }) => {
  return http({
    url: `coming_soon?start=${start}&count=${count}`
  })
}

// 获取top250的数据
export const getTop250 = ({ start = 0, count = 5 }) => {
  return http({
    url: `top250?start=${start}&count=${count}`
  })
}

// 根据类型，获取电影列表
export const getMovieList = ({ type = '', start = 0, count = 5 }) => {
  return http({
    url: `${type}?start=${start}&count=${count}`
  })
}

// 根据电影id获取电影信息
export const getMoveInfo = (id: string) => {
  return http({
    url: `/subject/${id}`
  })
}
