rm -rf front
mv dist front
tar -czf front.tar front
scp front.tar root@120.26.174.69:/usr/share/nginx/html/contracttest/front.tar
rm -rf front.tar
ssh root@120.26.174.69 'cd /usr/share/nginx/html/contracttest && rm -rf index.html && rm -rf static && tar -xzf front.tar && rm -rf front.tar'
echo 'done. 👉 http://120.26.174.69/contracttest/front/'
