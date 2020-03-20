[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.3718634.svg)](https://doi.org/10.5281/zenodo.3718634)
##
![abc-finder-webserver](https://github.com/lynngroup/abcfinder/blob/master/static/images/abc.png)
##
# Overview 
ABC-Finder i.e., A Docker-based package for the identification of ABC proteins in all organisms, and downstream analysis and visualization of the topology of ABC proteins using an interactive web browser. ABC-Finder is built and deployed in a Linux container, making it scalable for many concurrent users on our servers and also enabling users to download and run ABC-Finder locally. Overall, ABC-Finder is an extremely convenient, portable and platform-independent package for the identification and subsequent domain prediction of ABC proteins. 

# Licence

This program is released as open source software under the terms of [GNU GPLv3](https://github.com/lynngroup/abcfinder/blob/master/LICENSE).

# Installing

You can install ABC-finder-webserver directly from the source code or build and run it from within Docker container.

## Installing directly from source code

Clone this repository: 
```
$ git clone https://github.com/lynngroup/ABC-finder-webserver.git
```

Move into the repository directory:
```
$ cd ABC-finder-webserver
```

Python 3 is required for this software.

ABC-finder-webserver can be installed using `pip` in a variety of ways (`$` indicates the command line prompt):

1. Inside a virtual environment:
```
$ python3 -m venv ABC-finder-webserver_dev
$ source ABC-finder-webserver_dev/bin/activate
$ pip install -U /path/to/ABC-finder-webserver
```
2. Into the global package database for all users:
```
$ pip install -U /path/to/ABC-finder-webserver
```
3. Into the user package database (for the current user only):
```
$ pip install -U --user /path/to/ABC-finder-webserver
```


## Building the Docker container 

The file `Dockerfile` contains instructions for building a Docker container for ABC-finder-webserver.

If you have Docker installed on your computer you can build the container like so:
```
$ docker build -t ABC-finder-webserver .
```
See below for information about running ABC-finder-webserver within the Docker container.




# Running within the Docker container

The following section describes how to run ABC-finder-webserver within the Docker container. It assumes you have Docker installed on your computer and have built the container as described above. 
The container behaves in the same way as the normal version of ABC-finder-webserver, however there are some Docker-specific details that you must be aware of.

The general syntax for running ABC-finder-webserver within Docker is as follows:
```
$ docker run -i ABC-finder-webserver CMD
```
where CMD should be replaced by the specific command line invocation of ABC-finder-webserver. Specific examples are below.




# Bug reporting and feature requests

Please submit bug reports and feature requests to the issue tracker on GitHub:

[ABC-finder-webserver issue tracker](https://github.com/lynngroup/abcfinder/issues)
