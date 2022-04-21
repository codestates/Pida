#!/bin/bash
cd /home/ubuntu/Pida/server
authbind --deep pm2 start app.js
