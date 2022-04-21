#!/bin/bash
cd /home/ubuntu/im-sprint-practice-deploy/server
authbind --deep pm2 start app.js