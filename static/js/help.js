//初始化softwarerequirement模块
var initSoftwareRequirement = function(){
	var main_div = "software_requirement_content";
	//$("#"+main_div).append("<div class='title'>Browsers</div>");
	var software_requirement = {
		"introduction":{
			title:"",
			content:[{
				description:"The AlloDriver requires a modern web browser with JavaScript enabled. To view the submission status of a job, pop-ups must not be blocked. The following browsers have been throughly tested with AlloDriver:",
				images:[]
			}]
		},
		"firefox":{
			title:"",
			content:[{
				description:"<b>Mozilla Firefox, version 5 or above(<a href='http://www.mozilla.org/firefox/' target='_blank'>Download</a>);</b>",
				images:[]
			}]
		},
		"ie":{
			title:"",
			content:[{
				description:"<b>Internet Explorer, versions 11 or above(<a href='http://www.microsoft.com/windows/downloads/ie/getitnow.mspx' target='_blank'>Download</a>);</b>",
				images:[]
			}]
		},
		"chrome":{
			title:"",
			content:[{
				description:"<b>Chrome, version 9 or above(<a href='http://www.google.com/chrome' target='_blank'>Download</a>);</b>",
				images:[]
			}]
		},
		"safari":{
			title:"",
			content:[{
				description:"<b>Safari, version 5 or above(<a href='http://www.apple.com/safari/download' target='_blank'>Download</a>);</b>",
				images:[]
			}]
		},
		"conclusion":{
			title:"",
			content:[{
				description:"The latest version of Firefox and Chrome is recommended for visualization.",
				images:[]
			}]
		}
	};
	renderDescription(main_div,"software_requirement_list",software_requirement);
};
//
var renderTable = function(main_div,table_id,data){
	var title = data.title;
	var title_div = $("<div class='title'>"+title+"</div>");
	$("#"+main_div).append(title_div);
	var table_div = $('<table class="table table-bordered table-striped" id='+table_id+'></table>');
	$("#"+main_div).append(table_div);
	var headline_list = data.headline;
	//添加headline
	headline_list.forEach(function(each_headline){
		var each_th = $("<th class="+each_headline+">"+each_headline+"</th>");
		table_div.append(each_th);
	});
	var data_list = data.content;
	var render_func_list = data.renderers;
	data_list.forEach(function(each_data_list,row_index){
		var each_tr = $("<tr class=row_"+row_index+"></tr>");
		each_data_list.forEach(function(each_data,index){
			var each_render_func = render_func_list[index];
			if(!Aciss3.isEmpty(each_render_func)){
				var each_data = each_render_func(each_data,row_index);
			}
			var each_td = $("<td>"+each_data+"</td>");
			each_tr.append(each_td);
		});
		table_div.append(each_tr);
	});	
};
//首页使用说明
var initIntroductionSection = function(){
	var introduction_data = {
		"introduction":{
			title:"Introduction",
			content:[{
				description:"Identification of driver mutations that are causally implicated in tumorigenesis and exploration of their functional roles in molecular abnormality are key to advance targeted therapy. Our recent pan-cancer analysis for 7000 tumor-normal matched samples revealed that somatic deleterious mutations are more significantly enriched at allosteric and orthosteric site than other regions on protein. Motivated from this, we developed an interactive platform called AlloDriver aimed at providing novel therapeutic targets by detecting function-relevant driver mutations in clinical cancer samples.<br><br>",
				images:[{
					src:"introduction.png",
					alt:"introduction"
				}]
			},{
				description:"AlloDriver utilizes structural and dynamic features to prioritize potentially functional genes/proteins in individual cancer via mapping mutations generated from clinical cancer samples to allosteric/orthosteric sites derived from protein three-dimensional structures. Importantly, the identified target can be mapped to clinical cancer data to unmask the frequency and profiling of the mutations in the target among pan-cancer and 33 individual caners as well as known therapeutic modulators on the target. AlloDriver may not only shed light on the innovative molecular mechanisms of tumorigenesis by perturbing protein but also enable the identification of novel targets based on the driver mutations.<br><br>",
				images:[]
			}]
		}
	};
	var news_data = {
		title:"News",
		headline:["Date","News"],
		content:[
			["2018.05","AlloDriver 1.5 Released."],
			["2018.02","MAF & ANNOVAR are compatible."],
			["2018.01","AlloDriver 1.3 Released."],
			["2017.11","Target mapping was added."],
			["2017.05","AlloDriver 1.1 Released."],
			["2017.04","Structural Proteomics was built."],
			["2017.01","AlloDriver 1.0 Released."]
		],
		renderers:["",""]
	}
	var main_div = "allodriver_content";
	var list_id = "allodriver_content_list";
	renderDescription(main_div,list_id,introduction_data);
	renderTable(main_div,"news_table",news_data);
};

//初始化Input模块
var initInputSection = function(){
	var input_form = {
			"input_form":{
				title:"Input Form",
				content:[{
					description:"Click <b>Home</b> in the AlloDriver menu. Fill in the parameters in the <b>Job Submit</b> form: ",
					images:[{
						src:"input_blank_form.png",
						alt:"input_blank_form"
					}]
				},{
					description:"The descriptions of the input parameters are listed in the following table:",
					images:[]
				}]
			}};
	var input_file_format = {
			"input_file_format":{
				title:"Input File Format",
				content:[{
					description:"The user could choose one of the file types in the <b>Query</b> parameter for uploading:",
					images:[]
				},{
					description:"<span id=\"tsv_format\"><b>1. TXT</b></span>: click the <b>TXT</b> button and paste your mutation content into the text area:",
					images:[{
						src:"input_tsv.png",
						alt:"input_tsv"
					}]
				},{
					description:"The input mutation list contains three columns Sample ID, Gene name and Mutation, which are separated by semicolon. The format are as following image:</b>.",
					images:[{
						src:"input_tsv_file_format.png",
						alt:"input_tsv_file_format"
					}]
				},{
					description:"<span id=\"maf_format\"><b>2. MAF</b></span>: click the <b>MAF</b> button and browse your MAF file. Then, click the <b>Browse</b> button for file selecting. The file extension is allowed to be <b>maf</b> or <b>txt</b>. The file will be uploaded automatically.",
					images:[]
				},{
					description:'A <b>Mutation Annotation Format (MAF)</b> file (.maf) is a human-readable and tab-delimited text file that lists mutations derived from sequencing cancer cohort samples. The format originates from The Cancer Genome Atlas (TCGA) project and has been widely accepted by researchers since the detected mutations in a MAF file can be easily viewed, edited or processed for custom mining. Each line in a MAF file represents a cancer mutation, which is annotated by many fields ranging from chromosome names to protein information. Column headers and ordering may sometimes vary between files of different sources. ',
					images:[]
				},{
					description:'In AlloDriver, the MAF file is composed of four headers as follows: (1) "Hugo_Symbol" for gene symbol, e.g. BRAF; (2) "HGVSp_Short" for detected mutation, e.g. p.V600E; (3) "Variant_Classification" for translational effect of variant allele, e.g. Missense_Mutation; (4) "Tumor_Sample_Barcode" for cancer sample ID. More headers in MAF file are described in the GDC documentation of NIH (<a href="https://docs.gdc.cancer.gov/Data/File_Formats/MAF_Format/" target=_blank>https://docs.gdc.cancer.gov/Data/File_Formats/MAF_Format/ </a>). <br>',
					images:[{
						src:"input_maf.png",
						alt:"input_maf"
					},{
						src:"input_maf_uploaded.png",
						alt:"input_maf_uploaded"
					}]
				},{
					description:"<span id=\"annovar_format\"><b>3. ANNOVAR</b></span>: click the <b>ANNOVAR</b> button and browse your ANNOVAR file. Then, click the <b>Browse</b> button to choose a file. The file extension is allowed to be <b>annovar</b>. The example annovar file can be downloaded <a target='_blank' href='http://mdl.shsmu.edu.cn/ALD/file/Example1.annovar'><span style='text-decoration: underline;'>here</span></a>. The file will be uploaded automatically.<br>",
					images:[{
						src:"input_annovar.png",
						alt:"input_annovar"
					},{
						src:"input_annovar_uploaded.png",
						alt:"input_annovar_uploaded"
					}]
				},{
					description:"ANNOVAR is a widely-used software to annotate genetic variants detected from diverse genomes. In AlloDriver, a tab-separated annotation output file from ANNOVAR software are supported. The variant annotation file can be generated by the table_annovar.pl script in the program.<br>",
					images:[]
				},{
					description:"<span style=\"color: red; font-weight: bold;\">ATTENTION:</span>The input files for prediction should should be no more than 10M.",
					images:[]
				}]
			},
			"mapping_area":{
				title:"Mapping Area Selection",
				content:[{
					description: "When <b>Allosteric Site</b> is chosen, the cancer mutations will be mapped to allosteric sites on the 3D structures of proteins. Otherwise, if <b>Functional Site</b> is selected, mutations will be mapped both orthosteric sites and allosteric sites.",
					images:[{
						src:"input_mapping_area.png",
						alt:"input_mapping_area"
					}]
				}]
			}
	};
	var input_submit = {
			"input_submit":{
				title:"Submit the Job",
				content:[{
					description:"After pasting or uploading the file, the user could submit the parameters by click the <b>Run</b> button.",
					images:[{
						src:"eg1_input.png",
						alt:"eg1_input"
					}]
				}]
			},
			"input_reset":{
				title:"Reset the Form",
				content:[{
					description:"Click Reset button to reset the form.",
					images:[{
						src:"input_reset.png",
						alt:"input_reset"
					}]
				}]
			}
		};
	var input_warning = {
			"input_warning":{
				title:"Warning of Input",
				content:[{
					description:"1. <b>Job Name empty warning</b>: the blank Job Name parameter will get a warning pop-up message. The user should specify the Job Name in the form.",
					images:[{
						src:"input_warning_jobname.png",
						alt:"input_warning_jobname"
					}]
				},{
					description:"2. <b>TXT empty content warning</b>: the blank or TXT text area will get a warning pop-up message as following picture. The user should input the mutation content or choose other file format.",
					images:[{
						src:"input_warning_tsv.png",
						alt:"input_warning_tsv"
					}]
				},{
					description:"3. <b>No MAF file warning</b>: the user didn't upload a MAF file. Please browse a MAF file and click the <b>Upload</b> button.",
					images:[{
						src:"input_warning_maf.png",
						alt:"input_warning_maf"
					}]
				},{
					description:"3. <b>No ANNOVAR file warning</b>: the user didn't upload a ANNOVAR file. Please browse a ANNOVAR file and click the <b>Upload</b> button.",
					images:[{
						src:"input_warning_annovar.png",
						alt:"input_warning_annovar"
					}]
				}]
			}
		};
	var input_param_table = {
			title:"Input Parameters",
			headline:["No.","Parameter","Detail"],
			content:[
				["1","Job Name","User must input an unique name for new Job."],
				["2","Query","User may input or upload sequencing profile of cancer samples annotated with mutation data. Three file formats are allowed: TXT, MSF, and ANNOVAR."],
				["3","Mapping Area","The mutation in the sample will be mapped to different areas on the 3D structures of proteins. The user could define the mapping area by selecting <b>Allosteric Site</b> or <b>Functional Site</b>."]
			],
			renderers:["",""]
		}
//	var file_format_table = {
//			title:"",
//			headline:["File","Detail"],
//			content:[
//				["PDB file","1. The file size should be no more than 10M."],
//				["Ligand File","1. The file size should be no more than 10M. <br> 2. The ligand file should contain no more than 1000 ligands. <br> 3. For the SDF file, each ligand should be specified unique molecule name. <br> 4. Molecules with complicated structures are not recommanded for uploading."]
//			],
//			renderers:["",""]
//		}

	var main_div = "input_content";
	var list_id = "input_list";
	renderDescription(main_div,list_id,input_form);
	renderTable(main_div,"input_param_table",input_param_table);
	renderDescription(main_div,list_id,input_file_format);
//	renderTable(main_div,"file_format_table",file_format_table);
	renderDescription(main_div,list_id,input_submit);
	renderDescription(main_div,list_id,input_warning);
};

//初始化job queque模块
var initJobQueueSection = function(){
	var job_queue_data = {
			"job_search":{
				title:"Job Search",
				content:[{
					description:"Click Job Queue to show Job Search page and here user can retrieve his/her own jobs. By inputting the type of \"Job ID\" and unique identifier from user in the \"KeyWord\", jobs of the user could be listed in a pop-up tab.",
					images:[{
						src:"job_search.png",
						alt:"job search"
					}]
				},{
					description:"<span class=\"attention\">ATTENTION</span>: Message \"No hits found\" will emerge if identifier from user can not be exactly matched.",
					images:[{
						src:"job_no_hit.png",
						alt:"job no hit"
					}]
				}]
			}};
	var job_status_data = {
			"job_status":{
				title:"Job Status",
				content:[{
					description:"Job Progress panel shows the job progress after submitting a job.",
					images:[{
						src:"job_progress_20.png",
						alt:"job search"
					}]
				},{
					description:"The status of the jobs is refreshed in the panel every 10 seconds till \"Done\" emerges. When job is finished, the Job progress panel shrinks back and the result of the job is automatically shown in the Job Result panel. The user can bookmark this page for further analysis by clicking the <b>Bookmark the Result</b>.",
					images:[]
				},{
					description:"An AlloDriver job will take about <b>2-60 minutes</b>, which depends on the number of clinical samples.<br><br>",
					images:[{
						src:"job_progress_100.png",
						alt:"job progress 100"
					}]
				},{
					description:"<span class=\"attention\">ATTENTION</span>: if Error number appears, a warning message pops up to help evaluating the error type according to the following codes.",
					images:[]
				}]
			}};
	var error_code_table = {
			title:"Job Running Error",
			headline:["No.","Status","Detail & Solution"],
			content:[
				["1","Error. No mutations mapped to the deposited proteins.","No clinical mutations in uploaded samples mapped to the annotated proteins deposited in AlloDriver."],
				["2","Error. No mutations mapped to the functional sites.","No clinical mutations in uploaded samples mapped to the allosteric/orthosteric sites in AlloDriver."],
				["3","Calculation Error.","Calculation Failed. Please contact us."]
			],
			renderers:["",""]
		}
	var error_type_table = {
			title:"",
			headline:["No.","Status","Solution"],
			content:[
				
			],
			renderers:["",""]
		}
	var main_div = "job_queue_content";
	var list_id = "job_queue_list";
	renderDescription(main_div,list_id,job_queue_data);
	renderDescription(main_div,list_id,job_status_data);
	renderTable(main_div,"error_code_table",error_code_table);
};

//初始化Result模块
var initResultSection = function(){
	var result_download_button = {
			"result_target_table":{
				title:"Result Download",
				content:[{
					description:"When the job is finished, all results are shown in the panels of <b>Job Queue</b> page. The results can be downloaded by clicking the two buttons with different kinds of files.<br>",
					images:[{
						src:"eg1_result_download.png",
						alt:"Job result download of example 1",
						id:"example1_job_result_download"
					}]
				}]
			}
	};
	var result_target_table = {
			"result_target_table":{
				title:"Target Result",
				content:[{
					description:"In the <b>Target Result</b> panel, top 100 ranked driver mutations are listed with eight features including <b>Gene/Protein</b>, <b>UniProt ID</b>, <b>Driver Mutation</b>, <b>Location</b>, <b>PDB ID</b>, <b>Site Residue</b>, <b>Score</b> and <b>Entry</b>.<br>",
					images:[{
						src:"eg1_result_target.png",
						alt:"Job result of example 1",
						id:"example1_job_result"
					}]
				},{
					description:"In the example, AlloDriver successfully ranks <b>PTPN11</b> as the best driver gene in a cancer sample from TCGA-LUSC project. Hover on the <b>Site Residue</b> to view the residue list of orthosteric sites or allosteric sites.<br>",
					images:[{
						src:"eg1_result_target_residue.png",
						alt:"residue list of example1"
					}]
				},{
					description:"Clicking <b>Show</b> button on each mutation record may open a new page with more details, which will be introduced in Step 4. Of the top hits, PTPN11 is the best one, indicating the high-efficient ability of AlloDriver in the discovery of cancer driver mutation.",
					images:[]
				}]
			}
	};
	
	var result_area_image = {
			"result_area_image":{
				title:"Frequency of mutations at different areas of proteins",
				content:[{
					description:"Clinical mutations were mapped to the allosteric or functional sites of 1650 proteins. This analysis describes the location profile of the mutations on the mapped proteins. The waterfall plot shows mutation distribution on four types of functional areas (allosteric site, potential allosteric site, orthosteric site and other regions) on the structure of proteins mapped from gene. Stacked bar graph provides mutation frequency against each mapped gene.<br>",
					images:[{
						src:"eg1_result_area.png",
						alt:"eg1_result_area"
					}]
				},{
					description:"If multiple samples are submitted, the user could select sample in the list to view its chart.<br>",
					images:[{
						src:"result_select_sample.png",
						alt:"result_select_sample"
					}]
				}]
			}
	};
	
	var result_score_image = {
			"result_score_image":{
				title:"Score of potential driver mutations",
				content:[{
					description:"Scatter plot exhibits the evaluation of AlloDriver score for potential driver mutations located at allosteric/orthosteric sites of proteins.",
					images:[{
						src:"eg1_result_score.png",
						alt:"eg1_result_score"
					}]
				}]
			}
	};

	var result_level2 = {
			"result_level2":{
				title:"Browse details of driver mutation",
				content:[{
					description:"Clicking <b>Show</b> button on each mutation record in Step 3 may open a new page with more details. This page contained four important parts:",
					images:[]
				},{
					description:"<br><b>1. Target information:</b><br>",
					images:[]
				},{
					description:"In the <b>Target information</b> panel, a window in the left part displays the 3D structure of the protein by using JSMol plugin,Visualization of mutations on 3D structures. The mutated residue is displayed as spheres.<br>",
					images:[]
				},{
					description:"And in the right part, there is a table of general information of the protein PTPN11 and its mutation information, such as <b>Gene Symbol</b>, <b>NCBI Gene ID</b>, <b>Function</b>, <b>Ensembl ID</b>, <b>PDB ID</b>, <b>Driver Mutation</b>, <b>Location</b>, and <b>Score</b>. A <b>Download</b> button provieds the a result file including above features.<br>",
					images:[{
						src:"eg1_result_mutation_protein_info.png",
						alt:"eg1_result_mutation_protein_info"
					}]
				},{
					description:"Hover on the <b>Function</b> to get details of gene functions.<br>",
					images:[{
						src:"eg1_result_mutation_function.png",
						alt:"eg1_result_mutation_function"
					}]
				},{
					description:"<br><b>2. Mutations frequency at allosteric/orthosteric sites of the targets in 33 cancer types (TCGA):</b><br>",
					images:[]
				},{
					description:'Clinical mutations across 33 cancer types in TCGA samples are mapped to the allosteric/orthosteric sites on the predicted target. Heatmap displays the frequency for mutations occurring in individual cancer. Cancer abbreviations and details are listed in the right legend.<br>',
					images:[{
						src:"eg1_result_mutation_heatmap.png",
						alt:"eg1_result_mutation_heatmap"
					}]
				},{
					description:"<br><b>3. Frequency of query mutations on the target in TCGA pan-cancer samples:</b><br>",
					images:[]
				},{
					description:'Potential driver mutations for the predicted target in query samples are mapped to TCGA pan-cancer samples. Lollipop-style diagram shows frequency for mapped mutations located at different annotated domains on the target in Pfam database.<br>',
					images:[{
						src:"eg1_result_mutation_domain.png",
						alt:"eg1_result_mutation_domain"
					}]
				},{
					description:"<br><b>4. Known drugs on the target:</b><br>",
					images:[]
				},{
					description:"The table indicates the known therapeutic modulators targeting this protein in DrugBank and CHEMBL database.",
					images:[{
						src:"eg1_result_mutation_drug.png",
						alt:"eg1_result_mutation_drug"
					}]
				}]
			}};
	var output_table = {
			title:"Output items in predicted allosteric site",
			headline:["No.","Item","Detail"],
			content:[
				["1","Protein Name","The name of protein."],
				["2","PDB ID","The structure ID in PDB database."],
				["3","Allosteric Site Score","Allosteric protein-modulator binding score, which is calculated by –logG, G represents binding free energy of protein and modulator."],
				["4","Drug-like Score","Druggable score of the predicted allosteric site, which is calculated by physiochemical features of the site."],
				["5","Perturbation Score","Flexibility of the predicted allosteric site, which is ranged by [0,1], 0 means completely rigid site and 1 means completely flexible site."],
				["6","Volume","The volume of the predicted allosteric site (Å3)."]
			],
			renderers:["","",""]
		}

	var main_div = "result_content";
	var list_id = "result_list";
	renderDescription(main_div,list_id,result_download_button);
	renderDescription(main_div,list_id,result_target_table);
	renderDescription(main_div,list_id,result_area_image);
	renderDescription(main_div,list_id,result_score_image);
	renderDescription(main_div,list_id,result_level2);
};

//Example1 tutorial
var renderExampleOneTutorial = function(main_div){
	//Example
	var list_id = "tutorial_content_example1";
	var example_part_data = {
			"intro_eg1":{
				title: "Introduction of Example 1",
				content:[{
					description:"Lung cancer is the leading culprit of cancer-related deaths in the world and approximately 85% of lung cancer is diagnosed as non-small cell lung cancer (NSCLC). With comprehensive analyses from TCGA data, genetic mutations derived from NSCLC patient samples have been enriched in the pathways of receptor tyrosine kinase signaling, mTOR signaling, oxidative stress response, proliferation, and cell cycle progression, providing many potential driver proteins in the disease. Among the proteins, SHP2, encoded by PTPN11, is a classical non-receptor protein phosphatase that is tightly organized as quaternary structure including two tandem SH2 domains, a catalytic PTP domain, and a poorly ordered C-terminal region. Under physiological conditions, SHP2 binds with RAS to regulate the RAS-RAF association and enable the activation of ERK/MAP kinase pathway. Moreover, SHP2 participates in the programmed cell death (PD1/PDL1) pathway and contributes to immune evasion. Dysregulation of SHP2 by mutations has been widely reported in hematologic malignancies and many solid tumors like breast, lung, colon and prostate carcinomas. For example, somatic mutation E76K at an allosteric site of SHP2 promotes the activation of both ERK and Src, and then upregulates c-Myc and Mdm2 to facilitate the progression of NSCLC, indicating that the SHP2 mutant has oncogenic activity in lung cancer.<br>",
					images:[]
				},{
					description:"Using a clinical sample with SHP2 mutations from lung cancer of TGCA (Table 1) and “Functional Site” as inputs, we investigated the ability of AlloDriver to identify the driver protein SHP2. From mapping the somatic mutations to functional sites of human proteins, SHP2 was successfully ranked first out of three mapped proteins. The mutational landscape of SHP2 is also provided to disclose the potential engagement in other types of cancers.<br>",
					images:[]
				},{
					description:"<b>Table 1</b> (sample ID: TCGA-51-4079-01A-01D-1458-08):<br>",
					images:[]
				},{
					description:'<table width=80%>'+
								'<tr class="eg_table_head"><td><b>Summary</b></td><td></td><tr>'+
								'<tr class="eg_table_content"><td>Case ID</td><td>TCGA-51-4079</td><tr>'+
								'<tr class="eg_table_content"><td>Project</td><td><a href="https://portal.gdc.cancer.gov/projects/TCGA-LUSC" target=_blank>TCGA-LUSC</a></td><tr>'+
								'<tr class="eg_table_content"><td>Project Name</td><td>Lung Squamous Cell Carcinoma</td><tr>'+
								'<tr class="eg_table_content"><td>Disease Type</td><td>Squamous Cell Neoplasms</td><tr>'+
								'<tr class="eg_table_content"><td>Program</td><td>TCGA</td><tr>'+
								'<tr class="eg_table_content"><td>Primary Site</td><td>Bronchus and lung</td><tr>'+
								'<tr class="eg_table_head"><td><b>Demographic</b></td><td></td><tr>'+
								'<tr class="eg_table_content"><td>Ethnicity</td><td>Not hispanic or latino</td><tr>'+
								'<tr class="eg_table_content"><td>Gender</td><td>Female</td><tr>'+
								'<tr class="eg_table_content"><td>Race</td><td>Black or african american</td><tr>'+
								'<tr class="eg_table_content"><td>Year of Birth</td><td>1936</td><tr>'+
								'<tr class="eg_table_content"><td>Year of Death</td><td>2009</td><tr>'+
								'<tr class="eg_table_head"><td><b>Diagnoses / Treatments</b></td><td></td><tr>'+
								'<tr class="eg_table_content"><td>Age at Diagnosis</td><td>73 years 236 days</td><tr>'+
								'<tr class="eg_table_content"><td>Days to Birth</td><td>-26899</td><tr>'+
								'<tr class="eg_table_content"><td>Days to Death</td><td>12</td><tr>'+
								'<tr class="eg_table_content"><td>Primary Diagnosis</td><td>Squamous cell carcinoma, NOS</td><tr>'+
								'<tr class="eg_table_content"><td>Prior Malignancy</td><td>Not reported</td><tr>'+
								'<tr class="eg_table_content"><td>Progression or Recurrence</td><td>Not reported</td><tr>'+
								'<tr class="eg_table_content"><td>Site of Resection of Biopsy</td><td>Upper lobe, lung</td><tr>'+
								'<tr class="eg_table_content"><td>Tissue or Organ of Origin</td><td>Upper lobe, lung</td><tr>'+
								'<tr class="eg_table_content"><td>Tumor Grade</td><td>Not reported</td><tr>'+
								'<tr class="eg_table_content"><td>Tumor Stage</td><td>Stage ib</td><tr>'+
								'<tr class="eg_table_content"><td>Vital Status</td><td>Dead</td><tr>'+
								'<tr class="eg_table_head"><td><b>Exposures</b></td><td></td><tr>'+
								'<tr class="eg_table_bottom"><td>Cigarettes per Day</td><td>1.36986301369863</td><tr>'+
								'</table><br><br>'
					,images:[]
				}]
			},
			"step1":{
				title:"Step 1: AlloDriver Input of Example 1",
				content:[{
					description:"Click <b>Home</b> of AlloDriver menu, and press the <b>Example1</b> button. AlloDriver will automatically load parameters for the user in the <b>Job Submit</b> form:",
					images:[]
				},{
					description:"1. Input the <b>Job Name</b> \"ALLODRIVER_EXAMPLE1\";",
					images:[]
				},{
					description:"2. Choose the <b>MAF</b> format;",
					images:[]
				},{
					description:"3. Upload an Example1.maf file;",
					images:[]
				},{
					description:"4. Select \"<b>Functional Site Data</b>\" option in the <b>Data Type</b>.",
					images:[{
						src:"eg1_input.png",
						alt:"Choose Example1"
					}]
				}]
			},
			"step2":{
				title:"Step 2: Job Submitting",
				content:[{
					description:"In the case of examples, all parameters and selection are set automatically and can not be changed. When clicking <b>Run</b> button, the job automatically begins to run.",
					images:[{
						src:"eg1_job_running.png",
						alt:"Job process of example1",
						id:"example1_job_process"
					}]
				}]
			},
			"step3":{
				title:"Step 3: AlloDriver Result",
				content:[{
					description:"It takes ~2min for Example 1 to identify the targets of clinical mutations. The <b>Job Process</b> section has recorded the whole progress of the job running.",
					images:[{
						src:"eg1_job_finished.png",
						alt:"Job process 100 of example1",
						id:"example1_job_process_100"
					}]
				},{
					description:"When Example 1 is finished, all results are shown in the panels of <b>Job Queue</b> page. The results can be downloaded by clicking the two buttons with different kinds of files.<br>",
					images:[{
						src:"eg1_result_download.png",
						alt:"Job result download of example 1",
						id:"example1_job_result_download"
					}]
				},{
					description:"The panels provides the detailed information of the driver mutations and their targets.",
					images:[{
						src:"eg1_result_target.png",
						alt:"Job result of example 1",
						id:"example1_job_result"
					}]
				},{
					description:"<br><b>1. Target Result:</b><br>",
					images:[]
				},{
					description:"In the <b>Target Result</b> panel, top 100 ranked driver mutations are listed with eight features including <b>Gene/Protein</b>, <b>UniProt ID</b>, <b>Driver Mutation</b>, <b>Location</b>, <b>PDB ID</b>, <b>Site Residue</b>, <b>Score</b> and <b>Entry</b>.<br>",
					images:[]
				},{
					description:"AlloDriver successfully ranks <b>PTPN11</b> as the best driver gene in a cancer sample from TCGA-LUSC project. Hover on the <b>Site Residue</b> to view the residue list of orthosteric sites or allosteric sites.<br>",
					images:[{
						src:"eg1_result_target_residue.png",
						alt:"residue list of example1"
					}]
				},{
					description:"Clicking <b>Show</b> button on each mutation record may open a new page with more details, which will be introduced in Step 4. Of the top hits, PTPN11 is the best one, indicating the high-efficient ability of AlloDriver in the discovery of cancer driver mutation.",
					images:[]
				},{
					description:"<br><b>2. Frequency of mutations at different areas of proteins:</b><br>",
					images:[]
				},{
					description:"The panel offers a waterfall-bar plot picture. Clinical mutations were mapped to the allosteric or functional sites of 1650 proteins. This analysis describes the location profile of the mutations on the mapped proteins. The waterfall plot shows mutation distribution on four types of functional areas (allosteric site, potential allosteric site, orthosteric site and other regions) on the structure of proteins mapped from gene. Stacked bar graph provides mutation frequency against each mapped gene.<br>",
					images:[{
						src:"eg1_result_area.png",
						alt:"eg1_result_area"
					}]
				},{
					description:"<br><b>3. Score of potential driver mutations:</b><br>",
					images:[]
				},{
					description:"The scatter plot in this panel shows AlloDriver scores for potential driver mutations on mapped gene/proteins.",
					images:[{
						src:"eg1_result_score.png",
						alt:"eg1_result_score"
					}]
				}]
			},
			"step4":{
				title:"Step 4: Browse details of driver mutation",
				content:[{
					description:"Clicking <b>Show</b> button on each mutation record in Step 3 may open a new page with more details. This page contained four important parts:",
					images:[]
				},{
					description:"<br><b>1. Target information:</b><br>",
					images:[]
				},{
					description:"In the <b>Target information</b> panel, a window in the left part displays the 3D structure of the protein by using JSMol plugin,Visualization of mutations on 3D structures. The mutated residue is displayed as spheres.<br>",
					images:[]
				},{
					description:"And in the right part, there is a table of general information of the protein PTPN11 and its mutation information, such as <b>Gene Symbol</b>, <b>NCBI Gene ID</b>, <b>Function</b>, <b>Ensembl ID</b>, <b>PDB ID</b>, <b>Driver Mutation</b>, <b>Location</b>, and <b>Score</b>. A <b>Download</b> button provieds the a result file including above features.<br>",
					images:[{
						src:"eg1_result_mutation_protein_info.png",
						alt:"eg1_result_mutation_protein_info"
					}]
				},{
					description:"Hover on the <b>Function</b> to get details of gene functions.<br>",
					images:[{
						src:"eg1_result_mutation_function.png",
						alt:"eg1_result_mutation_function"
					}]
				},{
					description:"<br><b>2. Mutations frequency at allosteric/orthosteric sites of the targets in 33 cancer types (TCGA):</b><br>",
					images:[]
				},{
					description:'Clinical mutations across 33 cancer types in TCGA samples are mapped to the allosteric/orthosteric sites on the predicted target. Heatmap displays the frequency for mutations occurring in individual cancer. Cancer abbreviations and details are listed in the right legend.<br>',
					images:[{
						src:"eg1_result_mutation_heatmap.png",
						alt:"eg1_result_mutation_heatmap"
					}]
				},{
					description:"<br><b>3. Frequency of query mutations on the target in TCGA pan-cancer samples:</b><br>",
					images:[]
				},{
					description:'Potential driver mutations for the predicted target in query samples are mapped to TCGA pan-cancer samples. Lollipop-style diagram shows frequency for mapped mutations located at different annotated domains on the target in Pfam database.',
					images:[{
						src:"eg1_result_mutation_domain.png",
						alt:"eg1_result_mutation_domain"
					}]
				},{
					description:"<br><b>4. Known drugs on the target:</b><br>",
					images:[]
				},{
					description:"The table indicates the known therapeutic modulators targeting this protein in DrugBank and CHEMBL database.",
					images:[{
						src:"eg1_result_mutation_drug.png",
						alt:"eg1_result_mutation_drug"
					}]
				}]
			}
		};
	renderDescription(main_div,list_id,example_part_data);
};
//Example 2 tutorial
var renderExampleTwoTutorial = function(main_div){
	//Example
	var list_id = "tutorial_content_example_2";
	var example_part_data = {
			"intro_eg2":{
				title: "Introduction of Example 2",
				content:[{
					description:"Uterine Corpus Endometrial Carcinoma (UCEC) is one of the most common types of endometrial carcinoma and most frequently diagnosed in women aged between 45 and 65. More than 320,000 women are diagnosed as UCEC for each year, and about 76,000 patients are died from the disease. Actually, the prognosis of UCEC in patients is rather poor, and thus the finding of proteins with fundamental genomic mutations that drive the endometrial carcinoma could be extremely helpful for the identification of novel targets in drug discovery against UCEC. Phosphatase and tensin homolog (PTEN) serves as a tumor suppressor for its antagonism on the activation of PI3K/AKT/mTOR oncogenic signaling pathway, manipulated by the specific dephosphorylation on lipid phosphoinositides like PIP3. According to the TCGA, PTEN represents the most frequently altered gene in UCEC. Functional analyses of missense mutations (eg. R130G) at the orthosteric site revealed that the variants could have significant effect on the intrinsic catalytic activity or stability of the protein. R130G has been observed in 34 clinical UCEC samples from TCGA data portal, which makes it the most recurrent mutation in UCEC. Biochemical evidence demonstrated that R130G limits the function of the partner wild-type protein to inhibit PIP3 dephosphorylation.<br>",
					images:[]
				},{
					description:"To access the practicability of our method to identify potential cancer driver target in clinical sample, a UCEC patient sample (Table 2) was uploaded to AlloDriver with the mapping region set to “Functional Site”. Perfectly, by evaluating the loss-of-function R130G, PTEN was ranked first out of seven targets harboring somatic mutations at the functional sites. The following pan-cancer and individual cancer analyses enable users to investigate the extensive involvement of PTEN in various cancer types.<br>",
					images:[]
				},{
					description:"<b>Table 2</b> (sample ID: TCGA-AX-A3G9-01):<br>",
					images:[]
				},{
					description:'<table width=80%>'+
								'<tr class="eg_table_head"><td><b>Summary</b></td><td></td><tr>'+
								'<tr class="eg_table_content"><td>Case ID</td><td>TCGA-AX-A3G9</td><tr>'+
								'<tr class="eg_table_content"><td>Project</td><td><a href="https://portal.gdc.cancer.gov/projects/TCGA-UCEC" target=_blank>TCGA-UCEC</a></td><tr>'+
								'<tr class="eg_table_content"><td>Project Name</td><td>Uterine Corpus Endometrial Carcinoma</td><tr>'+
								'<tr class="eg_table_content"><td>Disease Type</td><td>Adenomas and Adenocarcinomas</td><tr>'+
								'<tr class="eg_table_content"><td>Program</td><td>TCGA</td><tr>'+
								'<tr class="eg_table_content"><td>Primary Site</td><td>Corpus uteri</td><tr>'+
								'<tr class="eg_table_head"><td><b>Demographic</b></td><td></td><tr>'+
								'<tr class="eg_table_content"><td>Ethnicity</td><td>Not hispanic or latino</td><tr>'+
								'<tr class="eg_table_content"><td>Gender</td><td>Female</td><tr>'+
								'<tr class="eg_table_content"><td>Race</td><td>White</td><tr>'+
								'<tr class="eg_table_content"><td>Year of Birth</td><td>1947</td><tr>'+
								'<tr class="eg_table_content"><td>Year of Death</td><td>--</td><tr>'+
								'<tr class="eg_table_head"><td><b>Diagnoses / Treatments</b></td><td></td><tr>'+
								'<tr class="eg_table_content"><td>Age at Diagnosis</td><td>63 years 351 days</td><tr>'+
								'<tr class="eg_table_content"><td>Days to Birth</td><td>-23361</td><tr>'+
								'<tr class="eg_table_content"><td>Days to Death</td><td>12</td><tr>'+
								'<tr class="eg_table_content"><td>Primary Diagnosis</td><td>Endometrioid adenocarcinoma, NOS</td><tr>'+
								'<tr class="eg_table_content"><td>Prior Malignancy</td><td>Not reported</td><tr>'+
								'<tr class="eg_table_content"><td>Progression or Recurrence</td><td>Not reported</td><tr>'+
								'<tr class="eg_table_content"><td>Site of Resection of Biopsy</td><td>Endometrium</td><tr>'+
								'<tr class="eg_table_content"><td>Tissue or Organ of Origin</td><td>Endometrium</td><tr>'+
								'<tr class="eg_table_content"><td>Tumor Grade</td><td>Not reported</td><tr>'+
								'<tr class="eg_table_content"><td>Tumor Stage</td><td>Not reported</td><tr>'+
								'<tr class="eg_table_content"><td>Vital Status</td><td>Alive</td><tr>'+
								'<tr class="eg_table_head"><td><b>Exposures</b></td><td></td><tr>'+
								'<tr class="eg_table_content"><td>BMI</td><td>25.2993759487266</td><tr>'+
								'<tr class="eg_table_content"><td>Height</td><td>154</td><tr>'+
								'<tr class="eg_table_bottom"><td>Weight</td><td>60</td><tr>'+
								'</table><br><br>'
					,images:[]
				}]
			},
			"step1":{
				title:"Step 1: AlloDriver Input of Example 2",
				content:[{
					description:"Click <b>Home</b> of AlloDriver menu, and press the <b>Example2</b> button. AlloDriver will automatically load parameters for the user in the <b>Job Submit</b> form:",
					images:[]
				},{
					description:"1. Input the <b>Job Name</b> \"ALLODRIVER_EXAMPLE2\";",
					images:[]
				},{
					description:"2. Choose the <b>MAF</b> format;",
					images:[]
				},{
					description:"3. Upload an Example2.maf file;",
					images:[]
				},{
					description:"4. Select \"<b>Functional Site Data</b>\" option in the <b>Data Type</b>.",
					images:[{
						src:"eg2_input.png",
						alt:"Choose Example2"
					}]
				}]
			},
			"step2":{
				title:"Step 2: Job Submitting",
				content:[{
					description:"In the case of examples, all parameters and selection are set automatically and can not be changed. When clicking <b>Run</b> button, the job automatically begins to run.",
					images:[{
						src:"eg2_job_running.png",
						alt:"Job process of example2",
						id:"example2_job_process"
					}]
				}]
			},
			"step3":{
				title:"Step 3: AlloDriver Result",
				content:[{
					description:"It takes ~2min for Example 2 to identify the targets of clinical mutations. The <b>Job Process</b> section has recorded the whole progress of the job running.",
					images:[{
						src:"eg2_job_finished.png",
						alt:"Job process 100 of example2",
						id:"example2_job_process_100"
					}]
				},{
					description:"When Example 2 is finished, all results are shown in the panels of <b>Job Queue</b> page. The results can be downloaded by clicking the two buttons with different kinds of files.<br>",
					images:[{
						src:"eg2_result_download.png",
						alt:"Job result download of example 2",
						id:"example2_job_result_download"
					}]
				},{
					description:"The panels provides the detailed information of the driver mutations and their targets.",
					images:[{
						src:"eg2_result_target.png",
						alt:"Job result of example 2",
						id:"example2_job_result"
					}]
				},{
					description:"<br><b>1. Target Result:</b><br>",
					images:[]
				},{
					description:"In the <b>Target Result</b> panel, top 100 ranked driver mutations are listed with eight features including <b>Gene/Protein</b>, <b>UniProt ID</b>, <b>Driver Mutation</b>, <b>Location</b>, <b>PDB ID</b>, <b>Site Residue</b>, <b>Score</b> and <b>Entry</b>.<br>",
					images:[]
				},{
					description:"AlloDriver successfully ranks <b>PTEN</b> as top one driver genes in a cancer sample from TCGA-UCEC project. Hover on the <b>Site Residue</b> to view the residue list of orthosteric sites or allosteric sites.<br>",
					images:[{
						src:"eg2_result_target_residue.png",
						alt:"residue list of example2"
					}]
				},{
					description:"Clicking <b>Show</b> button on each mutation record may open a new page with more details, which will be introduced in Step 4. Of the top hits, PTEN is the best, indicating the high-efficient ability of AlloDriver in the discovery of cancer driver mutation.",
					images:[]
				},{
					description:"<br><b>2. Frequency of mutations at different areas of proteins:</b><br>",
					images:[]
				},{
					description:"Clinical mutations were mapped to the allosteric or functional sites of 1650 proteins. This analysis describes the location profile of the mutations on the mapped proteins. The waterfall plot shows mutation distribution on four types of functional areas (allosteric site, potential allosteric site, orthosteric site and other regions) on the structure of proteins mapped from gene. Stacked bar graph provides mutation frequency against each mapped gene.<br>",
					images:[{
						src:"eg2_result_area.png",
						alt:"eg2_result_area"
					}]
				},{
					description:"<br><b>3. Score of potential driver mutations:</b><br>",
					images:[]
				},{
					description:"The scatter plot in this panel shows AlloDriver scores for potential driver mutations on mapped gene/proteins.",
					images:[{
						src:"eg2_result_score.png",
						alt:"eg2_result_score"
					}]
				}]
			},
			"step4":{
				title:"Step 4: Browse details of driver mutation",
				content:[{
					description:"Clicking <b>Show</b> button on each mutation record in Step 3 may open a new page with more details. This page contained four important parts:",
					images:[]
				},{
					description:"<br><b>1. Target information:</b><br>",
					images:[]
				},{
					description:"In the <b>Target information</b> panel, a window in the left part displays the 3D structure of the protein by using JSMol plugin,Visualization of mutations on 3D structures. The mutated residue is displayed as spheres.<br>",
					images:[]
				},{
					description:"And in the right part, there is a table of general information of the protein PTEN and its mutation information, such as <b>Gene Symbol</b>, <b>NCBI Gene ID</b>, <b>Function</b>, <b>Ensembl ID</b>, <b>PDB ID</b>, <b>Driver Mutation</b>, <b>Location</b>, and <b>Score</b>. A <b>Download</b> button provieds the a result file including above features.<br>",
					images:[{
						src:"eg2_result_mutation_protein_info.png",
						alt:"eg2_result_mutation_protein_info"
					}]
				},{
					description:"Hover on the <b>Function</b> to get details of gene functions.<br>",
					images:[{
						src:"eg2_result_mutation_function.png",
						alt:"eg2_result_mutation_function"
					}]
				},{
					description:"<br><b>2. Mutations frequency at allosteric/orthosteric sites of the targets in 33 cancer types (TCGA):</b><br>",
					images:[]
				},{
					description:'Clinical mutations across 33 cancer types in TCGA samples are mapped to the allosteric/orthosteric sites on the predicted target. Heatmap displays the frequency for mutations occurring in individual cancer. Cancer abbreviations and details are listed in the right legend.<br>',
					images:[{
						src:"eg2_result_mutation_heatmap.png",
						alt:"eg2_result_mutation_heatmap"
					}]
				},{
					description:"<br><b>3. Frequency of query mutations on the target in TCGA pan-cancer samples:</b><br>",
					images:[]
				},{
					description:'Potential driver mutations for the predicted target in query samples are mapped to TCGA pan-cancer samples. Lollipop-style diagram shows frequency for mapped mutations located at different annotated domains on the target in Pfam database.',
					images:[{
						src:"eg2_result_mutation_domain.png",
						alt:"eg2_result_mutation_domain"
					}]
				},{
					description:"<br><b>4. Known drugs on the target:</b><br>",
					images:[]
				},{
					description:"The table indicates the known therapeutic modulators targeting this protein in DrugBank and CHEMBL database.",
					images:[{
						src:"eg2_result_mutation_drug.png",
						alt:"eg2_result_mutation_drug"
					}]
				}]
			}
		};
	renderDescription(main_div,list_id,example_part_data);
};

//初始化tutorial
var initTutorialSection = function(){
	var example_part_title = "#Example";
	var user_submit_job = "#User Submission Job";
	var main_div_example = "tutorial_content_example";
	var main_div_example2 = "tutorial_content_example2";
	//添加第一级标题
	//$("#"+main_div_example).append("<div class='top_title' id='tutorial_content_example_title'>"+example_part_title+"</div>");
	//渲染example和用户提交任务

	//$("#"+main_div_user_submission).append("<div class='top_title' id='tutorial_content_user_submit_title'>"+user_submit_job+"</div>");
	renderExampleTwoTutorial(main_div_example2);
	renderExampleOneTutorial(main_div_example);
};
//解析文字和图文字
var renderDescription = function(main_div,list_id,data){
	var img_root_path = path + "/images/help/";
	var ul = $("<ul id="+list_id+"></ul>");
	for(var k in data){
		var each_data = data[k];
		var each_title = each_data.title;
		var each_content_list = each_data.content;
		var each_li = $("<li class="+k+"></li>");
		each_title_div = $("<div class='title'>"+each_title+"</div>");
		each_content_div = $("<div class='content'></div>");
		each_content_list.forEach(function(each_content){
			var each_description = each_content.description;
			var each_description_div = $("<div class='description'>"+each_description+"</div>")
			var each_images = each_content.images;
			var each_images_div = $("<div class='images'></div>")
			each_images.forEach(function(each_image){
				var src = each_image.src;
				var alt = each_image.alt;
				var each_image_div = $("<div class='image'></div>");
				if(!Aciss3.isEmpty(each_image.id)){
					each_image_div.append("<img data-toggle='tooltip' id='"+each_image.id+"' title='"+alt+"' alt='"+alt+"' src="+img_root_path+src+">");
				}else{
					each_image_div.append("<img data-toggle='tooltip' title='"+alt+"' alt='"+alt+"' src="+img_root_path+src+">");
				}
				each_images_div.append(each_image_div);
			});
			each_content_div.append(each_description_div);
			each_content_div.append(each_images_div);
		});
		each_li.append(each_title_div);
		each_li.append(each_content_div);
		ul.append(each_li);
	}
	$("#"+main_div).append(ul);
};


var showDocument = function(hash){
	if(Aciss3.isEmpty(hash)){
		hash = "#";
	}
	$("#help_document").show();
	$("#tutorials").hide();
	window.location.hash = hash;
};
var showTutorial = function(){
	$("#help_document").hide();
	$("#tutorials").show();
};
//重定位到tutorial页面的example
var redirectUserSubmission = function(){
	$("#help_document").hide();
	$("#tutorials").show();
	window.location.hash = '#tutorial_content_user_submit_title';
};
//重定位到tutorial页面的user submission
var redirectExample = function(index){
	$("#help_document").hide();
	$("#tutorials").show();
	if(index == "1"){
		window.location.hash = '#tutorial_content_example_title';
	}else{
		window.location.hash = '#tutorial_content_example2_title';
	}
	
};
//
var tutorialViewRender = function(data,index){
	var str = '<a onclick="redirectExample(\''+index+'\')" aria-controls="tutorials" role="tab" data-toggle="tab" style="margin-left: 10px;">'+data+'</a>';
	return str;
};
//
var ExamplePDBFileRender = function(data){
	var str = "";
	//example1
	if(data == "1"){
		str += 'Upload MAF file: <br><br>'+
		'<a href="http://mdl.shsmu.edu.cn/ALD/file/Example1.maf"><u>Example1.maf</u></a><br>'
	}else if(data == "2"){
		str += 'Upload MAF file: <br><br>'+
		'<a href="http://mdl.shsmu.edu.cn/ALD/file/Example2.maf"><u>Example2.maf</u></a><br>'
	}
	return str;
};
//渲染tutorial表格
var initTutorialTableSection = function(){
	var main_div = "tutorial";
	var tutorial_table_data = {
			title:"",			
			headline:["Method","Input Format & Examples","Run Time","Tutorial"],
			content:[
				["Example 1","1","Less than 5 minutes",'View'],
				["Example 2","2","Less than 5 minutes",'View']
			],
			renderers:["",ExamplePDBFileRender,"",tutorialViewRender]
		}
	renderTable(main_div,"tutorial_table",tutorial_table_data);
};
//
$(function(){
	$("#help_link").addClass("nav_underline");
	initSoftwareRequirement();
	initIntroductionSection();
	initTutorialTableSection();
	initTutorialSection();
	initInputSection();
	initJobQueueSection();
	initResultSection();
	showTutorial();
	//首页链接跳转到input headline，maf_format，annovar_format
	var url_hash = window.location.hash;
	if(url_hash == "#input_headline" || url_hash == "#maf_format" || url_hash == "#annovar_format"){
		$("#help_document").show();
		$("#tutorials").hide();
		window.location.hash = url_hash;
	}
});