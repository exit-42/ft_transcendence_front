# 1. Nginx를 사용해 정적 파일 서빙
FROM nginx:latest

# 2. nignx 경로 설정
WORKDIR /usr/share/nginx/html

# 3. 현 디렉토리의 app 디렉토리를 /usr/share/nginx/html로 복사
COPY ./app /usr/share/nginx/html

# 4. nginx 컨테이너의 80번 포트를 외부로 노출
EXPOSE 80

# 5. nginx 실행 - default 명령어
CMD ["nginx", "-g", "daemon off;"]
