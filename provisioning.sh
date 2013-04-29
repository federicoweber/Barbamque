#!/bin/bash

# This is the Vagrant provisioning script
# add new repo for node
sudo apt-get update

# install apache, make, git and python
echo "Installing Apache, make, git and Python"
sudo apt-get install -y apache2 python-software-properties python g++ make git
# Clear apache folders
rm -rf /var/www
ln -fs /vagrant /var/www
gitV=$(git --version)

# Install Sass & Compass
echo "Install Sass and Compass"
sudo /opt/vagrant_ruby/bin/gem install -V sass compass
sassV=$(sass -v)
compassV=$(compass -v)

# Install Node JS
echo "Install Node"
sudo apt-add-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install -y nodejs
nodeV=$(node -v)

# Install Node modules
echo "Installing Node Modules"
sudo npm install -g bower grunt-cli
bowerV=$(bower -v)
gruntV=$(npm grunt-cli -v)

# Install Dev Dependencies
echo "Install Dev Dependecies"
npm install -d

# Install Componets
echo "Install components"
bower install

# Print a resume of the installation
$(tput setaf 0)
echo -e $(tput setaf 10)"-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-\n"$(tput setaf 0)
echo -e $(tput setaf 2)"Provisioning Done\n"$(tput setaf 0)
echo -e $(tput setaf 9)"If the version is missing the component is not sucesfully installed\n"$(tput setaf 0)
echo $(tput setaf 6)"GIT: " $(tput setaf 2)$gitV$(tput setaf 0)
echo $(tput setaf 6)"Sass: " $(tput setaf 2)$sassV$(tput setaf 0)
echo $(tput setaf 6)"Compass: " $(tput setaf 2)$compassV$(tput setaf 0)
echo $(tput setaf 6)"Node: " $(tput setaf 2)$nodeV$(tput setaf 0)
echo $(tput setaf 6)"Grunt-cli: " $(tput setaf 2)$gruntV$(tput setaf 0)
echo $(tput setaf 6)"Bower: " $(tput setaf 2)$bowerV$(tput setaf 0)
echo -e "\nApache is listening on port:"$(tput setaf 4)" 1542"$(tput setaf 0)
echo $(tput setaf 10)"-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-"$(tput setaf 0)