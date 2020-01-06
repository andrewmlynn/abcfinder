function getCookie(name)
{
    var c = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return c ? c[1] : undefined;
}

//update input type ( file or text)
function rec_Select(sel1)
{
	var rec = sel1.options[sel1.selectedIndex].value;
	var file1 = document.getElementById("rec_upload");
	var pdbid1 = document.getElementById("rec_id");
	if ((rec == "file") && (file1.style.display == "none")) {
		file1.style.display="block";
		pdbid1.style.display="none";
		document.getElementById("rec_PDBid").value = "";
	}
	else if ((rec == "pdbid") && (pdbid1.style.display == "none")) {
		pdbid1.style.display="block";
		file1.style.display="none";
		document.getElementById("rec_PDBfile1").value = "";
	}
}

function lig_Select(sel2)
{
    var lig = sel2.options[sel2.selectedIndex].value;
    var file2 = document.getElementById("lig_upload");
    var pdbid2 = document.getElementById("lig_id");
    if ((lig == "file") && (file2.style.display == "none")) {
            file2.style.display="block";
            pdbid2.style.display="none";
            document.getElementById("lig_PDBid").value = "";
    }
    else if ((lig == "pdbid") && (pdbid2.style.display == "none")) {
            pdbid2.style.display="block";
            file2.style.display="none";
            document.getElementById("lig_PDBfile1").value = "";
    }
}

function G_Select(sel3)
{
    var lig = sel3.options[sel3.selectedIndex].value;
    var file2 = document.getElementById("G_upload");
    var pdbid2 = document.getElementById("G_id");
    if ((lig == "file") && (file2.style.display == "none")) {
            file2.style.display="block";
            pdbid2.style.display="none";
            document.getElementById("G_PDBid").value = "";
    }
    else if ((lig == "pdbid") && (pdbid2.style.display == "none")) {
            pdbid2.style.display="block";
            file2.style.display="none";
            document.getElementById("G_PDBfile1").value = "";
    }
}

function autofill_pdb(id,pdbid)
{
	if(id=='rec'){
		document.getElementById('rec_PDBid').value=pdbid;
		change_default();
	}
	else if(id=='lig'){
		document.getElementById('lig_PDBid').value=pdbid;
		change_default();
	}
	else if(id=='rec_chain'){
		document.getElementById('rec_chainid').value=pdbid;
		change_default();
	}
	else if(id=='lig_chain'){
		document.getElementById('lig_chainid').value=pdbid;
		change_default();
	}
	else if(id=='G_pdbid'){
		document.getElementById('G_PDBid').value=pdbid;
		change_default();
	}
}

/*function signup() {
    var user_email = $('#email').val();
    var user_password = $('#signup_password').val();
    var user_emailcode = $('#signup_emailCode').val();
    var user_password_2 = $('#signup_passwordConfirm').val();
    var Data = new FormData();
    Data.append("username", user_email);
    Data.append("_xsrf", getCookie('_xsrf'));
    Data.append("password", user_password);
    Data.append("inputemailCode", user_emailcode);
    Data.append("passwordConfirm", user_password_2);
    $.ajax
    ({
        url: '/signup',
        type: 'POST',
        data: Data,
        cache:false,
        processData: false,
        contentType: false,
        success: function (returnInfo)
        {
            var contact = JSON.parse(returnInfo);
            if (contact["content"] == 'right')
            {
                window.location.href="http://cadd.zju.edu.cn/hawkdock/"
            }
            else
            {
                document.getElementById("signup_content").innerHTML = contact["content"];
                $('#signup').modal()
            }

            //alert(returnInfo);
        },
    })
}
*/

//function Molmil() {
/*
var molmil_settings = {src: "statics/molmil/"}, canvas;

function initViewer() {
    //var filepath = 'statics/calculate/PDBfiles/' + filename;
    // wait until Molmil has been properly loaded
    var filepath_temp = location.href.split('/')[4];
    //alert(filepath_temp)
    var filepath = 'statics/calculate/PDBfiles/' + filepath_temp + '/complex'
    if (!window.molmil.configBox || !molmil.configBox.initFinished) {
        return setTimeout(initViewer, 100);
    }
    canvas = document.getElementById("molmilViewer");
    canvas = molmil.createViewer(canvas); // initialize the canvas
    // load the entry
    molmil.loadFile(filepath, 'pdb', function (soup, models) {
        molmil.displayEntry(models, molmil.displayMode_Default);
        molmil.colorEntry(models, molmil.colorEntry_Custom, [255, 0, 0, 0], true, soup)
    }, null, canvas.molmilViewer)

}
//}
*/
//store data
function Map() {
    this.elements = new Array();

    //获取MAP元素个数
    this.size = function() {
        return this.elements.length;
    }

    //判断MAP是否为空
    this.isEmpty = function() {
        return(this.elements.length < 1);
    }

    //删除MAP所有元素
    this.clear = function() {
        this.elements = new Array();
    }

    //向MAP中增加元素（key, value)
    this.put = function(_key, _value) {
        this.elements.push( {
            key : _key,
            value : _value
        });
    }

    //删除指定KEY的元素，成功返回True，失败返回False
    this.remove = function(_key) {
        var bln = false;
        try{
            for(i = 0; i < this.elements.length; i++) {
                if(this.elements[i].key == _key) {
                    this.elements.splice(i, 1);
                    return true;
                }
            }
        } catch(e) {
            bln = false;
        }
        return bln;
    }

    //获取指定KEY的元素值VALUE，失败返回NULL
    this.get = function(_key) {
        try{
            for(i = 0; i < this.elements.length; i++) {
                if(this.elements[i].key == _key) {
                    return this.elements[i].value;
                }
            }
        } catch(e) {
            return null;
        }
    }

    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
    this.element = function(_index) {
        if(_index < 0 || _index >= this.elements.length) {
            return null;
        }
        return this.elements[_index];
    }

    //判断MAP中是否含有指定KEY的元素
    this.containsKey = function(_key) {
        varbln = false;
        try{
            for(i = 0; i < this.elements.length; i++) {
                if(this.elements[i].key == _key) {
                    bln = true;
                }
            }
        } catch(e) {
            bln = false;
        }
        return bln;
    }

    //判断MAP中是否含有指定VALUE的元素
    this.containsValue = function(_value) {
        var bln = false;
        try{
            for(i = 0; i < this.elements.length; i++) {
                if(this.elements[i].value == _value) {
                    bln = true;
                }
            }
        } catch(e) {
            bln = false;
        }
        return bln;
    }

    //获取MAP中所有VALUE的数组（ARRAY）
    this.values = function() {
        var arr = new Array();
        for(i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].value);
        }
        return arr;
    }

    //获取MAP中所有KEY的数组（ARRAY）
    this.keys = function() {
        var arr = new Array();
        for(i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].key);
        }
        return arr;
    }
}

function HawkDock()
{
    var email = $("#email_HawkDock").val();
    var job = $("#jobname_HawkDock").val();
    var constraint_content = $("#constraint").val();
    var rec_PDBID = $("#rec_PDBid").val();
    var lig_PDBID = $("#lig_PDBid").val();
    var fileTime = (new Date()).valueOf(); //ms
    var check_gbsa = "No";
    if(document.getElementById("HawkDock_gbsa").checked){
        check_gbsa = "Yes";
    }
    if($.isEmptyObject($('#jobname_HawkDock').val()))
    {
        var Num='';
        for(var i=0;i<6;i++)
        {
            Num+=Math.floor(Math.random()*10);
        }
        job = 'ID' + Num;
    }
    if($.isEmptyObject($('#email_HawkDock').val()))
    {
        email = "guest";
        //alert("If you want to calculate scores of your complex, you should login in.")
        //document.getElementById("index_content").innerHTML = "Please log in or sign up before taking advantage of the workspace.";
        //$('#index').modal()
        //return false

    }
    if($.isEmptyObject($('#constraint').val()))
    {
        constraint_content = "No";
        //return false

    }


    //console.log(fileTime);
    //upload file
    if( !$.isEmptyObject($('#rec_PDBfile1').val()) && !$.isEmptyObject($('#lig_PDBfile1').val()) )
    {
        rec_PDBID = "No";
        lig_PDBID = "No";
        //alert("OK")
        if( $('#rec_PDBfile1').val().match('^.*\.pdb$') && $('#lig_PDBfile1').val().match('^.*\.pdb$')) {
            //document.getElementById("index_success_content").innerHTML = "Your job is submitting. You will receive an email of the results of HawkDock.";
            $('#index_success').modal()
            //console.log( document.getElementById("PDBfile").files[0])
            var fileData1 = $('#rec_PDBfile1')[0].files[0];
            var fileData2 = $('#lig_PDBfile1')[0].files[0];
            var Data = new FormData();
            Data.append("jobname", job);
            Data.append("_xsrf", getCookie('_xsrf'));
            Data.append("PDBfileTime", fileTime);
            Data.append("emailaddress", email);
            Data.append("Dock_PDBfileData1", fileData1);
            Data.append("Dock_PDBfileData2", fileData2);
            Data.append("rec_PDBid", rec_PDBID);
            Data.append("lig_PDBid", lig_PDBID);
            Data.append("constraint", constraint_content);
            Data.append("HawkDock_gbsa", check_gbsa);
            Data.append("operateType", 'HawkDock');
            $.ajax
            ({
                url: '/hawkdock/scoring',
                type: 'POST',
                data: Data,
                cache: false,
                processData: false,
                contentType: false,
                success: function (returnInfo) {
                    var contact = JSON.parse(returnInfo);
                    if (contact['URL'] == "wrong") {
                        document.getElementById("index_content").innerHTML = "Your format of constraint information does not meet the requirements.";
                        $('#index_success').modal('hide')
                        $('#index').modal()
                        //return false
                    }
                    else if (contact['URL'] == 'wrong_rec_number') {
                        document.getElementById("index_content").innerHTML = "Your receptor exceeds 1000 AA.";
                        $('#index_success').modal('hide')
                        $('#index').modal()

                    }
                    else if (contact['URL'] == 'wrong_lig_number') {
                        document.getElementById("index_content").innerHTML = "Your ligand exceeds 1000 AA.";
                        $('#index_success').modal('hide')
                        $('#index').modal()

                    }
                    else if (contact['URL'] == 'wrong_pdb_number') {
                        document.getElementById("index_content").innerHTML = "Both of your receptor and ligand exceed 1000 AA.";
                        $('#index_success').modal('hide')
                        $('#index').modal()

                    }
                    else {
                        window.location.href = contact['URL']
                    }
                    //window.location.href=contact['URL']
                    //clear input file
                    //document.getElementById("rec_HawkDock").innerHTML = "<input type=\"file\" id=\"rec_PDBfile1\" name=\"rec_PDBfile1\">";
                    //document.getElementById("lig_HawkDock").innerHTML = "<input type=\"file\" id=\"lig_PDBfile1\" name=\"lig_PDBfile1\">";
                    //alert(returnInfo);
                    //returnInfoText = returnInfo.replace(/\\n/g, "<br>")
                    //console.log(returnInfoText)
                    //var contact = JSON.parse(returnInfoText);
                    //document.getElementById("scoringResult").innerHTML = contact["scoringResult"];
                    //alert(contact["filenameUnique"]+'/complex')
                },
                //测试是否成功上传
                /*}).done(function (res) {
                    alert('上传文件成功');
                }).fail(function (res) {
                    alert('上传文件失败');
                });
            }*/
            })
        }
        else
        {
            //alert("Please upload the right file format with '.pdb' suffix.");
            document.getElementById("index_content").innerHTML = "Please upload the right file format with '.pdb' suffix.";
            $('#index').modal()
            return false
        }
    }
    //upload PDB ID
    else if( !$.isEmptyObject($('#rec_PDBid').val()) && !$.isEmptyObject($('#lig_PDBid').val()) && $.isEmptyObject($('#rec_PDBfile1').val()) && $.isEmptyObject($('#lig_PDBfile1').val()))
    {
        if( $('#rec_PDBid').val().match('^[A-Za-z0-9]{4}(:{1}[A-Za-z0-9]+)*$') && $('#lig_PDBid').val().match('^[A-Za-z0-9]{4}(:{1}[A-Za-z0-9]+)*$'))
        {
            //alert("OK")
            {
            //document.getElementById("index_success_content").innerHTML = "Your job has been submitted. You will receive an email of the results of HawkDock.";
            $('#index_success').modal()
            //console.log( document.getElementById("PDBfile").files[0])
            var Data = new FormData();
            Data.append("jobname", job);
            Data.append("_xsrf", getCookie('_xsrf'));
            Data.append("PDBfileTime", fileTime);
            Data.append("emailaddress", email);
            Data.append("rec_PDBid", rec_PDBID);
            Data.append("lig_PDBid", lig_PDBID);
            Data.append("constraint", constraint_content);
            Data.append("HawkDock_gbsa", check_gbsa);
            Data.append("operateType", 'HawkDock');
            $.ajax
            ({
                url: '/hawkdock/scoring',
                type: 'POST',
                data: Data,
                cache: false,
                processData: false,
                contentType: false,
                success: function (returnInfo)
                {
                    var contact = JSON.parse(returnInfo);
                    if (contact['URL'] == "wrong")
                        {
                            document.getElementById("index_content").innerHTML = "Your format of constraint information does not meet the requirements.";
                            $('#index_success').modal('hide')
                            $('#index').modal()
                            //return false
                        }
                    else
                        {
                            window.location.href=contact['URL']
                        }
                    //window.location.href=contact['URL']
                    //clear input file
                    //document.getElementById("rec_HawkDock").innerHTML = "<input type=\"file\" id=\"rec_PDBfile1\" name=\"rec_PDBfile1\">";
                    //document.getElementById("lig_HawkDock").innerHTML = "<input type=\"file\" id=\"lig_PDBfile1\" name=\"lig_PDBfile1\">";
                    //alert(returnInfo);
                    //returnInfoText = returnInfo.replace(/\\n/g, "<br>")
                    //console.log(returnInfoText)
                    //var contact = JSON.parse(returnInfoText);
                    //document.getElementById("scoringResult").innerHTML = contact["scoringResult"];
                    //alert(contact["filenameUnique"]+'/complex')
                },
            });
        }
        }
        else
        {
            document.getElementById("index_content").innerHTML = "Please check your format of PDB ID.";
            $('#index').modal()
            return false
        }
    }
    //upload receptor PDB ID and ligand PDB file
    else if( !$.isEmptyObject($('#rec_PDBid').val()) && !$.isEmptyObject($('#lig_PDBfile1').val()))
    {
        if( $('#rec_PDBid').val().match('^[A-Za-z0-9]{4}(:{1}[A-Za-z0-9]+)*$') && $('#lig_PDBfile1').val().match('^.*\.pdb$'))
        {
            lig_PDBID = 'No';
            //alert("OK")
            {
            //document.getElementById("index_success_content").innerHTML = "Your job has been submitted. You will receive an email of the results of HawkDock.";
            $('#index_success').modal()
            //console.log( document.getElementById("PDBfile").files[0])
            var fileData2 = $('#lig_PDBfile1')[0].files[0];
            var Data = new FormData();
            Data.append("jobname", job);
            Data.append("_xsrf", getCookie('_xsrf'));
            Data.append("PDBfileTime", fileTime);
            Data.append("emailaddress", email);
            Data.append("rec_PDBid", rec_PDBID);
            Data.append("lig_PDBid", lig_PDBID);
            Data.append("Dock_PDBfileData2", fileData2);
            Data.append("constraint", constraint_content);
            Data.append("HawkDock_gbsa", check_gbsa);
            Data.append("operateType", 'HawkDock');
            $.ajax
            ({
                url: '/hawkdock/scoring',
                type: 'POST',
                data: Data,
                cache: false,
                processData: false,
                contentType: false,
                success: function (returnInfo)
                {
                    var contact = JSON.parse(returnInfo);
                    if (contact['URL'] == "wrong")
                        {
                            document.getElementById("index_content").innerHTML = "Your format of constraint information does not meet the requirements.";
                            $('#index_success').modal('hide')
                            $('#index').modal()
                            //return false
                        }
                    else if (contact['URL'] == 'wrong_lig_number') {
                        document.getElementById("index_content").innerHTML = "Your ligand exceeds 1000 AA.";
                        $('#index_success').modal('hide')
                        $('#index').modal()

                    }
                    else
                        {
                            window.location.href=contact['URL']
                        }
                    //window.location.href=contact['URL']
                    //clear input file
                    //document.getElementById("rec_HawkDock").innerHTML = "<input type=\"file\" id=\"rec_PDBfile1\" name=\"rec_PDBfile1\">";
                    //document.getElementById("lig_HawkDock").innerHTML = "<input type=\"file\" id=\"lig_PDBfile1\" name=\"lig_PDBfile1\">";
                    //alert(returnInfo);
                    //returnInfoText = returnInfo.replace(/\\n/g, "<br>")
                    //console.log(returnInfoText)
                    //var contact = JSON.parse(returnInfoText);
                    //document.getElementById("scoringResult").innerHTML = contact["scoringResult"];
                    //alert(contact["filenameUnique"]+'/complex')
                },
            });
            }
        }
        else
        {
            document.getElementById("index_content").innerHTML = "Please check your format of PDB ID or file (XXX.pdb).";
            $('#index').modal()
            return false
        }
    }
    //upload ligand PDB ID and receptor PDB file
    else if( !$.isEmptyObject($('#lig_PDBid').val()) && !$.isEmptyObject($('#rec_PDBfile1').val()))
    {
        if( $('#lig_PDBid').val().match('^[A-Za-z0-9]{4}(:{1}[A-Za-z0-9]+)*$') && $('#rec_PDBfile1').val().match('^.*\.pdb$'))
        {
            rec_PDBID = 'No';
            //alert("OK")
            {
            //document.getElementById("index_success_content").innerHTML = "Your job has been submitted. You will receive an email of the results of HawkDock.";
            $('#index_success').modal()
            //console.log( document.getElementById("PDBfile").files[0])
            var fileData1 = $('#rec_PDBfile1')[0].files[0];
            var Data = new FormData();
            Data.append("jobname", job);
            Data.append("_xsrf", getCookie('_xsrf'));
            Data.append("PDBfileTime", fileTime);
            Data.append("emailaddress", email);
            Data.append("rec_PDBid", rec_PDBID);
            Data.append("lig_PDBid", lig_PDBID);
            Data.append("Dock_PDBfileData1", fileData1);
            Data.append("constraint", constraint_content);
            Data.append("HawkDock_gbsa", check_gbsa);
            Data.append("operateType", 'HawkDock');
            $.ajax
            ({
                url: '/hawkdock/scoring',
                type: 'POST',
                data: Data,
                cache: false,
                processData: false,
                contentType: false,
                success: function (returnInfo)
                {
                    var contact = JSON.parse(returnInfo);
                    if (contact['URL'] == "wrong")
                        {
                            document.getElementById("index_content").innerHTML = "Your format of constraint information does not meet the requirements.";
                            $('#index_success').modal('hide')
                            $('#index').modal()
                            //return false
                        }
                    else if (contact['URL'] == 'wrong_rec_number') {
                        document.getElementById("index_content").innerHTML = "Your receptor exceeds 1000 AA.";
                        $('#index_success').modal('hide')
                        $('#index').modal()

                    }
                    else
                        {
                            window.location.href=contact['URL']
                        }
                    //window.location.href=contact['URL']
                    //clear input file
                    //document.getElementById("rec_HawkDock").innerHTML = "<input type=\"file\" id=\"rec_PDBfile1\" name=\"rec_PDBfile1\">";
                    //document.getElementById("lig_HawkDock").innerHTML = "<input type=\"file\" id=\"lig_PDBfile1\" name=\"lig_PDBfile1\">";
                    //alert(returnInfo);
                    //returnInfoText = returnInfo.replace(/\\n/g, "<br>")
                    //console.log(returnInfoText)
                    //var contact = JSON.parse(returnInfoText);
                    //document.getElementById("scoringResult").innerHTML = contact["scoringResult"];
                    //alert(contact["filenameUnique"]+'/complex')
                },
            });
            }
        }
        else
        {
            document.getElementById("index_content").innerHTML = "Please check your format of PDB ID or file (XXX.pdb).";
            $('#index').modal()
            return false
        }
    }
    else
    {
        //alert("Please select two PDB file of a protein-protein complex.");
        document.getElementById("index_content").innerHTML = "Please upload the PDB file or provide the PDB ID.";
        $('#index').modal()
        return false
    }







}

function GBSA_Scoring()
{
    var email = $("#email_GBSA").val();
    var job_GBSA = $("#jobname_GBSA").val();
    var fileTime = (new Date()).valueOf(); //ms
    var chainid_rec = $("#rec_chainid").val();
    var chainid_lig = $("#lig_chainid").val();
    var G_PDBID = $("#G_PDBid").val();
    if ($.isEmptyObject($('#jobname_GBSA').val()))
    {
        var Num='';
        for(var i=0;i<6;i++)
        {
            Num+=Math.floor(Math.random()*10);
        }
        job_GBSA = 'ID' + Num;
        //alert(job_GBSA)
    }
    if($.isEmptyObject($('#email_GBSA').val()))
    {
        email = "guest";
        //return false

    }


    if( !$.isEmptyObject($('#G_PDBfile1').val()) && !$.isEmptyObject($('#rec_chainid').val()) && !$.isEmptyObject($('#lig_chainid').val()))
    {
        //alert("OK")
        G_PDBID = "No"
        if( $('#G_PDBfile1').val().match('^.*\.pdb$') )
        {
            //document.getElementById("index_success_content").innerHTML = "Your job has been submitted. You will receive an email of the results of MM/GBSA.";
            $('#index_success').modal()
            //console.log( document.getElementById("PDBfile").files[0])
            var fileData1 = $('#G_PDBfile1')[0].files[0];
            var Data = new FormData();
            Data.append("jobname", job_GBSA);
            Data.append("emailaddress", email);
            Data.append("PDBfileTime", fileTime);
            Data.append("_xsrf", getCookie('_xsrf'));
            Data.append("G_PDBfileData1", fileData1);
			Data.append("chainid_rec", chainid_rec);
			Data.append("chainid_lig", chainid_lig);
			Data.append("operateType", 'MM/GBSA');
			Data.append("G_PDBID", G_PDBID);
            $.ajax
            ({
                url: '/hawkdock/scoring',
                type: 'POST',
                data: Data,
                cache: false,
                processData: false,
                contentType: false,
                success: function (returnInfo)
                {
                    var contact = JSON.parse(returnInfo);
                    if (contact['URL'] == "wrong")
                        {
                            document.getElementById("index_content").innerHTML = "Chain ID must be single character and unique.";
                            $('#index_success').modal('hide')
                            $('#index').modal()
                            //return false
                        }
                    else if (contact['URL'] == "wrong_id")
                        {
                            document.getElementById("index_content").innerHTML = "Both chain IDs of receptor and ligand aren't in the pdb file.";
                            $('#index_success').modal('hide')
                            $('#index').modal()
                            //return false
                        }
                    else if (contact['URL'] == "wrong_id_rec")
                        {
                            document.getElementById("index_content").innerHTML = "Chain ID of receptor isn't in the pdb file.";
                            $('#index_success').modal('hide')
                            $('#index').modal()
                            //return false
                        }
                    else if (contact['URL'] == "wrong_id_lig")
                        {
                            document.getElementById("index_content").innerHTML = "Chain ID of ligand isn't in the pdb file.";
                            $('#index_success').modal('hide')
                            $('#index').modal()
                            //return false
                        }
                    else
                        {
                            window.location.href=contact['URL']
                        }
                    //clear input file
                    //document.getElementById("G_PDB_1").innerHTML = "<input type=\"file\" id=\"G_PDBfile1\"  name=\"PDBfileName1\">";
                    //document.getElementById("G_PDB_2").innerHTML = "<input type=\"file\" id=\"G_PDBfile2\"  name=\"PDBfileName2\">";
                    //alert(returnInfo);
                    //console.log(returnInfo)
                    //returnInfoText = returnInfo.replace(/\\n/g, "<br>")
                    //console.log(returnInfoText)
                    //var contact = JSON.parse(returnInfoText);
                    //document.getElementById("scoringResult").innerHTML = contact["scoringResult"];
                    //alert(contact["filenameUnique"]+'/complex')
                },
            });
        }
        else
        {
            //alert("Please upload the right file format with '.pdb' suffix.");
            document.getElementById("index_content").innerHTML = "Please upload the right file format with '.pdb' suffix.";
            $('#index').modal()
            return false
        }
    }
    else if(!$.isEmptyObject($('#G_PDBid').val()) && !$.isEmptyObject($('#rec_chainid').val()) && !$.isEmptyObject($('#lig_chainid').val()))
    {
        if( $('#G_PDBid').val().match('^[A-Za-z0-9]{4}(:{1}[A-Za-z0-9]+)*$') )
        {
            //document.getElementById("index_success_content").innerHTML = "Your job has been submitted. You will receive an email of the results of MM/GBSA.";
            $('#index_success').modal()
            //console.log( document.getElementById("PDBfile").files[0])
            var Data = new FormData();
            Data.append("jobname", job_GBSA);
            Data.append("emailaddress", email);
            Data.append("PDBfileTime", fileTime);
            Data.append("_xsrf", getCookie('_xsrf'));
			Data.append("chainid_rec", chainid_rec);
			Data.append("chainid_lig", chainid_lig);
			Data.append("operateType", 'MM/GBSA');
			Data.append("G_PDBID", G_PDBID);
            $.ajax
            ({
                url: '/hawkdock/scoring',
                type: 'POST',
                data: Data,
                cache: false,
                processData: false,
                contentType: false,
                success: function (returnInfo)
                {
                    var contact = JSON.parse(returnInfo);
                    if (contact['URL'] == "wrong")
                        {
                            document.getElementById("index_content").innerHTML = "Chain ID must be single character and unique.";
                            $('#index_success').modal('hide')
                            $('#index').modal()
                            //return false
                        }
                    else
                        {
                            window.location.href=contact['URL']
                        }
                    //clear input file
                    //document.getElementById("G_PDB_1").innerHTML = "<input type=\"file\" id=\"G_PDBfile1\"  name=\"PDBfileName1\">";
                    //document.getElementById("G_PDB_2").innerHTML = "<input type=\"file\" id=\"G_PDBfile2\"  name=\"PDBfileName2\">";
                    //alert(returnInfo);
                    //console.log(returnInfo)
                    //returnInfoText = returnInfo.replace(/\\n/g, "<br>")
                    //console.log(returnInfoText)
                    //var contact = JSON.parse(returnInfoText);
                    //document.getElementById("scoringResult").innerHTML = contact["scoringResult"];
                    //alert(contact["filenameUnique"]+'/complex')
                },
            });
        }
        else
        {
            //alert("Please upload the right file format with '.pdb' suffix.");
            document.getElementById("index_content").innerHTML = "Please check your format of PDB ID.";
            $('#index').modal()
            return false
        }

    }

    else
    {
        //alert("Please select two PDB file of a protein-protein complex.");
        document.getElementById("index_content").innerHTML = "Please upload the PDB data and input the chain ID.";
        $('#index').modal()
        return false
    }






}

// perform gbsa to analyze HawkDock direclty
function GBSA_HawkDock() {
    var check = document.getElementsByName("Model_gbsa");
    var check_val = [];
    var i;
    for (i in check){
        if (check[i].checked){
            check_val.push(check[i].value);
            document.getElementById(check[i].id).checked=false;
            document.getElementById(check[i].id).disabled=true;
        }
    }
    var filepath_temp = location.href.split('/')[5];
    var job_original_name = filepath_temp.split('-')[0];
    for (i=0;i<check_val.length;i++){
        var number = check_val[i];
        var fileTime = (new Date()).valueOf();
        var job = job_original_name + '_model' + number;
        var Data = new FormData();
        Data.append("jobname", job);
        Data.append("_xsrf", getCookie('_xsrf'));
        Data.append("PDBfileTime", fileTime);
        Data.append("operateType", 'GBSA_HawkDock');
        Data.append("emailaddress", 'guest');
        Data.append("filepath_model", filepath_temp);
        Data.append("model_number", number);
        $.ajax
            ({
                url: '/hawkdock/scoring',
                type: 'POST',
                data: Data,
                cache: false,
                processData: false,
                contentType: false,
                success: function (returnInfo)
                {
                    var contact = JSON.parse(returnInfo);
                    if (contact['URL'] == "wrong")
                        {
                            document.getElementById("result_content").innerHTML = contact['words'];
                            $('#result_success').modal('hide');
                            $('#result').modal();
                            window.location.reload();
                            //return false
                        }
                    else
                        {
                            window.location.reload();
                            //window.location.href=contact['URL']
                        }
                },
            });
        sleep(100);
    }
}

function result_python() {
    var filepath_temp = location.href.split('/')[5];
    var Data = new FormData();
    Data.append("filename", filepath_temp);
    Data.append("_xsrf", getCookie('_xsrf'));
    $.ajax
        ({
                url: '/hawkdock/result/',
                type: 'POST',
                data: Data,
                cache: false,
                processData: false,
                contentType: false,
                success: function (returnInfo)
                {
                    var contact = JSON.parse(returnInfo);
                    var table = document.getElementById("table_url");
                    var infos = document.getElementById("tbody_url");
                    table.removeChild(infos);
                    infos = document.createElement("tbody");
                    for (var key in contact){
                        if (key != 'URL' && key !='words'){
                            var tr = document.createElement("tr");
                            var td1 = document.createElement("td");
                            var td2 = document.createElement("td");
                            td1.innerHTML = "<strong>" + 'model' + key.toString() + "</strong>";
                            td2.innerHTML = "<a href=" + contact[key] + ">"+contact[key] +"</a>";
                            tr.appendChild(td1);
                            tr.appendChild(td2);
                            infos.appendChild(tr);
                            var styles_js = 'model' + key.toString();
                            document.getElementById(styles_js).style.color = '#9c0001';
                            document.getElementById(key).checked=false;
                            document.getElementById(key).disabled=true;
                        }
                    }
                    table.appendChild(infos);

                },
            });
}

//use "for" to sleep, but it will cost CPU. Thus, we can't sleep long time
function sleep(d){
  for(var t = Date.now();Date.now() - t <= d;);
}