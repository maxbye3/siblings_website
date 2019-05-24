    
      var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1Z-SoG-sG5wDFcI9UFstDt2pB5RgqPUWaR22sZABwasA/pubhtml';

      function showWall(int){
        
        
      
        $('.girlsImg').css({'filter': 'blur(10px)'}); // blur the girls
        $('.titleStraplineContainer').hide(); // hide content

        // remove active from all links
        for (var j = 0; j < navbarNum; j++){
          $('.nav' + j).removeClass('active');
          $('.page'+ j).hide();
        }
        $('.home').removeClass('active');
        // add active
        $('.nav' + int).addClass('active');

        $('.socialMediaContainer').removeAttr('hidden');
        $('.page'+ int).show();
        
        // adjust background to not get weird gradient issues
        if($(window).width() > 720){
          $('body').css({'height':'100%'});
        } else {
          $('body').css({'background': '#5bd1d7'});          
        }
      }

      function goHome(){
        $('.girlsImg').css({'filter': 'blur(0px)'}); // unblur the girls
        $('.titleStraplineContainer').show(); // show content

        // remove active from all links
        for (var j = 0; j < navbarNum; j++){
          $('.nav' + j).removeClass('active');
          $('.page'+ j).hide();
        }
        $('.home').addClass('active'); // add active to home
        
        $('.socialMediaContainer').attr('hidden', 'true');

        // adjust background to not get weird gradient issues
        if($(window).width() > 720){
        $('body').css({'height':'100vh'});
        } else {
          $('body').css({'background': 'linear-gradient(#5bd1d7, #a6dfe2)'});          
        }


      }

      function init() {
        Tabletop.init({ 
          key: public_spreadsheet_url,
          callback: showInfo,
          simpleSheet: true 
        });
      }

      window.addEventListener('DOMContentLoaded', init)
      var navbarNum;
      function showInfo(data) {

        $('.title').html(data[0]["Title"]);
        $('.strapline').html(data[0]["Strapline"]);
        $('.button').html(data[0]["Button"]);
        navbarNum = Object.keys(data[0]).length
        for (var j = 0; j < navbarNum; j++){
          if(Object.keys(data[0])[j] !== "Title" && Object.keys(data[0])[j] !== "Strapline" && Object.keys(data[0])[j] !== "Button"){
            var content = '';
            var navcontent = '';
            
            // nav bar
            navcontent += '<li href="#" class="nav-link nav'+ j +'" onclick="showWall(' + j + ')">' + Object.keys(data[0])[j] + '</li>';

            for (var k = 0; k < data.length; k++){
              content += "<div class='my-2 m-md-0 col-lg-4 d-flex align-items-center justify-content-center'>" + data[k][Object.keys(data[k])[j]] + "</div>";
            }
            $('.socialMediaContainer').append("<div class='row page" + j +  "'>" + content + "</div>");
            $('.navbar-collapse .navbar-nav').append(navcontent);
          }
        }
        twttr.widgets.load();
        window.instgrm.Embeds.process();

      }