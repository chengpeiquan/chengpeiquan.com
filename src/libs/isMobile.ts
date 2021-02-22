/** 
 * 判断是否手机平台
 */
const isMobile: boolean = /iPhone|phone|android|iPod|pad|iPad/i.test( navigator.userAgent.toLowerCase() );
export default isMobile;