import requests
from bs4 import BeautifulSoup
import urllib.request as req
import os
import gzip
import urllib.request
import shutil
from os.path import isfile, join
datalist = []
arr_rslt = []
faa_url = "https://www.ncbi.nlm.nih.gov"

direct_download_result = ""
def searchFaaAndDownload(uer_id):
    global datalist
    global faa_url
    global arr_rslt
    global direct_download_result
    #print("i am in")
    user_id=uer_id
    URL = faa_url + '/genome'
    # Debaryomyces
    PARAMS = {
        "term": user_id,
        "EntrezSystem2.PEntrez.Genome2.Genome2_ResultsPanel.Genome2_DisplayBar.PageSize": 200
    }
    result = requests.get(url=URL, params=PARAMS)
    direct_download_result = result.content
    #print (direct_download_result)
    parsed_html = BeautifulSoup(result.content, "html.parser")
    arr_rslt = parsed_html.find_all('p', attrs={'class': 'title'})
    #print (arr_rslt)
    datalist = []
    hreflist = []
    for item in arr_rslt:
        #print ("i am in arr_rslt")
        URL = faa_url + item.find('a').get('href')
        #print("url is:", URL)
        result = requests.get(url=URL)
        parsed_html = BeautifulSoup(result.content, "html.parser")
        tmp = parsed_html.find_all('span', attrs={'class': 'shifted'})
        linkurl = ""
        for tmp_item in tmp:
            tmp_list = tmp_item.find_all('a')

            for durl in tmp_list:
                if ('protein' in durl.text):
                    if '.faa.gz' in durl.get('href'):
                        print("url_href:", durl.get('href'))
                        linkurl = durl.get('href')
        hreflist.append(linkurl)

    for item in arr_rslt:
        # print(item.find('a').text)
        # print(item.find('a').get('href'))
        datalist.append(item.find('a').text)
    print("datalist:", hreflist)
    if datalist==[]:

        ele_status=elem_download(URL,PARAMS)
        if ele_status==False:
            print ("datalist\n",datalist)
            print ('hreflist\n',hreflist)
        else:
            print ("single")


def elem_download(URL,PARAMS):
    print (URL)
    result = requests.get(url=URL, params=PARAMS)
    parsed_html = BeautifulSoup(result.content, "html.parser")
    tmp = parsed_html.find_all('span', attrs={'class': 'shifted'})
    linkurl = ""
    for tmp_item in tmp:
        tmp_list = tmp_item.find_all('a')
        for durl in tmp_list:
            if ('protein' in durl.text):
                if '.faa.gz' in durl.get('href'):
                    print("url_href:", durl.get('href'))
                    linkurl = durl.get('href')
    if linkurl=="":
        return False
    else:
        faa_file_down(linkurl)
        return True

def ftp_retr(url):
    try:
        testfile = urllib.request.URLopener()
        testfile.retrieve(url, "new.gz")
        return True
    except:
        return False

def faa_file_down(url):
    print("faa requeter")
    name = url.split("/")[-1]
    datapath_f = 'solo_file/media/'
    stat=ftp_retr(url)
    if stat==False:
        while (ftp_retr(url)):
            print ("ftp exception connecting again..")


    op_fn = os.path.splitext(name)[0]
    if os.path.exists(os.path.join(os.path.join(os.getcwd(),datapath_f),"search.faa")):
        print ("search.faa exists removing it...")
        os.remove(os.path.join(os.path.join(os.getcwd(),datapath_f),"search.faa"))
    stat_gz=True
    while (stat_gz):
        if os.path.exists(os.path.join(os.getcwd(),"new.gz")):
            stat_gz=False
    a = open("search.faa", 'w')
    with gzip.open("new.gz", 'rb') as f:
        for line in f:
            # print ("writing")
            a.writelines(line.decode('utf-8'))
    os.remove("new.gz")
    shutil.move("search.faa", join(datapath_f, "search.faa"))
    # file_path=join(join(join("http://localhost:8000","media"),"temp_download"),op_fn)
    # print (file_path)

# print ("Enter the genome name to be searched...")
# uer_id=input()
# searchFaaAndDownload(uer_id)

