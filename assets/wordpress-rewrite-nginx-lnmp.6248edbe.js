/**
 * name: chengpeiquan.com
 * version: v0.1.0
 * description: My personal website, technology stack based on Vue.js 3.0, and Vite 2.0, use Server Side Generation.
 * author: chengpeiquan
 * homepage: https://chengpeiquan.com/
 */
import{_ as E}from"./Detail.155b50ec.js";import{d as t,m as s,a as o,s as a,w as r,e as u,g as F}from"./app.e53c211f.js";import"./useList.2d80cbd4.js";import"./Sidebar.07e7476c.js";const D=u("div",{class:"article-content prose mx-auto"},[u("p",null,"\u642D\u597D\u535A\u5BA2\u4E4B\u540E\uFF0C\u6253\u7B97\u914D\u7F6E\u4F2A\u9759\u6001\uFF0C\u7531\u4E8E\u4E60\u60EF\u76F4\u63A5\u641C\u7D22\u5F15\u64CE\uFF0C\u5BFC\u81F4\u6298\u817E\u4E86\u51E0\u4E2A\u5C0F\u65F6\u90FD\u6CA1\u89E3\u51B3\uFF0C\u6700\u540E\u53BB\u5B98\u7F51\u8F6C\u4E86\u4E00\u4E0B\uFF0C\u4EBA\u5BB6\u672C\u6765\u5C31\u6709\u76F8\u5173\u7684\u6587\u6863\uFF0C\u5403\u4E00\u5811\u957F\u4E00\u667A\uFF0CMark \u4E0B\u6765\u3002"),u("p",null,"\u914D\u7F6E\u5176\u5B9E\u975E\u5E38\u7B80\u5355\uFF0C\u53EA\u9700\u8981\u5728 lnmp \u4E0A\u8F93\u5165\u51E0\u4E2A\u7B80\u5355\u7684\u6307\u4EE4\u5C31\u53EF\u4EE5\u628A\u57DF\u540D\u548C\u4F2A\u9759\u6001\u7C7B\u578B\u5173\u8054\u4E0A\uFF0C\u91CD\u542F Nginx \u540E\u76F4\u63A5\u751F\u6548\uFF0C\u4E0D\u9700\u8981\u548C\u7F51\u4E0A\u90A3\u4E9B\u6559\u7A0B\u4E00\u6837\u8BF4\u7684\uFF0C\u9891\u7E41\u4FEE\u6539\u8FD9\u4E2A\u6587\u4EF6\u90A3\u4E2A\u6587\u4EF6\uFF0C\u8FD8\u6709\u6838\u5BF9\u4F2A\u9759\u6001\u4EE3\u7801\u662F\u5426\u6B63\u786E\u4EC0\u4E48\u7684\u3002"),u("h2",{id:"\u914D\u7F6E\u6B65\u9AA4\uFF1A",tabindex:"-1"},[u("a",{class:"header-anchor",href:"#\u914D\u7F6E\u6B65\u9AA4\uFF1A","aria-hidden":"true"},"#"),F(" \u914D\u7F6E\u6B65\u9AA4\uFF1A")]),u("p",null,"1\u3001WordPress \u540E\u53F0 - \u8BBE\u7F6E - \u56FA\u5B9A\u94FE\u63A5\uFF0C\u914D\u7F6E\u597D\u81EA\u5DF1\u60F3\u8981\u7684\u4F2A\u9759\u6001\u683C\u5F0F\u3002"),u("p",null,"2\u3001\u6253\u5F00\u7EC8\u7AEF\uFF0C\u8FDE\u63A5\u670D\u52A1\u5668\uFF0C\u5F00\u59CB\u5904\u7406\u670D\u52A1\u7AEF\u7684 rewrite \u89C4\u5219\u914D\u7F6E\u3002"),u("pre",{class:"language-javascript"},[u("code",{class:"language-javascript"},[u("span",{class:"token comment"},"//\u6253\u5F00\u7EC8\u7AEF\uFF0C\u8F93\u5165ssh \u4F60\u7684\u7528\u6237\u540D@\u4F60\u7684\u670D\u52A1\u5668IP"),F(`
`),u("span",{class:"token comment"},"//\u56DE\u8F66\u540E\u4F1A\u63D0\u793A\u4F60\u8F93\u5165\u670D\u52A1\u5668\u5BC6\u7801\uFF0C\u767B\u5F55\u540E\u5C31\u53EF\u4EE5\u5F00\u59CB\u914D\u7F6E\u4E86"),F(`
ssh root@`),u("span",{class:"token number"},"192.168"),u("span",{class:"token number"},".1"),u("span",{class:"token number"},".1"),F(`

`),u("span",{class:"token comment"},"//\u767B\u5165\u6210\u529F\uFF0C\u53EF\u4EE5\u5148\u67E5\u770B\u5F53\u524D\u7ED1\u5B9A\u7684\u57DF\u540D\u60C5\u51B5\uFF08\u8FD9\u91CC\u6307\u670D\u52A1\u7AEF\u7684\u914D\u7F6E\u60C5\u51B5\uFF0C\u548C\u57DF\u540D\u89E3\u6790\u6307\u5411\u90A3\u5757\u6CA1\u5173\u7CFB\uFF09"),F(`
`),u("span",{class:"token comment"},"//\u8F93\u5165\u67E5\u8BE2\u6307\u4EE4"),F(`
lnmp vhost list

`),u("span",{class:"token comment"},"//\u5982\u679C\u662F\u65B0\u642D\u5EFA\u7684\u670D\u52A1\u5668\uFF0C\u4E0A\u9762\u7684\u67E5\u8BE2\u7ED3\u679C\u5E94\u8BE5\u662F\u7A7A\uFF0C\u8FD9\u4E2A\u65F6\u5019\u5F00\u59CB\u6DFB\u52A0\u81EA\u5DF1\u7684\u57DF\u540D"),F(`
`),u("span",{class:"token comment"},"//\u8F93\u5165\u6DFB\u52A0\u6307\u4EE4"),F(`
lnmp vhost add

`),u("span",{class:"token comment"},"//\u4F1A\u63D0\u793A\u4F60\u8F93\u5165\u9700\u8981\u7ED1\u5B9A\u7684\u57DF\u540D"),F(`
`),u("span",{class:"token comment"},"//Please enter domain(example: www.lnmp.org):"),F(`
www`),u("span",{class:"token punctuation"},"."),F("chengpeiquan"),u("span",{class:"token punctuation"},"."),F(`com

`),u("span",{class:"token comment"},"//\u518D\u4E0B\u4E00\u6B65\u53EF\u4EE5\u518D\u7ED1\u5B9A\u5176\u4ED6\u57DF\u540D\u6216\u8005\u6CDB\u57DF\u540D\uFF0C\u6839\u636E\u9700\u8981\u914D\u7F6E"),F(`
`),u("span",{class:"token comment"},"//Enter more domain name(example: lnmp.org *.lnmp.org):"),F(`
chengpeiquan`),u("span",{class:"token punctuation"},"."),F(`com

`),u("span",{class:"token comment"},"//\u914D\u7F6E\u597D\u57DF\u540D\uFF0C\u4F1A\u63D0\u793A\u4F60\u7ED1\u5B9A\u7F51\u7AD9\u7684\u76EE\u5F55"),F(`
`),u("span",{class:"token comment"},"//\u9ED8\u8BA4\u662F\u65B0\u5EFA\u4E00\u4E2A\u7F51\u7AD9\u57DF\u540D\u7684\u6587\u4EF6\u5939\uFF0C\u4F46\u5982\u679C\u548C\u6211\u4E00\u6837\u5148\u5EFA\u4E86\u7F51\u7AD9\u518D\u7ED1\u57DF\u540D\u7684\u8BDD\uFF0C\u5C31\u8981\u8F93\u5165\u7F51\u7AD9\u7684\u76EE\u5F55\u4E86\uFF08\u4ECE\u6839\u76EE\u5F55\u5F00\u59CB\uFF09"),F(`
`),u("span",{class:"token comment"},"//Please enter the directory for the domain:"),F(`
`),u("span",{class:"token comment"},"//Default directory: /home/wwwroot/chengpeiquan.com:"),F(`
`),u("span",{class:"token operator"},"/"),F("home"),u("span",{class:"token operator"},"/"),F("wwwroot"),u("span",{class:"token operator"},"/"),u("span",{class:"token keyword"},"default"),F(`

`),u("span",{class:"token comment"},"//\u63A5\u4E0B\u6765\u5C31\u662F\u91CD\u70B9\u4E86\uFF0C\u95EE\u4F60\u662F\u5426\u5141\u8BB8rewrite\uFF0C\u6211\u4EEC\u4F2A\u9759\u6001\u5C31\u662F\u8981\u7684\u8FD9\u4E2A\uFF0C\u5FC5\u987Byes"),F(`
`),u("span",{class:"token comment"},"//Allow Rewrite rule? (y/n)"),F(`
y

`),u("span",{class:"token comment"},"//\u63A5\u7740\u662F\u9009\u62E9\u8981\u5F15\u5165\u7684rewrite\u7684\u89C4\u5219\uFF0Clnmp\u9ED8\u8BA4\u5DF2\u7ECF\u628A\u5404\u79CD\u5E38\u7528\u7684\u7A0B\u5E8F\u89C4\u5219\u914D\u597D\uFF0C\u4F46\u662F\u6CA1\u5F15\u5165\uFF0C\u6240\u4EE5\u5728\u8FD9\u4E2A\u6B65\u9AA4\u5C31\u9700\u8981\u6839\u636E\u81EA\u5DF1\u7684\u9700\u6C42\u5F15\u5165\u60F3\u8981\u7684\u914D\u7F6E"),F(`
`),u("span",{class:"token comment"},"//Please enter the rewrite of programme,"),F(`
`),u("span",{class:"token comment"},"//wordpress,discuzx,typecho,thinkphp,laravel,codeigniter,yii2 rewrite was exist."),F(`
`),u("span",{class:"token comment"},"//(Default rewrite: other):"),F(`
wordpress

`),u("span",{class:"token comment"},"//\u540E\u9762\u7684\u95EE\u9898\u5C31\u6CA1\u4EC0\u4E48\u5F71\u54CD\u4E86\uFF0C\u770B\u81EA\u5DF1\u9700\u8981\u8BBE\u7F6E\u662F\u5426\u5141\u8BB8log\u3001SSL\u8BC1\u4E66\u4EC0\u4E48\u7684"),F(`
`),u("span",{class:"token comment"},"//\u914D\u7F6E\u5B8C\u6BD5\u540E\uFF0C\u91CD\u542FNginx\uFF0C\u641E\u5B9A"),F(`
`),u("span",{class:"token operator"},"/"),F("etc"),u("span",{class:"token operator"},"/"),F("init"),u("span",{class:"token punctuation"},"."),F("d"),u("span",{class:"token operator"},"/"),F(`nginx restart
`)])]),u("p",null,"\u4EE5\u4E0A\u5C31\u662F\u6240\u6709\u64CD\u4F5C\u6B65\u9AA4\uFF0C\u53C2\u8003\u6587\u6863\uFF1A"),u("blockquote",null,[u("p",null,[F("lnmp \u5B98\u7F51\u914D\u7F6E\u8BF4\u660E "),u("a",{href:"https://lnmp.org/faq/lnmp-vhost-add-howto.html",class:"custom-external-link",target:"_blank",rel:"noopener noreferrer"},"https://lnmp.org/faq/lnmp-vhost-add-howto.html")])])],-1),c={title:"\u57FA\u4E8Elnmp\u914D\u7F6EWordPress\u7684Nginx\u4F2A\u9759\u6001\u65B9\u6CD5",desc:"Nginx\u914D\u7F6Erewrite\uFF0C\u57FA\u4E8Elnmp\u642D\u5EFA\u7684\u8BDD\uFF0C\u5176\u5B9E\u914D\u7F6E\u8D77\u6765\u975E\u5E38\u7B80\u5355\uFF0C\u53EA\u9700\u8981\u5728lnmp\u4E0A\u8F93\u5165\u51E0\u4E2A\u7B80\u5355\u7684\u6307\u4EE4\u5C31\u53EF\u4EE5\u628A\u57DF\u540D\u548C\u4F2A\u9759\u6001\u7C7B\u578B\u5173\u8054\u4E0A\uFF0C\u91CD\u542FNginx\u540E\u76F4\u63A5\u751F\u6548~",keywords:"wordpress,rewrite,nginx,lnmp",date:"2018-09-06T01:43:00.000Z",cover:"https://cdn.chengpeiquan.com/img/2018/09/1-2.jpg?x-oss-process=image/interlace,1",categories:["tech"],meta:[{property:"og:title",content:"\u57FA\u4E8Elnmp\u914D\u7F6EWordPress\u7684Nginx\u4F2A\u9759\u6001\u65B9\u6CD5"}]},g="",k=t({__name:"wordpress-rewrite-nginx-lnmp",setup(p,{expose:n}){return s({title:"\u57FA\u4E8Elnmp\u914D\u7F6EWordPress\u7684Nginx\u4F2A\u9759\u6001\u65B9\u6CD5",meta:[{property:"og:title",content:"\u57FA\u4E8Elnmp\u914D\u7F6EWordPress\u7684Nginx\u4F2A\u9759\u6001\u65B9\u6CD5"}]}),n({frontmatter:{title:"\u57FA\u4E8Elnmp\u914D\u7F6EWordPress\u7684Nginx\u4F2A\u9759\u6001\u65B9\u6CD5",desc:"Nginx\u914D\u7F6Erewrite\uFF0C\u57FA\u4E8Elnmp\u642D\u5EFA\u7684\u8BDD\uFF0C\u5176\u5B9E\u914D\u7F6E\u8D77\u6765\u975E\u5E38\u7B80\u5355\uFF0C\u53EA\u9700\u8981\u5728lnmp\u4E0A\u8F93\u5165\u51E0\u4E2A\u7B80\u5355\u7684\u6307\u4EE4\u5C31\u53EF\u4EE5\u628A\u57DF\u540D\u548C\u4F2A\u9759\u6001\u7C7B\u578B\u5173\u8054\u4E0A\uFF0C\u91CD\u542FNginx\u540E\u76F4\u63A5\u751F\u6548~",keywords:"wordpress,rewrite,nginx,lnmp",date:"2018-09-06T01:43:00.000Z",cover:"https://cdn.chengpeiquan.com/img/2018/09/1-2.jpg?x-oss-process=image/interlace,1",categories:["tech"],meta:[{property:"og:title",content:"\u57FA\u4E8Elnmp\u914D\u7F6EWordPress\u7684Nginx\u4F2A\u9759\u6001\u65B9\u6CD5"}]},excerpt:void 0}),(C,l)=>{const e=E;return o(),a(e,{frontmatter:c},{default:r(()=>[D]),_:1})}}});export{k as default,g as excerpt,c as frontmatter};
