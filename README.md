# hycon-miner-restarter
hycon miner restarter when server is down

# info
hycon It is a reconnection program for minors.
It automatically re-runs when the server is inaccessible or not properly connected to the server.
Server health check cycle: 2 minutes

## Supported OS
- win x64, x86
- OS X

# prerequisite
- Install nodejs for your computer OS.
https://nodejs.org/en/download/
Supported versions: 8.x, 10.x

# How to install
Uncompress and overwrite the place where the minor is installed.

## window
- Run start_for_window-x64_x86.bat
- Change minor name to xmrig.exe

## mac
- ./start_for_mac.sh
If it does not work, edit the permissions with chmod.
- Change minor name to xmrig