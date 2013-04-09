#!/bin/bash

# This is the Vagrant provisioning script
which node
if [ "$?" -ne "0" ]; then
  #!/bin/bash
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
  cd /vagrant
  sudo npm install -d

  # Install Componets
  echo "Install components"
  sudo bower install

  # Print a resume of the installation
  echo "-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-"
  echo "Provisioning Done"
  echo ""
  echo "If the version is missing the component is not sucesfully installed"
  echo "GIT " $gitV
  echo "Sass " $sassV
  echo "Compass " $compassV
  echo "Node " $nodeV
  echo "Grunt-cli " $gruntV
  echo "Bower " $bowerV
  echo ""
  echo "Apache is listening on port: 1542"

  echo "-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-"
fi