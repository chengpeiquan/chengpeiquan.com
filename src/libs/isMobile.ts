/** 
 * 判断是否手机平台
 */
let isMobile: boolean = false;

try {
  isMobile = /iPhone|phone|android|iPod|pad|iPad/i.test( navigator.userAgent.toLowerCase() );
} catch (e) {
  isMobile = false;
}

export default isMobile;