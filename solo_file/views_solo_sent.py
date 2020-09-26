from functools import reduce
from io import BytesIO
import calendar
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
# from selenium.webdriver.common.keys import Keys
# from selenium import webdriver
import re
import time
import os
import csv
import sys
import numpy
import operator
import gzip
import os
import shutil
import urllib.request
from os import listdir
from os.path import isfile, join
import subprocess
# from .models import Seed
# from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
#from Bio import SeqIO
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

# changed part
import shutil
import urllib.request as req
from contextlib import closing

import requests
from bs4 import BeautifulSoup
from django.views.generic import TemplateView
import gzip
import matplotlib.pyplot as plt
from matplotlib.patches import Ellipse
import matplotlib.patches as mpatches
from os import listdir
from os.path import isfile, join
import numpy as np
import zipfile

from chartjs.views.lines import BaseLineChartView
import re
import pandas as pd
import numpy as np
from scipy.interpolate import make_interp_spline, BSpline
from django.http import JsonResponse
from matplotlib.figure import Figure
import random
from django.http import HttpResponse
from matplotlib.backends.backend_agg import FigureCanvasAgg
from matplotlib import pylab
from pylab import *
# import PIL, PIL.Image
# from io import StringIO
import matplotlib.lines as mlines
import matplotlib.ticker as ticker
import pdfkit

########PLOTLY########
import datetime
import glob
import logging
import os
from zipfile import ZipFile
import numpy as np
from io import BytesIO
import plotly.graph_objs as go
from plotly.offline import plot
import plotly.tools as tls
#import plotly.plotly as py
import plotly.io as pio
pio.orca.config.executable = '/opt/conda/bin/orca'
pio.orca.config.save()
# from ipywidgets import interactive, HBox, VBox, widgets, interact
######################

# cap = DesiredCapabilities().FIREFOX

xList = []
fileN = []
markList = []
posyList = []
eNumberList = []
posxEndList = []
data_zip_third_clmn=[]
data_zip_third_seq=[]
# draw from summary
maxv = 0
maxtotal = 0
incount = 0
datalist = []
arr_rslt = []
faa_url = "https://www.ncbi.nlm.nih.gov"
direct_download_result = ""
faa_file_name = ""

post_status=False
diff = []
seq_id = []
rge = []
hmm_parse_stat=False

key_list = []
oupt_file = []
lat_index = []
value_2 = []
draw_graph_1_st = False
driver, URLentry, no_of_iteration, iter_entry, faa_path, dummy = (None,) * 6

inside_cnt=[]
outside_cnt=[]
aa_cnt=[]
seq_id_cnt=[]
rdbox_pair_cnt=[]
return_data1 = []
e_value_1 = []
score_1 = []
options = Options()
options.set_headless(headless=True)
html_path = ''
identity_cutoff=5
e_value_cutoff=0.9

# Check folder is exists or not
def check_and_mk_dir(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)


def solo_fnc2(pid,jid):
    movable_path = "solo_file/media/data_" + str(jid) + "/graph3/"  
    user_result=   'solo_file/media/'+str(jid)+"/" 
    check_and_mk_dir("solo_file/media/data_" + str(jid) + "/")
    check_and_mk_dir("solo_file/media/data_" + str(jid) + "/graph3")    
    shutil.move(join(os.getcwd(), "solo_file/media/all_data1.csv"), join(join(os.getcwd(), movable_path), "all_data1.csv"))
    shutil.move(join(os.getcwd(), "solo_file/media/all_data.csv"), join(join(os.getcwd(), movable_path), "all_data.csv"))
    shutil.move(join(os.getcwd(), "solo_file/media/hmm_output"), join(join(os.getcwd(), movable_path), "hmm_output"))
    shutil.copy(join(os.getcwd(), "solo_file/media/search.faa"), join(join(os.getcwd(), movable_path), "search.faa"))
    shutil.copy(join(os.getcwd(), "solo_file/media/data_"+str(jid)+"/graph3/hmm_output"), join(join(os.getcwd(), user_result), "hmm_output"))
    shutil.copy(join(os.getcwd(), "solo_file/media/data_"+str(jid)+"/graph3/search.faa"), join(join(os.getcwd(), user_result), "search.faa"))
    #shutil.copy(join(os.getcwd(), "solo_file/media/data_"+str(jid)+"/graph3/search_faa1.faa"), join(join(os.getcwd(), user_result), "search_faa1.faa"))
    #shutil.copy(join(os.getcwd(), "solo_file/media/data_"+str(jid)+"/graph3/search_faa0.clstr"), join(join(os.getcwd(), user_result), "search_faa0.clstr"))
    #shutil.copy(join(os.getcwd(), "solo_file/media/data_"+str(jid)+"/graph3/threshold.txt"), join(join(os.getcwd(), user_result), "threshold.txt"))
    shutil.copy(join(os.getcwd(), "solo_file/media/profile.hmm"), join(join(os.getcwd(), user_result), "profile.hmm"))
    
    hmm_parse(2, join(movable_path,"search.faa"), 3,pid,jid)
    data_path = join("solo_file/media/data_"+str(jid)+"/", "graph3")
    for files_data in os.listdir(data_path):
        # print ("files",files_data)
        if "NP_" in files_data:
            os.remove(join(data_path, files_data))
    for files_data in os.listdir(data_path):
        # print ("files",files_data)
        if "_summary" in files_data:
            os.remove(join(data_path, files_data))
    data_path1=join(join(os.getcwd(),"solo_file/media/"),"data_"+str(jid))
    print ("running command")
    cmd = "cd-hit -i search_faa0.faa -o search_faa0  -c "+str(e_value_cutoff)+" -n "+str(identity_cutoff)
    print("cd-hit is completed",cmd)
    hm = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True, cwd=os.path.join(os.getcwd(), 'solo_file/media/data_'+str(jid)+'/graph3')).communicate()[0]
    generate_clstr("solo_file/media/data_"+str(jid)+"/graph3/search_faa0.faa",pid,jid)

    path_file = join(join(join(os.getcwd(),data_path1),"graph3"),'search_faa1.faa')
    get_plotv2_file(path_file,pid,jid)
    while (hmm_parse_stat == False):
        a = 0
    getPlotly2D_3(data_path,pid,jid)

    print("plotting done")

def solo_fnc1(pid,jid):
    stat = True
    global draw_graph_1_st
    draw_graph_1_st = True

    movable_path = "solo_file/media"

    while (os.path.exists(os.path.join(os.path.join(os.getcwd(), movable_path), "hmm_output"))):
        print("hmm_output exists removing it...")
        os.remove(os.path.join(os.path.join(os.getcwd(), movable_path), "hmm_output"))
    hm = subprocess.Popen("which hmmbuild", stdout=subprocess.PIPE, shell=True).communicate()[0]
    ##copying profile.hmm file
    #shutil.copyfile("solo_file/profile.hmm","solo_file/media_"+str(pid)+"/profile.hmm")
    #print("********** copied ***********")
    ##copied file
    #cmd="hmmsearch solo_file/media/profile.hmm "+movable_path+"/search.faa > "+movable_path+"/hmm_output"
    hm1 = subprocess.Popen("hmmsearch solo_file/media/profile.hmm solo_file/media/search.faa > solo_file/media/hmm_output", shell=True).communicate()[0]
    time.sleep(5)
    f = open('solo_file/media/hmm_output').read()  # After building hmm_output, change the filename "test2.txt" to "hmm_output".
    data = f[f.find('    -'):f.find('\n\n\n')].split('\n')[3:]
    all_data = []
    for line in data:
        if 'threshold' not in line:
            line = line.strip()
            all_data.append(list(map(float, re.split(r'\s+', line)[0:2])))
        else:
            break
    print(all_data)
    if os.path.exists(os.path.join(os.path.join(os.getcwd(), "solo_file/media"), "all_data.csv")):
        print("all_data.csv exists removing it...")
        os.remove(os.path.join(os.path.join(os.getcwd(), "solo_file/media"), "all_data.csv"))
    if os.path.exists(os.path.join(os.path.join(os.getcwd(), "solo_file/media"), "all_data1.csv")):
        print("all_data1.csv exists removing it...")
        os.remove(os.path.join(os.path.join(os.getcwd(), "solo_file/media/" ), "all_data1.csv"))
    with open('solo_file/media/all_data.csv', 'wb') as f:
        np.savetxt(f, all_data, fmt='%.2e %.2f', delimiter=',')
    read_data = np.genfromtxt('solo_file/media/all_data.csv')
    x = list(x for x in range(read_data.shape[0]))
    y1 = [np.log10(x) for x in read_data[:, 0]]
    y2 = read_data[:, 1]

    xnew = np.linspace(min(x), max(x), 30)

    spl1 = make_interp_spline(x, y1, k=3)
    spl2 = make_interp_spline(x, y2, k=3)

    y1_new = spl1(xnew)
    y2_new = spl2(xnew)

    fig, ax1 = plt.subplots()

    color = 'r'
    ax1.set_ylabel('Domain Score', color=color)
    ax1.plot(xnew, y2_new, color=color, linewidth=20)
    ax1.tick_params(axis='y', labelcolor=color)
    ax1.xaxis.set_ticks(np.arange(0, 460, 40))

    ax2 = ax1.twinx()

    color = 'k'
    ax2.set_ylabel('E-value', color=color)
    ax2.plot(xnew, y1_new, color=color, linewidth=20)
    ax2.tick_params(axis='y', labelcolor=color)

    y_labels = ax2.get_yticks()
    ax2.yaxis.set_major_formatter(ticker.FormatStrFormatter('%0.0e'))

    e_val = mlines.Line2D([], [], color='k',
                          marker='_', linestyle='None',
                          markersize=10, label='E-Value')

    score = mlines.Line2D([], [], color='r',
                          marker='_', linestyle='None',
                          markersize=10, label='Score')

    plt.legend(handles=[e_val, score])
    all_data1 = []

    f = open('solo_file/media/hmm_output').read()
    data1 = f[f.find('    -'):f.find('\n\n\n')].split('\n')[3:]

    for line in data1:
        if 'threshold' not in line:
            line = line.strip()
            all_data1.append(list(map(float, re.split(r'\s+', line)[0:1])))
            all_data1.append(list(map(float, re.split(r'\s+', line)[1:2])))
            all_data1.append(list(re.split(r'\s+', line)[8:9]))

        else:
            break

    np_array = np.reshape(np.array(all_data1), (-1, 3))
    pd.DataFrame(np_array).to_csv("solo_file/media/all_data1.csv")
    # print(np_array)

    df = pd.read_csv("solo_file/media/all_data1.csv")
    # If you know the name of the column skip this
    first_column = df.columns[0]
    # Delete first
    df = df.drop([first_column], axis=1)
    df.to_csv('solo_file/media/all_data1.csv', index=False)
    # plt.show()
    # fig = plt.gcf()
    # plotly_fig = tls.mpl_to_plotly(fig)
    # fig = go.Figure(data=data, layout=layout)
    trace1 = go.Scatter(
        x=xnew,
        y=y1_new,
        name='E-value',
        line={'color': 'rgba (0, 0, 0, 1)', 'dash': 'solid', 'width': 5.0}
    )
    trace2 = go.Scatter(
        x=xnew,
        y=y2_new,
        name='Domain Score',
        line={'color': 'rgba (255, 0, 0, 1)', 'dash': 'solid', 'width': 5.0},
        yaxis='y2'
    )
    data = [trace1, trace2]
    f2 = open("solo_file/media/search.faa", 'r')
    data_na = f2.readlines()
    file_n1 = str(data_na[0].split('[')[1].split(']')[0])
    file_n2 = file_n1.split(" ")
    file_n2.pop(-1)
    file_n3 = ""
    for item in file_n2:
        file_n3 = file_n3 + str(item)
    layout = go.Layout(
        title=file_n1,
        yaxis=dict(
            title='E-value',
            titlefont=dict(
                color='rgb(0,0,0)'
            ),
            tickfont=dict(
                color='rgb(0,0,0)'
            ),
            side='right',
            # exponentformat='e',
            tickformat="e",
        ),
        yaxis2=dict(
            title='Domain Score',
            titlefont=dict(
                color='rgb(255, 0, 0)'
            ),
            tickfont=dict(
                color='rgb(255, 0, 0)'
            ),
            overlaying='y',
            side='left',
            # exponentformat = 'e',
        ),

        legend=dict(
            x=0,
            y=1.16,
            traceorder='normal',
            font=dict(
                family='sans-serif',
                size=12,
                color='#000'
            ),
            bgcolor='#FFFFFF',
            bordercolor='#E2E2E2',
            borderwidth=2
        ),
    )

    plotly_fig = go.Figure(data=data, layout=layout)
    plotly_fig['layout']['yaxis']['showgrid'] = False
    # plotly_fig['data'].append( dict(x=xnew, y=y2_new, type='scatter', mode='lines') )
    plot_div = plot(plotly_fig, output_type='file', include_plotlyjs=True, auto_open=False)
    shutil.move(plot_div, html_path+"E-value_Domain_Score.html")
    plotly_fig.write_image(html_path+"E-value_Domain_Score.pdf")
    plotly_fig.write_image(html_path+"E-value_Domain_Score.svg")
    plotly_fig.write_image(html_path+"E-value_Domain_Score.png")
    plotly_fig.write_image(html_path+"E-value_Domain_Score.jpeg")
    #return JsonResponse({'plot': plot_div})
def hmm_parse(opt, faa_path, gpreq,pid,jid):
    global return_data1,e_value_1,score_1,hmm_parse_stat
    alldata_str_0 = []
    alldata_str_1 = []
    alldata1_str_1 = []
    alldata1_str_0 = []
    return_data = []
    return_data1 = []
    all_data_xp = []
    e_value_0 = []
    score_0 = []
    e_value_1 = []
    score_1 = []
    movable_path = "solo_file/media/data_" + str(jid) + "/graph3/"
    f = open(join(join(os.getcwd(),movable_path),
                  "hmm_output")).read()  # After building hmm_output, change the filename "test2.txt" to "hmm_output".
    data = f[f.find('    -'):f.find('\n\n\n')].split('\n')[3:]
    all_data = []
    all_data1 = []
    for line in data:
        if 'threshold' not in line:
            line = line.strip()
            all_data.append(list(map(float, re.split(r'\s+', line)[0:2])))
            all_data1.append(list(map(float, re.split(r'\s+', line)[3:5])))
            all_data_xp.append(list(map(str, re.split(r'\s+', line)[8:9])))
        else:
            break
    for line in all_data:
        alldata_str_0.append(str(line[0]))
        alldata_str_1.append(str(line[1]))
    for line in all_data1:
        alldata1_str_0.append(str(line[0]))
        alldata1_str_1.append(str(line[1]))
    for index, item in enumerate(alldata_str_0):
        if 'e-' in item:
            continue
        else:
            data_index = index
            break
    for index, item in enumerate(alldata1_str_0):
        if 'e-' in item:
            continue
        else:
            data1_index = index
            break
    all_data_xp = reduce(operator.concat, all_data_xp)
    # print (reduce(operator.concat,all_data_xp ))
    for index_g4 in range(0, data_index):
        return_data.append(all_data_xp[index_g4])
        e_value_0.append(alldata_str_0[index_g4])
        score_0.append(alldata_str_1[index_g4])
    for index_g4 in range(0, data1_index):
        return_data1.append(all_data_xp[index_g4])
        e_value_1.append(alldata1_str_0[index_g4])
        score_1.append(alldata1_str_1[index_g4])

    if gpreq == 2:
        file_name = "solo_file/media/data_"+str(jid)+"/search_faa0.faa"
        f1 = (open(file_name, 'w'))
    else:
        file_name = "solo_file/media/data_"+str(jid)+"/graph3/search_faa0.faa"
        f1 = (open(file_name, 'w'))

    if opt == 1:
        with open("solo_file/media/data_"+str(jid)+"/graph3/1_2.txt", 'w') as one_f:
            one_f.writelines("E-Value  Score  Seq-Id")
            one_f.writelines("\n")
            for data_i, data_w in enumerate(e_value_0):
                one_f.writelines(data_w + "  " + score_0[data_i] + "  " + return_data[data_i])
                one_f.writelines("\n")

        # print (alldata_str_0[data_index]," ",alldata_str_1[data_index]," ",data_index-1)
        # print(alldata1_str_0[data1_index], " ", alldata1_str_1[data1_index]," ",data1_index-1)
        with open(faa_path) as f:
            datafile = f.readlines()
        # print (return_data)
        for index, line in enumerate(datafile):
            for item in return_data:
                # print (line)
                if item in (line):
                    f1.writelines(line)
                    stat = True
                    stat_index = index + 1
                    while (stat):
                        try:
                            if '>' in datafile[stat_index]:
                                stat = False
                                # f1.writelines(':::::::::::""""""""""::::::::::::::::::::::::::::::::"""""""""""""""""""""""""')
                                # f1.writelines('\n')
                            else:
                                f1.writelines(datafile[stat_index])
                            stat_index = stat_index + 1
                        except:
                            stat = False
                            break
    else:
        with open("solo_file/media/data_"+str(jid)+"/graph3/threshold.txt", 'w') as one_f:
            one_f.writelines("E-Value  Score  Seq-Id")
            one_f.writelines("\n")
            for data_i, data_w in enumerate(e_value_1):
                one_f.writelines(data_w + "  " + score_1[data_i] + "  " + return_data1[data_i])
                one_f.writelines("\n")
        with open(faa_path) as f:
            datafile = f.readlines()
        print(return_data1)
        for index, line in enumerate(datafile):

            for item in return_data1:
                if item in line:
                    f1.writelines(line)
                    stat = True

                    stat_index = index + 1
                    # print(stat_index)
                    while (stat):
                        try:
                            if '>' in datafile[stat_index]:
                                stat = False
                                # f1.writelines(':::::::::::""""""""""::::::::::::::::::::::::::::::::"""""""""""""""""""""""""')
                                # f1.writelines('\n')
                            else:
                                f1.writelines(datafile[stat_index])
                            stat_index = stat_index + 1
                        except:
                            stat = False
                            # print ("exception")
                            break
        # print ("done")
    hmm_parse_stat=True

def drawable(filename, plot_path):
    flag = False
    txt = plot_path + "/{}"
    with open(txt.format(filename), 'rb') as f:
        while True:
            line = f.readline()
            if line == '':
                continue
            if not line:
                break
            params = line.split()
            pos_start = int(params[0])
            pos_end = int(params[1])
            mark = str(params[2])
            if mark.find("in") != -1:
                if (pos_end - pos_start > 50):
                    flag = True
            elif mark.find("notop") != -1:

                flag = True
    return flag

def generate_clstr(faa_path,pid,jid):
    line_clstr=[]
    file_name1 = "solo_file/media/data_"+str(jid)+"/graph3/search_faa1.faa"
    f21 = (open(file_name1, 'w'))
    #shutil.copyfile("solo_file/media/search_faa0.clstr","solo_file/media/data_"+str(jid)+"/graph3/search_faa0.clstr")
    with open ("solo_file/media/data_"+str(jid)+"/graph3/search_faa0.clstr") as f:
        listfile=f.readlines()
        for items in listfile:
            if 'Cluster' in items:
                a=0
            else:
                #print (items)
                line_clstr.append(items.split(">")[1].split(".")[0])
    print (line_clstr)
    with open(faa_path) as f:
        datafile = f.readlines()
    #print(return_data1)
    for item in line_clstr:
        #print(item)
        for index, line in enumerate(datafile):
            if item in line:
                f21.writelines(line)
                stat = True

                stat_index = index + 1
                # print(stat_index)
                while (stat):
                    try:
                        if '>' in datafile[stat_index]:
                            stat = False
                            # f1.writelines(':::::::::::""""""""""::::::::::::::::::::::::::::::::"""""""""""""""""""""""""')
                            # f1.writelines('\n')
                        else:
                            f21.writelines(datafile[stat_index])
                        stat_index = stat_index + 1
                    except:
                        stat = False
                        # print ("exception")
                        break

def get_plotv2_file(path_file,pid,jid):
    global data_zip_third_clmn, data_zip_third_seq
    
    print("generating plotv2 file")
    user_result= 'solo_file/media/'+str(jid)+"/"
    cmd1='/usr/local/bin/docker run -e USER_ID=$(id -u $USER) -v /topcons/data/topcons2_database:/data/topcons2_database -v /rough/abcfinder_complete_working//solo_file/media/data_'+str(jid)+'/graph3:/tmp/ -it --name '+str(jid)+' -d --cpus 0.6 nanjiang/topcons2'
    out1=subprocess.Popen(cmd1, stdout=subprocess.PIPE, shell=True, cwd=os.path.join(os.getcwd(),"")).communicate()[0]
    time.sleep(10)
    cmd2='/usr/local/bin/docker exec --user user '+str(jid)+' script /dev/null -c "/app/topcons2/run_topcons2.sh /tmp/search_faa1.faa -outpath  /tmp/'+str(jid)+'/"'
    out2=subprocess.Popen(cmd2, stdout=subprocess.PIPE, shell=True, cwd=os.path.join(os.getcwd(),"")).communicate()[0]
    print(out2)
    
    f2= open('/django_app/solo_file/media/data_'+str(jid)+'/graph3/'+str(jid)+'/search_faa1/query.result.txt', 'r')
    f1 = open('/django_app/solo_file/media/data_'+str(jid)+'/graph3/plotv2.txt', 'w')
    # f2= open('solo_file/media/data_f0a1bcbb/graph3/query.result.txt', 'r')
    # f1 = open('solo_file/media/data_f0a1bcbb/graph3/plotv2.txt', 'w')
    for line in f2.readlines():
        f1.writelines(line)
     
    #shutil.copy(join(os.getcwd(), 'solo_file/media/data_'+str(jid)+'/graph3/'+str(jid)+'/search_faa1/query.result.txt'), join(join(os.getcwd(), user_result), 'query.result.txt'))    

    cmd3='/usr/local/bin/docker container stop '+str(jid)+' && docker rm '+str(jid)+''
    out=subprocess.Popen(cmd3, stdout=subprocess.PIPE, shell=True, cwd=os.path.join(os.getcwd(),"")).communicate()[0]
    

def only_o_check(f1, plot_path):
    txt = plot_path + "/{}"
    with open(txt.format(f1), 'rb') as f5:

        only_o = False
        while True:
            data_d = f5.readline()
            if data_d == '':
                continue
            if not data_d:
                break
            params_d = data_d.split()
            mark_d = str(params_d[2])
            if mark_d.find("in") != -1:
                only_o = True
                break
            elif mark_d.find("trans") != -1:
                only_o = True
                break
            elif mark_d.find("notop") != -1:
                only_o = True
                break
        if only_o == False:
            return True
        else:
            return False

def o_range(diff):
    if diff > 165 and diff < 700:
        return 'i'
    else:
        return 'dummy'
def i_range(diff):
    if diff > 210 and diff < 595:
        return 'i' 

def draw_with_summary(filename, plot_path, pos_y):
    global fileN, xList, markList, posyList, eNumberList, posxEndList, diff, seq_id, rge
    global maxv
    global return_data1, e_value_1, score_1
    global inside_cnt,outside_cnt,aa_cnt,seq_id_cnt,rdbox_pair_cnt
    n = 0
    eNumber = 0
    diff = []
    seq_id = []
    rge = []
    markList_dummy=[]
    # print ("draw summary")

    txt = plot_path + "/{}"
    first_entry = False
    with open(txt.format(filename), 'rb') as f:
        # f2=f
        stat_o = only_o_check(filename, plot_path)
        o_start = True
        n_stat=False
        print(stat_o, ":", filename)
        if stat_o != True:
            while True:
                line = f.readline()
                if line == '':
                    continue
                if not line:
                    break
                params = line.split()
                # print (filename)
                # print(params)
                pos_start = int(params[0])
                pos_end = int(params[1])
                mark = str(params[2])

                if mark.find("in") != -1:
                    first_entry = True
                    if i_range(pos_end - pos_start ):
                        mk = 'i'
                        eNumber += 1
                    else:
                        mk = 'o'
                elif mark.find("trans") != -1:
                    first_entry = True
                    mk = 't'

                elif mark.find("notop") != -1:
                    first_entry = True
                    mk = 'n'
                    n_stat=True
                    eNumber += 1
                else:

                    if o_start == False:
                        if first_entry == True:
                            mk = 'o'
                        else:
                            o_start = True
                            mk = o_range(pos_end - pos_start)
                            if mk == 'i':
                                eNumber += 1
                    else:
                        mk = o_range(pos_end - pos_start)
                        if mk=='i':
                            eNumber += 1
                        else:
                            mk='o'

                # print(mark)
                if (mk=='i' or mk=='n') and eNumber>2:
                    mk='o'

                # print(mark)
                markList.append(mk)
                markList_dummy.append(mk)
                posyList.append(pos_y)
                eNumberList.append(eNumber)
                n = n + 1
                xList.append([pos_start, pos_end])
                # print('ok', pos_start)
                if maxv <= pos_end:
                    maxv = pos_end
                if n_stat==True:
                    maxv=0
        else:
            markList.append("dummy")
            posyList.append(pos_y)
            eNumberList.append(eNumber)
            n = n + 1
            xList.append([0, 0])
            # print('ok', pos_start)
            if maxv <= 0:
                maxv = 0
    inside_cnt.append(markList_dummy.count('i'))
    outside_cnt.append(markList_dummy.count('t'))
    aa_cnt.append(maxv)
    seq_id_cnt.append(filename.split(".")[0])
    started_li = False
    stat_li = 0
    for element in markList_dummy:
        if element == 't':
            started_li = True
        if element == 'i' and started_li == True:
            stat_li = stat_li + 1
            started_li = False
    if started_li == True:
        stat_li = stat_li + 1
    rdbox_pair_cnt.append(stat_li)
    fileN.append(n)
    posxEndList.append(maxv)
    return n

def Sort_Tuple(tup):
    # getting length of list of tuples
    lst = len(tup)
    for i in range(0, lst):
        for j in range(0, lst - i - 1):
            if (tup[j][1] > tup[j + 1][1]):
                temp = tup[j]
                tup[j] = tup[j + 1]
                tup[j + 1] = temp
    return tup

def getPlotly2D_3(plot_path,pid,jid):
    print ("getting plot3")
    global fileN, xList, markList,posyList,threshold_value
    global maxv
    global maxtotal,rdbox_pair_cnt
    global data_zip_third_clmn, data_zip_third_seq,html_path
    xList = []
    fileN = []
    markList = []
    posyList=[]
    # draw from summary
    maxv = 0
    maxtotal = 0
    incount = 0
    # print (os.getcwd())
    datapath = plot_path
    html_path = 'solo_file/media/'+str(jid)+"/"
    # datapath = './media/data'
    file_name = []
    with open(join(plot_path,"plotv2.txt")) as ofile:
        line_o = ofile.readlines()
        file_no = 1
        sequence_name=[]
        for line_in, lines_1 in enumerate(line_o):
            count_i = 0
            i_line = ""
            m_line = ""
            o_line = ""
            #print (lines_1)
            if 'Sequence name' in lines_1:
                sequence_name.append(lines_1.split(":")[1].split(" ")[1])
                print(sequence_name[-1])
            if 'TOPCONS predicted topology' in lines_1:
                line_data = line_o[line_in + 1]
                if '***No topology could be produced with this method***' in line_data:
                    file_name.append(str(sequence_name[-1]) + "_summary.txt")
                    f_opn = open(join("solo_file/media/data_"+str(jid)+"/graph3", file_name[-1]), 'w')

                    seq_name_no = sequence_name[-1]
                    with open(join("solo_file/media/data_"+str(jid)+"/graph3", "hmm_output")) as f1:
                        hmm_file = f1.readlines()
                        text_sear = ">> " + seq_name_no
                        loop_st = True
                        cnt = 0
                        start = 0
                        end = 300
                        # print ("text_search: ",text_sear)
                        for ind_lin, data_lin in enumerate(hmm_file):
                            if text_sear in data_lin:
                                # print ("tet found")
                                ind_lin1 = ind_lin + 2
                                while (loop_st):
                                    data_to_write = []
                                    # print (hmm_file[ind_lin1])
                                    while (loop_st):
                                        # print(len(hmm_file[ind_lin1]))
                                        if len(hmm_file[ind_lin1]) == 1:
                                            loop_st = False
                                        else:
                                            # print ("writing ",hmm_file[ind_lin1])
                                            data_to_write.append(hmm_file[ind_lin1])
                                            data_to_write.append("\n")
                                            ind_lin1 = ind_lin1 + 1

                                    with open(join("solo_file/media/data_"+str(jid)+"/graph3", "dummy.txt"), 'a') as dummy_f:
                                        for data_w in data_to_write:
                                            dummy_f.writelines(data_w)

                                    f1 = open(join("solo_file/media/data_"+str(jid)+"/graph3", "dummy.txt")).read()
                                    item_algo = f1[f1.find('--'):f1.find('\n\n\n')].split('\n')
                                    # print(item_algo)
                                    file_name.append(str(sequence_name[-1]) + "_summary.txt")
                                    f_opn = open(join("solo_file/media/data_"+str(jid)+"/graph3", file_name[-1]), 'w')
                                    for index_algo, ind_lin1 in enumerate(item_algo):
                                        # print("ind_lin1",ind_lin1)
                                        if index_algo != 0 and ind_lin1 != "":
                                            line = ind_lin1.strip()
                                            score_algo = (list(map(str, re.split(r'\s+', line)[2:3])))
                                            hmm_from_algo = (list(map(str, re.split(r'\s+', line)[6:7])))
                                            hmm_to_algo = (list(map(str, re.split(r'\s+', line)[7:8])))
                                            score_algo = score_algo[0]
                                            hmm_from_algo = hmm_from_algo[0]
                                            hmm_to_algo = hmm_to_algo[0]
                                            # print (int(float(score_algo)))
                                            # print(int(float(hmm_from_algo)))
                                            # print(int(float(hmm_to_algo)))
                                            if ((int(float(score_algo)) >= 30) or (
                                                    int(float(hmm_from_algo)) == 1)):
                                                if ((int(float(hmm_to_algo)) <= 170) and (
                                                        int(float(hmm_to_algo)) >= 50)):
                                                    cnt = cnt + 1

                                                    i_line = str(start) + " " + str(
                                                        end) + " notop transmembrane helix"
                                                    start = start + 300
                                                    end = end + 300
                                                    f_opn.writelines(i_line)
                                                    f_opn.writelines("\n")
                                                    i_line = str(start) + " " + str(end - 300) + " outside"
                                                    f_opn.writelines(i_line)
                                                    f_opn.writelines("\n")
                                                elif ((int(float(hmm_to_algo)) <= 150) and (
                                                        int(float(hmm_to_algo)) >= 30)):

                                                    cnt = cnt + 1

                                                    i_line = str(start) + " " + str(
                                                        end) + " notop transmembrane helix"
                                                    start = start + 300
                                                    end = end + 300
                                                    f_opn.writelines(i_line)
                                                    f_opn.writelines("\n")
                                                    i_line = str(start) + " " + str(end - 300) + " outside"
                                                    f_opn.writelines(i_line)
                                                    f_opn.writelines("\n")
                                    dummy_f.close()
                                    dummy_f = open(join("solo_file/media/data_"+str(jid)+"/graph3", "dummy.txt"), 'w')
                                    dummy_f.close()
                        file_no = file_no + 1
                        f_opn.close()
                elif 'o' in line_data:
                    if 'i' not in line_data:
                        if 'm' not in line_data:
                #:
                            file_name.append(str(sequence_name[-1]) + "_summary.txt")
                            f_opn = open(join("solo_file/media/data_"+str(jid)+"/graph3", file_name[-1]), 'w')        



                            seq_name_no=sequence_name[-1]
                            with open (join("solo_file/media/data_"+str(jid)+"/graph3","hmm_output")) as f1:
                                hmm_file = f1.readlines()
                                text_sear = ">> " + seq_name_no
                                loop_st = True
                                cnt = 0
                                start = 0
                                end = 300
                                # print ("text_search: ",text_sear)
                                for ind_lin, data_lin in enumerate(hmm_file):
                                    if text_sear in data_lin:
                                        # print ("tet found")
                                        ind_lin1 = ind_lin + 2
                                        while (loop_st):
                                            data_to_write = []
                                            # print (hmm_file[ind_lin1])
                                            while (loop_st):
                                                # print(len(hmm_file[ind_lin1]))
                                                if len(hmm_file[ind_lin1]) == 1:
                                                    loop_st = False
                                                else:
                                                    # print ("writing ",hmm_file[ind_lin1])
                                                    data_to_write.append(hmm_file[ind_lin1])
                                                    data_to_write.append("\n")
                                                    ind_lin1 = ind_lin1 + 1

                                            with open(join("solo_file/media/data_"+str(jid)+"/graph3", "dummy.txt"), 'a') as dummy_f:
                                                for data_w in data_to_write:
                                                    dummy_f.writelines(data_w)

                                            f1 = open(join("solo_file/media/data_"+str(jid)+"/graph3", "dummy.txt")).read()
                                            item_algo = f1[f1.find('--'):f1.find('\n\n\n')].split('\n')
                                            # print(item_algo)
                                            file_name.append(str(sequence_name[-1]) + "_summary.txt")
                                            f_opn = open(join("solo_file/media/data_"+str(jid)+"/graph3", file_name[-1]), 'w')
                                            for index_algo, ind_lin1 in enumerate(item_algo):
                                                # print("ind_lin1",ind_lin1)
                                                if index_algo != 0 and ind_lin1 != "":
                                                    line = ind_lin1.strip()
                                                    score_algo = (list(map(str, re.split(r'\s+', line)[2:3])))
                                                    hmm_from_algo = (list(map(str, re.split(r'\s+', line)[6:7])))
                                                    hmm_to_algo = (list(map(str, re.split(r'\s+', line)[7:8])))
                                                    score_algo = score_algo[0]
                                                    hmm_from_algo = hmm_from_algo[0]
                                                    hmm_to_algo = hmm_to_algo[0]
                                                    # print (int(float(score_algo)))
                                                    # print(int(float(hmm_from_algo)))
                                                    # print(int(float(hmm_to_algo)))
                                                    if ((int(float(score_algo)) >=30) or (
                                                            int(float(hmm_from_algo)) == 1)):
                                                        if ((int(float(hmm_to_algo)) <= 170) and (
                                                                int(float(hmm_to_algo)) >= 50)):
                                                            cnt = cnt + 1

                                                            i_line = str(start) + " " + str(
                                                                end) + " notop transmembrane helix"
                                                            start = start + 300
                                                            end = end + 300
                                                            f_opn.writelines(i_line)
                                                            f_opn.writelines("\n")
                                                            i_line = str(start) + " " + str(end - 300) + " outside"
                                                            f_opn.writelines(i_line)
                                                            f_opn.writelines("\n")
                                                        elif ((int(float(hmm_to_algo)) <= 150) and (
                                                                int(float(hmm_to_algo)) >= 30)):

                                                            cnt = cnt + 1

                                                            i_line = str(start) + " " + str(
                                                                end) + " notop transmembrane helix"
                                                            start = start + 300
                                                            end = end + 300
                                                            f_opn.writelines(i_line)
                                                            f_opn.writelines("\n")
                                                            i_line = str(start) + " " + str(end - 300) + " outside"
                                                            f_opn.writelines(i_line)
                                                            f_opn.writelines("\n")
                                            dummy_f.close()
                                            dummy_f = open(join("solo_file/media/data_"+str(jid)+"/graph3", "dummy.txt"), 'w')
                                            dummy_f.close()
                                file_no = file_no + 1
                                f_opn.close()
                        else:        
                            count_i = [(ind.start(), ind.end(), 'i') for ind in re.finditer('i+', line_data)]
                            count_i = count_i + [(ind.start(), ind.end(), 'o') for ind in re.finditer('o+', line_data)]
                            count_i = count_i + [(ind.start(), ind.end(), 'M') for ind in re.finditer('M+', line_data)]
                            trace_data = Sort_Tuple(count_i)
                            file_name.append(str(sequence_name[-1]) + "_summary.txt")
                            f_opn = open(join("solo_file/media/data_"+str(jid)+"/graph3",file_name[-1]), 'w')
                            if len(count_i) > 0 :
                                for element in trace_data:
                                    if element[2] == 'i':
                                        i_line = str(element[0]) + " " + str(element[1]) + " inside"
                                        f_opn.writelines(i_line)
                                        f_opn.writelines("\n")
                                    elif element[2] == 'o':
                                        i_line = str(element[0]) + " " + str(element[1]) + " outside"
                                        f_opn.writelines(i_line)
                                        f_opn.writelines("\n")
                                    else:
                                        i_line = str(element[0]) + " " + str(element[1]) + " transmembrane helix"
                                        f_opn.writelines(i_line)
                                        f_opn.writelines("\n")
                            file_no = file_no + 1
                            f_opn.close()
                    else:
                        count_i = [(ind.start(), ind.end(), 'i') for ind in re.finditer('i+', line_data)]
                        count_i = count_i + [(ind.start(), ind.end(), 'o') for ind in re.finditer('o+', line_data)]
                        count_i = count_i + [(ind.start(), ind.end(), 'M') for ind in re.finditer('M+', line_data)]
                        trace_data = Sort_Tuple(count_i)
                        file_name.append(str(sequence_name[-1]) + "_summary.txt")
                        f_opn = open(join("solo_file/media/data_"+str(jid)+"/graph3",file_name[-1]), 'w')
                        if len(count_i) > 0:
                            for element in trace_data:
                                if element[2] == 'i':
                                    i_line = str(element[0]) + " " + str(element[1]) + " inside"
                                    f_opn.writelines(i_line)
                                    f_opn.writelines("\n")
                                elif element[2] == 'o':
                                    i_line = str(element[0]) + " " + str(element[1]) + " outside"
                                    f_opn.writelines(i_line)
                                    f_opn.writelines("\n")
                                else:
                                    i_line = str(element[0]) + " " + str(element[1]) + " transmembrane helix"
                                    f_opn.writelines(i_line)
                                    f_opn.writelines("\n")
                        file_no = file_no + 1
                        f_opn.close()
                else:
                    count_i = [(ind.start(), ind.end(), 'i') for ind in re.finditer('i+', line_data)]
                    count_i = count_i + [(ind.start(), ind.end(), 'o') for ind in re.finditer('o+', line_data)]
                    count_i = count_i + [(ind.start(), ind.end(), 'M') for ind in re.finditer('M+', line_data)]
                    trace_data = Sort_Tuple(count_i)
                    file_name.append(str(sequence_name[-1]) + "_summary.txt")
                    f_opn = open(join("solo_file/media/data_"+str(jid)+"/graph3",file_name[-1]), 'w')
                    if len(count_i) > 0:
                        for element in trace_data:
                            if element[2] == 'i':
                                i_line = str(element[0]) + " " + str(element[1]) + " inside"
                                f_opn.writelines(i_line)
                                f_opn.writelines("\n")
                            elif element[2] == 'o':
                                i_line = str(element[0]) + " " + str(element[1]) + " outside"
                                f_opn.writelines(i_line)
                                f_opn.writelines("\n")
                            else:
                                i_line = str(element[0]) + " " + str(element[1]) + " transmembrane helix"
                                f_opn.writelines(i_line)
                                f_opn.writelines("\n")
                    file_no = file_no + 1
                    f_opn.close()
    onlyfiles = [f for f in listdir(datapath) if isfile(join(datapath, f))]
    with open ("solo_file/media/data_"+str(jid)+"/graph3/search_faa0.clstr") as f:
        listfile=f.readlines()
        clstr_no=[]
        clstr_item=[]
        for index_cl,items in enumerate(listfile):
            if 'Cluster' in items:
                clstr_no.append(items.split(" ")[1])
                start_1=True
                index_clstr=index_cl
                clstr_item_dummy=[]
                while (start_1):
                    try:
                        clstr_item_dummy.append((listfile[index_clstr].split(">")[1].split(".")[0]))
                        index_clstr=index_clstr+1
                        if 'Cluster' in listfile[index_clstr]:
                            start_1=False
                    except Exception as e:
                        print (e)
                        start_1=False
                clstr_item.append(clstr_item_dummy)

    clstr_file=[]
    for index_1,item_1 in enumerate(clstr_no):
        clstr_file_dummy=[]
        for item_2 in clstr_item[index_1]:

            for fn in onlyfiles:
                check=fn.split(".")[0]
                if item_2 == check:
                    clstr_file_dummy.append(fn)
        clstr_file.append(clstr_file_dummy)
    for item_l in clstr_file:
        print (item_l)
    #print("only : ",onlyfiles)
    i = 0
    traceList = []
    yTickValue = []
    yTickName = []
    posxEndList = []
    pos_y = 50
    f2 = open("solo_file/media/data_"+str(jid)+"/graph3/search.faa", 'r')
    data_na = f2.readlines()
    file_n1 = str(data_na[0].split('[')[1].split(']')[0])
    file_n2=file_n1.split(" ")
    file_n2.pop(-1)
    file_n3=""
    for item in file_n2:
        file_n3=file_n3+str(item)
    file_n="results" + ".txt"
    open_fil = join("solo_file/media/data_"+str(jid)+"/graph3", file_n)
    for index_1,item_1 in enumerate(clstr_no):
        for fn in clstr_file[index_1]:
    #for fn in onlyfiles:
            if fn.find("_summary") != -1:
                #print (fn,drawable(fn, plot_path))
                if drawable(fn, plot_path) == False:
                    continue
                maxv = 0
                incount = 0
                dataN = draw_with_summary(fn, datapath, pos_y=pos_y)
                yTickValue.append(pos_y)
                yTickName.append(fn.split(".")[0])
                pos_y += 50
                if maxtotal < maxv:
                    maxtotal = maxv
                '''
                if maxv !=0:
                    eStr = str(maxv) + "aa"
                    trace = go.Scatter(x=[maxv + 20], y=[pos_y - 15], mode='text', showlegend=False, text=eStr,
                               textfont=dict(color='rgb(0,0,0)'),
                               textposition='bottom right')
                    traceList.append(trace)
                '''
                pos_y += 50
                xTickValue = list(range(0, 6000, 100))
        pos_y += 90

    # print(yTickValue, yTickName)
    layout = dict(title=file_n1,
                  title_font_size=70,
                  yaxis=dict(
                      tickvals=yTickValue,
                      ticktext=yTickName,
                      showticklabels=True,
                      tickfont=dict(size=70),
                  ),
                  xaxis=dict(
                      tickvals=xTickValue,
                      showticklabels=True,
                      tickfont=dict(size=70),

                  ),
                  legend=dict(font=dict(size=70))

                  )
    ind_1 = 0
    #if you just want to show blue box just delete scale if you want to show NBD write  Scale
    #eStr = "Scale"
    eStr = " "
    trace = go.Scatter(x=[-70], y=[-40], mode='text', showlegend=False, text=eStr,
                       textfont=dict(size=70, color='rgb(0,0,0)'),orientation = 'v')
    traceList.append(trace)
    maxv = 0
    ind_blue = 0
    ind_red = 0
    #print(posyList)
    #satrt here if  <3 TMH present between two NBD consider it as single line   
    dcv_cnt = []
    for data_ndx9, data_vd in enumerate(markList):
        if data_vd == 'i' or data_vd == 'n':
            dcv_cnt.append(data_ndx9)
    #print(dcv_cnt)
    fnal_aay = []
    if dcv_cnt != []:
        if dcv_cnt[0] != 0:
            dmmy_aaay = (markList[0:dcv_cnt[0]])
            for cdc in dmmy_aaay:
                fnal_aay.append(cdc)
    for lndc, ltdc in enumerate(dcv_cnt):
        dmmy_aaay = []
        if lndc != len(dcv_cnt) - 1:
            dmmy_aaay = (markList[ltdc:dcv_cnt[lndc + 1]])
            print(dmmy_aaay)
            bxcnt = sum('t' in item for item in dmmy_aaay)
            print(bxcnt)
            if bxcnt != 0 and bxcnt < 3:
                vc = 0
                for lndc9, ltdc9 in enumerate(dmmy_aaay):
                    if ltdc9 == 't':
                        dmmy_aaay[lndc9] = 'o'
            for cdc in dmmy_aaay:
                fnal_aay.append(cdc)
    if fnal_aay != []:
        dmmy_aaay = (markList[dcv_cnt[-1]:len(markList)])
        for cdc in dmmy_aaay:
            fnal_aay.append(cdc)

    markList=fnal_aay
# end here if  <3 TMH present between two NBD consider it as single line 

    for ele in xList:
        pos_y = posyList[ind_1]
        mark = markList[ind_1]
        eNumber = eNumberList[ind_1]
        ind_1 = ind_1 + 1
        x1, x2 = ele[0], ele[1]
        if maxv < x2:
            maxv = x2
        if mark == 'i' or mark=="n":
            trace = go.Scatter(x=[x1, x1 + 50], y=[pos_y, pos_y], mode='lines', showlegend=False,
                               line=dict(dash='solid', color='rgb (0, 0, 255)', width=10),orientation = 'v')
            traceList.append(trace)
            trace = go.Scatter(x=[x1+200, x2], y=[pos_y, pos_y], mode='lines', showlegend=False,
                               line=dict(dash='solid', color='rgb (0, 0, 255)', width=10),orientation = 'v')
            traceList.append(trace)
            x2=x1+200
            x1 = x1 + 50
            # ellipse
            a = (x2 - x1) / 2
            b = 10.0
            xlist = []
            y1list = []
            y2list = []
            for xx in range(x2 - x1):
                x = xx - (x2 - x1) / 2
                y = b ** 2 - b ** 2 * x ** 2 / (a ** 2)
                if y <= 0:
                    y = 0
                else:
                    y = np.sqrt(y)
                xlist.append(x1 + xx)
                y1list.append(pos_y - y)
                y2list.append(pos_y + y)
            tracedown = go.Scatter(
                x=xlist,
                y=y1list,
                mode='lines',
                name='Inside',
                showlegend=False,
                line=dict(color='rgb(0, 0, 255)', width=10, shape='spline', smoothing=1.3),orientation = 'v'
            )
            traceup = go.Scatter(
                x=xlist,
                y=y2list,
                mode='lines',
                name='',
                showlegend=False,
                line=dict(color='rgb(0, 0, 255)', width=10, shape='spline', smoothing=1.3),orientation = 'v'
            )
            for y in range(-9, 10):
                x = a * a - a * a * y * y / (b * b)
                if x <= 0:
                    x = 0
                else:
                    x = np.sqrt(x)
                x0 = (x1 + x2) / 2
                if abs(y) < 3:
                    d = 3
                else:
                    d = 5
                xmin = x0 - x + d
                xmax = x0 + x - d
                if y == 0:
                    xmax += d
                if ind_blue == 0:
                    trace = go.Scatter(x=[xmin, xmax], y=[y + pos_y, y + pos_y], name='Nucleotide Binding Domains', mode='lines',
                                       showlegend=True,orientation = 'v',
                                       line=dict(dash='solid', color='rgb (0, 0, 255)', width=100))
                    traceList.append(trace)
                    ind_blue = 1
                else:
                    trace = go.Scatter(x=[xmin, xmax], y=[y + pos_y, y + pos_y], mode='lines', showlegend=False,orientation = 'v',
                                       line=dict(dash='solid', color='rgb (0, 0, 255)', width=100))
                    traceList.append(trace)
            traceList.append(tracedown)
            traceList.append(traceup)
            #if you want to hide NBD comment it  
            #eStr = "NBD" + str(eNumber)
            trace = go.Scatter(x=[int((x1 + x2) / 2)], y=[pos_y], mode='text', text=eStr, showlegend=False,orientation = 'v',
                               textfont=dict(color='rgb(255,255,255)', size=70))
            traceList.append(trace)
            '''
            if mark !="n":
                eStr1 = str(x1 - 50)
                eStr2 = str(x2 + 50)
                trace = go.Scatter(x=[x1], y=[pos_y + 40], mode='text', text=eStr1, showlegend=False,
                                textfont=dict(color='rgb(0,0,0)'))
                traceList.append(trace)
                trace = go.Scatter(x=[x2], y=[pos_y + 40], mode='text', text=eStr2, showlegend=False,
                               textfont=dict(color='rgb(0,0,0)'))
                traceList.append(trace)
            '''
        elif mark == 't':
            # Rectangle
            if ind_red == 0:
                trace = go.Scatter(x=[x1, x2], y=[pos_y, pos_y], name='Transmembrane helix', mode='lines',orientation = 'v',
                                   showlegend=True, line=dict(dash='solid', color='rgb (255, 0, 0)', width=100))
                traceList.append(trace)
                ind_red = 1
            else:
                trace = go.Scatter(x=[x1, x2], y=[pos_y, pos_y], mode='lines', showlegend=False,orientation = 'v',
                                   line=dict(dash='solid', color='rgb (255, 0, 0)', width=100))
                traceList.append(trace)


        else:
            # Line
            trace = go.Scatter(x=[x1, x2], y=[pos_y, pos_y], mode='lines', showlegend=False,orientation = 'v',
                               line=dict(dash='solid', color='rgb (0, 0, 255)', width=10))
            traceList.append(trace)
    x2 = maxv - 200
    x1 = x2 - 50
    pos_y = posyList[-1]
    fig = go.Figure(data=traceList, layout=layout)
    fig['layout'].update(margin=dict(l=100),width=7000,height=10000)
    #plotly_fig = go.Figure(data=traceList, layout=layout)

    # print(fig)
    # plotly_fig['data'].append( dict(x=xnew, y=y2_new, type='scatter', mode='lines') )
    #plot_div1 = plot(fig,filename='data', image='svg')
    plot_div = plot(fig, output_type='file', include_plotlyjs=True, auto_open=False)

    
    shutil.move(plot_div, html_path+"Topology_Plot.html")
    #fig.write_image(html_path+"Topology_Plot.html")
    fig.write_image(html_path+"Topology_Plot.pdf")
    fig.write_image(html_path+"Topology_Plot.svg")
    fig.write_image(html_path+"Topology_Plot.webp")
    fig.write_image(html_path+"Topology_Plot.jpeg")
    fig.write_image(html_path+"Topology_Plot.png")
    



    # artifacts_1_path_pdf = os.path.join(os.path.join(os.getcwd(), 'media'), "artifacts_1")
    # shutil.move(os.path.join(os.getcwd(), pdf_file_name), os.path.join(plot_path, pdf_file_name))
    global return_data1, e_value_1, score_1
    global inside_cnt, outside_cnt, aa_cnt, rdbox_pair_cnt
    e_value_2=[]
    score_2=[]
    for ietm in seq_id_cnt:
        for data_i, data_w in enumerate(e_value_1):
            if ietm == return_data1[data_i].split(".")[0]:
                e_value_2.append(data_w)
                score_2.append(score_1[data_i])
    with open(open_fil, 'w') as one_f:
        one_f.writelines("E-Value  Score  Seq-Id  TMH  Total_aa  TMD")
        one_f.writelines("\n")
        for data_i, data_w in enumerate(e_value_2):
            one_f.writelines(data_w + "  " + score_2[data_i] + "  " + seq_id_cnt[data_i]+ "  " +str(inside_cnt[data_i])
                             + "  " +str(outside_cnt[data_i])+ "  " +str(aa_cnt[data_i])+ "  " +str(rdbox_pair_cnt[data_i])
                             )
            one_f.writelines("\n")
    #return plot_div

class LineChartJSONView(BaseLineChartView):
    def __init__(self,pid):
        self.f = open('solo_file/media/data_'+str(jid)+'/graph3/test2.txt').read()
        self.f = open('solo_file/media/data_'+str(jid)+'/graph3/test2.txt').read()
        self.data = self.f[self.f.find('    -'):self.f.find('\n\n\n')].split('\n')[3:]
        self.all_data = []
        for line in self.data:
            if 'threshold' not in line:
                line = line.strip()
                self.all_data.append(list(map(float, re.split(r'\s+', line)[0:2])))
            else:
                break
        with open('solo_file/media/data_'+str(jid)+'/graph3/all_data.csv', 'wb') as f:
            np.savetxt(f, self.all_data, fmt='%.2e %.2f', delimiter=',')
        self.read_data = np.genfromtxt('solo_file/media/data_'+str(jid)+'/graph3/all_data.csv')
        x = list(x for x in range(self.read_data.shape[0]))
        y1 = [np.log10(x) for x in self.read_data[:, 0]]
        y2 = self.read_data[:, 1]
        self.xnew = np.linspace(min(x), max(x), 30)

        spl1 = make_interp_spline(x, y1, k=3)
        spl2 = make_interp_spline(x, y2, k=3)

        self.y1_new = spl1(self.xnew)
        self.y2_new = spl2(self.xnew)

    def get_labels(self):
        """Return 7 labels for the x-axis."""
        return list(self.xnew)

    def get_providers(self):
        """Return names of datasets."""
        return ["score", "E-value"]

    def get_data(self):
        """Return 3 datasets to plot."""
        return [
            list(self.y1_new),
            list(self.y2_new)
        ]

def main(getTimestamp,jid,pid,identity=5,e_value=0.9):
    global html_path,identity_cutoff,e_value_cutoff
    identity_cutoff = identity
    e_value_cutoff = e_value

    print("**************")
    print(pid)
    print(jid)
    print(identity_cutoff)
    print(e_value_cutoff)
    print("***************")
    html_path = 'solo_file/media/'+str(jid)+"/"
    check_and_mk_dir(html_path)
    line_chart_json = LineChartJSONView.as_view()
    solo_fnc1(pid,jid)
    solo_fnc2(pid,jid)
    user_result=   'solo_file/media/'+str(jid)+"/" 
    shutil.copy(join(os.getcwd(), 'solo_file/media/data_'+str(jid)+'/graph3/'+str(jid)+'/search_faa1/query.result.txt'), join(join(os.getcwd(), user_result), 'query.result.txt'))    
    shutil.copy(join(os.getcwd(), "solo_file/media/data_"+str(jid)+"/graph3/search_faa1.faa"), join(join(os.getcwd(), user_result), "search_faa1.faa"))
    shutil.copy(join(os.getcwd(), "solo_file/media/data_"+str(jid)+"/graph3/search_faa0.clstr"), join(join(os.getcwd(), user_result), "search_faa0.clstr"))
    shutil.copy(join(os.getcwd(), "solo_file/media/data_"+str(jid)+"/graph3/threshold.txt"), join(join(os.getcwd(), user_result), "threshold.txt"))

  


