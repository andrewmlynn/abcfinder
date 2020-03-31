FROM continuumio/miniconda3

LABEL base.image="docker_django_image"

#MAINTAINER Naveen Kumar Meena


WORKDIR /django_app

COPY requirements.txt .


RUN echo "source activate base " > ~/.bashrc
ENV PATH /opt/conda/bin:$PATH
RUN pip --version
RUN . /opt/conda/etc/profile.d/conda.sh && \
    conda activate base && \
    conda install -c plotly -y plotly  plotly-orca  && \
    conda install -c conda-forge -y  kombu biopython zipp selenium matplotlib kiwisolver flower django-widget-tweaks zip poppler geckodriver celery && \
    conda install -c anaconda pip  redis six  psutil scipy  requests numpy pandas jsonschema psutil psycopg2  beautifulsoup4 && \
    #conda install -c auto django-chartjs && \ 
    conda install -c bioconda -y hmmer wkhtmltopdf cd-hit && \
    pip  install django==2.2.7 redis imgkit pdfkit  six django-chartjs  && \
    #apt-get update && \
    apt-get install -y python3-pip && \
    #pip3 install six && \
   #pip3 install Django && \
   #pip3 install -r requirements.txt && \ 
    conda clean -y --all

# Setup the webdriver
RUN  apt-get install -y firefox-esr 


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
#RUN apt-get update && 




EXPOSE 8000

COPY . .
