/** 
 * 判断是否手机平台
 */
let isMobile: boolean = true;

try {
  isMobile = /iPhone|phone|android|iPod|pad|iPad/i.test( navigator.userAgent.toLowerCase() );
} catch (e) {
  isMobile = true;
}

export default isMobile;