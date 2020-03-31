[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.3733587.svg)](https://doi.org/10.5281/zenodo.3733587)
##
![abc-finder-webserver](https://github.com/lynngroup/abcfinder/blob/master/static/images/abc.png)
##
# Overview 
ABC-Finder i.e., A Docker-based package for the identification of ABC proteins in all organisms, and downstream analysis and visualization of the topology of ABC proteins using an interactive web browser. ABC-Finder is built and deployed in a Linux container, making it scalable for many concurrent users on our servers and also enabling users to download and run ABC-Finder locally. Overall, ABC-Finder is an extremely convenient, portable and platform-independent package for the identification and subsequent domain prediction of ABC proteins. 

# Workflow
![abc-finder: workflow](https://github.com/lynngroup/abcfinder/blob/master/abc-finder_feb.svg)
Fig : Generalized workflow and implementation of ABC-Finder. 
# Licence
This program is released as open source software under the terms of [GNU GPLv3](https://github.com/lynngroup/abcfinder/blob/master/LICENSE).

# Installing

You can install ABC-finder-webserver directly from the source code or build and run it from within Docker container.

## Building the Docker container 

Clone this repository: 
```
$ git clone https://github.com/lynngroup/abcfinder.git

```

Move into the repository directory:
```
$ cd abcfinder
```

The file `Dockerfile`  &  docker-compose.yaml contains instructions for building a Docker container for ABC-finder-webserver.

If you have Docker & docker-compose  installed on your computer you can build the container like so:
Once Docker is set up on the host computer, ABC-finder can be downloaded and installed using the following command:

```shell
docker pull lynngroup/abcfinder
```
**This will fetch the latest version with 'latest' tag.**

To run ABC-finder use the following command:
```shell
docker-compose build
docker-compose up -d 
```

This will initiate ABC-finder at port 8000 of local server or localhost. The user may use another port to initiate another instance. [To manipulate Docker utilities refer to Docker Documentation]
While theABC-finder instance is running inside Docker container,ABC-finder User Interface (UI) can be accessed through a web browser at following URL:
- http://localhost:8000/ or
- http://IP_ADDRESS_OF_HOST_COMPUTER:8000

ABC-finder can now be used to upload your data using the browser.

# Bug reporting and feature requests

Please submit bug reports and feature requests to the issue tracker on GitHub:

[ABC-finder-webserver issue tracker](https://github.com/lynngroup/abcfinder/issues)
