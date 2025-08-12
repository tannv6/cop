FROM 471112775614.dkr.ecr.ap-northeast-2.amazonaws.com/cop/devops-amazonlinux-nginx

COPY dist /usr/local/nginx/html

COPY nginx/nginx.conf /usr/local/nginx/conf/nginx.conf

EXPOSE 80

CMD ["/usr/local/nginx/sbin/nginx", "-g", "daemon off;"]