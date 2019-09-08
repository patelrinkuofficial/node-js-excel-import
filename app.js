let express = require('express');
let app = express();
let upload = require('express-fileupload');
let importExcel = require('convert-excel-to-json');
var fs = require('fs');
var js2xmlparser = require('js2xmlparser');
app.use(upload());

app.get('/',(req, res)=>{
    /*res.sendFile(__dirname+'index.html');*/
    let result = importExcel({
        sourceFile : 'excel/demo.xlsx',
        header : {rows:1,rows:2,rows:3,rows:4 },
        sheets : ['Sheet1']
    });
    result['Sheet1'].forEach(function(element) {
        var productname = element['A'];
        var producttagline = element['B'];
        var productdescription	= element['C'];
        var sku = element['D'];
        var productimage = element['E'];
        var visible = element['F'];
        var branding_template = element['G'];
        var iscustomize = element['H'];
        var flag_name = element['I'];
        var cost_flag = element['J'];
        
        // attribute XML
        var attrdetails = '';
        var attrdetailsnode = '';
        var attrobj = [];
        if(typeof  element['K'] != 'undefined' && element['K'] !== null) {
            var attribute = element['K'].split('|');
            for(var i=0;i<attribute.length;i++) {
                var attribute_val = attribute[i].split('>');
                var obj3 = [{
                        '@':{
                        "parent" : attribute_val[0],
                        "child" : attribute_val[1]
                    }
                }];
                attrobj.push(obj3);
            }
        }
        attrdetails = js2xmlparser.parse("attrdata", attrobj);
        attrdetailsnode = "/attrdata/attrdata";
        console.log(attrdetails);

        // category XML
        var categorydetails = '';
        var categorydetailsnode = '';
        var categoryobj = [];
        if(typeof  element['L'] != 'undefined' && element['L'] !== null) {
            var category = element['L'].split('|');
            for(var i=0;i<category.length;i++) {
                var category_val = category[i].split('>');
                var obj3 = [{
                        '@':{
                        "parent" : category_val[0],
                        "child" : category_val[1]
                    }
                }];
                categoryobj.push(obj3);
            }
        }
        categorydetails = js2xmlparser.parse("categorydata", categoryobj);
        categorydetailsnode = "/categorydata/categorydata";
        console.log(categorydetails);

        // gallery XML
        var gallerydetails = '';
        var gallerydetailsnode = '';
        var galleryobj = [];
        if(typeof  element['M'] != 'undefined' && element['M'] !== null) {
            var gallery = element['M'].split('|');
            for(var i=0;i<gallery.length;i++) {
                var obj3 = [{
                        '@':{
                        "id" : gallery[i]
                    }
                }];
                galleryobj.push(obj3);
            }
        }
        gallerydetails = js2xmlparser.parse("gallerydata", galleryobj);
        gallerydetailsnode = "/gallerydata/gallerydata";
        console.log(gallerydetails);
        //var gallery = element['M'].split('|');
        
        // setup_price XML
        var setup_pricedetails = '';
        var setup_pricedetailsnode = '';
        var setup_priceobj = [];
        if(typeof  element['N'] != 'undefined' && element['N'] !== null) {
            var setup_price = element['N'].split('|');
            for(var i=0;i<setup_price.length;i++) {
                var setup_price_val = setup_price[i].split('>');
                var obj3 = [{
                        '@':{
                        "setupname" : setup_price_val[0],
                        "unitprice" : setup_price_val[1],
                        "setupprice" : setup_price_val[2]
                    }
                }];
                setup_priceobj.push(obj3);
            }
        }
        setup_pricedetails = js2xmlparser.parse("setup_pricedata", setup_priceobj);
        setup_pricedetailsnode = "/setup_pricedata/setup_pricedata";
        console.log(setup_pricedetails);

        // setup_price XML
        var unbranded_pricedetails = '';
        var unbranded_pricedetailsnode = '';
        var unbranded_priceobj = [];
        if(typeof  element['O'] != 'undefined' && element['O'] !== null) {
            var unbranded_price = element['O'].split('|');
            for(var i=0;i<unbranded_price.length;i++) {
                var unbranded_price_val = unbranded_price[i].split('>');
                var obj3 = [{
                        '@':{
                        "qty" : unbranded_price_val[0],
                        "price" : unbranded_price_val[1],
                        "whole_price" : unbranded_price_val[2],
                        "retai_price" : unbranded_price_val[2]
                    }
                }];
                unbranded_priceobj.push(obj3);
            }
        }
        unbranded_pricedetails = js2xmlparser.parse("unbranded_pricedata", unbranded_priceobj);
        unbranded_pricedetailsnode = "/unbranded_pricedata/unbranded_pricedata";
        console.log(unbranded_pricedetails);
    });
    res.json(result);
});

app.listen(3000,()=>{
    console.log('server start');
});