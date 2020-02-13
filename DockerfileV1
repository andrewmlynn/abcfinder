FROM continuumio/miniconda3

LABEL base.image="docker_django_image"

#MAINTAINER Naveen Kumar Meena


WORKDIR /django_app

COPY requirements.txt .

USER root

RUN echo "source activate base" > ~/.bashrc
ENV PATH /opt/conda/bin:$PATH
ENV PYTHONPATH /usr/local/lib/python3.7/dist-packages:$PYTHONPATH
ENV PYTHONPATH /usr/lib/python3/dist-packages:$PYTHONPATH
RUN /bin/bash -c "source activate base" && \
    conda install -c plotly -y plotly=3.10.0 plotly-orca  && \
    conda install -c conda-forge -y zip poppler geckodriver  && \
    conda install -c anaconda -y psutil psycopg2  && \
    conda install -c bioconda -y hmmer wkhtmltopdf cd-hit && \
    apt-get update && \
    apt-get install -y python3-pip && \
    pip3 install six && \
    pip3 install -r requirements.txt && \ 
    conda clean -y --all

# Setup the webdriver
RUN apt-get update && apt-get install -y firefox-esr 


# Plotly depedencies
RUN apt-get install -y --no-install-recommends \
        wget \
        xvfb \
        libgtk2.0-0 \
        libxtst6 \
        libxss1 \
        libgconf-2-4 \
        libnss3 \
        libasound2 
RUN apt-get update && apt-get install -y firefox-esr 



EXPOSE 8000

COPY . .

ENTRYPOINT ["/docker-entrypoint.sh"]
