#!/usr/bin/env bash

set -e

# Flash
sed -i 's/\(deb [^ ]* wheezy main\)/\1 contrib/' /etc/apt/sources.list
echo 'deb http://http.debian.net/debian wheezy-backports main' >> /etc/apt/sources.list
apt-get -y remove gnash
apt-get update
apt-get -y upgrade
apt-get -y install hal flashplugin-nonfree nodejs

# Hosts
echo '127.0.0.1 local.1tv.ru' >> /etc/hosts
