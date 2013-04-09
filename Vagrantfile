# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.synced_folder ".", "/home/vagrant"
  config.vm.box = "precise32"
  config.vm.box_url = "http://files.vagrantup.com/precise32.box"
  config.vm.network :forwarded_port, guest: 80, host: 1542

  # Provisionining by executing a shell script
  config.vm.provision :shell, :path => "provisioning.sh"
end
